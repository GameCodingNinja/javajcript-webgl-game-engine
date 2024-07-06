// 
//  FILE NAME: dynamicoffset.js
//  DESC:      Dynamic Offset class
//

"use strict";
import { BitMask } from '../utilities/bitmask';
import { Point } from './point';
import { Size } from './size';
import * as defs from '../common/defs';

var gPos = new Point;
var gSize = new Size;

export class DynamicOffset
{
    constructor()
    {
        // bit mask parameters
        this.parameters = new BitMask;

        // offset
        this.point = new Point;
    }

    // 
    //  DESC: Clear the values
    //
    clear()
    {
        this.parameters.clear();
        this.point.clear();
    }
    
    // 
    //  DESC: Add to the bit mask
    //
    add( value )
    {
        this.parameters.add( value );
    }

    // 
    //  Set/Get X
    //
    setX( value )
    {
        this.point.x = value;
    }

    setY( value )
    {
        this.point.y = value;
    }
    
    // 
    //  DESC: Is the dynamic offset being used
    //
    isEmpty()
    {
        return this.parameters.isEmpty();
    }
    
    // 
    //  DESC: Get the dynamic position
    //
    getPos( defaultHalfSize )
    {
        gPos.clear();

        gSize.set( defaultHalfSize.w, defaultHalfSize.h );
        
        // Strip out any fractional component for correct rendering
        gSize.round();

        if( this.parameters.isSet( defs.EDO_LEFT ) )
            gPos.x = -(gSize.w - this.point.x);

        else if( this.parameters.isSet( defs.EDO_RIGHT ) )
            gPos.x = gSize.w - this.point.x;

        else if( this.parameters.isSet( defs.EDO_HORZ_CENTER ) )
            gPos.x = this.point.x;

        if( this.parameters.isSet( defs.EDO_TOP ) )
            gPos.y = gSize.h - this.point.y;
            
        else if( this.parameters.isSet( defs.EDO_BOTTOM ) )
            gPos.y = -(gSize.h - this.point.y);

        else if( this.parameters.isSet( defs.EDO_VERT_CENTER ) )
            gPos.y = this.point.y;

        return gPos;
    }
}
