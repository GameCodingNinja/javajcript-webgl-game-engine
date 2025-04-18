
// 
//  FILE NAME: localstorage.js
//  DESC:      local storage class
//

"use strict";

import { settings } from '../utilities/settings';

var YTGameData = null;

// Has to be placed in this function to work
async function getYTGameData()
{
    if( typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV)
        YTGameData = await ytgame.game.loadData();
}

await getYTGameData();

class LocalStorage
{
    constructor()
    {
        this.buffer = null;
        this.storage = null;
    }

    // 
    //  DESC: Init the storage be it local or youtube data
    //
    init()
    {
        try
        {
            if( typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV )
            {
                this.buffer = YTGameData;
            }
            else if( typeof window.CrazyGames !== 'undefined')
            {
                this.storage = window.CrazyGames.SDK.data;
                this.buffer = this.storage.getItem( `${settings.gameName}_${settings.gameId}` );
            }
            else
            {
                this.storage = window.localStorage;
                this.buffer = this.storage.getItem( `${settings.gameName}_${settings.gameId}` );
            }

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

            if( typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV )
            {
                ytgame.game.saveData(JSON.stringify(this.buffer)).then(() => {
                    // Handle data save success.
                    }, (e) => {
                        // Handle data save failure.
                        console.error(e);
                        // Send an error to YouTube when this happens.
                        ytgame.health.logError();
                    });
            }
            else
            {
                this.storage.setItem( `${settings.gameName}_${settings.gameId}`, JSON.stringify(this.buffer) );
            }
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

            if( typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV )
            {
                ytgame.game.saveData(JSON.stringify(this.buffer)).then(() => {
                    // Handle data save success.
                    }, (e) => {
                        // Handle data save failure.
                        console.error(e);
                        // Send an error to YouTube when this happens.
                        ytgame.health.logError();
                    });
            }
            else
            {
                this.storage.setItem( `${settings.gameName}_${settings.gameId}`, JSON.stringify(this.buffer) );
            }
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

            if( typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV )
            {
                ytgame.game.saveData('').then(() => {
                    // Handle data save success.
                    }, (e) => {
                        // Handle data save failure.
                        console.error(e);
                        // Send an error to YouTube when this happens.
                        ytgame.health.logError();
                    });
            }
            else
            {
                this.storage.clear();
            }
        }
        catch (e)
        {
            console.error( `Local storage clear error: ${e}` );
        }
    }
}

export var localStorage = new LocalStorage;