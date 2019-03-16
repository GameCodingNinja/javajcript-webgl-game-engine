
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
        nodeId = defs.NODE_DEFAULT_ID,
        parenNodetId = defs.PARENT_NODE_DEFAULT_ID,
        defGroup = '',
        defObjName = '',
        defAIName = '',
        defId = defs.SPRITE_DEFAULT_ID )
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

        // Get the node type
        let attr = xmlNode.getAttribute( 'type' );
        if( attr == "spriteNode" )
            this.nodeType = defs.ENT_SPRITE;

        else if( attr == "objectNodeMultiList" )
            this.nodeType = defs.ENT_OBJECT_MULTI_LIST;

        else if( attr == "spriteNodeMultiList" )
            this.nodeType = defs.ENT_SPRITE_MULTI_LIST;
        
        else if( attr == "uiControlNode" )
        {
            this.nodeType = defs.ENT_UI_CONTROL;
            
            if( xmlNode.firstElementChild.nodeName == 'uiProgressBar' )
                this.uiControlType = defs.ECT_PROGRESS_BAR;
            
            else if( xmlNode.firstElementChild.nodeName == 'uiMeter' )
                this.uiControlType = defs.ECT_METER;
            
            else
                throw new Error( `Control type node not defined (${xmlNode.firstElementChild.nodeName}).` );
        }
    }
}
