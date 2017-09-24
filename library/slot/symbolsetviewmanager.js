
//
//  FILE NAME: symbolsetviewmanager.js
//  DESC:      Singleton for managing different symbol view sets
//

"use strict";

import { SymbolSetView } from './symbolsetview';
import { assetHolder } from '../utilities/assetholder';
import { ManagerBase } from '../managers/managerbase';

class SymbolSetViewManager extends ManagerBase
{
    constructor()
    {
        super();
        
        // Map in a map of all the symbol sets
        this.symbolSetViewDataMap = new Map;
    }
    
    //
    //  DESC: Get the symbol set view data
    //
    getViewData( group, name )
    {
        // Get the group map
        let groupMap = this.symbolSetViewDataMap.get( group );
        if( groupMap !== undefined )
        {
            let objData = groupMap.get( name );
            if( objData )
                return objData;
            else
                throw new Error( `Symbol set name can't be found (${group}, ${name})!` );
        }
        else
            throw new Error( `Symbol set group can't be found (${group}, ${name})!` );
        
        return null;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry, finishCallback )
    {
        super.loadGroup( 'Symbol set view data', this.symbolSetViewDataMap, groupAry, finishCallback );
    }
    
    //
    //  DESC: Load all slot math data from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the group map
        let groupMap = this.symbolSetViewDataMap.get( group );
        
        // Get the node to the symbol set list
        let symbSetNode = node.children;
        
        for( let i = 0; i < symbSetNode.length; ++i )
        {
            // Get the symbols set name
            let name = symbSetNode[i].getAttribute( "name" );
            
            // Check for duplicate names
            if( groupMap.has( name ) )
                throw new Error( `Duplicate symbol set (${name}, ${group}, ${filePath})!` );
            
            // Allocate
            let symbSetViewData = new SymbolSetView;
            groupMap.set( name, symbSetViewData );
            
            // Load in the symbol set data
            symbSetViewData.loadFromNode( symbSetNode[i], group, name );
        }
    }
    
    //
    //  DESC: Free a symbol group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Object data list group name can't be found (${group})!` );

            // Get the group map
            let symbolSetView = this.symbolSetViewDataMap.get( group );
            if( symbolSetView )
            {
                symbolSetView.cleanUp();
                this.symbolSetViewDataMap.delete( group );
            }
        }
    }
    
    //
    //  DESC: Clear all data
    //
    clear()
    {
        for( let [ symbolSetViewKey, symbolSetViewMap ] of this.symbolSetViewDataMap.entries() )
            for( let [ key, symbol2D ] of symbolSetViewMap.entries() )
                symbol2D.cleanUp();
        
        this.symbolSetViewDataMap.clear();
    }
}

export var symbolSetViewManager = new SymbolSetViewManager;
