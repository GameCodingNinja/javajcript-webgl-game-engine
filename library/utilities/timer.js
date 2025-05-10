
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
        
        if( startExpired )
            this.setExpired();
        else
            this.reset();
    }
    
    //
    //  DESC: Reset the timer to start over
    //
    reset( interval = null )
    {
        if( interval )
            this.timeInterval = interval;

        this.expiredTime = this.timeInterval + performance.now();
        this.disabled = false;
    }

    //
    //  DESC: Set the time to have expired
    //
    setExpired()
    {
        this.expiredTime = performance.now();
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
    expired( resetOnExpire = false )
    {
        // Has the timer been disabled
        if( this.disabled )
            return this.disableValue;

        let result = false;

        if( performance.now() > this.expiredTime )
        {
            result = true;

            if( resetOnExpire )
                this.reset();
        }

        return result;
    }

    //
    //  DESC: Get the elapsed time
    //
    getElapsedTime()
    {
        if(performance.now() > this.expiredTime)
            return this.timeInterval;

        return this.expiredTime - performance.now();
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
