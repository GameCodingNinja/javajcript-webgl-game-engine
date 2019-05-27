
//
//  FILE NAME: fontmanager.js
//  DESC:      font manager class singleton
//

"use strict";
import { Font } from '../2d/font';
import { textureManager } from '../managers/texturemanager';
import * as genFunc from '../utilities/genfunc';

class FontManager
{
    constructor()
    {
        // map list of fonts
        this.fontMap = new Map;

        // Group name
        this.group = '';
    }
    
    // 
    //  DESC: Load the data list tables from file path
    //
    load( filePath )
    {
        return genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) => this.loadFromNode( xmlNode ));
    }
    
    //
    //  DESC: Load the fonts from xml node
    //
    loadFromNode( xmlNode )
    {
        let promiseAry = [];

        if( xmlNode )
        {
            // Get the group the textures will be saves as
            let listGroupNode = xmlNode.getElementsByTagName('listGroup');
            this.group = listGroupNode[0].getAttribute( 'name' );

            // Get the list of font info
            let fontNode = xmlNode.getElementsByTagName('font');

            for( let i = 0; i < fontNode.length; ++i )
            {
                // Get the name of the font
                let name = fontNode[i].getAttribute( 'name' );

                // Sanity check to make sure the font has not already been added in
                if( this.fontMap.has( name ) )
                    throw new Error( `Font name has already been loaded (${name}).` );

                // Add the font to our list
                this.fontMap.set( name, new Font );

                let filePath = fontNode[i].getAttribute( 'file' );

                // Load the texture file
                let textureFilePath = filePath + '.png'
                promiseAry.push( genFunc.downloadFile( 'img', textureFilePath )
                        .then(( image ) => textureManager.load( this.group, name, image ))
                        .catch(( error ) => { console.error(error.stack); throw error; }) );

                // Load the xml file describing the font characteristics
                let fontFilePath = filePath + '.fnt'
                promiseAry.push( genFunc.downloadFile( 'xml', fontFilePath )
                        .then(( fontXmlNode ) => this.loadFont( name, fontXmlNode ))
                        .catch(( error ) => { console.error(error.stack); throw error; }) );
            }
        }

        return Promise.all( promiseAry )
                    .then(() => this.setFontTexture());
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
    //  DESC: Set the textures to the font object
    //
    setFontTexture()
    {
        for( let [ key, font ] of this.fontMap.entries() )
            font.texture = textureManager.get( this.group, key );
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
