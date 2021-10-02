
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
        let time = performance.now();

        // Set the elapsed time
        this.elapsedTime = time - this.lastTime;

        // Set the fps
        this.fps = 1000.0 / this.elapsedTime;

        // Catch any hickups - cap to about 10 fps
        // Elapsed time is not expected to get this 
        // high in a game which is why it's capped
        if( this.elapsedTime > 100.0 )
            this.elapsedTime = 100.0;

        // Reset the last time
        this.lastTime = time;
    }
}

export var highResTimer = new HighResTimer;
