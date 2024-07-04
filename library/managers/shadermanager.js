
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
        for( const [key, value] of Object.entries(obj) )
            this.createShader( key, value );

        // Nothing else to do here. Return an empty promise
        return Promise.all( [] );
    }

    // 
    //  DESC: Setup the load request to load the shader files from the server
    //
    createShader( name, data )
    {
        // Check for duplicate
        if( this.shaderMap.has(name) )
            throw new Error( `Shader of this name already exists (${name}).` );

        // Add an entry to the map
        let shaderData = new ShaderData(name);
        this.shaderMap.set( name, shaderData );

        // Create the vertex shader
        let vertPromise = genFunc.downloadFile( 'txt', data.vert.file )
            .then(( vertText ) => this.create( device.gl.VERTEX_SHADER, shaderData, name, vertText ) );

        // Create the frag shader
        let fragPromise = genFunc.downloadFile( 'txt', data.frag.file )
            .then( (fragText ) => this.create( device.gl.FRAGMENT_SHADER, shaderData, name, fragText ) );
        
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
        this._id = device.gl.createShader(shaderType);
        if( this._id === 0 )
            throw new Error( `Error creating shader (${shaderTxtId}).` );
        
        // Load the shader text
        device.gl.shaderSource(this._id, shaderTxt);
        
        // Compile the shader and check for error
        device.gl.compileShader(this._id);
        if( !device.gl.getShaderParameter(this._id, device.gl.COMPILE_STATUS) )
                throw new Error( `ERROR compiling shader! (${device.gl.getShaderInfoLog(this._id)}).` );
        
        if( shaderType === device.gl.VERTEX_SHADER )
            shaderData.vertexId = this._id;

        else
            shaderData.fragmentId = this._id;
    }
    
    // 
    //  DESC: Create the programs
    //
    createProgram( shaderData )
    {
        // Combine the shaders into a program
        shaderData.programId = device.gl.createProgram();
        device.gl.attachShader( shaderData.programId, shaderData.vertexId );
        device.gl.attachShader( shaderData.programId, shaderData.fragmentId );
        
        // Link the shader program
        device.gl.linkProgram( shaderData.programId );
            
        if( !device.gl.getProgramParameter( shaderData.programId, device.gl.LINK_STATUS ) )
            throw new Error( `ERROR linking program! (${shaderData.name}, ${device.gl.getProgramInfoLog(shaderData.programId)}).` );

        device.gl.validateProgram( shaderData.programId );

        if( !device.gl.getProgramParameter( shaderData.programId, device.gl.VALIDATE_STATUS ) )
            throw new Error( `ERROR validating program! (${shaderData.name}, ${device.gl.getProgramInfoLog(shaderData.programId)}).` );
    }

    // 
    //  DESC: Locate the indexes of the shader variables
    //
    locateShaderVariables( shaderData, vertObj, fragObj )
    {
        for( this._each of vertObj )
        {
            if( this._each.location !== undefined )
            {
                shaderData.locationMap.set( this._each.name, device.gl.getAttribLocation(shaderData.programId, this._each.name) );
                ++shaderData.attributeCount;
            }
            else
            {
                shaderData.locationMap.set( this._each.name, device.gl.getUniformLocation(shaderData.programId, this._each.name) );
            }
        }
        
        for( this._each of fragObj )
            shaderData.locationMap.set( this._each.name, device.gl.getUniformLocation(shaderData.programId, this._each.name) );
    }
    
    // 
    //  DESC: Bind the shader program attribute variables
    //
    bind( shaderData )
    {
        if( this.currentShaderData != shaderData )
        {
            if( this.currentShaderData === null )
            {
                this.currentAttributeCount = shaderData.attributeCount;
                
                for( this._i = 0; this._i < this.currentAttributeCount; ++this._i )
                    device.gl.enableVertexAttribArray(this._i);
            }
            else if( this.currentAttributeCount != shaderData.attributeCount )
            {
                if( this.currentAttributeCount < shaderData.attributeCount )
                {
                    for( this._i = this.currentAttributeCount; this._i < shaderData.attributeCount; ++this._i )
                        device.gl.enableVertexAttribArray(this._i);
                }
                else
                {
                    for( this._i = shaderData.attributeCount; this._i < this.currentAttributeCount; ++this._i )
                        device.gl.disableVertexAttribArray(this._i);
                }

                this.currentAttributeCount = shaderData.attributeCount;
            }
            
            // save the current binding
            this.currentShaderData = shaderData;
            
            // Have OpenGL bind this shader now
            device.gl.useProgram( shaderData.programId );
        }
    }
    
    // 
    //  DESC: Unbind the shader program attribute variables
    //
    unbind()
    {
        for( this._i = 0; this._i < this.currentAttributeCount; ++this._i )
            device.gl.disableVertexAttribArray(this._i);
    
        this.currentShaderData = null;
        this.currentAttributeCount = 0;
        device.gl.useProgram( null );
    }
    
    // 
    //  DESC: Get the shader data
    //
    getShaderData( shaderId )
    {
        this._shader = this.shaderMap.get( shaderId );
        if( this._shader !== undefined )
            return this._shader;
 
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
        for( this._key of this.shaderMap.keys() )
            this.setShaderValue4fv( this._key, locationId, data );
    }
}

export var shaderManager = new ShaderManager;
