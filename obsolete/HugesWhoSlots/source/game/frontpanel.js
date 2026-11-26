
// 
//  FILE NAME: frontpanel.js
//  DESC:      front panel class
//

"use strict";

import { iFrontPanel } from '../../../library/slot/ifrontpanel';

export class FrontPanel extends iFrontPanel
{
    constructor()
    {
        super();
        
        // Win meter
        this.winMeter = null;

        // Credit meter
        this.creditMeter = null;
    }
    
    // 
    //  DESC: Set the meters
    //
    setMeters( winMeter, creditMeter )
    {
        this.winMeter = winMeter;
        this.creditMeter = creditMeter;
    }
    
    // 
    //  DESC: Init a new game
    //
    initGame( credits )
    {
        if( this.winMeter )
            this.winMeter.clear();

        if( this.creditMeter )
            this.creditMeter.set( credits );

        //for( auto iter : m_pOtherBtnVec )
        //    iter->DisableControl();
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
}
