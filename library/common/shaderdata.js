
// 
//  FILE NAME: shaderdata.js
//  DESC:      shader data class
//

"use strict";

export class ShaderData
{
    constructor( name )
    {
        this.name = name;

        // OpenGL ID's
        this.programId = 0;
        this.vertexId = 0;
        this.fragmentId = 0;
        this.attributeCount = 0;
        
        // location shader map
        this.locationMap = new Map;
    }
    
    //
    //  DESC: Get the shader location variable
    //
    getLocation( id )
    {
        this._loc = this.locationMap.get( id );
        if( this._loc !== undefined )
            return this._loc;
        else
            throw new Error( 'ERROR Shader variable location does not exist! (' + id + ').' );
    }
    
    //
    //  DESC: Check for the shader location variable
    //
    hasLocation( id )
    {
        return this.locationMap.has( id );
    }
}
