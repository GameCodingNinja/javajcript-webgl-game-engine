
// 
//  FILE NAME:  size.js
//  DESC:       size class
//

"use strict";

export class Size
{
    constructor( w = 0, h = 0 )
    {
        if(w instanceof Size)
        {
            this.w = w.w;
            this.h = w.h;
        }
        else
        {
            this.w = w;
            this.h = h;
        }
    }
    
    // 
    //  Copy the data
    //
    copy( size )
    {
        this.w = size.w;
        this.h = size.h;
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.w = 0;
        this.h = 0;
    }
    
    // 
    //  Set the size data
    //
    set( w = 0, h = 0 )
    {
        this.w = w;
        this.h = h;
    }
    
    // 
    //  DESC: Does this size not have any data?
    //
    isEmpty()
    {
        if( (this.w == 0) && (this.h == 0) )
            return true;
        
        return false;
    }

    // 
    //  DESC: Is this size equil
    //
    isEqual( w = 0, h = 0 )
    {
        if(w instanceof Size)
        {
            if( this.w === w.w )
            {
                if( this.h === w.h )
                {
                    return true;
                }
            }
        }
        else
        {
            if( this.w === w )
            {
                if( this.h === h )
                {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // 
    //  DESC: Round out the floating point number
    //
    round()
    {
        this.w = Math.round(this.w);
        this.h = Math.round(this.h);
    }

    // 
    //  DESC: Get the squared length of the size from the origin
    //
    getLengthSquared()
    {
        return ( this.w * this.w ) +  ( this.h * this.h );
    }

    // 
    //  DESC: Get the length of the size from the origin
    //
    getLength()
    {
        return Math.sqrt( this.getLengthSquared() );
    }

    // 
    //  DESC: Return a value for this class that can be compared
    //
    valueOf()
    {
        return (Math.trunc(this.w) * 100000) + Math.trunc(this.h)
    }
    
    // 
    //  DESC: Access members as UV data
    //
    set u(value) { this.w = value; }
    get u() { return this.w; }
    
    set v(value) { this.h = value; }
    get v() { return this.h; }
}
