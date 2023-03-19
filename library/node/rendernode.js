
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
    //  DESC: Only called after node creation
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
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode !== null )
                {
                    // Clean up the children
                    nextNode.get().cleanUp();

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
    }
    
    // 
    //  DESC: Recursive function to update nodes
    //
    updateRecursive( node )
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
                    // Update the child
                    nextNode.get().update();

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
    }
    
    // 
    //  DESC: Recursive function to transform nodes
    //
    transformRecursive( node )
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
                    // Transform the child node
                    nextNode.get().transform( node.get() );

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
    }
    
    //
    //  DESC: Render the spritecalcRadius
    //
    renderRecursive( node, camera )
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
                    if( nextNode.get().render( camera ) )
                    {
                        // Call a recursive function again
                        this.renderRecursive( nextNode, camera );
                    }
                }
            }
            while( nextNode !== null );
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
            let nextNode;

            do
            {
                // get the next node
                nextNode = node.next();

                if( nextNode !== null )
                {
                    //console.log(nextNode.name);
                    nextNode.calcSize( size );

                    // Calculate the radius in squared space. Avoids having to use sqrt
                    nextNode.radius = nextNode.get().getSize().getLength() / 2;

                    // Call a recursive function again
                    this.calcRadiusRecursive( nextNode, size );
                }
            }
            while( nextNode !== null );
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
