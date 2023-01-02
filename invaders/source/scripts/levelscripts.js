
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
        this.radius = sprite.parentNode.radius;
        this.shipVelocity = shipVelocity

        // Speed of the projectile
        this.PROJECTILE_SPEED = 1.5;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.playerShipSprite = this.playerShipStratagy.get('player_ship').get();
        this.camera = this.playerShipStratagy.camera;

        // Enemy strategy
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Y Rotation
        let rot = this.playerShipSprite.rot;

        // Is the position flipped?
        this.offsetX = this.sprite.pos.x;
        this.offsetY = this.sprite.pos.y;
        this.flipped = false;
        if( rot.y )
        {
            this.offsetX = -this.offsetX;
            this.PROJECTILE_SPEED = -this.PROJECTILE_SPEED;
            this.flipped = true;
        }

        // Set the rotation
        this.sprite.setRot( rot, false );

        // Set the initial position
        this.sprite.setPos( this.playerShipSprite.pos );

        // Set the initial offset
        this.sprite.incPosXYZ( this.offsetX, this.offsetY );

        // Will have to do a preemptive transform so that the transPos data is available
        // for camera.inView because that doesn't happen until later in the pipeline.
        this.sprite.transform();
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            this.sprite.incPosXYZ( (this.PROJECTILE_SPEED * highResTimer.elapsedTime) + this.shipVelocity );
            this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );

            return false;
        }

        // We are done with this sprite, queue it up to be deleted
        this.playerShipStratagy.destroy(this.sprite.parentNode);

        return true;
    }
}

//
//  DESC: Script for shooting laser
//
class EnemyShip_Shoot
{
    constructor( sprite, enemySprite )
    {
        this.sprite = sprite;
        this.radius = sprite.parentNode.radius;

        // Speed of the projectile
        this.PROJECTILE_SPEED = 0.25;
        this.PROJECTILE_ROT_SPEED = 0.5;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.playerShipSprite = this.playerShipStratagy.get('player_ship').get();
        this.camera = this.playerShipStratagy.camera;
        this.sprite.setPos(enemySprite.pos);

        let length = this.playerShipSprite.pos.calcLength2D( enemySprite.pos );
        this.moveX = (this.playerShipSprite.pos.x - enemySprite.pos.x) / length;
        this.moveY = (this.playerShipSprite.pos.y - enemySprite.pos.y) / length;

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
            //this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry );

            if( this.startPos.calcLength2D( this.sprite.pos ) < settings.size.w )
                return false;
        }

        // We are done with this sprite, queue it up to be deleted
        this.playerShipStratagy.destroy(this.sprite.parentNode);

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

    scriptManager.set( 'EnemyShip_Shoot',
        ( sprite, enemySprite ) => { return new EnemyShip_Shoot( sprite, enemySprite ); } );
}
