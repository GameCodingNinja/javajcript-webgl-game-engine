
//
//  FILE NAME: vertexbuffermanager.js
//  DESC:      vertex buffer manager class singleton
//

"use strict";

import { device } from '../system/device';
import { Point } from '../common/point';
import { Size } from '../common/size';
import { Quad2d } from '../common/quad2d';

class VertexBufferManager
{
    constructor()
    {
        // Map containing a group of VBO handles
        this.vertexBufMapMap = new Map;

        // Map containing a group of IBO handles
        this.indexBufMapMap = new Map;

        // Current vbo
        this.currentVBO = null;

        // Current ibo
        this.currentIBO = null;

        // Current dynamic font IBO indices size
        this.currentMaxFontIndices = 0;
    }

    //
    //  DESC: Load all the textures associated with this group
    //
    createVBO( group, name, vertAry )
    {
        let gl = device.gl;

        // Create the group map if it doesn't already exist
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.vertexBufMapMap.set( group, groupMap );
        }

        // See if this vertex buffer ID has already been created
        let vboID = groupMap.get( name );
        if( vboID === undefined )
        {
            vboID = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, vboID );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertAry), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ARRAY_BUFFER, null );

            groupMap.set( name, vboID );
        }

        return vboID;
    }

    //
    //  DESC: Load all the textures associated with this group
    //
    createIBO( group, name, indexAry, intAs8bit )
    {
        let gl = device.gl;

        // Create the group map if it doesn't already exist
        let groupMap = this.indexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.indexBufMapMap.set( group, groupMap );
        }

        // See if this vertex buffer ID has already been created
        let iboID = groupMap.get( name );
        if( iboID === undefined )
        {
            iboID = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboID);

            if( intAs8bit )
                gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexAry), gl.STATIC_DRAW );
            else
                gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexAry), gl.STATIC_DRAW );

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );

            groupMap.set( name, iboID );
        }

        return iboID;
    }
    
    //
    //  DESC: Create a dynamic font IBO buffer
    //
    createDynamicFontIBO( group, name, indexAry, maxIndicies )
    {
        let gl = device.gl;

        // Create the group map if it doesn't already exist
        let groupMap = this.indexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.indexBufMapMap.set( group, groupMap );
        }

        // If it's not found, create the intex buffer and add it to the list
        let iboID = groupMap.get( name );
        if( iboID === undefined )
        {
            iboID = gl.createBuffer();

            groupMap.set( name, iboID );
        }    

        // If the new indices are greater then the current, init the IBO with the newest
        if( maxIndicies > this.currentMaxFontIndices )
        {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboID);
            gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexAry), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );

            // Save the number of indices for later to compare and expand this size of this IBO
            this.currentMaxFontIndices = maxIndicies;
        }

        return iboID;
    }

    //
    //  DESC: Create a scaled frame
    //
    createScaledFrame( group, name, scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset, meshFileVertAry = null )
    {
        let gl = device.gl;

        // Create the group map if it doesn't already exist
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.vertexBufMapMap.set( group, groupMap );
        }
        
        // See if this vertex buffer ID has already been created
        let vboID = groupMap.get( name );
        if( vboID === undefined )
        {
            let vertAry = [];
            
            // Generate the scaled frame
            this.generateScaledFrame( vertAry, scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset );
            
            if( meshFileVertAry !== null )
                Array.prototype.push.apply( vertAry, meshFileVertAry );
            
            vboID = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, vboID );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertAry), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ARRAY_BUFFER, null );

            groupMap.set( name, vboID );
        }

        return vboID;
    }
    
    //
    //  DESC: Create a scaled frame
    //
    generateScaledFrame( vertAry, scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset )
    {
        // Offsets to center the mesh
        let center = new Point(frameSize.w / 2, frameSize.h / 2);
        let frameLgth = new Size( frameSize.w - (scaledFrame.frame.w * 2.0), frameSize.h - (scaledFrame.frame.h * 2.0) );
        let uvLgth = new Size( glyphSize.w - (scaledFrame.frame.w * 2.0), glyphSize.h - (scaledFrame.frame.h * 2.0) );

        let quadBuf = [new Quad2d, new Quad2d, new Quad2d, new Quad2d, new Quad2d, new Quad2d, new Quad2d, new Quad2d];

        // Left frame
        this.createQuad( 
            new Point(-center.x, center.y-scaledFrame.frame.h),
            new Size(scaledFrame.frame.w, -frameLgth.h),
            new Size(0, scaledFrame.frame.h),
            new Size(scaledFrame.frame.w, uvLgth.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[0] );

        // top left
        this.createQuad(
            new Point(-center.x, center.y),
            new Size(scaledFrame.frame.w, -scaledFrame.frame.h),
            new Size(0, 0),
            new Size(scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[1] );

        // top
        this.createQuad(
            new Point(-(center.x-scaledFrame.frame.w), center.y),
            new Size(frameLgth.w, -scaledFrame.frame.h),
            new Size(scaledFrame.frame.w, 0),
            new Size(uvLgth.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[2] );

        // top right
        this.createQuad(
            new Point(center.x-scaledFrame.frame.w, center.y),
            new Size(scaledFrame.frame.w, -scaledFrame.frame.h),
            new Size(scaledFrame.frame.w + uvLgth.w, 0),
            new Size(scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[3] );

        // right frame
        this.createQuad(
            new Point(center.x-scaledFrame.frame.w, center.y-scaledFrame.frame.h),
            new Size(scaledFrame.frame.w, -frameLgth.h),
            new Size(scaledFrame.frame.w + uvLgth.w, scaledFrame.frame.h),
            new Size(scaledFrame.frame.w, uvLgth.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[4] );

        // bottom right
        this.createQuad(
            new Point(center.x-scaledFrame.frame.w, -(center.y-scaledFrame.frame.h)),
            new Size(scaledFrame.frame.w, -scaledFrame.frame.h),
            new Size(scaledFrame.frame.w + uvLgth.w, scaledFrame.frame.h + uvLgth.h),
            new Size(scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[5] );

        // bottom frame
        this.createQuad(
            new Point(-(center.x-scaledFrame.frame.w), -(center.y-scaledFrame.frame.h)),
            new Size(frameLgth.w, -scaledFrame.frame.h),
            new Size(scaledFrame.frame.w, scaledFrame.frame.h + uvLgth.h),
            new Size(uvLgth.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[6] );

        // bottom left
        this.createQuad(
            new Point(-center.x, -(center.y-scaledFrame.frame.h)),
            new Size(scaledFrame.frame.w, -scaledFrame.frame.h),
            new Size(0, scaledFrame.frame.h + uvLgth.h),
            new Size(scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[7] );

        // Piece together the needed unique verts
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[2].data );
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[1].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[1].vert[2].data );
        Array.prototype.push.apply( vertAry, quadBuf[2].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[2].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[3].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[3].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[4].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[4].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[5].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[5].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[6].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[7].vert[0].data );
    }
    
    //
    //  DESC: Create a quad
    //
    createQuad( vert, vSize, uv, uvSize, textureSize, frameSize, spriteSheetOffset, quadBuf )
    {
        // For OpenGL pixel perfect rendering is an even size graphic,
        // for DirectX, it's an odd size graphic.

        // Check if the width or height is odd. If so, we offset 
        // by 0.5 for proper orthographic rendering
        // speed enhancement - if( Math.trunc(frameSize.w) % 2 != 0 )
        let additionalOffsetX = 0;
        if( Math.trunc(frameSize.w) & 1 !== 0 )
            additionalOffsetX = 0.5;

        let additionalOffsetY = 0;
        if( Math.trunc(frameSize.h) & 2 !== 0 )
            additionalOffsetY = 0.5;

        // Calculate the third vertex of the first face
        quadBuf.vert[0].x = vert.x + additionalOffsetX;
        quadBuf.vert[0].y = vert.y + additionalOffsetY + vSize.h;
        quadBuf.vert[0].u = spriteSheetOffset.x1 + (uv.u / textureSize.w);
        quadBuf.vert[0].v = spriteSheetOffset.y1 + ((uv.v + uvSize.h) / textureSize.h);

        // Calculate the second vertex of the first face
        quadBuf.vert[1].x = vert.x + additionalOffsetX + vSize.w;
        quadBuf.vert[1].y = vert.y + additionalOffsetY;
        quadBuf.vert[1].u = spriteSheetOffset.x1 + ((uv.u + uvSize.w) / textureSize.w);
        quadBuf.vert[1].v = spriteSheetOffset.y1 + (uv.v / textureSize.h);

        // Calculate the first vertex of the first face
        quadBuf.vert[2].x = quadBuf.vert[0].x;
        quadBuf.vert[2].y = quadBuf.vert[1].y;
        quadBuf.vert[2].u = quadBuf.vert[0].u;
        quadBuf.vert[2].v = quadBuf.vert[1].v;

        // Calculate the second vertex of the second face
        quadBuf.vert[3].x = quadBuf.vert[1].x;
        quadBuf.vert[3].y = quadBuf.vert[0].y;
        quadBuf.vert[3].u = quadBuf.vert[1].u;
        quadBuf.vert[3].v = quadBuf.vert[0].v;
    }
    
    //
    //  DESC: Delete the group of buffers
    //
    deleteGroup( group )
    {
        let groupAry = group;
        if( !(group instanceof Array) )
            groupAry = [group];

        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            let gl = device.gl;

            let groupMap = this.vertexBufMapMap.get( group );
            if( groupMap !== undefined )
            {
                for( let vboID of groupMap.values() )
                    gl.deleteBuffer( vboID );
                
                this.vertexBufMapMap.delete( group );
            }
            
            groupMap = this.indexBufMapMap.get( group );
            if( groupMap !== undefined )
            {
                for( let iboID of groupMap.values() )
                    gl.deleteBuffer( iboID );
                
                this.indexBufMapMap.delete( group );
            }
        }
    }
    
    //
    //  DESC: See if a VBO already exists
    //
    isVBO( group, name )
    {
        // See if the group exists
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap === undefined )
            return null;

        // See if this vertex buffer ID has already been created
        let vboId = groupMap.get( name );
        if( vboId === undefined )
            return null;

        return vboId;
    }

    //
    //  DESC: Bind the buffers
    //
    bind( vbo, ibo )
    {
        let gl = device.gl;

        if( this.currentVBO != vbo )
        {
            // save the current binding
            this.currentVBO = vbo;

            // Have OpenGL bind this buffer now
            gl.bindBuffer( gl.ARRAY_BUFFER, vbo );
        }

        if( this.currentIBO != ibo )
        {
            // save the current binding
            this.currentIBO = ibo;

            // Have OpenGL bind this buffer now
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, ibo );
        }
    }
    
    //
    //  DESC: Bind the buffers
    //
    unbind()
    {
        let gl = device.gl;
        
        this.currentVBO = null;
        this.currentIBO = null;
        gl.bindBuffer( gl.ARRAY_BUFFER, null );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
    }
}

export var vertexBufferManager = new VertexBufferManager;
