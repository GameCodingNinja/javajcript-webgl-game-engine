
//
//  FILE NAME: objactdatamanager.js
//  DESC:      Singlton that holds a map of all 2D/3D object data used for later loading
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { textureManager } from '../managers/texturemanager';
import { meshManager } from '../managers/meshmanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { spriteSheetManager } from '../managers/spritesheetmanager';
import { assetHolder } from '../utilities/assetholder';
import { ObjectData2D } from './objectdata2d';
import { ObjectData3D } from './objectdata3d';
import * as genFunc from '../utilities/genfunc';

class ObjectDataManager extends ManagerBase
{
    constructor()
    {
        super();

        this.objectDataMapMap = new Map;
    }

    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( group )
    {
        if( group instanceof Array )
        {
            return super.loadGroupAry( 'Object data list', this.objectDataMapMap, group )
                .then(() => this.loadAssets( group ))
                .then(() => this.createFromData( group ));
        }

        return super.loadGroupAry( 'Object data list', this.objectDataMapMap, [group] )
                .then(() => this.loadAssets( [group] ))
                .then(() => this.createFromData( [group] ));
    }

    //
    //  DESC: Load all object information from an xml node
    //
    loadFromNode( group, node )
    {
        const LOAD_2D = 0;
        const LOAD_3D = 1;

        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );

        // Determin the laod type
        let loadType = LOAD_2D;
        if( node.nodeName === 'objectDataList3D' )
            loadType = LOAD_3D;

        let defaultData;
        if( loadType === LOAD_2D )
            defaultData = new ObjectData2D;
        else
            defaultData = new ObjectData3D;

        // Load the default data
        defaultData.loadObjData( node.getElementsByTagName('default')[0], '', '' );

        // Get the node to the list of objects
        let objNode = node.getElementsByTagName('object');

        for( let i = 0; i < objNode.length; ++i )
        {
            // Get the object's name
            let name = objNode[i].getAttribute( 'name' );
            
            // Check that this object doesn't already exist
            if( groupMap.get(name) === undefined )
            {
                let objData
                if( loadType === LOAD_2D )
                    objData = new ObjectData2D;
                else
                    objData = new ObjectData3D;
                
                objData.copy(defaultData);

                // Load in the object data
                objData.loadObjData( objNode[i], group, name );

                // Save it to the map map
                groupMap.set( name, objData );
            }
            else
            {
                throw new Error( `Group object already exists (${group}, ${name})!` );
            }
        }
    }

    //
    //  DESC: Load all the assets associated with these groups
    //
    loadAssets( groupAry )
    {
        let promiseAry = [];

        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];

            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                for( let objData of groupMap.values() )
                {
                    // Load 2D elements
                    if( objData.is2D() )
                    {
                        let filePathAry = objData.visualData.getTextureFilePathAry();
                        let textureFilter = objData.visualData.textureFilter;
                        let textureWrap = objData.visualData.textureWrap;

                        for( let i = 0; i < filePathAry.length; ++i )
                        {
                            let filePath = filePathAry[i];

                            if( filePath && textureManager.allowLoad( group, filePath ) )
                            {
                                // Load the texture file
                                promiseAry.push( 
                                    genFunc.downloadFile( 'img', filePath )
                                        .then(( image ) => textureManager.load( group, filePath, image, textureFilter, textureWrap ))
                                        .catch(( error ) => { console.error(error.stack); throw error; }));
                            }
                        }
                        
                        // Load the XML mesh
                        let meshFilePath = objData.visualData.meshFilePath;
                        if( meshFilePath && assetHolder.allowLoad( group, meshFilePath ) )
                        {
                            // Load the mesh file
                            promiseAry.push( 
                                genFunc.downloadFile( 'xml', meshFilePath )
                                    .then(( xmlNode ) => assetHolder.set( group, meshFilePath, xmlNode ))
                                    .catch(( error ) => { console.error(error.stack); throw error; }));
                        }

                        // Load the XML sprite sheet
                        let spriteSheetfilePath = objData.visualData.spriteSheetFilePath;
                        if( spriteSheetfilePath && spriteSheetManager.allowLoad( group, spriteSheetfilePath ) )
                        {
                            // Load the mesh file
                            promiseAry.push( 
                                genFunc.downloadFile( 'xml', spriteSheetfilePath )
                                    .then(( xmlNode ) => spriteSheetManager.load( group, spriteSheetfilePath, xmlNode ))
                                    .catch(( error ) => { console.error(error.stack); throw error; }));
                        }
                    }
                    // Load 3D elements
                    else
                    {
                        let filePath = objData.visualData.meshFilePath;

                        if( filePath && meshManager.allowLoad( group, filePath ) )
                        {
                            // Load the mesh file
                            promiseAry.push( 
                                genFunc.downloadFile( 'binary', filePath )
                                    .then(( binaryFile ) => this.loadMesh3D( group, filePath, objData, binaryFile ))
                                    .catch(( error ) => { console.error(error.stack); throw error; }));
                        }
                    }
                }
            }
            else
            {
                throw new Error( `Can't download asset because object group does not exist (${group})!` );
            }
        }

        return Promise.all( promiseAry );
    }

    //
    //  DESC: Load all the assets associated with this group
    //
    loadMesh3D( group, binaryFilePath, objData, binaryFile )
    {
        let promiseAry = [];

        objData.visualData.meshGrp =
            meshManager.load( group, binaryFilePath, binaryFile );

        let filePathAry = objData.visualData.meshGrp.uniqueTexturePathAry;

        // Load the mesh textures
        for( let i = 0; i < filePathAry.length; ++i )
        {
            let filePath = filePathAry[i].path;
            
            if( filePath && textureManager.allowLoad( group, filePath ) )
            {
                let textureFilter = objData.visualData.textureFilter;
                let textureWrap = objData.visualData.textureWrap;

                // Load the texture file
                promiseAry.push( 
                    genFunc.downloadFile( 'img', filePath )
                        .then(( image ) => textureManager.load( group, filePath, image, textureFilter, textureWrap ))
                        .catch(( error ) => { console.error(error.stack); throw error; }));
            }
        }

        return Promise.all( promiseAry );
    }

    //
    //  DESC: Create OpenGL objects from data
    //
    createFromData( groupAry )
    {
        for( this._grp = 0; this._grp < groupAry.length; ++this._grp )
        {
            this._group = groupAry[this._grp];
            
            // Get the group map
            this._groupMap = this.objectDataMapMap.get( this._group );
            if( this._groupMap !== undefined )
            {
                // Create OpenGL objects from data
                for( this._objData of this._groupMap.values() )
                    this._objData.createFromData( this._group );
            }
        }

        return 0;
    }
    
    //
    //  DESC: Free all of the meshes materials and data of a specific group
    //
    freeGroup( group )
    {
        this._groupAry = group;
        if( !(group instanceof Array) )
            this._groupAry = [group];

        for( this._grp = 0; this._grp < this._groupAry.length; ++this._grp )
        {
            this._group = this._groupAry[this._grp];
            
            // Make sure the group we are looking for exists
            if( !this.listTableMap.has( this._group ) )
                throw new Error( `Object data list group name can't be found (${this._group})!` );

            // Get the group map
            if( this.objectDataMapMap.has( this._group ) )
            {
                textureManager.deleteGroup( this._group );
                vertexBufferManager.deleteGroup( this._group );
                meshManager.deleteGroup( this._group );

                this.objectDataMapMap.delete( this._group );
            }
        }
    }
    
    //
    //  DESC: Get a specific object data
    //
    getData( group, name )
    {
        // Get the group map
        this._groupMap = this.objectDataMapMap.get( group );
        if( this._groupMap !== undefined )
        {
            this._objData = this._groupMap.get( name );
            if( this._objData )
                return this._objData;

            throw new Error( `Object data not found (${group}, ${name})!` );
        }

        throw new Error( `Object group not found (${group}, ${name})!` );
    }

    //
    // DESC:  Find the group an object name belongs to
    //
    findGroup( objectName )
    {
        for( this._groupKey of this.objectDataMapMap.keys() )
        {
            this._groupMap = this.objectDataMapMap.get(this._groupKey);

            if( this._groupMap.get( objectName ) !== undefined )
                return this._groupKey;
        }

        return undefined;
    }
}

export var objectDataManager = new ObjectDataManager;
