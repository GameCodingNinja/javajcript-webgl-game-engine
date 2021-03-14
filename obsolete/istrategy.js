
// 
//  FILE NAME: istrategy.js
//  DESC:      Strategy Interface Class
//

"use strict";

import { cameraManager } from '../managers/cameramanager';

export class iStrategy
{
    constructor()
    {
        // Camera
        this.camera = cameraManager.getDefault();
    }
    
    // 
    //  DESC: Set the camera
    //
    setCamera( cameraId )
    {
        this.camera = cameraManager.get( cameraId );
    }
    
    //
    //  DESC: Create the sprite
    //        Empty function to be overwritten
    //
    create( dataName, instanceName = null )
    {
        throw new Error( `This strategy does not support dynamic node creation!` );
    }
}
