
//
//  FILE NAME: playershipscripts.js
//  DESC:      scripts for the player ship
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/sound/soundmanager';
import * as utilScripts from './utilityscripts';
import * as easing from '../../../library/utilities/easingfunc';
import * as stateDefs from '../state/statedefs';

const GAMEPLAY_LOOPING_WRAP_DIST = 5600;

//
//  DESC: Script for animating fire tale
//
class PlayerShip_FireTailAnim
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.animate.init( 24, true );
        this.pause = true;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !this.pause )
            return this.animate.execute();
        
        return false;
    }
}

//
//  DESC: Script for shooting laser
//
class PlayerShip_ShootLazer
{
    constructor( sprite, shipVelocity )
    {
        this.sprite = sprite;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.playerShipNode = this.playerShipStratagy.get('player_ship');
        this.camera = this.playerShipStratagy.camera;

        // Enemy strategy
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Continues the init
        this.recycle( shipVelocity );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( shipVelocity )
    {
        // Speed of the projectile
        this.PROJECTILE_SPEED = 1.5;
        
        this.shipVelocity = shipVelocity

        // Y Rotation
        this._rot = this.playerShipNode.findChild('playerShip_object').get().rot;

        // Is the position flipped?
        this._offsetX = this.sprite.pos.x;
        this._offsetY = this.sprite.pos.y;
        if( this._rot.y > 1 )
        {
            this._offsetX = -this._offsetX;
            this.PROJECTILE_SPEED = -this.PROJECTILE_SPEED;
        }

        // Set the rotation
        this.sprite.setRot( this._rot, false );

        // Set the initial position
        this.sprite.setPos( this.playerShipNode.get().pos );

        // Set the initial offset
        this.sprite.incPosXYZ( this._offsetX, this._offsetY );

        // Will have to do a preemptive transform so that the transPos data is available
        // for camera.inView because that doesn't happen until later in the pipeline.
        this.sprite.transform();
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inViewX( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            this.sprite.incPosXYZ( (this.PROJECTILE_SPEED * highResTimer.elapsedTime) + this.shipVelocity );
            this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );

            // Do wrapparound collision detection
            if( this.sprite.pos.x < -(GAMEPLAY_LOOPING_WRAP_DIST + 100) )
            {
                // Set the transpos just for the wraparound collision check that will be overwritten on the next translate
                for( this._i = 0; this._i < this.sprite.collisionComponent.transPointAry.length; ++this._i )
                    this.sprite.collisionComponent.transPointAry[this._i].x += (GAMEPLAY_LOOPING_WRAP_DIST * 2);

                this.sprite.transPos.x += (GAMEPLAY_LOOPING_WRAP_DIST * 2);
                this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );
            }
            else if( this.sprite.pos.x > (GAMEPLAY_LOOPING_WRAP_DIST - 100) )
            {
                // Set the transpos just for the wraparound collision check that will be overwritten on the next translate
                for( this._i = 0; this._i < this.sprite.collisionComponent.transPointAry.length; ++this._i )
                    this.sprite.collisionComponent.transPointAry[this._i].x += -(GAMEPLAY_LOOPING_WRAP_DIST * 2);
                
                this.sprite.transPos.x += -(GAMEPLAY_LOOPING_WRAP_DIST * 2);
                this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );
            }

            return false;
        }

        // We are done with this sprite, disable collision and queue it up to be deleted
        this.sprite.collisionComponent.enable = false;
        this.playerShipStratagy.recycle( this.sprite.parentNode );

        return true;
    }
}

//
//  DESC: Script for handling player ship dieing
//
class PlayerShip_Die
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.easingY = new easing.valueTo;
        // Y Rotation
        let rot = this.sprite.parentNode.findChild('playerShip_object').get().rot;
        let dest = -(settings.deviceRes_half.h + this.sprite.parentNode.radius)
        let offsetY = Math.abs(this.sprite.pos.y - dest);
        this.easingY.init( this.sprite.pos.y, dest, offsetY / 250, easing.getSineIn() );
        this.rotateVelocity = -0.00005;
        this.rotate = -0.05;
        if(rot.y > 1)
        {
            this.rotate = 0.05;
            this.rotateVelocity = 0.00005;
        }
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Empty by design
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.easingY.execute();
        this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );
        this.sprite.incRotXYZ( 0, 0, (this.rotate * highResTimer.elapsedTime) );
        this.rotate += this.rotateVelocity * highResTimer.elapsedTime;

        if( this.easingY.isFinished() )
        {
            soundManager.play( '(level_1)', 'player_explode' );
            eventManager.dispatchEvent( stateDefs.ESE_SHOW_GAME_OVER_MENU );
            return true;
        }

        return false;
    }
}

//
//  DESC: Script for handling player being hit
//  NOTE: Just need this script to execute the explosion sprite animation
//        Execution can get interupted by multiple hits which is why there's no execution
//
class PlayerShip_Hit
{
    constructor( sprite, projectileSprite )
    {
        this.sprite = sprite;

        // Get the player ship strategy to create the explosion animation
        this.playerShipStratagy = strategyManager.get('_player_ship_');

        // Continues the init
        this.recycle( projectileSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( projectileSprite )
    {
        // Create an explode graphic node and translate it to the projectile sprite
        this.explodeSprite = this.playerShipStratagy.create('explode').get();
        this.explodeSprite.prepareScript( 'explode', projectileSprite, this.sprite, 0 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return true;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'PlayerShip_FireTailAnim',
        ( sprite ) => { return new PlayerShip_FireTailAnim( sprite ); } );

    scriptManager.set( 'PlayerShip_ShootLazer',
        ( obj, shipVelocity ) => { return new PlayerShip_ShootLazer( obj, shipVelocity ); } );

    scriptManager.set( 'PlayerShip_Hit',
        ( sprite, projectileSprite ) => { return new PlayerShip_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'PlayerShip_Die',
        ( sprite ) => { return new PlayerShip_Die( sprite ); } );
}
