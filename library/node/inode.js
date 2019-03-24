
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
        return defs.NODE_DEFAULT_ID;
    }
    
    // 
    //  DESC: Get the parent id
    //
    getParentId()
    {
        return defs.PARENT_NODE_DEFAULT_ID;
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
    findParent( searchNode )
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
    getChildNode( nodeName )
    {
        return null;
    }
    
    // 
    //  DESC: Get the sprite
    //
    getControl()
    {
        return null;
    }
    
    // 
    //  DESC: Get the sprite
    //
    getSprite()
    {
        return null;
    }
    
    // 
    //  DESC: Get the object
    //
    getObject()
    {
        return null;
    }
    
    // 
    //  DESC: Set the AI.
    //
    setAI( ai )
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
