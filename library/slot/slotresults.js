
// 
//  FILE NAME: slotresults.js
//  DESC:      Class of slot result's
//

"use strict";

import { PlayResult } from './playresult';

export class SlotResults
{
    constructor()
    {
        // Play result vector
        this.playResultAry = [];

        // Total win amount
        this.totalWinAmount = 0;
    }
    
    //
    //  DESC: Create a new play results entry into the vector
    //
    create()
    {
        let playResult = new PlayResult;
        this.playResultAry.push( playResult );

        return playResult;
    }

    //
    //  DESC: Clear the pays
    //
    clear()
    {
        this.totalWinAmount = 0;

        for( let i = 0; i < this.playResultAry.length; ++i )
            this.playResultAry[i].clear();
    }

    //
    //  DESC: Sort the pays
    //
    sortPays()
    {
        for( let i = 0; i < this.playResultAry.length; ++i )
            this.playResultAry[i].sortPays();
    }

    //
    //  DESC: Add up the win
    //
    addUpWin()
    {
        this.totalWinAmount = 0;
        
        for( let i = 0; i < this.playResultAry.length; ++i )
            this.totalWinAmount += this.playResultAry[i].addUpWin();
    }

    //
    //  DESC: Get the total win
    //
    getTotalWin()
    {
        return this.totalWinAmount;
    }

    //
    //  DESC: Do we have a win
    //
    isWin()
    {
        return (this.totalWinAmount > 0);
    }
}
