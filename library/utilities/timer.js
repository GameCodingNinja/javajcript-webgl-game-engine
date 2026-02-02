
// 
//  FILE NAME: timer.js
//  DESC:      timer class
//

"use strict";

export class Timer
{
    constructor( interval = 0, startExpired = false )
    {
        // Expired time
        this.expiredTime = false;

        // time interval
        this.timeInterval = interval;

        // Disabled flag
        this.disabled = false;

        // Disabled return value.
        // This value allows a disabled timer to act as expired or not
        this.disableValue = false;

        // Last time recorded
        this.lastTime = performance.now();

        // Flag to pause timer
        this.isPaused = false;
        
        if( startExpired )
            this.setExpired();
        else
            this.reset();
    }

    //
    //  DESC: Pause the timer
    //
    pause()
    {
        if(!this.isPaused && !this.disabled)
        {
            this.isPaused = true;
            this.expiredTime += performance.now() - this.lastTime;
        }
    }

    //
    //  DESC: Resume the timer
    //
    resume()
    {
        if(this.isPaused && !this.disabled)
        {
            this.isPaused = false;
            this.lastTime = performance.now();
        }
    }
    
    //
    //  DESC: Reset the timer to start over
    //
    reset( interval = null )
    {
        if( interval )
            this.timeInterval = interval;

        this.expiredTime = 0;
        this.disabled = false;
        this.lastTime = performance.now();
    }

    //
    //  DESC: Set the time to have expired
    //
    setExpired()
    {
        this.expiredTime = this.timeInterval;
    }

    //
    //  DESC: Set the timer interval
    //
    set( interval )
    {
        this.timeInterval = interval;
        this.reset();
    }

    //
    //  DESC: Has the timer expired?
    //
    expired( resetOnExpire = false, disableOnExpire = false )
    {
        // Has the timer been disabled
        if( this.disabled )
            return this.disableValue;

        this._result = false;

        if( !this.isPaused )
        {
            this._currentTime = performance.now();
            this.expiredTime += this._currentTime - this.lastTime;
            this.lastTime = this._currentTime;

            if( this.expiredTime > this.timeInterval )
            {
                this._result = true;

                if( resetOnExpire )
                    this.reset();

                if( disableOnExpire )
                    this.disabled = disableOnExpire;
            }
        }

        return this._result;
    }

    //
    //  DESC: Get the elapsed time
    //
    getElapsedTime()
    {
        this._currentTime = performance.now();
        this.expiredTime += this._currentTime - this.lastTime;
        this.lastTime = this._currentTime;

        if( this.expiredTime > this.timeInterval )
            return this.timeInterval;

        return this.expiredTime;
    }

    //
    //  DESC: Disable this timer
    //
    disable( disabled = true )
    {
        this.disabled = disabled;
    }

    //
    //  DESC: Set the value returned by Expired when the timer is disabled
    //
    setDisableValue( disableValue )
    {
        this.disableValue = disableValue;
    }
}
