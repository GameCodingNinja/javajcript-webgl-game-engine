
// 
//  FILE NAME: loadstate.js
//  DESC:      All this state does is unload/load and does a state change.
//

"use strict";

import { shaderManager } from '../../../library/managers/shadermanager';
import { textureManager } from '../../../library/managers/texturemanager';
import { vertexBufferManager } from '../../../library/managers/vertexbuffermanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager'
import { settings } from '../../../library/utilities/settings';
import { Sprite2D } from '../../../library/2d/sprite2d';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { gl, device } from '../../../library/system/device';
import * as titleScreenState from '../state/titlescreenstate';
import * as runState from '../state/runstate';
import * as state from './gamestate';

const MIN_LOAD_TIME = 1000;

export class LoadState extends state.GameState
{
    constructor( stateMessage, stateChangeCallback )
    {
        super( state.GAME_STATE_LOAD, stateMessage.loadState, stateChangeCallback );
        
        this.stateMessage.loadState = stateMessage.loadState;
        this.stateMessage.unloadState = stateMessage.unloadState;
        
        this.loadAnim = new Sprite2D( objectDataManager.getData( '(loadingScreen)', 'loadAnim' ) );
        this.loadAnim.setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
        this.loadAnim.transform();
        
        this.frameCount = this.loadAnim.getFrameCount();
        
        this.loadFrameCounter = 0;
        
        this.stateChange = true;
        
        this.loadAnimInterval = 0;
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Use the simple timer to see how long the download is
        highResTimer.timerStart();
        
        let loadAnim = this.loadAnimUpdate.bind(this);
        this.loadAnimInterval = setInterval( () => loadAnim(), 83 );
        
        shaderManager.setAllShaderValue4fv( 'additive', [1, 1, 1, 1] );
        
        // Set the load manager's callback when everything is loaded
        loadManager.loadCompleteCallback = this.loadFinished.bind(this);
        
        if( this.stateMessage.loadState === state.GAME_STATE_TITLESCREEN )
            titleScreenState.load();
        
        else if( this.stateMessage.loadState === state.GAME_STATE_RUN )
            runState.load();
        
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Load is completed so fade the logo out
    //
    loadFinished()
    {
        let loadTime = highResTimer.timerStop();
        
        if( loadTime > MIN_LOAD_TIME )
        {
            this.displayComplete();
        }
        else
        {
            let displayCompleteCallback = this.displayComplete.bind(this);
            setTimeout( () => displayCompleteCallback(), MIN_LOAD_TIME - loadTime );
        }
    }
    
    // 
    //  DESC: Load is completed so fade the logo out
    //
    displayComplete()
    {
        if( this.loadAnimInterval !== 0 )
            clearInterval( this.loadAnimInterval );

        // Load is complete so continue onto the next state
        this.callback();
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        shaderManager.setAllShaderValue4fv( 'additive', [0, 0, 0, 1] );
    }
    
    // 
    //  DESC: progress bar update
    //
    loadAnimUpdate()
    {
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        this.loadAnim.render( device.orthographicMatrix );
        
        ++this.loadFrameCounter;
        
        this.loadAnim.setFrame( this.loadFrameCounter % this.frameCount );
        
        // Unbind everything after a round of rendering
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();
    }
}
