
// 
//  FILE NAME:  objecttransform.js
//  DESC:       object transform class
//

"use strict";

import { Object } from '../common/object';
import { Matrix } from '../utilities/matrix';
import * as defs from '../common/defs';

export class ObjectTransform extends Object
{
    constructor( createRotMatrix = false, id = defs.DEFAULT_ID )
    {
        super( id );
        
        // local matrix
        this.matrix = new Matrix;

        // Matrix for rotations only
        // Basicly used for normal calculations
        this.rotMatrix = null;
        if( createRotMatrix )
            this.rotMatrix = new Matrix;
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
            this.applyScale();

        // Apply the rotation
        if( this.parameters.isSet( defs.ROTATE ) )
            this.applyRotation();

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
    //  NOTE: Child objects that are intermittenly transformed
    //        will need a transform even if it's just 0, 0, 0
    //        to force a transfor with it's parent
    //
    transform( object = null )
    {
        this.parameters.remove( defs.WAS_TRANSFORMED );
        
        if( object )
        {
            if( this.parameters.isSet( defs.TRANSFORM ) || object.wasWorldPosTranformed() )
            {
                this.transformLocal( this.matrix );
                this.matrix.mergeMatrix( object.matrix.matrix );
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
    applyScale()
    {
        this.matrix.setScaleFromPoint( this.scale );
    }

    //
    //  DESC: Apply the scale
    //
    applyRotation()
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

        if( this.rotMatrix )
        {
            this.rotMatrix.initilizeMatrix();
            this.rotMatrix.rotate( this.rot );
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
