
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

        // pay counter
        this.payCounter = 0;
        
        // cycle counter
        this.cycleCounter = 0;
        
        // Current cycle pay
        this.curPayIndex = 0;

        // Did we complete one animation cycle of all the pays
        this.firstCycleComplete = false;

        // Cycle results flag
        this.cycleResultsActive = false;
    }

    //
    //  DESC: Activate the cycle results
    //
    activate()
    {
        this.cycleResultsActive = true;
        this.firstCycleComplete = false;
        this.payCounter = 0;
        this.cycleCounter = 0;
        this.curPayIndex = 0;
    }
    
    //
    //  DESC: Deactivate the cycle results
    //
    deactivate()
    {
        this.cycleResultsActive = false;
    }
    
    //
    //  DESC: Are we active
    //
    isActive()
    {
        return this.cycleResultsActive;
    }
    
    //
    //  DESC: Are we still animating
    //
    isAnimating()
    {
        return false;
    }
    
    //
    //  DESC: Update the cycle results
    //
    update()
    {
        
    }
    
    //
    //  DESC: Transform the reel strip
    //
    transform( matrix, tranformWorldPos )
    {
        
    }
    
    //
    //  DESC: Do the render
    //
    render( matrix )
    {
        
    }
}
