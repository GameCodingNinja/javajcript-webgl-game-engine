
// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//

"use strict";

export class SpriteData
{
    constructor()
    {
        // XML node
        this.xmlNode = null;
        
        // Group Name
        this.group = null;
        
        // Object name
        this.objectName = null;

        // Sprite is visible by default
        this.visible = true;
    }

    // 
    //  DESC: Init the sprite data
    //
    init( xmlNode, nodeName, defGroup, defObjName )
    {
        // XML node
        this.xmlNode = xmlNode;
        
        // Group Name
        this.group = defGroup;
        
        // Object name
        this.objectName = defObjName;

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
        // Indicate we are going to try to use the node name to lookup the sprite object name
        else if( !defObjName && xmlNode.nodeName === "sprite" )
            console.debug(`Node name used for object data look-up (${this.group}, ${this.objectName})`);
    }
}
