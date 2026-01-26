
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
        // Pre-allocate to avoid GC during copy
        this.head = new Point();
        this.tail = new Point();

        if(obj)
            this.copy( obj );
    }

    // 
    //  DESC: Copy from another line (no allocation)
    //
    copy( obj )
    {
        this.head.copy( obj.head );
        this.tail.copy( obj.tail );
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.head.clear();
        this.tail.clear();
    }
}
