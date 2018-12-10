
// 
//  FILE NAME: startupstate.js
//  DESC:      startup state class
//

"use strict";

import { shaderManager } from '../../../library/managers/shadermanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { textureManager } from '../../../library/managers/texturemanager';
import { vertexBufferManager } from '../../../library/managers/vertexbuffermanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { fontManager } from '../../../library/managers/fontmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { signalManager } from '../../../library/managers/signalmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { Sprite } from '../../../library/sprite/sprite';
import { gl, device } from '../../../library/system/device';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { assetHolder } from '../../../library/utilities/assetholder';
import { UIProgressBar } from '../../../library/gui/uiprogressbar';
import { Camera } from '../../../library/utilities/camera';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import * as titleScreenState from '../state/titlescreenstate';
import * as utilScripts from '../scripts/utilityscripts';
import * as stateScripts from '../scripts/statescripts';
import * as menuScripts from '../scripts/menuscripts';
import * as state from './gamestate';
import * as genFunc from '../../../library/utilities/genfunc';
import * as stateDefs from './statedefs';

const STARTUP_ASSET_COUNT = 83,
      MIN_LOAD_TIME = 1500;

export class StartUpState extends state.GameState
{
    constructor( gameLoopCallback )
    {
        super( state.GAME_STATE_STARTUP, state.GAME_STATE_TITLESCREEN, gameLoopCallback );
        
        // Load the scripts
        utilScripts.loadScripts();
        stateScripts.loadScripts();
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Init the progress bar counter
        this.progressCounter = 0;
        
        // Create the camera
        this.camera = new Camera();
        
        // Preload assets for the startup screen
        this.preload();
    }

    // 
    //  DESC: Do the preload
    //
    preload()
    {
        let groupAry = ['(startup)'];
        
        // Set the load manager's callback when everything is loaded
        loadManager.loadCompleteCallback = this.preloadComplete.bind(this);
        
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
    //  DESC: Preload is complete. Start the game loop which will fade in the screen
    //
    preloadComplete()
    {
        // Create the logo
        this.spriteLogo = new Sprite( objectDataManager.getData( '(startup)', 'logo' ) );
        this.spriteLogo.object.setScaleXYZ( 1.5, 1.5, 1 );
        this.spriteLogo.object.transform();

        // create the progress bar
        this.progressBar = new UIProgressBar( '(startup)' );
        this.progressBar.setPosXYZ( 0, -350, 0 );
        this.progressBar.loadSpriteFromArray( ['progress_frame', 'progress_solid'], 1 );
        this.progressBar.initProgressBar( STARTUP_ASSET_COUNT );
        this.progressBar.transform();

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
        
                console.log('StartUp State load complete!: ' + this.progressCounter);
            }
        }
    }

    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        this.scriptComponent.update();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        this.spriteLogo.render( this.camera );
        this.progressBar.render( this.camera );
    }
    
    // 
    //  DESC: Load the assets
    //
    assetLoad()
    {
        // Set the timer to see how long the load takes
        highResTimer.timerStart();
        
        // Set the function to be called to update the progress bar during the download
        signalManager.connect_loadComplete( this.progressbarUpdate.bind(this) );
        
        let groupAry = ['(menu)'];
        
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
                        strategyManager.loadListTable( xmlNode );
                        
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

        // Load the object data list table and (startup) group
        loadManager.add(
            ( callback ) =>
            {
                genFunc.downloadFile( 'xml', 'data/objects/3d/objectDataList/dataListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        objectDataManager.loadListTable( xmlNode );
                        callback();
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
                menuManager.init();
                
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
                // Load the menu scripts before creating the menus
                menuScripts.loadScripts();
        
                // Create the menu group
                menuManager.createGroup( ['(menu)'] );
                
                callback();
            });
            
        // Load the state specific assets
        titleScreenState.load();
        
        // Last thing to do is send a message that the asset load is complete
        loadManager.add(
            ( callback ) => eventManager.dispatchEvent( stateDefs.ESE_ASSET_LOAD_COMPLETE ) );
        
        // Start the load
        loadManager.load();
    }
    
    // 
    //  DESC: progress bar update callback function
    //
    progressbarUpdate()
    {
        this.progressBar.incCurrentValue( ++this.progressCounter );
        this.progressBar.transform();
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        objectDataManager.freeGroup( ['(startup)'] );
        assetHolder.deleteGroup( ['(startup)','(menu)'] );
        
        this.spriteLogo.cleanUp();
        this.progressBar.cleanUp();
    }
}
