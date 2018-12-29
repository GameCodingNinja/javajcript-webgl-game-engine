
// 
//  FILE NAME: spritenode.js
//  DESC:      Sprite node class for rendering just one sprite
//

"use strict";

import { iNode } from './inode';
import { Sprite } from '../sprite/sprite';
import * as defs from '../common/defs';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';

export class SpriteNode extends iNode
{
    constructor( objectData, spriteId = defs.SPRITE_DEFAULT_ID )
    {
        super();
        
        this.sprite = new Sprite( objectData, spriteId );
        
        // Node type
        this.type = defs.ENT_SPRITE;
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
            this.sprite.object.transform( object );
        else
            this.sprite.object.transform();
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
    getSprite()
    {
        return this.sprite;
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return this.sprite.id;
    }
}
