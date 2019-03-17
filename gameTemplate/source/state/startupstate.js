
//
//  FILE NAME: startupstate.js
//  DESC:      startup state class
//

"use strict";

import { GameState } from './gamestate';
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
import { cameraManager } from '../../../library/managers/cameramanager';
import { signalManager } from '../../../library/managers/signalmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { Sprite } from '../../../library/sprite/sprite';
import { gl, device } from '../../../library/system/device';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { assetHolder } from '../../../library/utilities/assetholder';
import { UIProgressBar } from '../../../library/gui/uiprogressbar';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { ActorStrategy } from '../../../library/strategy/actorstrategy';
import * as titleScreenState from '../state/titlescreenstate';
import * as utilScripts from '../scripts/utilityscripts';
import * as stateScripts from '../scripts/statescripts';
import * as menuScripts from '../scripts/menuscripts';
import * as stateDefs from './statedefs';

const STARTUP_ASSET_COUNT = 86,
      MIN_LOAD_TIME = 1500;

export class StartUpState extends GameState
{
    constructor( gameLoopCallback )
    {
        super( stateDefs.EGS_STARTUP, stateDefs.EGS_TITLE_SCREEN, gameLoopCallback );

        // Load the scripts
        utilScripts.loadScripts();
        stateScripts.loadScripts();

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );

        // Init the progress bar counter
        this.progressCounter = 0;

        // Preload assets for the startup screen
        this.preload();
    }

    //
    //  DESC: Do the preload
    //
    preload()
    {
        let groupAry = ['(startup)'];

        // Load the shaders
        loadManager.add( ( callback ) => shaderManager.load( 'data/shaders/shader.cfg', callback ) );

        // Load the object data list tables
        loadManager.add( ( callback ) => objectDataManager.loadListTable( 'data/objects/2d/objectDataList/dataListTable.lst', callback ));

        // Load the object data XML's
        loadManager.add( ( callback ) => objectDataManager.loadXMLGroup2D( groupAry, callback ) );

        // Load all the textures associated with this group
        loadManager.add( ( callback ) => objectDataManager.loadTextureGroup2D( groupAry, callback ) );

        // Load all the mesh files associated with this group
        loadManager.add( ( callback ) => objectDataManager.loadMeshGroup2D( groupAry, callback ) );

        // Create OpenGL objects from the loaded data
        loadManager.add( ( callback ) => objectDataManager.createFromData( groupAry, callback ));
        
        // Load the camera manager
        loadManager.add( ( callback ) => cameraManager.load( 'data/objects/camera.lst', callback ));
        
        // Load the list table for the strategy manager
        loadManager.add( ( callback ) => strategyManager.loadListTable( 'data/objects/spritestrategy/spriteStrageyListTable.lst', callback ));
        
        // Create the actor strategy
        loadManager.add( ( callback ) => strategyManager.addStrategy( '(startup)', new ActorStrategy, callback ) );
        
        // Load the strategies
        loadManager.add( ( callback ) => strategyLoader.load( '(startup)', 'data/objects/spritestrategy/startupLoad.cfg', this.preloadComplete.bind(this) ));
        
        // Start the load
        loadManager.load();
    }

    //
    //  DESC: Preload is complete. Start the game loop which will fade in the screen
    //
    preloadComplete()
    {
        // Set the camera
        this.camera = cameraManager.getDefault();
        
        // Prepare the strategies to run
        this.progressBar = strategyManager.get( '(startup)' ).get( 'UIProgressBar' ).getControl();
        this.progressBar.setProgressBarMax( STARTUP_ASSET_COUNT );
        
        strategyManager.activateStrategy('(startup)');

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
                
                // Disconnect to the load signal
                signalManager.clear_loadComplete();

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
        // Set the timer to see how long the load takes
        highResTimer.timerStart();

        // Set the function to be called to update the progress bar during the download
        signalManager.connect_loadComplete( this.progressbarUpdate.bind(this) );

        let groupAry = ['(menu)'];

        // Load the list tables
        loadManager.add( ( callback ) => soundManager.loadListTable( 'data/sound/soundListTable.lst', callback ));
        loadManager.add( ( callback ) => objectDataManager.loadListTable( 'data/objects/3d/objectDataList/dataListTable.lst', callback ));
        loadManager.add( ( callback ) => physicsWorldManager.loadListTable( 'data/objects/2d/physics/physicsListTable.lst', callback ));
        loadManager.add( ( callback ) => menuManager.loadListTable( 'data/objects/2d/menu/menuListTable.lst', callback ));

        // Load the fonts
        loadManager.add( ( callback ) => fontManager.load( 'data/textures/fonts/font.lst', callback ));

        // Load the xml group
        loadManager.add( ( callback ) => objectDataManager.loadXMLGroup2D( groupAry, callback ));

        // Load all the textures associated with this group
        loadManager.add( ( callback ) => objectDataManager.loadTextureGroup2D( groupAry, callback ));

        // Load all the meshes associated with this group
        loadManager.add( ( callback ) => objectDataManager.loadMeshGroup2D( groupAry, callback ));

        // Create OpenGL objects from the loaded data
        loadManager.add( ( callback ) => objectDataManager.createFromData( groupAry, callback ));

        // Load the Sound Manager group
        loadManager.add( ( callback ) => soundManager.loadGroup( groupAry, callback ));

        // Load the action manager
        loadManager.add( ( callback ) => actionManager.load( 'data/settings/controllerMapping.cfg', callback ));

        // Load the menu action
        loadManager.add( ( callback ) => menuManager.loadMenuAction( 'data/objects/2d/menu/menu_action.list', callback ));

        // Preload the menu group
        loadManager.add( ( callback ) => menuManager.preloadGroup( ['(menu)'], callback ));

        loadManager.add(
            ( callback ) =>
            {
                // Load the menu scripts before creating the menus
                menuScripts.loadScripts();
                
                // Set the default camera
                menuManager.setDefaultCamera();

                // Create the menu group
                menuManager.createGroup( ['(menu)'] );

                callback();
            });

        // Load the state specific assets
        titleScreenState.load();

        // Last thing to do is send a message that the asset load is complete
        loadManager.add( ( callback ) => eventManager.dispatchEvent( stateDefs.ESE_ASSET_LOAD_COMPLETE ) );

        // Start the load
        loadManager.load();
    }

    //
    //  DESC: progress bar update callback function
    //
    progressbarUpdate()
    {
        this.progressBar.incCurrentValue( ++this.progressCounter );
    }

    //
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['(startup)'] );
        
        // Local data no longer needed and can be deleted
        assetHolder.deleteGroup( ['(startup)', '(menu)'] );

        // Free the state assets from the video memory
        objectDataManager.freeGroup( ['(startup)'] );
    }
}
