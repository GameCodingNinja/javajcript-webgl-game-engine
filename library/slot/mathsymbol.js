
// 
//  FILE NAME: mathsymbol.js
//  DESC:      Class for holding a math symbol
//

"use strict";

export class MathSymbol
{
    constructor( id, wildMatches )
    {
        // Symbol string ID
        this.id = id;

        // ID's of other math symbols that this symbol is wild for
        this.wildMatches = wildMatches;
    }
    
    //
    //  DESC: Is this a wild symbol?
    //
    isWild()
    {
        return (this.wildMatches.length > 0);
    }

    //
    //  DESC: Is wild for this symbol?
    //
    isWildFor( symbolID )
    {
        return (this.wildMatches.indexOf( symbolID ) !== -1);
    }

    //
    //  DESC: Does symbol match?
    //
    isMatch( symbolID )
    {
        return ((this.id === symbolID) || this.isWildFor( symbolID ));
    }

    //
    //  DESC: Is this the same symbol?
    //
    isEquil( symbolID )
    {
        if( this.id == symbolID )
            return true;

        return false;
    }
}
