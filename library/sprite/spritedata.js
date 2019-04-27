
// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//

"use strict";

import * as defs from '../common/defs';

export class SpriteData
{
    constructor( xmlNode, defGroup, defObjName, defAIName = "", defId = defs.DEFAULT_ID )
    {
        // XML node
        this.xmlNode = xmlNode;

        // Sprite name
        this.name = null;
        
        // Group Name
        this.group = defGroup;
        
        // Object name
        this.objectName = defObjName;
        
        // AI name
        this.aiName = defAIName;
        
        // Sprite Id
        this.id = defId;
        
        // Sprite type
        this.spriteType = defs.EST_NULL;
        
        // Get the name of this specific sprite instance
        let attr = xmlNode.getAttribute( 'name' );
        if( attr )
            this.name = attr;
        
        // Get the group this sprite belongs to
        attr = xmlNode.getAttribute( 'group' );
        if( attr )
            this.group = attr;
        
        // Get the object data name
        attr = xmlNode.getAttribute( 'objectName' );
        if( attr)
            this.objectName = attr;

        // Get the sprite's AI name
        attr = xmlNode.getAttribute( 'aiName' );
        if( attr !== null )
            this.aiName = attr;

        // Get the sprite's unique id number
        attr = xmlNode.getAttribute( "id" );
        if( attr )
            this.id = Number(attr);
        
        // Get the node type
        if( xmlNode.nodeName == 'object2d' )
            this.spriteType = defs.EST_OBJECT2D;

        else if( xmlNode.nodeName == 'object3d' )
            this.spriteType = defs.EST_OBJECT3D;

        else if( xmlNode.nodeName == 'sprite2d' )
            this.spriteType = defs.EST_SPRITE2D;

        else if( xmlNode.nodeName == 'sprite3d' )
            this.spriteType = defs.EST_SPRITE3D;
    }
}
