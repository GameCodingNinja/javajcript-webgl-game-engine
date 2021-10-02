
// 
//  FILE NAME: inode.js
//  DESC:      Node class
//

"use strict";

import * as defs from '../common/defs';

export class iNode
{
    constructor( nodeId, parentId )
    {
        // Node type
        this.type = defs.ENT_NULL;

        // user id
        this.userId = defs.DEFAULT_ID;

        // node id
        this.nodeId = nodeId;

        // parent node id
        this.parentId = parentId;

        // Node name
        this.name = '';

        // Radius for simple view frustum culling and simple collision detection
        this.radius = 0;
    }
    
    // 
    //  DESC: Get the next node
    //
    next()
    {
        return null;
    }
    
    // 
    //  DESC: Find the parent
    //
    findParent( /*searchNode*/ )
    {
        return null;
    }

    // 
    //  DESC: Find the child
    //
    findChild( childName )
    {
        if( childName == this.name )
            return this;

        return null;
    }
    
    // 
    //  DESC: Get the object
    //
    get()
    {
        return null;
    }

    // 
    //  DESC: Handle events
    //
    handleEvent()
    {
        // Empty by design
    }

    // 
    //  DESC: Update the nodes
    //
    update()
    {
        // Empty by design
    }

    //
    //  DESC: Transform the object
    //
    transform()
    {
        // Empty by design
    }

    //
    //  DESC: Render the sprite
    //
    render()
    {
        // Empty by design
    }
    
    // 
    //  DESC: Clean up any sprites
    //
    cleanUp()
    {
        // Empty by design
    }

    // 
    //  DESC: Calculate the radius
    //
    calcRadius( /*size*/ )
    {
        // Empty by design
    }

    // 
    //  DESC: Adjust the size based on the object
    //
    calcSize( size )
    {
        let obj = this.get();
        if( obj )
        {
            let vSize = obj.getSize();
            if( vSize.w > size.w )
                size.w = vSize.w;

            if( vSize.h > size.h )
                size.h = vSize.h;
        }
    }
}
