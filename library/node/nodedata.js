
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
        node,
        nodeName,
        nodeId = defs.NODE_DEFAULT_ID,
        parenNodetId = defs.PARENT_NODE_DEFAULT_ID,
        defGroup = '',
        defObjName = '',
        defAIName = '',
        defId = defs.SPRITE_DEFAULT_ID )
    {
        super( node.firstElementChild, defGroup, defObjName, defAIName, defId );

        // node name
        this.nodeName = nodeName;

        // Node Id
        this.nodeId = nodeId;

        // Parent Id
        this.parenNodetId = parenNodetId;

        // Node type
        this.nodeType = defs.ENT_NULL;

        // Get the node type
        let attr = node.getAttribute( 'type' );
        if( attr == "spriteNode" )
            this.nodeType = defs.ENT_SPRITE;

        else if( attr == "objectNodeMultiList" )
            this.nodeType = defs.ENT_OBJECT_MULTI_LIST;

        else if( attr == "spriteNodeMultiList" )
            this.nodeType = defs.ENT_SPRITE_MULTI_LIST;
    }
}
