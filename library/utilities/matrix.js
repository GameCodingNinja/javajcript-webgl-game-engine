
// 
//  FILE NAME:  matrix.js
//  DESC:       4x4 Matrix math class
//

"use strict";

const NO_ROT = 0;
const ROT_Z  = 1;
const ROT_Y  = 2;
const ROT_X  = 4;

// Global temp matrix to be reused so that an object
// specific one doesn't have to be created each time
var gTempMatrix = new Float32Array(16);
var gTempMergeMatrix = new Float32Array(16);
var gSwap = null;

export class Matrix
{
    constructor( matrix = null )
    {
        this.matrix = new Float32Array(16);
        
        if( matrix === null )
            this.initilizeMatrix();
        else
            this.copy( matrix );
    }
    
    copy( obj )
    {
        this._i = this.matrix.length;
        
        while( this._i-- )
            this.matrix[this._i] = obj.matrix[this._i];  
    }
    
    //
    //  DESC: Init the matrix to the identity matrix
    //
    initilizeMatrix()
    {
        this.initIdentityMatrix( this.matrix );
    }
    
    initIdentityMatrix( mat )
    {
        // Initializes a specific matrix to the identity matrix:
        mat[0]  = 1.0;   mat[1] = 0.0;   mat[2]  = 0.0;   mat[3] = 0.0;
        mat[4]  = 0.0;   mat[5] = 1.0;   mat[6]  = 0.0;   mat[7] = 0.0;
        mat[8]  = 0.0;   mat[9] = 0.0;   mat[10] = 1.0;  mat[11] = 0.0;
        mat[12] = 0.0;  mat[13] = 0.0;   mat[14] = 0.0;  mat[15] = 1.0;
    }
    
    //
    //  DESC: Merge matrix into master matrix
    //  
    mergeMatrix( matrix )
    {
        for( this._i = 0; this._i < 4; ++this._i )
        {
            for( this._j = 0; this._j < 4; ++this._j )
            { 
                gTempMergeMatrix[(this._i*4)+this._j] = (this.matrix[this._i*4] * matrix[this._j])
                + (this.matrix[(this._i*4)+1] * matrix[4+this._j])
                + (this.matrix[(this._i*4)+2] * matrix[8+this._j])
                + (this.matrix[(this._i*4)+3] * matrix[12+this._j]);
            }
        }

        // Swap matricies so that there's no garbage collection
        gSwap = this.matrix;
        this.matrix = gTempMergeMatrix;
        gTempMergeMatrix = gSwap;
    }
    
    //
    //  DESC: Generate 3D rotation matrix
    //
    rotate( point )
    {
        this._flags = NO_ROT;
        
        // init the rotation matrix
        this.initIdentityMatrix( gTempMatrix );

        // Apply Z rotation
        if( !point.isZEmpty() )
        {
            this.rotateZRad( gTempMatrix, point.z, this._flags );
            this._flags |= ROT_Z;
        }

        // Apply Y rotation
        if( !point.isYEmpty() )
        {
            this.rotateYRad( gTempMatrix, point.y, this._flags );
            this._flags |= ROT_Y;
        }

        // Apply X rotation
        if( !point.isXEmpty() )
        {
            this.rotateXRad( gTempMatrix, point.x, this._flags );
            this._flags |= ROT_X;
        }

        // Merg the rotation into the master matrix
        this.mergeMatrix( gTempMatrix );
    }
     
    //
    //  DESC: Rotate the matrix along the z axis
    //
    rotateZRad( dest, value )
    {
        this._cos = Math.cos(value);
        this._sin = Math.sin(value);

        dest[0] = this._cos;
        dest[1] = this._sin;
        dest[4] = -this._sin;
        dest[5] = this._cos;
    }
 
    //
    //  DESC: Rotate the matrix along the y axis
    //
    rotateYRad( dest, value, rotFlags )
    {
        this._cos = Math.cos(value);
        this._sin = Math.sin(value);

        switch( rotFlags )
        {
            case ROT_Z:
            {
                this._tmp0 = dest[0] * this._cos;
                this._tmp1 = dest[1] * this._cos;
                this._tmp8 = dest[0] * this._sin;
                this._tmp9 = dest[1] * this._sin;
                dest[0] = this._tmp0;
                dest[1] = this._tmp1;
                dest[2] = -this._sin;
                dest[8] = this._tmp8;
                dest[9] = this._tmp9;
                dest[10] = this._cos;
                break;
            }
            case NO_ROT:
            {
                dest[0]  =  this._cos;
                dest[2]  = -this._sin;
                dest[8]  =  this._sin;
                dest[10] =  this._cos;
                break;
            }
        }
    }
  
    //
    //  DESC: Rotate the matrix along the x axis
    //
    rotateXRad( dest, value, rotFlags )
    {
        this._cos = Math.cos(value);
        this._sin = Math.sin(value);

        switch( rotFlags )
        {
            case ROT_Z:
            {
                this._tmp4 = dest[4] * this._cos;
                this._tmp5 = dest[5] * this._cos;
                this._tmp8 = dest[4] * -this._sin;
                this._tmp9 = dest[5] * -this._sin;
                dest[4] =  this._tmp4;
                dest[5] =  this._tmp5;
                dest[6] =  this._sin;
                dest[8] =  this._tmp8;
                dest[9] =  this._tmp9;
                dest[10] = this._cos;
                break;
            }

            case ROT_Y:
            {
                this._tmp4 = dest[8] * this._sin;
                this._tmp6 = dest[10] * this._sin;
                this._tmp8 = dest[8] * this._cos;
                this._tmp10 = dest[10] * this._cos;
                dest[4] =  this._tmp4;
                dest[5] =  this._cos;
                dest[6] =  this._tmp6;
                dest[8] =  this._tmp8;
                dest[9] = -this._sin;
                dest[10] = this._tmp10;
                break;
            }

            case ROT_Z | ROT_Y:
            {
                this._tmp4 = ( dest[4] * this._cos ) + ( dest[8] * this._sin );
                this._tmp5 = ( dest[5] * this._cos ) + ( dest[9] * this._sin );
                this._tmp6 = dest[10] * sin;
                this._tmp8 = ( dest[4] * -this._sin ) + ( dest[8] * this._cos );
                this._tmp9 = ( dest[5] * -this._sin ) + ( dest[9] * this._cos );
                this._tmp10 = dest[10] * this._cos;
                dest[4] =  this._tmp4;
                dest[5] =  this._tmp5;
                dest[6] =  this._tmp6;
                dest[8] =  this._tmp8;
                dest[9] =  this._tmp9;
                dest[10] = this._tmp10;
                break;
            }

            case NO_ROT:
            {
                dest[5]  =  this._cos;
                dest[6]  =  this._sin;
                dest[9]  = -this._sin;
                dest[10] =  this._cos;
                break;
            }
        }
    }
    
    //
    //  DESC: Translate the point
    //
    translate( point )
    {
        this.matrix[12] += point.x;
        this.matrix[13] += point.y;
        this.matrix[14] += point.z;
    }
    
    translateSize( size )
    {
        this.matrix[12] += size.w;
        this.matrix[13] += size.h;
    }
    
    //
    //  DESC: Transform the type
    //
    transformPoint( dest, source )
    {
        dest.x = ( source.x * this.matrix[ 0 ] )
               + ( source.y * this.matrix[ 4 ] )
               + ( source.z * this.matrix[ 8 ] )
               + this.matrix[ 12 ];

        dest.y = ( source.x * this.matrix[ 1 ] )
               + ( source.y * this.matrix[ 5 ] )
               + ( source.z * this.matrix[ 9 ] )
               + this.matrix[ 13 ];

        dest.z = ( source.x * this.matrix[ 2 ] )
               + ( source.y * this.matrix[ 6 ] )
               + ( source.z * this.matrix[ 10 ] )
               + this.matrix[ 14 ];
    }
    
    transformRect( dest, source )
    {
        // Transform vertex by master matrix:
        dest.x1 = ( source.x1 * this.matrix[ 0 ] )
                + ( source.y1 * this.matrix[ 4 ] )
                + this.matrix[ 12 ];

        dest.y1 = ( source.x1 * this.matrix[ 1 ] )
                + ( source.y1 * this.matrix[ 5 ] )
                + this.matrix[ 13 ];

        dest.x2 = ( source.x2 * this.matrix[ 0 ] )
                + ( source.y2 * this.matrix[ 4 ] )
                + this.matrix[ 12 ];

        dest.y2 = ( source.x2 * this.matrix[ 1 ] )
                + ( source.y2 * this.matrix[ 5 ] )
                + this.matrix[ 13 ];
    }
    
    transformQuad( dest, source )
    {
        for( this._i = 0; this._i < 4; ++this._i )
            this.transformPoint( dest.point[this._i], source.point[this._i] );
    }

    transformPolygon( dest, source )
    {
        for( this._i = 0; this._i < source.pointAry.length; ++this._i )
            this.transformPoint( dest.pointAry[this._i], source.pointAry[this._i] );
    }

    transformLine( dest, source )
    {
        this.transformPoint( dest.head, source.head );
        this.transformPoint( dest.tail, source.tail );
    }
    
    //
    //  DESC: Set the scale to the master matrix
    //
    setScaleFromPoint( point )
    {
        // Initialize scaling matrix:
        this.matrix[0]  *= point.x;
        this.matrix[5]  *= point.y;
        this.matrix[10] *= point.z;
    }
    
    setScaleFromSize( size )
    {
        // Initialize scaling matrix:
        this.matrix[0]  *= size.w;
        this.matrix[5]  *= size.h;
        this.matrix[10] *= 1.0;
    }
    
    setScaleFromValue( scale )
    {
        // Initialize scaling matrix:
        this.matrix[0]  *= scale;
        this.matrix[5]  *= scale;
        this.matrix[10] *= 1.0;
    }
    
    //
    //  DESC: Set the scale to the master matrix
    //
    scaleFromPoint( point )
    {
        this.mergeScale( point.x, point.y, point.z );
    }
    
    scaleFromSize( size )
    {
        this.mergeScale( size.w, size.h, 1.0 );
    }
    
    scaleFromValue( scale )
    {
        this.mergeScale( scale, scale, scale );
    }
    
    //
    //  DESC: scale and merge 
    //
    mergeScale( x, y, z )
    {
        // init the matrix
        this.initIdentityMatrix( gTempMatrix );

        // Initialize scaling matrix:
        gTempMatrix[0]  = x;
        gTempMatrix[5]  = y;
        gTempMatrix[10] = z;

        // Merge the scale into the master matrix
        this.mergeMatrix( gTempMatrix );
    }
    
    //
    //  DESC: Calulate an orthographic matrix 
    //
    orthographicRH( w, h, zn, zf )
    {
        // Formula for a right handed orthographic matrix
        //  2/w  0    0           0
        //  0    2/h  0           0
        //  0    0    1/(zn-zf)   0
        //  0    0    zn/(zn-zf)  1

        this.matrix[0] = 2 / w;
        this.matrix[5] = 2 / h;
        this.matrix[10] = 1 / (zn-zf);
        this.matrix[14] = zn / (zn-zf);
    }
    
    //
    //  DESC: Calulate an perspective matrix 
    //
    perspectiveFovRH( fovy, aspect, zn, zf )
    {
        // Formula for a right handed perspective matrix
        //  yScale = cot(fovY/2)
        //  xScale = yScale / aspect ratio
        //  xScale     0          0              0
        //  0        yScale       0              0
        //  0        0        zf/(zn-zf)        -1
        //  0        0        zn*zf/(zn-zf)      0

        this._yScale = 1 / Math.tan(fovy/2);
        this._xScale = this._yScale / aspect;

        this.matrix[0] = this._xScale;
        this.matrix[5] = this._yScale;
        this.matrix[10] = zf / (zn-zf);
        this.matrix[11] = -1;
        this.matrix[14] = zn * zf / (zn-zf);
    }
    
    //
    //  DESC: Inverse the X 
    //
    invertX()
    {
        this.matrix[12] = -this.matrix[12];
    }

    //
    //  DESC: Inverse the Y 
    //
    invertY()
    {
        this.matrix[13] = -this.matrix[13];
    }

    //
    //  DESC: Inverse the Z 
    //
    invertZ()
    {
        this.matrix[14] = -this.matrix[14];
    }

    //
    //  DESC: Inverse the Z 
    //
    multiply3x3( matrix )
    {
        this.initIdentityMatrix( gTempMergeMatrix );

        for( this._i = 0; this._i < 3; ++this._i )
        {
            for( this._j = 0; this._j < 3; ++this._j )
            { 
                gTempMergeMatrix[(this._i*4)+this._j] = (this.matrix[this._i*4] * matrix[this._j])
                + (this.matrix[(this._i*4)+1] * matrix[4+this._j])
                + (this.matrix[(this._i*4)+2] * matrix[8+this._j]);
            }
        }

        // Swap matricies so that there's no garbage collection
        gSwap = this.matrix;
        this.matrix = gTempMergeMatrix;
        gTempMergeMatrix = gSwap;
    }
}
