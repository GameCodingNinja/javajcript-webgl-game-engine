//
//  FILE NAME: ainodedata.js
//  DESC:      AI node data class
//

"use strict";

import * as defs from '../common/defs';

export class AINodeData
{
    constructor(
        xmlNode,
        nodeId = defs.DEFAULT_ID,
        parentId = defs.DEFAULT_ID )
    {
        // Node Id
        this.nodeId = nodeId;

        // Parent Id
        this.parentId = parentId;

        // Node behavior
        this.behavior = defs.EAIB_NULL;

        // Node type
        this.type = defs.EAIT_NULL;

        // Repeat count
        this.repeatCount = 0;

        // Access order
        this.accessOrder = defs.EAO_SEQUENTIAL;

        // Condition
        this.condition = defs.EAIC_NULL;

        // Script name
        this.scriptName = null;

        // Is this a node with children nodes?
        this.hasChildrenNodes = false;
        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            if( xmlNode.children[i].nodeName == 'node' )
            {
                this.hasChildrenNodes = true;
                break;
            }
        }

        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            if( xmlNode.children[i].nodeName == 'head' )
            {
                this.behavior = defs.EAIB_HEAD;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
            else if( xmlNode.children[i].nodeName == 'composite' )
            {
                this.behavior = defs.EAIB_COMPOSITE;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                let attr = xmlNode.children[i].getAttribute( 'condition' );
                if( attr )
                {
                    if(attr === 'until_success')
                    {
                        this.type = defs.EAIT_FALLBACK;
                        this.condition = defs.EAIC_UNTIL_SUCCESS;
                    }
                    else if(attr === 'until_failure')
                    {
                        this.type = defs.EAIT_FALLBACK;
                        this.condition = defs.EAIC_UNTIL_FAILURE;
                    }
                    else if(attr === 'all_success')
                    {
                        this.type = defs.EAIT_SEQUENCE;
                        this.condition = defs.EAIC_ALL_SUCCESS;
                    }
                    else if(attr === 'all_failure')
                    {
                        this.type = defs.EAIT_SEQUENCE;
                        this.condition = defs.EAIC_ALL_FAILURE;
                    }
                }

                attr = xmlNode.children[i].getAttribute( 'order' );
                if( attr )
                {
                    if(attr === 'sequential')
                        this.accessOrder = defs.EAO_SEQUENTIAL;
                    
                    else if(attr === 'random')
                        this.accessOrder = defs.EAO_RANDOM;
                }

                break;
            }
            else if( xmlNode.children[i].nodeName == 'decorator' )
            {
                this.behavior = defs.EAIB_DECORATOR;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                let attr = xmlNode.children[i].getAttribute( 'type' );
                if( attr )
                {
                    if(attr === 'repeater')
                    {
                        this.type = defs.EAIT_REPEATER;
                        this.condition = defs.EAIC_UNTIL_COUNT;
                        // Default to endless repeat count
                        this.repeatCount = 0;

                        attr = xmlNode.children[i].getAttribute( 'repeatCount' );
                        if( attr )
                            this.repeatCount = Number( attr );
                    }
                    else if(attr === 'inverter')
                    {
                        this.type = defs.EAIT_INVERTER;
                    }
                    else if(attr === 'always_succeed')
                    {
                        this.type = defs.EAIT_ALWAYS_SUCCEED;
                    }
                    else if(attr === 'always_fail')
                    {
                        this.type = defs.EAIT_ALWAYS_FAIL;
                    }
                }

                attr = xmlNode.children[i].getAttribute( 'condition' );
                if( attr )
                {
                    if(attr === 'until_success')
                        this.condition = defs.EAIC_UNTIL_SUCCESS;
                    
                    else if(attr === 'until_failure')
                        this.condition = defs.EAIC_UNTIL_FAILURE;
                }

                break;
            }
            else if( xmlNode.children[i].nodeName == 'leaf' )
            {
                this.behavior = defs.EAIB_LEAF_TASK;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
        }

        // Throw an error if a node behavior is not found
        if( this.behavior === defs.EAIB_NULL )
            throw new Error( `Node type not defined (${xmlNode.baseURI}).` );
    }
}
