
// 
//  FILE NAME: symbol2d.js
//  DESC:      Class for rendering a symbol and it's animations
//

"use strict";

import { SpriteChild2D } from '../2d/spritechild2d';
import { Object2D } from '../2d/object2d';
import { Matrix } from '../utilities/matrix';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as defs from '../common/defs';

export class Symbol2d extends Object2D
{
    constructor( spriteDataAry, id )
    {
        super();
        
        // Id of this symbol
        this.id = id;
        
        // Array of sprites this symbol renders
        this.spriteAry = [];
        
        // Final matrix
        this.finalMatrix = new Matrix;
        
        // This symbol's visual representation
        for( let i = 0; i < spriteDataAry.length; ++i )
        {
            let sprite = new SpriteChild2D( objectDataManager.getData( spriteDataAry[i].group, spriteDataAry[i].objectName ) );
            
            sprite.setVisible( spriteDataAry[i].isVisible() );
            
            if( spriteDataAry[i].fontData && sprite.visualComponent.isFontSprite() )
                sprite.visualComponent.fontData.copy( spriteDataAry[i].fontData );
            
            sprite.copyTransform( spriteDataAry[i] );
            
            sprite.createScriptFunctions( spriteDataAry[i] );
            
            this.spriteAry.push( sprite );
        }
        
        // Flag to indicate symbol is to be rendered after all reel strips have been rendered
        this.deferredRender = false;
    }
    
    // 
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a font or physics.
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    // 
    //  DESC: Do the update
    //
    update()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].update();
    }
    
    //
    //  DESC: Transform the symbol
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
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.finalMatrix, this.parameters.isSet( defs.WAS_TRANSFORMED ) );
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );
    }
    
    // 
    //  DESC: Get the sprite
    //
    getSprite( index = 0 )
    {
        return this.spriteAry[index];
    }
}
