
// 
//  FILE NAME:  rect.js
//  DESC:       rect class
//

"use strict";

export class Rect
{
    constructor( x1 = 0, y1 = 0, x2 = 0, y2 = 0 )
    {
        this.data = new Float32Array([x1,y1,x2,y2]);
    }
    
    set( x1 = 0, y1 = 0, x2 = 0, y2 = 0 )
    {
        this.data[0] = x1;
        this.data[1] = y1;
        this.data[2] = x2;
        this.data[3] = y2;
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
