
//
//  FILE NAME: fontmanager.js
//  DESC:      font manager class singleton
//

"use strict";
import { Font } from '../2d/font';
import * as genFunc from '../utilities/genfunc';
import { textureManager } from '../managers/texturemanager';

class FontManager
{
    constructor()
    {
        // map list of fonts
        this.fontMap = new Map;

        // Group name
        this.group = '';
        
        // Load helpers
        this.loadCompleteCallback = null;
        this.loadCounter = 0;
    }
    
    //
    //  DESC: Load the fonts from xml node
    //
    load( filePath, callback )
    {
        genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) => this.loadFromNode( xmlNode, callback ) );
    }
    
    //
    //  DESC: Load the fonts from xml node
    //
    loadFromNode( node, callback )
    {
        if( node )
        {
            this.loadCompleteCallback = callback;

            // Get the group the textures will be saves as
            let listGroupNode = node.getElementsByTagName('listGroup');
            this.group = listGroupNode[0].getAttribute( 'name' );

            // Get the list of font info
            let fontNode = node.getElementsByTagName('font');

            for( let i = 0; i < fontNode.length; ++i )
            {
                // Get the name of the font
                let name = fontNode[i].getAttribute( 'name' );

                // Sanity check to make sure the font has not already been added in
                if( this.fontMap.has( name ) )
                    throw new Error( `Font name has already been loaded (${name}).` );

                // Add the font to our list
                this.fontMap.set( name, new Font );
                
                // Use a counter to determine when the load is done because there's
                // no garentee they will finish in the order executed.
                // Always do this before the load
                ++this.loadCounter;

                // Load the character info from file
                this.downloadFontFiles( name, fontNode[i].getAttribute( 'file' ) );
            }
        }
        else
            callback();
    }
    
    //
    //  DESC: Download the XML and texture via file path
    //
    downloadFontFiles( name, filePath )
    {
        // Create the vertex shader
        genFunc.downloadFile( 'img', filePath + '.png',
            ( image ) =>
            {
                // Load the image as a texture in the texture manager
                textureManager.load( this.group, name, image );
                
                genFunc.downloadFile( 'xml', filePath + '.fnt',
                    ( xmlNode ) =>
                    {
                        // Load the font
                        this.loadFont( name, xmlNode );

                        // Always do this after the load
                        --this.loadCounter;
                        
                        if( this.loadCounter === 0 )
                        {
                            this.loadCompleteCallback();
                        }
                    });
            });
    }
    
    //
    //  DESC: Load the font
    //
    loadFont( name, xmlNode )
    {
        let font = this.fontMap.get( name );
        if( font === undefined )
            throw new Error( `Font name has not been added to the map (${name}).` );
        
        font.loadFromNode( this.group, name, xmlNode );
    }
    
    //
    //  DESC: Get the font
    //
    getFont( name )
    {
        let font = this.fontMap.get( name );
        if( font === undefined )
            throw new Error( `Font name can't be found (${name}).` );

        return font;
    }
    
    //
    //  DESC: Get the font
    //
    isFont( name )
    {
        let font = this.fontMap.get( name );
        if( font === undefined )
            throw new Error( `Font name can't be found (${name}).` );
    }
    
    // 
    //  DESC: allow event handling access function
    //
    get groupName() { return this.group; }
}

export var fontManager = new FontManager;
