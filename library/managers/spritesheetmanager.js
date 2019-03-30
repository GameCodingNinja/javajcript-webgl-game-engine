
//
//  FILE NAME: spritesheetmanager.js
//  DESC:      Temporary container for loading sprite sheet data
//             so that the same large complex xml is not reloaded.
//

"use strict";
import { SpriteSheet } from '../sprite/spritesheet';

class SpriteSheetManager
{
    constructor()
    {
        this.spriteSheetMap = new Map;
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    loadFromNode( filePath, node )
    {
        let spriteSheet = this.spriteSheetMap.get( filePath );
        if( spriteSheet === undefined )
        {
            spriteSheet = new SpriteSheet;
            
            // Load the glyph data from XML node
            spriteSheet.loadFromNode( node );
            
            // Add a new entry to the map
            this.spriteSheetMap.set( filePath, spriteSheet );
        }
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    getSpriteSheet( filePath )
    {
        let spriteSheet = this.spriteSheetMap.get( filePath );
        if( spriteSheet === undefined )
            throw new Error( 'Sprite sheet mesh file missing (' + filePath + ')!' );

        return spriteSheet;
    }
    
    //
    //  DESC: Clear all the sprite sheet data
    //
    clear()
    {
        if( this.spriteSheetMap.size )
            this.spriteSheetMap.clear();
    }
}

export var spriteSheetManager = new SpriteSheetManager;
