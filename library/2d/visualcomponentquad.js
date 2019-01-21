
// 
//  FILE NAME:  visualcomponentquad.js
//  DESC:       Class for handling the visual part of the sprite
//

"use strict";

import { shaderManager } from '../managers/shadermanager';
import { textureManager } from '../managers/texturemanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { fontManager } from '../managers/fontmanager';
import { FontData } from '../common/fontdata';
import { Matrix } from '../utilities/matrix';
import { Color } from '../common/color';
import { Size } from '../common/size';
import { Vertex2d } from '../common/vertex2d';
import { Camera } from '../common/camera';
import { gl } from '../system/device';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new Matrix;

export class VisualComponentQuad
{
    constructor( visualData )
    {
        this.visualData = visualData;
        this.shaderData = null;
        this.vertexLocation = null;
        this.text0Location = null;
        this.uvLocation = null;
        this.matrixLocation = null;
        this.colorLocation = null;
        this.VERTEX_BUF_SIZE = 20;
        this.frameIndex = 0;
        this.vbo = visualData.vbo;
        this.ibo = visualData.ibo;
        this.iboCount = visualData.iboCount;
        this.texture = visualData.texture;
        this.color = new Color;
        
        if( visualData.isActive() )
        {
            this.shaderData = shaderManager.getShaderData( visualData.shaderID );

            // Common shader members
            this.vertexLocation = this.shaderData.getLocation( 'in_position' );
            this.matrixLocation = this.shaderData.getLocation( 'cameraViewProjMatrix' );
            this.colorLocation = this.shaderData.getLocation( 'color' );
            
            // Do we have a texture? This could be a solid rect
            if( this.texture !== null )
            {
                this.uvLocation = this.shaderData.getLocation( 'in_uv' );
                this.text0Location = this.shaderData.getLocation( 'text0' );
            }
            
            this.color.copy( this.visualData.color );
        }
    }
    
    //
    //  DESC: Delete the custom VBO for this font
    //
    deleteFontVBO()
    {
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
            gFinalMatrix.setScaleFromSize( this.visualData.vertexScale );
            gFinalMatrix.mergeMatrix( object.matrix.matrix );
            gFinalMatrix.mergeMatrix( camera.finalMatrix.matrix );

            // Send the final matrix to the shader
            gl.uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );
            
            // Do the render
            gl.drawElements(gl.TRIANGLE_FAN, this.iboCount, gl.UNSIGNED_BYTE, 0);
        }
    }
    
    //
    //  DESC: Is rendering allowed?
    //
    allowRender()
    {
        return (this.visualData.genType != defs.EGT_NULL);
    }
    
    //
    //  DESC: Is this a font sprite
    //
    isFontSprite()
    {
        return false;
    }
    
    //
    //  DESC: Set the frame ID from index
    //
    setFrame( index )
    {
        this.frameIndex = index;
    }
    
    //
    //  DESC: Get the font size
    //
    getFontSize()
    {
        return 0;
    }
}
