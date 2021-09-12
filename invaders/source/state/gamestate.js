
// 
//  FILE NAME: gamestate.js
//  DESC:      game state base class
//

"use strict";

import { StateMessage } from './statemessage';
import * as stateDefs from './statedefs';

export class GameState
{
    constructor( gameState, nextState, callback )
    {
        this.stateChange = false;
        this.gameState = gameState;
        this.nextState = nextState;
        this.callback = callback;
        
        // Message to send to next state
        this.stateMessage = new StateMessage;
    }
    
    cleanUp()
    {
        // Empty function to be overwritten
    }
    
    handleEvent( /*event*/ )
    {
        // Empty function to be overwritten
    }
    
    doStateChange()
    {
        return this.stateChange;
    }
    
    physics()
    {
        // Empty function to be overwritten
    }
    
    update()
    {
        // Empty function to be overwritten
    }
    
    transform()
    {
        // Empty function to be overwritten
    }
    
    render()
    {
        // Empty function to be overwritten
    }

    // 
    //  DESC: Get the load state enum
    //
    getGameState( gameStateStr )
    {
        if( gameStateStr === 'title_screen_state' )
            return stateDefs.EGS_TITLE_SCREEN;
        
        else if( gameStateStr === 'level_1_state' )
            return stateDefs.EGS_LEVEL_1;
        
        throw new Error( `State does not exist!. (${gameStateStr})` );
    }
    
    // 
    //  DESC: Get the load state str
    //
    getStateStr( gameState )
    {
        if( gameState === stateDefs.EGS_TITLE_SCREEN )
            return 'title_screen_state';
        
        else if( gameState === stateDefs.EGS_LEVEL_1 )
            return 'level_1_state';
        
        throw new Error( `State does not exist!. (${gameState})` );
    }
}
