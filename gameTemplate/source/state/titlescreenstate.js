
// 
//  FILE NAME: titlescreenstate.js
//  DESC:      titles screen state class
//

"use strict";

import { CommonState } from './commonstate';
import { Sprite2D } from '../../../library/2d/sprite2d';
import { Sprite3D } from '../../../library/3d/sprite3d';
import { Camera } from '../../../library/utilities/camera';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { shaderManager } from '../../../library/managers/shadermanager';
import { menuManager } from '../../../library/gui/menumanager';
import { device } from '../../../library/system/device';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
//import { slotMathManager } from '../../../library/slot/slotmathmanager';
//import { SlotGame } from '../../../library/slot/slotgame';
//import { SimpleCycleResults } from '../../../library/slot/simplecycleresults';
//import { symbolSetViewManager } from '../../../library/slot/symbolsetviewmanager';
import { betManager } from '../../../library/slot/betmanager';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';
import * as slotDefs from '../../../library/slot/slotdefs';

export class TitleScreenState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_TITLESCREEN, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.background = new Sprite2D( objectDataManager.getData( '(title_screen)', 'background' ) );
        this.background.transform();
        
        this.camera = new Camera;
        this.camera.setPosXYZ( 0, 0, 20 );
        this.camera.setRotXYZ( 10, 0, 0 );
        
        this.cube = new Sprite3D( objectDataManager.getData( '(cube)', 'cube' ) );
        this.cube.setScaleXYZ( 3, 3, 3 );
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Allocate the slot game
        //this.slotGame = new SlotGame( '(title_screen)' );
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['title_screen_tree'] );
        
        // Create the slot group
        /*this.slotGame.createSlotGroup(
            slotDefs.ED_WHEEL,
            'wheel_strip',
            'wheel_paytable',
            slotMathManager.getSlotMath( '(title_screen)', "slot_wheel" ),
            assetHolder.get( '(title_screen)', 'wheelgroup' ),
            assetHolder.get( '(title_screen)', 'spinProfile' ),
            symbolSetViewManager.getViewData( '(title_screen)', "wheel_wedges" ),
            new SimpleCycleResults );
            
        // Init after all slot groups have been created. Currently used for setting up the font sprites
        this.slotGame.init();
        
        // Hook the Play button to the reel group
        let spinBtn = menuManager.getMenuControl( 'title_screen_menu', 'new_game_btn' );
        spinBtn.connect_ExecutionAction( this.slotGame.playGame.bind(this.slotGame) );
        
        // Set the line bet and the total numvber of lines bet
        betManager.setLineBet(1);
        betManager.setTotalLines(1);*/
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        // Start the game loop
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Currently used for cleaning up after the font sprites
        //this.slotGame.cleanUp();
        unload();
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === defs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.detail.arg[0] === defs.ETC_BEGIN )
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }
    }
    
    // 
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        //this.slotGame.processGameState();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        //this.slotGame.update();
        
        let rot = highResTimer.elapsedTime * 0.04;
        this.cube.incRotXYZ( 0, rot, 0 );
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        //this.slotGame.transform();
        
        this.camera.transform();
        this.cube.transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        super.preRender();
        
        let matrix = device.orthographicMatrix;
        
        this.background.render( matrix );
        this.cube.render( device.perspectiveMatrix, this.camera );
        
        //this.slotGame.render( matrix );
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    postRender()
    {
        super.postRender();
    }
}


// 
//  DESC: Unload files
//
function unload()
{
    objectDataManager.freeGroup( ['(title_screen)','(cube)'] );
    //symbolSetViewManager.clear();
    //slotMathManager.clear();
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( ['(title_screen)'], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( ['(title_screen)'], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( ['(title_screen)'], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(title_screen)'], callback ) );

    // Load the slot math manager list table
    /*loadManager.add(
        ( callback ) => slotMathManager.loadGroup( ['(title_screen)'], callback ) );

    // Load the symbol set view data manager list table
    loadManager.add(
        ( callback ) => symbolSetViewManager.loadGroup( ['(title_screen)'], callback ) );

    // Preload wheel group
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/wheelgroup.cfg',
                ( xmlData ) =>
                {
                    assetHolder.set( '(title_screen)', 'wheelgroup', xmlData );
                    callback();
                });
        });
        
    // Preload spin profile
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/spinProfile.cfg',
                ( xmlData ) =>
                {
                    assetHolder.set( '(title_screen)', 'spinProfile', xmlData );
                    callback();
                });
        });
        
     // Load the payline config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/payline_wheel.cfg',
                ( xmlNode ) =>
                {
                    slotMathManager.loadPaylineSetFromNode( xmlNode );

                    callback();
                });
        });*/


    // Load the object data list table and (startup) group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup3D( ['(cube)'], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup3D( ['(cube)'], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup3D( ['(cube)'], callback ) );

    // Combine the meshes with their textures
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(cube)'], callback ) );
}
