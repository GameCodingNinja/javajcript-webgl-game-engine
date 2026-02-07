//
//  FILE NAME: enemy02aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { aiNode } from '../../../library/node/ainode';
import { soundManager } from '../../../library/sound/soundmanager';
import { scriptSingleton } from '../../../library/script/scriptcomponent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

// Shared AI data
var ai_data = {};

// 
//  DESC: Clear the AI data
//
export function clearAIData()
{
    ai_data = {};
}


//
//  DESC: AI Enemy02 head (root) node Head class script
//        Only supports one child
//
class AI_Enemy02_Head extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        this.data = ai_data;
        this.state = defs.EAIS_INIT;
    }

    // 
    //  DESC: Handle post load init
    //
    init()
    {
        if( genFunc.isEmpty( this.data ) )
        {
            this.data.playerShipStrategy = strategyManager.get('_player_ship_');
            this.data.playerShipSprite = this.data.playerShipStrategy.get('player_ship').get();
            this.data.camera = this.data.playerShipStrategy.camera;
        }
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
            this.init();
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
class AI_Enemy02_Descend extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Handle post load init this.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
    //
    init()
    {
        // Calculated to move in pixels per second
        this.easingY.init(
            this.sprite.pos.y,
            this.data.playerShipSprite.pos.y,
            Math.abs(this.sprite.pos.y - this.data.playerShipSprite.pos.y) / gameDefs.pixel_per_sec_200,
            easing.getSineOut() );

        // Init the hit count
        this.sprite.hitCount = 0;
        this.sprite.alive = true;
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

            let gsnd = soundManager.getSound( '(level_1)', `enemy02_loop_sound` );
            scriptSingleton.prepare( 'sound_fade', 1.0, 4000, gsnd, () => gsnd.play('enemy02_loop_sound', true) );
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Descend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy02_Seek_and_Destroy extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingX = new easing.valueTo;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Handle post load init this.easingY.init
    //
    init()
    {
        // Calculated to move in pixels per second
        if(this.sprite.rot.y > 1)
            this.easingX.init( this.easingX.getValue(), -gameDefs.X_EASING_SPEED, 2, easing.getLinear() );
        else
            this.easingX.init( this.easingX.getValue(), gameDefs.X_EASING_SPEED, 2, easing.getLinear() );

        this.easingY.init(
            this.sprite.pos.y,
            this.data.playerShipSprite.pos.y,
            Math.abs(this.sprite.pos.y - this.data.playerShipSprite.pos.y) / gameDefs.pixel_per_sec_100,
            easing.getLinear() );
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingX.clear();
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
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingX.execute();
            this.easingY.execute();

            this.sprite.incPosXYZ( this.easingX.getValue() );

            if(this.sprite.alive)
                this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );
            else
                this.sprite.setPosXYZ( this.sprite.pos.x, this.sprite.pos.y );

            // Loop the player strategy and camera
            if( this.sprite.pos.x < -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST + 50) )
            {
                this.sprite.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );
            }
            else if( this.sprite.pos.x > (gameDefs.GAMEPLAY_LOOPING_WRAP_DIST - 20) )
            {
                this.sprite.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            }

            if(this.sprite.alive)
            {
                this._y_pixel_per_sec = gameDefs.pixel_per_sec_200;

                if( !this.data.camera.inViewX( this.sprite.transPos, this.sprite.parentNode.radius ) )
                {
                    this._y_pixel_per_sec = gameDefs.pixel_per_sec_300;

                    this._wrapDist = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
                    this._directDiff = this.data.playerShipSprite.pos.x - this.sprite.pos.x;
                    this._directDist = Math.abs(this._directDiff);

                    if(this._directDist > 800)
                    {
                        this._wrappedDist = this._wrapDist - this._directDist;

                        if(this._wrappedDist < this._directDist)
                            this._shouldGoRight = (this._directDiff < 0);
                        else
                            this._shouldGoRight = (this._directDiff > 0);

                        if(this._shouldGoRight && (this.sprite.rot.y > 1))
                        {
                            // Flip the ship facing right
                            this.sprite.setRotXYZ( 0, 0 );

                            this.easingX.init( this.easingX.getValue(), gameDefs.X_EASING_SPEED, 2, easing.getLinear() );
                        }
                        else if(!this._shouldGoRight && (this.sprite.rot.y < 1))
                        {
                            // Flip the ship facing left
                            this.sprite.setRotXYZ( 0, 180 );

                            this.easingX.init( this.easingX.getValue(), -gameDefs.X_EASING_SPEED, 2, easing.getLinear() );
                        }
                    }
                }

                if(this.easingY.isFinished())
                {
                    this.easingY.init(
                        this.easingY.getValue(),
                        this.data.playerShipSprite.pos.y,
                        Math.abs(this.easingY.getValue() - this.data.playerShipSprite.pos.y) / this._y_pixel_per_sec,
                        easing.getLinear() );
                }
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
    // Enemy02 AI functions
    scriptManager.set( 'AI_Enemy02_Head',
        ( nodeData ) => { return new AI_Enemy02_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy02_Descend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy02_Descend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy02_Seek_and_Destroy',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy02_Seek_and_Destroy( nodeData, headNode, sprite ); } );
}
