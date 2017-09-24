
// 
//  FILE NAME: spritechild2d.js
//  DESC:      Class specific for child sprites where the parent does
//             a lot of movement to optimize matrix translations for the
//             child and parent.
//

"use strict";

import { Sprite2D } from '../2d/sprite2d';
import { Matrix } from '../utilities/matrix';
import * as defs from '../common/defs';

export class SpriteChild2D extends Sprite2D
{
    constructor( objData, id = defs.SPRITE_DEFAULT_ID )
    {
        super( objData, id );
        
        // final matrix
        this.finalMatrix = new Matrix;
    }
    
    //
    //  DESC: Transform
    //
    transform( matrix = null, tranformWorldPos = null )
    {
        this.parameters.remove( defs.WAS_TRANSFORMED );

        if( matrix )
        {
            if( this.parameters.isSet( defs.TRANSFORM ) )
                this.transformLocal( this.matrix );
        
            if( this.parameters.isSet( defs.WAS_TRANSFORMED ) || tranformWorldPos )
            {
                this.parameters.add( defs.WAS_TRANSFORMED );
                
                this.finalMatrix.copy( this.matrix );

                this.finalMatrix.mergeMatrix( matrix.matrix );
            }
        }
        else
        {
            if( this.parameters.isSet( defs.WAS_TRANSFORMED ) )
                this.transformLocal( this.finalMatrix );
        }
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            this.visualComponent.render( this.finalMatrix, matrix );
        }
    }

}
