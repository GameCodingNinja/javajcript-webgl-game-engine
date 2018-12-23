
// 
//  FILE NAME: spritenodemultilist.js
//  DESC:      Sprite node multi link list class
//

"use strict";

import { Node } from './nodemultilist';
import { Sprite } from '../sprite/sprite';
import * as defs from '../common/defs';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';

export class SpriteNodeMultiLst extends NodeMultiLst
{
    constructor( objectData, spriteId = defs.SPRITE_DEFAULT_ID )
    {
        super( spriteId, 0 );
        
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
    }
    
    //
    //  DESC: Transform the sprite
    //
    transform( object )
    {
        if( object )
            this.sprite.object.transform( object.matrix, object.wasWorldPosTranformed() );
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
}
