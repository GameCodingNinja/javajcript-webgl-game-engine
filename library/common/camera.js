
// 
//  FILE NAME: camera.js
//  DESC:      class that holds the camera position and rotation
//

"use strict";

import { Matrix } from '../utilities/matrix';
import { Object3D } from '../3d/object3d';
import { settings } from '../utilities/settings';
import * as defs from './defs';

export class Camera extends Object3D
{
    constructor()
    {
        super();
        
        this.projectionMatrix = new Matrix;
        this.finalMatrix = new Matrix;
        
        this.projType = settings.projectionType;
        this.minZDist = settings.minZdist;
        this.maxZDist = settings.maxZdist;
        this.angle = settings.viewAngle;

        // Create the projection matrix
        this.createProjectionMatrix();
        
        // Do the initial transform
        super.transform();
        
        // Calculate the final matrix
        this.calcFinalMatrix();
    }
    
    //
    //  DESC: Init the camera from XML
    //
    initFromXml( xmlNode )
    {
        let attr = xmlNode.getAttribute('projectType');
        if( attr )
        {
            if( attr === 'orthographic' )
                this.projType = defs.EPT_ORTHOGRAPHIC;
            else
                this.projType = defs.EPT_PERSPECTIVE;
        }
        
        attr = xmlNode.getAttribute('minZDist');
        if( attr )
            this.minZDist = Number(attr);

        attr = xmlNode.getAttribute('maxZDist');
        if( attr )
            this.maxZDist = Number(attr);

        attr = xmlNode.getAttribute('view_angle');
        if( attr )
            this.angle = Number(attr) * defs.DEG_TO_RAD;
        
        // Load the transforms
        this.loadTransFromNode( xmlNode );
        
        // Create the projection matrix
        this.createProjectionMatrix();
        
        // Do the initial transform
        super.transform();
        
        // Calculate the final matrix
        this.calcFinalMatrix();
    }
    
    //
    //  DESC: Create the projection matrix
    //
    init( projType, minZDist, maxZDist, angle )
    {
        this.projType = projType;
        this.minZDist = minZDist;
        this.maxZDist = maxZDist;
        this.angle = angle;
        
        // Create the projection matrix
        this.createProjectionMatrix();
        
        // Do the initial transform
        super.transform();
        
        // Calculate the final matrix
        this.calcFinalMatrix();
    }
    
    //
    //  DESC: Create the projection matrix
    //
    createProjectionMatrix()
    {
        if( this.projType == defs.EPT_PERSPECTIVE )
        {
            this.projectionMatrix.perspectiveFovRH(
                this.angle,
                settings.screenAspectRatio.w,
                this.minZDist,
                this.maxZDist );
        }
        else
        {
            this.projectionMatrix.orthographicRH(
                settings.defaultSize.w,
                settings.defaultSize.h,
                this.minZDist,
                this.maxZDist );
        }
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