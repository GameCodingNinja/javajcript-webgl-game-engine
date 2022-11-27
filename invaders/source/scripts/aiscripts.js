//
//  FILE NAME: aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { Node } from '../../../library/node/node';
import * as defs from '../../../library/common/defs';

//
//  DESC: AI Leaf (task) node script
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Return_Success extends Node
{
    constructor( nodeData, sprite )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
        this.data = null;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.activeCounter = 0;
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        return defs.EAIS_SUCCESS;
    }
}

//
//  DESC: AI Leaf (task) node script
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Return_Failure extends Node
{
    constructor( nodeData, sprite )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
        this.data = null;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.activeCounter = 0;
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        return defs.EAIS_FAILURE;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'AI_Return_Success',
        ( nodeData, sprite ) => { return new AI_Return_Success( nodeData, sprite ); } );

    scriptManager.set( 'AI_Return_Failure',
        ( nodeData, sprite ) => { return new AI_Return_Failure( nodeData, sprite ); } );
}
