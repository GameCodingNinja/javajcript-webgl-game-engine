
// 
//  FILE NAME: inode.js
//  DESC:      Node class
//

"use strict";

import * as defs from '../common/defs';

export class iNode
{
    constructor( id, parentId )
    {
        // Node type
        this.type = defs.ENT_NULL;

        // node id
        this.id = id;

        // parent node id
        this.parentId = parentId;

        // Node name
        this.name = '';
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return this.id;
    }

    // 
    //  DESC: Set the id
    //
    setId()
    {
    }
    
    // 
    //  DESC: Get the parent id
    //
    getParentId()
    {
        return this.parentId;
    }
    
    // 
    //  DESC: Get the next node
    //
    next()
    {
        return null;
    }
    
    // 
    //  DESC: Push back node into array
    //
    findParent()
    {
        return null;
    }

    // 
    //  DESC: Find the child
    //
    findChild()
    {
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
}
