
// 
//  FILE NAME: nodemultilist.js
//  DESC:      Node multi link list class
//

"use strict";

import { Node } from './node';
import * as defs from '../common/defs';

export class NodeMultiLst extends Node
{
    constructor( id = defs.DEFAULT_ID, parentId = defs.DEFAULT_ID )
    {
        super( id, parentId )
        
        // List of all nodes.
        // This is only used by the head node and even though
        // every node will have one of these, it simplifies the code
        this.allNodeMap = null
    }
    
    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        this.cleanUpRecursive( this );
        
        this.resetIndexes();
    }
    
    // 
    //  DESC: Recursive function to update nodes
    //
    cleanUpRecursive( node )
    {
        if( node !== null )
        {
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode !== null )
                {
                    // Update the children
                    if( nextNode.getSprite() !== null )
                        nextNode.getSprite().cleanUp();

                    // Call a recursive function again
                    this.updateRecursive( nextNode );
                }
            }
            while( nextNode !== null );
        }
    }
    
    // 
    //  DESC: Update the nodes
    //
    update()
    {
        this.updateRecursive( this );
        
        this.resetIndexes();
    }
    
    // 
    //  DESC: Recursive function to update nodes
    //
    updateRecursive( node )
    {
        if( node !== null )
        {
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode !== null )
                {
                    // Update the children
                    if( nextNode.getSprite() !== null )
                    {
                        nextNode.getSprite().physicsUpdate();
                        nextNode.getSprite().update();
                    }

                    // Call a recursive function again
                    this.updateRecursive( nextNode );
                }
            }
            while( nextNode !== null );
        }
    }

    // 
    //  DESC: Transform the nodes
    //
    transform()
    {
        this.transformRecursive( this );
        
        this.resetIndexes();
    }
    
    // 
    //  DESC: Recursive function to transform nodes
    //
    transformRecursive( node )
    {
        if( node !== null )
        {
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode != null )
                {
                    let nextObj = null;
                    let obj = null;

                    if( nextNode.getSprite() !== null )
                        nextObj = nextNode.getSprite().object;

                    else if( nextNode.getObject() !== null )
                        nextObj = nextNode.getObject();

                    if( node.getSprite() !== null )
                        obj = node.getSprite().object;

                    else if( node.getObject() !== null )
                        obj = node.getObject();

                    // Transform the child node
                    nextObj.transform( obj );

                    // Call a recursive function again
                    this.transformRecursive( nextNode );
                }
            }
            while( nextNode !== null );
        }
    }
    
    //
    //  DESC: Render the sprite
    //
    render( camera )
    {
        this.renderRecursive( this, camera );
        
        this.resetIndexes();
    }
    
    //
    //  DESC: Render the sprite
    //
    renderRecursive( node, camera )
    {
        if( node !== null )
        {
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode != null )
                {
                    if( nextNode.getSprite() !== null )
                        nextNode.getSprite().render( camera );

                    // Call a recursive function again
                    this.renderRecursive( nextNode, camera );
                }
            }
            while( nextNode !== null );
        }
    }
    
    // 
    //  DESC: Get the next node
    //
    addNode( node, nodeName )
    {
        // This ensures the map is only allocated for the head node
        if( this.allNodeMap === null )
            this.allNodeMap = new Map;
        
        // If a name is not given, generate one for the map
        let name;
        if( nodeName )
            name = nodeName
        else
            name = `blank_${this.allNodeMap.size}`;
        
        // Check for duplicate names
        if( this.allNodeMap.has( name ) )
            throw new Error( `Duplicate node name (${name})!` );
        
        // Add the node to the map
        this.allNodeMap.set( name, node );
        
        let result = super.addNode( node );
        
        this.resetIndexes();
        
        return result;
    }
    
    // 
    //  DESC: Reset the indexes
    //
    resetIndexes()
    {
        super.reset();
        
        for( let node of this.allNodeMap.values() )
            node.reset();
    }
}
