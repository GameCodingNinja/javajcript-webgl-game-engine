
// 
//  FILE NAME: symbolsetview.js
//  DESC:      Symbol set view
//

"use strict";

import { SpriteData } from '../common/spritedata';
import { Symbol2d } from './symbol2d';

export class SymbolSetView
{
    constructor()
    {
        // Map of the data for creating symbols
        this.symbolSetDataMap = new Map;
        
        // Map of symbols created by the data
        this.symbolSetMap = new Map;
    }
    
    //
    //  DESC: Load thes reel group data from node
    //
    loadFromNode( node, group, name )
    {
        // Get the childern of this node
        let symbolNode = node.children;

        for( let i = 0; i < symbolNode.length; ++i )
        {
            // Get the symbols string id
            let id = symbolNode[i].getAttribute( 'id' );
            
            // Check for duplicate id's
            if( this.symbolSetDataMap.has( id ) )
                throw new Error( `Duplicate symbol id (${id}, ${group}, ${name})!` );

            // Add the array to the map
            let symbViewDataAry = [];
            this.symbolSetDataMap.set( id, symbViewDataAry );
            
            let spriteNode = symbolNode[i].children;

            for( let j = 0; j < spriteNode.length; ++j )
                symbViewDataAry.push( new SpriteData( spriteNode[j], group ) );
        }
    }
    
    //
    //  DESC: Build the visible symbol set
    //
    buildSymbolSetView()
    {
        // Build the symbol set when asked for this group
        if( this.symbolSetMap.size === 0 )
        {
            // Make a visual symbol set for this reel strip.
            for( let [ key, spriteDataAry ] of this.symbolSetDataMap.entries() )
            {
                // Check for duplicate names
                if( this.symbolSetMap.has( key ) )
                    throw new Error( `Duplicate symbol name (${key})!` );

                let symbol = new Symbol2d( spriteDataAry, key );
                symbol.init();
                
                this.symbolSetMap.set( key, symbol );
            }
        }
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
    //  DESC: Get the vector of sprite data
    //
    getSpriteData( symb )
    {
        let spriteDataAry = this.symbolSetDataMap.get( symb );
        if( !spriteDataAry )
            throw new Error( `View symbol data not found in symbol set (${symb})!` );

        return spriteDataAry;
    }

    //
    //  DESC: Get the symbol set created by the data
    //
    getSymbol( symb )
    {
        // Use the math symbol ID to find the visual symbol
        let symbol = this.symbolSetMap.get( symb );
        if( !symbol )
            throw new Error( `View symbol not found in symbol set (${symb})!` );

        return symbol;

    }   // GetSymbol
}
