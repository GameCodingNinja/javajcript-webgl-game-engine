//
//  FILE NAME: aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { Node } from '../../../library/node/node';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

//
//  DESC: AI head (root) node base class script
//        Only supports one child
//
class AI_Head extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
        this.data = {'first_active_node': null};
    }
    
    // 
    //  DESC: Execute the children
    //
    execute()
    {
        // If the last node is null, set it to the 1 and only child
        /*if( this.data['first_active_node'] === null )
            this.data['first_active_node'] = this.nodeAry[0];

        let last_active_node = this.data['first_active_node'];
        this.data['first_active_node'] = null;

        // Returning SUCCESS or FAILURE terminates the execution of this behavioral tree
        if( last_active_node.evaluate() != defs.EAIS_ACTIVE )
            return true;*/

        // Returning SUCCESS or FAILURE terminates the execution of this behavioral tree
        if( this.nodeAry[0].evaluate() != defs.EAIS_ACTIVE )
            return true;

        return false;
    }
}

//
//  DESC: AI composite node script
//        Evaluates every child until one of them succeeds, otherwise it fails.
//
class AI_Composite extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.type = nodeData.nodeType;
        this.order = nodeData.order;
        this.condition = nodeData.condition;
        this.data = null;
        this.state = defs.EAIS_ACTIVE;
        this.childIndexAry = [];
        this.index = 0;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_ACTIVE;

        if( this.childIndexAry.length === 0 )
        {
            for( let i = 0; i < this.nodeAry.length; ++i )
                this.childIndexAry[i] = i;
        }

        if( this.order === defs.EAO_RAMDOM )
            genFunc.shuffle( this.childIndexAry );
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        // Only allow processing of the children if this node's state is ACTIVE
        if( this.state === defs.EAIS_ACTIVE )
        {
            // Reset the index to zero if it equils or exceeds the length
            if(this.index >= this.nodeAry.length)
                this.index = 0;

            // Index into the children random or sequentially
            let index = this.childIndexAry[this.index];
            let childState = this.nodeAry[index].evaluate();

            if( childState !== defs.EAIS_ACTIVE )
            {
                // Until success
                if( this.condition === defs.EAIC_UNTIL_SUCCESS )
                {
                    // If the child returns success, Set this node's state to the same
                    if( childState === defs.EAIS_SUCCESS )
                    {
                        this.state = childState;
                    }
                    // If the child returns FAILURE, try the next child unless there is no more children, then return the same
                    else if( childState === defs.EAIS_FAILURE )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = childState;
                    }
                }
                // Until failure
                else if( this.condition === defs.EAIC_UNTIL_FAILURE )
                {
                    // If the child returns FAILURE, set this node's state to SUCCESS
                    if( childState === defs.EAIS_FAILURE )
                    {
                        this.state = defs.EAIS_SUCCESS;
                    }
                    // If the child returns SUCCESS, try the next child unless there is no more children, then return FAILURE
                    else if( childState === defs.EAIS_SUCCESS )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = defs.EAIS_FAILURE;
                    }
                }
                else
                    throw new Error( 'Node type not defined.' );
            }

            // Save the first active composite node for a quick revisit
            /*if( this.state === defs.EAIS_ACTIVE )
            {
                if(this.data['first_active_node'] === null)
                    this.data['first_active_node'] = this;
            }*/
        }

        return this.state;
    }
}

//
//  DESC: AI Decorator node script
//        Only allows for one child
//
class AI_Decorator extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
        this.data = null;
        this.name = nodeData.scriptName;
        this.type = nodeData.nodeType;
        this.condition = nodeData.condition;
        this.repeatCount = nodeData.repeatCount;
        this.repeatCounter = 0;
        this.state = defs.EAIS_ACTIVE;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_ACTIVE;
    }
    
    // 
    //  DESC: Evaluate the children
    //
    evaluate()
    {
        // Only allow processing of the children if this node's state is ACTIVE
        if( this.state === defs.EAIS_ACTIVE )
        {
            let childState = this.nodeAry[0].evaluate();

            if( childState !== defs.EAIS_ACTIVE )
            {
                // Repeat until condition
                if( this.type === defs.EAIT_REPEATER )
                {
                    if( this.condition === defs.EAIC_UNTIL_COUNT )
                    {
                        // A repeat count of zero will repeat indefinately 
                        if( (this.repeatCount > 0) && (++this.repeatCounter > this.repeatCount) )
                            this.state = childState;

                        else
                            this.resetTree();
                    }
                    else if( this.condition === defs.EAIC_UNTIL_SUCCESS )
                    {
                        if( childState === defs.EAIS_SUCCESS )
                            this.state = childState;

                        else
                            this.resetTree();
                    }
                    else if( this.condition === defs.EAIC_UNTIL_FAILURE )
                    {
                        if( childState === defs.EAIS_FAILURE )
                            this.state = defs.EAIS_SUCCESS;

                        else
                            this.resetTree();
                    }
                }
                // Invert condition
                else if( this.type === defs.EAIT_INVERTER )
                {
                    // If the child returns FAILURE, set this node's state to SUCCESS
                    if( childState === defs.EAIS_FAILURE )
                    {
                        this.state = defs.EAIS_SUCCESS;
                    }
                    // If the child returns SUCCESS, set this node's state to FAILURE
                    else if( childState === defs.EAIS_SUCCESS )
                    {
                        this.state = defs.EAIS_FAILURE;
                    }
                }
            }
        }

        return this.state;
    }
}

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
    scriptManager.set( 'AI_Head',
        ( nodeData ) => { return new AI_Head( nodeData ); } );

    scriptManager.set( 'AI_Composite',
        ( nodeData ) => { return new AI_Composite( nodeData ); } );

    scriptManager.set( 'AI_Decorator',
        ( nodeData ) => { return new AI_Decorator( nodeData ); } );

    scriptManager.set( 'AI_Return_Success',
        ( nodeData, sprite ) => { return new AI_Return_Success( nodeData, sprite ); } );

    scriptManager.set( 'AI_Return_Failure',
        ( nodeData, sprite ) => { return new AI_Return_Failure( nodeData, sprite ); } );
}
