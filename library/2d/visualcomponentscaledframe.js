
// 
//  FILE NAME:  visualcomponentscaledframe.js
//  DESC:       Class for handling the visual part of the sprite
//

"use strict";

import { VisualComponentQuad } from '../2d/visualcomponentquad';
import { shaderManager } from '../managers/shadermanager';
import { textureManager } from '../managers/texturemanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { Matrix } from '../utilities/matrix';
import { device } from '../system/device';
import { statCounter } from '../utilities/statcounter';

// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new Matrix;

export class VisualComponentScaledFrame extends VisualComponentQuad
{
    constructor( visualData )
    {
        super( visualData );
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
            device.gl.drawElements(device.gl.TRIANGLES, this.iboCount, device.gl.UNSIGNED_BYTE, 0);
        }
    }

    //
    //  DESC: Get the size of the frame
    //
    getSize()
    {
        if( this.visualData.size )
        {
            return this.visualData.size;
        }

        return null;
    }
}
