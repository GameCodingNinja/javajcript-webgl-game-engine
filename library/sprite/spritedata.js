
// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//

"use strict";

export class SpriteData
{
    constructor( xmlNode, nodeName, defGroup, defObjName )
    {
        // XML node
        this.xmlNode = xmlNode;
        
        // Group Name
        this.group = defGroup;
        
        // Object name
        this.objectName = defObjName;

        // Sprite is visible by default
        this.visible = true;

        // Get the object data name
        // Init with the node name in the event the node and the object data names are the same and a default object name was not defined
        if( !this.objectName )
            this.objectName = nodeName;
        
        // Get the group this sprite belongs to
        let attr = xmlNode.getAttribute( 'group' );
        if( attr )
            this.group = attr;
        
        // Get the object data name
        attr = xmlNode.getAttribute( 'objectName' );
        if( attr)
            this.objectName = attr;
        else if( !defObjName )
            console.log(`Node name used for object data look-up (${this.group}, ${this.objectName})`);
    }
}
