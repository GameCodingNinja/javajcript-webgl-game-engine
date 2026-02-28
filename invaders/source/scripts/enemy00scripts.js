
//
//  FILE NAME: enemy00scripts.js
//  DESC:      scripts for the enemy00
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;

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

        // Player ship
        this.playerShipStrategy = strategyManager.get('_player_ship_');
        this.enemyShotStrategy = strategyManager.get('_enemy_shot_');
        this.camera = this.playerShipStrategy.camera;

        // Continues the init
        this.recycle( sprite, enemySprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( sprite, enemySprite )
    {
        this.sprite = sprite;

        sprite.setPos( enemySprite.pos );
        sprite.setRotXYZ(0, 0, 0);
        sprite.setFrame(enemySprite.visualComponent.frameIndex);

        this.playerShipSprite = this.playerShipStrategy.get('player_ship').get();

        this._deltaX = this.playerShipSprite.pos.x - enemySprite.pos.x;
        if( this._deltaX > gWrapSpan / 2 )
            this._deltaX -= gWrapSpan;
        else if( this._deltaX < -gWrapSpan / 2 )
            this._deltaX += gWrapSpan;

        this._deltaY = this.playerShipSprite.pos.y - enemySprite.pos.y;
        this._length = Math.sqrt( this._deltaX * this._deltaX + this._deltaY * this._deltaY );
        this.moveX = this._deltaX / this._length;
        this.moveY = this._deltaY / this._length;

        this.projectile_rot_speed = -this.PROJECTILE_ROT_SPEED;
        if( this.moveX < 0.0 )
            this.projectile_rot_speed = this.PROJECTILE_ROT_SPEED;

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
            this._moveInc = highResTimer.elapsedTime * this.PROJECTILE_SPEED;
            this.sprite.incPosXYZ( this.moveX * this._moveInc, this.moveY * this._moveInc );
            this.sprite.incRotXYZ( 0, 0, this.projectile_rot_speed * highResTimer.elapsedTime );

            // Wrap the projectile position at the map boundary
            if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( gWrapSpan );
            else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this.sprite.incPosXYZ( -gWrapSpan );

            this.sprite.collisionComponent.checkForCollision( this.playerShipStrategy.nodeAry );

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
//  DESC: Script for handling enemy00 getting hit
//
class Enemy00Ship_Hit
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
//  DESC: Script for handling enemy00 ship dying
//
class Enemy00Ship_Die
{
    constructor( sprite )
    {
        this.easingY = new easing.valueTo;

        // Get the enemy strategy to create the explosion animation
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

        // Remove the AI script since the enemy is to die
        sprite.scriptComponent.remove( 'AI_Enemy00' );

        this._dest = -(settings.deviceRes_half.h + sprite.parentNode.radius);
        this._offsetY = Math.abs(sprite.pos.y - this._dest);
        this.easingY.init( sprite.pos.y, this._dest, this._offsetY / 250, easing.getSineIn(), true );

        this.rotate = 0.04;
        this.rotateVelocity = 0.00004;

        if( sprite.rot.y > 1 )
        {
            this.rotate = -0.04;
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
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'Enemy00Ship_Hit',
        ( sprite, projectileSprite ) => { return new Enemy00Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'Enemy00Ship_Die',
        ( sprite ) => { return new Enemy00Ship_Die( sprite ); } );

    scriptManager.set( 'Enemy00Shot_Hit',
        ( sprite ) => { return new Enemy00Shot_Hit( sprite ); } );

    scriptManager.set( 'Enemy00Ship_Shoot',
        ( sprite, enemySprite ) => { return new Enemy00Ship_Shoot( sprite, enemySprite ); } );
}
