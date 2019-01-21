
// 
//  FILE NAME: camera.js
//  DESC:      class that holds the camera position and rotation
//

"use strict";

import { Object } from '../common/object';
import { settings } from '../utilities/settings';
import * as defs from './defs';

export class CameraData extends Object
{
    constructor( xmlNode )
    {
        // The projection type
        this.projectionType = settings.projectionType;

        // minimum Z distance
        this.minZdist = settings.minZdist;

        // maximum Z distance
        this.maxZdist = settings.maxZdist;

        // view angle
        this.viewAngle = settings.viewAngle;
    }
}
