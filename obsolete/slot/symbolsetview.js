
// 
//  FILE NAME: symbolsetview.js
//  DESC:      Symbol set view
//

"use strict";

import { SpriteDataSetMap } from '../common/spritedatasetmap';
import { Symbol2d } from './symbol2d';

export class SymbolSetView extends SpriteDataSetMap
{
    constructor()
    {
        super();
        
        // Map of symbols created by the data
        this.symbolSetMap = new Map;
    }
    
    //
    //  DESC: Build the visible symbol set
    //
    build()
    {
        // Build the symbol set when asked for this group
        if( this.symbolSetMap.size === 0 )
        {
            // Make a visual symbol set for this reel strip.
            for( let [ key, spriteDataAry ] of this.dataSetMap.entries() )
            {
                // Check for duplicate names
                if( this.symbolSetMap.has( key ) )
                    throw new Error( `Duplicate symbol name (${key})!` );
                
                this.symbolSetMap.set( key, new Symbol2d( spriteDataAry, key ) );
            }
        }
    }
    
    //
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        for( let [ key, symbol2D ] of this.symbolSetMap.entries() )
            symbol2D.init();
    }
    
    //
    //  DESC: Clean  up the visual symbols
    //
    cleanUp()
    {
        for( let [ key, symbol2D ] of this.symbolSetMap.entries() )
            symbol2D.cleanUp();
    }

    //
    //  DESC: Get the symbol set created by the data
    //
    getSymbol( symbId )
    {
        // Use the math symbol ID to find the visual symbol
        let symbol = this.symbolSetMap.get( symbId );
        if( !symbol )
            throw new Error( `View symbol not found in symbol set (${symbId})!` );

        return symbol;
    }
}
