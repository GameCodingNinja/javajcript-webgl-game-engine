
// 
//  FILE NAME:  visualcomponentspritesheet.js
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

export class VisualComponentSpriteSheet extends VisualComponentQuad
{
    constructor( visualData )
    {
        super( visualData );
        
        if( visualData.isActive() )
        {
            // Is this a sprite sheet? Get the glyph rect position
            if( visualData.genType === defs.EGT_SPRITE_SHEET )
            {
                this.glyphLocation = this.shaderData.getLocation( 'glyphRect' );

                this.glyphUV = visualData.spriteSheet.getGlyph().uv;
                this.frameIndex = visualData.spriteSheet.defaultIndex;
                
                // Local vertex scale for sprite sheets that might have glyphs of different sizes
                this.vertexScale = new Size;
                this.vertexScale.copy( this.visualData.vertexScale );
            }
        }
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
            gFinalMatrix.setScaleFromSize( this.vertexScale );
            gFinalMatrix.mergeMatrix( object.matrix.matrix );
            gFinalMatrix.mergeMatrix( camera.finalMatrix.matrix );

            // Send the final matrix to the shader
            gl.uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );

            // Send the glyph rect
            gl.uniform4fv( this.glyphLocation, this.glyphUV.data );
            
            // Do the render
            gl.drawElements(gl.TRIANGLE_FAN, this.iboCount, gl.UNSIGNED_BYTE, 0);
        }
    }
    
    //
    //  DESC: Set the frame ID from index
    //
    setFrame( index )
    {
        super.setFrame( index );
        
        let glyph = this.visualData.spriteSheet.getGlyph( index );

        this.vertexScale.w = glyph.size.w * this.visualData.defaultUniformScale;
        this.vertexScale.h = glyph.size.h * this.visualData.defaultUniformScale;

        this.glyphUV = glyph.uv;
    }
}
