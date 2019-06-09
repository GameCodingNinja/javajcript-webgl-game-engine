
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
        objectId = defs.DEFAULT_ID,
        nodeId = defs.DEFAULT_ID,
        parentId = defs.DEFAULT_ID )
    {
        super( nodeId, parentId );
        
        this.object = new Object2D;
        
        this.objectId = objectId;
        
        this.ai = null;
    }
    
    // 
    //  DESC: Update the object
    //
    update()
    {
        if( this.ai )
            this.ai.update();

        // Call the parent but it has to be last
        super.update();
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

    // 
    //  DESC: Set the id
    //
    setId( id )
    {
        this.objectId = id;
    }
    
    // 
    //  DESC: Set the AI.
    //
    setAI( ai )
    {
        this.ai = ai;
    }
}