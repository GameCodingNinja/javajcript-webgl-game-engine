
// 
//  FILE NAME: betmanager.js
//  DESC:      Singleton to manage the bet
//

"use strict";

class BetManager
{
    constructor()
    {
        // line bet
        this.lineBet = 0;

        // Total bet
        this.totalBet = 0;

        // Total number of lines being bet
        this.totalLines = 0;

        // Total credits
        this.credits = 0;
    }
    
    //
    //  DESC: Set the line bet
    //
    setLineBet( lineBet )
    {
        this.lineBet = lineBet;
    }
    
    //
    //  DESC: Set the total lines being bet
    //
    setTotalLines( totalLines )
    {
        this.totalLines = totalLines;
    }

    //
    //  DESC: Set the total lines being bet
    //
    getTotalBet()
    {
        return this.lineBet * this.totalLines;
    }

    //
    //  DESC: Set/Get the total lines being bet
    //
    setCredits( credits )
    {
        this.credits = credits;
    }

    getCredits()
    {
        return this.credits;
    }

    //
    //  DESC: Is there anough credits to play?
    //
    allowPlay()
    {
        return ((this.credits > 0) && (this.credits >= this.getTotalBet()));
    }

    //
    //  DESC: Deduct the bet amount from the credits
    //
    deductBet()
    {
        if( this.allowPlay() )
            this.credits -= this.getTotalBet();
    }


    /************************************************************************
    *    desc:  Add in the award
    ************************************************************************/
    addAward( award )
    {
        this.credits += award;
    }
}

export var betManager = new BetManager;
