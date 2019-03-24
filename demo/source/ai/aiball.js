
// 
//  FILE NAME: aiball.js
//  DESC:      Class for ball ai
//

"use strict";

import { spriteStrategyManager } from '../../../library/managers/spritestrategymanager';
import { iaiBase2d } from '../../../library/2d/iaibase2d';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

export class aiBall extends iaiBase2d
{
    constructor( sprite )
    {
        super();
        
        this.sprite = sprite;
        
        this.killMsgSent = false;
        
        this.strategy = spriteStrategyManager.get( '(sprite)' );
    }
    
    // 
    //  DESC: Do any initalizing
    //
    init()
    {
    }
    
    // 
    //  DESC: Do the update
    //
    update()
    {
        if( (this.sprite.pos.y < -600) && !this.killMsgSent )
        {
            this.strategy.postCommand( defs.ESSC_DELETE_SPRITE, this.sprite.id );
            this.killMsgSent = true;
        }
    }
}
