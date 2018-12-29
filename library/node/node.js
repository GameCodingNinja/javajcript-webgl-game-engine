
// 
//  FILE NAME: node.js
//  DESC:      Node class
//

"use strict";

import { iNode } from './inode';
import * as defs from '../common/defs';

export class Node extends iNode
{
    constructor( id, parentId )
    {
        super();
        
        // Child node array
        this.nodeAry = [];
        
        // Child node index
        this.index = 0;
        
        // node id
        this.id = id;

        // parent node id
        this.parentId = parentId;
    }
    
    // 
    //  DESC: Get the next node
    //
    next()
    {
        let result = null;
        
        if( this.index < this.nodeAry.length )
        {
            result = this.nodeAry[this.index];
            this.index++;
        }
        
        return result;
    }
    
    // 
    //  DESC: Add a node
    //
    addNode( node )
    {
        // Call a recursive function to find the parent node
        let parentNode = this.findParent( node );

        // Add the node
        if( parentNode != null )
            parentNode.pushNode( node );
        else
            return false;

        return true;
    }
    
    // 
    //  DESC: Push back node into array
    //
    pushNode( node )
    {
        this.nodeAry.push( node );
    }
    
    // 
    //  DESC: Push back node into array
    //
    findParent( searchNode )
    {
        let result = null;

        if( searchNode != null )
        {
            if( this.id == searchNode.getParentId() )
            {
                result = this;
            }
            else
            {
                let nextNode;

                do
                {
                    // get the next node
                    nextNode = this.next();

                    if( nextNode != null )
                    {
                        // Call a recursive function to find the parent node
                        result = nextNode.findParent( searchNode );
                    }
                }
                while( nextNode != null );
            }
        }

        return result;
    }
    
    // 
    //  DESC: Get the parent id
    //
    getParentId()
    {
        return this.parentId;
    }

    // 
    //  DESC: Reset the index
    //
    reset()
    {
        this.index = 0;
    }
}
