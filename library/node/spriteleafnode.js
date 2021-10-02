
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
        super( nodeData.nodeId, nodeData.parentNodeId );
        
        this.name = nodeData.nodeName;
        this.sprite = new Sprite( objectData, this );
        this.type = defs.ENT_SPRITE;
        this.userId = nodeData.userId;
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
    //  DESC: Calculate the radius
    //
    calcRadius( /*size*/ )
    {
        this.radius = this.sprite.getSize().getLength() / 2;
    }
}
