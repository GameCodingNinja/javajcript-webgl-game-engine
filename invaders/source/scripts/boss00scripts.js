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
import * as gameDefs from '../state/gamedefs';

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

        // Fall off the bottom of the screen while spinning (fast)
        this._dest = -(settings.deviceRes_half.h + sprite.parentNode.radius);
        this._offsetY = Math.abs( sprite.pos.y - this._dest );
        this.easingY.init( sprite.pos.y, this._dest, this._offsetY / 600, easing.getSineIn(), true );

        this.rotate = -0.003;
        this.rotateVelocity = -0.00001;
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
    scriptManager.set( 'Boss00Ship_Hit',
        ( sprite, projectileSprite ) => { return new Boss00Ship_Hit( sprite, projectileSprite ); } );

    scriptManager.set( 'Boss00Ship_Die',
        ( sprite ) => { return new Boss00Ship_Die( sprite ); } );
}
