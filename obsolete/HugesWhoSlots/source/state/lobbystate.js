
// 
//  FILE NAME: lobbystate.js
//  DESC:      lobby state class
//

"use strict";

import { CommonState } from './commonstate';
import { Sprite2D } from '../../../library/2d/sprite2d';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { shaderManager } from '../../../library/managers/shadermanager';
import { menuManager } from '../../../library/gui/menumanager';
import { device } from '../../../library/system/device';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { betManager } from '../../../library/slot/betmanager';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';

const group = '(lobby)';

export class LobbyState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_LOBBY, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.background = new Sprite2D( objectDataManager.getData( group, 'background' ) );
        this.background.transform();
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['confirmation_tree', 'lobby_tree'] );
        
        // Init the credit meter
        menuManager.getMenuControl( "lobby_menu", "credit_meter" ).set( betManager.getCredits() );
        
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
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        this.background.render( device.orthographicMatrix );
        
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

    // Preload the menu group
    loadManager.add(
        ( callback ) => menuManager.preloadGroup( [group], callback ) );
    
    // Create the lobby menu group
    loadManager.add(
        ( callback ) => { menuManager.createGroup( [group] ); callback(); });
}
