
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
        this._groupMap = this.loadMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.loadMapMap.set( group, this._groupMap );
        }

        this._asset = this._groupMap.get( name );
        if( this._asset === undefined || this._asset === -1 )
            this._groupMap.set( name, data );
    }
    
    // 
    //  DESC: Set a place holder that this data is scheduled to be loaded
    //
    allowLoad( group, name )
    {
        this._groupMap = this.loadMapMap.get( group );
        if( this._groupMap === undefined )
        {
            this._groupMap = new Map;
            this.loadMapMap.set( group, this._groupMap );
        }
        
        this._asset = this._groupMap.get( name );
        if( this._asset === undefined )
        {
            // Add an entry to the map as a 
            // place holder for future checks
            this._groupMap.set( name, -1 );

            return true;
        }

        return false;
    }
    
    // 
    //  DESC: Get the data
    //
    get( group, name )
    {
        this._groupMap = this.loadMapMap.get( group );
        if( this._groupMap === undefined )
            throw new Error( `Group does not exist! (${group}).` );
            
        this._data = this._groupMap.get( name );
        if( this._data === undefined || this._data === -1 )
            throw new Error( `Data does not exist! (${name}).` );
        
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
            this.loadMapMap.delete( this._groupAry[this._i] );
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
