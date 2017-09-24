
// 
//  FILE NAME: icycleresults.js
//  DESC:      Interface for cycle results animations
//

"use strict";

export class iCycleResults
{
    constructor()
    {
        // Pointer to the play result. NOTE: We don't own this pointer
        this.playResult = null;

        // Pointer to slot group view. NOTE: We don't own this pointer
        this.slotGroupView = null;

        // index into pay
        this.cyclePayCounter = 0;

        // Did we complete one animation cycle of all the pays
        this.firstCycleComplete = false;

        // Cycle results flag
        this.cycleResultsActive = false;
    }
    
    //
    //  DESC: Start the cycle results
    //
    start()
    {
        this.cycleResultsActive = true;
        this.firstCycleComplete = false;
        this.cyclePayCounter = 0;
    }
    
    //
    //  DESC: Stop the cycle results
    //
    stop()
    {
        this.cycleResultsActive = false;
    }
}
