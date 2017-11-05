
// 
//  FILE NAME: animatedcycleresults.js
//  DESC:      Animated cycle results implementation
//

"use strict";

import { Timer } from '../utilities/timer';
import { iCycleResults } from './icycleresults';
import { highResTimer } from '../utilities/highresolutiontimer';

const FPS = 18.0;

export class AnimatedCycleResults extends iCycleResults
{
    constructor()
    {
        super();
        
        // cycle results timer
        this.cycleResultsTimer = new Timer;
        
        // Flag for symbol animations
        this.symbolAnimation = false;
        
        // animation time
        this.animTime = 0;
        
        // Animation Frame
        this.animFrame = 0;
        
        // symbol position array for symbol animation
        this.symbPosAry = null;
    }
    
    //
    //  DESC: Do some inits
    //
    init( slotGroupView, playResult )
    {
        this.slotGroupView = slotGroupView;
        this.playResult = playResult;
    }
    
    //
    //  DESC: Update the cycle results
    //
    update()
    {
        if( this.symbolAnimation )
        {
            this.animTime -= highResTimer.elapsedTime;

            if( this.animTime < 0 )
            {
                this.animTime = 1000.0 / FPS;
                this.animFrame++;
                this.symbolAnimation = false;
                
                let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
                
                for( let i = 0; i < this.symbPosAry.length; ++i )
                {
                    let sprite = cycleResultSymbAry[this.symbPosAry[i].reel][this.symbPosAry[i].pos].spriteAry[0];

                    if( this.animFrame < sprite.getFrameCount() )
                    {
                        sprite.setFrame( this.animFrame );
                        this.symbolAnimation = true;
                    }
                }
            }
        }
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
            
            this.slotGroupView.clearCycleResultSymbs();
        }
    }

    //
    //  DESC: Start the cycle results animation
    //
    startAnimation()
    {
        if( this.cycleResultsActive )
        {
            this.cycleResultsTimer.set( 1000 );
            this.animTime = 1000.0 / FPS;
            this.animFrame = 0;

            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;

            let pay = this.playResult.getPay( this.cyclePayCounter );
            this.symbPosAry = pay.symbPosAry;
            this.cyclePayCounter = (this.cyclePayCounter + 1) % this.playResult.getPayCount();

            // Set them all to a low alphs
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
            {
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                {
                    cycleResultSymbAry[i][j].spriteAry[0].setAlpha( 0.2 );
                    cycleResultSymbAry[i][j].deferedRender = false;
                }
            }

            this.symbolAnimation = false;
            
            // Set only the winners to default color
            for( let i = 0; i < this.symbPosAry.length; ++i )
            {
                let symbol = cycleResultSymbAry[this.symbPosAry[i].reel][this.symbPosAry[i].pos];
                
                symbol.spriteAry[0].setDefaultColor();
                symbol.deferedRender = true;
                
                this.symbolAnimation |= (symbol.spriteAry[0].getFrameCount() > 1);
            }
            
            if( this.symbolAnimation )
                this.cycleResultsTimer.setExpired();

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
            this.cycleResultsTimer.setExpired();

            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            // Set it all back to normal
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                    cycleResultSymbAry[i][j].spriteAry[0].setDefaultColor();

            this.slotGroupView.setCycleResultText( false );
            
            this.symbolAnimation = false;
        }
    }

    //
    //  DESC: Are we still animating
    //
    isAnimating()
    {
        if( this.symbolAnimation )
            return true;
        
        return !this.cycleResultsTimer.expired();
    }
    
    //
    //  DESC: Do the render
    //
    render( matrix )
    {
        if( this.isActive() )
            this.slotGroupView.deferedRender( matrix );
    }
}
