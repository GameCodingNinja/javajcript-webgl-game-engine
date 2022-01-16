
// 
//  FILE NAME:  line.js
//  DESC:       Line class
//

"use strict";
import { Point } from '../common/point';

export class Line
{
    constructor( obj = null )
    {
        this.head = null;
        this.tail = null;

        if(obj)
            this.copy( obj );
    }

    // 
    //  DESC: Copy from another line
    //
    copy( obj )
    {
        this.head = new Point( obj.head );
        this.tail = new Point( obj.tail );
    }
}
