
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
        super( nodeData.nodeId, nodeData.parentNodeId );
        
        this.name = nodeData.nodeName;
        this.sprite = new Sprite( objectData, this );
        this.type = defs.ENT_SPRITE;
        this.userId = nodeData.userId;
        this.baseXmlNode = nodeData.baseXmlNode;

        // Init the AABB if one is defined
        this.initAABB( nodeData.baseXmlNode );
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

        // Transform the AABB
        if( this.AABBrect && this.enableAABB )
            this.sprite.matrix.transformRect( this.AABBtrans, this.AABBrect );
        
        // Call the parent but it has to be last
        super.transform();
    }
    
    //
    //  DESC: Render the sprite
    //
    render( camera )
    {
        this.sprite.render( camera );
        
        // Call the parent but it has to be last
        super.render( camera );
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
    //  NOTE: The head node does not have a size
    //
    calcRadius( size )
    {
        let headNode = false;
        if( !size )
        {
            size = new Size;
            headNode = true;
        }

        this.calcSize( size );
        super.calcRadius( size );

        // The head node gets the accumulated size of all the sprites
        if( headNode )
            this.radius = size.getLength() / 2;
        else
            this.radius = this.sprite.getSize().getLength() / 2;
    }
}
