
// 
//  FILE NAME: camera.js
//  DESC:      class that holds the camera position and rotation
//

"use strict";

import { Matrix } from '../utilities/matrix';
import { Object3D } from '../3d/object3d';

export class Camera extends Object3D
{
    constructor()
    {
        super();
    }
    
    //
    //  DESC: Set the object's position
    //
    setPos( pos )
    {
        super.setPosXYZ( -pos.x, -pos.y, -pos.z );
    }
    
    setPosXYZ( x = 0, y = 0, z = 0 )
    {
        super.setPosXYZ( -x, -y, -z );
    }
    
    incPos( pos )
    {
        super.incPosXYZ( -pos.x, -pos.y, -pos.z );
    }
    
    incPosXYZ( x = 0, y = 0, z = 0 )
    {
        super.incPosXYZ( -x, -y, -z );
    }
}