
// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//

"use strict";

import { Object } from '../common/object';
import { FontData } from '../common/fontdata';
import { scriptManager } from '../script/scriptmanager';
import * as defs from '../common/defs';

export class SpriteData extends Object
{
    constructor( node, defGroup, defObjName, defAIName, defId = defs.SPRITE_DEFAULT_ID )
    {
        super();

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
        
        // Font data
        this.fontData = null;
        
        // Script function map
        this.scriptFunctionMap = new Map;
        
        // Sprite type
        this.spriteType = defs.EST_NULL;
        
        // Get the name of this specific sprite instance
        let attr = node.getAttribute( 'name' );
        if( attr )
            this.name = attr;
        
        // Get the group this sprite belongs to
        attr = node.getAttribute( 'group' );
        if( attr )
            this.group = attr;
        
        // Get the object data name
        attr = node.getAttribute( 'objectName' );
        if( attr)
            this.objectName = attr;

        // Get the sprite's AI name
        attr = node.getAttribute( 'aiName' );
        if( attr !== null )
            this.aiName = attr;

        // Get the sprite's unique id number
        attr = node.getAttribute( "id" );
        if( attr )
            this.id = Number(attr);
        
        // visible property
        attr = node.getAttribute( 'visible' );
        if( attr )
            this.setVisible( attr === 'true' );
        
        // Get the node type
        if( node.nodeName == 'object2d' )
            this.spriteType = defs.EST_OBJECT2D;

        else if( node.nodeName == 'object3d' )
            this.spriteType = defs.EST_OBJECT3D;

        else if( node.nodeName == 'sprite2d' )
            this.spriteType = defs.EST_SPRITE2D;

        else if( node.nodeName == 'sprite3d' )
            this.spriteType = defs.EST_SPRITE3D;

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
        
        // Load any script functions
        this.loadScriptFunctions( node );
    }
    
    // 
    //  DESC: Copy the sprite data
    //
    copy( obj )
    {
        this.group = obj.group;
        this.objectName = obj.objectName;
        this.aiName = obj.aiName;
        this.id = obj.id;
        
        copyTransform( obj );
        
        if( this.fontData )
            this.fontData.copy( obj.fontData );
        
        for( let [ key, scriptFactory ] of obj.scriptFunctionMap.entries() )
            this.scriptFunctionMap.set( key, scriptFactory );
    }
    
    // 
    //  DESC: Load the script functions and add them to the map
    //
    loadScriptFunctions( node )
    {
        // Check for scripting
        let scriptNode = node.getElementsByTagName( 'script' );

        for( let i = 0; i < scriptNode.length; ++i )
        {
            let attr = scriptNode[i].attributes[0];
            if( attr )
                this.scriptFunctionMap.set( attr.name, scriptManager.get(attr.value) );
        }
    }
}
