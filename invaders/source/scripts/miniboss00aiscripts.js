//
//  FILE NAME: miniboss00aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { aiNode } from '../../../library/node/ainode';
import { soundManager } from '../../../library/sound/soundmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

// Easing functions, made once: each easing.getX() call creates a new function
var gLinear = easing.getLinear();
var gSineOut = easing.getSineOut();

//
//  DESC: AI MiniBoss00 head (root) node Head class script
//        Only supports one child
//
class AI_MiniBoss00_Head extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        this.state = defs.EAIS_INIT;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Initialize the tree by doing a reset
        this.resetTree();
    }

    // 
    //  DESC: Execute the children
    //
    execute()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.state = defs.EAIS_ACTIVE;
        }

        // Returning SUCCESS or FAILURE terminates the execution of this behavioral tree
        if( this.nodeAry[0].evaluate() != defs.EAIS_ACTIVE )
            return true;

        return false;
    }
}

//
//  DESC: AI Leaf (task) node script. Descend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_MiniBoss00_Descend extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingY = new easing.valueTo;
        this.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
    }

    // 
    //  DESC: Handle post load init this.easingY.init
    //
    init()
    {
        // Randomly select it's Y offset to force to
        // player to learn where to go to avoid getting hit.
        switch (genFunc.randomInt( 0, 2 ))
        {
            case 0:
                this._yDestination = 0;
            break;
            
            case 1:
                this._yDestination = -33;
            break;

            default:
                this._yDestination = -50;
        }

        this.easingY.init( this.sprite.pos.y, this._yDestination, this.sprite.pos.y / gameDefs.pixel_per_sec_200, gSineOut );

        // Init the hit count
        this.sprite.hitCount = 0;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingY.clear();
    }
    
    // 
    //  DESC: Handle the descend
    //
    evaluate()
    {
        // Do first time inits
        if( this.state === defs.EAIS_INIT )
        {
            this.init();
            this.state = defs.EAIS_ACTIVE;

            let gsnd = this.groupPlayer.getSound(`mini_boss_00_descend`);
            gsnd.play();
            gsnd.fadeTo( 0.3, 1250 );
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;

                let gsnd1 = this.groupPlayer.getSound(`mini_boss_00_loop_sound`);
                gsnd1.play( true );
                gsnd1.fadeTo( 0.7, 1000 );

                this.groupPlayer.getSound(`mini_boss_00_descend`).fadeTo( 0.0, 500 );
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Fly across the map, dropping mines in the path of a player chasing it
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_MiniBoss00_Go extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingX = new easing.valueTo;

        this.playerShipStrategy = strategyManager.get('_player_ship_');
        this.enemyShotStrategy = strategyManager.get('_enemy_shot_');
        this.camera = this.playerShipStrategy.camera;
        this.mineTime = 0;
        this.playerLastY = null;
        this.playerVelY = 0;
    }

    // 
    //  DESC: Drop a mine behind it every so often while the player chases it: the player is alive, behind it,
    //        close and lined up, and it's in view (not while it's dying). Each mine is thrown to the height the player ship is
    //        heading for (its vertical speed, smoothed, MINI_BOSS_00_MINE_LEAD ahead), so it's in its path.
    //
    dropMines()
    {
        if( highResTimer.elapsedTime <= 0 )
            return;

        // Track the player ship's vertical speed (px/s, smoothed)
        this._playerShipSprite = this.playerShipStrategy.get('player_ship').get();

        // Dying (its collision is disabled when it's shot down): no more mines
        if( !this.sprite.collisionComponent.enable )
            return;

        if( this.playerLastY !== null )
            this.playerVelY = (this.playerVelY * 0.8) + (0.2 * (this._playerShipSprite.pos.y - this.playerLastY) * 1000 / highResTimer.elapsedTime);
        this.playerLastY = this._playerShipSprite.pos.y;

        this.mineTime -= highResTimer.elapsedTime;
        if( this.mineTime > 0 )
            return;
        this._dirX = (this.sprite.rot.y > 1) ? -1 : 1;
        this._behindX = -genFunc.wrapDelta( this._playerShipSprite.pos.x - this.sprite.pos.x, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 ) * this._dirX;

        if( this._playerShipSprite.collisionComponent.enable &&
            this._behindX > 0 && this._behindX < gameDefs.MINI_BOSS_00_MINE_TRIGGER_DIST &&
            Math.abs( this._playerShipSprite.pos.y - this.sprite.pos.y ) < gameDefs.MINI_BOSS_00_MINE_TRIGGER_Y &&
            this.camera.inViewWrapped( this.sprite.transPos, this.sprite.parentNode.radius, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 ) )
        {
            // Where the player ship is heading, kept in its height range
            this._targetY = this._playerShipSprite.pos.y + (this.playerVelY * gameDefs.MINI_BOSS_00_MINE_LEAD) +
                genFunc.randomInt( -gameDefs.MINI_BOSS_00_MINE_SCATTER, gameDefs.MINI_BOSS_00_MINE_SCATTER );
            this._targetY = Math.min( Math.max( this._targetY, gameDefs.MINI_BOSS_00_MINE_BOTTOM_Y ), gameDefs.MINI_BOSS_00_MINE_TOP_Y );

            // Leaves with the ship's speed (px/s)
            this._mineSprite = this.enemyShotStrategy.create('mini_boss_00_mine').get();
            this._mineSprite.scriptComponent.prepare( 'shoot', this._mineSprite, this.sprite,
                this.easingX.getValue() * highResTimer.timeScale * 1000 / highResTimer.elapsedTime, this._targetY );

            this.mineTime = genFunc.randomInt( gameDefs.MINI_BOSS_00_MINE_INTERVAL_MIN, gameDefs.MINI_BOSS_00_MINE_INTERVAL_MAX );
        }
    }

    // 
    //  DESC: Handle post load init this.easingY.init
    //
    init()
    {
        // Calculated to move in pixels per second
        if(this.sprite.rot.y > 1)
            this.easingX.init( this.easingX.getValue(), -20, 3, gLinear );
        else
            this.easingX.init( this.easingX.getValue(), 20, 3, gLinear );
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingX.clear();
        this.mineTime = 0;
        this.playerLastY = null;
        this.playerVelY = 0;
    }
    
    // 
    //  DESC: Handle the descend
    //
    evaluate()
    {
        // Do first time inits
        if( this.state === defs.EAIS_INIT )
        {
            this.init();
            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingX.execute();
            this.sprite.incPosXYZ( this.easingX.getValue() * highResTimer.timeScale );

            this.dropMines();

            // Loop the player strategy and camera
            if( this.sprite.pos.x < -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST + 50) )
            {
                this.sprite.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );
            }
            else if( this.sprite.pos.x > (gameDefs.GAMEPLAY_LOOPING_WRAP_DIST - 20) )
            {
                this.sprite.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            }
        }

        return this.state;
    }
}


// 
//  DESC: Load scripts
//
export function loadScripts()
{
    // MiniBoss00 AI functions
    scriptManager.set( 'AI_MiniBoss00_Head',
        ( nodeData ) => { return new AI_MiniBoss00_Head( nodeData ); } );

    scriptManager.set( 'AI_MiniBoss00_Descend',
        ( nodeData, headNode, sprite ) => { return new AI_MiniBoss00_Descend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_MiniBoss00_Go',
        ( nodeData, headNode, sprite ) => { return new AI_MiniBoss00_Go( nodeData, headNode, sprite ); } );
}
