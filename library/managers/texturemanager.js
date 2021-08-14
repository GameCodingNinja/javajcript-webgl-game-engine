
//
//  FILE NAME: texturemanager.js
//  DESC:      texture class singleton
//

"use strict";
import { Texture } from '../common/texture';
import { device } from '../system/device';

class TextureManager
{
    constructor()
    {
        // Map containing a group of texture handles
        this.textureForMapMap = new Map;

        // Current texture
        this.currentTexture = null;
    }

    //
    //  DESC: Load the image file as a texture
    //
    load( group, filePath, image )
    {
        let gl = device.gl;

        if( !image.complete )
            throw new Error( `Image file not completely loaded! (${group}, ${filePath}).` );

        // Create the group map if it doesn't already exist
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.textureForMapMap.set( group, groupMap );
        }

        let texture = groupMap.get( filePath );
        if( texture === undefined || texture === -1 )
        {
            texture = new Texture;
            texture.id = gl.createTexture();
            texture.size.w = image.width;
            texture.size.h = image.height;

            gl.bindTexture( gl.TEXTURE_2D, texture.id );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
            gl.bindTexture( gl.TEXTURE_2D, null );

            groupMap.set( filePath, texture );
        }
        
        return texture;
    }

    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, filePath )
    {
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.textureForMapMap.set( group, groupMap );
        }
        
        let texture = groupMap.get( filePath );
        if( texture === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            groupMap.set( filePath, -1 );

            return true;
        }

        return false;
    }

    //
    //  DESC: Delete the group of textures
    //
    deleteGroup( group )
    {
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap !== undefined )
        {
            let gl = device.gl;

            for( let texture of groupMap.values() )
                gl.deleteTexture( texture.id );
            
            this.textureForMapMap.delete( group );
        }
    }

    //
    //  DESC: Get the 2D texture class
    //
    get( group, filePath )
    {
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap === undefined )
            throw new Error( `Texture group does not exists! (${group}, ${filePath}).` );

        let texture = groupMap.get( filePath );
        if( texture === undefined || texture === -1 )
            throw new Error( `Texture does not exists! (${group}, ${filePath}).` );
        
        return texture;
    }

    //
    //  DESC: Create OpenGL objects from data
    //
    bind( textureId )
    {
        if( this.currentTexture != textureId )
        {
            let gl = device.gl;

            // save the current binding
            this.currentTexture = textureId;

            // Have OpenGL bind this texture now
            gl.bindTexture(gl.TEXTURE_2D, textureId);
        }
    }

    //
    //  DESC: Unbind the texture and reset the flag
    //
    unbind()
    {
        let gl = device.gl;
        
        this.currentTexture = null;
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}

export var textureManager = new TextureManager;
