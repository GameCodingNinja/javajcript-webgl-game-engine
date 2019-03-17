
// 
//  FILE NAME: titlescreenstate.js
//  DESC:      titles screen state class
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
import { CommonState } from './commonstate';
import { Sprite } from '../../../library/sprite/sprite';
import { Camera } from '../../../library/common/camera';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { shaderManager } from '../../../library/managers/shadermanager';
import { menuManager } from '../../../library/gui/menumanager';
import { device } from '../../../library/system/device';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { ActorStrategy } from '../../../library/strategy/actorstrategy';
import { StageStrategy } from '../../../library/strategy/stagestrategy';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import * as defs from '../../../library/common/defs';
import * as stateDefs from './statedefs';

export class TitleScreenState extends CommonState
{
    constructor( gameLoopCallback )
    {
        super( stateDefs.EGS_TITLE_SCREEN, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
        strategyManager.activateStrategy('(background)');
        strategyManager.activateStrategy('(cube)');
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );

        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['title_screen_tree'] );
        
        // Clear the event queue
        eventManager.clear();
        
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
        strategyManager.update();
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        strategyManager.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        super.render();
        
        strategyManager.render();
        
        menuManager.render();
    }
}


// 
//  DESC: Unload files
//
function unload()
{
    // Only delete the strategy(s) used in this state. Don't use clear().
    strategyManager.deleteStrategy( ['(background)','(cube)'] );
    
    // Free the object data
    objectDataManager.freeGroup( ['(title_screen)','(cube)'] );
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

    // Create the background strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '(background)', new ActorStrategy, callback ) );

    // Create the background strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '(cube)', new ActorStrategy, callback ) );

    // Load the strategies
    loadManager.add(
        ( callback ) => strategyLoader.load( '(title_screen)', 'data/objects/spritestrategy/titlescreenLoad.cfg', callback ));
}
