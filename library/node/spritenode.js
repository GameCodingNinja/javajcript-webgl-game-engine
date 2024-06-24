
// 
//  FILE NAME: spritenode.js
//  DESC:      Sprite node that allows for children
//

"use strict";

import { RenderNode } from './rendernode';
import { Sprite } from '../sprite/sprite';
import { Size } from '../common/size';
import * as defs from '../common/defs';

export class SpriteNode extends RenderNode
{
    constructor( objectData, nodeData )
    {
        super( nodeData );
        
        this.name = nodeData.nodeName;
        this.sprite = new Sprite( objectData, this );
        this.type = defs.ENT_SPRITE;
        this.userId = nodeData.userId;
    }

    // 
    //  DESC: Reset the sprite node
    //
    reset()
    {
        this.sprite.reset( this.nodeData.xmlNode );
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.sprite.handleEvent( event );
    }
    
    // 
    //  DESC: Update the sprite
    //
    update()
    {
        this.sprite.update();
        this.sprite.physicsUpdate();
        
        // Call the parent but it has to be last
        super.update();
    }
    
    //
    //  DESC: Transform the sprite
    //
    transform( object )
    {
        if( object )
            this.sprite.transform( object );
        else
            this.sprite.transform();
        
        // Call the parent but it has to be last
        super.transform();
    }
    
    //
    //  DESC: Render the sprite
    //
    render( camera )
    {
        if( this.sprite.render( camera ) )
        {
            // Call the parent but it has to be last
            super.render( camera );
        }
    }
    
    // 
    //  DESC: Get the sprite
    //
    get()
    {
        return this.sprite;
    }
    
    // 
    //  DESC: Clean up any sprites
    //
    cleanUp()
    {
        this.sprite.cleanUp();

        // Call the parent but it has to be last
        super.cleanUp();
    }

    // 
    //  DESC: Calculate the radius
    //
    calcRadius()
    {
        // Allocate a size object to acumulate the size across all the children
        let size = new Size;

        // Get the initial size
        this.calcSize( size );

        // Call the recursive function to acumulate the size across all the children
        super.calcRadius( size );

        // Calculate the radius in squared space. Avoids having to use sqrt
        this.radius = size.getLength() / 2;
    }
}
