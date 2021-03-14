
// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//

"use strict";

import * as defs from '../common/defs';

export class SpriteData
{
    constructor( xmlNode, nodeName, defGroup, defObjName, defId = defs.DEFAULT_ID )
    {
        // XML node
        this.xmlNode = xmlNode;

        // Sprite name
        this.name = nodeName;
        
        // Group Name
        this.group = defGroup;
        
        // Object name
        this.objectName = defObjName;

        // Get the object data name
        // Init with the node name in the event the node and the object data names are the same and a default object name was not defined
        if( !this.objectName )
            this.objectName = nodeName;
        
        // Sprite Id
        this.id = defId;
        
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
        else if( !defObjName )
            console.log(`Node name used for object data look-up (${this.group}, ${this.objectName})`);

        // Get the sprite's unique id number
        attr = xmlNode.getAttribute( "id" );
        if( attr )
            this.id = Number(attr);
    }
}
