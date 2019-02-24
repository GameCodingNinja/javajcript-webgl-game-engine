
// 
//  FILE NAME: istrategy.js
//  DESC:      Strategy Interface Class
//

"use strict";

export class iStrategy
{
    constructor()
    {
        // Camera
        this.camera = null;
    }
    
    // 
    //  DESC: Set/Get the camera
    //
    setCamera( camera )
    {
        this.camera = camera;
    }
    
    getCamera()
    {
        return this.camera;
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
