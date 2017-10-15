
// 
//  FILE NAME: bigpaybackstate.js
//  DESC:      Slot game state
//

"use strict";

import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { betManager } from '../../../library/slot/betmanager';
import { Sprite2D } from '../../../library/2d/sprite2d';
import { device } from '../../../library/system/device';
import { CommonState } from './commonstate';
import { slotMathManager } from '../../../library/slot/slotmathmanager';
import { symbolSetViewManager } from '../../../library/slot/symbolsetviewmanager';
import { SimpleCycleResults } from '../../../library/slot/simplecycleresults';
import { SlotGame } from '../../../library/slot/slotgame';
import { FrontPanel } from '../game/frontpanel';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';
import * as slotDefs from '../../../library/slot/slotdefs';

const group = '(big_pay_back)';

export class BigPayBackState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_BIG_PAY_BACK, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.background = new Sprite2D( objectDataManager.getData( group, 'background' ) );
        this.background.transform();

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Allocate the slot game
        this.slotGame = new SlotGame( group );
        
        // Allocate the front panel
        this.frontPanel = new FrontPanel;
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['confirmation_tree', 'base_game_tree'] );
        
        // Load the slot config
        this.slotGame.loadSlotConfig( assetHolder.get( group, 'slotCfg' ) );
        
        // Create the slot group
        this.slotGame.createSlotGroup(
            slotDefs.ED_REEL,
            'main_reel_strip',
            'main_paytable',
            slotMathManager.getSlotMath( group, "slot" ),
            assetHolder.get( group, 'reelgroup' ),
            assetHolder.get( group, 'spinProfile' ),
            symbolSetViewManager.getViewData( group, "base_game" ),
            new SimpleCycleResults );
            
        // Init after all slot groups have been created. Currently used for setting up the font sprites
        this.slotGame.init();
            
        // Hook the Play button to the reel group
        let playBtn = menuManager.getMenuControl( 'base_game_menu', 'play_btn' );
        playBtn.connect_ExecutionAction( this.slotGame.playGame.bind(this.slotGame) );
        
        this.frontPanel.setMeters(
            menuManager.getMenuControl( 'base_game_menu', 'win_meter' ),
            menuManager.getMenuControl( 'base_game_menu', 'credit_meter' ) );
            
        this.slotGame.setFrontPanel( this.frontPanel );
        
        // Init the meters
        this.frontPanel.initGame( betManager.getCredits() );
        
        // Set the line bet and the total numvber of lines bet
        betManager.setLineBet(1);
        betManager.setTotalLines( slotMathManager.getPaylineSet('15_3x5').line.length );
        
        assetHolder.deleteGroup( [group] );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Currently used for cleaning up after the font sprites and sprites with physics
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
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }
    }

    // 
    //  DESC: Handle any misc processing before the real work is started
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
//  DESC: Unload files
//
function unload()
{
    objectDataManager.freeGroup( [group] );
    menuManager.freeGroup( [group] );
    symbolSetViewManager.clear();
    slotMathManager.clear();
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( [group], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( [group], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( [group], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( [group], callback ) );
        
    // Load the slot math manager list table
    loadManager.add(
        ( callback ) => slotMathManager.loadGroup( [group], callback ) );

    // Load the symbol set view data manager list table
    loadManager.add(
        ( callback ) => symbolSetViewManager.loadGroup( [group], callback ) );

    // Preload the ui group
    loadManager.add(
        ( callback ) => menuManager.preloadGroup( [group], callback ) );
    
    // Create the ui group
    loadManager.add(
        ( callback ) => { menuManager.createGroup( [group] ); callback(); });

    // Load the payline config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/payline_15_3x5.cfg',
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
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/games/bigPayBack/reelgroup.cfg',
                ( xmlNode ) =>
                {
                    assetHolder.set( group, 'reelgroup', xmlNode );

                    callback();
                });
        });
        
    // Load the spin profile config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/games/bigPayBack/spinProfile.cfg',
                ( xmlNode ) =>
                {
                    assetHolder.set( group, 'spinProfile', xmlNode );

                    callback();
                });
        });
        
    // Load the slot config
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/slot/games/bigPayBack/slot.cfg',
                ( xmlNode ) =>
                {
                    assetHolder.set( group, 'slotCfg', xmlNode );

                    callback();
                });
        });
}
