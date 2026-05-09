
// 
//  FILE NAME: highresolutiontimer.js
//  DESC:      high resolution timer class
//

"use strict";

// Known hardware refresh rates and their frame times (ms)
const KNOWN_FRAME_TIMES = [
    1000 / 360,  // 2.778ms - 360Hz
    1000 / 240,  // 4.167ms - 240Hz
    1000 / 165,  // 6.061ms - 165Hz
    1000 / 144,  // 6.944ms - 144Hz
    1000 / 120,  // 8.333ms - 120Hz
    1000 / 100,  // 10.00ms - 100Hz
    1000 / 90,   // 11.11ms - 90Hz
    1000 / 75,   // 13.33ms - 75Hz
    1000 / 60    // 16.67ms - 60Hz
];

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

        // Calibrated target frame time (ms) - measured from the display refresh rate
        // Defaults to 60fps until calibration completes
        this.targetFrameTime = 16.667;
        this._inverseTargetFrameTime = 1.0 / 16.667;

        // Calibration state
        this._calibSamples = 0;
        this._calibTotal = 0;
        this._calibCount = 60;
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

        // Time scale factor for frame-rate-independent movement
        this.timeScale = this.elapsedTime * this._inverseTargetFrameTime;

        // Reset the last time
        this.lastTime = this._time;

        // Calibrate the target frame time from the first N frames
        if( this._calibSamples < this._calibCount )
        {
            this._calibTotal += this.elapsedTime;
            this._calibSamples++;

            if( this._calibSamples === this._calibCount )
            {
                this._calibAvg = this._calibTotal / this._calibCount;
                this.targetFrameTime = this._snapToRefreshRate( this._calibAvg );
                this._inverseTargetFrameTime = 1.0 / this.targetFrameTime;
                console.debug( `Display frame time calibrated: ${this._calibAvg.toFixed(2)}ms -> snapped to ${this.targetFrameTime.toFixed(3)}ms (${Math.round(1000 / this.targetFrameTime)}Hz)` );
            }
        }
    }

    //
    //  DESC: Snap a measured frame time to the nearest known hardware refresh rate
    //
    _snapToRefreshRate( measuredMs )
    {
        // Known hardware refresh rates (Hz) and their frame times (ms)
        // 60, 75, 90, 100, 120, 144, 165, 240, 360
        this._bestDiff = Infinity;
        this._bestTime = measuredMs;

        for( this._si = 0; this._si < KNOWN_FRAME_TIMES.length; ++this._si )
        {
            this._diff = Math.abs( measuredMs - KNOWN_FRAME_TIMES[this._si] );
            if( this._diff < this._bestDiff )
            {
                this._bestDiff = this._diff;
                this._bestTime = KNOWN_FRAME_TIMES[this._si];
            }
        }

        return this._bestTime;
    }
}

export var highResTimer = new HighResTimer;
