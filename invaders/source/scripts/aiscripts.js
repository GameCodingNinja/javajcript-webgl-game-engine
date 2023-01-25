//
//  FILE NAME: aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { Node } from '../../../library/node/node';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';

var ai_data = {};

const pixel_per_sec = 100;

// 
//  DESC: Clear the AI data
//
export function clearAIData()
{
    ai_data = {};
}

//
//  DESC: AI Enemy head (root) node base class script
//        Only supports one child
//
class AI_Enemy_Head extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.data = ai_data;
    }

    // 
    //  DESC: Handle post load init
    //
    init()
    {
        if( genFunc.isEmpty( this.data ) )
        {
            let playerShipStratagy = strategyManager.get('_player_ship_');
            this.data['playerShipStratagy'] = playerShipStratagy;
            this.data['buildings'] = strategyManager.get("_buildings_").nodeAry;
            this.data['enemy'] = strategyManager.get("_enemy_").nodeAry;
            this.data['playerShip'] = playerShipStratagy.get('player_ship').get();
            this.data['camera'] = playerShipStratagy.camera;
        }
    }
    
    // 
    //  DESC: Execute the children
    //
    execute()
    {
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
class AI_Enemy_Desend extends Node
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Handle post load initthis.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
    //
    init()
    {
        // Set the initial position of the sprite above the height of the screen
        // with a random amount to delay how long it takes to be visible on the screen
        this.sprite.targetIndex = 31;//genFunc.randomInt( 0, this.data['buildings'].length-1 );
        let offsetY = genFunc.randomInt(0, 200);
        this.sprite.setPosXYZ( this.data['buildings'][this.sprite.targetIndex].get().pos.x, settings.size_half.h + (this.sprite.getSize().h / 2) + offsetY );
        offsetY += (this.sprite.getSize().h / 2) + genFunc.randomInt(50, settings.size_half.h - 50);

        // Calculated to move in pixels per second
        this.easingY.init( this.sprite.pos.y, (this.sprite.pos.y - offsetY), offsetY / pixel_per_sec, easing.getSineOut() );
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        this.easingY.execute();
        this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

        if( this.easingY.isFinished() && (this.state === defs.EAIS_ACTIVE) )
        {
            this.state = defs.EAIS_SUCCESS;
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Roam around the play area.
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy_Roam extends Node
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.easingX = new easing.valueTo;
        this.easingY = new easing.valueTo;
        this.shootCounter = 1;
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        this.easingY.execute();
        this.easingX.execute();

        // First interation, the easing is uninitialized so don't use the value which is 0,0.
        if( this.easingY.isInitialized() )
        {
            this.sprite.setPosXYZ( this.easingX.getValue(), this.easingY.getValue() );
        }

        if( this.data['playerShip'].collisionComponent.enable )
        {
            if( (this.shootCounter++ % 250 == 0) && this.data['camera'].inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
            {
                let shootSprite = this.data['playerShipStratagy'].create('enemy_shot').get();
                shootSprite.scriptComponent.prepare( 'shoot', shootSprite, this.sprite );
            }
        }

        /*if( this.easingX.isFinished() && this.easingY.isFinished() )
        {
            let index = genFunc.randomInt( 0, this.data['buildings'].length-1 );
            let offset = Math.abs(this.sprite.targetIndex - index);
            
            if( (offset > 5) && (Math.abs(this.sprite.targetIndex - index) < 10) )
            {
                this.sprite.targetIndex = index;
                let offsetX = this.data['buildings'][this.sprite.targetIndex].get().pos.x;
                let time = Math.abs(this.sprite.pos.x - offsetX) / pixel_per_sec;

                this.easingX.init( this.sprite.pos.x, offsetX, time, easing.getSineInOut() );
                this.easingY.init( this.sprite.pos.y, this.sprite.pos.y, 0, easing.getSineInOut() );

                let offsetY = genFunc.randomInt( 50, settings.size_half.h - (this.sprite.getSize().h / 2) - 50 );
                if( Math.abs(this.sprite.pos.y - offsetY) > 50 )
                {
                    this.easingY.init( this.sprite.pos.y, offsetY, time, easing.getSineInOut() );
                }
            }
        }*/
        
        return this.state;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'AI_Enemy_Head',
        ( nodeData ) => { return new AI_Enemy_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy_Desend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy_Desend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy_Roam',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy_Roam( nodeData, headNode, sprite ); } );
}
