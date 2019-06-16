
// 
//  FILE NAME: spritenodemultilist.js
//  DESC:      Sprite node multi link list class
//

"use strict";

import { NodeMultiLst } from './nodemultilist';
import { Sprite } from '../sprite/sprite';
import * as defs from '../common/defs';

export class SpriteNodeMultiLst extends NodeMultiLst
{
    constructor(
        objectData,
        spriteId = defs.DEFAULT_ID,
        nodeId = defs.DEFAULT_ID,
        parentId = defs.DEFAULT_ID )
    {
        super( nodeId, parentId );
        
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
    //  DESC: Get the node id
    //
    getId()
    {
        return this.sprite.id;
    }

    // 
    //  DESC: Set the id
    //
    setId( id )
    {
        this.sprite.id = id;
    }
    
    // 
    //  DESC: Set the AI.
    //
    setAI( ai )
    {
        this.sprite.setAI( ai );
    }
    
    // 
    //  DESC: Clean up any sprites
    //
    cleanUp()
    {
        this.sprite.cleanUp();
    }
}
