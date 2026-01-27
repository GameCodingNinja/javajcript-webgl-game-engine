
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
import { device } from '../system/device';
import { statCounter } from '../utilities/statcounter';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new Matrix;

// init with 50 characters that will satisfy most interface needs
var gVertAry = new Float32Array(50 * 4 * 5);
var gIndexAry = new Uint16Array(50 * 6);

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
            device.gl.deleteBuffer( this.vbo );
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
            device.gl.vertexAttribPointer( this.vertexLocation, 3, device.gl.FLOAT, false, this.VERTEX_BUF_SIZE, 0 );

            // Increment our stat counter to keep track of what is going on.
            statCounter.vObjCounter++;
            
            if( this.texture )
            {
                // Bind the texture
                textureManager.bind( this.texture.id );
                device.gl.uniform1i( this.text0Location, 0 ); // 0 = TEXTURE0

                // Setup the UV attribute shade data
                device.gl.vertexAttribPointer( this.uvLocation, 2, device.gl.FLOAT, false, this.VERTEX_BUF_SIZE, 12 );
            }
            
            // Send the color to the shader
            device.gl.uniform4fv( this.colorLocation, this.color.data );
            
            // Calculate the final matrix
            gFinalMatrix.initilizeMatrix();
            gFinalMatrix.mergeMatrix( object.matrix.matrix );
            gFinalMatrix.mergeMatrix( camera.finalMatrix.matrix );

            // Send the final matrix to the shader
            device.gl.uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );
            
            // Do the render
            device.gl.drawElements(device.gl.TRIANGLES, this.iboCount, device.gl.UNSIGNED_SHORT, 0);
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
            
            if( hAlign != null )
                this.fontData.fontProp.hAlign = hAlign;
            
            if( vAlign != null )
                this.fontData.fontProp.vAlign = vAlign;
            
            if( kerning != null )
                this.fontData.fontProp.kerning = kerning;
            
            if( sKern != null )
                this.fontData.fontProp.spaceCharKerning = sKern;
            
            if( lineWrapWidth != null )
                this.fontData.fontProp.lineWrapWidth = lineWrapWidth;
            
            if( lineWrapHeight != null )
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
            this.fontData.fontStrSize.clear();
            this._lastCharDif = 0;

            this._font = fontManager.getFont( this.fontData.fontProp.fontName );

            this.texture = this._font.texture;

            this.fontData.fontString = fontString;

            // count up the number of space characters
            this._spaceCharCount = genFunc.countStrOccurrence( this.fontData.fontString, ' ' );

            // count up the number of bar | characters
            this._barCharCount = genFunc.countStrOccurrence( this.fontData.fontString, '|' );

            // Size of the allocation
            this._charCount = this.fontData.fontString.length - this._spaceCharCount - this._barCharCount;
            this.iboCount = this._charCount * 6;
            
            // Set a flag to indicate if the IBO should be built
            this._BUILD_FONT_IBO = (this.iboCount > vertexBufferManager.currentMaxFontIndices);
            
            // Allocate the vert array if necessary
            if(gVertAry.length < (this._charCount * 4 * 5))
                gVertAry = new Float32Array(this._charCount * 4 * 5);

            // Should we build or rebuild the font IBO
            // All fonts share the same IBO because it's always the same and the only difference is it's length
            if( this._BUILD_FONT_IBO )
            {
                if(gIndexAry.length < this.iboCount)
                    gIndexAry = new Uint16Array(this.iboCount);
            }
                
            this._xOffset = 0;
            this._width = 0;
            this._lineHeightOffset = 0;
            this._lineHeightWrap = this._font.lineHeight + this._font.vertPadding + this.fontData.fontProp.lineWrapHeight;
            this._initialHeightOffset = this._font.baselineOffset + this._font.vertPadding;
            this._lineSpace = this._font.lineHeight - this._font.baselineOffset;

            this._counter = 0;
            this._vertAryIndex = 0;
            this._lineCount = 0;

            // Get the size of the texture
            this._textureSize = this._font.texture.size;

            // Handle the horizontal alignment
            this._lineWidthOffsetAry = this.calcLineWidthOffset( this._font, this.fontData.fontString );

            // Set the initial line offset
            this._xOffset = this._lineWidthOffsetAry[this._lineCount++];

            // Handle the vertical alighnmenrt
            if( this.fontData.fontProp.vAlign === defs.EVA_VERT_TOP )
                this._lineHeightOffset = -this._initialHeightOffset;

            if( this.fontData.fontProp.vAlign === defs.EVA_VERT_CENTER )
            {
                this._lineHeightOffset = -(this._initialHeightOffset - ((this._font.baselineOffset-this._lineSpace) / 2) - this._font.vertPadding);

                if( this._lineWidthOffsetAry.length > 1 )
                    this._lineHeightOffset = ((this._lineHeightWrap * this._lineWidthOffsetAry.length) / 2) - this._font.baselineOffset;
            }

            else if( this.fontData.fontProp.vAlign === defs.EVA_VERT_BOTTOM )
            {
                this._lineHeightOffset = -(this._initialHeightOffset - this._font.baselineOffset - this._font.vertPadding);

                if( this._lineWidthOffsetAry.length > 1 )
                    this._lineHeightOffset += (this._lineHeightWrap * (this._lineWidthOffsetAry.length-1));
            }

            // Remove any fractional component of the line height offset
            this._lineHeightOffset = Math.trunc(this._lineHeightOffset);

            // Setup each character in the vertex buffer
            for( this._i = 0; this._i < this.fontData.fontString.length; ++this._i )
            {
                this._id = this.fontData.fontString.charCodeAt(this._i);

                // Line wrap if '|' character was used
                if( this._id === defs.CHAR_CODE_PIPE )
                {
                    this._xOffset = this._lineWidthOffsetAry[this._lineCount];
                    this._width = 0;

                    this._lineHeightOffset += -this._lineHeightWrap;
                    ++this._lineCount;
                }
                else
                {
                    // See if we can find the character
                    this._charData = this._font.getCharData(this._id);

                    // Ignore space characters
                    if( this._id != defs.CHAR_CODE_SPACE )
                    {
                        this._rect = this._charData.rect;

                        this._yOffset = (this._font.lineHeight - this._rect.y2 - this._charData.offset.h) + this._lineHeightOffset;

                        // Check if the width or height is odd. If so, we offset
                        // by 0.5 for proper orthographic rendering
                        // speed enhancement - if( Math.trunc(rect.x2) % 2 != 0 )
                        this._additionalOffsetX = 0;
                        if( Math.trunc(this._rect.x2) & 1 !== 0 )
                            this._additionalOffsetX = 0.5;

                        this._additionalOffsetY = 0;
                        if( Math.trunc(this._rect.y2) & 1 !== 0 )
                            this._additionalOffsetY = 0.5;
                        
                        gVertAry[this._vertAryIndex]   = this._xOffset + this._charData.offset.w + this._additionalOffsetX;
                        gVertAry[this._vertAryIndex+1] = this._yOffset + this._additionalOffsetY;
                        gVertAry[this._vertAryIndex+2] = 0;
                        gVertAry[this._vertAryIndex+3] = this._rect.x1 / this._textureSize.w;
                        gVertAry[this._vertAryIndex+4] = (this._rect.y1 + this._rect.y2) / this._textureSize.h;

                        // Calculate the second vertex of the first face
                        gVertAry[this._vertAryIndex+5] = this._xOffset + this._rect.x2 + this._charData.offset.w + this._additionalOffsetX;
                        gVertAry[this._vertAryIndex+6] = this._yOffset + this._rect.y2 + this._additionalOffsetY;
                        gVertAry[this._vertAryIndex+7] = 0;
                        gVertAry[this._vertAryIndex+8] = (this._rect.x1 + this._rect.x2) / this._textureSize.w;
                        gVertAry[this._vertAryIndex+9] = this._rect.y1 / this._textureSize.h;

                        // Calculate the third vertex of the first face
                        gVertAry[this._vertAryIndex+10] = gVertAry[this._vertAryIndex];
                        gVertAry[this._vertAryIndex+11] = gVertAry[this._vertAryIndex+6];
                        gVertAry[this._vertAryIndex+12] = 0;
                        gVertAry[this._vertAryIndex+13] = gVertAry[this._vertAryIndex+3];
                        gVertAry[this._vertAryIndex+14] = gVertAry[this._vertAryIndex+9];

                        // Calculate the second vertex of the second face
                        gVertAry[this._vertAryIndex+15] = gVertAry[this._vertAryIndex+5];
                        gVertAry[this._vertAryIndex+16] = gVertAry[this._vertAryIndex+1];
                        gVertAry[this._vertAryIndex+17] = 0;
                        gVertAry[this._vertAryIndex+18] = gVertAry[this._vertAryIndex+8];
                        gVertAry[this._vertAryIndex+19] = gVertAry[this._vertAryIndex+4];
                        
                        this._vertAryIndex += 20;

                        if( this._BUILD_FONT_IBO )
                        {
                            // Create the indicies into the VBO
                            this._arrayIndex = this._counter * 6;
                            this._vertIndex = this._counter * 4;

                            gIndexAry[this._arrayIndex]   = this._vertIndex;
                            gIndexAry[this._arrayIndex+1] = this._vertIndex+1;
                            gIndexAry[this._arrayIndex+2] = this._vertIndex+2;

                            gIndexAry[this._arrayIndex+3] = this._vertIndex;
                            gIndexAry[this._arrayIndex+4] = this._vertIndex+3;
                            gIndexAry[this._arrayIndex+5] = this._vertIndex+1;
                        }

                        ++this._counter;
                    }

                    // Inc the font position
                    this._inc = this._charData.xAdvance + this.fontData.fontProp.kerning + this._font.horzPadding;

                    // Add in any additional spacing for the space character
                    if( this._id === defs.CHAR_CODE_SPACE )
                        this._inc += this.fontData.fontProp.spaceCharKerning;

                    this._width += this._inc;
                    this._xOffset += this._inc;

                    // Get the longest width of this font string
                    if( this.fontData.fontStrSize.w < this._width )
                    {
                        this.fontData.fontStrSize.w = this._width;

                        // This is the space between this character and the next.
                        // Save this difference so that it can be subtracted at the end
                        this._lastCharDif = this._inc - this._charData.rect.x2;
                    }

                    // Wrap to another line
                    if( (this._id === defs.CHAR_CODE_SPACE ) && (this.fontData.fontProp.lineWrapWidth > 0) )
                    {
                        this._nextWord = 0;

                        // Get the length of the next word to see if if should wrap
                        for( this._j = this._i+1; this._j < this.fontData.fontString.length; ++this._j )
                        {
                            this._id = this.fontData.fontString.charCodeAt(this._j);

                            if( this._id != defs.CHAR_CODE_PIPE )
                            {
                                // See if we can find the character
                                this._anotherCharData = this._font.getCharData(this._id);

                                // Break here when space is found
                                // Don't add the space to the size of the next word
                                if( this._id === defs.CHAR_CODE_SPACE )
                                    break;

                                // Don't count the
                                this._nextWord += this._anotherCharData.xAdvance + this.fontData.fontProp.kerning + this._font.horzPadding;
                            }
                        }

                        if( this._width + this._nextWord >= this.fontData.fontProp.lineWrapWidth )
                        {
                            this._xOffset = this._lineWidthOffsetAry[this._lineCount++];
                            this._width = 0;

                            this._lineHeightOffset += -this._lineHeightWrap;
                        }
                    }
                }
            }

            // Subtract the extra space after the last character
            this.fontData.fontStrSize.w -= this._lastCharDif;
            this.fontData.fontStrSize.h = this._font.lineHeight;

            // Save the data
            // If one doesn't exist, create the VBO and IBO for this font
            if( this.vbo === null )
                this.vbo = device.gl.createBuffer();

            device.gl.bindBuffer( device.gl.ARRAY_BUFFER, this.vbo );
            device.gl.bufferData( device.gl.ARRAY_BUFFER, gVertAry.subarray(0, this._vertAryIndex), device.gl.STATIC_DRAW );
            device.gl.bindBuffer( device.gl.ARRAY_BUFFER, null );

            // All fonts share the same IBO because it's always the same and the only difference is it's length
            // This updates the current IBO if it exceeds the current max
            this.ibo = vertexBufferManager.createDynamicFontIBO( fontManager.groupName, 'dynamic_font_ibo', gIndexAry, this.iboCount );
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
        this._firstCharOffset = 0;
        this._lastCharOffset = 0;
        this._spaceWidth = 0;
        this._clwo_width = 0;
        this._clwo_counter = 0;
        this._clwo_lineWidthOffsetAry = [];

        for( this._clwo_i = 0; this._clwo_i < str.length; ++this._clwo_i )
        {
            this._clwo_id = str.charCodeAt(this._clwo_i);

            // Line wrap if '|' character was used
            if( this._clwo_id === defs.CHAR_CODE_PIPE )
            {
                // Add the line width to the vector based on horz alignment
                this.addLineWithToAry( font, this._clwo_lineWidthOffsetAry, this.fontData.fontProp.hAlign, this._clwo_width, this._firstCharOffset, this._lastCharOffset );

                this._clwo_counter = 0;
                this._clwo_width = 0;
            }
            else
            {
                // Get the next character
                this._clwo_charData = font.getCharData( this._clwo_id );

                if(this._clwo_counter === 0)
                    this._firstCharOffset = this._clwo_charData.offset.w;

                this._spaceWidth = this._clwo_charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;

                // Add in any additional spacing for the space character
                if( this._clwo_id === defs.CHAR_CODE_SPACE )
                    this._spaceWidth += this.fontData.fontProp.spaceCharKerning;

                this._clwo_width += this._spaceWidth;

                if( this._clwo_id != defs.CHAR_CODE_SPACE )
                    this._lastCharOffset = this._clwo_charData.offset.w;

                ++this._clwo_counter;
            }

            // Wrap to another line
            if( (this._clwo_id === defs.CHAR_CODE_SPACE) && (this.fontData.fontProp.lineWrapWidth > 0) )
            {
                this._clwo_nextWord = 0;

                // Get the length of the next word to see if if should wrap
                for( this._clwo_j = this._clwo_i+1; this._clwo_j < str.length; ++this._clwo_j )
                {
                    this._clwo_id = str.charCodeAt(this._clwo_j);

                    if( this._clwo_id != defs.CHAR_CODE_PIPE )
                    {
                        // See if we can find the character
                        this._clwo_charData = font.getCharData(this._clwo_id);

                        // Break here when space is found
                        // Don't add the space to the size of the next word
                        if( this._clwo_id === defs.CHAR_CODE_SPACE )
                            break;

                        // Don't count the
                        this._clwo_nextWord += this._clwo_charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;
                    }
                }

                if( this._clwo_width + this._clwo_nextWord >= this.fontData.fontProp.lineWrapWidth )
                {
                    // Add the line width to the vector based on horz alignment
                    this.addLineWithToAry( font, this._clwo_lineWidthOffsetAry, this.fontData.fontProp.hAlign, this._clwo_width-this._spaceWidth, this._firstCharOffset, this._lastCharOffset );

                    this._clwo_counter = 0;
                    this._clwo_width = 0;
                }
            }
        }

        // Add the line width to the vector based on horz alignment
        this.addLineWithToAry( font, this._clwo_lineWidthOffsetAry, this.fontData.fontProp.hAlign, this._clwo_width, this._firstCharOffset, this._lastCharOffset );

        return this._clwo_lineWidthOffsetAry;
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
    getSize()
    {
        if( this.fontData === null )
            throw new Error( `Can't ask for the font size from a sprite that is not defined!` );

        return this.fontData.fontStrSize;
    }
}
