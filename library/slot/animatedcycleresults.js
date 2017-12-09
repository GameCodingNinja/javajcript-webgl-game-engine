
// 
//  FILE NAME: animatedcycleresults.js
//  DESC:      Animated cycle results implementation
//

"use strict";

import { Timer } from '../utilities/timer';
import { iCycleResults } from './icycleresults';
import { highResTimer } from '../utilities/highresolutiontimer';
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
    }
    
    //
    //  DESC: Do some inits
    //
    init( slotGroupView, playResult )
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
        if( this.cycleResultsActive )
        {
            super.deactivate();
        }
    }

    //
    //  DESC: Start the cycle results animation
    //
    startAnimation()
    {
        if( this.cycleResultsActive )
        {
            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            this.curPayIndex = this.cyclePayCounter;
            this.cyclePayCounter = (this.cyclePayCounter + 1) % this.playResult.getPayCount();
            
            let pay = this.playResult.getPay( this.curPayIndex );
            let symbPosAry = pay.symbPosAry;
            
            if( pay.payType === slotDefs.EP_PAYLINE )
                this.paylineSprite = this.paylineSpriteSet.getSprite( pay.payLine );
            
            let totalBet = betManager.getTotalBet();
            
            // Set them all to a low alphs
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
            {
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                {
                    let symbol = cycleResultSymbAry[i][j];
                    symbol.getSprite().scriptComponent.reset();
                    symbol.getSprite().setScaleXYZ();
                    symbol.getSprite().setRotXYZ();
                    symbol.getSprite().setFrame(0);
                    symbol.getSprite().prepareScript( 'no_win' );
                    symbol.deferredRender = false;
                }
            }

            // Set only the winners to default color
            for( let i = 0; i < symbPosAry.length; ++i )
            {
                let symbol = cycleResultSymbAry[symbPosAry[i].reel][symbPosAry[i].pos];
                
                //symbol.getSprite().setDefaultColor();
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
                    symbol.getSprite().setScaleXYZ();
                    symbol.getSprite().setRotXYZ();
                    symbol.getSprite().setFrame(0);
                    symbol.getSprite().prepareScript( 'reset' );
                    symbol.deferredRender = false;
                }
            }

            this.slotGroupView.setCycleResultText( false );
            this.paylineSprite = null;
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
        
        return false;
    }
    
    //
    //  DESC: Update the cycle results
    //
    update()
    {
        if( this.cycleResultsActive && this.paylineSprite )
        {
            this.paylineSprite.update();
        }
    }
    
    //
    //  DESC: Transform the reel strip
    //
    transform( matrix, tranformWorldPos )
    {
        if( this.cycleResultsActive && this.paylineSprite )
        {
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
