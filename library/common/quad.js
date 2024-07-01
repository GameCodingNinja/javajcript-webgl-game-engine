
// 
//  FILE NAME:  quad.js
//  DESC:       quad class
//

"use strict";
import { Point } from '../common/point';

export class Quad
{
    constructor()
    {
        this.point = [new Point, new Point, new Point, new Point];
    }
    
    // 
    //  DESC: Is the point in the Quad
    //  Note: Fast but does not work when quad is rotated
    //
    isPointInQuad( x, y )
    {
        this._result = false;
        
        //console.log( `isPointInQuad - X: ${x}, Y: ${y}` );
        
        for( this._i = 0, this._j = 3; this._i < 4; this._j = this._i++ )
        {
            if( ((this.point[this._i].y > y) != (this.point[this._j].y > y)) && 
                (x < (this.point[this._j].x - this.point[this._i].x) * (y - this.point[this._i].y) / (this.point[this._j].y - this.point[this._i].y) + this.point[this._i].x) )
            {
                this._result = !this._result;
            }
        }

        return this._result;
    }
}
