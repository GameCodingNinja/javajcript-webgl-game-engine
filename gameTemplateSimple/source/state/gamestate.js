
// 
//  FILE NAME: gamestate.js
//  DESC:      game state base class
//

"use strict";

import { scriptSingleton } from '../../../library/script/scriptcomponent';
import { soundManager } from '../../../library/sound/soundmanager';

export class GameState
{
    constructor( callback )
    {
        this.stateChange = false;
        this.callback = callback;
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
    
    // 
    //  DESC: Update the scripts that run across states (screen fades) and the sound fades.
    //        Every state's update() needs to call super.update()
    //
    update()
    {
        scriptSingleton.update();
        soundManager.update();
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
