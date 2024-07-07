
//
//  FILE NAME: fontmanager.js
//  DESC:      font manager class singleton
//

"use strict";
import { Font } from '../2d/font';
import { textureManager } from '../managers/texturemanager';
import { device } from '../system/device';
import * as genFunc from '../utilities/genfunc';

class FontManager
{
    constructor()
    {
        // map list of fonts
        this.fontMap = new Map;

        // Group name
        this.group = '(font)';
    }
    
    //
    //  DESC: Load the fonts from xml node
    //
    loadFromObj( obj )
    {
        let promiseAry = [];

        for( const each of obj )
        {
            // Sanity check to make sure the font has not already been added in
            if( this.fontMap.has( each.name ) )
                throw new Error( `Font name has already been loaded (${each.name}).` );
            
            // Add the font to our list
            this.fontMap.set( each.name, new Font );

            // Check texture filtering
            let textureFilter = device.gl.LINEAR;
            if( each.filter )
            {
                if( each.filter  === 'LINEAR' )
                    textureFilter = device.gl.LINEAR;
                else if( each.filter  === 'NEAREST' )
                    textureFilter = device.gl.NEAREST;
            }

            // Load the texture file
            let textureFilePath = each.file + '.png'
            promiseAry.push( genFunc.downloadFile( 'img', textureFilePath )
                    .then(( image ) => textureManager.load( this.group, each.name, image, textureFilter ))
                    .catch(( error ) => { console.error(error.stack); throw error; }) );

            // Load the xml file describing the font characteristics
            let fontFilePath = each.file + '.fnt'
            promiseAry.push( genFunc.downloadFile( 'xml', fontFilePath )
                    .then(( fontXmlNode ) => this.loadFont( each.name, fontXmlNode ))
                    .catch(( error ) => { console.error(error.stack); throw error; }) );
        }

        return Promise.all( promiseAry )
            .then(() => this.setFontTexture());
    }

    //
    //  DESC: Load the fonts from xml node
    //
    loadFromNode( xmlNode )
    {
        let promiseAry = [];

        if( xmlNode )
        {
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
        this._font = this.fontMap.get( name );
        if( this._font === undefined )
            throw new Error( `Font name has not been added to the map (${name}).` );
        
        this._font.loadFromNode( this.group, name, xmlNode );
    }

    //
    //  DESC: Set the textures to the font object
    //
    setFontTexture()
    {
        for( this._key of this.fontMap.keys() )
        {
            this._font = this.fontMap.get( this._key );
            this._font.texture = textureManager.get( this.group, this._key );
        }
    }
    
    //
    //  DESC: Get the font
    //
    getFont( name )
    {
        this._font = this.fontMap.get( name );
        if( this._font === undefined )
            throw new Error( `Font name can't be found (${name}).` );

        return this._font;
    }
    
    //
    //  DESC: Get the font
    //
    isFont( name )
    {
        this._font = this.fontMap.get( name );
        if( this._font === undefined )
            throw new Error( `Font name can't be found (${name}).` );
    }
}

export var fontManager = new FontManager;
