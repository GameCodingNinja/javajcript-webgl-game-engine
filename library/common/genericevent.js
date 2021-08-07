
// 
//  FILE NAME:  genericevent.js
//  DESC:       class for holding a generic event
//

"use strict";

export class GenericEvent
{
    constructor( type, ...args )
    {
        this.type = type;
        this.arg = args[0];
    }
}
