
//
//  FILE NAME: aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { Node } from '../../../library/node/node';


//
//  DESC: AI head node script
//
class AI_Head extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
        this.data = {};
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        return false;
    }
}

//
//  DESC: AI selector node script
//
class AI_Selector extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        return false;
    }
}

//
//  DESC: AI sequence node script
//
class AI_Sequence extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        return false;
    }
}

//
//  DESC: AI sequence node script
//
class AI_Check_for_player extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        return false;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'AI_Head',
        ( nodeData ) => { return new AI_Head( nodeData ); } );

    scriptManager.set( 'AI_Selector',
        ( nodeData ) => { return new AI_Selector( nodeData ); } );

    scriptManager.set( 'AI_Sequence',
        ( nodeData ) => { return new AI_Sequence( nodeData ); } );

    scriptManager.set( 'AI_Check_for_player',
        ( nodeData ) => { return new AI_Check_for_player( nodeData ); } );
}
