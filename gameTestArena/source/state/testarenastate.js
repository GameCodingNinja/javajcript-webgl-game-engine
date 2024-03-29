
//
//  FILE NAME: testarenastate.js
//  DESC:      test arena state class
//

"use strict";

import { GameState } from './gamestate';
import { shaderManager } from '../../../library/managers/shadermanager';
import { scriptManager } from '../../../library/script/scriptmanager';
//import { eventManager } from '../../../library/managers/eventmanager';
//import { fontManager } from '../../../library/managers/fontmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
//import { actionManager } from '../../../library/managers/actionmanager';
//import { menuManager } from '../../../library/gui/menumanager';
import { cameraManager } from '../../../library/managers/cameramanager';
//import { signalManager } from '../../../library/managers/signalmanager';
//import { soundManager } from '../../../library/sound/soundmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
//import { GenericEvent } from '../../../library/common/genericevent';
import * as genFunc from '../../../library/utilities/genfunc';
//import * as titleScreenState from '../state/titlescreenstate';
//import * as utilScripts from '../scripts/utilityscripts';
//import * as stateScripts from '../scripts/statescripts';
//import * as menuScripts from '../scripts/menuscripts';
import * as ssScripts from '../scripts/spaceshipscripts';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import dataListTable2D from 'raw-loader!../../data/objects/2d/objectDataList/dataListTable.lst';
//import dataListTable3D from 'raw-loader!../../data/objects/3d/objectDataList/dataListTable.lst';
import strategyListTable from 'raw-loader!../../data/objects/strategy/strageyListTable.lst';
//import soundManagerListTable from 'raw-loader!../../data/sound/soundListTable.lst';
import physicsManagerListTable from 'raw-loader!../../data/objects/2d/physics/physicsListTable.lst';
//import menuManagerListTable from 'raw-loader!../../data/objects/2d/menu/menuListTable.lst';
//import fontManagerListTable from 'raw-loader!../../data/textures/fonts/font.lst';
import cameraListTable from 'raw-loader!../../data/objects/camera.lst';
import shaderObj from '../../data/shaders/shader.json';
//import actionManagerJson from '../../data/settings/controllerMapping.json';
//import menuActionLst from 'raw-loader!../../data/objects/2d/menu/menu_action.list';
import testArenaLoader from 'raw-loader!../../data/objects/strategy/strategy.loader';

//const STARTUP_ASSET_COUNT = 80,
//      MIN_LOAD_TIME = 1500;

export class TestArenaState extends GameState
{
    constructor( gameLoopCallback )
    {
        super( stateDefs.EGS_STARTUP, stateDefs.EGS_TITLE_SCREEN, gameLoopCallback );

        // Load the list tables
        objectDataManager.loadListTableFromNode( genFunc.stringLoadXML( dataListTable2D ) );
        //objectDataManager.loadListTableFromNode( genFunc.stringLoadXML( dataListTable3D ) );
        strategyManager.loadListTableFromNode( genFunc.stringLoadXML( strategyListTable ) );
        //soundManager.loadListTableFromNode( genFunc.stringLoadXML( soundManagerListTable ) );
        physicsWorldManager.loadListTableFromNode( genFunc.stringLoadXML( physicsManagerListTable ) );
        //menuManager.loadListTableFromNode( genFunc.stringLoadXML( menuManagerListTable ) );
        cameraManager.loadFromNode( genFunc.stringLoadXML( cameraListTable ) );
        //actionManager.load( actionManagerJson );
        //menuManager.loadMenuActionFromNode( genFunc.stringLoadXML( menuActionLst ) );

        // Load the scripts
        ssScripts.loadScripts();
        //utilScripts.loadScripts();
        //stateScripts.loadScripts();
        //menuScripts.loadScripts();
                
        // Set the default camera
        // NOTE: Can only call this after Camera Manager has been loaded
        //menuManager.setDefaultCamera();

        // Create the script component and add a script
        //this.scriptComponent = new ScriptComponent;
        //this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );

        // Load assets for the test arena
        this.load();
    }

    //
    //  DESC: Load the assets
    //
    load()
    {
        let groupAry = ['(space_ship)','(main)'];

        // Set the timer to see how long the load takes
        highResTimer.timerStart();

        Promise.all([

            // Load the shaders
            shaderManager.loadFromObj( shaderObj ),

            // Load the object data
            objectDataManager.loadGroup( groupAry )

        ])
        // Create and load all the actor strategies.
        .then(() => strategyLoader.loadFromXml( genFunc.stringLoadXML( testArenaLoader ) ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })

        // Last thing to do is call the load complete function
        .then(() => this.loadComplete() );
    }

    //
    //  DESC: Load is complete. Start the game loop which will fade in the screen
    //
    loadComplete()
    {
        strategyManager.activateStrategy('_space_ship_');
        strategyManager.activateStrategy('_main_');

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
        /*if( event instanceof GenericEvent )
        {
            if( event.type === stateDefs.ESE_FADE_IN_COMPLETE )
            {
                this.assetLoad();
            }
            else if( event.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                this.stateChange = true;
            }
            else if( event.type === stateDefs.ESE_ASSET_LOAD_COMPLETE )
            {
                let loadTime = highResTimer.timerStop();

                // If the load was too fast, do a timeout of the difference before fading out
                if( loadTime > MIN_LOAD_TIME )
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500 ) );
                else
                    setTimeout( () => this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500 ) ), MIN_LOAD_TIME - loadTime );
                
                // Disconnect to the load signal
                signalManager.clear_loadComplete();

                console.log('StartUp State load complete!: ' + this.progressBar.curValue);
            }
        }*/
    }

    //
    //  DESC: Update objects that require them
    //
    update()
    {
        //this.scriptComponent.update();
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
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        //strategyManager.deleteStrategy( ['_startup_'] );

        // Free the state assets from the video memory
        //objectDataManager.freeGroup( ['(startup)'] );
    }
}
