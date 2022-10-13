
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
        parentNodeId = defs.DEFAULT_ID )
    {
        // Node Id
        this.nodeId = nodeId;

        // Parent Id
        this.parentNodeId = parentNodeId;

        // Node type
        this.nodeType = defs.ENT_NULL;

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
                this.nodeType = defs.ENT_AI_HEAD;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
            else if( xmlNode.children[i].nodeName == 'selector' )
            {
                this.nodeType = defs.ENT_AI_SELECTOR;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
            else if( xmlNode.children[i].nodeName == 'decorator' )
            {
                this.nodeType = defs.ENT_AI_DECORATOR;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
            else if( xmlNode.children[i].nodeName == 'sequence' )
            {
                this.nodeType = defs.ENT_AI_SEQUENCE;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
            else if( xmlNode.children[i].nodeName == 'action' )
            {
                this.nodeType = defs.ENT_AI_ACTION;
                this.scriptName = xmlNode.children[i].getAttribute( 'script' );

                break;
            }
        }

        // Throw an error if a node type is not found
        if( this.nodeType === defs.ENT_NULL )
            throw new Error( `Node type not defined (${xmlNode.baseURI}).` );
    }
}
