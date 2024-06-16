
// 
//  FILE NAME: inode.js
//  DESC:      Node class
//

"use strict";

import * as defs from '../common/defs';

export class iNode
{
    constructor( nodeData )
    {
        // Parent node
        this.parentNode = null;
        
        // Node type
        this.type = defs.ENT_NULL;

        // user id
        this.userId = defs.DEFAULT_ID;

        // node id
        this.nodeId = nodeData.nodeId;

        // parent node id
        this.parentId = nodeData.parentId;

        // Node name
        this.name = '';

        // The node data
        this.nodeData = nodeData;
    }

    // 
    //  DESC: Only called after node creation
    //
    init()
    {
        // Empty by design
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
    //  DESC: Reset the node
    //
    reset()
    {
        // Empty by design
    }

    // 
    //  DESC: Reset the tree
    //
    resetTree()
    {
        // Empty by design
    }

    // 
    //  DESC: Is this a child node
    //
    isChild()
    {
        if(this.parentId == defs.DEFAULT_ID)
            return false;

        return true;
    }

    // 
    //  DESC: Is this a Parent node
    //
    isParent()
    {
        return false;
    }

    // 
    //  DESC: Get the object
    //
    get()
    {
        return null;
    }
}
