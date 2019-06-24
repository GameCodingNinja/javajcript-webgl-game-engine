
// 
//  FILE NAME: level1state.js
//  DESC:      Level1State Class State
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { CommonState } from './commonstate';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import level1StrategyLoader from 'raw-loader!../../data/objects/strategy/level1/strategy.loader';

export const ASSET_COUNT = 12;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
        this.physicsWorld = physicsWorldManager.getWorld( "(game)" );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree'] );
        
        // Clear the event queue
        eventManager.clear();
        
        // Prepare the strategies to run
        strategyManager.activateStrategy('_level-1-stage_');
        strategyManager.activateStrategy('_level-1-ball_');
        
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
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_level-1-stage_','_level-1-ball_'] );
        
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
    let groupAry = ['(level_1)'];
    
    return objectDataManager.loadGroup( groupAry )

        // Load the physics list table and group
        .then(() => physicsWorldManager.loadWorldGroup2D( '(game)' ))

        // Create and load all the actor strategies.
        .then(() => strategyLoader.load( genFunc.stringLoadXML( level1StrategyLoader ) ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })
}
