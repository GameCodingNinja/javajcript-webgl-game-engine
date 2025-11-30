
//
//  FILE NAME: enemy00scripts.js
//  DESC:      scripts for the enemy00
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { Point } from '../../../library/common/point';
import { settings } from '../../../library/utilities/settings';
import * as utilScripts from './utilityscripts';
import * as easing from '../../../library/utilities/easingfunc';

//
//  DESC: Script for shooting enemy00 projectile
//
class Enemy00Ship_Shoot
{
    constructor( sprite, enemySprite )
    {
        // Speed of the projectile
        this.PROJECTILE_SPEED = 0.25;
        this.PROJECTILE_ROT_SPEED = 0.5;

        this.startPos = new Point;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.camera = this.playerShipStratagy.camera;

        // Continues the init
        this.recycle( sprite, enemySprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, enemySprite )
    {
        this.sprite = sprite;

        this.sprite.setPos( enemySprite.pos );
        this.sprite.setRotXYZ(0, 0, 0);

        this.playerShipSprite = this.playerShipStratagy.get('player_ship').get();
        this._length = this.playerShipSprite.pos.calcLength2D( enemySprite.pos );
        this.moveX = (this.playerShipSprite.pos.x - enemySprite.pos.x) / this._length;
        this.moveY = (this.playerShipSprite.pos.y - enemySprite.pos.y) / this._length;

        this.projectile_rot_speed = -this.PROJECTILE_ROT_SPEED;
        if( this.moveX < 0.0 )
            this.projectile_rot_speed = this.PROJECTILE_ROT_SPEED;

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
            this.sprite.incRotXYZ( 0, 0, this.projectile_rot_speed * highResTimer.elapsedTime );
            this.sprite.collisionComponent.checkForCollision( this.playerShipStratagy.nodeAry );

            if( this.startPos.calcLength2D( this.sprite.pos ) < settings.deviceRes.w )
                return false;
        }

        // We are done with this sprite, queue it up to be recycled
        this.playerShipStratagy.recycle( this.sprite.parentNode );

        return true;
    }
}

//
//  DESC: Script for handling enemy00 getting hit
//
class Enemy00Ship_Hit
{
    constructor( sprite, projectileSprite )
    {
        // Create a reusable easing class
        this.easingY = new easing.valueTo;

        // Get the enemy strategy to create the explosion animation
        this.enemyStratagy = strategyManager.get('_enemy_');

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
        this.sprite.scriptComponent.remove( 'AI_Enemy00' );

        this._dist = this.sprite.pos.getDistance( projectileSprite.pos );

        this._dest = -(settings.deviceRes_half.h + this.sprite.parentNode.radius)
        this._offsetY = Math.abs(this.sprite.pos.y - this._dest);
        this.easingY.init( this.sprite.pos.y, this._dest, this._offsetY / 250, easing.getSineIn(), true );

        this.rotate = 0.04;
        this.rotateVelocity = 0.00004;

        if( (this._dist.x > 0 && this._dist.y > 0) || (this._dist.x < 0 && this._dist.y < 0) )
        {
            this.rotate = -0.04;
            this.rotateVelocity = -0.00004;
        }

        // Create an explode graphic node and translate it to the projectile sprite and execute the script
        this._explodeSprite = this.enemyStratagy.create('explode').get();
        this._explodeSprite.prepareScript( 'explode', projectileSprite, this.sprite, (projectileSprite.rot.y > 1) ? -15 : 15 );

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
        this.easingY.execute();
        this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );
        this.sprite.incRotXYZ( 0, 0, (this.rotate * highResTimer.elapsedTime) );
        this.rotate += this.rotateVelocity * highResTimer.elapsedTime;

        if( this.easingY.isFinished() )
        {
            // We are done with these sprites, queue it up to be recycled
            this.enemyStratagy.recycle( this.sprite.parentNode );
            
            return true;
        }

        return false;
    }
}

//
//  DESC: Script for handling enemy00 shot hitting player
//
class Enemy00Shot_Hit
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
        this.sprite = sprite;

        // We are done with this sprite, queue it up to be recycled
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
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'Enemy00Ship_Hit',
        ( sprite, projectileSprite ) => { return new Enemy00Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'Enemy00Shot_Hit',
        ( sprite ) => { return new Enemy00Shot_Hit( sprite ); } );

    scriptManager.set( 'Enemy00Ship_Shoot',
        ( sprite, enemySprite ) => { return new Enemy00Ship_Shoot( sprite, enemySprite ); } );
}
