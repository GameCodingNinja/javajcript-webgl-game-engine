
// 
//  FILE NAME: easingfunc.js
//  DESC:      Class for holding easing scripts
//

"use strict";
import { highResTimer } from './highresolutiontimer';

// 
//  DESC: linear
//
export function getLinear()
{
    return (time) => { return time; };
}

// 
//  DESC: Pow functions - default parameter, 2, 3, 4, 5
//
export function getPowIn( pow )
{
    return (time) => { return Math.pow( time, pow ); }
}

export function getPowOut( pow )
{
    return (time) => { return 1-Math.pow( 1-time, pow ); }
}

export function getPowInOut( pow )
{
    return (time) =>
        {
            if( (time *= 2) < 1 )
                return 0.5 * Math.pow(time, pow);

            return 1-0.5 * Math.abs( Math.pow( 2-time, pow ) );
        }
}

// 
//  DESC: Sine functions
//
export function getSineIn()
{
    return (time) => 1-Math.cos( time * Math.PI/2 );
}

export function getSineOut()
{
    return (time) => Math.sin( time * Math.PI/2 );
}

export function getSineInOut()
{
    return (time) => -0.5 * ( Math.cos( Math.PI * time )-1 );
}

// 
//  DESC: Back functions - default parameter, 1.7
//
export function getBackIn( amount )
{
    return (time) => { return time * time * ((amount + 1) * time - amount); }
}

export function getBackOut( amount )
{
    return (time) => { return (--time * time * ((amount + 1) * time + amount) + 1); }
}

export function getBackInOut( amount )
{
    amount *= 1.525;
    
    return (time) =>
        {
            if( (time *= 2) < 1 )
                return 0.5 * (time * time * ((amount + 1) * time-amount));

            return 0.5*((time -= 2) * time * ((amount + 1) * time + amount) + 2);
        }
}

// 
//  DESC: Circle functions
//
export function getCircleIn()
{
    return (time) => { return -(Math.sqrt(1 - time * time) - 1); }
}

export function getCircleOut()
{
    return (time) => { return Math.sqrt(1-(--time) * time); }
}

export function getCircleInOut()
{
    return (time) =>
        {
            if( (time *= 2) < 1 )
                return -0.5 * (Math.sqrt(1 - time * time) - 1);

            return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);
        }
}

// 
//  DESC: Bounce functions
//
function bounce( time )
{
    if( time < 1 / 2.75 )
    {
        return (7.5625 * time * time);
    }
    else if( time < 2 / 2.75)
    {
        return (7.5625 * (time -= 1.5/2.75) * time + 0.75);
    }
    else if( time < 2.5 / 2.75 )
    {
        return (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375);
    }
    else
    {
        return (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375);
    }
}

export function getBounceIn()
{
    return (time) => { return 1 - bounce( 1 - time ); }
}

export function getBounceOut()
{
    return (time) => { return bounce( time ); }
}

export function getBounceInOut()
{
    return (time) =>
        {
            if( time < 0.5 )
                return bounce( time * 2 ) * 0.5;

            return bounce( time * 2-1 ) * 0.5 + 0.5;
        }
}

// 
//  DESC: Elastic functions - default parameter, 1, 0.3
//
export function getElasticIn( amplitude, period )
{
    var pi2 = Math.PI * 2;
    return (time) =>
        { 
            if( time == 0 || time == 1 )
                return time;
            
            let s = period / pi2 * Math.asin(1 / amplitude);
            return -(amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time - s) * pi2 / period));
        }
}

export function getElasticOut( amplitude, period )
{
    var pi2 = Math.PI * 2;
    return (time) =>
        {
            if( time == 0 || time == 1 )
                return time;
            
            let s = period / pi2 * Math.asin(1 / amplitude);
            return (amplitude * Math.pow(2, -10 * time) * Math.sin((time - s) * pi2 / period )+1);
        }
}

export function getElasticInOut( amplitude, period )
{
    var pi2 = Math.PI * 2;
    return (time) =>
        {
            if( time == 0 || time == 1 )
                return time;
            
            let s = period / pi2 * Math.asin(1 / amplitude);
            
            if( (time *= 2) < 1)
                return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin( (time - s) * pi2 / period ));
            
            return amplitude * Math.pow( 2, -10 * (time -= 1)) * Math.sin((time - s) * pi2 / period) * 0.5 + 1;
        }
}

//
//  DESC: Easing class for singular value
//
export class valueTo
{
    constructor()
    {
        this.start = 0;
        this.end = 0;
        this.current = 0;
        this.time = 0;
        this.totalTime = 0;
        this.dif = 0;
        this.finished = false;
        this.easingFunc = null;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( start, end, totalTime, easingFunc )
    {
        this.start = start;
        this.end = end;
        this.current = 0.0;
        this.time = 0.0;
        this.totalTime = totalTime;
        this.dif = end - start;
        this.finished = false;
        this.easingFunc = easingFunc;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time += highResTimer.elapsedTime;

        if( this.time < this.totalTime )
            this.current = (this.dif * this.easingFunc( this.time / this.totalTime )) + this.start;
        
        else
            this.finished = true;
    }
    
    // 
    //  DESC: Get the current value
    //
    getValue()
    {
        if( this.finished )
            return this.end;
        else
            return this.current;
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}