
// 
//  FILE NAME:  uv.js
//  DESC:       uv class
//

"use strict";

export class UV
{
    constructor( u = 0, v = 0 )
    {
        this.data = new Float32Array([u,v]);
    }
    
    set u(value) { this.data[0] = value; }
    get u() { return this.data[0]; }
    
    set v(value) { this.data[1] = value; }
    get v() { return this.data[1]; }
}
