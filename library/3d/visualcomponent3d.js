
// 
//  FILE NAME:  visualcomponent3d.js
//  DESC:       Class for handling the visual part of the sprite
//

"use strict";

import { ivisualComponent } from '../common/ivisualcomponent';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { shaderManager } from '../managers/shadermanager';
import { textureManager } from '../managers/texturemanager';
import { Matrix } from '../utilities/matrix';
import { Color } from '../common/color';
import { device } from '../system/device';

// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new Matrix;

export class VisualComponent3D extends ivisualComponent
{
    constructor( visualData )
    {
        super();
        
        this.visualData = visualData;
        this.shaderData = null;
        this.vertexLocation = null;
        this.normalLocation = null;
        this.uvLocation = null;
        this.text0Location = null;
        this.colorLocation = null;
        this.matrixLocation = null;
        this.normalMatrixLocation = null;
        this.VERTEX_BUF_SIZE = 24;
        
        this.color = new Color;
        
        if( visualData.isActive() )
        {
            this.meshAry = visualData.meshGrp.meshAry;
            this.shaderData = shaderManager.getShaderData( visualData.shaderID );
            
            // Common shader members
            this.vertexLocation = this.shaderData.getLocation( 'in_position' );
            this.normalLocation = this.shaderData.getLocation( 'in_normal' );
            this.matrixLocation = this.shaderData.getLocation( 'cameraViewProjMatrix' );
            this.normalMatrixLocation = this.shaderData.getLocation( 'normalMatrix' );
            this.colorLocation = this.shaderData.getLocation( 'color' );
            
            if( this.meshAry[0].textureAry.length )
            {
                this.VERTEX_BUF_SIZE = 32;
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
        let gl = device.gl;
        
        for( let i = 0; i < this.meshAry.length; ++i )
        {
            // Increment our stat counter to keep track of what is going on.
            //CStatCounter::Instance().IncDisplayCounter();

            // Bind the VBO and IBO. NOTE: One singlton needs to manage the vertex bindings
            vertexBufferManager.bind( this.meshAry[i].vbo, this.meshAry[i].ibo );

            // Bind the shader.
            shaderManager.bind( this.shaderData );

            // Setup the vertex attribute shader data
            gl.vertexAttribPointer( this.vertexLocation, 3, gl.FLOAT, false, this.VERTEX_BUF_SIZE, 0 );

            // Setup the normal attribute shade data
            gl.vertexAttribPointer( this.normalLocation, 3, gl.FLOAT, false, this.VERTEX_BUF_SIZE, 12 );

            // Enable the UV attribute shade data
            if( this.uvLocation )
            {
                // Bind the texture
                for( let j = 0; j < this.meshAry[i].textureAry.length; ++j )
                {
                    textureManager.bind( this.meshAry[i].textureAry[j].id );
                    gl.uniform1i( this.text0Location, 0);// future implementation - this.meshAry[i].textureAry[j].type ); // 0 = TEXTURE0
                }

                // Setup the uv attribute shade data
                gl.vertexAttribPointer( this.uvLocation, 2, gl.FLOAT, false, this.VERTEX_BUF_SIZE, 24 );
            }

            // Send the color to the shader
            gl.uniform4fv( this.colorLocation, this.color.data );

            gFinalMatrix.initilizeMatrix();
            gFinalMatrix.mergeMatrix( object.matrix.matrix );
            gFinalMatrix.mergeMatrix( camera.finalMatrix.matrix );
            gl.uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );
            
            gFinalMatrix.initilizeMatrix();
            gFinalMatrix.mergeMatrix( object.rotMatrix.matrix );
            gFinalMatrix.mergeMatrix( camera.rotMatrix.matrix );
            gl.uniformMatrix4fv( this.normalMatrixLocation, false, gFinalMatrix.matrix );

            // Render it
            gl.drawElements( gl.TRIANGLES, this.meshAry[i].iboCount, gl.UNSIGNED_SHORT, 0);
        }
    }
}
