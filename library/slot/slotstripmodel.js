
// 
//  FILE NAME: slotstripmodel.js
//  DESC:      Slot strip model
//

"use strict";

export class SlotStripModel
{
    constructor( mathStripAry, rng, evalSymbIndexAry )
    {
        // Slot strip math symbols
        this.mathStripAry = mathStripAry;

        // Random number generator: Mersenne Twister algorithm
        this.rng = rng;

        // Array of eval indexes on this reel/wheel
        this.evalSymbIndexAry = evalSymbIndexAry;

        // last reel stop
        this.lastStop = 0;

        // reel stop
        this.stop = 0;
        
        // Get the total weight of the slot strip
        this.totalWeight = 0;
        for( let i = 0; i < this.mathStripAry.length; ++i )
            this.totalWeight += this.mathStripAry[i].weight;
    }
    
    //
    //  DESC: Generate the reel stop
    //
    generateStop()
    {
        this.lastStop = this.stop;
        this.stop = 0;
        let weightCount = 0;
        
        let awardedWeight = this.rng.genrand_int32() % (this.totalWeight + 1);
        
        for( let i = 0; i < this.mathStripAry.length; ++i )
        {
            weightCount += this.mathStripAry[i].weight;

            if( awardedWeight <= weightCount )
                break;

            ++this.stop;
        }
    }
    
    //
    //  DESC: Get the math symbol
    //
    getSymbol( stop )
    {
        let index = this.getSymbolIndex( stop );

        return this.mathStripAry[index].mathSymbol;
    }
    
    //
    //  DESC: Get the math symbol
    //
    getSymbolIndex( stop )
    {
        let index = Math.abs(stop) % this.mathStripAry.length;

        if( (stop < 0) && (index != 0) )
            index = this.mathStripAry.length - index;

        return index;
    }
}
