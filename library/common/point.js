
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
        if(x instanceof Point)
            this.data = new Float32Array([x.data[0], x.data[1], x.data[2]]);
        else
            this.data = new Float32Array([x, y, z]);
    }
    
    set x(value) { this.data[0] = value; }
    get x() { return this.data[0]; }
    
    set y(value) { this.data[1] = value; }
    get y() { return this.data[1]; }
    
    set z(value) { this.data[2] = value; }
    get z() { return this.data[2]; }
    
    // 
    //  DESC: Copy from another point
    //
    copy( obj )
    {
        this.data[0] = obj.data[0];
        this.data[1] = obj.data[1];
        this.data[2] = obj.data[2];
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.data[0] = 0;
        this.data[1] = 0;
        this.data[2] = 0;
    }
    
    // 
    //  DESC: Covert rotation data to radians
    //
    convertToRads()
    {
        this.x *= defs.DEG_TO_RAD;
        this.y *= defs.DEG_TO_RAD;
        this.z *= defs.DEG_TO_RAD;
    }
    
    // 
    //  DESC: Set point via individual components
    //
    setXYZ( x = 0, y = 0, z = 0 )
    {
        this.data[0] = x;
        this.data[1] = y;
        this.data[2] = z;
    }
    
    // 
    //  DESC: Set point via point. Same as copy
    //
    set( point )
    {
        this.data[0] = point.data[0];
        this.data[1] = point.data[1];
        this.data[2] = point.data[2];
    }
    
    // 
    //  DESC: Inc point via individual components
    //
    incXYZ( x = 0, y = 0, z = 0 )
    {
        this.data[0] += x;
        this.data[1] += y;
        this.data[2] += z;
    }
    
    // 
    //  DESC: Inc point via point.
    //
    inc( point )
    {
        this.data[0] += point.data[0];
        this.data[1] += point.data[1];
        this.data[2] += point.data[2];
    }

    // 
    //  DESC: Cap the value
    //
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
    
    // 
    //  DESC: Invert a copy of this point and return it
    //
    getInvert()
    {
        return new Point(-this.data[0], -this.data[1], -this.data[2]);
    }
    
    // 
    //  DESC: Invert the values of this point
    //
    invert()
    {
        this.data[0] = -this.data[0];
        this.data[1] = -this.data[1];
        this.data[2] = -this.data[2];
    }
    
    // 
    //  DESC: Does this point not have any data?
    //
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
    
    // 
    //  DESC: Is this point equil
    //
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

    // 
    //  DESC: Get the squared length of the point from the origin
    //
    getLengthSquared()
    {
        return ( this.data[0] * this.data[0] ) +  ( this.data[1] * this.data[1] ) + ( this.data[2] * this.data[2] );
    }

    getLengthSquared2D()
    {
        return ( this.data[0] * this.data[0] ) +  ( this.data[1] * this.data[1] );
    }

    // 
    //  DESC: Calculate squared length from 2 points
    //
    calcLengthSquared( point )
    {
        let dx = this.data[0] - point.data[0];
        let dy = this.data[1] - point.data[1];
        let dz = this.data[2] - point.data[2];

        return ( dx * dx ) +  ( dy * dy ) +  ( dz * dz );
    }

    calcLengthSquared2D( point )
    {
        let dx = this.data[0] - point.data[0];
        let dy = this.data[1] - point.data[1];

        return ( dx * dx ) +  ( dy * dy );
    }

    // 
    //  DESC: Get the length of the point from the origin
    //
    getLength()
    {
        return Math.sqrt( this.getLengthSquared() );
    }

    getLength2D()
    {
        return Math.sqrt( this.getLengthSquared2D() );
    }

    // 
    //  DESC: Calc length from 2 points
    //
    calcLength( point )
    {
        return Math.sqrt( this.calcLengthSquared( point ) );
    }

    calcLength2D( point )
    {
        return Math.sqrt( this.calcLengthSquared2D( point ) );
    }

    // 
    //  DESC: Get the dot product
    //
    getDotProduct( point )
    {
        return ( this.data[0] * point.data[0] ) +  ( this.data[1] * point.data[1] ) + ( this.data[2] * point.data[2] );
    }

    getDotProduct2D( point )
    {
        return ( this.data[0] * point.data[0] ) +  ( this.data[1] * point.data[1] );
    }
}
