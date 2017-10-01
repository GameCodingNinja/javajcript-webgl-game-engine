
// 
//  FILE NAME:  point.js
//  DESC:       Point class
//

"use strict";

import * as defs from '../common/defs';

export class Point
{
    constructor( x = 0, y = 0, z = 0 )
    {
        this.data = new Float32Array([x,y,z]);
    }
    
    set x(value) { this.data[0] = value; }
    get x() { return this.data[0]; }
    
    set y(value) { this.data[1] = value; }
    get y() { return this.data[1]; }
    
    set z(value) { this.data[2] = value; }
    get z() { return this.data[2]; }
    
    copy( obj )
    {
        this.data[0] = obj.data[0];
        this.data[1] = obj.data[1];
        this.data[2] = obj.data[2];
    }
    
    convertToRads()
    {
        this.x *= defs.DEG_TO_RAD;
        this.y *= defs.DEG_TO_RAD;
        this.z *= defs.DEG_TO_RAD;
    }
    
    setXYZ( x = 0, y = 0, z = 0 )
    {
        this.data[0] = x;
        this.data[1] = y;
        this.data[2] = z;
    }
    
    set( point )
    {
        this.data[0] = point.data[0];
        this.data[1] = point.data[1];
        this.data[2] = point.data[2];
    }
    
    incXYZ( x = 0, y = 0, z = 0 )
    {
        this.data[0] += x;
        this.data[1] += y;
        this.data[2] += z;
    }
    
    inc( point )
    {
        this.data[0] += point.data[0];
        this.data[1] += point.data[1];
        this.data[2] += point.data[2];
    }

    cap( value )
    {
        if( value > 0 )
        {
            if( this.x > value )
            {
                this.x -= value;
            }
            else if ( this.x < 0 )
            {
                this.x += value;
            }

            if( this.y > value )
            {
                this.y -= value;
            }
            else if ( this.y < 0 )
            {
                this.y += value;
            }

            if( this.z > value )
            {
                this.z -= value;
            }
            else if ( this.z < 0 )
            {
                this.z += value;
            }
        }
        else
        {
            if( this.x > value )
            {
                this.x += value;
            }
            else if ( this.x < 0 )
            {
                this.x -= value;
            }

            if( this.y > value )
            {
                this.y += value;
            }
            else if ( this.y < 0 )
            {
                this.y -= value;
            }

            if( this.z > value )
            {
                this.z += value;
            }
            else if ( this.z < 0 )
            {
                this.z -= value;
            }
        }
    }
    
    getInvert()
    {
        return new Point(-this.data[0], -this.data[1], -this.data[2]);
    }
    
    invert()
    {
        this.data[0] = -this.data[0];
        this.data[1] = -this.data[1];
        this.data[2] = -this.data[2];
    }
    
    isEmpty()
    {
        if( (this.x == 0) && (this.y == 0) && (this.z == 0) )
            return true;
        
        return false;
    }
    
    isXEmpty()
    {
        return (0 === this.x);
    }

    isYEmpty()
    {
        return (0 === this.y);
    }

    isZEmpty()
    {
        return (0 === this.z);
    }
    
    isEquilXYZ( x, y, z )
    {
        if( this.data[0] === x )
        {
            if( this.data[1] === y )
            {
                if( this.data[2] === z )
                {
                    return true;
                }
            }
        }
        
        return false;
    }
}
