
// 
//  FILE NAME: spriteset2d.js
//  DESC:      A sprite set
//

"use strict";

import { SpriteDataAry } from '../common/spritedataary';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { Sprite2D } from '../2d/sprite2d';

export class SpriteSet2D extends SpriteDataAry
{
    constructor()
    {
        super();
        
        // Sprite array
        this.spriteAry = [];
    }
    
    //
    //  DESC: Build the visible symbol set
    //
    build()
    {
        // Build the sprite array
        if( this.spriteAry.length === 0 )
        {
            // Make a visual symbol set for this reel strip.
            for( let i = 0; i < this.dataAry.length; ++i )
            {
                let sprite = new Sprite2D( objectDataManager.getData( this.dataAry[i].group, this.dataAry[i].objectName ) );
            
                sprite.setVisible( this.dataAry[i].isVisible() );

                if( this.dataAry[i].fontData && sprite.visualComponent.isFontSprite() )
                    sprite.visualComponent.fontData.copy( this.dataAry[i].fontData );

                sprite.copyTransform( this.dataAry[i] );

                sprite.createScriptFunctions( this.dataAry[i] );

                this.spriteAry.push( sprite );
            }
        }
    }
    
    //
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Clean  up the visual symbols
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }

    //
    //  DESC: Get the symbol set created by the data
    //
    getSprite( index )
    {
        let sprite = this.spriteAry[ index ];
        if( !sprite )
            throw new Error( `Sprite index not found in array (${index})!` );

        return sprite;
    }
}
