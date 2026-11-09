//
//  FILE NAME: boss00scripts.js
//  DESC:      scripts for the boss00
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import * as easing from '../../../library/utilities/easingfunc';
import * as genFunc from '../../../library/utilities/genfunc';
import { soundManager } from '../../../library/sound/soundmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import * as gameDefs from '../state/gamedefs';

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
var gDegToRad = Math.PI / 180;

// Missile homing turn rate converted from degrees/sec to radians/ms
var gMissileTurnRate = gameDefs.BOSS00_MISSILE_TURN_RATE * gDegToRad / 1000;

// Turn rate for the outward loop when launched from the side of the boss away from the player (radians/ms)
var gMissileLoopTurnRate = gameDefs.BOSS00_MISSILE_LOOP_TURN_RATE * gDegToRad / 1000;

// Missile commits to a straight final run once this close to the player (squared for a sqrt-free compare)...
var gMissileLockDistSq = gameDefs.BOSS00_MISSILE_LOCK_DIST * gameDefs.BOSS00_MISSILE_LOCK_DIST;

// ...and its nose is within this angle of the player
var gMissileLockAlign = gameDefs.BOSS00_MISSILE_LOCK_ALIGN * gDegToRad;

//
//  DESC: Script for the boss00 missile flight
//        Launches straight up or down from either side of the boss, then curves around to home in on the
//        player. When launched from the side away from the player it shoots out and loops back around. Once close and lined up it commits to a straight final run the player can dodge (and it
//        shoots out the other side). Animated, nose facing its flight.
//
class Boss00Shot_Fire
{
    constructor( sprite, bossSprite )
    {
        this.playerShipStrategy = strategyManager.get('_player_ship_');
        this.enemyShotStrategy = strategyManager.get('_enemy_shot_');
        this.camera = this.playerShipStrategy.camera;

        // Continues the init
        this.recycle( sprite, bossSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, bossSprite )
    {
        this.sprite = sprite;
        this.playerShipSprite = this.playerShipStrategy.get('player_ship').get();

        // Launch from the center area of the boss, randomly from either side (regardless of where the player is)
        this._sideSign = (genFunc.randomInt( 0, 1 ) === 0) ? -1 : 1;
        sprite.setPos( bossSprite.pos );
        sprite.incPosXYZ( this._sideSign * gameDefs.BOSS00_MISSILE_SPAWN_OFFSET_X );

        // Shoot straight up or down at random, then curve to the player
        this._up = (genFunc.randomInt( 0, 1 ) === 0);
        this.heading = this._up ? (Math.PI / 2) : -(Math.PI / 2);

        // Launched from the side away from the player: instead of hard turning back across the boss,
        // force the turn outward (away from the player) so it shoots out and loops back around.
        // Turning outward from straight up is clockwise on the right side (-1) and counter-clockwise
        // on the left (+1); from straight down it's the opposite.
        this.loopTurnSign = 0;
        if( (this.wrapDeltaX( bossSprite.pos.x ) < 0 ? -1 : 1) !== this._sideSign )
            this.loopTurnSign = this._up ? -this._sideSign : this._sideSign;

        // The art points right (+X) so the heading is the rotation
        sprite.setRotXYZ( 0, 0, this.heading, false );

        sprite.setFrame( 0 );
        this.animTime = gameDefs.BOSS00_MISSILE_ANIM_MS;
        this.age = 0;
        this.locked = true;

        sprite.transform();
    }

    // 
    //  DESC: Wrap-aware shortest X delta from a world X to the player
    //
    wrapDeltaX( fromX )
    {
        return genFunc.wrapDelta( this.playerShipSprite.pos.x - fromX, gWrapSpan );
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.camera.inViewY( this.sprite.transPos, this.sprite.parentNode.radius ) )
        {
            // Fly straight out of the launch first, then start curving toward the player
            if( this.locked && this.age >= gameDefs.BOSS00_MISSILE_LAUNCH_TIME )
            {
                this._deltaX = this.wrapDeltaX( this.sprite.pos.x );
                this._deltaY = this.playerShipSprite.pos.y - this.sprite.pos.y;
                this._distSq = (this._deltaX * this._deltaX) + (this._deltaY * this._deltaY);

                // Shortest angular difference (-PI..PI) from the heading to the player
                this._turn = Math.atan2( this._deltaY, this._deltaX ) - this.heading;
                if( this._turn > Math.PI )
                    this._turn -= Math.PI * 2;
                else if( this._turn < -Math.PI )
                    this._turn += Math.PI * 2;

                // Outward loop is done once the natural turn toward the player is in the same direction
                if( this.loopTurnSign !== 0 && (this._turn < 0 ? -1 : 1) === this.loopTurnSign )
                    this.loopTurnSign = 0;

                // Still looping out - keep turning outward at the loop turn rate
                if( this.loopTurnSign !== 0 )
                {
                    this.heading += this.loopTurnSign * gMissileLoopTurnRate * highResTimer.elapsedTime;
                }
                // Close and lined up on the player - commit to a straight final run so the player can dodge
                else if( this._distSq < gMissileLockDistSq && Math.abs( this._turn ) < gMissileLockAlign )
                {
                    this.locked = false;
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
                }

                // Keep the heading in the -PI..PI range
                if( this.heading > Math.PI )
                    this.heading -= Math.PI * 2;
                else if( this.heading < -Math.PI )
                    this.heading += Math.PI * 2;
            }

            // Fly along the heading with the nose facing the flight direction
            this._moveInc = highResTimer.elapsedTime * gameDefs.BOSS00_MISSILE_SPEED;
            this.sprite.incPosXYZ( Math.cos( this.heading ) * this._moveInc, Math.sin( this.heading ) * this._moveInc );
            this.sprite.setRotXYZ( 0, 0, this.heading, false );

            // Cycle between the two animation frames
            this.animTime -= highResTimer.elapsedTime;
            if( this.animTime <= 0 )
            {
                this.animTime = gameDefs.BOSS00_MISSILE_ANIM_MS;
                this.sprite.setFrame( 1 - this.sprite.visualComponent.frameIndex );
            }

            // Wrap the missile position at the map boundary
            if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( gWrapSpan );
            else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( -gWrapSpan );

            this.sprite.collisionComponent.checkForCollision( this.playerShipStrategy.nodeAry, this.playerShipSprite.shieldOn );

            this.age += highResTimer.elapsedTime;
            if( this.age < gameDefs.BOSS00_MISSILE_LIFETIME )
                return false;
        }

        // We are done with this sprite, queue it up to be recycled
        this.enemyShotStrategy.recycle( this.sprite.parentNode );

        return true;
    }
}

//
//  DESC: Script for handling the boss00 missile hitting the player
//
class Boss00Shot_Hit
{
    constructor( sprite )
    {
        // Continues the init
        this.recycle( sprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite )
    {
        // We are done with this sprite, queue it up to be recycled
        strategyManager.get('_enemy_shot_').recycle( sprite.parentNode );
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
//  DESC: Script for handling boss00 getting hit
//
class Boss00Ship_Hit
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
        // Create an explode graphic node and translate it to the projectile sprite and execute the script
        if( projectileSprite.parentNode.userId != gameDefs.PLAYER_SHIP_ID )
        {
            this._explodeSprite = this.enemyStrategy.create('explode').get();
            this._explodeSprite.prepareScript( 'explode', projectileSprite, sprite );
        }

        // Hide the projectile and allow it to be recycled from the script moving it
        if( projectileSprite.parentNode.name === 'player_shot' )
            projectileSprite.setVisible( false );
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
//  DESC: Script for handling boss00 dying
//
class Boss00Ship_Die
{
    constructor( sprite )
    {
        this.easingY = new easing.valueTo;

        // Get the enemy strategy to recycle the boss
        this.enemyStrategy = strategyManager.get('_enemy_');

        // Continues the init
        this.recycle( sprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite )
    {
        this.sprite = sprite;

        // Remove the AI script so the boss stops attacking
        sprite.scriptComponent.remove( 'AI_Boss00' );

        // Let the level know the boss battle is over (switches back to the game music)
        eventManager.dispatchEvent( gameDefs.EGE_BOSS_DEFEATED );

        // Hide the beam
        this._beam = sprite.parentNode.findChild('boss00_beam');
        if( this._beam )
            this._beam.get().setVisible( false );

        // Hide the progress bars
        if( sprite.healthBarCtrl )
            sprite.healthBarCtrl.setVisible( false );
        if( sprite.hitBarCtrl )
            sprite.hitBarCtrl.setVisible( false );

        // Restore a building that was caught mid-attack
        if( sprite.targetBuilding )
        {
            sprite.targetBuilding.setPosXYZ( sprite.buildingBaseX, sprite.buildingBaseY );
            sprite.targetBuilding = null;
        }

        // Fall off the bottom of the screen while spinning
        this._dest = -(settings.deviceRes_half.h + sprite.parentNode.radius);
        this._offsetY = Math.abs( sprite.pos.y - this._dest );
        this.easingY.init( sprite.pos.y, this._dest, this._offsetY / 450, easing.getSineIn(), true );

        this.rotate = -0.003;
        this.rotateVelocity = -0.00001;

        // Death explosion - first burst right away
        this.burstCount = gameDefs.BOSS00_DEATH_BURSTS;
        this.burstTime = 0;
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

        // Death explosion: staggered bursts of random size scattered over the body. Each burst
        // follows the boss as it falls (Explode_animation tracks its offset from the boss).
        if( this.burstCount > 0 )
        {
            this.burstTime -= highResTimer.elapsedTime;
            if( this.burstTime <= 0 )
            {
                this.burstTime = gameDefs.BOSS00_DEATH_BURST_INTERVAL;
                --this.burstCount;

                this._explodeSprite = this.enemyStrategy.create('explode').get();
                this._explodeSprite.prepareScript( 'explode', this.sprite, this.sprite,
                    genFunc.randomArbitrary( -gameDefs.BOSS00_DEATH_BURST_SPREAD_X, gameDefs.BOSS00_DEATH_BURST_SPREAD_X ),
                    genFunc.randomArbitrary( -gameDefs.BOSS00_DEATH_BURST_SPREAD_Y, gameDefs.BOSS00_DEATH_BURST_SPREAD_Y ) );

                // Pooled explode nodes are reset (scale 1) when reused, so this doesn't leak to other explosions
                this._scale = genFunc.randomArbitrary( gameDefs.BOSS00_DEATH_BURST_SCALE_MIN, gameDefs.BOSS00_DEATH_BURST_SCALE_MAX );
                this._explodeSprite.setScaleXYZ( this._scale, this._scale );

                soundManager.play( '(level_1)', 'enemy_explosion' );
            }
        }

        if( this.easingY.isFinished() )
        {
            soundManager.play( '(level_1)', 'boss_crash' );

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
    scriptManager.set( 'Boss00Ship_Hit',
        ( sprite, projectileSprite ) => { return new Boss00Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'Boss00Ship_Die',
        ( sprite ) => { return new Boss00Ship_Die( sprite ); } );

    scriptManager.set( 'Boss00Shot_Fire',
        ( sprite, bossSprite ) => { return new Boss00Shot_Fire( sprite, bossSprite ); } );

    scriptManager.set( 'Boss00Shot_Hit',
        ( sprite ) => { return new Boss00Shot_Hit( sprite ); } );
}
