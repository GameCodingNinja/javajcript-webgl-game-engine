
// 
//  FILE NAME: titlescreenstate.js
//  DESC:      titles screen state class
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
import { CommonState } from './commonstate';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { menuManager } from '../../../library/gui/menumanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as menuDefs from '../../../library/gui/menudefs';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import titleScreenStrategyLoader from 'raw-loader!../../data/objects/strategy/state/titlescreen.loader';

export const ASSET_COUNT = 2;

export class TitleScreenState extends CommonState
{
    constructor( gameLoopCallback )
    {
        super( stateDefs.EGS_TITLE_SCREEN, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
        strategyManager.activateStrategy('_title_screen_');
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 500 ) );

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
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( '_title_screen_' );
        
        // Free the object data
        objectDataManager.freeGroup( '(title_screen)' );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event instanceof GenericEvent )
        {
            // Check for the "game change state" message
            if( event.type === menuDefs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
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
//  DESC: Load files
//
export function load()
{
    let groupAry = ['(title_screen)'];

    return objectDataManager.loadGroup( groupAry )

        // Create and load all the actor strategies.
        .then(() => strategyLoader.loadFromXml( genFunc.stringLoadXML( titleScreenStrategyLoader ) ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })
}
