
// 
//  FILE NAME: objectnodemultilist.js
//  DESC:      Object node multi link list class
//

"use strict";

import { Object2D } from '../2d/object2d';
import { NodeMultiLst } from './nodemultilist';
import * as defs from '../common/defs';

export class ObjectNodeMultiLst extends NodeMultiLst
{
    constructor(
        objectId = defs.OBJECT_DEFAULT_ID,
        nodeId = defs.NODE_DEFAULT_ID,
        parentId = defs.PARENT_NODE_DEFAULT_ID )
    {
        super( nodeId, parentId );
        
        this.object = new Object2D;
        
        this.objectId = objectId;
    }
    
    //
    //  DESC: Transform the object
    //
    transform( object )
    {
        if( object )
            this.object.transform( object );
        else
            this.object.transform();
        
        // Call the parent but it has to be last
        super.transform();
    }
    
    // 
    //  DESC: Get the object
    //
    getObject()
    {
        return this.object;
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return this.objectId;
    }
}