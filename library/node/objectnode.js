
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
        super( nodeData );
        
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
    calcRadius()
    {
        // Allocate a size object to acumulate the size across all the children
        this._size = new Size;

        // Get the initial size
        this.calcSize( this._size );

        // Call the recursive function to acumulate the size across all the children
        super.calcRadius( this._size );

        // Calculate the radius in squared space. Avoids having to use sqrt
        this.radius = this._size.getLength() / 2;
    }
}