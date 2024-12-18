//
//  FILE NAME: aibasescripts.js
//  DESC:      Base scripts for AI
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { aiNode } from '../../../library/node/ainode';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

//
//  DESC: AI composite node script
//        Evaluates every child until one of them succeeds, otherwise it fails.
//
class AI_Composite extends aiNode
{
    constructor( nodeData, headNode )
    {
        super( nodeData );

        this.data = headNode.data;
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
            for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
                this.childIndexAry[this._i] = this._i;
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
            this._index = this.childIndexAry[this.index];

            this._childState = this.nodeAry[this._index].evaluate();

            if( this._childState !== defs.EAIS_ACTIVE )
            {
                // Until success - OR operation for success
                if( this.condition === defs.EAIC_UNTIL_SUCCESS )
                {
                    // If the child returns success, Set this node's state to the same
                    if( this._childState === defs.EAIS_SUCCESS )
                    {
                        this.state = this._childState;
                    }
                    // If the child returns FAILURE, try the next child unless there is no more children, then return the same
                    else if( this._childState === defs.EAIS_FAILURE )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = this._childState;
                    }
                }
                // Until failure - OR operation for failure
                else if( this.condition === defs.EAIC_UNTIL_FAILURE )
                {
                    // If the child returns FAILURE, set this node's state to SUCCESS
                    if( this._childState === defs.EAIS_FAILURE )
                    {
                        this.state = defs.EAIS_SUCCESS;
                    }
                    // If the child returns SUCCESS, try the next child unless there is no more children, then return FAILURE
                    else if( this._childState === defs.EAIS_SUCCESS )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = defs.EAIS_FAILURE;
                    }
                }
                // Until all success - AND operation for success
                if( this.condition === defs.EAIC_ALL_SUCCESS )
                {
                    // If the child returns FAILURE, set this node's state to FAILURE
                    if( this._childState === defs.EAIS_FAILURE )
                    {
                        this.state = defs.EAIS_FAILURE;
                    }
                    // If the child returns SUCCESS, try the next child unless there is no more children, then return SUCCESS
                    else if( this._childState === defs.EAIS_SUCCESS )
                    {
                        if(++this.index >= this.nodeAry.length)
                            this.state = defs.EAIS_SUCCESS;
                    }
                }
                // Until all failure - AND operation for failure
                else if( this.condition === defs.EAIC_ALL_FAILURE )
                {
                    // If the child returns SUCCESS, set this node's state to FAILURE
                    if( this._childState === defs.EAIS_SUCCESS )
                    {
                        this.state = defs.EAIS_FAILURE;
                    }
                    // If the child returns FAILURE, try the next child unless there is no more children, then return SUCCESS
                    else if( this._childState === defs.EAIS_FAILURE )
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
class AI_Decorator extends aiNode
{
    constructor( nodeData, headNode )
    {
        super( nodeData );

        this.data = headNode.data;
        this.repeatCounter = 1;
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
            this._childState = this.nodeAry[0].evaluate();

            if( this._childState !== defs.EAIS_ACTIVE )
            {
                // Repeat type
                if( this.type === defs.EAIT_REPEATER )
                {
                    // Repeat until condition
                    if( this.condition === defs.EAIC_UNTIL_COUNT )
                    {
                        // A repeat count of zero will repeat indefinately 
                        if( (this.repeatCount > 0) && (++this.repeatCounter > this.repeatCount) )
                            this.state = this._childState;

                        else
                            this.nodeAry[0].resetTree();
                    }
                    else if( this.condition === defs.EAIC_UNTIL_SUCCESS )
                    {
                        if( this._childState === defs.EAIS_SUCCESS )
                            this.state = this._childState;

                        else
                            this.nodeAry[0].resetTree();
                    }
                    else if( this.condition === defs.EAIC_UNTIL_FAILURE )
                    {
                        if( this._childState === defs.EAIS_FAILURE )
                            this.state = defs.EAIS_SUCCESS;

                        else
                            this.nodeAry[0].resetTree();
                    }
                }
                // Invert type
                else if( this.type === defs.EAIT_INVERTER )
                {
                    // If the child returns FAILURE, set this node's state to SUCCESS
                    if( this._childState === defs.EAIS_FAILURE )
                    {
                        this.state = defs.EAIS_SUCCESS;
                    }
                    // If the child returns SUCCESS, set this node's state to FAILURE
                    else if( this._childState === defs.EAIS_SUCCESS )
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
    scriptManager.set( 'AI_Composite',
        ( nodeData, headNode ) => { return new AI_Composite( nodeData, headNode ); } );

    scriptManager.set( 'AI_Decorator',
        ( nodeData, headNode ) => { return new AI_Decorator( nodeData, headNode ); } );
}
