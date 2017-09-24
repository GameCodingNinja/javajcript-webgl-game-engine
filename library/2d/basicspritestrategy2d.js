
// 
//  FILE NAME: basicspritestrategy2d.js
//  DESC:      Basic sprite strategy 2d class
//

"use strict";

import { BaseStrategy } from '../common/basestrategy';

export class BasicSpriteStrategy2D extends BaseStrategy
{
    constructor( idOffset = 0, idDir = 1 )
    {
        super( idOffset, idDir );
    }
}
