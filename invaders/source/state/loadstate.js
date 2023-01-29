
// 
//  FILE NAME: loadstate.js
//  DESC:      All this state does is unload/load and does a state change.
//

"use strict";

import { GameState } from './gamestate';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager'
import { settings } from '../../../library/utilities/settings';
import { signalManager } from '../../../library/managers/signalmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as titleScreenState from './titlescreenstate';
import * as level1State from './level1state';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import loadScreenStrategyLoader from 'raw-loader!../../data/objects/strategy/state/loadscreen.loader';

const MIN_LOAD_TIME = 1000;

export class LoadState extends GameState
{
    constructor( stateMessage, gameLoopCallback )
    {
        super( stateDefs.EGS_GAME_LOAD, stateMessage.loadState, gameLoopCallback );
        
        this.stateMessage.loadState = stateMessage.loadState;
        this.stateMessage.unloadState = stateMessage.unloadState;
        
        this.loadCounter = 0;
        this.maxLoadCount = 0;
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 250, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) );
        
        // Clear the event queue
        eventManager.clear();
        
        // Preload assets for the loading screen
        this.preload();
    }
    
    // 
    //  DESC: Do the preload
    //
    preload()
    {
        let groupAry = ['(loadingScreen)'];

        // Load the Object Manager group
        objectDataManager.loadGroup( groupAry )

            // Create and load all the actor strategies.
            .then(() => strategyLoader.loadFromXml( genFunc.stringLoadXML( loadScreenStrategyLoader ) ))

            // Clean up the temporary files
            .then(() =>
            {
                assetHolder.deleteGroup( groupAry );
                spriteSheetManager.deleteGroup( groupAry );
            })

            // Last thing to do is call the preload complete function
            .then(() => this.preloadComplete() );
    }
    
    // 
    //  DESC: Preload is complete. Start the game loop which will fade in the screen
    //
    preloadComplete()
    {
        // Position at the bottom of the screen.
        let strategy = strategyManager.activateStrategy( '_loading-screen_' );
        strategy.get( 'loadAnim' ).get().setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
        this.loadFont = strategy.get( 'load_font' ).get();
        this.loadFont.setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();

        // Start the game loop
        requestAnimationFrame( this.callback );
    }

    // 
    //  DESC: Load callback
    //
    loadCallback()
    {
        ++this.loadCounter;
        this.loadFont.visualComponent.createFontString( `${Math.trunc((this.loadCounter / this.maxLoadCount) * 100)}%` );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        if( event instanceof GenericEvent )
        {
            if( event.type === stateDefs.ESE_FADE_IN_COMPLETE )
            {
                if( event.arg[0] === stateDefs.ESE_FADE_GAME_STATE_CHANGE )
                    this.assetLoad();
            }
            else if( event.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                if( event.arg[0] === stateDefs.ESE_FADE_GAME_STATE_CHANGE )
                    this.stateChange = true;
            }
            else if( event.type === stateDefs.ESE_ASSET_LOAD_COMPLETE )
            {
                let loadTime = highResTimer.timerStop();
                
                // If the load was too fast, do a timeout of the difference before fading out
                if( loadTime > MIN_LOAD_TIME )
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) );
                else
                    setTimeout( () => this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) ), MIN_LOAD_TIME - loadTime );

                // Disconnect to the load signal
                signalManager.clear_loadComplete();
        
                console.debug(`${this.getStateStr(this.stateMessage.loadState)} Count: ${this.loadCounter}`);
            }
        }
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        this.scriptComponent.update();
        strategyManager.update();
    }

    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        strategyManager.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        strategyManager.render();
    }
    
    // 
    //  DESC: Load the assets
    //
    assetLoad()
    {
        // Set the function to be called to update the progress bar during the download
        signalManager.connect_loadComplete( this.loadCallback.bind(this) );

        // Set the timer to see how long the load takes
        highResTimer.timerStart();

        let promise = 0;
        
        if( this.stateMessage.loadState === stateDefs.EGS_TITLE_SCREEN )
        {
            this.maxLoadCount = titleScreenState.ASSET_COUNT;
            promise = titleScreenState.load();
        }
        else if( this.stateMessage.loadState === stateDefs.EGS_LEVEL_1 )
        {
            this.maxLoadCount = level1State.ASSET_COUNT;
            promise = level1State.load();
        }

        return promise

            // Time out to give it a few cycles to update the last value
            .then(() => {return new Promise(resolve => setTimeout(resolve, 500))})

            // Last thing to do is to dispatch the event that the load is complete
            .then( () => eventManager.dispatchEvent( stateDefs.ESE_ASSET_LOAD_COMPLETE ) );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Free the state assets from the video memory
        objectDataManager.freeGroup( ['(loadingScreen)'] );
        
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_loading-screen_'] );
    }
}
