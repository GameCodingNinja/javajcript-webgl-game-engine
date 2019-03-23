
// 
//  FILE NAME: commonstate.js
//  DESC:      CommonState Class State
//

"use strict";

import { GameState } from './gamestate';
import { menuManager } from '../../../library/gui/menumanager';
import { device } from '../../../library/system/device';
import * as defs from '../../../library/common/defs';
import * as stateDefs from './statedefs';

export class CommonState extends GameState
{
    constructor( gameState, nextState, callBack )
    {
        super( gameState, nextState, callBack );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        // Have the menu manager handle events
        menuManager.handleEvent( event );

        if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === defs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.detail.arg[0] === defs.ETC_BEGIN )
                {
                    // Block all message processing in the menu manager
                    menuManager.allowEventHandling = false;

                    // Set the message to load and unload the states
                    this.stateMessage.setMsg( this.getGameState(event.detail.arg[1]), this.gameState );
                }
            }
            else if( event.detail.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                // Clear out all the trees
                menuManager.clearActiveTrees();

                // Set the flag to change the state
                this.stateChange = true;
            }
        }
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        // Update the menus
        menuManager.update();
    }

    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        // Transform the menus
        menuManager.transform();
    }
}
