//
//  FILE NAME: enemy01aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { aiNode } from '../../../library/node/ainode';
import { soundManager } from '../../../library/sound/soundmanager';
import { scriptSingleton } from '../../../library/script/scriptcomponent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

const pixel_per_sec_100 = 100,
      pixel_per_sec_200 = 200;

//
//  DESC: AI Enemy01 head (root) node Head class script
//        Only supports one child
//
class AI_Enemy01_Head extends aiNode
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
//  DESC: AI Leaf (task) node script. Desend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy01_Desend extends aiNode
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
                this._yDestination = 20;
            break;
            
            case 1:
                this._yDestination = -20;
            break;

            default:
                this._yDestination = -60;
        }

        this.easingY.init( this.sprite.pos.y, this._yDestination, this.sprite.pos.y / pixel_per_sec_200, easing.getSineOut() );

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
            this.groupPlayer.play('enemy01_desend');
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;

                let gsnd = soundManager.getSound( '(level_1)', `enemy01_loop_sound` );
                scriptSingleton.prepare( 'sound_fade', 0.7, 1000, gsnd, () => gsnd.play('enemy01_loop_sound', true) );
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Desend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy01_Go extends aiNode
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
            this.easingX.init( this.easingX.getValue(), -20, 2, easing.getLinear() );
        else
            this.easingX.init( this.easingX.getValue(), 20, 2, easing.getLinear() );
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
    // Enemy01 AI functions
    scriptManager.set( 'AI_Enemy01_Head',
        ( nodeData ) => { return new AI_Enemy01_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy01_Desend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Desend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy01_Go',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Go( nodeData, headNode, sprite ); } );
}
