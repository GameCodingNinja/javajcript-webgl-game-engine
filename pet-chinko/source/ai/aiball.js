
// 
//  FILE NAME: aiball.js
//  DESC:      Class for ball ai
//

"use strict";

import { iaiBase } from '../../../library/common/iaibase';
import { strategyManager } from '../../../library/strategy/strategymanager';

export class aiBall extends iaiBase
{
    constructor( node )
    {
        super();
        
        this.node = node;
        this.sprite = node.sprite;
        
        this.strategy = strategyManager.get( '_level-1-ball_' );
    }
    
    // 
    //  DESC: Do the update
    //
    update()
    {
        if( this.sprite.pos.y < -600 )
            this.strategy.destroy( this.node );
    }
}
