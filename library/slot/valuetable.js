
// 
//  FILE NAME: valuetable.js
//  DESC:      Class for holding the value table
//

"use strict";

export class ValueTable
{
    constructor( valueAry )
    {
        // value array
        this.valueAry = valueAry;
    }
    
    // 
    //  DESC: Get the value from the value table
    //
    getValue( index )
    {
        return this.valueAry[index];
    }
}
