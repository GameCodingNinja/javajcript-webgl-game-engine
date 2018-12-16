
// 
//  FILE NAME:  font.js
//  DESC:       font class
//

"use strict";

import { Size } from '../common/size';
import { Rect } from '../common/rect';
import { Texture } from '../common/texture';
import { textureManager } from '../managers/texturemanager';

export class CharData
{
    constructor()
    {
        // Character offsets
        this.offset = new Size;

        // Character rect
        this.rect = new Rect;

        // Amount to advance
        this.xAdvance = 0;
    }
}

export class Font
{
    constructor()
    {
        // map list of character data
        this.charDataMap = new Map;

        // Line height
        this.lineHeight = 0;

        // base line offset
        this.baselineOffset = 0;

        // Horizontal padding
        this.horzPadding = 0;

        // Vertival padding
        this.vertPadding = 0;

        // The texture
        this.texture = null;
    }
    
    // 
    //  DESC: Load from XML node
    //
    loadFromNode( group, name, xmlNode )
    {
        // load the texture
        this.texture = textureManager.getTexture( group, name );

        // Get the padding
        let padding = xmlNode.getElementsByTagName('info')[0].getAttribute('padding');
        this.horzPadding = Number(padding.substr(6,1));
        this.vertPadding = Number(padding.substr(0,1));

        // Get the common font info
        let commonNode = xmlNode.getElementsByTagName( 'common' );

        // get the line height
        this.lineHeight = Number(commonNode[0].getAttribute('lineHeight'));

        // get the baseline offset
        this.baselineOffset = Number(commonNode[0].getAttribute('base'));

        // Get the list of character info
        let charNode = xmlNode.getElementsByTagName( 'char' );

        // Load in the individual character data
        for( let i = 0; i < charNode.length; ++i )
        {
            let charData = new CharData;

            // Get the offset of the character
            charData.offset.w = Number(charNode[i].getAttribute( 'xoffset' ));
            charData.offset.h = Number(charNode[i].getAttribute( 'yoffset' ));

            // Get the x advance of the character
            charData.xAdvance = Number(charNode[i].getAttribute( 'xadvance' ));

            // Get the rect of the character
            charData.rect.x1 = Number(charNode[i].getAttribute( 'x' ));
            charData.rect.y1 = Number(charNode[i].getAttribute( 'y' ));
            charData.rect.x2 = Number(charNode[i].getAttribute( 'width' ));
            charData.rect.y2 = Number(charNode[i].getAttribute( 'height' ));

            // Get the character ID which is the ascii value of the character.
            let id = Number(charNode[i].getAttribute( 'id' ));

            // Add the character to the map
            this.charDataMap.set( id, charData );
        }
    }
    
    // 
    //  DESC: Get the data for this character
    //
    getCharData( id )
    {
        // See if this character is part of the map
        let charData = this.charDataMap.get( id );

        if( charData === undefined )
            throw new Error( `Font character ID can't be found (${id}).` );

        return charData;
    }
}
