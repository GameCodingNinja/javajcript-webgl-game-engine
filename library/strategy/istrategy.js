
// 
//  FILE NAME: istrategy.js
//  DESC:      Strategy Interface Class
//

"use strict";

export class iStrategy
{
    constructor()
    {
    }
    
    //
    //  DESC: Create the sprite
    //        Empty function to be overwritten
    //
    create( dataName, instanceName = null )
    {
        throw new Error( `This strategy does not support dynamic node creation!` );
    }
}
