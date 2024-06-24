
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
    load( group, filePath, image, filter = device.gl.LINEAR, wrap = device.gl.CLAMP_TO_EDGE )
    {
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
            texture.id = device.gl.createTexture();
            texture.size.w = image.width;
            texture.size.h = image.height;

            device.gl.bindTexture( device.gl.TEXTURE_2D, texture.id );
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_WRAP_S, wrap );
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_WRAP_T, wrap );
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_MIN_FILTER, filter);
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_MAG_FILTER, filter );
            device.gl.texImage2D( device.gl.TEXTURE_2D, 0, device.gl.RGBA, device.gl.RGBA, device.gl.UNSIGNED_BYTE, image );
            device.gl.bindTexture( device.gl.TEXTURE_2D, null );

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
        let groupAry = group;
        if( !(group instanceof Array) )
            groupAry = [group];

        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            let groupMap = this.textureForMapMap.get( group );
            if( groupMap !== undefined )
            {
                for( let texture of groupMap.values() )
                    device.gl.deleteTexture( texture.id );
                
                this.textureForMapMap.delete( group );
            }
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
            // save the current binding
            this.currentTexture = textureId;

            // Have OpenGL bind this texture now
            device.gl.bindTexture(device.gl.TEXTURE_2D, textureId);
        }
    }

    //
    //  DESC: Unbind the texture and reset the flag
    //
    unbind()
    {
        this.currentTexture = null;
        device.gl.bindTexture(device.gl.TEXTURE_2D, null);
    }
}

export var textureManager = new TextureManager;
