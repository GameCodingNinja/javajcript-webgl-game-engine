
// 
//  FILE NAME: setstrategy.js
//  DESC:      Strategy for holding different sets
//

"use strict";

import { iSpriteStrategy } from '../common/ispritestrategy';

export class SetStrategy extends iSpriteStrategy
{
    constructor()
    {
        super();
        
        // Map in a map of all the symbol sets
        this.setDataMap = new Map;
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( strategyId, node, filePath, downloadFileCallback, finishCallback )
    {
        // Get the symbols set name
        let group = node.getAttribute( "group" );
            
        // Get the node to the symbol set list
        let symbSetNode = node.children;
        
        for( let i = 0; i < symbSetNode.length; ++i )
        {
            // Get the symbols set id
            let setId = symbSetNode[i].getAttribute( "id" );
            
            // Check for duplicate names
            if( this.setDataMap.has( setId ) )
                throw new Error( `Duplicate set (${group}, ${setId}, ${strategyId}, ${filePath})!` );
            
            // Allocate
            let symbSetViewData = this.allocateSet();
            this.setDataMap.set( setId, symbSetViewData );
            
            // Load in the symbol set data
            symbSetViewData.loadFromNode( symbSetNode[i], group, setId );
        }
    }
    
    //
    //  DESC: Allocate the set data
    //
    allocateSet()
    {
        return null;
    }
    
    //
    //  DESC: Get the symbol set view data
    //
    get( id )
    {
        let objData = this.setDataMap.get( id );
        if( objData )
            return objData;
        else
            throw new Error( `Set id can't be found (${id})!` );
        
        return null;
    }

    //
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        for( let [ key, symbolSetView ] of this.setDataMap.entries() )
            symbolSetView.init();
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let [ key, symbolSetView ] of this.setDataMap.entries() )
            symbolSetView.cleanUp();
    }
}
