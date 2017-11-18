
// 
//  FILE NAME: frontpanel.js
//  DESC:      front panel class
//

"use strict";

import { iFrontPanel } from '../../../library/slot/ifrontpanel';
import { betManager } from '../../../library/slot/betmanager';
import { menuManager } from '../../../library/gui/menumanager';
import * as slotDefs from '../../../library/slot/slotdefs';

export class FrontPanel extends iFrontPanel
{
    constructor()
    {
        super();
        
        // Win meter
        this.winMeter = null;

        // Credit meter
        this.creditMeter = null;
        
        // Play button
        this.playBtn = null;
        
        // Total Bet control
        this.totalBetCtrl = null;
    }
    
    // 
    //  DESC: Set the meters
    //
    setButtons( playBtn, totalBetCtrl )
    {
        this.playBtn = playBtn;
        this.totalBetCtrl = totalBetCtrl;
        
        let incBtn = this.totalBetCtrl.findControlByName( 'total_bet_inc_btn' );
        let decBtn = this.totalBetCtrl.findControlByName( 'total_bet_dec_btn' );
        
        incBtn.connect_ExecutionAction( this.totalBetCallBack.bind(this) );
        decBtn.connect_ExecutionAction( this.totalBetCallBack.bind(this) );
    }
    
    // 
    //  DESC: Set the meters
    //
    setMeters( winMeter, creditMeter )
    {
        this.winMeter = winMeter;
        this.creditMeter = creditMeter;

        if( this.creditMeter )
            this.creditMeter.set( betManager.getCredits() );
    }
    
    // 
    //  DESC: Handle place wager state
    //
    statePlaceWager( credits )
    {
        if( this.winMeter )
            this.winMeter.clear();

        if( this.creditMeter )
            this.creditMeter.set( credits );

        if( this.totalBetCtrl )
            this.totalBetCtrl.disableControl();
    }
    
    // 
    //  DESC: Handle end of game
    //
    stateEnd( allowPlay )
    {
        if( allowPlay )
        {
            if( this.totalBetCtrl )
                this.totalBetCtrl.enableControl();
        }
    }

    // 
    //  DESC: Start the bang up
    //
    startBangUp( win, credits )
    {
        if( this.winMeter )
            this.winMeter.startBangUp( win );

        if( this.creditMeter )
            this.creditMeter.startBangUp( credits );
    }

    // 
    //  DESC: Are the meters banging
    //
    isBanging()
    {
        let result = false;

        if( this.winMeter )
            result |= this.winMeter.isBanging();

        if( this.creditMeter )
            result |= this.creditMeter.isBanging();

        return result;
    }

    // 
    //  DESC: Start the fast bang
    //
    fastBang()
    {
        if( this.winMeter )
            this.winMeter.fastBang();

        if( this.creditMeter )
            this.creditMeter.fastBang();
    }
    
    // 
    //  DESC: Are the meters banging
    //
    totalBetCallBack( control )
    {
        let totalBetMeter = menuManager.getMenuControl( 'base_game_ui', 'total_bet_meter' );
        betManager.setLineBet( totalBetMeter.activeIndex + 1 );
    }
}
