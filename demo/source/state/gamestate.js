
// 
//  FILE NAME: gamestate.js
//  DESC:      game state base class
//

"use strict";

import { StateMessage } from './statemessage';

export const GAME_STATE_NULL               = 0,
             GAME_STATE_STARTUP            = 1,
             GAME_STATE_TITLESCREEN        = 2,
             GAME_STATE_LOAD               = 3,
             GAME_STATE_PACHINKO_CHALLENGE = 4,
             GAME_STATE_BIG_PAY_BACK       = 5;

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
    
    // 
    //  DESC: Get the state based on string name
    //
    getLoadState( loadStateStr )
    {
        if( loadStateStr === 'title_screen_state' )
            return GAME_STATE_TITLESCREEN;
        
        else if( loadStateStr === 'pachinko_challenge_state' )
            return GAME_STATE_PACHINKO_CHALLENGE;
        
        else if( loadStateStr === 'big_pay_back_state' )
            return GAME_STATE_BIG_PAY_BACK;
        
        throw new Error( `State does not exist!. (${loadStateStr})` );
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
    
    miscProcess()
    {
        // Empty function to be overwritten
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
    
    preRender()
    {
        // Empty function to be overwritten
    }
    
    postRender()
    {
        // Empty function to be overwritten
    }
}
