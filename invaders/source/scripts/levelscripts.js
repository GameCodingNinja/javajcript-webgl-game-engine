
//
//  FILE NAME: levelcripts.js
//  DESC:      scripts for the level
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { Point } from '../../../library/common/point';
import { settings } from '../../../library/utilities/settings';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/sound/soundmanager';
import * as genFunc from '../../../library/utilities/genfunc';
import * as utilScripts from './utilityscripts';
import * as easing from '../../../library/utilities/easingfunc';
import * as stateDefs from '../state/statedefs';
import * as gameDefs from '../state/gamedefs';

const GAMEPLAY_LOOPING_WRAP_DIST = 5600;

//
//  DESC: Script for animating fire tale
//
class PlayerShip_FireTailAnim
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim( sprite );

        // // Continues the init
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
        if( this._rot.y )
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
            if( this.sprite.pos.x < -GAMEPLAY_LOOPING_WRAP_DIST )
            {
                // Set the transpos just for the wraparound collision check that will be overwritten on the next translate
                this.sprite.transPos.x += // Continues the init(GAMEPLAY_LOOPING_WRAP_DIST * 2);
                this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );
            }
            else if( this.sprite.pos.x > GAMEPLAY_LOOPING_WRAP_DIST )
            {
                // Set the transpos just for the wraparound collision check that will be overwritten on the next translate
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
        if(rot.y != 0)
        {
            this.rotate = 0.05;
            this.rotateVelocity = 0.00005;
        }

        // Continues the init
        this.recycle();
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
//  DESC: Script for shooting enemy projectile
//
class EnemyShip_Shoot
{
    constructor( sprite, enemySprite )
    {
        this.sprite = sprite;

        // Speed of the projectile
        this.PROJECTILE_SPEED = 0.25;
        this.PROJECTILE_ROT_SPEED = 0.5;

        this.startPos = new Point;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.camera = this.playerShipStratagy.camera;

        // Continues the init
        this.recycle( enemySprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( enemySprite )
    {
        this.sprite.setPos( enemySprite.pos );
        this.sprite.setRotXYZ(0, 0, 0);

        this.playerShipSprite = this.playerShipStratagy.get('player_ship').get();
        this._length = this.playerShipSprite.pos.calcLength2D( enemySprite.pos );
        this.moveX = (this.playerShipSprite.pos.x - enemySprite.pos.x) / this._length;
        this.moveY = (this.playerShipSprite.pos.y - enemySprite.pos.y) / this._length;

        this.startPos.copy( enemySprite.pos );

        this.sprite.transform();
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inViewY( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            this.sprite.incPosXYZ( this.moveX * highResTimer.elapsedTime * this.PROJECTILE_SPEED, this.moveY * highResTimer.elapsedTime * this.PROJECTILE_SPEED );
            this.sprite.incRotXYZ( 0, 0, -(this.PROJECTILE_ROT_SPEED * highResTimer.elapsedTime) );
            this.sprite.collisionComponent.checkForCollision( this.playerShipStratagy.nodeAry );

            if( this.startPos.calcLength2D( this.sprite.pos ) < settings.deviceRes.w )
                return false;
        }

        // We are done with this sprite, queue it up to be deleted
        this.playerShipStratagy.recycle( this.sprite.parentNode );

        return true;
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
        this.explodeSprite.prepareScript( 'explode', projectileSprite, this.sprite );
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
//  DESC: Script for handling player ship explosion
//
class Explode_animation
{
    constructor( sprite, projectileSprite, shipSprite )
    {
        this.sprite = sprite;

        // Get the player ship strategy to delete the explosion animation
        this.playerShipStratagy = strategyManager.get('_player_ship_');

        // Setup the animation
        this.explodeAnim = new utilScripts.PlayAnim( sprite );

        // Continues the init
        this.recycle( projectileSprite, shipSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( projectileSprite, shipSprite )
    {
        this.shipSprite = shipSprite

        // This resets the animation
        this.explodeAnim.init( 24 );

        // Create an explode graphic node and translate it to the projectile sprite
        this.sprite.setPos( projectileSprite.pos );
        this.sprite.transform();

        this.dif = this.shipSprite.pos.getDistance( this.explodeAnim.sprite.pos );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.explodeAnim.sprite.setPosXYZ( this.shipSprite.pos.x - this.dif.x, this.shipSprite.pos.y - this.dif.y );

        if( this.explodeAnim.execute() )
        {
            this.playerShipStratagy.recycle( this.sprite.parentNode );

            return true;
        }

        return false;
    }
}

//
//  DESC: Script for handling enemy getting hit
//
class EnemyShip_Hit
{
    constructor( sprite, projectileSprite )
    {
        this.sprite = sprite;

        this.easingY = new easing.valueTo;

        // Continues the init
        this.recycle( projectileSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( projectileSprite )
    {
        // Remove the AI script since the enemy is to die
        this.sprite.scriptComponent.remove( 'AI_Enemy' );

        let dist = this.sprite.pos.getDistance( projectileSprite.pos );

        let dest = -(settings.deviceRes_half.h + this.sprite.parentNode.radius)
        let offsetY = Math.abs(this.sprite.pos.y - dest);
        this.easingY.init( this.sprite.pos.y, dest, offsetY / 250, easing.getSineIn() );

        if( (dist.x > 0 && dist.y > 0) || (dist.x < 0 && dist.y < 0) )
        {
            this.rotate = -0.04;
            this.rotateVelocity = -0.00004;
        }
        else if( (dist.x < 0 && dist.y > 0) || (dist.x > 0 && dist.y < 0) )
        {
            this.rotate = 0.04;
            this.rotateVelocity = 0.00004;
        }

        // Send a message to keep track of aliens being destroyed
        eventManager.dispatchEvent( gameDefs.EGE_ENEMY_DESTROYED );

        // Get the enemy strategy to create the explosion animation
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Create an explode graphic node and translate it to the projectile sprite
        this.explodeAnim = new utilScripts.PlayAnim( this.enemyStratagy.create('explode').get() );
        this.explodeAnim.init( 24 );

        if( projectileSprite.rot.y > 1 )
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x + 15, projectileSprite.pos.y );
        else
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x - 15, projectileSprite.pos.y );

        this.explodeAnim.sprite.transform();

        // Hide the projectile and allow it to be deleted from the script moving it
        if( projectileSprite.parentNode.name === 'player_shot' )
        {
            projectileSprite.setVisible( false );
        }

        this.dif = this.sprite.pos.getDistance( this.explodeAnim.sprite.pos );
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

        if( this.explodeAnim )
        {
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x - this.dif.x, this.sprite.pos.y - this.dif.y );
            if( this.explodeAnim.execute() )
            {
                this.enemyStratagy.destroy( this.explodeAnim.sprite.parentNode );
                this.explodeAnim = null;
            }
        }

        if( this.easingY.isFinished() )
        {
            // We are done with this sprite, queue it up to be deleted
            this.enemyStratagy.recycle( this.sprite.parentNode );

            return true;
        }

        return false;
    }
}

//
//  DESC: Script for handling enemy shot hitting player
//
class EnemyShot_Hit
{
    constructor( sprite )
    {
        this.sprite = sprite;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // We are done with this sprite, queue it up to be deleted
        strategyManager.get('_player_ship_').recycle( this.sprite.parentNode );
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
//  DESC: Script for handling enemy ship colliding with the player ship
//
class EnemyShip_CheckForCollideWithPlayer
{
    constructor( sprite )
    {
        this.sprite = sprite;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.camera = this.playerShipStratagy.camera;
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
        // This enemy needs to be in view to possibly collide with the player
        if( this.camera.inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            if( this.sprite.collisionComponent.checkForCollision( this.playerShipStratagy.nodeAry ) )
                return true;
        }

        return false;
    }
}

//
//  DESC: Script for handling building being destroy
//
class Building_Die
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.rotDir = 0.005;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Flag indicating this building was destroyed
        this.sprite.destroyed = true;

        if( genFunc.randomInt( 0, 1 ) === 0 )
            this.rotDir = -0.005;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( (this.sprite.pos.y + this.sprite.parentNode.radius) > -settings.deviceRes_half.h )
        {
            this.sprite.incPosXYZ( 0, -(0.05 * highResTimer.elapsedTime) );
            this.sprite.incRotXYZ( 0, 0, this.rotDir * highResTimer.elapsedTime );

            return false;
        }

        this.sprite.toBeDeleted = true;

        // We are done with this sprite, queue it up to be deleted
        strategyManager.get('_buildings_').destroy( this.sprite.parentNode );

        // Send a message to keep track of buildings being destroyed
        eventManager.dispatchEvent( gameDefs.EGE_BUILDING_DESTROYED );
        
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

    scriptManager.set( 'Explode_animation',
        ( sprite, projectileSprite, shipSprite ) => { return new Explode_animation( sprite, projectileSprite, shipSprite ); } );

    scriptManager.set( 'PlayerShip_Die',
        ( sprite ) => { return new PlayerShip_Die( sprite ); } );

    scriptManager.set( 'EnemyShip_Hit',
        ( sprite, projectileSprite ) => { return new EnemyShip_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'EnemyShot_Hit',
        ( sprite ) => { return new EnemyShot_Hit( sprite ); } );

    scriptManager.set( 'EnemyShip_CheckForCollideWithPlayer',
        ( sprite ) => { return new EnemyShip_CheckForCollideWithPlayer( sprite ); } );

    scriptManager.set( 'EnemyShip_Shoot',
        ( sprite, enemySprite ) => { return new EnemyShip_Shoot( sprite, enemySprite ); } );

    scriptManager.set( 'Building_Die',
        ( sprite ) => { return new Building_Die( sprite ); } );
}
