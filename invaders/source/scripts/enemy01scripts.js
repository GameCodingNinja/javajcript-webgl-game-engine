
//
//  FILE NAME: enemy01scripts.js
//  DESC:      scripts for the enemy01
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { soundManager } from '../../../library/sound/soundmanager';
import * as utilScripts from './utilityscripts';
import * as easing from '../../../library/utilities/easingfunc';

//
//  DESC: Script for handling enemy01 getting hit
//
class Enemy01Ship_Hit
{
    constructor( sprite, projectileSprite )
    {
        this.sprite = sprite;

        // Get the player ship strategy to delete the explosion animation
        this.playerShipStratagy = strategyManager.get('_player_ship_');

        // Get the enemy strategy to create the explosion animation
        this.enemyStratagy = strategyManager.get('_enemy_');

        // Create a reusable animation player
        this.explodeAnim = new utilScripts.PlayAnim();

        // Continues the init
        this.recycle( projectileSprite );
    }

    // 
    //  DESC: Recycle the script
    //
    recycle( projectileSprite )
    {
        // Create an explode graphic node and translate it to the projectile sprite
        this.explodeAnim.sprite = this.enemyStratagy.create('explode').get();
        this.explodeAnim.init( 24 );

        // Ajust the initial offset of the explosion animation
        if( projectileSprite.rot.y > 1 )
            this.explodeAnim.sprite.setPosXYZ( projectileSprite.pos.x + 30, projectileSprite.pos.y );
        else
            this.explodeAnim.sprite.setPosXYZ( projectileSprite.pos.x - 15, projectileSprite.pos.y );

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
        if( this.explodeAnim.sprite )
        {
            this.explodeAnim.sprite.setPosXYZ( this.sprite.pos.x - this.dif.x, this.sprite.pos.y - this.dif.y );
            if( this.explodeAnim.execute() )
            {
                this.enemyStratagy.recycle( this.explodeAnim.sprite.parentNode );
                this.explodeAnim.sprite = null;

                return true;
            }
        }

        return false;
    }
}

//
//  DESC: Script for handling enemy01 ship dying
//
class Enemy01Ship_Die
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.easingY = new easing.valueTo;
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Y Rotation
        this.dest = -(settings.deviceRes_half.h + this.sprite.parentNode.radius)
        this.offsetY = Math.abs(this.sprite.pos.y - this.dest);
        this.easingY.init( this.sprite.pos.y, this.dest, this.offsetY / 300, easing.getSineIn(), true );

        this.rotateVelocity = -0.00001;
        this.rotate = -0.005;
        if(this.sprite.rot.y > 1)
        {
            this.rotate = 0.005;
            this.rotateVelocity = 0.00001;
        }

        // Enemy strategy
        this.enemyStratagy = strategyManager.get('_enemy_');
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
            // Remove the AI script since the enemy is to die
            this.sprite.scriptComponent.remove( 'AI_Enemy01' );

            soundManager.play( '(level_1)', 'enemy01_crash' );

            // We are done with this sprite, queue it up to be recycled
            this.enemyStratagy.recycle( this.sprite.parentNode );

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
    scriptManager.set( 'Enemy01Ship_Hit',
            ( sprite, projectileSprite ) => { return new Enemy01Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'Enemy01Ship_Die',
        ( sprite ) => { return new Enemy01Ship_Die( sprite ); } );
}
