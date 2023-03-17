
// 
//  FILE NAME: camera.js
//  DESC:      class that holds the camera position and rotation
//

"use strict";

import { Matrix } from '../utilities/matrix';
import { Object } from '../common/object';
import { settings } from '../utilities/settings';
import * as defs from './defs';

export class Camera extends Object
{
    constructor()
    {
        super();
        
        // Custom projection matrix
        this.projectionMatrix = new Matrix;

        // Custom projection matrix
        this.finalMatrix = new Matrix;

        // Matrix for rotations only, used for normal calculations
        this.rotMatrix = new Matrix;
        
        this.projType = settings.projectionType;
        this.minZDist = settings.minZdist;
        this.maxZDist = settings.maxZdist;
        this.projWidth = settings.defaultSize.w;
        this.projHeight = settings.defaultSize.h;
        this.angle = settings.viewAngle;

        // cull flag
        this.cull = defs.CULL_NULL;

        // Setup the camera
        this.setup();

        // XML node for camera init
        this.xmlNode = null;
    }
    
    //
    //  DESC: Init the camera from XML
    //
    initFromXml( xmlNode )
    {
        if( xmlNode )
            this.xmlNode = xmlNode;
        else if( !xmlNode && this.xmlNode )
            xmlNode = this.xmlNode;
        else
            throw new Error( 'Camera XML is NULL!' );

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

        attr = xmlNode.getAttribute('projWidth');
            if( attr )
                this.projWidth = Number(attr);

        attr = xmlNode.getAttribute('projHeight');
            if( attr )
                this.projHeight = Number(attr);

        attr = xmlNode.getAttribute('view_angle');
        if( attr )
            this.angle = Number(attr) * defs.DEG_TO_RAD;

        attr = xmlNode.getAttribute('cull');
        if( attr )
        {
            if( attr === 'CULL_FULL' )
                this.cull = defs.CULL_FULL;

            else if( attr === 'cull_x_only' )
                this.cull = defs.CULL_X_ONLY;

            else if( attr === 'cull_y_only' )
                this.cull = defs.CULL_Y_ONLY;
        }
        
        // Load the transform data from node
        this.loadTransFromNode( xmlNode );

        // Load the script functions from node
        this.scriptComponent.initScriptIds( xmlNode );
        
        // Setup the camera
        this.setup();

        // Prepare any script functions that are flagged to prepareOnInit
        this.scriptComponent.prepareOnInit( this );
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
        
        // Setup the camera
        this.setup();
    }

    //
    //  DESC: Setup the camera
    //
    setup()
    {
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
        //console.log(`Proj Width: ${this.projWidth}; Proj Height: ${this.projHeight}`);

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
                this.projWidth,
                this.projHeight,
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

    //
    //  DESC: Apply the rotation
    //
    applyRotation( matrix )
    {
        this.rotMatrix.initilizeMatrix();
        this.rotMatrix.rotate( this.rot );

        // Since the rotation has already been done, multiply it into the matrix
        matrix.multiply3x3( this.rotMatrix.matrix );
    }

    //
    //  DESC: Check if the raduis is in the view frustrum
    //
    inView( transPos, radius )
    {
        if(this.projType == defs.EPT_ORTHOGRAPHIC)
        {
            // Check the right and left sides of the screen
            if( Math.abs(-this.transPos.x - (this.scale.x * transPos.x)) > (settings.defaultSize_half.w + (this.scale.x * radius)) )
                return false;

            // Check the top and bottom sides of the screen
            if( Math.abs(-this.transPos.y - (this.scale.y * transPos.y)) > (settings.defaultSize_half.h + (this.scale.y * radius)) )
                return false;
        }
        else
        {
            // Check the right and left sides of the screen
            if( Math.abs(-this.transPos.x - (this.scale.x * transPos.x)) > ((Math.abs(transPos.z) * settings.screenAspectRatio.w) + (this.scale.x * radius)) )
                return false;

            // Check the top and bottom sides of the screen
            if( Math.abs(-this.transPos.y - (this.scale.y * transPos.y)) > ((Math.abs(transPos.z) * settings.screenAspectRatio.h) + (this.scale.y * radius)) )
                return false;
        }

        return true;
    }

    //
    //  DESC: Check if the raduis is in the view frustrum of the Y
    //
    inViewY( transPos, radius )
    {
        if(this.projType == defs.EPT_ORTHOGRAPHIC)
        {
            // Check the top and bottom sides of the screen
            if( Math.abs(-this.transPos.y - (this.scale.y * transPos.y)) > (settings.defaultSize_half.h + (this.scale.y * radius)) )
                return false;
        }
        else
        {
            // Check the top and bottom sides of the screen
            if( Math.abs(-this.transPos.y - (this.scale.y * transPos.y)) > ((Math.abs(transPos.z) * settings.screenAspectRatio.h) + (this.scale.y * radius)) )
                return false;
        }

        return true;
    }

    //
    //  DESC: Check if the raduis is in the view frustrum
    //
    inViewX( transPos, radius )
    {
        if(this.projType == defs.EPT_ORTHOGRAPHIC)
        {
            // Check the right and left sides of the screen
            if( Math.abs(-this.transPos.x - (this.scale.x * transPos.x)) > (settings.defaultSize_half.w + (this.scale.x * radius)) )
                return false;
        }
        else
        {
            // Check the right and left sides of the screen
            if( Math.abs(-this.transPos.x - (this.scale.x * transPos.x)) > ((Math.abs(transPos.z) * settings.screenAspectRatio.w) + (this.scale.x * radius)) )
                return false;
        }

        return true;
    }
}
