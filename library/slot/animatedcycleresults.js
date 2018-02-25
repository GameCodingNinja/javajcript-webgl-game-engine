
// 
//  FILE NAME: animatedcycleresults.js
//  DESC:      Animated cycle results implementation
//

"use strict";

import { Timer } from '../utilities/timer';
import { iCycleResults } from './icycleresults';
import { highResTimer } from '../utilities/highresolutiontimer';
import { Color } from '../common/color';
import { betManager } from './betmanager';
import * as slotDefs from './slotdefs';

const FPS = 18.0;

export class AnimatedCycleResults extends iCycleResults
{
    constructor( playResult, paylineSpriteSet )
    {
        super();
        
        // Set the play result
        this.playResult = playResult;
        
        // Payline sprite set
        this.paylineSpriteSet = paylineSpriteSet;
        
        // Payline sprite
        this.paylineSprite = null;
        
        // payline color
        this.paylineColor = new Color();
    }
    
    //
    //  DESC: Do some inits
    //
    init( slotGroupView )
    {
        this.slotGroupView = slotGroupView;
    }
    
    //
    //  DESC: Activate the cycle results
    //
    activate()
    {
        if( this.playResult.getPayCount() > 0 )
        {
            super.activate();

            this.slotGroupView.generateCycleResultSymbs();
        }
    }
    
    //
    //  DESC: Deactivate the cycle results
    //
    deactivate()
    {
        super.deactivate();
    }

    //
    //  DESC: Start the cycle results animation
    //
    startAnimation()
    {
        if( this.cycleResultsActive )
        {
            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            this.curPayIndex = this.payCounter;
            this.payCounter = (this.payCounter + 1) % this.playResult.getPayCount();
            
            let pay = this.playResult.getPay( this.curPayIndex );
            let symbPosAry = pay.symbPosAry;
            
            this.paylineSprite = null;
            
            let totalBet = betManager.getTotalBet();
            
            if( pay.payType === slotDefs.EP_PAYLINE )
            {
                this.paylineSprite = this.paylineSpriteSet.getSprite( pay.payLine );

                if( pay.getFinalAward() >= totalBet * 5 )
                    this.paylineSprite.prepareScript( 'hi_win' );

                else if( pay.getFinalAward() >= totalBet * 3 )
                    this.paylineSprite.prepareScript( 'med_win' );

                else
                    this.paylineSprite.prepareScript( 'low_win' );
            }
            
            let startAnim = 'no_win';
            
            if( this.cycleCounter === 0 )
                startAnim = 'init';
            
            // Set them all to a low alph
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
            {
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                {
                    let symbol = cycleResultSymbAry[i][j];
                    symbol.getSprite().scriptComponent.reset();
                    symbol.getSprite().prepareScript( startAnim );
                    symbol.deferredRender = false;
                }
            }

            // Set only the winners to default color
            for( let i = 0; i < symbPosAry.length; ++i )
            {
                let symbol = cycleResultSymbAry[symbPosAry[i].reel][symbPosAry[i].pos];
                
                symbol.getSprite().scriptComponent.reset();
                symbol.deferredRender = true;
                
                if( pay.getFinalAward() >= totalBet * 5 )
                    symbol.getSprite().prepareScript( 'hi_win' );
                
                else if( pay.getFinalAward() >= totalBet * 3 )
                    symbol.getSprite().prepareScript( 'med_win' );
                
                else
                    symbol.getSprite().prepareScript( 'low_win' );
            }

            this.slotGroupView.setCycleResultText( true, pay );
            
            ++this.cycleCounter;
            
            if( this.cycleCounter === this.playResult.getPayCount() )
                this.firstCycleComplete = true;
        }
    }

    //
    //  DESC: Stop the cycle results animation
    //
    stopAnimation()
    {
        if( this.cycleResultsActive )
        {
            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            // Set it all back to normal
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
            {
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                {
                    let symbol = cycleResultSymbAry[i][j];
                    symbol.getSprite().scriptComponent.reset();
                    symbol.getSprite().prepareScript( 'reset' );
                    symbol.deferredRender = false;
                }
            }

            this.slotGroupView.setCycleResultText( false );
            
            if( this.paylineSprite )
            {
                this.paylineSprite.scriptComponent.reset();
                this.paylineSprite = null;
            }
        }
    }

    //
    //  DESC: Are we still animating
    //
    isAnimating()
    {
        let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
        let pay = this.playResult.getPay( this.curPayIndex );
        let symbPosAry = pay.symbPosAry;
        
        for( let i = 0; i < symbPosAry.length; ++i )
            if( cycleResultSymbAry[symbPosAry[i].reel][symbPosAry[i].pos].getSprite().scriptComponent.isActive() )
                return true;
        
        if( this.paylineSprite && this.paylineSprite.scriptComponent.isActive() )
            return true;
        
        return false;
    }
    
    //
    //  DESC: Update the cycle results
    //
    update()
    {
        if( this.cycleResultsActive )
        {
            if( this.paylineSprite )
                this.paylineSprite.update();
        }
    }
    
    //
    //  DESC: Transform the reel strip
    //
    transform( matrix, tranformWorldPos )
    {
        if( this.cycleResultsActive )
        {
            if( this.paylineSprite )
                this.paylineSprite.transform( matrix, tranformWorldPos );
        }
    }
    
    //
    //  DESC: Do the render
    //
    render( matrix )
    {
        if( this.cycleResultsActive )
        {
            if( this.paylineSprite )
                this.paylineSprite.render( matrix );
            
            this.slotGroupView.deferredRender( matrix );
        }
    }
}
