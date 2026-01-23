
//
//  FILE NAME: objectdatamanager.js
//  DESC:      Singleton that holds a map of all 2D/3D object data used for later loading
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { textureManager } from '../managers/texturemanager';
import { meshManager } from '../managers/meshmanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { spriteSheetManager } from '../managers/spritesheetmanager';
import { assetHolder } from '../utilities/assetholder';
import { definitionValidator } from '../utilities/definitionvalidator';
import { ObjectData2D } from './objectdata2d';
import { ObjectData3D } from './objectdata3d';
import * as genFunc from '../utilities/genfunc';

// Load type constants
const LOAD_2D = 0;
const LOAD_3D = 1;

// Reusable temp variables to avoid GC
var gTempGroupAry = [];
var gValidationContext = { group: null, objectName: null };

/**
 * @typedef {Object} ObjectDefinition
 * @property {string} name - The name of the object
 * @property {string} group - The group the object belongs to
 */

/**
 * Singleton manager for 2D/3D object data definitions.
 * Handles loading, caching, and lifecycle of object definitions from XML files.
 * @class
 * @extends ManagerBase
 */
class ObjectDataManager extends ManagerBase
{
    constructor()
    {
        super();

        this.objectDataMapMap = new Map;
    }

    /**
     * Load all XML's associated with this group
     * @param {string|string[]} group - Group name or array of group names to load
     * @returns {Promise<number>} Promise that resolves when loading is complete
     */
    loadGroup( group )
    {
        // Reuse temp array to avoid GC
        if( group instanceof Array )
        {
            gTempGroupAry = group;
        }
        else
        {
            gTempGroupAry.length = 1;
            gTempGroupAry[0] = group;
        }

        return super.loadGroupAry( 'Object data list', this.objectDataMapMap, gTempGroupAry )
            .then(() => this.loadAssets( gTempGroupAry ))
            .then(() => this.createFromData( gTempGroupAry ));
    }

    /**
     * Load all object information from an xml node
     * @param {string} group - Group name to load objects into
     * @param {Element} node - XML node containing object data
     * @throws {Error} If object already exists in group
     */
    loadFromNode( group, node )
    {
        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );

        // Determine the load type
        let loadType = LOAD_2D;
        if( node.nodeName === 'objectDataList3D' )
            loadType = LOAD_3D;

        let defaultData;
        if( loadType === LOAD_2D )
            defaultData = new ObjectData2D;
        else
            defaultData = new ObjectData3D;

        // Load the default data
        let defaultNode = node.getElementsByTagName('default')[0];
        if( defaultNode )
            defaultData.loadObjData( defaultNode, '', '' );

        // Get the node to the list of objects
        let objNodeList = node.getElementsByTagName('object');

        for( let i = 0; i < objNodeList.length; ++i )
        {
            let objNode = objNodeList[i];

            // Get the object's name
            let name = objNode.getAttribute( 'name' );

            // Validate the object definition - reuse context object to avoid GC
            definitionValidator.clear();
            gValidationContext.group = group;
            gValidationContext.objectName = name;
            definitionValidator.validateObjectNode( objNode, group );
            definitionValidator.validateVisualNode( objNode, gValidationContext );
            definitionValidator.validatePhysicsNode( objNode, gValidationContext );

            // Log warnings but continue, throw on errors
            if( !definitionValidator.isValid() )
            {
                console.error( `Validation errors in object "${name}" (group: ${group}):`, definitionValidator.errors );
            }

            // Check that this object doesn't already exist
            if( groupMap.get(name) === undefined )
            {
                let objData;
                if( loadType === LOAD_2D )
                    objData = new ObjectData2D;
                else
                    objData = new ObjectData3D;

                objData.copy(defaultData);

                // Load in the object data
                objData.loadObjData( objNode, group, name );

                // Save it to the map map
                groupMap.set( name, objData );
            }
            else
            {
                throw new Error( `Group object already exists (${group}, ${name})!` );
            }
        }
    }

    /**
     * Load all the assets associated with these groups
     * @param {string[]} groupAry - Array of group names to load assets for
     * @returns {Promise<*[]>} Promise that resolves when all assets are loaded
     * @throws {Error} If group does not exist
     */
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
                        this.load2DAssets( promiseAry, group, objData );
                    }
                    // Load 3D elements
                    else
                    {
                        this.load3DAssets( promiseAry, group, objData );
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

    /**
     * Load 2D assets (textures, meshes, sprite sheets)
     * @param {Promise[]} promiseAry - Array to push loading promises into
     * @param {string} group - Group name for asset organization
     * @param {ObjectData2D} objData - Object data containing asset paths
     */
    load2DAssets( promiseAry, group, objData )
    {
        let filePathAry = objData.visualData.getTextureFilePathAry();
        let textureFilter = objData.visualData.textureFilter;
        let textureWrap = objData.visualData.textureWrap;

        // Load textures
        for( let i = 0; i < filePathAry.length; ++i )
        {
            let filePath = filePathAry[i];

            if( filePath && textureManager.allowLoad( group, filePath ) )
            {
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
            promiseAry.push( 
                genFunc.downloadFile( 'xml', meshFilePath )
                    .then(( xmlNode ) => assetHolder.set( group, meshFilePath, xmlNode ))
                    .catch(( error ) => { console.error(error.stack); throw error; }));
        }

        // Load the XML sprite sheet
        let spriteSheetFilePath = objData.visualData.spriteSheetFilePath;
        if( spriteSheetFilePath && spriteSheetManager.allowLoad( group, spriteSheetFilePath ) )
        {
            promiseAry.push( 
                genFunc.downloadFile( 'xml', spriteSheetFilePath )
                    .then(( xmlNode ) => spriteSheetManager.load( group, spriteSheetFilePath, xmlNode ))
                    .catch(( error ) => { console.error(error.stack); throw error; }));
        }
    }

    /**
     * Load 3D assets (meshes and their textures)
     * @param {Promise[]} promiseAry - Array to push loading promises into
     * @param {string} group - Group name for asset organization
     * @param {ObjectData3D} objData - Object data containing asset paths
     */
    load3DAssets( promiseAry, group, objData )
    {
        let filePath = objData.visualData.meshFilePath;

        if( filePath && meshManager.allowLoad( group, filePath ) )
        {
            promiseAry.push( 
                genFunc.downloadFile( 'binary', filePath )
                    .then(( binaryFile ) => this.loadMesh3D( group, filePath, objData, binaryFile ))
                    .catch(( error ) => { console.error(error.stack); throw error; }));
        }
    }

    /**
     * Load a 3D mesh and its associated textures
     * @param {string} group - Group name for asset organization
     * @param {string} binaryFilePath - Path to the binary mesh file
     * @param {ObjectData3D} objData - Object data to populate with mesh
     * @param {ArrayBuffer} binaryFile - Binary file data
     * @returns {Promise<*[]>} Promise that resolves when mesh and textures are loaded
     */
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

                promiseAry.push( 
                    genFunc.downloadFile( 'img', filePath )
                        .then(( image ) => textureManager.load( group, filePath, image, textureFilter, textureWrap ))
                        .catch(( error ) => { console.error(error.stack); throw error; }));
            }
        }

        return Promise.all( promiseAry );
    }

    /**
     * Create OpenGL objects from data
     * @param {string[]} groupAry - Array of group names to create objects for
     * @returns {number} Always returns 0
     */
    createFromData( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];

            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                // Create OpenGL objects from data
                for( let objData of groupMap.values() )
                    objData.createFromData( group );
            }
        }

        return 0;
    }

    /**
     * Free all of the meshes materials and data of a specific group
     * @param {string|string[]} group - Group name or array of group names to free
     * @throws {Error} If group name is not found in listTableMap
     */
    freeGroup( group )
    {
        // Reuse temp array to avoid GC
        if( group instanceof Array )
        {
            gTempGroupAry = group;
        }
        else
        {
            gTempGroupAry.length = 1;
            gTempGroupAry[0] = group;
        }

        for( let grp = 0; grp < gTempGroupAry.length; ++grp )
        {
            let grpName = gTempGroupAry[grp];

            // Make sure the group we are looking for exists
            if( !this.listTableMap.has( grpName ) )
                throw new Error( `Object data list group name can't be found (${grpName})!` );

            // Get the group map
            if( this.objectDataMapMap.has( grpName ) )
            {
                // Dispose object data resources before deleting
                let groupMap = this.objectDataMapMap.get( grpName );
                for( let objData of groupMap.values() )
                {
                    if( objData.dispose )
                        objData.dispose();
                }

                textureManager.deleteGroup( grpName );
                vertexBufferManager.deleteGroup( grpName );
                meshManager.deleteGroup( grpName );

                this.objectDataMapMap.delete( grpName );
            }
        }
    }

    /**
     * Get a specific object data
     * @param {string} group - Group name to search in
     * @param {string} name - Object name to retrieve
     * @returns {ObjectData2D|ObjectData3D} The requested object data
     * @throws {Error} If group or object is not found
     */
    getData( group, name )
    {
        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );
        if( groupMap !== undefined )
        {
            let objData = groupMap.get( name );
            if( objData )
                return objData;

            throw new Error( `Object data not found (${group}, ${name})!` );
        }

        throw new Error( `Object group not found (${group}, ${name})!` );
    }

    /**
     * Find the group an object name belongs to
     * @param {string} objectName - Object name to search for
     * @returns {string|undefined} Group name if found, undefined otherwise
     */
    findGroup( objectName )
    {
        for( let [groupKey, groupMap] of this.objectDataMapMap )
        {
            if( groupMap.get( objectName ) !== undefined )
                return groupKey;
        }

        return undefined;
    }
}

export var objectDataManager = new ObjectDataManager;
