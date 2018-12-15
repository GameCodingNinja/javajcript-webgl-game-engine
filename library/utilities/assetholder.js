
// 
//  FILE NAME: assetholder.js
//  DESC:      Class for holding loaded file data
//

"use strict";

class AssetHolder
{
    constructor()
    {
        this.loadMapMap = new Map;
    }
    
    // 
    //  DESC: Check for the data
    //
    has( group, name )
    {
        // Get the group map
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
            return false;
        
        return groupMap.has(name);
    }
    
    // 
    //  DESC: Set the data
    //
    set( group, name, data = null )
    {
        console.log(`AssetHolder Set: ${group}, ${name}`);
        
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.loadMapMap.set( group, groupMap );
        }
        
        groupMap.set( name, data );
    }
    
    // 
    //  DESC: Get the data
    //
    get( group, name )
    {
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
            throw new Error( `Group does not exist! (${group}).` );
            
        let data = groupMap.get( name );
        if( data === undefined )
            throw new Error( `Data does not exist! (${name}).` );
        
        return data;
    }
    
    // 
    //  DESC: Delete the group
    //
    deleteGroup( groupAry )
    {
        for( let i = 0; i < groupAry.length; ++i )
            this.loadMapMap.delete( groupAry[i] );
    }
    
    // 
    //  DESC: Clear the group data
    //
    clear()
    {
        this.loadMapMap = new Map;
    }
}

export var assetHolder = new AssetHolder;
