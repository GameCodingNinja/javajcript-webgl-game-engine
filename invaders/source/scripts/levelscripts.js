
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
import { cameraManager } from '../../../library/managers/cameramanager';
import { Point } from '../../../library/common/point';
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
        // Setup the animation
        this.explodeAnim = new utilScripts.PlayAnim();

        // Allocate the dif point
        this.dif = new Point();

        // Continues the init
        this.recycle( sprite, projectileSprite, shipSprite, offset );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, projectileSprite, shipSprite, offset )
    {
        this.sprite = sprite;
        this.shipSprite = shipSprite

        // This resets the animation
        this.explodeAnim.init( 24, false, this.sprite );

        // Create an explode graphic node and translate it to the projectile sprite
        this.explodeAnim.sprite.setPosXYZ( shipSprite.pos.x, projectileSprite.pos.y );
        this.explodeAnim.sprite.transform();

        // Use the NoGC approach that uses a temporary variable
        this.dif.copy( this.shipSprite.pos.getDistanceNoGC( this.explodeAnim.sprite.pos ) );

        // Offset a bit relitive to where the projectile hit
        if(projectileSprite.rot.y > 1.0)
        {
            this.dif.x -= 10;
        }
        else
        {
            this.dif.x += 10;
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
        this.rotDir = 0.005;

        // Continues the init
        this.recycle( sprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite )
    {
        this.sprite = sprite;

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
        // Player ship
        this.playerShipStrategy = strategyManager.get('_player_ship_');
        this.camera = cameraManager.get('levelCamera');

        // Continues the init
        this.recycle( sprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite )
    {
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // This enemy00 needs to be in view to possibly collide with the player
        if( this.camera.inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            if( this.sprite.collisionComponent.checkForCollision( this.playerShipStrategy.nodeAry ) )
                if(this.sprite.collisionComponent.enable == false)
                    return true;
        }

        return false;
    }
}

//
//  DESC: Health character animation
//
class HealthCharacter_Animation
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim();

        // Continues the init
        this.recycle( sprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite )
    {
        this.animate.init( 1.5, true, sprite );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.animate.execute();
        return false;
    }
}

//
//  DESC: Common script for handling enemy getting hit
//
class HealthCharacter_Hit
{
    constructor( sprite, projectileSprite )
    {
        // Get the enemy strategy to create the explosion animation
        this.enemyStrategy = strategyManager.get('_enemy_');

        // Continues the init
        this.recycle( sprite, projectileSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, projectileSprite )
    {
        this.sprite = sprite;

        // Create an explode graphic node and translate it to the projectile sprite and execute the script
        this._explodeSprite = this.enemyStrategy.create('explode').get();
        this._explodeSprite.prepareScript( 'explode', projectileSprite, this.sprite, (projectileSprite.rot.y > 1) ? -10 : 10 );

        // Hide the projectile and allow it to be recycled from the script moving it
        if( projectileSprite.parentNode.name === 'player_shot' )
        {
            projectileSprite.setVisible( false );
            // The projectile sprite script will recycle itself
        }
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // We are done with these sprites, queue it up to be recycled
        this.enemyStrategy.recycle( this.sprite.parentNode );
        this.enemyStrategy.recycle( 'help' );

        return true;
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

    scriptManager.set( 'HealthCharacter_Animation',
        ( sprite ) => { return new HealthCharacter_Animation( sprite ); } );

    scriptManager.set( 'HealthCharacter_Hit',
                ( sprite, projectileSprite ) => { return new HealthCharacter_Hit( sprite, projectileSprite ); } );
}
