
// 
//  FILE NAME: basestrategy.js
//  DESC:      Base strategy class
//

"use strict";

import { iSpriteStrategy } from '../common/ispritestrategy';

export class BaseStrategy extends iSpriteStrategy
{
    constructor( idOffset, idDir )
    {
        // ID Offset for this strategy 
        this.idOffset = idOffset;

        // ID Direction
        this.idDir = idDir;

        // Array of indexes to delete
        this.deleteAry = [];

        // Array of sprites to create
        this.createAry = [];
    }
}
