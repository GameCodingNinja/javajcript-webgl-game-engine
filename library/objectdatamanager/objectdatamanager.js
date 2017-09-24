
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
import * as defs from '../common/defs';

const LOAD_2D = 0;
const LOAD_3D = 1;

class ObjectDataManager extends ManagerBase
{
    constructor()
    {
        super();

        this.loadType;
        this.objectDataMapMap = new Map;
    }

    //
    //  DESC: Load all XML's associated with this group
    //
    loadXMLGroup2D( groupAry, finishCallback )
    {
        this.loadType = LOAD_2D;
        super.loadGroup( 'Object data list', this.objectDataMapMap, groupAry, finishCallback );
    }
    
    loadXMLGroup3D( groupAry, finishCallback )
    {
        this.loadType = LOAD_3D;
        super.loadGroup( 'Object data list', this.objectDataMapMap, groupAry, finishCallback );
    }

    //
    //  DESC: Load all object information from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );
        
        let defaultData;
        if( this.loadType === LOAD_2D )
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
                // Make a copy of the default object
                let objData
                if( this.loadType === LOAD_2D )
                    objData = new ObjectData2D;
                else
                    objData = new ObjectData3D;
                
                objData.copy(defaultData);

                // Load in the object data
                objData.loadObjData( objNode[i], group, name );

                // Debug output
                //console.log(JSON.stringify(objData));

                // Save it to the map map
                groupMap.set( name, objData );
            }
            else
            {
                throw new Error( `Group object already exists (${group}, ${name})!` );
            }
        }

        // Debug output
        //console.log(JSON.stringify(defaultData));
    }
    
    //
    //  DESC: Load all the textures associated with this group
    //
    loadTextureGroup2D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePath = objData.visualData.textureFilePath;

                    if( filePath && (dupPathCheck.indexOf(filePath) === -1) )
                    {
                        // Add to the array to check for duplication
                        dupPathCheck.push( filePath );

                        // Check if this file has already been loaded
                        if( !assetHolder.has( group, filePath ) )
                        {
                            // Load the texture file
                            this.downloadFile( 'img', group, filePath, finishCallback,
                                ( group, image, filePath, finishCallback ) =>
                                {
                                    assetHolder.set( group, filePath, image );

                                    textureManager.load( group, filePath, image );
                                });
                        }
                        else
                        {
                            textureManager.load( group, filePath, assetHolder.get( group, filePath) );
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't create from data because object group does not exist (${group})!` );
            }
        }
    }

    //
    //  DESC: Load all the meshes associated with this group
    //
    loadMeshGroup2D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePathAry = [objData.visualData.meshFilePath, objData.visualData.spriteSheetFilePath];

                    for( let i = 0; i < filePathAry.length; ++i )
                    {
                        if( filePathAry[i] && (dupPathCheck.indexOf(filePathAry[i]) === -1) )
                        {
                            // Add to the array to check for duplication
                            dupPathCheck.push( filePathAry[i] );

                            // Check if this file has already been loaded
                            if( !assetHolder.has( group, filePathAry[i] ) )
                            {
                                // Load the mesh file
                                this.downloadFile( 'xml', group, filePathAry[i], finishCallback,
                                    ( group, xmlNode, filePath, finishCallback ) =>
                                    {
                                        assetHolder.set( group, filePath, xmlNode );

                                        if( filePath === objData.visualData.spriteSheetFilePath )
                                            spriteSheetManager.loadFromNode( filePath, xmlNode );
                                    });
                            }
                            else
                            {
                                if( filePathAry[i] === objData.visualData.spriteSheetFilePath )
                                    spriteSheetManager.loadFromNode( filePathAry[i], assetHolder.get( group, filePathAry[i] ) );
                            }
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't create load mesh data because object group does not exist (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all the meshes associated with this group
    //
    loadMeshGroup3D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePath = objData.visualData.meshFilePath;

                    if( filePath && (dupPathCheck.indexOf(filePath) === -1) )
                    {
                        // Add to the array to check for duplication
                        dupPathCheck.push( filePath );

                        // Check if this file has already been loaded
                        if( !assetHolder.has( group, filePath ) )
                        {
                            // Load the mesh file
                            this.downloadFile( 'binary', group, filePath, finishCallback,
                                ( group, binaryFile, filePath, finishCallback ) =>
                                {
                                    assetHolder.set( group, filePath, binaryFile );

                                    objData.visualData.meshGrp =
                                        meshManager.load( group, filePath, binaryFile );
                                });
                        }
                        else
                        {
                            objData.visualData.meshGrp =
                                meshManager.load( group, filePath, assetHolder.get( group, filePath ) );
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't load mesh data because object group does not exist (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all the textures associated with this group
    //
    loadTextureGroup3D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePath = objData.visualData.meshFilePath;

                    if( filePath && (dupPathCheck.indexOf(filePath) === -1) )
                    {
                        // Add to the array to check for duplication
                        dupPathCheck.push( filePath );

                        for( let i = 0; i < objData.visualData.meshGrp.uniqueTexturePathAry.length; ++i )
                        {
                            filePath = objData.visualData.meshGrp.uniqueTexturePathAry[i].path;

                            // Check if this file has already been loaded
                            if( !assetHolder.has( group, filePath ) )
                            {
                                // Load the texture file
                                this.downloadFile( 'img', group, filePath, finishCallback,
                                    ( group, image, filePath, finishCallback ) =>
                                    {
                                        assetHolder.set( group, filePath, image );

                                        textureManager.load( group, filePath, image );
                                    });
                            }
                            else
                            {
                                textureManager.load( group, filePath, assetHolder.get( group, filePath) );
                            }
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't create from data because object group does not exist (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Create OpenGL objects from data
    //
    createFromData( groupAry, callback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                // Create OpenGL objects from data
                for( let [ key, objData ] of groupMap.entries() )
                    objData.createFromData( group );
            }
        }

        callback();
    }
    
    //
    //  DESC: Free all of the meshes materials and data of a specific group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Object data list group name can't be found (${group})!` );

            // Get the group map
            if( this.objectDataMapMap.has( group ) )
            {
                textureManager.deleteGroup( group );
                vertexBufferManager.deleteGroup( group );
                meshManager.deleteGroup( group );

                this.objectDataMapMap.delete( group );
            }
        }
    }
    
    //
    //  DESC: Get a specific object data
    //
    getData( group, name )
    {
        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );
        if( groupMap !== undefined )
        {
            let objData = groupMap.get( name );
            if( objData )
                return objData;
            else
                throw new Error( `Object data not found (${group}, ${name})!` );
        }
        else
            throw new Error( `Object group not found (${group}, ${name})!` );
        
        return null;
    }
}

export var objectDataManager = new ObjectDataManager;
