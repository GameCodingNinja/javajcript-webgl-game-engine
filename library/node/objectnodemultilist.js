
// 
//  FILE NAME: objectnodemultilist.js
//  DESC:      Object node multi link list class
//

"use strict";

import { Object } from '../common/object';
import { RenderNode } from './rendernode';
import * as defs from '../common/defs';

export class ObjectNodeMultiLst extends RenderNode
{
    constructor(
        objectId = defs.DEFAULT_ID,
        nodeId = defs.DEFAULT_ID,
        parentId = defs.DEFAULT_ID )
    {
        super( nodeId, parentId );
        
        this.object = new Object(true, objectId);

        // Node type
        this.type = defs.ENT_OBJECT;
    }
    
    // 
    //  DESC: Update the object
    //
    update()
    {
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
    get()
    {
        return this.object;
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return this.object.id;
    }

    // 
    //  DESC: Set the id
    //
    setId( id )
    {
        this.object.id = id;
    }
}