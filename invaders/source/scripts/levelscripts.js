
//
//  FILE NAME: levelscripts.js
//  DESC:      scripts for the level
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { eventManager } from '../../../library/managers/eventmanager';
import * as utilScripts from './utilityscripts';
import * as genFunc from '../../../library/utilities/genfunc';
import * as gameDefs from '../state/gamedefs';

const PLAYER_SHIP_ID = 0,
      ENEMY00_SHOT_ID = -2,
      ENEMY00_SHIP_ID = -3,
      ENEMY01_SHIP_ID = -4,
      ENEMY02_SHIP_ID = -5

//
//  DESC: Script for handling player ship explosion
//
class Explode_animation
{
    constructor( sprite, projectileSprite, shipSprite, offset )
    {
        this.sprite = sprite;

        // Setup the animation
        this.explodeAnim = new utilScripts.PlayAnim();

        // Continues the init
        this.recycle( projectileSprite, shipSprite, offset );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( projectileSprite, shipSprite, offset )
    {
        this.shipSprite = shipSprite

        // This resets the animation
        this.explodeAnim.init( 24, false, this.sprite );

        // Create an explode graphic node and translate it to the projectile sprite
        this.explodeAnim.sprite.setPos( projectileSprite.pos );
        this.explodeAnim.sprite.transform();

        this.dif = this.shipSprite.pos.getDistance( this.explodeAnim.sprite.pos );
        this._size = this.shipSprite.getSize();

        // If the distance is too big like colliding with a big enemy ship, size it down
        if( shipSprite.parentNode.userId == PLAYER_SHIP_ID && projectileSprite.parentNode.userId <= ENEMY00_SHIP_ID )
        {
            if(this.dif.x > this._size.w / 2)
                this.dif.x = (this._size.w / 2) - 15;
            else if(this.dif.x < -(this._size.w / 2))
                this.dif.x = -(this._size.w / 2) + 15;

            if(this.dif.y > this._size.h / 2)
                this.dif.y = (this._size.h / 2) - 15;
            else if(this.dif.y < -(this._size.h / 2))
                this.dif.y = -(this._size.h / 2) + 15;
        }
        else
        {
            // Add in the offset
            this.dif.x += offset;
        }
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // Translate the position of the explosion to the object being hit
        this.explodeAnim.sprite.setPosXYZ( this.shipSprite.pos.x - this.dif.x, this.shipSprite.pos.y - this.dif.y);

        if( this.explodeAnim.execute() )
        {
            this.explodeAnim.sprite.parentNode.strategy.recycle( this.explodeAnim.sprite.parentNode );

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
        strategyManager.get('_buildings_').recycle( this.sprite.parentNode );

        // Send a message to keep track of buildings being destroyed
        eventManager.dispatchEvent( gameDefs.EGE_BUILDING_DESTROYED );
        
        return true;
    }
}

//
//  DESC: Script for handling enemy00 ship colliding with the player ship
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
        // This enemy00 needs to be in view to possibly collide with the player
        if( this.camera.inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            if( this.sprite.collisionComponent.checkForCollision( this.playerShipStratagy.nodeAry ) )
                if(this.sprite.collisionComponent.enable == false)
                    return true;
        }

        return false;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'Explode_animation',
            ( sprite, projectileSprite, shipSprite, offset ) => { return new Explode_animation( sprite, projectileSprite, shipSprite, offset ); } );

    scriptManager.set( 'EnemyShip_CheckForCollideWithPlayer',
        ( sprite ) => { return new EnemyShip_CheckForCollideWithPlayer( sprite ); } );

    scriptManager.set( 'Building_Die',
        ( sprite ) => { return new Building_Die( sprite ); } );
}
