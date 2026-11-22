
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
    //  DESC: Copy from another quad (no allocation)
    //
    copy( obj )
    {
        this.point[0].copy( obj.point[0] );
        this.point[1].copy( obj.point[1] );
        this.point[2].copy( obj.point[2] );
        this.point[3].copy( obj.point[3] );
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.point[0].clear();
        this.point[1].clear();
        this.point[2].clear();
        this.point[3].clear();
    }
    
    // 
    //  DESC: Is the point in the Quad
    //  Note: Fast but does not work when quad is rotated
    //
    isPointInQuad( x, y )
    {
        this._result = false;
        
        //console.log( `isPointInQuad - X: ${x}, Y: ${y}` );
        
        for( let i = 0, j = 3; i < 4; ++i )
        {
            if( ((this.point[i].y > y) != (this.point[j].y > y)) && 
                (x < (this.point[j].x - this.point[i].x) * (y - this.point[i].y) / (this.point[j].y - this.point[i].y) + this.point[i].x) )
            {
                this._result = !this._result;
            }

            j = i;
        }

        return this._result;
    }
}
