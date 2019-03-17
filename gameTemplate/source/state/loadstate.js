
// 
//  FILE NAME: loadstate.js
//  DESC:      All this state does is unload/load and does a state change.
//

"use strict";

import { GameState } from './gamestate';
import { shaderManager } from '../../../library/managers/shadermanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { textureManager } from '../../../library/managers/texturemanager';
import { vertexBufferManager } from '../../../library/managers/vertexbuffermanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager'
import { settings } from '../../../library/utilities/settings';
import { Sprite } from '../../../library/sprite/sprite';
import { Camera } from '../../../library/common/camera';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { gl, device } from '../../../library/system/device';
import * as titleScreenState from '../state/titlescreenstate';
import * as runState from '../state/runstate';
import * as stateDefs from './statedefs';

const MIN_LOAD_TIME = 1000;

export class LoadState extends GameState
{
    constructor( stateMessage, gameLoopCallback )
    {
        super( stateDefs.EGS_GAME_LOAD, stateMessage.loadState, gameLoopCallback );
        
        this.stateMessage.loadState = stateMessage.loadState;
        this.stateMessage.unloadState = stateMessage.unloadState;
        
        this.camera = new Camera();
        
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
            ( callback ) => objectDataManager.createFromData( groupAry, this.preloadComplete.bind(this) ));
    
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Preload is complete. Start the game loop which will fade in the screen
    //
    preloadComplete()
    {
        this.loadAnim = new Sprite( objectDataManager.getData( '(loadingScreen)', 'loadAnim' ) );
        this.loadAnim.object.setPosXYZ( settings.defaultSize_half.w - 150, -(settings.defaultSize_half.h - 150), 0 );
        this.loadAnim.prepareScriptFactory( scriptManager.get('State_PlayLoadAnim') );
        this.loadAnim.object.transform();
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();

        // Start the game loop
        requestAnimationFrame( this.callback );
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
        
                console.log('Load State Complete!: ');
            }
        }
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        this.scriptComponent.update();
        this.loadAnim.update();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        this.loadAnim.render( this.camera );
    }
    
    // 
    //  DESC: Load the assets
    //
    assetLoad()
    {
        // Set the timer to see how long the load takes
        highResTimer.timerStart();
        
        if( this.stateMessage.loadState === stateDefs.EGS_TITLE_SCREEN )
            titleScreenState.load();
        
        else if( this.stateMessage.loadState === stateDefs.EGS_RUN )
            runState.load();
        
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
        
        this.loadAnim.cleanUp();
    }
}
