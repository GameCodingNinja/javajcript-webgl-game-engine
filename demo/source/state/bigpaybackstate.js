
// 
//  FILE NAME: bigpaybackstate.js
//  DESC:      Slot game state
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { assetHolder } from '../../../library/utilities/assetholder';
import { scriptManager } from '../../../library/script/scriptmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { slotMathManager } from '../../../library/slot/slotmathmanager';
import { symbolSetViewManager } from '../../../library/slot/symbolsetviewmanager';
import { AnimatedCycleResults } from '../../../library/slot/animatedcycleresults';
import { loadManager } from '../../../library/managers/loadmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { Sprite2D } from '../../../library/2d/sprite2d';
import { settings } from '../../../library/utilities/settings';
import { device } from '../../../library/system/device';
import { betManager } from '../../../library/slot/betmanager';
import { SlotGame } from '../../../library/slot/slotgame';
import { BaseGameMusic } from '../../../library/slot/basegamemusic';
import { FrontPanel } from '../game/frontpanel';
import { CommonState } from './commonstate';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';
import * as slotDefs from '../../../library/slot/slotdefs';
import * as slotgroupFactory from '../../../library/slot/slotgroupfactory';

var assetsLoaded  = false;
export const ASSET_COUNT = 27;

const stateGroup = '(big_pay_back)';

export class BigPayBackState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_BIG_PAY_BACK, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.background = new Sprite2D( objectDataManager.getData( stateGroup, 'background' ) );
        this.background.transform();
        
        this.pig = new Sprite2D( objectDataManager.getData( stateGroup, 'pig' ) );
        this.pig.setPosXYZ( -799, -308 );
        this.pig.transform();

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Allocate the slot game
        this.slotGame = new SlotGame();
        
        // Create the slot group
        let slotGroup = slotgroupFactory.create(
            slotDefs.ED_REEL,
            'main_reel_strip',
            'main_paytable',
            slotMathManager.getSlotMath( stateGroup, "slot" ),
            assetHolder.get( stateGroup, 'reelgroup' ),
            assetHolder.get( stateGroup, 'spinProfile' ),
            symbolSetViewManager.getViewData( stateGroup, "base_game" ),
            this.slotGame.slotResults.create(),
            new AnimatedCycleResults )
        
        // Add the slot group to the game
        this.slotGame.addSlotGroup( slotGroup );
        
        // Allocate the front panel
        this.frontPanel = new FrontPanel;
        
        // Allocate the base game music component
        this.baseGameMusic = new BaseGameMusic(stateGroup, 'reelSpinMusic', 3000.0, 5000.0);
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree', 'base_game_tree'] );
            
        // Init after all slot groups have been created. Currently used for setting up the font sprites
        this.slotGame.init();
        
        // Hook the Play button to the reel group
        let playBtn = menuManager.getMenuControl( 'base_game_ui', 'play_btn' );
        playBtn.connect_ExecutionAction( this.slotGame.playGame.bind(this.slotGame) );
        
        // Set the buttons
        this.frontPanel.setButtons( playBtn, menuManager.getMenuControl( 'base_game_ui', 'total_bet_meter' ) );
        
        this.frontPanel.setMeters(
            menuManager.getMenuControl( 'base_game_ui', 'win_meter' ),
            menuManager.getMenuControl( 'base_game_ui', 'credit_meter' ) );
            
        // Add slot game components
        this.slotGame.setFrontPanel( this.frontPanel );
        this.slotGame.setGameMusic( this.baseGameMusic );
        
        // Set the line bet and the total numvber of lines bet
        betManager.setLineBet(1);
        betManager.setTotalLines( slotMathManager.getPaylineSet('40_4x5').line.length );
        
        assetHolder.deleteGroup( [stateGroup] );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        this.slotGame.cleanUp();
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
                {
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
                    this.baseGameMusic.fastFadeDown( 500 );
                }
            }
        }
        else if( event instanceof MouseEvent )
        {
            this.slotGame.handleEvent( event );
        }
    }
    
    // 
    //  DESC: Handle the misc processes
    //
    miscProcess()
    {
        this.slotGame.processGameState();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        this.baseGameMusic.update();
        
        if( !menuManager.isMenuActive() )
        {
            this.slotGame.update();
        }
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        this.slotGame.transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        let matrix = device.orthographicMatrix;
        
        this.background.render( matrix );
        
        this.slotGame.render( matrix );
        
        this.pig.render( matrix );
        
        super.preRender();
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
//  DESC: Access function for assets load check
//
export function isAssetsLoaded()
{
    return assetsLoaded;
}

export function SetAssetsLoaded()
{
    assetsLoaded = true;
}

// 
//  DESC: Unload files
//
function unload()
{
    menuManager.freeGroup( [stateGroup] );
    objectDataManager.freeGroup( [stateGroup] );
    symbolSetViewManager.clear();
    soundManager.freeGroup( [stateGroup] );
    slotMathManager.clear();
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( [stateGroup], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( [stateGroup], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( [stateGroup], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( [stateGroup], callback ) );

    // Preload the ui group
    loadManager.add(
        ( callback ) => menuManager.preloadGroup( [stateGroup], callback ) );
    
    // Create the ui group
    loadManager.add(
        ( callback ) => { menuManager.createGroup( [stateGroup] ); callback(); });

    // Load the slot math manager list table
    loadManager.add(
        ( callback ) => slotMathManager.loadGroup( [stateGroup], callback ) );

    // Load the symbol set view data manager list table
    loadManager.add(
        ( callback ) => symbolSetViewManager.loadGroup( [stateGroup], callback ) );

    // Load the sounds
    loadManager.add(
        ( callback ) => soundManager.loadGroup( [stateGroup], callback ) );

    // Load the payline config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/paylines_4x5.cfg',
                ( xmlNode ) =>
                {
                    slotMathManager.loadPaylineSetFromNode( xmlNode );

                    callback();
                });
        });
        
    // Load the reel group config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/bigPayBack/reelgroup.cfg',
                ( xmlNode ) =>
                {
                    assetHolder.set( stateGroup, 'reelgroup', xmlNode );

                    callback();
                });
        });
        
    // Load the spin profile config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/bigPayBack/spinProfile.cfg',
                ( xmlNode ) =>
                {
                    assetHolder.set( stateGroup, 'spinProfile', xmlNode );

                    callback();
                });
        });
}
