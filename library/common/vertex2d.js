
// 
//  FILE NAME:  vertex2d.js
//  DESC:       vertex 2d class
//

"use strict";

export class Vertex2d
{
    constructor( x = 0, y = 0, z = 0, u = 0, v = 0 )
    {
        this.data = [x,y,z,u,v];
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
        this.data[4] = 0;
    }
    
    set x(value) { this.data[0] = value; }
    get x() { return this.data[0]; }
    
    set y(value) { this.data[1] = value; }
    get y() { return this.data[1]; }
    
    set z(value) { this.data[2] = value; }
    get z() { return this.data[2]; }
    
    set u(value) { this.data[3] = value; }
    get u() { return this.data[3]; }
    
    set v(value) { this.data[4] = value; }
    get v() { return this.data[4]; }
}
