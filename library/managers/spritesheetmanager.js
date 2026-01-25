
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
    load( group, filePath, xmlNode )
    {
        this._groupMap = this.spriteSheetMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.spriteSheetMapMap.set( group, this._groupMap );
        }
        
        this._spriteSheet = this._groupMap.get( filePath );
        if( this._spriteSheet === undefined || this._spriteSheet === -1 )
        {
            this._spriteSheet = new SpriteSheet;
            
            // Load the glyph data from XML node
            this._spriteSheet.loadFromNode( xmlNode );
            
            // Add a new entry to the map
            this._groupMap.set( filePath, this._spriteSheet );
        }
    }

    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, filePath )
    {
        this._groupMap = this.spriteSheetMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.spriteSheetMapMap.set( group, this._groupMap );
        }
        
        this._spriteSheet = this._groupMap.get( filePath );
        if( this._spriteSheet === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            this._groupMap.set( filePath, -1 );

            return true;
        }

        return false;
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    get( group, filePath )
    {
        this._groupMap = this.spriteSheetMapMap.get( group );
        if( this._groupMap === undefined )
            throw new Error( `Sprite sheet group does not exist! (${group}).` );
            
        this._data = this._groupMap.get( filePath );
        if( this._data === undefined )
            throw new Error( `Sprite sheet mesh file missing! (${filePath}).` );
        
        return this._data;
    }
    
    // 
    //  DESC: Delete the group
    //
    deleteGroup( group )
    {
        this._groupAry = group;
        if( !(group instanceof Array) )
            this._groupAry = [group];

        for( this._i = 0; this._i < this._groupAry.length; ++this._i )
            this.spriteSheetMapMap.delete( this._groupAry[this._i] );
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
