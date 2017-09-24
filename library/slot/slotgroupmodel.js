
// 
//  FILE NAME: slotgroupmodel.js
//  DESC:      Model class for the slot group
//

"use strict";

import { MersenneTwister } from '../utilities/mersenne-twister';
import { SlotStripModel } from './slotstripmodel';
import { SymbolPosition } from './symbolposition';
import { betManager } from './betmanager';
import { slotMathManager } from './slotmathmanager';
import * as slotDefs from './slotdefs';

export class SlotGroupModel
{
    constructor( slotMath, playResult )
    {
        // slot math reference
        this.slotMath = slotMath;

        // play result reference
        this.playResult = playResult;

        // Payline set
        this.paylineSet = slotMathManager.getPaylineSet( slotMath.paylineSetId );

        // Array of slot strip models
        this.slotStripModelAry = [];

        // Evaluation symbol arays
        this.evalMathSymbs = [];

        // Random number generation based on the Mersenne Twister algorithm
        this.rng = new MersenneTwister;

        // Paytable Set Id
        this.paytableSetId;
    }
    
    //
    //  DESC: Create the model strips
    //
    create( stripSetId, paytableSetId )
    {
        this.paytableSetId = paytableSetId;

        // Get the slot strip set
        let slotStripSetAry = this.slotMath.getSlotStripSet( stripSetId );

        // Create the model strips
        for( let i = 0; i < slotStripSetAry.length; ++i )
            this.slotStripModelAry.push(
                new SlotStripModel( this.slotMath.getSlotStrip( slotStripSetAry[i].id ), this.rng, slotStripSetAry[i].evalSymbIndexAry ) );

        // Setup the evaluation arrays
        for( let i = 0; i < slotStripSetAry.length; ++i )
        {
            let evalSymbAry = [];
            this.evalMathSymbs.push( evalSymbAry );
            
            for( let j = 0; j < slotStripSetAry[i].evalSymbIndexAry.length; ++j )
                evalSymbAry.push(0);
        }
    }

    //
    //  DESC: Generate the stops
    //
    generateStops()
    {
        for( let i = 0; i < this.slotStripModelAry.length; ++i )
            this.slotStripModelAry[i].generateStop();
    }

    //
    //  DESC: Evaluate the strips
    //
    evaluate()
    {
        this.generateEvalSymbs();

        // Get the paytable set and evaluate as line pay or scatter
        let paytableSetAry = this.slotMath.getPaytableSet( this.paytableSetId );
        for( let i = 0; i < paytableSetAry.length; ++i )
        {
            if( paytableSetAry[i].type === slotDefs.EP_PAYLINE )
                this.evaluateLinePays( paytableSetAry[i].id );

            else if( paytableSetAry[i].type === slotDefs.EP_SCATTER )
                this.evaluateScatters( paytableSetAry[i].id );
        }
    }

    //
    //  DESC: Generate the evaluation symbols
    //
    generateEvalSymbs()
    {
        for( let strip = 0; strip < this.slotStripModelAry.length; ++strip )
        {
            let stop = this.slotStripModelAry[strip].stop;
            let evalSymbIndexAry = this.slotStripModelAry[strip].evalSymbIndexAry;

            for( let symb = 0; symb < evalSymbIndexAry.length; ++symb )
                this.evalMathSymbs[strip][symb] = this.slotStripModelAry[strip].getSymbol( stop + evalSymbIndexAry[symb] );
        }
    }

    //
    //  DESC: Evaluate the line pays
    //
    evaluateLinePays( paytable )
    {
        let payComboAry = this.slotMath.getPayComboSet( paytable );

        // An array of flags to indicate a payline has been awarded and is no longer checked
        let awarded = Array( this.paylineSet.line.length );

        for( let cbo = 0; cbo < payComboAry.length; ++cbo )
        {
            for( let payline = 0; payline < this.paylineSet.line.length; ++payline )
            {
                // Continue if this payline has already been awarded
                if( awarded[payline] )
                    continue;

                for( let strip = 0; strip < this.paylineSet.line[payline].length; ++strip )
                {
                    let pos = this.paylineSet.line[payline][strip];

                    let mathSymb = this.evalMathSymbs[strip][pos];

                    // Break here if not a match to start checking the next payline
                    if( !mathSymb.isMatch( payComboAry[cbo].symbol ) )
                        break;

                    // If we made it this far and the below condition is true, then it's a match
                    if( strip === payComboAry[cbo].count - 1 )
                    {
                        awarded[payline] = true;

                        this.addLinePay( payComboAry[cbo], payline, this.paylineSet );

                        break;
                    }
                }
            }
        }
    }

    //
    //  DESC: Add line pay to slot result
    //
    addLinePay( payCombo, payline, paylineSet )
    {
        let symbPos = [];

        // Copy over the symbol offsets for the number of strips effected by the win
        for( let i = 0; i < payCombo.count; ++i )
            symbPos.push( new SymbolPosition( i, paylineSet.line[payline][i] ) );

        // Add the win to the play result
        this.playResult.addPay( slotDefs.EP_PAYLINE, payCombo, betManager.lineBet, payline, symbPos );
    }

    //
    //  DESC: Evaluate the scatter pays
    //
    evaluateScatters( paytable )
    {
        let payComboAry = this.slotMath.getPayComboSet( paytable );

        // An array of each unique scatter symbol name in the paytable
        let symbAry = [];
        // A multi-dementional array to record the position of scatter symbols
        let posAryAry = [];

        // Record each unique scatter symbol and setup a multi-dementional array
        // to hold the list of positions of each scatter symbol found on the strips.
        for( let i = 0; i < payComboAry.length; ++i )
        {
            if( symbAry.indexOf( payComboAry[i].symbol ) === -1 )
            {
                symbAry.push( payComboAry[i].symbol );
                posAryAry.push([]);
            }
        }

        // Go through the eval symbols to find these symbols
        for( let strip = 0; strip < this.evalMathSymbs.length; ++strip )
        {
            for( let pos = 0; pos < this.evalMathSymbs[strip].length; ++pos )
            {
                // Check if these scatter positions are allowed
                if( this.paylineSet.scatter[strip].indexOf(pos) !== -1 )
                {
                    let mathSymb = this.evalMathSymbs[strip][pos];

                    for( let symb = 0; symb < symbAry.length; ++symb )
                    {
                        // If the symbol is a match, record it's position
                        if( mathSymb.isMatch( symbAry[symb] )  )
                        {
                            posAryAry[symb].push( new SymbolPosition( strip, pos ) );
                        }
                    }
                }
            }
        }

        // Go throught the combo, check for the symbol and see if any of the counts match
        for( let i = 0; i < payComboAry.length; ++i )
        {
            for( let symb = 0; symb < symbAry.length; ++symb )
            {
                if( (payComboAry[i].symbol === symbAry[symb]) &&
                    (posAryAry[symb].length === payComboAry[i].count) )
                {
                    // Add the win to the play result
                    this.playResult.addPay( slotDefs.EP_SCATTER, payComboAry[i], betManager.getTotalBet(), -1, posAryAry[symb] );
                }
            }
        }
    }
}
