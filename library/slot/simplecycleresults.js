
// 
//  FILE NAME: simplecycleresults.js
//  DESC:      Simple cycle results implementation
//

"use strict";

import { Timer } from '../utilities/timer';
import { iCycleResults } from './icycleresults';

export class SimpleCycleResults extends iCycleResults
{
    constructor()
    {
        super();
        
        // cycle results timer
        this.cycleResultsTimer = new Timer;
    }
    
    //
    //  DESC: Do some inits
    //
    init( slotGroupView, playResult )
    {
        this.slotGroupView = slotGroupView;
        this.playResult = playResult;
    }
    
    //
    //  DESC: Update the cycle results
    //
    update()
    {
        
    }
    
    //
    //  DESC: Activate the cycle results
    //
    activate()
    {
        if( this.playResult.getPayCount() > 0 )
        {
            super.activate();

            this.slotGroupView.generateCycleResultSymbs();
        }
    }
    
    //
    //  DESC: Deactivate the cycle results
    //
    deactivate()
    {
        if( this.cycleResultsActive )
        {
            super.deactivate();
        }
    }

    //
    //  DESC: Start the cycle results animation
    //
    startAnimation()
    {
        if( this.cycleResultsActive )
        {
            if( this.cycleCounter > 0 )
                this.firstCycleComplete = true;
            
            this.cycleResultsTimer.set( 1000 );

            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            this.curPayIndex = this.payCounter;
            this.payCounter = (this.payCounter + 1) % this.playResult.getPayCount();

            let pay = this.playResult.getPay( this.curPayIndex );
            let symbPosAry = pay.symbPosAry;

            // Set them all to a low alphs
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
            {
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                {
                    cycleResultSymbAry[i][j].spriteAry[0].setAlpha( 0.2 );
                }
            }

            // Set only the winners to default color
            for( let i = 0; i < symbPosAry.length; ++i )
            {
                cycleResultSymbAry[symbPosAry[i].reel][symbPosAry[i].pos].spriteAry[0].setDefaultColor();
            }

            this.slotGroupView.setCycleResultText( true, pay );
            
            ++this.cycleCounter;
        }
    }

    //
    //  DESC: Stop the cycle results animation
    //
    stopAnimation()
    {
        if(this.cycleResultsActive )
        {
            this.cycleResultsTimer.setExpired();

            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            // Set it all back to normal
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                    cycleResultSymbAry[i][j].spriteAry[0].setDefaultColor();

            this.slotGroupView.setCycleResultText( false );
        }
    }

    //
    //  DESC: Are we still animating
    //
    isAnimating()
    {
        return !this.cycleResultsTimer.expired();
    }
}
