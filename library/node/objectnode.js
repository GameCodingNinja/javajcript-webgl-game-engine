
// 
//  FILE NAME: objectnode.js
//  DESC:      Object node that allows for children
//

"use strict";

import { Object } from '../common/object';
import { RenderNode } from './rendernode';
import { Size } from '../common/size';
import { Point } from '../common/point';
import * as defs from '../common/defs';

var gPoint = new Point;

export class ObjectNode extends RenderNode
{
    constructor( nodeData )
    {
        super( nodeData.nodeId, nodeData.parentNodeId );
        
        this.name = nodeData.nodeName;
        this.object = new Object( this );
        this.type = defs.ENT_OBJECT;
        this.userId = nodeData.userId;
    }
    
    // 
    //  DESC: Update the object
    //
    update()
    {
        this.object.update();

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
    //  DESC: Calculate the radius
    //  NOTE: The head node does not have a size
    //
    calcRadius( size = null )
    {
        let headNode = (size === null);
        if( headNode )
        {
            size = new Size;

            // Reset the position to zero for radius calculation
            gPoint.copy(this.object.pos);
            this.object.setPosXYZ();
        }

        this.calcSize( size );
        super.calcRadius( size );

        // The head node gets the accumulated size of all the objects/sprites
        if( headNode )
        {
            this.radius = size.getLength() / 2;

            // Reset it back
            this.object.setPos(gPoint);
        }
    }
}