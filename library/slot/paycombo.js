
// 
//  FILE NAME: paycombo.js
//  DESC:      Class for holding the pay combo
//

"use strict";

export class PayCombo
{
    constructor( symbol, count, award, bonusCode )
    {
        // Symbol for this pay (string)
        this.symbol = symbol;

        // Number of symbols in this pay
        this.count = count;

        // Credit award
        this.award = award;

        // Bonus code
        this.bonusCode = bonusCode;
    }
}
