
// 
//  FILE NAME: spriteleafnode.js
//  DESC:      Sprite node class for handling a sprite with
//             no children to keep the overhead low
//

"use strict";

import { iNode } from './inode';
import { Sprite } from '../sprite/sprite';
import * as defs from '../common/defs';

export class SpriteLeafNode extends iNode
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
    //  DESC: Only called after node creation
    //
    init()
    {
        // Calculate the radius and rect for funtrum culling and collision detection
        this.calcRadius();

        // Prepare any script functions that are flagged to prepareOnInit
        this.sprite.prepareScriptOnInit();
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
    }
    
    //
    //  DESC: Transform the sprite
    //
    transform( object = null )
    {
        if( object )
            this.sprite.transform( object );
        else
            this.sprite.transform();
    }
    
    //
    //  DESC: Render the sprite
    //
    render( camera )
    {
        this.sprite.render( camera );
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
    }

    // 
    //  DESC: Adjust the size based on the object
    //
    calcSize( size )
    {
        let vSize = this.sprite.getSize();
        if( vSize )
        {
            if( vSize.w > size.w )
                size.w = vSize.w;

            if( vSize.h > size.h )
                size.h = vSize.h;
        }
    }

    // 
    //  DESC: Calculate the radius
    //  NOTE: The head node does not have a size
    //
    calcRadius( size = null )
    {
        if( size !== null )
        {
            this.calcSize( size );
        }
        else
        {
            this.radius = this.sprite.getSize().getLength() / 2;
        }
    }
}
