
// 
//  FILE NAME: node.js
//  DESC:      Node class
//

"use strict";

import { iNode } from './inode';

export class Node extends iNode
{
    constructor( id, parentId )
    {
        super( id, parentId );
        
        // Child node array
        this.nodeAry = [];
        
        // Child node index
        this.index = 0;
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
    //  DESC: Find the parent
    //
    findParent( searchNode )
    {
        let result = null;

        if( searchNode != null )
        {
            if( this.nodeId == searchNode.parentId )
            {
                result = this;
            }
            else
            {
                this.index = 0;
                let nextNode = null;

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
                while( nextNode !== null && result === null );
            }
        }

        return result;
    }

    // 
    //  DESC: Find the child
    //
    findChild( childName )
    {
        let result = null;

        if( childName == this.name )
        {
            result = this;
        }
        else
        {
            this.index = 0;
            let nextNode = null;

            do
            {
                // get the next node
                nextNode = this.next();

                if( nextNode != null )
                {
                    // Call a recursive function to find the parent node
                    result = nextNode.findChild( childName );
                }
            }
            while( nextNode !== null && result === null );
        }

        return result;
    }
}
