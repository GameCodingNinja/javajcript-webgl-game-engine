
// 
//  FILE NAME:  objectcollision3d.js
//  DESC:       Class containing the object's collision data
//

"use strict";

import * as defs from '../common/defs';

export class ObjectCollisionData3D
{
    constructor()
    {
        // Data type
        this.type = defs.ECT_NULL;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( /*obj*/ )
    {

    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( /*xmlNode*/ )
    {
    }

    // 
    //  DESC: Is this collision active
    //
    isActive()
    {
        return (this.type !== defs.ECT_NULL);
    }
}
