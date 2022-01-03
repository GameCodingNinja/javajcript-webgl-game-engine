
// 
//  FILE NAME: ojectvisualdata2d.js
//  DESC:      Class containing the 2D object's visual data
//

"use strict";

import { iObjectVisualData } from './iobjectvisualdata';
import { Rect } from '../common/rect';
import { Color } from '../common/color';
import { Size } from '../common/size';
import { ScaledFrame } from '../common/scaledframe';
import { SpriteSheet } from '../sprite/spritesheet';
import { textureManager } from '../managers/texturemanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { spriteSheetManager } from '../managers/spritesheetmanager';
import { assetHolder } from '../utilities/assetholder';
import * as defs from '../common/defs';
import * as parseHelper from '../utilities/xmlparsehelper';

export class ObjectVisualData2D extends iObjectVisualData
{
    constructor()
    {
        super();
        
        // texture id
        this.textureAry = [];

        // VBO
        this.vbo = null;

        // IBO
        this.ibo = null;

        // VBO/IBO generation type
        this.genType = defs.EGT_NULL;

        // Name of the shader
        this.shaderID = null;

        // Initial color of the object
        this.color = new Color;

        // texture file path
        this.textureFilePath = '';
        
        // Texture Sequence count
        this.textureSequenceCount = 0;

        // mesh file path
        this.meshFilePath = null;
        
        // Sprite sheet file path
        this.spriteSheetFilePath = null;

        // ibo count
        this.iboCount = 0;

        // The vertex scale of the object
        this.vertexScale = new Size;

        // Scaled frame
        this.scaledFrame = null;

        // Sprite Sheet
        this.spriteSheet = null;

        // String of glyph ids
        this.glyphIDs = null;

        // Default scale
        this.defaultUniformScale = 1;
        
        // Mirror value
        this.mirror = defs.EM_NULL;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.genType = obj.genType;
        this.shaderID = obj.shaderID;
        this.textureFilePath = obj.textureFilePath;
        this.textureSequenceCount = obj.textureSequenceCount;
        this.meshFilePath = obj.meshFilePath;
        this.spriteSheetFilePath = obj.spriteSheetFilePath;
        this.defaultUniformScale = obj.defaultUniformScale;
        this.mirror = obj.mirror;
        this.color.copy( obj.color );
        
        if( obj.glyphIDs )
        {
            if( this.glyphIDs === null )
                this.glyphIDs = [];
            
            for( let i = 0; i < obj.glyphIDs.length; ++i )
                this.glyphIDs[i] = obj.glyphIDs[i];
        }
        
        if( obj.scaledFrame )
        {
            this.scaledFrame = new ScaledFrame;
            this.scaledFrame.copy( obj.scaledFrame );
        }
        
        if( obj.spriteSheet )
        {
            this.spriteSheet = new SpriteSheet;
            this.spriteSheet.copy( obj.spriteSheet );
        }
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( node )
    {
        let visualNode = node.getElementsByTagName( 'visual' );
        if( visualNode.length )
        {
            let attr = visualNode[0].getAttribute( 'defaultUniformScale' );
            if( attr !== null )
                this.defaultUniformScale = Number(attr);
            
            // See if we have a texture to load
            let textureNode = visualNode[0].getElementsByTagName( 'texture' );
            if( textureNode.length )
            {
                let attr = textureNode[0].getAttribute( 'file' );
                // Check for null because might want to replace with an empty string
                if( attr !== null )
                {
                    this.textureFilePath = attr;
                    this.textureSequenceCount = 1;
                }
                
                attr = textureNode[0].getAttribute( 'count' );
                // Check for null because might want to replace with an empty string
                if( attr !== null )
                    this.textureSequenceCount = Number(attr);
            }

            // Get the mesh node
            let meshNode = visualNode[0].getElementsByTagName( 'mesh' );
            if( meshNode.length )
            {
                let genTypeStr = meshNode[0].getAttribute('genType');
                if( genTypeStr )
                {
                    if( genTypeStr === 'null' )
                        this.genType = defs.EGT_NULL;

                    else if( genTypeStr === 'quad' )
                        this.genType = defs.EGT_QUAD;

                    else if( genTypeStr === 'sprite_sheet' )
                        this.genType = defs.EGT_SPRITE_SHEET;

                    else if( genTypeStr === 'scaled_frame' )
                        this.genType = defs.EGT_SCALED_FRAME;

                    else if( genTypeStr === 'mesh_file' )
                        this.genType = defs.EGT_MESH_FILE;

                    else if( genTypeStr === 'font' )
                        this.genType = defs.EGT_FONT;
                }
                
                let mirrorStr = meshNode[0].getAttribute('mirror');
                if( mirrorStr )
                {
                    if( mirrorStr === 'horizontal' )
                        this.mirror = defs.EM_HORIZONTAL;

                    else if( mirrorStr === 'vertical' )
                        this.mirror = defs.EM_VERTICAL;

                    else if( mirrorStr === 'horizontal_vertical' )
                        this.mirror = defs.EM_HORIZONTAL_VERTICAL;
                }
                
                let spriteSheetNode = meshNode[0].getElementsByTagName( 'spriteSheet' );
                if( spriteSheetNode.length )
                {
                    let defaultIndex = 0;
                    let glyphCount = 0;
                    let columns = 0;
                    
                    let attr = spriteSheetNode[0].getAttribute( 'defIndex' );
                    if( attr !== null )
                        defaultIndex = Number(attr);

                    // Make sure all elements are defined for manually building the sprite sheet data
                    attr = spriteSheetNode[0].getAttribute( 'glyphCount' );
                    if( attr !== null )
                    {
                        glyphCount = Number(attr);

                        attr = spriteSheetNode[0].getAttribute( 'columns' );
                        if( attr !== null )
                            columns = Number(attr);
                    }
                    
                    // Get the sprite sheet glyph file
                    attr = spriteSheetNode[0].getAttribute( 'file' );
                    // Check for null because might want to replace with an empty string
                    if( attr !== null )
                        this.spriteSheetFilePath = attr;

                    // See if any glyph Id's have been defined
                    let glyphNode = spriteSheetNode[0].getElementsByTagName( 'glyph' );
                    if( glyphNode.length )
                    {
                        this.glyphIDs = [];
                        for( let i = 0; i < glyphNode.length; ++i )
                            this.glyphIDs.push( glyphNode[i].getAttribute( 'id' ) );
                    }
                    
                    // make sure this is a valid sprite sheet before allocating
                    if( (this.spriteSheet === null) && (this.glyphIDs || defaultIndex || glyphCount || columns) )
                        this.spriteSheet = new SpriteSheet( defaultIndex, glyphCount, columns );
                }

                let scaledFrameNode = meshNode[0].getElementsByTagName( 'scaledFrame' );
                if( scaledFrameNode.length )
                {
                    if( this.scaledFrame === null )
                        this.scaledFrame = new ScaledFrame;
                    
                    this.scaledFrame.frame.w = Number(scaledFrameNode[0].getAttribute( 'thicknessWidth' ));
                    this.scaledFrame.frame.h = Number(scaledFrameNode[0].getAttribute( 'thicknessHeight' ));

                    let centerQuadAttr = scaledFrameNode[0].getAttribute( 'centerQuad' );
                    if( centerQuadAttr )
                        this.scaledFrame.centerQuad = (centerQuadAttr === 'true');

                    let frameBottomAttr = scaledFrameNode[0].getAttribute('frameBottom');
                    if( frameBottomAttr )
                        this.scaledFrame.bottomFrame = (frameBottomAttr === 'true');
                }

                let fileNode = meshNode[0].getElementsByTagName( 'file' );
                if( fileNode.length )
                    this.meshFilePath = fileNode[0].getAttribute( 'name' );
            }

            // The shader node determines which shader to use
            let shaderNode = visualNode[0].getElementsByTagName( 'shader' );
            if( shaderNode.length )
            {
                this.shaderID = shaderNode[0].getAttribute( 'id' );
            }

            // Load the color
            this.color = parseHelper.loadColor( visualNode[0], this.color );

            // Raise an exception if there's a genType but no shader
            if( (this.genType != defs.EGT_NULL) && (this.shaderID === null) )
                throw new Error( 'Shader effect or techique not set!' );
        }
    }
    
    // 
    //  DESC: Create the objects from data
    //
    createFromData( group, size )
    {
        // Set the texture ID if one exists
        if( this.textureFilePath.length )
        {
            // Get the texture(s) for this object
            if( this.textureSequenceCount )
            {
                for( let i = 0; i < this.textureSequenceCount; ++i )
                {
                    let NUM = i; // NUM is defined in the file path and is consumed by the "eval' statement"
                    let filePath = eval('`' + this.textureFilePath + '`');
                    this.textureAry.push( textureManager.get( group, filePath ) );
                }
            }
            else
                this.textureAry.push( textureManager.get( group, this.textureFilePath ) );
            
            // If the passed in size is empty, set it to the texture size
            if( size.isEmpty() )
                size.copy( this.textureAry[0].size );
        }
        
        if( this.genType === defs.EGT_QUAD )
        {
            this.generateQuad( group );
            
            this.vertexScale.w = size.w * this.defaultUniformScale;
            this.vertexScale.h = size.h * this.defaultUniformScale;
            size.w = Math.trunc(this.vertexScale.w);
            size.h = Math.trunc(this.vertexScale.h);
        }
        else if( this.genType === defs.EGT_SPRITE_SHEET )
        {
            // Build the simple (grid) sprite sheet from XML data
            if( this.spriteSheetFilePath === null )
                this.spriteSheet.build( size );

            // Load complex sprite sheet data from the manager. It's assumed
            // that string Id's are for complex sprite sheets that are shared
            // among many sprites
            else
            {
                // This will return the sprite sheet if it's been loaded
                let spriteSheet = spriteSheetManager.get( group, this.spriteSheetFilePath );

                // Copy the needed glyph data from the manager
                spriteSheet.copyTo( this.spriteSheet, this.glyphIDs );
            }

            // Generate a quad
            this.generateQuad( group );

            // For this generation type, the glyph size is the default scale
            let glyphSize = this.spriteSheet.getGlyph().size;

            this.vertexScale.w = glyphSize.w * this.defaultUniformScale;
            this.vertexScale.h = glyphSize.h * this.defaultUniformScale;
            size.w = Math.trunc(this.vertexScale.w);
            size.h = Math.trunc(this.vertexScale.h);
        }
        else if( this.genType === defs.EGT_SCALED_FRAME )
        {
            if( this.glyphIDs !== null )
            {
                // This will return the sprite sheet
                let spriteSheet = spriteSheetManager.get( group, this.spriteSheetFilePath );

                // Get the glyph to make the frame with
                let glyph = spriteSheet.findGlyph( this.glyphIDs[0] );
                
                // Create the scaled frame using glyph info
                if( this.meshFilePath )
                    this.generateScaledFrameMeshFile( group, this.textureAry[0].size, glyph.size, size, glyph.uv );
                else
                    this.generateScaledFrame( group, this.textureAry[0].size, glyph.size, size, glyph.uv );
            }
            else if( this.meshFilePath )
                this.generateScaledFrameMeshFile( group, this.textureAry[0].size, this.textureAry[0].size, size, new Rect );

            else
                // Generate a scaled frame
                this.generateScaledFrame( group, this.textureAry[0].size, this.textureAry[0].size, size, new Rect );
        }
    }
    
    // 
    //  DESC: Generate a quad
    //
    generateQuad( group )
    {
        // VBO data
        // The order of the verts is counter clockwise
        // 1----0
        // |   /|
        // |  / |
        // | /  |
        // 2----3
        let vertAry =
        [
             0.5,  0.5, 0.0,   1.0, 0.0,
            -0.5,  0.5, 0.0,   0.0, 0.0,
            -0.5, -0.5, 0.0,   0.0, 1.0,
             0.5, -0.5, 0.0,   1.0, 1.0
        ];
        
        let horzStr = '';
        let vertStr = '';
        
        if( (this.mirror === defs.EM_HORIZONTAL) || (this.mirror === defs.EM_HORIZONTAL_VERTICAL) )
        {
            horzStr = '_horz';
            
            vertAry[5 * 0 + 3] = 0.0;
            vertAry[5 * 1 + 3] = 1.0;
            vertAry[5 * 2 + 3] = 1.0;
            vertAry[5 * 3 + 3] = 0.0;
        }
        
        if( (this.mirror === defs.EM_VERTICAL) || (this.mirror === defs.EM_HORIZONTAL_VERTICAL) )
        {
            vertStr = '_vert';
            
            vertAry[5 * 0 + 4] = 1.0;
            vertAry[5 * 1 + 4] = 1.0;
            vertAry[5 * 2 + 4] = 0.0;
            vertAry[5 * 3 + 4] = 0.0;
        }
        
        this.vbo = vertexBufferManager.createVBO( group, 'guad_0011' + horzStr + vertStr, vertAry );
        this.ibo = vertexBufferManager.createIBO( group, 'quad_0123', [0, 1, 2, 3], true );
        
        this.iboCount = 4;
    }
    
    // 
    //  DESC: Generate a scaled frame
    //
    generateScaledFrame( group, textureSize, glyphSize, frameSize, textureOffset )
    {
        let frame = this.scaledFrame.frame;
        let tSize = textureSize;
        let gSize = glyphSize;
        let vboName = 'scaled_frame_' + frameSize.w + '_' + frameSize.h + '_' + frame.w + '_' + frame.h + '_' + tSize.w + '_' + tSize.h + '_' + gSize.w + '_' + gSize.h;

        this.vbo = vertexBufferManager.createScaledFrame(
            group, vboName, this.scaledFrame, textureSize, glyphSize, frameSize, textureOffset );

        let iboAry = [
            0,1,2,     0,3,1,
            2,4,5,     2,1,4,
            1,6,4,     1,7,6,
            7,8,6,     7,9,8,
            10,9,7,    10,11,9,
            12,11,10,  12,13,11,
            14,10,3,   14,12,10,
            15,3,0,    15,14,3,
            3,7,1,     3,10,7 ];

        // Create the reusable IBO buffer
        this.ibo = vertexBufferManager.createIBO( group, 'scaled_frame', iboAry, true );

        // Set the ibo count depending on the number of quads being rendered
        // If the center quad is not used, just adjust the ibo count because
        // the center quad is just reused verts anyways and is that last 6 in the IBO
        // If the frame bottom is not being use, just subtract.
        // Center quad and no frame bottom can't co-exist.
        this.iboCount = 6 * 8;
        if( this.scaledFrame.centerQuad )
            this.iboCount += 6;

        else if( !this.scaledFrame.bottomFrame )
            this.iboCount -= 6 * 3;
    }

    // 
    //  DESC: Generate a scaled frame with a mesh file
    //
    generateScaledFrameMeshFile( group, textureSize, glyphSize, frameSize, textureOffset )
    {
        // Construct the name used for vbo and ibo
        let name = 'scaled_frame_mesh_' + this.meshFilePath;
        
        let iboAry = [
                0,1,2,     0,3,1,
                2,4,5,     2,1,4,
                1,6,4,     1,7,6,
                7,8,6,     7,9,8,
                10,9,7,    10,11,9,
                12,11,10,  12,13,11,
                14,10,3,   14,12,10,
                15,3,0,    15,14,3 ];

        if( this.scaledFrame.centerQuad )
            Array.prototype.push.apply( iboAry, [ 3,7,1, 3,10,7 ] );

        // See if it already exists before loading the mesh file
        this.vbo = vertexBufferManager.isVBO( group, name );
        if( this.vbo === null )
        {
            // Load a mesh from XML file
            let meshFileVertAry = [];
            this.loadMeshFromXML( group, textureSize, frameSize, textureOffset, 16, meshFileVertAry, iboAry );

            // create the vbo
            this.vbo = vertexBufferManager.createScaledFrame(
                group, name, this.scaledFrame, textureSize, glyphSize, frameSize, textureOffset, meshFileVertAry );
        }
        
        // Create the reusable IBO buffer
        this.ibo = vertexBufferManager.createIBO( group, name, iboAry, true );
        this.iboCount = iboAry.length;
    }
    
    // 
    //  DESC: Load a mesh from XML file
    //
    loadMeshFromXML( group, textureSize, frameSize, textureOffset, iboOffset, vertAry, iboAry )
    {
        // Check if the width or height is odd. If so, we offset 
        // by 0.5 for proper orthographic rendering
        let additionalOffsetX = 0;
        if( Math.trunc(frameSize.w) % 2 != 0 )
            additionalOffsetX = 0.5;

        let additionalOffsetY = 0;
        if( Math.trunc(frameSize.h) % 2 != 0 )
            additionalOffsetY = 0.5;

        // This converts the data to a center aligned vertex buffer
        let centerAlignSize = new Size(-(frameSize.w / 2), (frameSize.h / 2));

        // Open and parse the XML file:
        let node = assetHolder.get( group, this.meshFilePath );
        let vboNode = node.getElementsByTagName( 'vbo' );
        
        if( vboNode.length )
        {
            let vertNode = vboNode[0].getElementsByTagName( 'vert' );

            for( let i = 0; i < vertNode.length; ++i )
            {
                // Load the 2D vert
                let vert = parseHelper.loadVertex2d( vertNode[i] );
                
                // This converts the data to a center aligned vertex buffer
                vertAry.push( centerAlignSize.w + vert.x + additionalOffsetX );
                vertAry.push( centerAlignSize.h - vert.y + additionalOffsetY );
                vertAry.push( vert.z );
                vertAry.push( textureOffset.x1 + (vert.u / textureSize.w) );
                vertAry.push( textureOffset.y1 + (vert.v / textureSize.h) );
            }
        }

        let iboNode = node.getElementsByTagName( 'ibo' );
        if( iboNode.length )
        {
            let iNode = iboNode[0].getElementsByTagName( 'i' );
            
            for( let i = 0; i < iNode.length; ++i )
                iboAry.push( iboOffset + Number(iNode[i].childNodes[0].nodeValue) );
        }
    }
    
    // 
    //  DESC: Is this genType active
    //
    isActive()
    {
        return (this.genType !== defs.EGT_NULL);
    }
    
    // 
    //  DESC: Get the frame count
    //
    getFrameCount()
    {
        if( this.genType === defs.EGT_SPRITE_SHEET )
            return this.spriteSheet.getCount();

        return this.textureAry.length;
    }
    
    // 
    //  DESC: Get the texture
    //
    getTexture( index = 0 )
    {
        if( this.textureAry.length > index )
            return this.textureAry[index];

        return null;
    }
    
    // 
    //  DESC: Get the texture file paths
    //
    getTextureFilePathAry()
    {
        let filePathAry = [];
        
        // Get the texture(s) for this object
        if( this.textureSequenceCount )
        {
            for( let i = 0; i < this.textureSequenceCount; ++i )
            {
                let NUM = i; // NUM is defined in the file path and is consumed by the "eval' statement"
                filePathAry.push( eval('`' + this.textureFilePath + '`') );
            }
        }
        else if( this.textureFilePath.length )
            filePathAry.push( this.textureFilePath );
        
        return filePathAry;
    }
}
