
// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//

"use strict";

import { Object } from '../common/object';
import { FontData } from '../common/fontdata';
import * as defs from '../common/defs';

export class SpriteData extends Object
{
    constructor( node, defGroup, defObjName, defAIName, defId = defs.SPRITE_DEFAULT_ID )
    {
        super();
        
        // Set the sprite type
        this.parameters.add( defs.SPRITE2D );
        
        this.fontData = null;
        this.name = null;
        this.group = defGroup;
        this.objectName = defObjName;
        this.aiName = defAIName;
        this.id = defId;
        
        // Get the name of this specific sprite instance
        let attr = node.getAttribute( "name" );
        if( attr )
            this.name = attr;
        
        // Get the group this sprite belongs to
        attr = node.getAttribute( "group" );
        if( attr )
            this.group = attr;
        
        // Get the object data name
        attr = node.getAttribute( "objectName" );
        if( attr )
            this.objectName = attr;

        // Get the sprite's AI name
        attr = node.getAttribute( "aiName" );
        if( attr )
            this.aiName = attr;

        // Get the sprite's unique id number
        attr = node.getAttribute( "id" );
        if( attr )
            this.id = Number(attr);
        
        // visible property
        attr = node.getAttribute( 'visible' );
        if( attr )
            this.setVisible( attr === 'true' );
        
        // Need to check if the font node is present
        let fontNode = node.getElementsByTagName( 'font' );
        if( fontNode.length )
        {
            this.fontData = new FontData;
            
            // FontData class loads via getElementsByTagName( 'font' )
            // so just pass in the node and NOT the font node
            this.fontData.loadFromNode( node );
        }

        // Load the transform data from node
        this.loadTransFromNode( node );
    }
    
    copy( obj )
    {
        this.group = obj.group;
        this.objectName = obj.objectName;
        this.aiName = obj.aiName;
        this.id = obj.id;
        
        copyTransform( obj );
        
        if( this.fontData )
            this.fontData.copy( obj.fontData );
    }
}