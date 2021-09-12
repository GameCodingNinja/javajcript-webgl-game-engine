
// 
//  FILE NAME: playresult.js
//  DESC:      Class for holding pays
//

"use strict";

import { Pay } from './pay';

export class PlayResult
{
    constructor()
    {
        // Array of pays
        this.payAry = [];

        // Total win amount
        this.totalWinAmount = 0;
    }
    
    //
    //  DESC: Add a slot pay
    //
    addPay( payType, payCombo, multiplier, winLine, symbPosAry )
    {
        this.payAry.push(
            new Pay( payType, payCombo.award, payCombo.bonusCode, multiplier, winLine, symbPosAry ) );
    }
    
    //
    //  DESC: Sort the pays
    //
    sortPays()
    {
        this.payAry.sort( ( a, b ) => { return (b.getFinalAward() - a.getFinalAward()); } );
    }

    //
    //  DESC: Add up the win
    //
    addUpWin()
    {
        this.totalWinAmount = 0;

        for( let i = 0; i < this.payAry.length; ++i )
            this.totalWinAmount += this.payAry[i].getFinalAward();

        return this.totalWinAmount;
    }

    //
    //  DESC: Clear the pays
    //
    clear()
    {
        this.totalWinAmount = 0;
        this.payAry = [];
    }

    //
    //  DESC: Get the pay
    //
    getPay( index )
    {
        return this.payAry[ index ];
    }

    //
    //  DESC: Get the number of pays
    //
    getPayCount()
    {
        return this.payAry.length;
    }
}
