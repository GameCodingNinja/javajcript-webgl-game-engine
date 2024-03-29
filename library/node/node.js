
// 
//  FILE NAME: node.js
//  DESC:      Node class
//

"use strict";

import { iNode } from './inode';

export class Node extends iNode
{
    constructor( nodeData )
    {
        super( nodeData );
        
        // Child node array
        this.nodeAry = [];
        
        // Child node index
        this.index = 0;
    }

    // 
    //  DESC: Is this a Parent node
    //
    isParent()
    {
        if(this.nodeAry.length)
            return true;

        return false;
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

        if( parentNode != null )
        {
            // Set the parent node
            node.parentNode = parentNode;

            // Add the node
            parentNode.pushNode( node );

            return true;
        }

        return false;
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
    //  DESC: Reset the tree
    //
    resetTree()
    {
        this.index = 0;
        let nextNode = null;
        this.reset();

        do
        {
            // get the next node
            nextNode = this.next();

            if( nextNode != null )
            {
                // Call a recursive function to reset the node
                nextNode.resetTree();
            }
        }
        while( nextNode !== null );
    }

    // 
    //  DESC: Init the tree
    //
    initTree()
    {
        this.index = 0;
        let nextNode = null;
        this.init();

        do
        {
            // get the next node
            nextNode = this.next();

            if( nextNode != null )
            {
                // Call a recursive function to reset the node
                nextNode.initTree();
            }
        }
        while( nextNode !== null );
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
