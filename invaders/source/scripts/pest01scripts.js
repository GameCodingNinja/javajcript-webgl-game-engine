//
//  FILE NAME: pest01scripts.js
//  DESC:      scripts for the pest01 (the swarm)
//             (its hit and shot hit scripts are the generic wreck00 ones: Wreck00Ship_Hit, Wreck00Shot_Hit)
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;

// Easing function allocated once (the get functions create a new closure on every call)
var gSineIn = easing.getSineIn();

//
//  DESC: Script for the pest01 shot: a straight bolt out of the member's nose (it turns to face the player
//        to shoot), nose facing its flight (the art points right)
//
class Pest01Shot_Fire
{
    constructor( sprite, enemySprite, angle )
    {
        this.playerShipStrategy = strategyManager.get('_player_ship_');
        this.enemyShotStrategy = strategyManager.get('_enemy_shot_');
        this.camera = this.playerShipStrategy.camera;

        // Continues the init
        this.recycle( sprite, enemySprite, angle );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, enemySprite, angle )
    {
        this.sprite = sprite;
        this.playerShipSprite = this.playerShipStrategy.get('player_ship').get();

        this.moveX = Math.cos( angle );
        this.moveY = Math.sin( angle );
        sprite.setPos( enemySprite.pos );
        sprite.incPosXYZ( this.moveX * gameDefs.PEST01_SHOT_OFFSET, this.moveY * gameDefs.PEST01_SHOT_OFFSET );
        sprite.setRotXYZ( 0, 0, angle, false );

        // Distance flown, not the distance from the start (the strategy can be shifted when it wraps)
        this.distTraveled = 0;

        sprite.transform();
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inViewY( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            this._moveInc = highResTimer.elapsedTime * gameDefs.PEST01_SHOT_SPEED;
            this.sprite.incPosXYZ( this.moveX * this._moveInc, this.moveY * this._moveInc );

            // Wrap the shot position at the map boundary
            if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( gWrapSpan );
            else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( -gWrapSpan );

            this.sprite.collisionComponent.checkForCollision( this.playerShipStrategy.nodeAry, this.playerShipSprite.shieldOn );

            this.distTraveled += this._moveInc;
            if( this.distTraveled < settings.deviceRes.w )
                return false;
        }

        // We are done with this sprite, queue it up to be recycled
        this.enemyShotStrategy.recycle( this.sprite.parentNode );

        return true;
    }
}

//
//  DESC: Script for handling a pest01 member dying
//        Falls off the bottom of the screen spinning, like wreck00
//
class Pest01Ship_Die
{
    constructor( sprite, projectileSprite )
    {
        this.easingY = new easing.valueTo;

        // Get the enemy strategy to recycle the enemy
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

        // No longer part of the swarm (the other members stop keeping apart from it)
        sprite.swarmAlive = false;

        // Shot or rammed: the angry art as it falls (even if the swarm was still docile)
        sprite.setFrame( 1 );

        // Remove the AI script since the enemy is to die
        sprite.scriptComponent.remove( 'AI_Pest01' );

        this._dest = -(settings.deviceRes_half.h + sprite.parentNode.radius);
        this._offsetY = Math.abs(sprite.pos.y - this._dest);
        this.easingY.init( sprite.pos.y, this._dest, this._offsetY / 250, gSineIn, true );

        this._dist = this.sprite.pos.getDistanceNoGC( projectileSprite.pos );

        this.rotate = Math.abs(this._dist.y * 0.004);
        this.rotateVelocity = 0.00004;

        // Spin based on where it was hit: a positive y vs a negative y and the side it's hit from decide the direction.
        // The y distance from the center is how fast it starts spinning.
        if( (projectileSprite.rot.y > 1 && this._dist.y > 0) || (projectileSprite.rot.y < 1 && this._dist.y < 0) )
        {
            this.rotate = -Math.abs(this._dist.y * 0.004);
            this.rotateVelocity = -0.00004;
        }
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
            // We are done with these sprites, queue it up to be recycled
            this.enemyStrategy.recycle( this.sprite.parentNode );
            
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
    scriptManager.set( 'Pest01Shot_Fire',
        ( sprite, enemySprite, angle ) => { return new Pest01Shot_Fire( sprite, enemySprite, angle ); } );

    scriptManager.set( 'Pest01Ship_Die',
        ( sprite, projectileSprite ) => { return new Pest01Ship_Die( sprite, projectileSprite ); } );
}
