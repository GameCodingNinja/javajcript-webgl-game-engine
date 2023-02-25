
// 
//  FILE NAME:  visualcomponentquad.js
//  DESC:       Class for handling the visual part of the sprite
//

"use strict";

import { ivisualComponent } from '../common/ivisualcomponent';
import { shaderManager } from '../managers/shadermanager';
import { textureManager } from '../managers/texturemanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { statCounter } from '../utilities/statcounter';
import { Matrix } from '../utilities/matrix';
import { Color } from '../common/color';
import { device } from '../system/device';
import * as defs from '../common/defs';

// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new Matrix;

export class VisualComponentQuad extends ivisualComponent
{
    constructor( visualData )
    {
        super();
        
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
        this.texture = visualData.getTexture();
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
    //  DESC: do the render
    //
    render( object, camera )
    {
        if( this.allowRender() )
        {
            let gl = device.gl;
            
            // Bind the VBO and IBO
            vertexBufferManager.bind( this.vbo, this.ibo );

            // Bind the shader.
            shaderManager.bind( this.shaderData );
            
            // Setup the vertex attribute shader data
            gl.vertexAttribPointer( this.vertexLocation, 3, gl.FLOAT, false, this.VERTEX_BUF_SIZE, 0 );

            // Increment our stat counter to keep track of what is going on.
            statCounter.vObjCounter++;
            
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
    //  DESC: Set the frame ID from index
    //
    setFrame( index )
    {
        if( index < this.visualData.getFrameCount() )
        {
            this.frameIndex = index;
            this.texture = this.visualData.getTexture( index );
        }
    }
    
    //
    //  DESC: Get the frame count
    //
    getFrameCount()
    {
        return this.visualData.getFrameCount();
    }

    //
    //  DESC: Get the size of the texture
    //
    getSize()
    {
        if( this.texture !== null )
        {
            return this.texture.size;
        }

        return null;
    }
}
