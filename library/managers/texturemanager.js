
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
        this._groupMap = this.textureForMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.textureForMapMap.set( group, this._groupMap );
        }

        this._texture = this._groupMap.get( filePath );
        if( this._texture === undefined || this._texture === -1 )
        {
            this._texture = new Texture;
            this._texture.id = device.gl.createTexture();
            this._texture.size.w = image.width;
            this._texture.size.h = image.height;

            device.gl.bindTexture( device.gl.TEXTURE_2D, this._texture.id );
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_WRAP_S, wrap );
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_WRAP_T, wrap );
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_MIN_FILTER, filter);
            device.gl.texParameteri( device.gl.TEXTURE_2D, device.gl.TEXTURE_MAG_FILTER, filter );
            device.gl.texImage2D( device.gl.TEXTURE_2D, 0, device.gl.RGBA, device.gl.RGBA, device.gl.UNSIGNED_BYTE, image );
            device.gl.bindTexture( device.gl.TEXTURE_2D, null );

            this._groupMap.set( filePath, this._texture );
        }
        
        return this._texture;
    }

    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, filePath )
    {
        this._groupMap = this.textureForMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.textureForMapMap.set( group, this._groupMap );
        }
        
        this._texture = this._groupMap.get( filePath );
        if( this._texture === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            this._groupMap.set( filePath, -1 );

            return true;
        }

        return false;
    }

    //
    //  DESC: Delete the group of textures
    //
    deleteGroup( group )
    {
        this._groupAry = group;
        if( !(group instanceof Array) )
            this._groupAry = [group];

        for( this._grp = 0; this._grp < this._groupAry.length; ++this._grp )
        {
            this._group = this._groupAry[this._grp];
            this._groupMap = this.textureForMapMap.get( this._group );
            if( this._groupMap !== undefined )
            {
                for( this._each of this._groupMap.values() )
                    device.gl.deleteTexture( this._each.id );
                
                this.textureForMapMap.delete( this._group );
            }
        }
    }

    //
    //  DESC: Get the 2D texture class
    //
    get( group, filePath )
    {
        this._groupMap = this.textureForMapMap.get( group );
        if( this._groupMap === undefined )
            throw new Error( `Texture group does not exists! (${group}, ${filePath}).` );

        this._texture = this._groupMap.get( filePath );
        if( this._texture === undefined || this._texture === -1 )
            throw new Error( `Texture does not exists! (${group}, ${filePath}).` );
        
        return this._texture;
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
