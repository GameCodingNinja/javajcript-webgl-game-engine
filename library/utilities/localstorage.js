
// 
//  FILE NAME: localstorage.js
//  DESC:      local storage class
//

"use strict";

import { settings } from '../utilities/settings';
import { platform } from '../system/platform';

class LocalStorage
{
    constructor()
    {
        this.buffer = null;
    }

    // 
    //  DESC: Init the storage from the platform's saved data (browser localStorage, CrazyGames or YouTube)
    //        Call after platform.init()
    //
    init()
    {
        try
        {
            this.buffer = platform.loadData( `${settings.gameName}_${settings.gameId}` );

            // Check for an empty string then data has never been saved
            if (this.buffer)
            {
                this.buffer = JSON.parse( this.buffer );
            }
            else
            {
                this.buffer = {};
            }
        }
        catch (e)
        {
            console.error( `Local storage error: ${e}` );
        }
    }

    // 
    //  DESC: Set the data to the storage object
    //
    set( key, value )
    {
        try
        {
            this.buffer[key] = value;
            platform.saveData( `${settings.gameName}_${settings.gameId}`, JSON.stringify(this.buffer) );
        }
        catch (e)
        {
            console.error( `Local storage set error: ${e}` );
        }
    }

    // 
    //  DESC: Get the data from the storage object
    //
    get( key )
    {
        try
        {
            return this.buffer[key];
        }
        catch (e)
        {
            console.error( `Local storage get error: ${e}` );
        }
    }

    // 
    //  DESC: Free the data from the storage object
    //
    free( key )
    {
        try
        {
            delete this.buffer[key];
            platform.saveData( `${settings.gameName}_${settings.gameId}`, JSON.stringify(this.buffer) );
        }
        catch (e)
        {
            console.error( `Local storage free error: ${e}` );
        }
    }

    // 
    //  DESC: Free the data from the storage object
    //
    clear()
    {
        try
        {
            this.buffer = {};
            platform.clearData();
        }
        catch (e)
        {
            console.error( `Local storage clear error: ${e}` );
        }
    }
}

export var localStorage = new LocalStorage;
