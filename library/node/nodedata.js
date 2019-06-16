
//
//  FILE NAME: nodedata.js
//  DESC:      Node data class
//

"use strict";

import { SpriteData } from '../sprite/spritedata';
import * as defs from '../common/defs';

export class NodeData extends SpriteData
{
    constructor(
        xmlNode,
        nodeName,
        nodeId = defs.DEFAULT_ID,
        parenNodetId = defs.DEFAULT_ID,
        defGroup = '',
        defObjName = '',
        defAIName = '',
        defId = defs.DEFAULT_ID )
    {
        super( xmlNode.firstElementChild, defGroup, defObjName, defAIName, defId );

        // node name
        this.nodeName = nodeName;

        // Node Id
        this.nodeId = nodeId;

        // Parent Id
        this.parenNodetId = parenNodetId;

        // Node type
        this.nodeType = defs.ENT_NULL;

        // Is this a parent node with children?
        this.hasChildrenNodes = false;
        if( xmlNode.children.length > 1 )
            this.hasChildrenNodes = true;

        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            if( xmlNode.children[i].nodeName == 'object' )
            {
                this.nodeType = defs.ENT_OBJECT;
                break;
            }
            else if( xmlNode.children[i].nodeName == 'sprite' )
            {
                this.nodeType = defs.ENT_SPRITE;
                break;
            }
            else if( xmlNode.children[i].nodeName == 'uiProgressBar' )
            {
                this.nodeType = defs.ENT_UI_CONTROL;
                this.uiControlType = defs.ECT_PROGRESS_BAR;
                break;
            }
            else if( xmlNode.children[i].nodeName == 'uiMeter' )
            {
                this.nodeType = defs.ENT_UI_CONTROL;
                this.uiControlType = defs.ECT_METER;
                break;
            }
        }

        // Throw an error if a node type is not found
        if( this.nodeType === defs.ENT_NULL )
            throw new Error( `Node type not defined (${xmlNode.baseURI}).` );
    }
}
