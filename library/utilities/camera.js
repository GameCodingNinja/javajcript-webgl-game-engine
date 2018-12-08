
// 
//  FILE NAME: camera.js
//  DESC:      class that holds the camera position and rotation
//

"use strict";

import { Matrix } from '../utilities/matrix';
import { Object3D } from '../3d/object3d';
import { settings } from '../utilities/settings';
import * as defs from '../common/defs';

export class Camera extends Object3D
{
    constructor( minZDist, maxZDist, angle = null )
    {
        super();
        
        this.projectionMatrix = new Matrix;
        this.finalMatrix = new Matrix;
        
        if( angle === null )
        {
            this.projectionMatrix.orthographicRH(
                settings.defaultSize.w,
                settings.defaultSize.h,
                minZDist,
                maxZDist );
        }
        else
        {
            this.projectionMatrix.perspectiveFovRH(
                settings.viewAngle,
                settings.screenAspectRatio.w,
                minZDist,
                maxZDist );
        }
        
        this.calcFinalMatrix();
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
    
    //
    //  DESC: Transform
    //
    transform()
    {
        let wasTransformed = this.parameters.isSet( defs.TRANSFORM );
    
        super.transform();

        if( wasTransformed )
            this.calcFinalMatrix();
    }
    
    //
    //  DESC: Calculate the final matrix
    //
    calcFinalMatrix()
    {
        this.finalMatrix.initilizeMatrix();
        this.finalMatrix.mergeMatrix( this.matrix.matrix );
        this.finalMatrix.mergeMatrix( this.projectionMatrix.matrix );
    }
}