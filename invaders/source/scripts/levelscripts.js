
//
//  FILE NAME: levelcripts.js
//  DESC:      script for the level
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
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
        this.laserSprite = sprite.parentNode.findChild('lazer_blast').sprite;

        // Speed of the projectile
        this.PROJECTILE_SPEED = 2.5;

        // Laser blast offset
        this.LASER_OFFSET = 10;

        // The velocity of the ship when this script is activated
        this.shipVelocity = shipVelocity;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.playerShipSprite = this.playerShipStratagy.get('player_ship').get();
        this.camera = this.playerShipStratagy.camera;

        // Enemy strategy
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Y Rotation
        this.rot = this.playerShipSprite.rot.y;

        // Is the position flipped?
        this.offsetX = this.LASER_OFFSET;
        this.flipped = false;
        if( this.rot )
        {
            this.offsetX = this.LASER_OFFSET;
            this.PROJECTILE_SPEED = -this.PROJECTILE_SPEED;
            this.flipped = true;
        }

        // Set the rotation
        this.sprite.setRot( this.playerShipSprite.rot, false );

        // Set the initial position
        this.sprite.setPos( this.playerShipSprite.pos );

        // Set the initial offset
        this.sprite.incPosXYZ( this.offsetX );

        // Will have to do a preemptive transform so that the transPos data is available
        // for camera.inView because that doesn't happen until later in the pipeline.
        this.sprite.transform();
        
        // Record the ship x
        this.playerShipX = this.playerShipSprite.pos.x;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inView( this.sprite.transPos, this.radius ) )
        {
            this.sprite.incPosXYZ( (this.PROJECTILE_SPEED * highResTimer.elapsedTime) + this.shipVelocity );
            let dist = Math.abs(this.sprite.pos.x - this.playerShipX - this.offsetX);

            if( this.sprite.collisionComponent.checkForCollision( this.enemyStratagy.nodeAry ) )
                console.log("hit");

            //console.log(dist);

            if( dist > 1240 )
                this.laserSprite.setFrame( 1 );
            else if( dist > 1100 )
                this.laserSprite.setFrame( 2 );

            else if( dist > 420 )
                this.laserSprite.setFrame( 3 );
            else if( dist > 270 )
                this.laserSprite.setFrame( 2 );
            else if( dist > 135 )
                this.laserSprite.setFrame( 1 );

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
}
