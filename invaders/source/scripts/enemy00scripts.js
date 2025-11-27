
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
        this.sprite = sprite;

        // Speed of the projectile
        this.PROJECTILE_SPEED = 0.25;
        this.PROJECTILE_ROT_SPEED = 0.5;

        this.startPos = new Point;

        // Player ship
        this.playerShipStratagy = strategyManager.get('_player_ship_');
        this.camera = this.playerShipStratagy.camera;

        // Continues the init
        this.recycle( enemySprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( enemySprite )
    {
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
//  DESC: Script for handling player ship explosion
//
class Explode_animation
{
    constructor( sprite, projectileSprite, shipSprite )
    {
        this.sprite = sprite;

        // Get the player ship strategy to delete the explosion animation
        this.playerShipStratagy = strategyManager.get('_player_ship_');

        // Setup the animation
        this.explodeAnim = new utilScripts.PlayAnim( sprite );

        // Continues the init
        this.recycle( projectileSprite, shipSprite );
    }

    // 
    //  DESC: Using as an init
    //
    recycle( projectileSprite, shipSprite )
    {
        this.shipSprite = shipSprite

        // This resets the animation
        this.explodeAnim.init( 24 );

        // Create an explode graphic node and translate it to the projectile sprite
        this.sprite.setPos( projectileSprite.pos );
        this.sprite.transform();

        this.dif = this.shipSprite.pos.getDistance( this.explodeAnim.sprite.pos );

        this._size = this.shipSprite.getSize();

        if(this.dif.x > this._size.w / 2)
            this.dif.x = (this._size.w / 2) - 15;
        else if(this.dif.x < -(this._size.w / 2))
            this.dif.x = -(this._size.w / 2) + 15

        if(this.dif.y > this._size.h / 2)
            this.dif.y = (this._size.h / 2) - 15;
        else if(this.dif.y < -(this._size.h / 2))
            this.dif.y = -(this._size.h / 2) + 15
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.explodeAnim.sprite.setPosXYZ( this.shipSprite.pos.x - this.dif.x, this.shipSprite.pos.y - this.dif.y);

        if( this.explodeAnim.execute() )
        {
            this.playerShipStratagy.recycle( this.sprite.parentNode );

            return true;
        }

        return false;
    }
}

//
//  DESC: Script for handling enemy00 getting hit
//
class Enemy00Ship_Hit
{
    constructor( sprite, projectileSprite )
    {
        this.sprite = sprite;

        // Create a reusable easing class
        this.easingY = new easing.valueTo;

        // Create a reusable animation player
        this.explodeAnim = new utilScripts.PlayAnim();

        // Get the player ship strategy to delete the explosion animation
        this.playerShipStratagy = strategyManager.get('_player_ship_');

        // Get the enemy strategy to create the explosion animation
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Continues the init
        this.recycle( projectileSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( projectileSprite )
    {
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

        // Create an explode graphic node and translate it to the projectile sprite
        this.explodeAnim.sprite = this.enemyStratagy.create('explode').get();
        this.explodeAnim.init( 24 );

        // Ajust the initial offset of the explosion animation based off the position of the enemy sprite X
        if( projectileSprite.rot.y > 1 )
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x + 15, projectileSprite.pos.y );
        else
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x - 15, projectileSprite.pos.y );

        this.explodeAnim.sprite.transform();

        // Hide the projectile and allow it to be recycled from the script moving it
        if( projectileSprite.parentNode.name === 'player_shot' )
        {
            projectileSprite.setVisible( false );
            // The projectile sprite script will recycle itself
        }

        this.dif = this.sprite.pos.getDistance( this.explodeAnim.sprite.pos );
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

        if( this.explodeAnim.sprite )
        {
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x - this.dif.x, this.sprite.pos.y - this.dif.y );
            if( this.explodeAnim.execute() )
            {
                this.enemyStratagy.recycle( this.explodeAnim.sprite.parentNode );
                this.explodeAnim.sprite = null;
            }
        }

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
        this.sprite = sprite;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
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
    scriptManager.set( 'Explode_animation',
        ( sprite, projectileSprite, shipSprite ) => { return new Explode_animation( sprite, projectileSprite, shipSprite ); } );

    scriptManager.set( 'Enemy00Ship_Hit',
        ( sprite, projectileSprite ) => { return new Enemy00Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'Enemy00Shot_Hit',
        ( sprite ) => { return new Enemy00Shot_Hit( sprite ); } );

    scriptManager.set( 'Enemy00Ship_Shoot',
        ( sprite, enemySprite ) => { return new Enemy00Ship_Shoot( sprite, enemySprite ); } );
}
