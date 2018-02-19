
// 
//  FILE NAME: startupstate.js
//  DESC:      startup state class
//

"use strict";

import { shaderManager } from '../../../library/managers/shadermanager';
import { textureManager } from '../../../library/managers/texturemanager';
import { vertexBufferManager } from '../../../library/managers/vertexbuffermanager';
import { fontManager } from '../../../library/managers/fontmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { signalManager } from '../../../library/managers/signalmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { spriteStrategyManager } from '../../../library/managers/spritestrategymanager';
import { Sprite2D } from '../../../library/2d/sprite2d';
import { gl, device } from '../../../library/system/device';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { assetHolder } from '../../../library/utilities/assetholder';
import { UIProgressBar } from '../../../library/gui/uiprogressbar';
import { slotMathManager } from '../../../library/slot/slotmathmanager';
import * as titleScreenState from '../state/titlescreenstate';
import * as utilScripts from '../scripts/utilityscripts';
import * as menuScripts from '../scripts/menuscripts';
import * as slotScripts from '../scripts/slotscripts';
import * as state from './gamestate';
import * as genFunc from '../../../library/utilities/genfunc';

const STARTUP_ASSET_COUNT = 82,
      LOGO_DISPLAY_DELAY = 2000;

export class StartUpState extends state.GameState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_STARTUP, state.GAME_STATE_TITLESCREEN, gameLoopCallback );
        
        this.stateChange = true;
        
        // Logo to fade in and out during the load
        this.spriteLogo;
        
        // progress bar to show loading
        this.progressBar;
        
        // Init fade members
        this.current = 0.0;
        this.final = 1.0;
        this.time = 500.0;
        this.inc = (this.final - this.current) / this.time;
        this.fadeCompleteCallback = this.assetLoad.bind(this);
        
        this.progressCounter = 0;
    }
    
    // 
    //  DESC: progress bar update
    //
    progressbarUpdate()
    {
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        this.spriteLogo.render( device.orthographicMatrix );
        
        this.progressBar.incCurrentValue( ++this.progressCounter );
        this.progressBar.transform();
        this.progressBar.render( device.orthographicMatrix );
        
        // Unbind everything after a round of rendering
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();
    }
    
    // 
    //  DESC: Do start up init
    //
    init()
    {
        let groupAry = ['(startup)'];
        
        // Set the load manager's callback when everything is loaded
        loadManager.loadCompleteCallback = this.startFade.bind(this);
        
        // Load the shaders
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/shaders/shader.cfg',
                    ( xmlNode ) => shaderManager.load( xmlNode, callback ) );
            });

        // Load the object data list table and (startup) group
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/objects/2d/objectDataList/dataListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        objectDataManager.loadListTable( xmlNode );
                        
                        // Load the object data XML's
                        objectDataManager.loadXMLGroup2D( groupAry, callback );
                    });
            });
            
        // Load all the textures associated with this group
        loadManager.add(
            ( callback ) => objectDataManager.loadTextureGroup2D( groupAry, callback ) );
            
        // Load all the mesh files associated with this group
        loadManager.add(
            ( callback ) => objectDataManager.loadMeshGroup2D( groupAry, callback ) );
            
        // Create OpenGL objects from the loaded data
        loadManager.add(
            ( callback ) => objectDataManager.createFromData( groupAry, callback ) );
            
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Start the fade
    //
    startFade()
    {
        // Create the logo to fade in and out
        this.spriteLogo = new Sprite2D( objectDataManager.getData( '(startup)', 'logo' ) );
        this.spriteLogo.setScaleXYZ( 1.5, 1.5, 1 );
        this.spriteLogo.transform();
        
        this.progressBar = new UIProgressBar( '(startup)' );
        this.progressBar.setPosXYZ( 0, -350, 0 );
        this.progressBar.loadSpriteFromArray( ['progress_frame', 'progress_solid'], 1 );
        this.progressBar.initProgressBar( STARTUP_ASSET_COUNT );
        this.progressBar.transform();
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        // Start the fade
        requestAnimationFrame( this.fade.bind(this) );
    }
    
    // 
    //  DESC: handle the logo fade in
    //
    fade()
    {
        highResTimer.calcElapsedTime();
        this.time -= highResTimer.elapsedTime;
        
        if( this.time < 0 )
        {
            this.renderFade( this.final );
            this.fadeCompleteCallback();
        }
        else
        {
            this.current += this.inc * highResTimer.elapsedTime;
            this.renderFade( this.current );
            
            // Continues the loop
            requestAnimationFrame( this.fade.bind(this) );
        }
    }
    
    // 
    //  DESC: Render the fade
    //
    renderFade( value )
    {
        for( let [ key, shaderData ] of shaderManager.shaderMap.entries() )
            shaderManager.setShaderValue4fv( key, 'additive', [value, value, value, 1] );
        
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        this.spriteLogo.render( device.orthographicMatrix );
        this.progressBar.render( device.orthographicMatrix );
        
        // Unbind everything after a round of rendering
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();
    }
    
    // 
    //  DESC: Load the assets
    //
    assetLoad()
    {
        // Set the function to be called to update the progress bar during the download
        signalManager.connect_loadComplete( this.progressbarUpdate.bind(this) );
        
        // Use the simple timer to see how long the download is
        highResTimer.timerStart();
        
        // Load the scripts
        menuScripts.loadScripts();
        utilScripts.loadScripts();
        slotScripts.loadScripts();
        
        let groupAry = ['(menu)','(loadingScreen)'];
        
        // Set the load manager's callback when everything is loaded
        loadManager.loadCompleteCallback = this.loadComplete.bind(this);
        
        // Load the fonts
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/textures/fonts/font.lst',
                    ( xmlNode ) => fontManager.load( xmlNode, callback ) );
            });
        
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
            ( callback ) => objectDataManager.createFromData( groupAry, callback ) );
    
        // Load the Sprite Strategy Manager list table
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/objects/2d/spritestrategy/spriteStrageyListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        spriteStrategyManager.loadListTable( xmlNode );
                        
                        callback();
                    });
            });

        // Load the sound list table and (menu) group
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/sound/soundListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        soundManager.loadListTable( xmlNode );
                        
                        // Preload the menu group
                        soundManager.loadGroup( ['(menu)'], callback );
                    });
            });
            
        // Load the action manager
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/settings/controllerMapping.cfg',
                    ( xmlNode ) =>
                    {
                        actionManager.load( xmlNode );
                        callback();
                    });
            });
            
        // Preload the menu group
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/objects/2d/menu/menuListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        menuManager.loadListTable( xmlNode );
                        
                        genFunc.downloadFile( 'xml', 'data/objects/2d/menu/menu_action.list',
                            ( xmlNode ) =>
                            {
                                // Load the menu action table
                                menuManager.loadMenuAction( xmlNode );
                                
                                // Preload the menu group
                                menuManager.preloadGroup( ['(menu)'], callback );
                            });
                    });
            });
            
        loadManager.add(
            ( callback ) =>
            {
                // Create the menu group
                menuManager.createGroup( ['(menu)'] );
                
                callback();
            });
            
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/objects/2d/slot/mathListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the symbol set view data list table
                        slotMathManager.loadListTable( xmlNode );
                        
                        callback();
                    });
            });
            
        // Load the state specific assets
        titleScreenState.load();
        
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: Load is completed so fade the logo out
    //
    loadComplete()
    {
        signalManager.clear_loadComplete();
        console.log(`StartUp State Download Count: ${this.progressCounter}`);
        
        // Init fade members
        this.current = 1.0;
        this.final = 0.0;
        this.time = 500.0;
        this.inc = (this.final - this.current) / this.time;
        this.fadeCompleteCallback = this.callback;
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        let downloadTime = highResTimer.timerStop();
        
        if( downloadTime > LOGO_DISPLAY_DELAY )
            requestAnimationFrame( this.fade.bind(this) );
        else
            setTimeout( () => requestAnimationFrame( this.fade.bind(this) ), LOGO_DISPLAY_DELAY - downloadTime );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        objectDataManager.freeGroup( ['(startup)'] );
        assetHolder.deleteGroup( ['(startup)','(menu)','(loadingScreen)'] );
    }
}
