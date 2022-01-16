
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

        if(obj)
            this.copy( obj );
    }

    // 
    //  DESC: Copy from another polygon
    //
    copy( obj )
    {
        if( this.pointAry.length )
            this.pointAry = [];

        for( let i = 0; i < obj.pointAry.length; ++i )
            this.pointAry.push( new Point( obj.pointAry[i] ) );
    }
}
