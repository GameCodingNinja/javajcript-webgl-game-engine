
// 
//  FILE NAME: commonstate.js
//  DESC:      CommonState Class State
//

"use strict";

import { GameState } from './gamestate';
import { menuManager } from '../../../library/gui/menumanager';
import { GenericEvent } from '../../../library/common/genericevent';
import { cameraManager } from '../../../library/managers/cameramanager';
import * as menuDefs from '../../../library/gui/menudefs';
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

        if( event instanceof GenericEvent )
        {
            // Check for the "game change state" message
            if( event.type === menuDefs.EME_MENU_GAME_STATE_CHANGE )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                {
                    // Block all message processing in the menu manager
                    menuManager.allowEventHandling = false;

                    // Set the message to load and unload the states
                    this.stateMessage.setMsg( this.getLoadState(event.arg[1]), this.gameState );
                }
            }
            else if( event.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                if( event.arg[0] === stateDefs.ESE_FADE_GAME_STATE_CHANGE )
                {
                    // Clear out all the trees
                    menuManager.clearActiveTrees();

                    // Set the flag to change the state
                    this.stateChange = true;
                }
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
    }

    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        // Transform the menus
        menuManager.transform();

        // Tranform all the camera
        cameraManager.transform();
    }
    
    // 
    //  DESC: Get the load state
    //
    getLoadState( loadStateStr )
    {
        if( loadStateStr === 'title_screen_state' )
            return stateDefs.EGS_TITLE_SCREEN;
        
        else if( loadStateStr === 'level_1_state' )
            return stateDefs.EGS_LEVEL_1;
        
        throw new Error( `State does not exist!. (${loadStateStr})` );
    }
}
