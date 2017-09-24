
// 
//  FILE NAME:  color.js
//  DESC:       color class
//

"use strict";
import * as defs from './defs';

export class Color
{
    constructor( r = 1, g = 1, b = 1, a = 1 )
    {
        this.data = new Float32Array([r,g,b,a]);
    }
    
    set( r = 1, g = 1, b = 1, a = 1 )
    {
        this.data[0] = r;
        this.data[1] = g;
        this.data[2] = b;
        this.data[3] = a;
    }
    
    copy( obj )
    {
        this.data[0] = obj.data[0];
        this.data[1] = obj.data[1];
        this.data[2] = obj.data[2];
        this.data[3] = obj.data[3];
    }
    
    set r(value)
    {
        if( value > 1.5 )
            value *= defs.RGB_TO_DEC;
        
        this.data[0] = value;
    }
    get r() { return this.data[0]; }
    
    set g(value)
    {
        if( value > 1.5 )
            value *= defs.RGB_TO_DEC;
        
        this.data[1] = value;
    }
    get g() { return this.data[1]; }
    
    set b(value)
    {
        if( value > 1.5 )
            value *= defs.RGB_TO_DEC;
        
        this.data[2] = value;
    }
    get b() { return this.data[2]; }
    
    set a(value)
    {
        if( value > 1.5 )
            value *= defs.RGB_TO_DEC;
        
        this.data[3] = value;
    }
    get a() { return this.data[3]; }
    
    // 
    //  DESC: Convert from integer to decimal
    //
    convert()
    {
        // 0.00390625f = 1 / 256;
        if( this.r > 1.5 )
            this.r *= defs.RGB_TO_DEC;

        if( this.g > 1.5 )
            this.g *= defs.RGB_TO_DEC;;

        if( this.b > 1.5 )
            this.b *= defs.RGB_TO_DEC;

        if( this.a > 1.5 )
            this.a *= defs.RGB_TO_DEC;
    }
    
    // 
    //  DESC: HSV transformation
    //  
    //  param: type hue - hue shift (in degrees)
    //  param: type sat - saturation multiplier (scalar)
    //  param: type val - value multiplier (scalar)
    //
    transformHSV( hue, sat, val )
    {
        let VSU = val * sat * Math.cos(hue * defs.DEG_TO_RAD);
        let VSW = val * sat * Math.sin(hue * defs.DEG_TO_RAD);

        let _r = this.data[0], _g = this.data[1], _b = this.data[2];

        this.data[0] = (.299 * val + .701 * VSU + .168 * VSW) * _r
                     + (.587 * val - .587 * VSU + .330 * VSW) * _g
                     + (.114 * val - .114 * VSU - .497 * VSW) * _b;
        this.data[1] = (.299 * val - .299 * VSU - .328 * VSW) * _r
                     + (.587 * val + .413 * VSU + .035 * VSW) * _g
                     + (.114 * val - .114 * VSU + .292 * VSW) * _b;
        this.data[2] = (.299 * val - .3   * VSU + 1.25 * VSW) * _r
                     + (.587 * val - .588 * VSU - 1.05 * VSW) * _g
                     + (.114 * val + .886 * VSU - .203 * VSW) * _b;
    }
}
