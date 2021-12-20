
// 
//  FILE NAME: objectnode.js
//  DESC:      Object node that allows for children
//

"use strict";

import { Object } from '../common/object';
import { RenderNode } from './rendernode';
import { Size } from '../common/size';
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

        // Init the AABB if one is defined
        this.initAABB( nodeData.baseXmlNode );
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

        // Transform the AABB
        if( this.AABBrect && this.enableAABB )
            this.object.matrix.transformRect( this.AABBtrans, this.AABBrect );
        
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
    //  DESC: Calculate the radius
    //
    calcRadius( size )
    {
        let headNode = false;
        if( !size )
        {
            size = new Size;
            headNode = true;
        }

        this.calcSize( size );
        super.calcRadius( size );

        // The head node gets the accumulated size of all the sprites
        if( headNode )
            this.radius = size.getLength() / 2;
        else
            this.radius = this.object.getSize().getLength() / 2;
    }
}