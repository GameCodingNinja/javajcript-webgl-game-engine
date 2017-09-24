
// 
//  FILE NAME:  size.js
//  DESC:       size class
//

"use strict";

export class Size
{
    constructor( w = 0, h = 0 )
    {
        this.w = w;
        this.h = h;
    }
    
    // 
    //  Copy the data
    //
    copy( obj )
    {
        this.w = obj.w;
        this.h = obj.h;
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
    //  DESC: Reset the data
    //
    reset()
    {
        this.w = 0;
        this.h = 0;
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
    //  DESC: Round out the floating point number
    //
    round()
    {
        this.w = Math.round(this.w);
        this.h = Math.round(this.h);
    }
    
    // 
    //  DESC: Access members as UV data
    //
    set u(value) { this.w = value; }
    get u() { return this.w; }
    
    set v(value) { this.h = value; }
    get v() { return this.h; }
}
