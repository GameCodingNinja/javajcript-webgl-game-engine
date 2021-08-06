
// 
//  FILE NAME:  genericevent.js
//  DESC:       class for holding a generic event
//

"use strict";

export class GenericEvent
{
    constructor( _type, ...args )
    {
        this.type = _type;
        this.arg = args[0];
    }
}
