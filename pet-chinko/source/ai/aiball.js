
// 
//  FILE NAME: aiball.js
//  DESC:      Class for ball ai
//

"use strict";

import { iaiBase } from '../../../library/common/iaibase';
import { strategyManager } from '../../../library/strategy/strategymanager';

export class aiBall extends iaiBase
{
    constructor( obj )
    {
        super();
        
        this.sprite = obj.sprite;
        
        this.strategy = strategyManager.get( '_level-1_' );
    }
    
    // 
    //  DESC: Do the update
    //
    update()
    {
        if( this.sprite.object.pos.y < -600 )
            this.strategy.destroy( this.sprite.id );
    }
}
