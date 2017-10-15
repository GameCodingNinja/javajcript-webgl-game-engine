
// 
//  FILE NAME: ifrontpanel.js
//  DESC:      front panel interface class
//

"use strict";

import * as slotDefs from './slotdefs';

export class iFrontPanel
{
    constructor()
    {
    }
    
    statePlaceWager( credits )
    {
        // Empty function to be overwritten
    }
    
    stateEnd( allowPlay )
    {
        // Empty function to be overwritten
    }
    
    statePreSpin()
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Called when player clicks play button
    //
    playGame( control, slotState )
    {
        if( slotState === slotDefs.ESLOT_WAIT_FOR_AWARD )
            this.fastBang();
    }
    
    startBangUp( credits, win )
    {
        // Empty function to be overwritten
    }
    
    isBanging()
    {
        // Empty function to be overwritten
    }
    
    fastBang()
    {
        // Empty function to be overwritten
    }
}
