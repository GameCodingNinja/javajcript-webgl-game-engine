
// 
//  FILE NAME: cameramanager.js
//  DESC:      CameraManager class
//

"use strict";

import { Camera } from '../common/camera';

class CameraManager
{
    constructor()
    {        
        // Camera map
        this.cameraMap = new Map;
        
        // Transform array
        this.transformAry = [];

        // The default camera
        this.defaultCamera = null;
    }
    
    // 
    //  DESC: Load the camera data from node
    //
    loadFromNode( xmlNode )
    {
        if( xmlNode )
        {
            this.defaultCamera = new Camera();

            // Get the default camera
            let defCamera = xmlNode.getElementsByTagName('default');

            // Init the default camera
            if( defCamera.length )
            {
                this.defaultCamera.initFromXml( defCamera[0] );
            }
            else
            {
                this.defaultCamera.setPosXYZ( 0, 0, 100 );
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
        return this.defaultCamera;
    }
    
    // 
    //  DESC: Get the camera
    //
    get( cameraId )
    {
        if( !this.cameraMap.has( cameraId ) )
        {
            console.debug( `Camera id is not defined (${cameraId})! Using default camera instead.` );
            return this.defaultCamera;
        }
        
        return this.cameraMap.get( cameraId );
    }
    
    // 
    //  DESC: Add camera to the transform array
    //
    addToTransform( cameraId )
    {
        this._cameraIdAry = cameraId;
        if( !(cameraId instanceof Array) )
            this._cameraIdAry = [cameraId];

        for( this._i = 0; this._i < this._cameraIdAry.length; ++this._i )
        {
            this._camera = this.cameraMap.get( this._cameraIdAry[this._i] );
            if( this._camera )
            {
                this._index = this.transformAry.findIndex( (obj) => obj === this._camera );
                if( this._index !== -1 )
                    console.warn( `Camera is already being transformed (${this._cameraIdAry[this._i]})!` );
                else
                    this.transformAry.push( this._camera );
            }
            else
                throw new Error( `Camera id is not defined (${this._cameraIdAry[this._i]})!` );
        }
    }
    
    // 
    //  DESC: Remove camera from the transform array
    //
    removeFromTransform( cameraId )
    {
        this._camera = this.cameraMap.get( cameraId );
        if( this._camera )
        {
            this._index = this.transformAry.findIndex( (obj) => obj === this._camera );
            if( this._index === -1 )
                console.warn( `Camera is not being transformed (${cameraId})!` );
            else
                this.transformAry.splice(this._index, 1);
        }
        else
            throw new Error( `Camera id is not defined (${cameraId})!` );
    }
    
    //
    //  DESC: Transform the cameras
    //
    transform()
    {
        for( this._i = 0; this._i < this.transformAry.length; this._i++ )
            this.transformAry[this._i].transform();
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

    //
    //  DESC: Rebuild all camera's projection matrixes
    //
    rebuild()
    {
        this.defaultCamera.setup();

        for( let camera of this.cameraMap.values() )
            camera.setup();
    }
}

var cameraManager = new CameraManager;
export { cameraManager }
