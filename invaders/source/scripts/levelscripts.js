
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
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for animating fire tale
//
class PlayerShip_FireTailAnim
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim( sprite );
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
        this.shipVelocity = shipVelocity

        // Speed of the projectile
        this.PROJECTILE_SPEED = 1.5;

        // Player ship
        let playerShipStratagy = strategyManager.get('_player_ship_');
        let playerShipNode = playerShipStratagy.get('player_ship');
        this.camera = playerShipStratagy.camera;

        // Enemy strategy
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Y Rotation
        let rot = playerShipNode.findChild('playerShip_object').get().rot;

        // Is the position flipped?
        let offsetX = this.sprite.pos.x;
        let offsetY = this.sprite.pos.y;
        if( rot.y )
        {
            offsetX = -offsetX;
            this.PROJECTILE_SPEED = -this.PROJECTILE_SPEED;
        }

        // Set the rotation
        this.sprite.setRot( rot, false );

        // Set the initial position
        this.sprite.setPos( playerShipNode.get().pos );

        // Set the initial offset
        this.sprite.incPosXYZ( offsetX, offsetY );

        // Will have to do a preemptive transform so that the transPos data is available
        // for camera.inView because that doesn't happen until later in the pipeline.
        this.sprite.transform();
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inView( this.sprite.transPos, this.sprite.parentNode.radiusius ) )
        {
            this.sprite.incPosXYZ( (this.PROJECTILE_SPEED * highResTimer.elapsedTime) + this.shipVelocity );
            this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );

            return false;
        }

        return true;
    }
}

//
//  DESC: Script for handling player laser hitting target
//
class PlayerShip_LazerHit
{
    constructor( sprite )
    {
        // We are done with this sprite, queue it up to be deleted
        strategyManager.get('_player_ship_').destroy( sprite.parentNode );
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
//  DESC: Script for shooting laser
//
class EnemyShip_Shot
{
    constructor( sprite, enemySprite )
    {
        this.sprite = sprite;

        // Speed of the projectile
        this.PROJECTILE_SPEED = 0.25;
        this.PROJECTILE_ROT_SPEED = 0.5;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.playerShipNode = this.playerShipStratagy.get('player_ship');
        this.camera = this.playerShipStratagy.camera;
        this.sprite.setPos(enemySprite.pos);

        let playerShipSprite = this.playerShipNode.get();
        let length = playerShipSprite.pos.calcLength2D( enemySprite.pos );
        this.moveX = (playerShipSprite.pos.x - enemySprite.pos.x) / length;
        this.moveY = (playerShipSprite.pos.y - enemySprite.pos.y) / length;

        this.startPos = new Point;
        this.startPos.copy( enemySprite.pos );

        sprite.transform();
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

            if( this.startPos.calcLength2D( this.sprite.pos ) < settings.size.w )
                return false;
        }

        // We are done with this sprite, queue it up to be deleted
        this.playerShipStratagy.destroy(this.sprite.parentNode);

        return true;
    }
}

//
//  DESC: Script for handling enemy getting hit by player laser
//
class EnemyShip_LazerHit
{
    constructor( sprite )
    {
        // We are done with this sprite, queue it up to be deleted
        strategyManager.get('_enemy_').destroy( sprite.parentNode );
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
//  DESC: Script for handling enemy shot hitting player
//
class EnemyShot_Hit
{
    constructor( sprite )
    {
        // We are done with this sprite, queue it up to be deleted
        strategyManager.get('_player_ship_').destroy( sprite.parentNode );
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
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'PlayerShip_FireTailAnim',
        ( sprite ) => { return new PlayerShip_FireTailAnim( sprite ); } );

    scriptManager.set( 'PlayerShip_ShootLazer',
        ( obj, shipVelocity ) => { return new PlayerShip_ShootLazer( obj, shipVelocity ); } );

    scriptManager.set( 'PlayerShip_LazerHit',
        ( sprite ) => { return new PlayerShip_LazerHit( sprite ); } );

    scriptManager.set( 'EnemyShip_LazerHit',
        ( sprite ) => { return new EnemyShip_LazerHit( sprite ); } );

    scriptManager.set( 'EnemyShot_Hit',
        ( sprite ) => { return new EnemyShot_Hit( sprite ); } );

    scriptManager.set( 'EnemyShip_CheckForCollideWithPlayer',
        ( sprite ) => { return new EnemyShip_CheckForCollideWithPlayer( sprite ); } );

    scriptManager.set( 'EnemyShip_Shot',
        ( sprite, enemySprite ) => { return new EnemyShip_Shot( sprite, enemySprite ); } );
}
