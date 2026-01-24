
// 
//  FILE NAME: highresolutiontimer.js
//  DESC:      high resolution timer class
//

"use strict";

class HighResTimer
{
    constructor()
    {
        // Last recorded time
        this.lastTime = performance.now();

        // Timer time
        this.timer;

        // The amount of time that has elapsed between frames
        this.elapsedTime;

        // The frames per second
        this.fps;
    }
    
    //
    //  DESC: Simple timer start
    //
    timerStart()
    {
        // Get the current performance time
        this.timer = performance.now();
    }

    //
    //  DESC: Simple timer duration
    //
    timerStop()
    {
        // Get the elapsed time
        return (performance.now() - this.timer);
    }
    
    //
    //  DESC: Calc the elapsed time
    //
    calcElapsedTime()
    {
        // Get the current performance time
        this._time = performance.now();

        // Set the elapsed time
        this.elapsedTime = this._time - this.lastTime;

        // Catch any hickups - cap to about 10 fps
        // Elapsed time is not expected to get this 
        // high in a game which is why it's capped
        if( this.elapsedTime > 100.0 )
            this.elapsedTime = 100.0;
        
        // Prevent division by zero (clamp to minimum)
        else if( this.elapsedTime < 0.0001 )
            this.elapsedTime = 0.0001;

        // Set the fps (after clamping)
        this.fps = 1000.0 / this.elapsedTime;

        // Reset the last time
        this.lastTime = this._time;
    }
}

export var highResTimer = new HighResTimer;
