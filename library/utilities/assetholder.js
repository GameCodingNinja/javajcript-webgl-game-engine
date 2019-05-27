
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
    //  DESC: Set the data
    //
    set( group, name, data = null )
    {
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.loadMapMap.set( group, groupMap );
        }

        let asset = groupMap.get( name );
        if( asset === undefined || asset === -1 )
            groupMap.set( name, data );
    }
    
    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, name )
    {
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.loadMapMap.set( group, groupMap );
        }
        
        let asset = groupMap.get( name );
        if( asset === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            groupMap.set( name, -1 );

            return true;
        }

        return false;
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
        if( data === undefined || data === -1 )
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
        if( this.loadMapMap.size )
            this.loadMapMap.clear();
    }
}

export var assetHolder = new AssetHolder;
