
// 
//  FILE NAME:  object3d.js
//  DESC:       object 3D class
//

"use strict";

import { Object2D } from '../2d/object2d';
import { Matrix } from '../utilities/matrix';

export class Object3D extends Object2D
{
    constructor()
    {
        super();
        
        // Matrix for rotations only
        // Basicly used for normal calculations
        this.rotMatrix = new Matrix;
    }
    
    //
    //  DESC: Set the translation/rotation from Bullet Physics
    //
    /*setTransform( trans )
    {
        this.parameters.add( defs.MATRIX_ROTATION | defs.TRANSFORM );

        // Set the position
        const btVector3 & btVec = trans.getOrigin();
        SetPos( CPoint<float>(btVec.x(), btVec.y(), btVec.z()) );

        // Set the rotation
        const btMatrix3x3 & btMat = trans.getBasis();
        for( int i = 0; i < 3; ++i )
        {
            const btVector3 & vec = btMat.getRow(i);
            m_rotMatrix.SetColumn( i, CPoint<float>(vec.x(), vec.y(), vec.z()) );
        }
    }*/

    //
    //  DESC: Apply the rotation
    //
    applyRotation( matrix )
    {
        super.applyRotation( matrix );

        this.rotMatrix.initilizeMatrix();
        this.rotMatrix.rotate( this.rot );
    }
}
