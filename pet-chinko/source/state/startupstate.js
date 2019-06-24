
//
//  FILE NAME: startupstate.js
//  DESC:      startup state class
//

"use strict";

import { GameState } from './gamestate';
import { shaderManager } from '../../../library/managers/shadermanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { fontManager } from '../../../library/managers/fontmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { cameraManager } from '../../../library/managers/cameramanager';
import { signalManager } from '../../../library/managers/signalmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import * as genFunc from '../../../library/utilities/genfunc';
import * as titleScreenState from '../state/titlescreenstate';
import * as utilScripts from '../scripts/utilityscripts';
import * as stateScripts from '../scripts/statescripts';
import * as menuScripts from '../scripts/menuscripts';
import * as levelScripts from '../scripts/levelscripts';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import dataListTable from 'raw-loader!../../data/objects/2d/objectDataList/dataListTable.lst';
import strategyListTable from 'raw-loader!../../data/objects/strategy/strageyListTable.lst';
import cameraListTable from 'raw-loader!../../data/objects/camera.lst';
import shaderCfg from 'raw-loader!../../data/shaders/shader.cfg';
import startUpStrategyLoader from 'raw-loader!../../data/objects/strategy/state/startup.loader';
import soundManagerListTable from 'raw-loader!../../data/sound/soundListTable.lst';
import physicsManagerListTable from 'raw-loader!../../data/objects/2d/physics/physicsListTable.lst';
import menuManagerListTable from 'raw-loader!../../data/objects/2d/menu/menuListTable.lst';
import fontManagerListTable from 'raw-loader!../../data/textures/fonts/font.lst';
import actionManagerCfg from 'raw-loader!../../data/settings/controllerMapping.cfg';
import menuActionLst from 'raw-loader!../../data/objects/2d/menu/menu_action.list';

const STARTUP_ASSET_COUNT = 54,
      MIN_LOAD_TIME = 1500;

export class StartUpState extends GameState
{
    constructor( gameLoopCallback )
    {
        super( stateDefs.EGS_STARTUP, stateDefs.EGS_TITLE_SCREEN, gameLoopCallback );

        // Load the list tables
        objectDataManager.loadListTableFromNode( genFunc.stringLoadXML( dataListTable ) );
        strategyManager.loadListTableFromNode( genFunc.stringLoadXML( strategyListTable ) );
        cameraManager.loadFromNode( genFunc.stringLoadXML( cameraListTable ) );
        soundManager.loadListTableFromNode( genFunc.stringLoadXML( soundManagerListTable ) );
        physicsWorldManager.loadListTableFromNode( genFunc.stringLoadXML( physicsManagerListTable ) );
        menuManager.loadListTableFromNode( genFunc.stringLoadXML( menuManagerListTable ) );
        actionManager.loadFromNode( genFunc.stringLoadXML( actionManagerCfg ) );
        menuManager.loadMenuActionFromNode( genFunc.stringLoadXML( menuActionLst ) );

        // Load the scripts
        utilScripts.loadScripts();
        stateScripts.loadScripts();
        menuScripts.loadScripts();
        levelScripts.loadScripts();

        // Set the default camera
        // NOTE: Can only call this after Camera Manager has been loaded
        menuManager.setDefaultCamera();

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 500 ) );

        // Preload assets for the startup screen
        this.preload();
    }

    //
    //  DESC: Do the preload
    //
    preload()
    {
        let groupAry = ['(startup)'];

        Promise.all([

            // Load the shaders
            shaderManager.loadFromNode( genFunc.stringLoadXML( shaderCfg ) ),

            // Load the object data
            objectDataManager.loadGroup( ['(startup)'] )

        ])
        // Create and load all the actor strategies.
        .then(() => strategyLoader.load( genFunc.stringLoadXML( startUpStrategyLoader ) ))

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
        // Prepare the strategies to run
        this.progressBar = strategyManager.get( '_startup_' ).get( 'UIProgressBar' ).get();
        this.progressBar.setProgressBarMax( STARTUP_ASSET_COUNT );
        
        strategyManager.activateStrategy('_startup_');

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
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500 ) );
                else
                    setTimeout( () => this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500 ) ), MIN_LOAD_TIME - loadTime );
                
                // Disconnect to the load signal
                signalManager.clear_loadComplete();

                console.log( 'StartUp State load complete!: ' + this.progressBar.curValue );
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
        signalManager.connect_loadComplete( this.progressBar.incCurrentValue.bind(this.progressBar) );

        let groupAry = ['(menu)'];

        Promise.all([

            // Load the Sound Manager group
            soundManager.loadGroup( groupAry ),

            // Load the Object Manager group
            objectDataManager.loadGroup( groupAry ),

            // Load the fonts
            fontManager.loadFromNode( genFunc.stringLoadXML( fontManagerListTable ) ),

            // Load the menu XMLs
            menuManager.loadGroupXML( groupAry )
        ])
        .then( () => Promise.all([

            // Create menu objects from loaded xml data
            menuManager.createFromData( groupAry ),

            // Load the state specific assets
            titleScreenState.load()

        ]))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })

        // Time out to give it a few cycles to update the last value
        .then(() => {return new Promise(resolve => setTimeout(resolve, 500))})

        // Last thing to do is to dispatch the event that the load is complete
        .then( () => eventManager.dispatchEvent( stateDefs.ESE_ASSET_LOAD_COMPLETE ) )
    }

    //
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_startup_'] );

        // Free the state assets from the video memory
        objectDataManager.freeGroup( ['(startup)'] );
    }
}
