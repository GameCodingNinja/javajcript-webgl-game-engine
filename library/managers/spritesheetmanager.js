
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
        this.spriteSheetMapMap = new Map;
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    load( group, filePath, node )
    {
        let groupMap = this.spriteSheetMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.spriteSheetMapMap.set( group, groupMap );
        }
        
        let spriteSheet = groupMap.get( filePath );
        if( spriteSheet === undefined || spriteSheet === -1 )
        {
            spriteSheet = new SpriteSheet;
            
            // Load the glyph data from XML node
            spriteSheet.loadFromNode( node );
            
            // Add a new entry to the map
            groupMap.set( filePath, spriteSheet );
        }
    }

    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, filePath )
    {
        let groupMap = this.spriteSheetMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.spriteSheetMapMap.set( group, groupMap );
        }
        
        let spriteSheet = groupMap.get( filePath );
        if( spriteSheet === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            groupMap.set( filePath, -1 );

            return true;
        }

        return false;
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    get( group, filePath )
    {
        let groupMap = this.spriteSheetMapMap.get( group );
        if( groupMap === undefined )
            throw new Error( `Sprite sheet group does not exist! (${group}).` );
            
        let data = groupMap.get( filePath );
        if( data === undefined )
            throw new Error( `Sprite sheet mesh file missing! (${filePath}).` );
        
        return data;
    }
    
    // 
    //  DESC: Delete the group
    //
    deleteGroup( groupAry )
    {
        for( let i = 0; i < groupAry.length; ++i )
            this.spriteSheetMapMap.delete( groupAry[i] );
    }
    
    //
    //  DESC: Clear all the sprite sheet data
    //
    clear()
    {
        if( this.spriteSheetMapMap.size )
            this.spriteSheetMapMap.clear();
    }
}

export var spriteSheetManager = new SpriteSheetManager;
