
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
        this.useSizeForRadiusCalc = nodeData.useSizeForRadiusCalc;
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
    //  DESC: Reset the tree
    //
    resetTree()
    {
        this.reset();
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
        if( this.useSizeForRadiusCalc )
        {
            this._size = this.get().getSize();
            if( this._size )
            {
                if( this._size.w > size.w )
                    size.w = this._size.w;

                if( this._size.h > size.h )
                    size.h = this._size.h;
            }
        }
    }

    // 
    //  DESC: Calculate the radius
    //  NOTE: The head node does not have a size
    //
    calcRadius()
    {
        // Calculate the radius in squared space. Avoids having to use sqrt
        this.radius = this.get().getSize().getLength() / 2;
    }

    // 
    //  DESC: Is this a leaf node
    //
    isLeaf()
    {
        return true;
    }
}
