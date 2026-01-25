
//
//  FILE NAME: meshmanager.js
//  DESC:      mesh manager class singleton
//

"use strict";

import { device } from '../system/device';
import * as meshFileHeader from '../common/meshbinaryfileheader';
import * as mesh3d from '../common/mesh3d';

class MeshManager
{
    constructor()
    {
        // Map containing a group array of vbo, ibo and texture id's
        this.meshBufMapMap = new Map;

        // Map for collision mesh
        //this.collisionMeshBufMapMap = new Map;
        
        // counter for indexing into binary data when loading
        this.counter = 0;
    }
    
    //
    //  DESC: Load the binary mesh data
    //  NOTE: To keep it simple, loading the textures is done seperately
    //
    load( group, filePath, binaryData )
    {
        // Create the group map if it doesn't already exist
        this._groupMap = this.meshBufMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.meshBufMapMap.set( group, this._groupMap );
        }
        
        this._meshGrp = this._groupMap.get( filePath );
        if( this._meshGrp === undefined || this._meshGrp === -1 )
        {
            this._meshGrp = new mesh3d.MeshGroup;
            this._groupMap.set( filePath, this._meshGrp );
            
            this.loadData( group, filePath, binaryData, this._meshGrp );
        }

        return this._meshGrp;
    }

    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, filePath )
    {
        this._groupMap = this.meshBufMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.meshBufMapMap.set( group, this._groupMap );
        }
        
        this._meshGrp = this._groupMap.get( filePath );
        if( this._meshGrp === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            this._groupMap.set( filePath, -1 );

            return true;
        }

        return false;
    }

    //
    //  DESC: Get the 2D texture class
    //
    get( group, filePath )
    {
        this._groupMap = this.meshBufMapMap.get( group );
        if( this._groupMap === undefined )
            throw new Error( `Mesh group does not exist! (${group}, ${filePath}).` );

        this._meshGrp = this._groupMap.get( filePath );
        if( this._meshGrp === undefined || this._meshGrp === -1 )
            throw new Error( `Mesh does not exist! (${group}, ${filePath}).` );

        return this._meshGrp;
    }
    
    //
    //  DESC: Load the binary mesh data
    //
    loadData( group, filePath, binaryData, meshGrp )
    {
        this.counter = 0;

        // Load the binary data into the data view for easy access to different data types
        let dataView = new DataView( binaryData );
        
        // Load the binary mesh file header
        let fileHeader = this.loadFileHeader( dataView, group, filePath );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, (fileHeader.text_count > 0), group, filePath );
        
        // Load the texture file paths
        this.loadTexturePaths( dataView, fileHeader, meshGrp );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, true, group, filePath );
        
        // Load the verts
        let vertAry = [];
        this.loadVerts( dataView, fileHeader, vertAry );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, true, group, filePath );
        
        // Load the normals
        let normAry = [];
        this.loadNormals( dataView, fileHeader, normAry );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, (fileHeader.uv_count > 0), group, filePath );
        
        // Load the uv's
        let uvAry = [];
        this.loadUVs( dataView, fileHeader, uvAry );
        
        // Build the meshes
        this.buildMeshes( dataView, group, filePath, fileHeader, meshGrp, vertAry, normAry, uvAry );
    }
    
    //
    //  DESC: Load the binary mesh file header
    //
    loadFileHeader( dataView, group, filePath )
    {
        let fileHeader = new meshFileHeader.MeshBinaryFileHeader;
        
        fileHeader.file_header      = dataView.getUint32( this.counter, true ); this.counter += 4;
        fileHeader.vert_count       = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.uv_count         = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.vert_norm_count  = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.face_group_count = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.text_count       = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.joint_count      = dataView.getUint16( this.counter, true ); this.counter += 2;
        
        // Check to make sure we're loading in the right kind of file
        if( fileHeader.file_header !== meshFileHeader.MESH_FILE_HEADER )
            throw new Error( `File header mismatch! (${group}, ${filePath}).` );
        
        return fileHeader;
    }
    
    //
    //  DESC: Load the binary mesh file header
    //
    loadTexturePaths( dataView, fileHeader, meshGrp )
    {
        for( let i = 0; i < fileHeader.text_count; ++i )
        {
            let uniqueTextAry = new meshFileHeader.BinaryTexture;
            meshGrp.uniqueTexturePathAry.push( uniqueTextAry );

            uniqueTextAry.type = dataView.getInt8( this.counter, true ); this.counter += 1;

            for( let j = 0; j < meshFileHeader.TEXT_PATH_SIZE; ++j )
            {
                let charCode = dataView.getInt8( this.counter, true ); this.counter += 1;

                if( charCode )
                {
                    uniqueTextAry.path += String.fromCharCode(charCode);
                }
                else
                {
                    this.counter += meshFileHeader.TEXT_PATH_SIZE - j - 1;
                    break;
                }
            }
        }
    }
    
    //
    //  DESC: Load the verts
    //
    loadVerts( dataView, fileHeader, vertAry )
    {
        // Load the verts
        for( let i = 0; i < fileHeader.vert_count; ++i )
        {
            let data = [0,0,0];
            vertAry.push( data );
            
            for( let j = 0; j < 3; ++j )
            {
                data[j] = dataView.getFloat32( this.counter, true ); this.counter += 4;
            }
        }
    }
    
    //
    //  DESC: Load the normals
    //
    loadNormals( dataView, fileHeader, normAry )
    {
        for( let i = 0; i < fileHeader.vert_norm_count; ++i )
        {
            let data = [0,0,0];
            normAry.push( data );
            
            for( let j = 0; j < 3; ++j )
            {
                data[j] = dataView.getFloat32( this.counter, true ); this.counter += 4;
            }
        }
    }
    
    //
    //  DESC: Load the uv's
    //
    loadUVs( dataView, fileHeader, uvAry )
    {
        // Load the normals
        for( let i = 0; i < fileHeader.uv_count; ++i )
        {
            let data = [0,0];
            uvAry.push( data );
            
            for( let j = 0; j < 2; ++j )
            {
                data[j] = dataView.getFloat32( this.counter, true ); this.counter += 4;
            }
        }
    }
    
    //
    //  DESC: Build the meshes
    //
    buildMeshes( dataView, group, filePath, fileHeader, meshGrp, vertAry, normAry, uvAry )
    {
        let gl = device.gl;
        let faceGroup = new meshFileHeader.BinaryFaceGroup;
        
        // Read in each face group
        for( let i = 0; i < fileHeader.face_group_count; ++i )
        {
            // Check to insure we are in the correct spot in the binary file
            this.tagCheck( dataView, true, group, filePath );
            
            // Allocate the mesh storage
            let mesh = new mesh3d.Mesh;
            meshGrp.meshAry.push( mesh );
            
            faceGroup.groupFaceCount = dataView.getUint16( this.counter, true ); this.counter += 2;
            faceGroup.vertexBufCount = dataView.getUint16( this.counter, true ); this.counter += 2;
            faceGroup.indexBufCount  = dataView.getUint16( this.counter, true ); this.counter += 2;
            faceGroup.textureCount   = dataView.getUint16( this.counter, true ); this.counter += 2;
            
            // Read in the indexes that are the textures
            for( let j = 0; j < faceGroup.textureCount; ++j )
            {
                mesh.textureIndexAry.push( dataView.getUint16( this.counter, true ) );
                this.counter += 2;
            }

            // Read in the indexes used to create the VBO
            let vertBufAry = [];
            for( let j = 0; j < faceGroup.vertexBufCount; ++j )
            {
                let binaryVertex = new meshFileHeader.BinaryVertex;
                vertBufAry.push( binaryVertex );
                
                binaryVertex.vert = dataView.getUint16( this.counter, true ); this.counter += 2;
                binaryVertex.norm = dataView.getUint16( this.counter, true ); this.counter += 2;
                
                if( fileHeader.uv_count )
                {
                    binaryVertex.uv = dataView.getUint16( this.counter, true ); this.counter += 2;
                }
            }

            // Read in the indexes that are the IBO
            let iboAry = [];
            for( let j = 0; j < faceGroup.indexBufCount; ++j )
            {
                iboAry.push( dataView.getUint16( this.counter, true ) );
                this.counter += 2;
            }
            
            // Create a temporary array for building the VBO
            let vboAry = [];

            // Build the VBO
            for( let j = 0; j < faceGroup.vertexBufCount; ++j )
            {
                Array.prototype.push.apply( vboAry, vertAry[ vertBufAry[j].vert ] );
                Array.prototype.push.apply( vboAry, normAry[ vertBufAry[j].norm ] );
                
                if( fileHeader.uv_count )
                    Array.prototype.push.apply( vboAry, uvAry[ vertBufAry[j].uv ] );
            }
            
            // Create the vbo
            mesh.vbo = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, mesh.vbo );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vboAry), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ARRAY_BUFFER, null );
            
            // Create the ibo
            mesh.ibo = gl.createBuffer();
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, mesh.ibo );
            gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iboAry), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
            
            // Save the number of indexes in the IBO buffer - Will need this for the render call
            mesh.iboCount = faceGroup.indexBufCount;
        }
    }
    
    //
    //  DESC: Load the binary mesh file header
    //
    tagCheck( dataView, allowCheck, group, filePath )
    {
        if( allowCheck )
        {
            this._tag = dataView.getUint32( this.counter, true ); this.counter += 4;
            if( this._tag !== meshFileHeader.TAG_CHECK )
                throw new Error( `Tag check mismatch! (${group}, ${filePath}).` );
        }
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
            this._groupMap = this.meshBufMapMap.get( this._group );
            if( this._groupMap !== undefined )
            {
                for( this._each of this._groupMap.values() )
                {
                    for( this._m = 0; this._m < this._each.meshAry.length; ++this._m )
                    {
                        device.gl.deleteBuffer( this._each.meshAry[this._m].vbo );
                        device.gl.deleteBuffer( this._each.meshAry[this._m].ibo );
                    }
                }

                this.meshBufMapMap.delete( this._group );
            }
        }
    }
}

export var meshManager = new MeshManager;
