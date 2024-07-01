
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

        for( this._i = 0; this._i < obj.pointAry.length; ++this._i )
            this.pointAry.push( new Point( obj.pointAry[this._i] ) );
    }
}
