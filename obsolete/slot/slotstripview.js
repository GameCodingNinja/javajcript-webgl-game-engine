
// 
//  FILE NAME: slotstripview.js
//  DESC:      Class for holding the pay combo
//

"use strict";

import { Object2D } from '../2d/object2d';
import { Size } from '../common/size';
import { Point } from '../common/point';
import { Quad } from '../common/quad';
import { Matrix } from '../utilities/matrix';
import { settings } from '../utilities/settings';

export class SlotStripView extends Object2D
{
    constructor( id )
    {
        super();
        
        // The id slot strip
        this.id = id;
        
        // This control's size
        this.size = new Size;
        
        // Collision rect
        this.collisionQuad = new Quad;
        
        // Collision center
        this.collisionCenter = new Point;
    }
    
    // 
    //  DESC: Transform the collision
    //
    transformCollision()
    {
        if( this.wasWorldPosTranformed() && !this.size.isEmpty() )
        {
            let finalMatrix = new Matrix( this.matrix );
            finalMatrix.scaleFromValue( settings.orthoAspectRatio.h );
            finalMatrix.invertY();

            // Get half the screen size to convert to screen coordinates
            let screenHalf = settings.size_half;

            // Create the rect of the control based on half it's size
            let halfwidth = this.size.w * 0.5;
            let halfHeight = this.size.h * 0.5;

            let quad = new Quad;
            quad.point[0].x = -halfwidth;
            quad.point[0].y = -halfHeight;
            quad.point[1].x = halfwidth;
            quad.point[1].y = -halfHeight;
            quad.point[2].x = halfwidth;
            quad.point[2].y = halfHeight;
            quad.point[3].x = -halfwidth;
            quad.point[3].y = halfHeight;

            finalMatrix.transformQuad( this.collisionQuad, quad );

            // Convert the translated rect to screen coordinates
            this.collisionQuad.point[0].x += screenHalf.w;
            this.collisionQuad.point[0].y += screenHalf.h;
            this.collisionQuad.point[1].x += screenHalf.w;
            this.collisionQuad.point[1].y += screenHalf.h;
            this.collisionQuad.point[2].x += screenHalf.w;
            this.collisionQuad.point[2].y += screenHalf.h;
            this.collisionQuad.point[3].x += screenHalf.w;
            this.collisionQuad.point[3].y += screenHalf.h;
            
            finalMatrix.transformPoint( this.collisionCenter, new Point );

            // Convert to screen coordinates
            this.collisionCenter.x += screenHalf.w;
            this.collisionCenter.y += screenHalf.h;
        }
    }
    
    // 
    //  DESC: Is the point in the strip
    //
    isPointInStrip( x, y )
    {
        return this.collisionQuad.isPointInQuad( x, y );
    }
}
