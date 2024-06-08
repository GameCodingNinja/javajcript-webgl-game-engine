
// 
//  FILE NAME: localstorage.js
//  DESC:      local storage class
//

"use strict";

import { EAR_LEFT } from '../gui/uicontroldefs';
import { settings } from '../utilities/settings';

const NULL_STORAGE = 0,
      LOCAL_STORAGE = 1,
      YTGAME_STORAGE = 2

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
        this.storage = null;
        this.storageType = NULL_STORAGE;
    }

    // 
    //  DESC: Init the storage be it local or youtube data
    //
    init()
    {
        try
        {
            if(typeof ytgame === 'undefined')
            {
                this.storage = window.localStorage.getItem( `${settings.gameName}_${settings.gameId}` );

                this.storageType = LOCAL_STORAGE;
            }
            else if( ytgame.IN_PLAYABLES_ENV )
            {
                // Check form an empty string then data has never been saved
                this.storage = YTGameData;

                this.storageType = YTGAME_STORAGE;
            }

            if (this.storage)
            {
                this.storage = JSON.parse( this.storage );
            }
            else
            {
                this.storage = {};
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
            this.storage[key] = value;

            if( this.storageType === LOCAL_STORAGE )
            {
                window.localStorage.setItem( `${settings.gameName}_${settings.gameId}`, JSON.stringify(this.storage) );
            }
            else if( this.storageType === YTGAME_STORAGE )
            {
                ytgame.game.saveData(JSON.stringify(this.storage)).then(() => {
                    // Handle data save success.
                    }, (e) => {
                        // Handle data save failure.
                        console.error(e);
                        // Send an error to YouTube when this happens.
                        ytgame.health.logError();
                    });
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
            return this.storage[key];
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
            delete this.storage[key];

            if( this.storageType === LOCAL_STORAGE )
            {
                window.localStorage.setItem( `${settings.gameName}_${settings.gameId}`, JSON.stringify(this.storage) );
            }
            else if( this.storageType === YTGAME_STORAGE )
            {
                ytgame.game.saveData(JSON.stringify(this.storage)).then(() => {
                    // Handle data save success.
                    }, (e) => {
                        // Handle data save failure.
                        console.error(e);
                        // Send an error to YouTube when this happens.
                        ytgame.health.logError();
                    });
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
            this.storage = {};

            if( this.storageType === LOCAL_STORAGE )
            {
                window.localStorage.clear();
            }
            else if( this.storageType === YTGAME_STORAGE )
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
        }
        catch (e)
        {
            console.error( `Local storage clear error: ${e}` );
        }
    }
}

export var localStorage = new LocalStorage;