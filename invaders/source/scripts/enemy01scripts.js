
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

        // Create an explode graphic node and translate it to the projectile sprite and execute the script
        this._explodeSprite = this.enemyStratagy.create('explode').get();
        this._explodeSprite.prepareScript( 'explode', projectileSprite, this.sprite, (projectileSprite.rot.y > 1) ? -30 : 20 );

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
//  DESC: Script for handling enemy01 ship dying
//
class Enemy01Ship_Die
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
