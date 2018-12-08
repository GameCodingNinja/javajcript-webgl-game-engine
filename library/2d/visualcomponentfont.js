
// 
//  FILE NAME:  visualcomponentfont.js
//  DESC:       Class for handling the visual part of the sprite
//

"use strict";

import { VisualComponentQuad } from '../2d/visualcomponentquad';
import { shaderManager } from '../managers/shadermanager';
import { textureManager } from '../managers/texturemanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { fontManager } from '../managers/fontmanager';
import { FontData } from '../common/fontdata';
import { Matrix } from '../utilities/matrix';
import { Color } from '../common/color';
import { Size } from '../common/size';
import { Vertex2d } from '../common/vertex2d';
import { Camera } from '../utilities/camera';
import { gl } from '../system/device';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new Matrix;

export class VisualComponentFont extends VisualComponentQuad
{
    constructor( visualData )
    {
        super( visualData );
        
        if( visualData.isActive() )
        {
            this.uvLocation = this.shaderData.getLocation( 'in_uv' );
            this.text0Location = this.shaderData.getLocation( 'text0' );
            
            // Allocate the storage for the font if this is a font sprite
            this.fontData = new FontData;
        }
    }
    
    //
    //  DESC: Delete the custom VBO for this font
    //
    deleteFontVBO()
    {
        // Delete the VBO if this is a font
        if( (this.visualData.genType === defs.EGT_FONT) && (this.vbo !== null) )
        {
            gl.deleteBuffer( this.vbo );
            this.vbo = null;
        }

        // The IBO for the font is managed by the vertex buffer manager.
        // Font IBO are all the same with the only difference being
        // length of the character string.
    }

    //
    //  DESC: do the render
    //
    render( object, camera )
    {
        if( this.allowRender() )
        {
            // Bind the VBO and IBO
            vertexBufferManager.bind( this.vbo, this.ibo );

            // Bind the shader.
            shaderManager.bind( this.shaderData );
            
            // Setup the vertex attribute shader data
            gl.vertexAttribPointer( this.vertexLocation, 3, gl.FLOAT, false, this.VERTEX_BUF_SIZE, 0 );
            
            if( this.texture )
            {
                // Bind the texture
                textureManager.bind( this.texture.id );
                gl.uniform1i( this.text0Location, 0 ); // 0 = TEXTURE0

                // Setup the UV attribute shade data
                gl.vertexAttribPointer( this.uvLocation, 2, gl.FLOAT, false, this.VERTEX_BUF_SIZE, 12 );
            }
            
            // Send the color to the shader
            gl.uniform4fv( this.colorLocation, this.color.data );
            
            // Calculate the final matrix
            gFinalMatrix.initilizeMatrix();
            gFinalMatrix.mergeMatrix( object.matrix.matrix );
            gFinalMatrix.mergeMatrix( camera.finalMatrix.matrix );

            // Send the final matrix to the shader
            gl.uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );
            
            // Do the render
            gl.drawElements(gl.TRIANGLES, this.iboCount, gl.UNSIGNED_SHORT, 0);
        }
    }
    
    //
    //  DESC: Is rendering allowed?
    //
    allowRender()
    {
        return (this.fontData.fontString && this.vbo);
    }
    
    //
    //  DESC: Is this a font sprite
    //
    isFontSprite()
    {
        return true;
    }
    
    //
    //  DESC: Load the font properties from XML node
    //
    loadFontPropFromNode( node )
    {
        if( this.fontData )
            this.fontData.loadFromNode( node );
    }
    
    //
    //  DESC: Set the font properties
    //
    setFontProperties( fontName, hAlign = null, vAlign = null, kerning = null, sKern = null, lineWrapWidth = null, lineWrapHeight = null )
    {
        if( this.fontData )
        {
            this.fontData.fontProp.fontName = fontName;
            
            if( hAlign )
                this.fontData.fontProp.hAlign = hAlign;
            
            if( vAlign )
                this.fontData.fontProp.hAlign = vAlign;
            
            if( kerning )
                this.fontData.fontProp.kerning = kerning;
            
            if( sKern )
                this.fontData.fontProp.spaceCharKerning = sKern;
            
            if( lineWrapWidth )
                this.fontData.fontProp.lineWrapWidth = lineWrapWidth;
            
            if( lineWrapHeight )
                this.fontData.fontProp.lineWrapHeight = lineWrapHeight;
        }
    }
    
    //
    //  DESC: Create the font string from data
    //
    createFontStringFromData()
    {
        if( (this.fontData !== null) && this.fontData.fontString )
            this.createFontString( this.fontData.fontString );
    }

    //
    //  DESC: Create the font string
    //
    createFontString( fontString )
    {
        // Qualify if we want to build the font string
        if( (this.fontData !== null) &&
            (fontString !== '') &&
            (this.fontData.fontProp.fontName !== null) &&
            ((fontString !== this.fontData.fontString) || (this.vbo === null)) )
        {
            this.fontData.fontStrSize.reset();
            let lastCharDif = 0;

            let font = fontManager.getFont( this.fontData.fontProp.fontName );

            this.texture = font.texture;

            this.fontData.fontString = fontString;

            // count up the number of space characters
            let spaceCharCount = genFunc.countStrOccurrence( this.fontData.fontString, ' ' );

            // count up the number of bar | characters
            let barCharCount = genFunc.countStrOccurrence( this.fontData.fontString, '|' );

            // Size of the allocation
            const charCount = this.fontData.fontString.length - spaceCharCount - barCharCount;
            this.iboCount = charCount * 6;
            
            // Set a flag to indicate if the IBO should be built
            const BUILD_FONT_IBO = (this.iboCount > vertexBufferManager.currentMaxFontIndices);
            
            // Allocate the vert array
            let vertAry = new Array(charCount * 4 * 5);

            // Create a buffer to hold the indicies
            let indexAry = null;
            
            // Should we build or rebuild the font IBO
            if( BUILD_FONT_IBO )
                indexAry = new Array(this.iboCount);

            let xOffset = 0;
            let width = 0;
            let lineHeightOffset = 0;
            let lineHeightWrap = font.lineHeight + font.vertPadding + this.fontData.fontProp.lineWrapHeight;
            let initialHeightOffset = font.baselineOffset + font.vertPadding;
            let lineSpace = font.lineHeight - font.baselineOffset;

            let counter = 0;
            let vertAryIndex = 0;
            let lineCount = 0;

            // Get the size of the texture
            let textureSize = font.texture.size;

            // Handle the horizontal alignment
            let lineWidthOffsetAry = this.calcLineWidthOffset( font, this.fontData.fontString );

            // Set the initial line offset
            xOffset = lineWidthOffsetAry[lineCount++];

            // Handle the vertical alighnmenrt
            if( this.fontData.fontProp.vAlign === defs.EVA_VERT_TOP )
                lineHeightOffset = -initialHeightOffset;

            if( this.fontData.fontProp.vAlign === defs.EVA_VERT_CENTER )
            {
                lineHeightOffset = -(initialHeightOffset - ((font.baselineOffset-lineSpace) / 2) - font.vertPadding);

                if( lineWidthOffsetAry.length > 1 )
                    lineHeightOffset = ((lineHeightWrap * lineWidthOffsetAry.length) / 2) - font.baselineOffset;
            }

            else if( this.fontData.fontProp.vAlign === defs.EVA_VERT_BOTTOM )
            {
                lineHeightOffset = -(initialHeightOffset - font.baselineOffset - font.vertPadding);

                if( lineWidthOffsetAry.length > 1 )
                    lineHeightOffset += (lineHeightWrap * (lineWidthOffsetAry.length-1));
            }

            // Remove any fractional component of the line height offset
            lineHeightOffset = Math.trunc(lineHeightOffset);

            // Setup each character in the vertex buffer
            for( let i = 0; i < this.fontData.fontString.length; ++i )
            {
                let id = this.fontData.fontString.charCodeAt(i);

                // Line wrap if '|' character was used
                if( id === defs.CHAR_CODE_PIPE )
                {
                    xOffset = lineWidthOffsetAry[lineCount];
                    width = 0;

                    lineHeightOffset += -lineHeightWrap;
                    ++lineCount;
                }
                else
                {
                    // See if we can find the character
                    let charData = font.getCharData(id);

                    // Ignore space characters
                    if( id != defs.CHAR_CODE_SPACE )
                    {
                        let rect = charData.rect;

                        let yOffset = (font.lineHeight - rect.y2 - charData.offset.h) + lineHeightOffset;

                        // Check if the width or height is odd. If so, we offset
                        // by 0.5 for proper orthographic rendering
                        // speed enhancement - if( Math.trunc(rect.x2) % 2 != 0 )
                        let additionalOffsetX = 0;
                        if( Math.trunc(rect.x2) & 1 !== 0 )
                            additionalOffsetX = 0.5;

                        let additionalOffsetY = 0;
                        if( Math.trunc(rect.y2) & 1 !== 0 )
                            additionalOffsetY = 0.5;
                        
                        vertAry[vertAryIndex]   = xOffset + charData.offset.w + additionalOffsetX;
                        vertAry[vertAryIndex+1] = yOffset + additionalOffsetY;
                        vertAry[vertAryIndex+2] = 0;
                        vertAry[vertAryIndex+3] = rect.x1 / textureSize.w;
                        vertAry[vertAryIndex+4] = (rect.y1 + rect.y2) / textureSize.h;

                        // Calculate the second vertex of the first face
                        vertAry[vertAryIndex+5] = xOffset + rect.x2 + charData.offset.w + additionalOffsetX;
                        vertAry[vertAryIndex+6] = yOffset + rect.y2 + additionalOffsetY;
                        vertAry[vertAryIndex+7] = 0;
                        vertAry[vertAryIndex+8] = (rect.x1 + rect.x2) / textureSize.w;
                        vertAry[vertAryIndex+9] = rect.y1 / textureSize.h;

                        // Calculate the third vertex of the first face
                        vertAry[vertAryIndex+10] = vertAry[vertAryIndex];
                        vertAry[vertAryIndex+11] = vertAry[vertAryIndex+6];
                        vertAry[vertAryIndex+12] = 0;
                        vertAry[vertAryIndex+13] = vertAry[vertAryIndex+3];
                        vertAry[vertAryIndex+14] = vertAry[vertAryIndex+9];

                        // Calculate the second vertex of the second face
                        vertAry[vertAryIndex+15] = vertAry[vertAryIndex+5];
                        vertAry[vertAryIndex+16] = vertAry[vertAryIndex+1];
                        vertAry[vertAryIndex+17] = 0;
                        vertAry[vertAryIndex+18] = vertAry[vertAryIndex+8];
                        vertAry[vertAryIndex+19] = vertAry[vertAryIndex+4];
                        
                        vertAryIndex += 20;

                        if( BUILD_FONT_IBO )
                        {
                            // Create the indicies into the VBO
                            let arrayIndex = counter * 6;
                            let vertIndex = counter * 4;

                            indexAry[arrayIndex]   = vertIndex;
                            indexAry[arrayIndex+1] = vertIndex+1;
                            indexAry[arrayIndex+2] = vertIndex+2;

                            indexAry[arrayIndex+3] = vertIndex;
                            indexAry[arrayIndex+4] = vertIndex+3;
                            indexAry[arrayIndex+5] = vertIndex+1;
                        }

                        ++counter;
                    }

                    // Inc the font position
                    let inc = charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;

                    // Add in any additional spacing for the space character
                    if( id === defs.CHAR_CODE_SPACE )
                        inc += this.fontData.fontProp.spaceCharKerning;

                    width += inc;
                    xOffset += inc;

                    // Get the longest width of this font string
                    if( this.fontData.fontStrSize.w < width )
                    {
                        this.fontData.fontStrSize.w = width;

                        // This is the space between this character and the next.
                        // Save this difference so that it can be subtracted at the end
                        lastCharDif = inc - charData.rect.x2;
                    }

                    // Wrap to another line
                    if( (id === defs.CHAR_CODE_SPACE ) && (this.fontData.fontProp.lineWrapWidth > 0) )
                    {
                        let nextWord = 0;

                        // Get the length of the next word to see if if should wrap
                        for( let j = i+1; j < this.fontData.fontString.length; ++j )
                        {
                            id = this.fontData.fontString[j];

                            if( id != defs.CHAR_CODE_PIPE )
                            {
                                // See if we can find the character
                                let anotherCharData = font.getCharData(id);

                                // Break here when space is found
                                // Don't add the space to the size of the next word
                                if( id === defs.CHAR_CODE_SPACE )
                                    break;

                                // Don't count the
                                nextWord += anotherCharData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;
                            }
                        }

                        if( width + nextWord >= this.fontData.fontProp.lineWrapWidth )
                        {
                            xOffset = lineWidthOffsetAry[lineCount++];
                            width = 0;

                            lineHeightOffset += -lineHeightWrap;
                        }
                    }
                }
            }

            // Subtract the extra space after the last character
            this.fontData.fontStrSize.w -= lastCharDif;
            this.fontData.fontStrSize.h = font.lineHeight;

            // Save the data
            // If one doesn't exist, create the VBO and IBO for this font
            if( this.vbo === null )
                this.vbo = gl.createBuffer();

            gl.bindBuffer( gl.ARRAY_BUFFER, this.vbo );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertAry), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ARRAY_BUFFER, null );

            // All fonts share the same IBO because it's always the same and the only difference is it's length
            // This updates the current IBO if it exceeds the current max
            this.ibo = vertexBufferManager.createDynamicFontIBO( fontManager.groupName, 'dynamic_font_ibo', indexAry, this.iboCount );
        }
        else if( (this.fontData !== null) &&
                 (fontString !== '') &&
                 (fontString !== this.fontData.fontString) &&
                 (this.vbo !== null) )
        {
            this.fontData.fontString = '';
        }
    }

    //
    //  DESC: Add up all the character widths
    //
    calcLineWidthOffset( font, str )
    {
        let firstCharOffset = 0;
        let lastCharOffset = 0;
        let spaceWidth = 0;
        let width = 0;
        let counter = 0;
        let lineWidthOffsetAry = [];

        for( let i = 0; i < str.length; ++i )
        {
            let id = str.charCodeAt(i);

            // Line wrap if '|' character was used
            if( id === defs.CHAR_CODE_PIPE )
            {
                // Add the line width to the vector based on horz alignment
                this.addLineWithToAry( font, lineWidthOffsetAry, this.fontData.fontProp.hAlign, width, firstCharOffset, lastCharOffset );

                counter = 0;
                width = 0;
            }
            else
            {
                // Get the next character
                let charData = font.getCharData( id );

                if(counter === 0)
                    firstCharOffset = charData.offset.w;

                spaceWidth = charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;

                // Add in any additional spacing for the space character
                if( id === defs.CHAR_CODE_SPACE )
                    spaceWidth += this.fontData.fontProp.spaceCharKerning;

                width += spaceWidth;

                if( id != defs.CHAR_CODE_SPACE )
                    lastCharOffset = charData.offset.w;

                ++counter;
            }

            // Wrap to another line
            if( (id === defs.CHAR_CODE_SPACE) && (this.fontData.fontProp.lineWrapWidth > 0) )
            {
                let nextWord = 0;

                // Get the length of the next word to see if if should wrap
                for( let j = i+1; j < str.length; ++j )
                {
                    id = str[j];

                    if( id != defs.CHAR_CODE_PIPE )
                    {
                        // See if we can find the character
                        let charData = font.getCharData(id);

                        // Break here when space is found
                        // Don't add the space to the size of the next word
                        if( id === defs.CHAR_CODE_SPACE )
                            break;

                        // Don't count the
                        nextWord += charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;
                    }
                }

                if( width + nextWord >= this.fontData.fontProp.lineWrapWidth )
                {
                    // Add the line width to the vector based on horz alignment
                    this.addLineWithToAry( font, lineWidthOffsetAry, this.fontData.fontProp.hAlign, width-spaceWidth, firstCharOffset, lastCharOffset );

                    counter = 0;
                    width = 0;
                }
            }
        }

        // Add the line width to the vector based on horz alignment
        this.addLineWithToAry( font, lineWidthOffsetAry, this.fontData.fontProp.hAlign, width, firstCharOffset, lastCharOffset );

        return lineWidthOffsetAry;
    }

    //
    //  DESC: Add the line width to the array based on horz alignment
    //
    addLineWithToAry( font, lineWidthOffsetAry, hAlign, width, firstCharOffset, lastCharOffset )
    {
        if( hAlign === defs.EHA_HORZ_LEFT )
            lineWidthOffsetAry.push(-(firstCharOffset + font.horzPadding));

        else if( hAlign === defs.EHA_HORZ_CENTER )
            lineWidthOffsetAry.push(-((width - font.horzPadding) / 2));

        else if( hAlign === defs.EHA_HORZ_RIGHT )
            lineWidthOffsetAry.push(-(width - lastCharOffset - font.horzPadding));

        // Remove any fractional component of the last index
        lineWidthOffsetAry[lineWidthOffsetAry.length-1] = Math.trunc(lineWidthOffsetAry[lineWidthOffsetAry.length-1]);
    }
    
    //
    //  DESC: Get/Set the displayed font string
    //
    getFontString()
    {
        if( this.fontData === null )
            throw new Error( `Can't ask for the font string from a sprite that is not a sprite font!` );

        return this.fontData.fontString;
    }

    setFontString( fontString )
    {
        if( this.fontData === null )
            throw new Error( `Can't set a font string for a sprite that is not a sprite font!` );
        
        this.fontData.fontString = fontString;
    }
    
    //
    //  DESC: Get the font size
    //
    getFontSize()
    {
        if( !this.fontData )
        {
            throw new Error( `Can't ask for the font size from a sprite that is not defined!` );
            return null;
        }

        return this.fontData.fontStrSize;
    }
}
