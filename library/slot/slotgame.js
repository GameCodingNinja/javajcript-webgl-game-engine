
// 
//  FILE NAME: slotgame.js
//  DESC:      Class for handling the slot game
//

"use strict";

import { SlotResults } from './slotresults';
import { SlotGroup } from './slotgroup';
import { betManager } from './betmanager';
import { Timer } from '../utilities/timer';
import { ScriptComponent } from '../script/scriptcomponent';
import * as slotDefs from './slotdefs';

export class SlotGame
{
    constructor( group )
    {
        // Slot results class
        this.slotResults = new SlotResults;

        // Slot group array
        this.slotGroupAry = [];

        // slot state
        this.slotState = slotDefs.ESLOT_IDLE;

        // stop spin music timer
        this.stopSpinMusicTimer = new Timer;

        // For scripting needs
        this.scriptComponent = new ScriptComponent;

        // Slot group
        this.group = group;

        // Class for holding interface items
        // Does not own pointer. Do Not Free
        this.frontPanel = null;

        // bool to control the spotting of the spin music
        this.waitForSpinMusicTimer = false;

        // Spin start and stop music function calls
        this.spinMusicStartFunc = '';
        this.spinMusicStopFunc = '';
        this.spinMusicTimeOut = 0;

        // Flag to indicate spin music can be played
        this.allowSpinMusic = true;

        // Flag to indicate stop sounds can be played
        this.allowStopSounds = true;
        
        // Cycle results flag
        this.cycleResultsActive = false;
    }
    
    //
    //  DESC: Create the reel group. Math and video reel strips
    //
    createSlotGroup(
        slotDevice,
        slotStripSetId,
        paytableSetId,
        slotMath,
        viewReelCfgNode,
        viewSpinProfileCfgNode,
        symbolSetView,
        cycleResults )
    {
        let slotGroup = new SlotGroup( slotDevice, slotMath, this.slotResults.create() );
        this.slotGroupAry.push( slotGroup );

        slotGroup.create(
            slotStripSetId,
            paytableSetId,
            viewReelCfgNode,
            viewSpinProfileCfgNode,
            symbolSetView,
            cycleResults );
    }

    //
    //  DESC: Load the slot config file
    //
    loadSlotConfig( node )
    {
        let spinMusicScriptFunNode = node.getElementsByTagName( 'spinMusicScriptFun' );
        if( spinMusicScriptFunNode.length )
        {
            this.spinMusicStartFunc = spinMusicScriptFunNode[0].getAttribute( "startMusic" );
            this.spinMusicStopFunc = spinMusicScriptFunNode[0].getAttribute( "stopMusic" );
            this.spinMusicTimeOut = Number(spinMusicScriptFunNode[0].getAttribute( "timeOut" ));
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a font or physics.
    //
    init()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].cleanUp();
    }

    //
    //  DESC: Do we play the spin music
    //
    allowSpinMusic( allow )
    {
        this.allowSpinMusic = allow;
    }

    //
    //  DESC: Do we play the spin music
    //
    allowStopSounds( allow )
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupView.allowStopSounds( allow );
    }

    //
    //  DESC: Go through the game state
    //
    processGameState()
    {
        switch( this.slotState )
        {
            case slotDefs.ESLOT_IDLE:                    this.stateIdle();                 break;
            case slotDefs.ESLOT_WAIT_CYCLE_RESULTS_STOP: this.stateWaitCycleResultsStop(); break;
            case slotDefs.ESLOT_PLACE_WAGER:             this.statePlaceWager();           break;
            case slotDefs.ESLOT_GENERATE_STOPS:          this.stateGenerateStops();        break;
            case slotDefs.ESLOT_EVALUATE:                this.stateEvaluate();             break;
            case slotDefs.ESLOT_PRE_SPIN:                this.statePreSpin();              break;
            case slotDefs.ESLOT_SPIN:                    this.stateSpin();                 break;
            case slotDefs.ESLOT_POST_SPIN:               this.statePostSpin();             break;
            case slotDefs.ESLOT_PRE_AWARD_WIN:           this.statePreAwardWin();          break;
            case slotDefs.ESLOT_BONUS_DECISION:          this.stateBonusDecision();        break;
            case slotDefs.ESLOT_PRE_BONUS:               this.statePreBonus();             break;
            case slotDefs.ESLOT_BONUS:                   this.stateBonus();                break;
            case slotDefs.ESLOT_POST_BONUS:              this.statePostBonus();            break;
            case slotDefs.ESLOT_POST_AWARD_WIN:          this.statePostAwardWin();         break;
            case slotDefs.ESLOT_WAIT_FOR_AWARD:          this.stateWaitForAward();         break;
            case slotDefs.ESLOT_END:                     this.stateEnd();                  break;
        };
    }

    //
    //  DESC: State Idle slot
    //
    stateIdle()
    {
        // Fade down the music if the player is not spinning
        if( this.allowSpinMusic && this.waitForSpinMusicTimer && this.spinMusicStopFunc.length )
        {
            if( this.stopSpinMusicTimer.expired() )
            {
                //m_scriptComponent.Prepare( m_group, m_spinMusicStopFunc );
                this.waitForSpinMusicTimer = false;
            }
        }
    }
    
    //
    //  DESC: State Wait for the cycle results to stop
    //
    stateWaitCycleResultsStop()
    {
        if( !this.isCycleResultsAnimating() )
        {
            this.cycleResultsActive = false;

            for( let i = 0; i < this.slotGroupAry.length; ++i )
                this.slotGroupAry[i].stopCycleResults();

            this.slotState = slotDefs.ESLOT_PLACE_WAGER;
        }
    }

    //
    //  DESC: State Place Wager
    //
    statePlaceWager()
    {
        betManager.deductBet();

        if( this.frontPanel )
            this.frontPanel.initGame( betManager.getCredits() );

        this.slotResults.clear();

        /*if( this.allowSpinMusic && this.spinMusicStartFunc.length )
        {
            this.scriptComponent.StopAndRecycle( m_spinMusicStopFunc );
            this.scriptComponent.Prepare( m_group, m_spinMusicStartFunc );
        }*/

        this.slotState = slotDefs.ESLOT_GENERATE_STOPS;
    }

    //
    //  DESC: State Generate Stops
    //
    stateGenerateStops()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupModel.generateStops();

        this.slotState = slotDefs.ESLOT_EVALUATE;
    }

    //
    //  DESC: State Evaluate
    //
    stateEvaluate()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupModel.evaluate();

        this.slotResults.sortPays();
        this.slotResults.addUpWin();
        
        // console.log(`Total Win: ${this.slotResults.getTotalWin()}`);

        this.slotState = slotDefs.ESLOT_PRE_SPIN;
    }

    //
    //  DESC: State Pre Spin
    //
    statePreSpin()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupView.startSpin();

        this.slotState = slotDefs.ESLOT_SPIN;
    }

    //
    //  DESC: State Spin
    //
    stateSpin()
    {
        let stopped = true;
        
        for( let i = 0; i < this.slotGroupAry.length; ++i )
        {
            if( !this.slotGroupAry[i].slotGroupView.isSpinState( slotDefs.ESS_STOPPED ) )
            {
                stopped = false;
                break;
            }
        }

        if( stopped )
            this.slotState = slotDefs.ESLOT_POST_SPIN;
    }

    //
    //  DESC: State Post Spin
    //
    statePostSpin()
    {
        this.slotState = slotDefs.ESLOT_PRE_AWARD_WIN;
    }

    //
    //  DESC: State Pre Award Win
    //
    statePreAwardWin()
    {
        this.slotState = slotDefs.ESLOT_BONUS_DECISION;
    }

    //
    //  DESC: State Bonus Decision
    //
    stateBonusDecision()
    {
        this.slotState = slotDefs.ESLOT_PRE_BONUS;
    }

    //
    //  DESC: State Bonus Decision
    //
    statePreBonus()
    {
        this.slotState = slotDefs.ESLOT_BONUS;
    }

    //
    //  DESC: State Bonus
    //
    stateBonus()
    {
        this.slotState = slotDefs.ESLOT_POST_BONUS;
    }

    //
    //  DESC: State Post Bonus
    //
    statePostBonus()
    {
        this.slotState = slotDefs.ESLOT_POST_AWARD_WIN;
    }

    //
    //  DESC: State Post Award Win
    //
    statePostAwardWin()
    {
        if( this.slotResults.isWin() )
        {
            betManager.addAward( this.slotResults.getTotalWin() );

            if( this.frontPanel )
                this.frontPanel.startBangUp( 
                    this.slotResults.getTotalWin(), betManager.getCredits() );

            // Start the cycle results
            for( let i = 0; i < this.slotGroupAry.length; ++i )
                this.slotGroupAry[i].startCycleResults();

            // Start the cycle results
            this.cycleResultsActive = true;
        }

        this.slotState = slotDefs.ESLOT_WAIT_FOR_AWARD;
    }

    //
    //  DESC: State wait for the award to finish it's display
    //
    stateWaitForAward()
    {
        if( this.frontPanel )
        {
            if( !this.frontPanel.isBanging() )
                this.slotState = slotDefs.ESLOT_END;
        }
        else
        {
            this.slotState = slotDefs.ESLOT_END;
        }
    }

    //
    //  DESC: State End
    //
    stateEnd()
    {
        if( this.frontPanel )
            this.frontPanel.enableButtons( betManager.allowPlay() );

        // Set the timer that waits to see if the music should time out
        this.stopSpinMusicTimer.set( this.spinMusicTimeOut );
        this.waitForSpinMusicTimer = true;

        this.slotState = slotDefs.ESLOT_IDLE;
    }

    //
    //  DESC: Handle events
    //
    handleEvent( event )
    {
    }

    //
    //  DESC: Update objects that require them
    //
    update()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupView.update();
        
        // Start the cycle results animation if not currently animating
        if( this.cycleResultsActive )
        {
            if( !this.isCycleResultsAnimating() )
                for( let i = 0; i < this.slotGroupAry.length; ++i )
                    this.slotGroupAry[i].startCycleResultsAnimation();
        }

        this.scriptComponent.update();
    }

    //
    //  DESC: Transform the game objects
    //
    transform()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].transform();
    }

    //
    //  DESC: 2D/3D Render of game content
    //
    render( matrix )
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].render( matrix );
    }

    //
    //  DESC: Play a game
    //
    playGame( control )
    {
        if( this.slotState === slotDefs.ESLOT_IDLE )
        {
            if( betManager.allowPlay() )
            {
                if( this.cycleResultsActive )
                {
                    // Stop the cycle results
                    for( let i = 0; i < this.slotGroupAry.length; ++i )
                        this.slotGroupAry[i].stopCycleResultsAnimation();

                    this.slotState = slotDefs.ESLOT_WAIT_CYCLE_RESULTS_STOP;
                }
                else
                    this.slotState = slotDefs.ESLOT_PLACE_WAGER;
            }
        }
        else if( this.slotState === slotDefs.ESLOT_SPIN )
        {
            for( let i = 0; i < this.slotGroupAry.length; ++i )
                this.slotGroupAry[i].slotGroupView.stopSpin();
        }
        else if( this.slotState === slotDefs.ESLOT_WAIT_FOR_AWARD )
        {
            if( this.frontPanel )
                this.frontPanel.fastBang();
        }
    }

    //
    //  DESC: Set the front panel
    //
    setFrontPanel( frontPanel )
    {
        this.frontPanel = frontPanel;
    }
    
    //
    //  DESC: Is the cycle results animating
    //
    isCycleResultsAnimating()
    {
        let animating = false;
        
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            animating |= this.slotGroupAry[i].isCycleResultsAnimating();

        return animating;
    }
}
