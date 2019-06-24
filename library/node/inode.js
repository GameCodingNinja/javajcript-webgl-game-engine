
// 
//  FILE NAME: inode.js
//  DESC:      Node class
//

"use strict";

import * as defs from '../common/defs';

export class iNode
{
    constructor()
    {
        // Node type
        this.type = defs.ENT_NULL;
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return defs.DEFAULT_ID;
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
        return defs.DEFAULT_ID;
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
    //  DESC: Reset the indexes
    //
    resetIndexes()
    {
        // Empty function by design
    }
    
    // 
    //  DESC: Reset the index
    //
    reset()
    {
        // Empty function by design
    }
    
    // 
    //  DESC: Get the child node
    //
    getChildNode()
    {
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
}
