
//
//  FILE NAME: startupstate.js
//  DESC:      startup state class
//

"use strict";

import { GameState } from './gamestate';
import { shaderManager } from '../../../library/managers/shadermanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { fontManager } from '../../../library/managers/fontmanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { cameraManager } from '../../../library/managers/cameramanager';
import { signalManager } from '../../../library/managers/signalmanager';
import { soundManager } from '../../../library/sound/soundmanager';
import { settings } from '../../../library/utilities/settings';
import { aiManager } from '../../../library/managers/aimanager';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { scriptSingleton } from '../../../library/script/scriptcomponent';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as level1State from './level1state';
import * as utilScripts from '../scripts/utilityscripts';
import * as stateScripts from '../scripts/statescripts';
import * as menuScripts from '../scripts/menuscripts';
import * as menuDefs from '../../../library/gui/menudefs';
import * as levelScripts from '../scripts/levelscripts';
import * as playershipscripts from '../scripts/playershipscripts';
import * as enemy00scripts from '../scripts/enemy00scripts';
import * as enemy01scripts from '../scripts/enemy01scripts';
import * as enemy02scripts from '../scripts/enemy02scripts';
import * as keybindMenuScripts from '../scripts/keybindmenuscripts';
import * as settingsMenuScripts from '../scripts/settingsmenuscripts';
import * as aiBaseScripts from '../scripts/aibasescripts';
import * as aiScripts from '../scripts/aiscripts';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import dataListTable2D from '../../data/objects/2d/objectDataList/dataListTable.json';
import strategyListTable from '../../data/objects/strategy/strageyListTable.json';
import strategyLoaderListTable from '../../data/objects/strategy/strageyLoaderListTable.json';
import aiListTable from '../../data/objects/ai/aiListTable.json';
import soundManagerListTable from '../../data/sound/soundListTable.json';
import physicsManagerListTable from '../../data/objects/2d/physics/physicsListTable.json';
import menuManagerListTable from '../../data/objects/2d/menu/menuListTable.json';
import fontManagerListTable from '../../data/textures/fonts/fontList.json';
import cameraListTable from 'raw-loader!../../data/objects/camera.lst';
import shaderObj from '../../data/shaders/shader.json';
import actionManagerJson from '../../data/settings/controllerMapping.json';
import menuActionJSON from '../../data/objects/2d/menu/menu_action.json';
import startUpStrategyLoader from 'raw-loader!../../data/objects/strategy/state/startup.loader';

const STARTUP_ASSET_COUNT = 219,
      MIN_LOAD_TIME = 1500;

export class StartUpState extends GameState
{
    constructor( gameLoopCallback )
    {
        super( stateDefs.EGS_STARTUP, stateDefs.EGS_LEVEL_1, gameLoopCallback );

        // Load the list tables
        cameraManager.loadFromNode( genFunc.stringLoadXML( cameraListTable ) ); // Must be loaded first
        objectDataManager.loadListTableFromObj( dataListTable2D );
        strategyManager.loadListTableFromObj( strategyListTable );
        strategyLoader.loadListTableFromObj( strategyLoaderListTable );
        aiManager.loadListTableFromObj( aiListTable );
        soundManager.loadListTableFromObj( soundManagerListTable );
        physicsWorldManager.loadListTableFromObj( physicsManagerListTable );
        menuManager.loadListTableFromObj( menuManagerListTable );
        actionManager.loadFromObj( actionManagerJson );
        menuManager.loadMenuActionFromObj( menuActionJSON );

        // Load the scripts into the scriptmanager
        utilScripts.loadScripts();
        stateScripts.loadScripts();
        menuScripts.loadScripts();
        levelScripts.loadScripts();
        playershipscripts.loadScripts();
        enemy00scripts.loadScripts();
        enemy01scripts.loadScripts();
        enemy02scripts.loadScripts();
        keybindMenuScripts.loadScripts();
        settingsMenuScripts.loadScripts();
        aiBaseScripts.loadScripts();
        aiScripts.loadScripts();
                
        // Set the default camera
        // NOTE: Can only call this after Camera Manager has been loaded
        menuManager.setDefaultCamera();

        // Create the internal script component so that a script can be run across states
        scriptSingleton.prepare( scriptManager.get('ScreenFade')( 0, 1, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) );

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
            shaderManager.loadFromObj( shaderObj ),

            // Load the object data
            objectDataManager.loadGroup( groupAry )

        ])
        // Create and load all the actor strategies.
        .then(() => strategyLoader.loadFromXml( genFunc.stringLoadXML( startUpStrategyLoader ) ))

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

        // Init Youtube playable if in the environment
        if(typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV)
        {
            ytgame.system.onAudioEnabledChange((isAudioEnabled) =>
            {
                // Resume all audio
                if (isAudioEnabled)
                {
                    soundManager.resumeAllSounds();
                    //console.log('Resume all audio');
                }
                else // Suspend all audio.
                {
                    soundManager.suspendAllSounds();
                    //console.log('Suspend all audio');
                }
            });

            ytgame.system.onPause(() =>
            {
                if( menuManager.initialized && !menuManager.active)
                {
                    eventManager.dispatchEvent( menuDefs.EME_MENU_ESCAPE_ACTION, 'pause_tree' );
                }

                //console.log('Suspend game');
            });
            
            ytgame.system.onResume(() =>
            {
                if( menuManager.initialized && menuManager.active)
                {
                    eventManager.dispatchEvent( menuDefs.EME_MENU_TOGGLE_ACTION, 'pause_tree' );
                }

                //console.log('Resume game');
            });

            // Send first frame ready now that we've started to draw.
            ytgame.game.firstFrameReady();

            // Send game ready since there isn't any other processing.
            ytgame.game.gameReady();
        }

        // Start the game loop
        requestAnimationFrame( this.callback );
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
                    scriptSingleton.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) );
                else
                    setTimeout( () => scriptSingleton.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) ), MIN_LOAD_TIME - loadTime );
                
                // Disconnect to the load signal
                signalManager.clear_loadComplete();

                console.debug('StartUp State load complete!: ' + this.progressBar.totalValue);
            }
        }
    }

    //
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();

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
            soundManager.loadGroup( ['(menu)','(music)'] ),

            // Load the Object Manager group
            objectDataManager.loadGroup( groupAry ),

            // Load the fonts
            fontManager.loadFromObj( fontManagerListTable ),

            // Load the menu XMLs
            menuManager.loadGroupXML( groupAry )
        ])
        .then( () => Promise.all([

            // Create menu objects from loaded xml data
            menuManager.createFromData( groupAry ),

            // Load the state specific assets
            level1State.load()

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
        strategyManager.deleteStrategy( '_startup_' );

        // Free the state assets from the video memory
        objectDataManager.freeGroup( '(startup)' );
    }
}
