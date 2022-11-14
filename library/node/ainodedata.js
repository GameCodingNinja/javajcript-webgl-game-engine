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

        // Node type
        this.nodeType = defs.EAIT_NULL;

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
                this.nodeType = defs.EAIT_HEAD;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
            else if( xmlNode.children[i].nodeName == 'composite' )
            {
                this.nodeType = defs.EAIT_COMPOSITE;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                let attr = xmlNode.children[i].getAttribute( 'condition' );
                if( attr )
                {
                    if(attr === 'until_success')
                        this.condition = defs.EAIC_UNTIL_SUCCESS;
                    
                    else if(attr === 'until_failure')
                        this.condition = defs.EAIC_UNTIL_FAILURE;
                }

                attr = xmlNode.children[i].getAttribute( 'order' );
                if( attr )
                {
                    if(attr === 'sequential')
                        this.order = defs.EAO_SEQUENTIAL;
                    
                    else if(attr === 'random')
                        this.order = defs.EAO_RAMDOM;
                }

                break;
            }
            else if( xmlNode.children[i].nodeName == 'decorator' )
            {
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                let attr = xmlNode.children[i].getAttribute( 'type' );
                if( attr )
                {
                    if(attr === 'repeater')
                    {
                        this.nodeType = defs.EAIT_REPEATER;
                        this.condition = defs.EAIC_UNTIL_COUNT;

                        attr = xmlNode.children[i].getAttribute( 'repeatCount' );
                        if( attr )
                            this.repeatCount = Number( attr );
                    }
                    else if(attr === 'inverter')
                    {
                        this.nodeType = defs.EAIT_INVERTER;
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
                this.nodeType = defs.EAIT_LEAF_TASK;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
        }

        // Throw an error if a node type is not found
        if( this.nodeType === defs.EAIT_NULL )
            throw new Error( `Node type not defined (${xmlNode.baseURI}).` );
    }
}
