
//
//  FILE NAME: objectnodedata.js
//  DESC:      Object node data class
//

"use strict";

import { SpriteData } from '../sprite/spritedata';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as defs from '../common/defs';

export class ObjectNodeData extends SpriteData
{
    constructor(
        xmlNode,
        nodeName,
        nodeId = defs.DEFAULT_ID,
        parentNodeId = defs.DEFAULT_ID,
        defGroup = '',
        defObjName = '',
        userId = defs.DEFAULT_ID )
    {
        super();

        // node name
        this.nodeName = nodeName;

        // User Id
        this.userId = userId;

        // Node Id
        this.nodeId = nodeId;

        // Parent Id
        this.parentNodeId = parentNodeId;

        // Node type
        this.nodeType = defs.ENT_NULL;

        // Node level xml
        this.baseXmlNode = xmlNode;

        // Is this a node with children nodes?
        this.hasChildrenNodes = false;
        for( let i = 0; i < xmlNode.children.length; ++i )
            if( xmlNode.children[i].nodeName == 'node' )
                this.hasChildrenNodes = true;

        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            if( xmlNode.children[i].nodeName == 'object' )
            {
                this.init( xmlNode.children[i], nodeName, defGroup, defObjName );
                this.nodeType = defs.ENT_OBJECT;

                break;
            }
            else if( xmlNode.children[i].nodeName == 'sprite' )
            {
                this.init( xmlNode.children[i], nodeName, defGroup, defObjName );
                this.nodeType = defs.ENT_SPRITE;

                break;
            }
            else if( xmlNode.children[i].nodeName == 'uiProgressBar' )
            {
                this.init( xmlNode.children[i], nodeName, defGroup, defObjName );
                this.nodeType = defs.ENT_UI_CONTROL;
                this.uiControlType = uiControlDefs.ECT_PROGRESS_BAR;

                break;
            }
            else if( xmlNode.children[i].nodeName == 'uiMeter' )
            {
                this.init( xmlNode.children[i], nodeName, defGroup, defObjName );
                this.nodeType = defs.ENT_UI_CONTROL;
                this.uiControlType = uiControlDefs.ECT_METER;

                break;
            }
        }

        // Throw an error if a node type is not found
        if( this.nodeType === defs.ENT_NULL )
            throw new Error( `Node type not defined (${xmlNode.baseURI}).` );
    }
}