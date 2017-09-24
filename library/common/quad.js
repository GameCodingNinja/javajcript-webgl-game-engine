
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
        let result = false;
        
        //console.log( `isPointInQuad - X: ${x}, Y: ${y}` );
        
        for( let i = 0, j = 3; i < 4; j = i++ )
        {
            if( ((this.point[i].y > y) != (this.point[j].y > y)) && 
                (x < (this.point[j].x - this.point[i].x) * (y - this.point[i].y) / (this.point[j].y - this.point[i].y) + this.point[i].x) )
            {
                result = !result;
            }
        }

        return result;
    }
}
