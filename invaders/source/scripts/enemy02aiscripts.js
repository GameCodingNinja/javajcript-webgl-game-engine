//
//  FILE NAME: enemy02aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { aiNode } from '../../../library/node/ainode';
import { soundManager } from '../../../library/sound/soundmanager';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

// Shared AI data
var ai_data = {};

const pixel_per_sec_100 = 100;

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
            this.data.playerShip = strategyManager.get('_player_ship_').get('player_ship').get();
            this.data.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
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
//  DESC: AI Leaf (task) node script. Desend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy02_Desend extends aiNode
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
        this._offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5);
        this.easingY.init( this.sprite.pos.y, this._offsetY, (this.sprite.pos.y - this._offsetY) / pixel_per_sec_100, easing.getSineOut() );

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
    //  DESC: Handle the desend
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
//  DESC: AI Leaf (task) node script. Desend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy02_Seek_and_Destroy extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingX = new easing.valueTo;
    }

    // 
    //  DESC: Handle post load init this.easingY.init
    //
    init()
    {
        // Calculated to move in pixels per second
        if(this.sprite.rot.y > 1)
            this.easingX.init( this.easingX.getValue(), -10, 2, easing.getLinear() );
        else
            this.easingX.init( this.easingX.getValue(), 10, 2, easing.getLinear() );
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingX.clear();
    }
    
    // 
    //  DESC: Handle the desend
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
            this.sprite.incPosXYZ( this.easingX.getValue(), 0 );

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
    // Enemy02 AI functions
    scriptManager.set( 'AI_Enemy02_Head',
        ( nodeData ) => { return new AI_Enemy02_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy02_Desend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy02_Desend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy02_Seek_and_Destroy',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy02_Seek_and_Destroy( nodeData, headNode, sprite ); } );
}
