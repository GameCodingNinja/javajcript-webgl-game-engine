
// 
//  FILE NAME: spritenodemultilist.js
//  DESC:      Sprite node multi link list class
//

"use strict";

import { NodeMultiLst } from './nodemultilist';
import { Sprite } from '../sprite/sprite';
import * as defs from '../common/defs';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';

export class SpriteNodeMultiLst extends NodeMultiLst
{
    constructor( objectData, spriteId = defs.SPRITE_DEFAULT_ID, nodeId = -1, parentId = -1 )
    {
        super( nodeId, parentId );
        
        this.sprite = new Sprite( objectData, spriteId );
        
        // Node type
        this.type = defs.ENT_SPRITE_MULTI_LIST;
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
    transform()
    {
        this.sprite.object.transform();
        
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
    getSprite()
    {
        return this.sprite;
    }
}
