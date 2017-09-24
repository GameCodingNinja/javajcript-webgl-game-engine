
// 
//  FILE NAME:  object2d.js
//  DESC:       object 2D class
//

"use strict";

import { Object } from '../common/object';
import { Matrix } from '../utilities/matrix';
import * as defs from '../common/defs';

export class Object2D extends Object
{
    constructor()
    {
        super();
        
        // local matrix
        this.matrix = new Matrix;
    }
    
    //
    //  DESC: Transform the object in local space
    //
    transformLocal( matrix )
    {
        // Reset the matrices
        matrix.initilizeMatrix();

        // Apply the crop offset
        if( this.parameters.isSet( defs.CROP_OFFSET ) )
            matrix.translateSize( this.cropOffset );

        // Apply the scale
        if( this.parameters.isSet( defs.SCALE ) )
            this.applyScale( matrix );

        // Apply the rotation
        if( this.parameters.isSet( defs.ROTATE ) )
            this.applyRotation( matrix );

        // Apply the translation
        if( this.parameters.isSet( defs.TRANSLATE ) )
            matrix.translate( this.pos );

        // Clear the check parameter
        this.parameters.remove( defs.TRANSFORM );

        // Indicate that translation was done
        this.parameters.add( defs.WAS_TRANSFORMED );
    }
    
    //
    //  DESC: Transform
    //
    transform( matrix = null, tranformWorldPos = null )
    {
        this.parameters.remove( defs.WAS_TRANSFORMED );
        
        if( matrix )
        {
            if( this.parameters.isSet( defs.TRANSFORM ) || tranformWorldPos )
            {
                this.transformLocal( this.matrix );

                this.matrix.mergeMatrix( matrix.matrix );
            }
        }
        else
        {
            if( this.parameters.isSet( defs.TRANSFORM ) )
                this.transformLocal( this.matrix );
        }
    }

    //
    //  DESC: Apply the scale
    //
    applyScale( matrix )
    {
        this.matrix.setScaleFromPoint( this.scale );
    }

    //
    //  DESC: Apply the scale
    //
    applyRotation( matrix )
    {
        // Add in the center point prior to rotation
        if( this.parameters.isSet( defs.CENTER_POINT ) )
            this.matrix.translate( this.centerPos );

        this.matrix.rotate( this.rot );

        // Subtract the center point after rotation to put back in original position
        // Doing two inverts keeps us from having to new up a point that would be garbage collected
        if( this.parameters.isSet( defs.CENTER_POINT ) )
        {
            this.centerPos.invert();
            this.matrix.translate( this.centerPos );
            this.centerPos.invert();
        }
    }

    //
    //  DESC: Was the world position transformed?
    //
    wasWorldPosTranformed()
    {
        return this.parameters.isSet( defs.WAS_TRANSFORMED );
    }

    //
    //  DESC: Was the world position transformed?
    //
    forceTransform()
    {
        this.parameters.Add( defs.TRANSFORM );
    }
}
