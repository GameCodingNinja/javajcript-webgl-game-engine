
// 
//  FILE NAME: localstorage.js
//  DESC:      local storage class
//

"use strict";

import { settings } from '../utilities/settings';

class LocalStorage
{
    constructor()
    {
        this.storage = null;

        try
        {
            this.storage = window.localStorage;

            // Test that storage works
            this.storage.setItem( settings.gameId, settings.gameName );

            if( this.storage.getItem( settings.gameId ) === settings.gameName )
            {
                this.storage.removeItem( settings.gameId );
                console.log('Local storage available.');
            }
            else
            {
                this.storage = {}; // Dummy storage if storage is not available
                console.log('Local storage NOT available.');
            }
        }
        catch (e)
        {
            console.log( `Local storage error: ${e}` );
            this.storage = {}; // Dummy storage if storage is not available
        }
    }

    // 
    //  DESC: Set the data to the storage object
    //
    set( key, value )
    {
        try
        {
            if( this.storage )
                this.storage.setItem( `${settings.gameId}_${key}`, value );
            else
                this.storage['key'] = value;
        }
        catch (e)
        {
            console.log( `Local storage set error: ${e}` );
        }
    }

    // 
    //  DESC: Get the data from the storage object
    //
    get( key )
    {
        try
        {
            if( this.storage )
                return this.storage.getItem( `${settings.gameId}_${key}` );
            else
                return this.storage['key'];
        }
        catch (e)
        {
            console.log( `Local storage get error: ${e}` );
        }
    }

    // 
    //  DESC: Free the data from the storage object
    //
    free( key )
    {
        try
        {
            if( this.storage )
                this.storage.removeItem( `${settings.gameId}_${key}` );
            else
                delete this.storage['key'];
        }
        catch (e)
        {
            console.log( `Local storage free error: ${e}` );
        }
    }

    // 
    //  DESC: Free the data from the storage object
    //
    clear( key )
    {
        try
        {
            if( this.storage )
                this.storage.clear();
            else
                this.storage = {};
        }
        catch (e)
        {
            console.log( `Local storage clear error: ${e}` );
        }
    }
}

export var localStorage = new LocalStorage;