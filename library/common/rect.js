
// 
//  FILE NAME:  rect.js
//  DESC:       rect class
//

"use strict";

export class Rect
{
    constructor( x1 = 0, y1 = 0, x2 = 0, y2 = 0 )
    {
        if(x1 instanceof Rect)
            this.data = new Float32Array([x1.data[0], x1.data[1], x1.data[2], x1.data[3]]);
        else
            this.data = new Float32Array([x1, y1, x2, y2]);
    }
    
    set( x1 = 0, y1 = 0, x2 = 0, y2 = 0 )
    {
        this.data[0] = x1;
        this.data[1] = y1;
        this.data[2] = x2;
        this.data[3] = y2;
    }

    // 
    //  DESC: Copy from another rect
    //
    copy( obj )
    {
        this.data[0] = obj.data[0];
        this.data[1] = obj.data[1];
        this.data[2] = obj.data[2];
        this.data[3] = obj.data[3];
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.data[0] = 0;
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
    }

    // 
    //  DESC: Does this rect not have any data?
    //
    isEmpty()
    {
        if( (this.data[2] == 0) && (this.data[3] == 0) )
            return true;
        
        return false;
    }
    
    set x1(value) { this.data[0] = value; }
    get x1() { return this.data[0]; }
    
    set y1(value) { this.data[1] = value; }
    get y1() { return this.data[1]; }
    
    set x2(value) { this.data[2] = value; }
    get x2() { return this.data[2]; }
    
    set y2(value) { this.data[3] = value; }
    get y2() { return this.data[3]; }
}
