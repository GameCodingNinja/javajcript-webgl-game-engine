
// 
//  FILE NAME:  spritesheet.js
//  DESC:       Class for holding sprite sheet data
//

"use strict";
import { SpriteSheetGlyph } from './spritesheetglyph';
import { Size } from '../common/size';
import { Rect } from '../common/rect';
import * as parseHelper from '../utilities/xmlparsehelper';

export class SpriteSheet
{
    constructor( defaultIndex = 0, glyphCount = 0, columns = 0 )
    {
        // Sprite Sheet default index
        this.defaultIndex = defaultIndex;

        // Sprite Sheet element count
        this.glyphCount = glyphCount;

        // Sprite Sheet columns
        this.columns = columns;
        
        // An array of all the glyphs built manually that are of the same size
        this.glyphAry = null;

        // A map of all the glyphs
        this.glyphMap = null;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.defaultIndex = obj.defaultIndex;
        this.glyphCount = obj.glyphCount;
        this.columns = obj.columns;
        
        if( obj.glyphAry )
        {
            if( this.glyphAry === null )
                this.glyphAry.length = 0;
            
            for( let i = 0; i < obj.glyphAry.length; ++i )
            {
                let glyph = obj.glyphAry[i];
                let size = new Size( glyph.size.w, glyph.size.h );
                let rect = new Rect( glyph.uv.x1, glyph.uv.y1, glyph.uv.x2, glyph.uv.y2 );
                let cropOffset = null;
                if( glyph.cropOffset )
                    cropOffset = new Size( glyph.cropOffset.w, glyph.cropOffset.h );
                
                this.glyphAry.push( new SpriteSheetGlyph( size, rect, cropOffset ) );
            }
        }
    }
    
    // 
    //  DESC: Build the simple (grid) sprite sheet data
    //
    build( sheetSize )
    {
        if( (this.glyphCount != 0) && (this.columns != 0) )
        {
            this.glyphAry = [];
            
            let rows = Math.trunc(this.glyphCount / this.columns);

            if( (this.glyphCount % this.columns) > 0 )
                ++rows;

            // Calculate the size of the individual glyph. They are all the same size
            let size = new Size( sheetSize.w / this.columns, sheetSize.h / rows );

            for( let i = 0; i < rows; ++i )
            {
                for( let j = 0; j < this.columns; ++j )
                {
                    let rect = new Rect(
                        (j * size.w) / sheetSize.w,
                        (i * size.h) / sheetSize.h,
                        size.w / sheetSize.w,
                        size.h / sheetSize.h );
                    
                    this.glyphAry.push( new SpriteSheetGlyph( size, rect ) );

                    // Break out after all the gylphs have been defined
                    if( this.glyphAry.length === this.glyphCount )
                        break;
                }
            }
        }
    }
    
    // 
    //  DESC: Load the glyph data from XML node
    //
    loadFromNode( node )
    {
        this.glyphMap = new Map;
        
        let sheetSize = new Size;
        let attr = node.getAttribute('width');
        if( attr )
            sheetSize.w = Number(attr);

        attr = node.getAttribute('height');
        if( attr )
            sheetSize.h = Number(attr);

        let rectNode = node.getElementsByTagName('rect');
        if( rectNode.length )
        {
            for( let i = 0; i < rectNode.length; ++i )
            {
                let rect = parseHelper.loadRectFromChild( rectNode[i] );

                let size = new Size( rect.x2, rect.y2 );

                let uv = new Rect(
                    rect.x1 / sheetSize.w,
                    rect.y1 / sheetSize.h,
                    rect.x2 / sheetSize.w,
                    rect.y2 / sheetSize.h );

                let cropOffset = new Size(
                    Number(rectNode[i].getAttribute( 'cx' )),
                    Number(rectNode[i].getAttribute( 'cy' )) );

                // Add to the map
                let strId = rectNode[i].getAttribute( 'name' );
                this.glyphMap.set( strId, new SpriteSheetGlyph( size, uv, cropOffset) );
            }
        }
    }
    
    // 
    //  DESC: Load the glyph data from XML node
    //
    getGlyph( index = -1 )
    {
        if( index > -1 )
            return this.glyphAry[ index ];

        else
            return this.glyphAry[ this.defaultIndex ];
    }
    
    
    // 
    //  DESC: Find the glyph by Id
    //
    findGlyph( glyphId )
    {
        let glyph = this.glyphMap.get( glyphId );
        if( glyph === undefined )
        {
            throw new Error( 'Glyph name is missing (' + glyphId + ')!' );
        }
        
        return glyph;
    }
    
    
    // 
    //  DESC: Set the gylph data
    //
    setGlyph( spriteSheet, glyphId )
    {
        let glyph = this.glyphMap.get( glyphId );
        if( glyph !== undefined )
        {
            if( spriteSheet.glyphAry === null )
                spriteSheet.glyphAry = [];
            
            spriteSheet.glyphAry.push( glyph );
        }
        else
        {
            throw new Error( 'Glyph name is missing (' + glyphId + ')!' );
        }
    }
    
    // 
    //  DESC: Get the number of gylphs in this sprite sheet
    //
    getCount()
    {
        if( (this.glyphAry !== null) && (this.glyphAry.length) )
            return this.glyphAry.length;
        
        else if( (this.glyphMap !== null) && (this.glyphMap.length) )
            return this.glyphMap.length;

        return this.glyphCount;
    }
    
    // 
    //  DESC: Copy over the gylph data
    //
    copyTo( spriteSheet, strIdAry )
    {
        if( strIdAry.length === 0 )
        {
            spriteSheet.glyphAry = this.glyphAry;
        }
        else if( this.glyphMap.size )
        {
            // Init the sprite sheet class when each glyph is defined in the object data
            if( spriteSheet.glyphCount === 0 )
            {
                for( let i = 0; i < strIdAry.length; ++i )
                    this.setGlyph( spriteSheet, strIdAry[i] );
            }
            // Init the sprite sheet class with an animation that is one glyph defined with a format code
            else
            {
                // Should only be one entry
                if( strIdAry.length === 1 )
                {
                    for( let i = 0; i < spriteSheet.glyphCount; ++i )
                        this.setGlyph( spriteSheet, strIdAry[0] + i );
                }
                else
                {
                    throw new Error( 'Sprite Sheet Incorrect configuration!' );
                }
            }
        }
    }
}
