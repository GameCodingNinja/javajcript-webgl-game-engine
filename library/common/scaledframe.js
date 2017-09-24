
// 
//  FILE NAME:  scaledframe.js
//  DESC:       Class for holding scaled frame data
//

"use strict";
import { Size } from '../common/size';

export class ScaledFrame
{
    constructor()
    {
        // Size of the frame
        this.frame = new Size;

        // Is there a center quad?
        this.centerQuad = true;
    
        // Is there a bottom frame?
        this.bottomFrame = true;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.frame.copy( obj.frame );
        this.centerQuad = obj.centerQuad;
        this.bottomFrame = obj.bottomFrame;
    }
}
