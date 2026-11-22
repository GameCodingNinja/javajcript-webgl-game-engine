
// 
//  FILE NAME:  polygon.js
//  DESC:       Polygon class
//

"use strict";
import { Point } from '../common/point';

export class Polygon
{
    constructor( obj = null )
    {
        this.pointAry = [];
        this.maxLength = 0;

        if(obj)
            this.copy( obj );
    }

    // 
    //  DESC: Copy from another polygon (no allocation if capacity sufficient)
    //
    copy( obj )
    {
        // Grow the polygon length if needed
        for( let i = this.maxLength; i < obj.pointAry.length; ++i )
            this.pointAry.push( new Point() );

        // Copy over the points
        for( let i = 0; i < obj.pointAry.length; ++i )
            this.pointAry[i].copy( obj.pointAry[i] );

        // Set the length if it was larger before
        this.pointAry.length = obj.pointAry.length;

        // Update the max length if it is less
        // Remember the max length of the polygon to avoid allocating over a point that already exists
        if( this.maxLength < obj.pointAry.length )
            this.maxLength = obj.pointAry.length;
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        for( let i = 0; i < this.maxLength; ++i )
            this.pointAry[i].clear();

        // Set the length to it's current size
        this.pointAry.length = this.maxLength;
    }
}
