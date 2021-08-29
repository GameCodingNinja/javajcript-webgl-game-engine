
// 
//  FILE NAME: shadermanager.js
//  DESC:      shader class singleton
//

"use strict";

import { ShaderData } from '../common/shaderdata';
import { device } from '../system/device';
import { signalManager } from '../managers/signalmanager';
import * as genFunc from '../utilities/genfunc';

class ShaderManager
{
    constructor()
    {
        this.shaderMap = new Map;
        this.currentShaderData = null;
        this.currentAttributeCount = 0;
    }

    // 
    //  DESC: Load the shader from object
    //
    loadFromObj( obj )
    {
        let promiseAry = [];

        for( const [key, value] of Object.entries(obj) )
            this.createShader( key, value );

        return Promise.all( promiseAry );
    }

    // 
    //  DESC: Setup the load request to load the shader files from the server
    //
    createShader( name, data )
    {
        let gl = device.gl;

        // Check for duplicate
        if( this.shaderMap.has(name) )
            throw new Error( `Shader of this name already exists (${name}).` );

        // Add an entry to the map
        let shaderData = new ShaderData(name);
        this.shaderMap.set( name, shaderData );

        // Create the vertex shader
        let vertPromise = genFunc.downloadFile( 'txt', data.vert.file )
            .then(( vertText ) => this.create( gl.VERTEX_SHADER, shaderData, name, vertText ) );

        // Create the frag shader
        let fragPromise = genFunc.downloadFile( 'txt', data.frag.file )
            .then( (fragText ) => this.create( gl.FRAGMENT_SHADER, shaderData, name, fragText ) );
        
        return Promise.all( [vertPromise, fragPromise] )
            .then(() =>
            {
                // Combine the shaders into a program
                this.createProgram( shaderData );
                
                // Find the location of the custom shader variables
                this.locateShaderVariables( shaderData, data.vert.dataType, data.frag.dataType );

                // Init the shader
                signalManager.broadcast_initShader( name );
            });
    }
    
    // 
    //  DESC: Create the shaders from the shader files
    //
    create( shaderType, shaderData, shaderTxtId, shaderTxt )
    {
        let gl = device.gl;
        let id = gl.createShader(shaderType);
        if( id === 0 )
            throw new Error( `Error creating shader (${shaderTxtId}).` );
        
        // Load the shader text
        gl.shaderSource(id, shaderTxt);
        
        // Compile the shader and check for error
        gl.compileShader(id);
        if( !gl.getShaderParameter(id, gl.COMPILE_STATUS) )
                throw new Error( `ERROR compiling shader! (${gl.getShaderInfoLog(id)}).` );
        
        if( shaderType === gl.VERTEX_SHADER )
            shaderData.vertexId = id;

        else
            shaderData.fragmentId = id;
    }
    
    // 
    //  DESC: Create the programs
    //
    createProgram( shaderData )
    {
        let gl = device.gl;

        // Combine the shaders into a program
        shaderData.programId = gl.createProgram();
        gl.attachShader( shaderData.programId, shaderData.vertexId );
        gl.attachShader( shaderData.programId, shaderData.fragmentId );
        
        // Link the shader program
        gl.linkProgram( shaderData.programId );
            
        if( !gl.getProgramParameter( shaderData.programId, gl.LINK_STATUS ) )
            throw new Error( `ERROR linking program! (${shaderData.name}, ${gl.getProgramInfoLog(shaderData.programId)}).` );

        gl.validateProgram( shaderData.programId );

        if( !gl.getProgramParameter( shaderData.programId, gl.VALIDATE_STATUS ) )
            throw new Error( `ERROR validating program! (${shaderData.name}, ${gl.getProgramInfoLog(shaderData.programId)}).` );
    }

    // 
    //  DESC: Locate the indexes of the shader variables
    //
    locateShaderVariables( shaderData, vertObj, fragObj )
    {
        let gl = device.gl;

        for( const each of vertObj )
        {
            if( each.location !== undefined )
            {
                shaderData.locationMap.set( each.name, gl.getAttribLocation(shaderData.programId, each.name) );
                ++shaderData.attributeCount;
            }
            else
            {
                shaderData.locationMap.set( each.name, gl.getUniformLocation(shaderData.programId, each.name) );
            }
        }
        
        for( const each of fragObj )
            shaderData.locationMap.set( each.name, gl.getUniformLocation(shaderData.programId, each.name) );
    }
    
    // 
    //  DESC: Bind the shader program attribute variables
    //
    bind( shaderData )
    {
        if( this.currentShaderData != shaderData )
        {
            let gl = device.gl;
            
            if( this.currentShaderData === null )
            {
                this.currentAttributeCount = shaderData.attributeCount;
                
                for( let i = 0; i < this.currentAttributeCount; ++i )
                    gl.enableVertexAttribArray(i);
            }
            else if( this.currentAttributeCount != shaderData.attributeCount )
            {
                if( this.currentAttributeCount < shaderData.attributeCount )
                {
                    for( let i = this.currentAttributeCount; i < shaderData.attributeCount; ++i )
                        gl.enableVertexAttribArray(i);
                }
                else
                {
                    for( let i = shaderData.attributeCount; i < this.currentAttributeCount; ++i )
                        gl.disableVertexAttribArray(i);
                }

                this.currentAttributeCount = shaderData.attributeCount;
            }
            
            // save the current binding
            this.currentShaderData = shaderData;
            
            // Have OpenGL bind this shader now
            gl.useProgram( shaderData.programId );
        }
    }
    
    // 
    //  DESC: Unbind the shader program attribute variables
    //
    unbind()
    {
        let gl = device.gl;

        for( let i = 0; i < this.currentAttributeCount; ++i )
            gl.disableVertexAttribArray(i);
    
        this.currentShaderData = null;
        this.currentAttributeCount = 0;
        gl.useProgram( null );
    }
    
    // 
    //  DESC: Get the shader data
    //
    getShaderData( shaderId )
    {
        let shader = this.shaderMap.get( shaderId );
        if( shader !== undefined )
            return shader;
 
        throw new Error( `ERROR Shader has not been created! (${shaderId}).` );
    }
    
    // 
    //  DESC: Set the shader member varaible
    //
    setShaderValue4fv( shaderId, locationId, data )
    {
        let shaderData = this.getShaderData( shaderId );

        if( shaderData.hasLocation( locationId ) )
        {
            // Get the location of the variable
            let location = shaderData.getLocation( locationId );

            // Bind the shader so that we can change the value of the member
            this.bind( shaderData );

            device.gl.uniform4fv( location, data );

            // Unbind now that we are done
            this.unbind();
        }
    }
    
    // 
    //  DESC: Set the shader member varaible
    //
    setAllShaderValue4fv( locationId, data )
    {
        for( let key of this.shaderMap.keys() )
            this.setShaderValue4fv( key, locationId, data );
    }
}

export var shaderManager = new ShaderManager;
