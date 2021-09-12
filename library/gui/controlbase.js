
// 
//  FILE NAME: controlbase.js
//  DESC:      Control base class
//

"use strict";

import { Object} from '../common/object';
import { settings } from '../utilities/settings';
import { assetHolder } from '../utilities/assetholder';
import * as parseHelper from '../utilities/xmlparsehelper';

export class ControlBase extends Object
{
    constructor( group )
    {
        super();
        
        // Object data group name
        this.group = group;

        // Unique string id
        this.name = null;

        // The type of control
        this.type = null;

        // Control string list
        this.stringAry = [];

        // A name that is applied to similar controls.
        // Provides a way to check for many controls without having to use unique names
        this.faction = null;

        // Dynamic offset
        this.dynamicOffset = null;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( xmlNode )
    {
        // Set the controls name
        let attr = xmlNode.getAttribute( 'name' );
        if( attr )
            this.name = attr;

        // Set the faction name
        attr = xmlNode.getAttribute( 'faction' );
        if( attr )
            this.faction = attr;

        // Load the transform data
        this.loadTransFromNode( xmlNode );

        // Load the dynamic offset from node
        this.loadDynamicOffsetFromNode( xmlNode );

        // See if we have a list of strings
        let stringLstNode = xmlNode.getElementsByTagName( 'fontStringList' );
        if( stringLstNode.length )
        {
            let stringNode = stringLstNode[0].getElementsByTagName( 'string' );
            
            for( let i = 0; i < stringNode.length; ++i )
                this.stringAry.push( stringNode[i].getAttribute( 'text' ) );
        }

        // Load the control specific xml file
        // Get the file path node to the control specific xml code
        let filePathNode = xmlNode.getElementsByTagName( 'filePath' );
        if( filePathNode.length )
        {
            // Get the control's file path
            let controlFilePath = filePathNode[0].getAttribute( 'file' );

            // Load xml specific control code
            // Use the preloaded since many controls reuse xml files
            this.loadControlFromNode( assetHolder.get( this.group, controlFilePath ) );
        }
        // Load from the node if we have a sprite list
        else if( xmlNode.getElementsByTagName( 'spriteLst' ).length )
        {
            this.loadControlFromNode( xmlNode );
        }
    }
    
    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( /*xmlNode*/ )
    {
        // Empty function to be overwritten
    }

    // 
    //  DESC: Load the dynamic offset data from node
    //
    loadDynamicOffsetFromNode( xmlNode )
    {
        // Load the dynamic offset
        this.dynamicOffset = parseHelper.loadDynamicOffset( xmlNode );

        // Set the dynamic position
        this.setDynamicPos();
    }

    // 
    //  DESC: Set the dynamic position
    //
    setDynamicPos()
    {
        // Position the menu based on the dynamic offset
        // Don't have it exceed the boundries of the art
        if( this.dynamicOffset )
        {
            let size = settings.defaultSize_half;
            if( settings.defaultSize_half > settings.nativeSize_half )
                size = settings.nativeSize_half;

            this.setPos( this.dynamicOffset.getPos( size ) );
        }
    }

    // 
    //  DESC: Handle the wheel events. Most controls don't deal with wheen events so it's a catchall here
    //
    onWheel( /*event*/ )
    {
    }
}