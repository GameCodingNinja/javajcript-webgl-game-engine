
// 
//  FILE NAME: bitmask.js
//  DESC:      Class to handle a bit mask
//

"use strict";

export class BitMask
{
    constructor( value = 0 )
    {
        this.bitmask = value;
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.bitmask = 0;
    }
    
    // 
    //  DESC: Add the parameters to the bitmask
    //
    add( args )
    {
        this.bitmask |= args;
    }

    // 
    //  DESC: Remove the parameters from the bitmask
    //
    remove( args )
    {
        this.bitmask &= args ^ -1;
    }

    // 
    //  DESC: Remove all parameters except for the ones passed in
    //
    removeAllExcept( args )
    {
        this.bitmask &= args;
    }
    
    // 
    //  DESC: Check if all of the parameters are set
    //
    isEmpty()
    {
        return (this.bitmask === 0);
    }

    // 
    //  DESC: Check if one of the parameters is set
    //
    isSet( args )
    {
        return (this.bitmask & args) !== 0;
    }

    // 
    //  DESC: Check if all of the parameters are set
    //
    areAllSet( args )
    {
        return (this.bitmask & args) === args;
    }

    // 
    //  DESC: Get a copy of the bitmask including the parameters
    //
    getIncluding( args )
    {
        return this.bitmask | args;
    }

    // 
    //  DESC: Get a copy of the bitmask excluding the parameters
    //
    getExcluding( args )
    {
        return this.bitmask & (args ^ -1);
    }
}
    


