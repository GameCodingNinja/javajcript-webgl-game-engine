
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
import { signalManager } from '../../../library/managers/signalmanager';
import { gl, device } from '../../../library/system/device';
import * as titleScreenState from '../state/titlescreenstate';
import * as pachinkoChallengeState from '../state/pachinkochallengestate';
import * as bigPayBackState from '../state/bigpaybackstate';
import * as state from './gamestate';

const MIN_LOAD_TIME = 500;

var bigPayBackLoadCount = 18;
var pachinkoCount = 11;

var bigPayBackLoaded = false;
var pachinkoLoaded = false;

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
        
        this.maxLoadCount = 0;
        this.loadFont = null;
        this.displayProgress = false;
        if( (stateMessage.loadState === state.GAME_STATE_BIG_PAY_BACK) && !bigPayBackLoaded )
        {
            bigPayBackLoaded = true;
            this.displayProgress = true;
            this.maxLoadCount = bigPayBackLoadCount;
        }
        else if( (stateMessage.loadState === state.GAME_STATE_PACHINKO_CHALLENGE) && !pachinkoLoaded )
        {
            pachinkoLoaded = true;
            this.displayProgress = true;
            this.maxLoadCount = pachinkoCount;
        }
            
        if( this.displayProgress )
        {
            this.loadFont = new Sprite2D( objectDataManager.getData( '(loadingScreen)', 'load_font' ) );
            this.loadFont.setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
            this.loadFont.visualComponent.setFontProperties('dejavu_sans_cond_24');
            this.loadFont.visualComponent.fontData.fontProp.kerning = -1;
            this.loadFont.visualComponent.createFontString('0%');
            this.loadFont.transform();

            // Set the function to be called to update the progress bar during the download
            signalManager.connect_loadComplete( this.loadUpdate.bind(this) );
        }
        
        this.frameCount = this.loadAnim.getFrameCount();
        
        this.loadFrameCounter = 0;
        
        this.stateChange = true;
        
        this.loadAnimInterval = 0;
        
        this.loadCounter = 0;
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    loadUpdate()
    {
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        this.loadAnim.render( device.orthographicMatrix );
        this.loadFont.render( device.orthographicMatrix );
        
        this.loadFont.visualComponent.createFontString( `${Math.trunc((this.loadCounter / this.maxLoadCount) * 100)}%` );
        ++this.loadCounter;
        
        // Unbind everything after a round of rendering
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();
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
        
        else if( this.stateMessage.loadState === state.GAME_STATE_PACHINKO_CHALLENGE )
            pachinkoChallengeState.load();
        
        else if( this.stateMessage.loadState === state.GAME_STATE_BIG_PAY_BACK )
            bigPayBackState.load();
        
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Load is completed
    //        NOTE: Extra time is added to allow viewing of the 100% in the load percentage
    //
    loadFinished()
    {
        let loadTime = highResTimer.timerStop();
        
        if( loadTime > MIN_LOAD_TIME )
        {
            if( this.displayProgress )
                setTimeout( () => displayCompleteCallback(), 200 );
            else
                this.displayComplete();
        }
        else
        {
            let extraTime = 0;
            if( this.displayProgress )
                extraTime = 200;
            
            let displayCompleteCallback = this.displayComplete.bind(this);
            setTimeout( () => displayCompleteCallback(), (MIN_LOAD_TIME - loadTime) + extraTime );
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
        console.log(`Load State Download Count: ${this.loadCounter}`);
        
        signalManager.clear_loadComplete();
        shaderManager.setAllShaderValue4fv( 'additive', [0, 0, 0, 1] );
    }
    
    // 
    //  DESC: progress bar update
    //
    loadAnimUpdate()
    {
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        this.loadAnim.render( device.orthographicMatrix );
        
        if( this.loadFont )
        {
            this.loadFont.visualComponent.createFontString( `${Math.trunc((this.loadCounter / this.maxLoadCount) * 100)}%` );
            this.loadFont.render( device.orthographicMatrix );
        }
        
        ++this.loadFrameCounter;
        
        this.loadAnim.setFrame( this.loadFrameCounter % this.frameCount );
        
        // Unbind everything after a round of rendering
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();
    }
}
