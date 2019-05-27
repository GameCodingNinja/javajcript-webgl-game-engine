
// 
//  FILE NAME: cameramanager.js
//  DESC:      CameraManager class
//

"use strict";

import { Camera } from '../common/camera';
import * as genFunc from '../utilities/genfunc';

class CameraManager
{
    constructor()
    {
        // Default camera
        this.defaultCamera = null;
        
        // Camera map
        this.cameraMap = new Map;
        
        // Transform array
        this.transformAry = [];
    }
    
    // 
    //  DESC: Load the camera list
    //
    load( filePath )
    {
        return genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) => this.loadFromNode( xmlNode ));
    }
    
    // 
    //  DESC: Load the camera data from node
    //
    loadFromNode( xmlNode )
    {
        if( xmlNode )
        {
            // Get the default camera
            let defCamera = xmlNode.getElementsByTagName('default');
            if( defCamera.length )
            {
                // Create camera and init
                this.defaultCamera = new Camera();
                this.defaultCamera.initFromXml( defCamera[0] );
            }
            else
            {
                throw new Error( `Default camera is not defined!` );
            }
            
            let cameraLst = xmlNode.getElementsByTagName('camera');
            for( let i = 0; i < cameraLst.length; ++i )
            {
                let id = cameraLst[i].getAttribute('id');

                if( id == null )
                    throw new Error( `Camera does not have a id!` );

                // Check for duplicate Id's
                if( this.cameraMap.has( id ) )
                    throw new Error( `Duplicate camera id (${id})!` );

                // Create camera and init
                let camera = new Camera();
                camera.initFromXml( cameraLst[i] );

                this.cameraMap.set( id, camera );
            }
        }
    }
    
    // 
    //  DESC: Get the default camera
    //
    getDefault()
    {
        if( this.defaultCamera == null )
            throw new Error( `Default camera is not defined! Need to load camera objects before using manager` );
        
        return this.defaultCamera;
    }
    
    // 
    //  DESC: Get the camera
    //
    get( cameraId )
    {
        if( !this.cameraMap.has( cameraId ) )
            throw new Error( `Camera id is not defined (${cameraId})!` );
        
        return this.cameraMap.get( cameraId );
    }
    
    // 
    //  DESC: Add camera to the transform array
    //
    addToTransform( cameraId )
    {
        let camera = this.cameraMap.get( cameraId );
        if( camera )
        {
            let index = this.transformAry.findIndex( (obj) => obj === camera );
            if( index !== -1 )
                console.log( `Camera is already being transformed (${cameraId})!` );
            else
                this.transformAry.push( camera );
        }
        else
            throw new Error( `Camera id is not defined (${cameraId})!` );
    }
    
    // 
    //  DESC: Remove camera from the transform array
    //
    removeFromTransform( cameraId )
    {
        let camera = this.cameraMap.get( cameraId );
        if( camera )
        {
            let index = this.transformAry.findIndex( (obj) => obj === camera );
            if( index === -1 )
                console.log( `Camera is not being transformed (${cameraId})!` );
            else
                this.transformAry.splice(index, 1);
        }
        else
            throw new Error( `Camera id is not defined (${cameraId})!` );
    }
    
    //
    //  DESC: Transform the cameras
    //
    transform()
    {
        for( let i = 0; i < this.transformAry.length; i++ )
            this.transformAry[i].transform();
    }
    
    //
    //  DESC: Clear out all the cameras
    //
    clear()
    {
        this.defaultCamera = null;
        this.cameraMap = new Map;
        
        this.transformAry = [];
    }
    
    //
    //  DESC: Clear the transform array
    //
    clearTransAry()
    {
        this.transformAry = [];
    }
}

var cameraManager = new CameraManager;
export { cameraManager }
