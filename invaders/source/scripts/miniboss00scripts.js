
//
//  FILE NAME: miniboss00scripts.js
//  DESC:      scripts for the mini_boss_00
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { soundManager } from '../../../library/sound/soundmanager';
import { Point } from '../../../library/common/point';
import * as easing from '../../../library/utilities/easingfunc';
import * as genFunc from '../../../library/utilities/genfunc';
import * as gameDefs from '../state/gamedefs';

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
var gDegToRad = Math.PI / 180;

// Reusable points for placing the death explosions (no allocations)
var gLocalPoint = new Point;
var gWorldPoint = new Point;

//
//  DESC: Script for handling mini_boss_00 getting hit
//
class MiniBoss00Ship_Hit
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
        return true;
    }
}

//
//  DESC: Script for handling mini_boss_00 ship dying
//        Falls off the bottom of the screen spinning, with random explosions on it the whole way down
//
class MiniBoss00Ship_Die
{
    constructor( sprite )
    {
        this.easingY = new easing.valueTo;
        
        // Continues the init
        this.recycle( sprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite )
    {
        this.sprite = sprite;

        // Y Rotation
        this.dest = -(settings.deviceRes_half.h + sprite.parentNode.radius)
        this.offsetY = Math.abs(sprite.pos.y - this.dest);
        this.easingY.init( sprite.pos.y, this.dest, this.offsetY / 300, easing.getSineIn(), true );

        this.rotateVelocity = -0.00001;
        this.rotate = -0.005;
        if(sprite.rot.y > 1)
        {
            this.rotate = 0.005;
            this.rotateVelocity = 0.00001;
        }

        // Enemy strategy
        this.enemyStrategy = strategyManager.get('_enemy_');

        // First explosion right away
        this.burstTime = 0;
    }
    
    // 
    //  DESC: Pick a random point on the ship, inside its collision polygons (in the ship's local space,
    //        area weighted over the polygons' fan triangles), and put it in gWorldPoint with the ship's
    //        current transform. Its collision data stops updating once it's dying (collision disabled),
    //        so the local points go through the sprite's own matrix.
    //
    randomPointOnShip()
    {
        this._polygonAry = this.sprite.collisionComponent.polygonAry;

        // Total area of the fan triangles
        this._totalArea = 0;
        for( let i = 0; i < this._polygonAry.length; ++i )
            for( let j = 1; j < this._polygonAry[i].pointAry.length - 1; ++j )
                this._totalArea += this.triangleArea( this._polygonAry[i].pointAry, j );

        // Pick a triangle by area
        // i and j are read after the loops (the triangle the pick stopped on), so they're declared out here
        this._pick = Math.random() * this._totalArea;
        let i, j;
        for( i = 0; i < this._polygonAry.length; ++i )
        {
            this._pointAry = this._polygonAry[i].pointAry;
            for( j = 1; j < this._pointAry.length - 1; ++j )
            {
                this._pick -= this.triangleArea( this._pointAry, j );
                if( this._pick <= 0 )
                    break;
            }

            if( this._pick <= 0 )
                break;
        }

        if( i >= this._polygonAry.length )
        {
            this._pointAry = this._polygonAry[this._polygonAry.length - 1].pointAry;
            j = this._pointAry.length - 2;
        }

        // Uniform random point in the triangle (p0, pj, pj+1)
        this._r1 = Math.sqrt( Math.random() );
        this._r2 = Math.random();
        this._a = 1 - this._r1;
        this._b = this._r1 * (1 - this._r2);
        this._c = this._r1 * this._r2;
        gLocalPoint.x = (this._a * this._pointAry[0].x) + (this._b * this._pointAry[j].x) + (this._c * this._pointAry[j + 1].x);
        gLocalPoint.y = (this._a * this._pointAry[0].y) + (this._b * this._pointAry[j].y) + (this._c * this._pointAry[j + 1].y);
        gLocalPoint.z = 0;

        this.sprite.matrix.transformPoint( gWorldPoint, gLocalPoint );
    }

    // 
    //  DESC: Area of the fan triangle (p0, pj, pj+1) of a polygon
    //
    triangleArea( pointAry, j )
    {
        return Math.abs( ((pointAry[j].x - pointAry[0].x) * (pointAry[j + 1].y - pointAry[0].y)) -
                         ((pointAry[j + 1].x - pointAry[0].x) * (pointAry[j].y - pointAry[0].y)) ) / 2;
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

        // Random explosions of random size on the ship, inside its collision area. Each one follows it as
        // it falls (Explode_animation tracks its offset from the ship).
        this.burstTime -= highResTimer.elapsedTime;
        if( this.burstTime <= 0 )
        {
            this.burstTime = genFunc.randomInt( gameDefs.MINI_BOSS_00_DEATH_BURST_INTERVAL_MIN, gameDefs.MINI_BOSS_00_DEATH_BURST_INTERVAL_MAX );

            this.randomPointOnShip();
            this._explodeSprite = this.enemyStrategy.create('explode').get();
            this._explodeSprite.prepareScript( 'explode', this.sprite, this.sprite,
                gWorldPoint.x - this.sprite.pos.x, gWorldPoint.y - this.sprite.pos.y );

            // Pooled explode nodes are reset (scale 1) when reused, so this doesn't leak to other explosions
            this._scale = genFunc.randomArbitrary( gameDefs.MINI_BOSS_00_DEATH_BURST_SCALE_MIN, gameDefs.MINI_BOSS_00_DEATH_BURST_SCALE_MAX );
            this._explodeSprite.setScaleXYZ( this._scale, this._scale );

            soundManager.play( '(level_1)', 'enemy_explosion' );
        }

        if( this.easingY.isFinished() )
        {
            // Remove the AI script since the enemy is to die
            this.sprite.scriptComponent.remove( 'AI_MiniBoss00' );

            soundManager.play( '(level_1)', 'mini_boss_00_crash' );

            // We are done with this sprite, queue it up to be recycled
            this.enemyStrategy.recycle( this.sprite.parentNode );

            return true;
        }

        return false;
    }
}

//
//  DESC: Script for a mine dropped by mini_boss_00 in the path of a player chasing it.
//        It leaves with the ship's speed, thrown up or down to the height the player ship is heading for,
//        air drag slows it quickly and it sinks slowly, tumbling end over end
//        (fast as it's dropped, slowing to a lazy tumble), like an oval dropped from a moving ship.
//
class MiniBoss00Mine_Drop
{
    constructor( sprite, bossSprite, velocityX, targetY )
    {
        this.playerShipStrategy = strategyManager.get('_player_ship_');
        this.enemyShotStrategy = strategyManager.get('_enemy_shot_');
        this.camera = this.playerShipStrategy.camera;

        // Continues the init
        this.recycle( sprite, bossSprite, velocityX, targetY );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, bossSprite, velocityX, targetY )
    {
        this.sprite = sprite;
        this.playerShipSprite = this.playerShipStrategy.get('player_ship').get();

        // Dropped from behind the ship (velocity in px/s), thrown up or down so the drag stops it at the
        // target height (in the player ship's path): with drag k it travels v / k before it stops
        this.velX = velocityX;
        this.velY = gameDefs.MINI_BOSS_00_MINE_DRAG * (targetY - bossSprite.pos.y);
        sprite.setPosXYZ( bossSprite.pos.x - (Math.sign( velocityX ) * gameDefs.MINI_BOSS_00_MINE_DROP_OFFSET), bossSprite.pos.y );

        // Tumbles with its leading end tipping down (clockwise flying right), in radians/sec
        this.tumbleDir = (velocityX < 0) ? 1 : -1;
        this.spinRate = this.tumbleDir * genFunc.randomInt( gameDefs.MINI_BOSS_00_MINE_SPIN_MIN, gameDefs.MINI_BOSS_00_MINE_SPIN_MAX ) * gDegToRad;
        this.angle = 0;
        sprite.setRotXYZ();

        this.age = 0;

        sprite.transform();
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // Gone when it sinks out of the bottom of the view or gets old
        if( this.camera.inViewY( this.sprite.transPos, this.sprite.parentNode.radius ) &&
            this.age < gameDefs.MINI_BOSS_00_MINE_LIFETIME )
        {
            this._dt = highResTimer.elapsedTime / 1000;
            this._drag = Math.exp( -gameDefs.MINI_BOSS_00_MINE_DRAG * this._dt );

            // Air drag slows it, gravity pulls it down (with the drag it sinks slowly)
            this.velX *= this._drag;
            this.velY = (this.velY * this._drag) - (gameDefs.MINI_BOSS_00_MINE_GRAVITY * this._dt);
            this.sprite.incPosXYZ( this.velX * this._dt, this.velY * this._dt );

            // The tumble slows down with the drag too, to a lazy tumble
            this._tumble = this.tumbleDir * gameDefs.MINI_BOSS_00_MINE_TUMBLE * gDegToRad;
            this.spinRate = this._tumble + ((this.spinRate - this._tumble) * this._drag);
            this.angle += this.spinRate * this._dt;
            this.sprite.setRotXYZ( 0, 0, this.angle, false );

            // Wrap the mine position at the map boundary
            if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( gWrapSpan );
            else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( -gWrapSpan );

            this.sprite.collisionComponent.checkForCollision( this.playerShipStrategy.nodeAry, this.playerShipSprite.shieldOn );

            this.age += highResTimer.elapsedTime;

            return false;
        }

        // We are done with this sprite, queue it up to be recycled
        this.enemyShotStrategy.recycle( this.sprite.parentNode );

        return true;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'MiniBoss00Mine_Drop',
        ( sprite, bossSprite, velocityX, targetY ) => { return new MiniBoss00Mine_Drop( sprite, bossSprite, velocityX, targetY ); } );

    scriptManager.set( 'MiniBoss00Ship_Hit',
            ( sprite, projectileSprite ) => { return new MiniBoss00Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'MiniBoss00Ship_Die',
        ( sprite ) => { return new MiniBoss00Ship_Die( sprite ); } );
}
