
// 
//  FILE NAME: symbolposition.js
//  DESC:      Class for holding the symbol position on the reel strip
//

"use strict";

export class SymbolPosition
{
    constructor( reel, pos )
    {
        // Reel index
        this.reel = reel;

        // Symbol position
        this.pos = pos;
    }
}
