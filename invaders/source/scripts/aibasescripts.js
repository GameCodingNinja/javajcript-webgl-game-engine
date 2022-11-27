//
//  FILE NAME: aibasescripts.js
//  DESC:      Base scripts for AI
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
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.data = {'first_active_node': null};
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
//  DESC: AI composite node script
//        Evaluates every child until one of them succeeds, otherwise it fails.
//
class AI_Composite extends Node
{
    constructor( nodeData )
    {
        super( nodeData );
        this.name = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
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
                // Until success - OR operation for success
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
                // Until failure - OR operation for failure
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
                // Until all success - OR operation for success
                if( this.condition === defs.EAIC_ALL_SUCCESS )
                {
                    // If the child returns FAILURE, set this node's state to FAILURE
                    if( childState === defs.EAIS_FAILURE )
                    {
                        this.state = defs.EAIS_FAILURE;
                    }
                    // If the child returns SUCCESS, try the next child unless there is no more children, then return SUCCESS
                    else if( childState === defs.EAIS_SUCCESS )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = defs.EAIS_SUCCESS;
                    }
                }
                // Until all failure - OR operation for failure
                else if( this.condition === defs.EAIC_ALL_FAILURE )
                {
                    // If the child returns SUCCESS, set this node's state to FAILURE
                    if( childState === defs.EAIS_SUCCESS )
                    {
                        this.state = defs.EAIS_FAILURE;
                    }
                    // If the child returns FAILURE, try the next child unless there is no more children, then return SUCCESS
                    else if( childState === defs.EAIS_FAILURE )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = defs.EAIS_SUCCESS;
                    }
                }
                else
                    throw new Error( 'Node type not defined.' );
            }
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
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
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
                // Repeat type
                if( this.type === defs.EAIT_REPEATER )
                {
                    // Repeat until condition
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
                // Invert type
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
                // Always succeed type
                else if( this.type === defs.EAIT_ALWAYS_SUCCEED )
                {
                    this.state = defs.EAIS_SUCCESS;
                }
                // Always fail type
                else if( this.type === defs.EAIT_ALWAYS_FAIL )
                {
                    this.state = defs.EAIS_FAILURE;
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
    scriptManager.set( 'AI_Head',
        ( nodeData ) => { return new AI_Head( nodeData ); } );

    scriptManager.set( 'AI_Composite',
        ( nodeData ) => { return new AI_Composite( nodeData ); } );

    scriptManager.set( 'AI_Decorator',
        ( nodeData ) => { return new AI_Decorator( nodeData ); } );
}
