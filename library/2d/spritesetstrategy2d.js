
// 
//  FILE NAME: spritesetstrategy2d.js
//  DESC:      Symbol set view strategy
//

"use strict";

import { SetStrategy } from '../common/setstrategy';
import { SpriteSet2D } from '../2d/spriteset2d';

export class SpriteSetStrategy2D extends SetStrategy
{
    constructor()
    {
        super();

    }
    
    //
    //  DESC: Allocate the set data
    //
    allocateSet()
    {
        return new SpriteSet2D;
    }
}
