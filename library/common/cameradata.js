
// 
//  FILE NAME: cameradata.js
//  DESC:      class that holds the camera position and rotation data for creating a camera
//

"use strict";

import { Object } from '../common/object';
import { settings } from '../utilities/settings';
import * as defs from './defs';

export class CameraData extends Object
{
    constructor( xmlNode )
    {
        super();
        
        // The projection type
        this.projectionType = settings.projectionType;

        // minimum Z distance
        this.minZdist = settings.minZdist;

        // maximum Z distance
        this.maxZdist = settings.maxZdist;

        // view angle
        this.viewAngle = settings.viewAngle;
        
        let attr = xmlNode.getAttribute('projectType');
        if( attr )
        {
            if( attr === 'orthographic' )
                this.projectionType = defs.EPT_ORTHOGRAPHIC;
            else
                this.projectionType = defs.EPT_PERSPECTIVE;
        }
        
        attr = xmlNode.getAttribute('minZDist');
        if( attr )
            this.minZdist = Number(attr);

        attr = xmlNode.getAttribute('maxZDist');
        if( attr )
            this.maxZdist = Number(attr);

        attr = xmlNode.getAttribute('view_angle');
        if( attr )
            this.viewAngle = Number(attr) * defs.DEG_TO_RAD;
        
        // Load the transforms
        this.loadTransFromNode( xmlNode );
    }
}
