
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

        // Next node to avoid garbage collection
        this.nextNode = null;

        // Result node to avoid garbage collection
        this.resultNode = null;
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
        if( this.index < this.nodeAry.length )
        {
            return this.nodeAry[this.index++];
        }
        
        return null;
    }
    
    // 
    //  DESC: Add a node
    //
    addNode( node )
    {
        // Call a recursive function to find the parent node
        this._parentNode = this.findParent( node );

        if( this._parentNode != null )
        {
            // Set the parent node
            node.parentNode = this._parentNode;

            // Add the node
            this._parentNode.pushNode( node );

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
        this.resultNode = null;

        if( searchNode != null )
        {
            if( this.nodeId == searchNode.parentId )
            {
                this.resultNode = this;
            }
            else
            {
                this.index = 0;

                do
                {
                    // get the next node
                    this.nextNode = this.next();

                    if( this.nextNode != null )
                    {
                        // Call a recursive function to find the parent node
                        this.resultNode = this.nextNode.findParent( searchNode );
                    }
                }
                while( this.nextNode !== null && this.resultNode === null );
            }
        }

        return this.resultNode;
    }

    // 
    //  DESC: Reset the tree
    //
    resetTree()
    {
        this.index = 0;
        this.reset();

        do
        {
            // get the next node
            this.nextNode = this.next();

            if( this.nextNode != null )
            {
                // Call a recursive function to reset the node
                this.nextNode.resetTree();
            }
        }
        while( this.nextNode !== null );
    }

    // 
    //  DESC: Init the tree
    //
    initTree()
    {
        this.index = 0;
        this.init();

        do
        {
            // get the next node
            this.nextNode = this.next();

            if( this.nextNode != null )
            {
                // Call a recursive function to reset the node
                this.nextNode.initTree();
            }
        }
        while( this.nextNode !== null );
    }

    // 
    //  DESC: Find the child
    //
    findChild( childName )
    {
        this.resultNode = null;

        if( childName == this.name )
        {
            this.resultNode = this;
        }
        else
        {
            this.index = 0;

            do
            {
                // get the next node
                this.nextNode = this.next();

                if( this.nextNode != null )
                {
                    // Call a recursive function to find the parent node
                    this.resultNode = this.nextNode.findChild( childName );
                }
            }
            while( this.nextNode !== null && this.resultNode === null );
        }

        return this.resultNode;
    }
}
