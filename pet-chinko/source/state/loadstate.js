
// 
//  FILE NAME: loadstate.js
//  DESC:      All this state does is unload/load and does a state change.
//

"use strict";

import { GameState } from './gamestate';
import { scriptManager } from '../../../library/script/scriptmanager';
import { textureManager } from '../../../library/managers/texturemanager';
import { vertexBufferManager } from '../../../library/managers/vertexbuffermanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager'
import { signalManager } from '../../../library/managers/signalmanager';
import { ActorStrategy } from '../../../library/strategy/actorstrategy';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { settings } from '../../../library/utilities/settings';
import * as titleScreenState from '../state/titlescreenstate';
import * as level1State from '../state/level1state';
import * as stateDefs from './statedefs';

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
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 250 ) );
        
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
        
        // Load the menu assets
        // Load the xml group
        loadManager.add(
            ( callback ) => objectDataManager.loadXMLGroup2D( groupAry, callback ) );

        // Load all the textures associated with this group
        loadManager.add(
            ( callback ) => objectDataManager.loadTextureGroup2D( groupAry, callback ) );

        // Load all the meshes associated with this group
        loadManager.add(
            ( callback ) => objectDataManager.loadMeshGroup2D( groupAry, callback ) );

        // Create OpenGL objects from the loaded data
        loadManager.add(
            ( callback ) => objectDataManager.createFromData( groupAry, callback ));
    
        // Create the background strategy
        loadManager.add(
            ( callback ) => strategyManager.addStrategy( '(loadingScreen)', new ActorStrategy, callback ) );
    
            // Load the strategies
        loadManager.add(
            ( callback ) => strategyLoader.load( 'data/objects/spritestrategy/loaders/loadscreenLoad.cfg', this.preloadComplete.bind(this) ));
    
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Preload is complete. Start the game loop which will fade in the screen
    //
    preloadComplete()
    {
        // Position at the bottom of the screen.
        let strategy = strategyManager.activateStrategy( '(loadingScreen)' );
        strategy.get( 'loadAnim' ).getSprite().object.setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
        this.loadFont = strategy.get( 'load_font' ).getSprite();
        this.loadFont.object.setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
        
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
        if( event instanceof CustomEvent )
        {
            if( event.detail.type === stateDefs.ESE_FADE_IN_COMPLETE )
            {
                this.assetLoad();
            }
            else if( event.detail.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                this.stateChange = true;
            }
            else if( event.detail.type === stateDefs.ESE_ASSET_LOAD_COMPLETE )
            {
                let loadTime = highResTimer.timerStop();
                
                // If the load was too fast, do a timeout of the difference before fading out
                if( loadTime > MIN_LOAD_TIME )
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500 ) );
                else
                    setTimeout( () => this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500 ) ), MIN_LOAD_TIME - loadTime );
                
                // Disconnect to the load signal
                signalManager.clear_loadComplete();
        
                console.log(`${this.getStateStr(this.stateMessage.loadState)} Count: ${this.loadCounter}`);
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
        
        if( this.stateMessage.loadState === stateDefs.EGS_TITLE_SCREEN )
        {
            this.maxLoadCount = titleScreenState.ASSET_COUNT;
            titleScreenState.load();
        }
        else if( this.stateMessage.loadState === stateDefs.EGS_LEVEL_1 )
        {
            this.maxLoadCount = level1State.ASSET_COUNT;
            level1State.load();
        }
        
        // Last thing to do is send a message that the asset load is complete
        loadManager.add(
            ( callback ) => eventManager.dispatchEvent( stateDefs.ESE_ASSET_LOAD_COMPLETE ) );
        
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        objectDataManager.freeGroup( ['(loadingScreen)'] );
        
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['(loadingScreen)'] );
    }
}
