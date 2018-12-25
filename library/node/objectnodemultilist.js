
// 
//  FILE NAME: objectnodemultilist.js
//  DESC:      Object node multi link list class
//

"use strict";

import { Object2D } from '../2d/object2d';
import { NodeMultiLst } from './nodemultilist';

export class ObjectNodeMultiLst extends NodeMultiLst
{
    constructor( objectId = -1, nodeId = -1, parentId = -1 )
    {
        super( nodeId, parentId );
        
        this.object = new Object2D;
        
        this.objectId = objectId;
    }
    
    //
    //  DESC: Transform the object
    //
    transform()
    {
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
}