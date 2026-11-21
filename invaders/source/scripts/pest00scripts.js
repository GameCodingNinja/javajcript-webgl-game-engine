//
//  FILE NAME: pest00scripts.js
//  DESC:      scripts for the pest00
//             (its hit and missile hit scripts are the generic wreck00 ones: Wreck00Ship_Hit, Wreck00Shot_Hit)
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import * as easing from '../../../library/utilities/easingfunc';
import * as genFunc from '../../../library/utilities/genfunc';
import * as gameDefs from '../state/gamedefs';

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
var gDegToRad = Math.PI / 180;

// Missile homing turn rate converted from degrees/sec to radians/ms
var gMissileTurnRate = gameDefs.PEST00_MISSILE_TURN_RATE * gDegToRad / 1000;

// Missile commits to a straight final run once this close to the player (squared for a sqrt-free compare)...
var gMissileLockDistSq = gameDefs.PEST00_MISSILE_LOCK_DIST * gameDefs.PEST00_MISSILE_LOCK_DIST;

// ...and its nose is within this angle of the player
var gMissileLockAlign = gameDefs.PEST00_MISSILE_LOCK_ALIGN * gDegToRad;

// Easing function allocated once (the get functions create a new closure on every call)
var gSineIn = easing.getSineIn();

//
//  DESC: Script for the pest00 missile flight
//        Flung straight out from the rim of the spinning enemy at an angle, slowing down, then turns to
//        home in on the player. Once close and lined up it commits to a straight final run the player
//        can dodge. Nose facing its flight (the art points right).
//
class Pest00Shot_Fire
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

        // Start on the rim of the enemy, heading straight out
        this.heading = angle;
        sprite.setPos( enemySprite.pos );
        sprite.incPosXYZ( Math.cos( angle ) * gameDefs.PEST00_MISSILE_SPAWN_OFFSET, Math.sin( angle ) * gameDefs.PEST00_MISSILE_SPAWN_OFFSET );
        sprite.setRotXYZ( 0, 0, this.heading, false );

        this.age = 0;
        this.homing = true;

        sprite.transform();
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inViewY( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            // Launch: fly straight out, slowing down to the cruise speed
            if( this.age < gameDefs.PEST00_MISSILE_LAUNCH_TIME )
            {
                this._speed = gameDefs.PEST00_MISSILE_LAUNCH_SPEED +
                    ((gameDefs.PEST00_MISSILE_SPEED - gameDefs.PEST00_MISSILE_LAUNCH_SPEED) * gSineIn( this.age / gameDefs.PEST00_MISSILE_LAUNCH_TIME ));
            }
            else
            {
                this._speed = gameDefs.PEST00_MISSILE_SPEED;

                // Home in on the player until it commits to the final run
                if( this.homing )
                {
                    this._deltaX = genFunc.wrapDelta( this.playerShipSprite.pos.x - this.sprite.pos.x, gWrapSpan );
                    this._deltaY = this.playerShipSprite.pos.y - this.sprite.pos.y;
                    this._distSq = (this._deltaX * this._deltaX) + (this._deltaY * this._deltaY);

                    // Shortest angular difference (-PI..PI) from the heading to the player
                    this._turn = Math.atan2( this._deltaY, this._deltaX ) - this.heading;
                    if( this._turn > Math.PI )
                        this._turn -= Math.PI * 2;
                    else if( this._turn < -Math.PI )
                        this._turn += Math.PI * 2;

                    // Close and lined up on the player - commit to a straight final run so the player can dodge
                    if( this._distSq < gMissileLockDistSq && Math.abs( this._turn ) < gMissileLockAlign )
                    {
                        this.homing = false;
                    }
                    else
                    {
                        // Curve toward the player, limited by the turn rate
                        this._maxTurn = gMissileTurnRate * highResTimer.elapsedTime;
                        if( this._turn > this._maxTurn )
                            this._turn = this._maxTurn;
                        else if( this._turn < -this._maxTurn )
                            this._turn = -this._maxTurn;

                        this.heading += this._turn;

                        // Keep the heading in the -PI..PI range
                        if( this.heading > Math.PI )
                            this.heading -= Math.PI * 2;
                        else if( this.heading < -Math.PI )
                            this.heading += Math.PI * 2;
                    }
                }
            }

            // Fly along the heading with the nose facing the flight direction
            this._moveInc = highResTimer.elapsedTime * this._speed;
            this.sprite.incPosXYZ( Math.cos( this.heading ) * this._moveInc, Math.sin( this.heading ) * this._moveInc );
            this.sprite.setRotXYZ( 0, 0, this.heading, false );

            // Wrap the missile position at the map boundary
            if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( gWrapSpan );
            else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( -gWrapSpan );

            this.sprite.collisionComponent.checkForCollision( this.playerShipStrategy.nodeAry, this.playerShipSprite.shieldOn );

            this.age += highResTimer.elapsedTime;
            if( this.age < gameDefs.PEST00_MISSILE_LIFETIME )
                return false;
        }

        // We are done with this sprite, queue it up to be recycled
        this.enemyShotStrategy.recycle( this.sprite.parentNode );

        return true;
    }
}

//
//  DESC: Script for handling pest00 ship dying
//        Falls off the bottom of the screen spinning, like wreck00
//
class Pest00Ship_Die
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

        // Remove the AI script since the enemy is to die
        sprite.scriptComponent.remove( 'AI_Pest00' );

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
            // We are done with this sprite, queue it up to be recycled
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
    scriptManager.set( 'Pest00Shot_Fire',
        ( sprite, enemySprite, angle ) => { return new Pest00Shot_Fire( sprite, enemySprite, angle ); } );

    scriptManager.set( 'Pest00Ship_Die',
        ( sprite, projectileSprite ) => { return new Pest00Ship_Die( sprite, projectileSprite ); } );
}
