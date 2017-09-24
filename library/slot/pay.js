
// 
//  FILE NAME: pay.js
//  DESC:      Slot pay
//

"use strict";

export class Pay
{
    constructor( payType, award, bonusCode, multiplier, payLine, symbPosAry )
    {
        // Type of pay that's being awarded
        this.payType = payType;

        // The amount of the win
        this.award = award;

        // bonus code
        this.bonusCode = bonusCode;

        // multiplier
        this.multiplier = multiplier;

        // Pay line the award was on
        this.payLine = payLine;

        // Array of symbol positions per reel that contribute to the win
        this.symbPosAry = symbPosAry;
    }
    
    //
    //  DESC: Get the final award
    //
    getFinalAward()
    {
        return this.award * this.multiplier;

    }   // GetAward
}
