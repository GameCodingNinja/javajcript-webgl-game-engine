
// 
//  FILE NAME: objectnode.js
//  DESC:      Object node that allows for children
//

"use strict";

import { Object } from '../common/object';
import { RenderNode } from './rendernode';
import * as defs from '../common/defs';

export class ObjectNode extends RenderNode
{
    constructor( nodeData )
    {
        super( nodeData.nodeId, nodeData.parentNodeId );
        
        this.name = nodeData.nodeName;
        this.object = new Object();
        this.type = defs.ENT_OBJECT;
        this.userId = nodeData.userId;
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