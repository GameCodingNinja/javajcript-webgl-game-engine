
// 
//  FILE NAME: statcounter.js
//  DESC:      high resolution timer class
//

"use strict";
import { highResTimer } from './highresolutiontimer';
import { settings } from './settings';
import { Timer } from './timer';

class StatCounter
{
    constructor()
    {
        // Counter for visual objects
        this.vObjCounter = 0;

        // Counter for physics objects
        this.physicsObjCounter = 0;

        // Elapsed time counter
        this.elapsedFPSCounter = 0.0;

        // Stat string
        this.statStr = '';

        // cycle counter. This counter is never reset
        this.cycleCounter = 0;

        // Stats display timer
        this.statsDisplayTimer = new Timer(1000);
    }
    
    //
    //  DESC: Reset the counters
    //
    resetCounters()
    {
        this.vObjCounter = 0;
        this.physicsObjCounter = 0;
        this.elapsedFPSCounter = 0.0;
        this.cycleCounter = 0;
    }

    //
    //  DESC: Have we run through one cycle.
    //
    incCycle()
    {
        if( settings.stats )
        {
            // These counters are incremeented each game loop cycle so they can
            // be placed here in this function because this function is also called
            // each game loop cycle
            this.elapsedFPSCounter += highResTimer.fps;

            ++this.cycleCounter;

            // update the stats every 1 seconds. True = reset on expire
            if( this.statsDisplayTimer.expired(true) )
            {
                this.formatStatString();

                // Now that the stats are displayed, we can reset out counters.
                this.resetCounters();
            }
        }
    }

    //
    //  DESC: Format the stat string
    //
    formatStatString()
    {
        this.statStr = `fps: ${Math.trunc(this.elapsedFPSCounter / this.cycleCounter)}`;
        this.statStr += `, vis: ${Math.trunc(this.vObjCounter / this.cycleCounter)}`;
        this.statStr += `, phy: ${Math.trunc(this.physicsObjCounter / this.cycleCounter)}`;

        console.log(this.statStr);
    }
}

export var statCounter = new StatCounter;
