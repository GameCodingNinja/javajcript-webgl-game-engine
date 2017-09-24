
// 
//  FILE NAME: weightedtable.js
//  DESC:      Class for holding the weighted table
//

"use strict";

import { ValueTable } from './valuetable';

export class WeightedTable extends ValueTable
{
    constructor( totalWeight, weightAry, valueAry )
    {
        super( valueAry );
        
        // total weight
        this.totalWeight = totalWeight;

        // weight
        this.weightAry = weightAry;
    }
    
    //
    //  DESC: Get the value from the weighted table
    //
    getWeightedValue( rngValue )
    {
        let index = 0;
        let weightCount = 0;

        for( let i = 0; i < this.weightAry.length; ++i )
        {
            weightCount += this.weightAry[i];

            if( rngValue <= weightCount )
                break;

            ++index;
        }

        return getValue( index );
    }
}
