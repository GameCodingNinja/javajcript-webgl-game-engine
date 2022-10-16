
//
//  FILE NAME: strategynodedata.js
//  DESC:      Node data class
//

"use strict";

import { SpriteNodeData } from './spritenodedata';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as defs from '../common/defs';

export class StrategyNodeData extends SpriteNodeData
{
    constructor(
        xmlNode,
        nodeName,
        nodeId = defs.DEFAULT_ID,
        parentId = defs.DEFAULT_ID,
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
        this.parentId = parentId;

        // Node type
        this.nodeType = defs.ENT_NULL;

        // Node AI
        this.ai = '';

        // Node level xml
        this.baseXmlNode = xmlNode;

        // See if there's ai associated with this strategy
        let attr = xmlNode.getAttribute( 'ai' );
        if( attr )
            this.ai = attr;

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
