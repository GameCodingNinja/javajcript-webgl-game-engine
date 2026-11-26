
// 
//  FILE NAME: titlescreenstate.js
//  DESC:      titles screen state class
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
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';

const stateGroup = '(title_screen)';

export class TitleScreenState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_TITLESCREEN, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.background = new Sprite2D( objectDataManager.getData( stateGroup, 'background' ) );
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
        menuManager.activateTree( ['title_screen_tree'] );
        
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
        super.preRender();
        
        let matrix = device.orthographicMatrix;
        
        this.background.render( matrix );
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
    objectDataManager.freeGroup( [stateGroup] );
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
}
