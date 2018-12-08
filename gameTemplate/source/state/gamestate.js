
// 
//  FILE NAME: gamestate.js
//  DESC:      game state base class
//

"use strict";

import { StateMessage } from './statemessage';

export const GAME_STATE_NULL        = 0;
export const GAME_STATE_STARTUP     = 1;
export const GAME_STATE_TITLESCREEN = 2;
export const GAME_STATE_LOAD        = 3;
export const GAME_STATE_RUN         = 4;

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
    
    init()
    {
        // Empty function to be overwritten
    }
    
    cleanUp()
    {
        // Empty function to be overwritten
    }
    
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
    
    doStateChange()
    {
        // Empty function to be overwritten
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
}
