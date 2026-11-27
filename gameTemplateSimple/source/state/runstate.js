
// 
//  FILE NAME: runstate.js
//  DESC:      RunState Class State. Runs the game, starting paused behind the pause menu
//

"use strict";

import { GameState } from './gamestate';
import { eventManager } from '../../../library/managers/eventmanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptSingleton } from '../../../library/script/scriptcomponent';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as menuDefs from '../../../library/gui/menudefs';
import { platform } from '../../../library/system/platform';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import runStrategyLoader from 'raw-loader!../../data/objects/strategy/run/run.loader';

export class RunState extends GameState
{
    constructor( gameLoopCallback )
    {
        super( gameLoopCallback );

        // Fade in the screen
        scriptSingleton.prepare( 'screen_fade', 0, 1, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE );
        
        // Clear the event queue
        eventManager.clear();

        // Clear the last device used so that the Resume button is active by default
        actionManager.clearLastDeviceUsed();
        
        // Unblock the menu messaging and start paused with the pause menu up
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree'] );
        menuManager.getTree( 'pause_tree' ).transitionMenu();
        
        // Prepare the strategies to run
        strategyManager.activateStrategy('_run_');

        // Activated nodes only join the strategies on an update. Do one now so the game
        // is drawn behind the pause menu (updates are paused while a menu is up).
        strategyManager.update();
        
        // Indicate to the game portal the end of the loading.
        // The gameplay starts when the pause menu closes.
        platform.loadingStop();
        this.gameplayActive = false;

        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        // Have the menu manager handle events
        menuManager.handleEvent( event );
        
        if( event instanceof GenericEvent )
        {
            // A menu (ex: pause) is coming up: indicate to the game portal the gameplay has stopped
            if( event.type === menuDefs.EME_MENU_TRANS_IN )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN && this.gameplayActive )
                {
                    this.gameplayActive = false;
                    platform.gameplayStop();
                }
            }
            // The last menu is gone: indicate the gameplay has started
            else if( event.type === menuDefs.EME_MENU_TRANS_OUT )
            {
                if( event.arg[0] === menuDefs.ETC_END && !this.gameplayActive && !menuManager.getActiveTree() )
                {
                    this.gameplayActive = true;
                    platform.gameplayStart();
                }
            }
            // The window lost the focus: pause the game
            else if( event.type === menuDefs.EME_USER_FOCUS_LOST )
            {
                if( !menuManager.active )
                    menuManager.getTree( 'pause_tree' ).transitionMenu();
            }
        }
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();

        // Update the menus
        menuManager.update();
        
        if( !menuManager.active )
            strategyManager.update();
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        // Transform the menus
        menuManager.transform();
        
        strategyManager.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        strategyManager.render();
        
        menuManager.render();
    }
}

// 
//  DESC: Load files. Called from the startup state.
//
export function load()
{
    let groupAry = ['(run)'];
    
    return objectDataManager.loadGroup( groupAry )

        // Load the run strategy.
        .then(() => strategyLoader.loadFromXml( genFunc.stringLoadXML( runStrategyLoader ) ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })
}
