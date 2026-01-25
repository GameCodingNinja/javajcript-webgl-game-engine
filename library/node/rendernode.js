
// 
//  FILE NAME: rendernode.js
//  DESC:      Node multi link list class
//             NOTE: Recursive functions can't call inherited/abstract functions. Must call concrete functions or it will restart the loop
//

"use strict";

import { Node } from './node';

export class RenderNode extends Node
{
    constructor( nodeData)
    {
        super( nodeData );
        this.useSizeForRadiusCalc = nodeData.useSizeForRadiusCalc;
    }

    // 
    //  DESC: Only called after node creation with all it's children
    //
    init()
    {
        // Calculate the radius for funtrum culling and collision detection
        this.calcRadius();

        // Prepare any script functions that are flagged to prepareOnInit
        this.prepareScriptOnInit();
    }
    
    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        this.cleanUpRecursive( this );
    }
    
    // 
    //  DESC: Recursive function to clean up nodes
    //
    cleanUpRecursive( node )
    {
        if( node !== null )
        {
            node.index = 0;

            do
            {
                // get the next node
                node.nextNode = node.next();

                if( node.nextNode !== null )
                {
                    if(node.nextNode.isLeaf())
                    {
                        // Let the child leaf node handle the cleanUp
                        node.nextNode.cleanUp();
                    }
                    else
                    {
                        // Clean up the children
                        node.nextNode.get().cleanUp();

                        // Call a recursive function again
                        node.cleanUpRecursive( node.nextNode );
                    }
                }
            }
            while( node.nextNode !== null );
        }
    }
    
    // 
    //  DESC: Update the nodes
    //
    update()
    {
        this.updateRecursive( this );
    }
    
    // 
    //  DESC: Recursive function to update nodes
    //
    updateRecursive( node )
    {
        if( node !== null )
        {
            node.index = 0;

            do
            {
                // get the next node
                node.nextNode = node.next();

                if( node.nextNode !== null )
                {
                    if(node.nextNode.isLeaf())
                    {
                        // Let the child leaf node handle the update
                        node.nextNode.update();
                    }
                    else
                    {
                        // Update the child
                        node.nextNode.get().update();
                        node.nextNode.get().physicsUpdate();

                        // Call a recursive function again
                        node.updateRecursive( node.nextNode );
                    }
                }
            }
            while( node.nextNode !== null );
        }
    }

    // 
    //  DESC: Transform the nodes
    //
    transform()
    {
        this.transformRecursive( this );
    }
    
    // 
    //  DESC: Recursive function to transform nodes
    //
    transformRecursive( node )
    {
        if( node !== null )
        {
            node.index = 0;

            do
            {
                // get the next node
                node.nextNode = node.next();

                if( node.nextNode !== null )
                {
                    if(node.nextNode.isLeaf())
                    {
                        // Let the child leaf node handle the transform
                        node.nextNode.transform( node.get() );
                    }
                    else
                    {
                        // Transform the child node
                        node.nextNode.get().transform( node.get() );

                        // Call a recursive function again
                        node.transformRecursive( node.nextNode );
                    }
                }
            }
            while( node.nextNode !== null );
        }
    }
    
    //
    //  DESC: Render the sprite
    //
    render( camera )
    {
        this.renderRecursive( this, camera );
    }
    
    //
    //  DESC: Render the spritecalcRadius
    //
    renderRecursive( node, camera )
    {
        if( node !== null )
        {
            node.index = 0;

            do
            {
                // get the next node
                node.nextNode = node.next();

                if( node.nextNode !== null )
                {
                    if(node.nextNode.isLeaf())
                    {
                        // Let the child leaf node handle the render
                        node.nextNode.render( camera );
                    }
                    else
                    {
                        if( node.nextNode.get().render( camera ) )
                        {
                            // Call a recursive function again
                            node.renderRecursive( node.nextNode, camera );
                        }
                    }
                }
            }
            while( node.nextNode !== null );
        }
    }

    // 
    //  DESC: Calculate the head node radius
    //
    calcRadius( size )
    {
        this.calcRadiusRecursive( this, size );
    }

    // 
    //  DESC: Calculate the head node radius
    //
    calcRadiusRecursive( node, size )
    {
        if( node !== null )
        {
            node.index = 0;

            do
            {
                // get the next node
                node.nextNode = node.next();

                if( node.nextNode !== null )
                {
                    //console.log(nextNode.name);
                    node.nextNode.calcSize( size );

                    // Calculate the radius in squared space. Avoids having to use sqrt
                    node.nextNode.radius = node.nextNode.get().getSize().getLength() / 2;

                    // Call a recursive function again
                    node.calcRadiusRecursive( node.nextNode, size );
                }
            }
            while( node.nextNode !== null );
        }
    }

    // 
    //  DESC: Adjust the size based on the object
    //
    calcSize( size )
    {
        if( this.useSizeForRadiusCalc )
        {
            let vSize = this.get().getSize();
            if( vSize )
            {
                if( vSize.w > size.w )
                    size.w = vSize.w;

                if( vSize.h > size.h )
                    size.h = vSize.h;
            }
        }
    }

    // 
    //  DESC: Prepare any script functions that are flagged to prepareOnInit
    //
    prepareScriptOnInit()
    {
        this.prepareScriptOnInitRecursive( this );
    }

    // 
    //  DESC: Prepare any script functions that are flagged to prepareOnInit
    //
    prepareScriptOnInitRecursive( node )
    {
        if( node !== null )
        {
            node.index = 0;
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode !== null )
                {
                    nextNode.get().prepareScriptOnInit();

                    // Call a recursive function again
                    this.prepareScriptOnInitRecursive( nextNode );
                }
            }
            while( nextNode !== null );
        }
    }
}
