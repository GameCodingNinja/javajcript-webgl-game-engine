// 
//  FILE NAME: dynamicoffset.js
//  DESC:      Dynamic Offset class
//

"use strict";
import { BitMask } from '../utilities/bitmask';
import { Point } from './point';
import { Size } from './size';
import * as defs from '../common/defs';

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
        let pos = new Point;
        
        let halfSize = new Size( defaultHalfSize.w, defaultHalfSize.h );
        
        // Strip out any fractional component for correct rendering
        halfSize.round();

        if( this.parameters.isSet( defs.EDO_LEFT ) )
            pos.x = -(halfSize.w - this.point.x);

        else if( this.parameters.isSet( defs.EDO_RIGHT ) )
            pos.x = halfSize.w - this.point.x;

        else if( this.parameters.isSet( defs.EDO_HORZ_CENTER ) )
            pos.x = this.point.x;

        if( this.parameters.isSet( defs.EDO_TOP ) )
            pos.y = halfSize.h - this.point.y;
            
        else if( this.parameters.isSet( defs.EDO_BOTTOM ) )
            pos.y = -(halfSize.h - this.point.y);

        else if( this.parameters.isSet( defs.EDO_VERT_CENTER ) )
            pos.y = this.point.y;

        return pos;
    }
}
