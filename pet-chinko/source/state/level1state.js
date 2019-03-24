
// 
//  FILE NAME: level1state.js
//  DESC:      Level 1 state Class State
//

"use strict";

import { CommonState } from './commonstate';
import { eventManager } from '../../../library/managers/eventmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { StageStrategy } from '../../../library/strategy/stagestrategy';
import { ActorStrategy } from '../../../library/strategy/actorstrategy';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import * as defs from '../../../library/common/defs';
import * as stateDefs from './statedefs';

export const ASSET_COUNT = 16;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
        this.physicsWorld = physicsWorldManager.getWorld( "(game)" );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree'] );
        
        // Clear the event queue
        eventManager.clear();
        
        // Activate the strategies to run
        strategyManager.activateStrategy('_level-1-stage_');
        strategyManager.activateStrategy('_level-1-game_');
        strategyManager.activateStrategy('_level-ui_');
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
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
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_level-1-stage_','_level-1-game_','_level-ui_'] );
        
        objectDataManager.freeGroup( ['(level_1)'] );
        
        physicsWorldManager.destroyWorld( "(game)" );
    }
    
    // 
    //  DESC: Handle the physics
    //
    physics()
    {
        if( !menuManager.active )
            this.physicsWorld.variableTimeStep();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        if( !menuManager.active )
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
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( ['(level_1)'], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( ['(level_1)'], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( ['(level_1)'], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(level_1)'], callback ) );

    // Load the physics list table and group
    loadManager.add(
        ( callback ) => physicsWorldManager.loadWorldGroup2D( '(game)', callback ));
        
    // Create the stage strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-1-stage_', new StageStrategy, callback ) );

    // Create the actor strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-1-game_', new ActorStrategy, callback ) );

    // Create the actor strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-ui_', new ActorStrategy, callback ) );
        
    // Load the strategies
    loadManager.add(
        ( callback ) => strategyLoader.load( 'data/objects/strategy/level1/strategy.loader', callback ));
}
