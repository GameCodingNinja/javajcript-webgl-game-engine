
// 
//  FILE NAME: slotgroup.js
//  DESC:      Controller class for the slot group
//

"use strict";

import { SlotGroupModel } from './slotgroupmodel';
import { ReelGroupView } from './reelgroupview';
import { WheelGroupView } from './wheelgroupview';
import * as slotDefs from './slotdefs';

export class SlotGroup
{
    constructor( slotDevice, slotMath, playResult )
    {
        // Slot group model
        this.slotGroupModel = new SlotGroupModel( slotMath, playResult );

        // Slot group view
        if( slotDevice === slotDefs.ED_REEL )
            this.slotGroupView = new ReelGroupView( this.slotGroupModel );
        
        else if( slotDevice === slotDefs.ED_WHEEL )
            this.slotGroupView = new WheelGroupView( this.slotGroupModel );
        
        else
            throw new Error( `Undefined slot device!` );

        // The reel group has it's own copy of the play result reference
        this.playResult = playResult;
        
        // Cycle results interface
        this.cycleResults = null;
    }
    
    //
    //  DESC: Create the slot group. Math and video slot strips
    //
    create(
        slotStripSetId,
        paytableSetId,
        viewSlotCfgNode,
        viewSpinProfileCfgNode,
        symbolSetView,
        cycleResults )
    {
        // Create the group model
        this.slotGroupModel.create( slotStripSetId, paytableSetId );

        // Create the group view
        this.slotGroupView.create( viewSlotCfgNode, symbolSetView );

        // Load the spin profile from XML node
        this.slotGroupView.loadSpinProfileFromNode( viewSpinProfileCfgNode );
        
        if( cycleResults )
        {
            this.cycleResults = cycleResults;
            this.cycleResults.init( this.slotGroupView, this.playResult );
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        this.slotGroupView.init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        this.slotGroupView.cleanUp();
    }

    //
    //  DESC: Start the cycle results
    //
    startCycleResults()
    {
        if( this.cycleResults )
            this.cycleResults.start();
    }

    //
    //  DESC: Stop the cycle results
    //
    stopCycleResults()
    {
        if( this.cycleResults )
            this.cycleResults.stop();
    }

    //
    //  DESC: Stop the cycle results animation
    //
    startCycleResultsAnimation()
    {
        if( this.cycleResults )
            this.cycleResults.startAnimation();
    }

    //
    //  DESC: Stop the cycle results animation
    //
    stopCycleResultsAnimation()
    {
        if( this.cycleResults )
            this.cycleResults.stopAnimation();
    }

    //
    //  DESC: Is the cycle results animating
    //
    isCycleResultsAnimating()
    {
        if( this.cycleResults )
            return this.cycleResults.isAnimating();

        return false;
    }
    
    //
    //  DESC: Transform the game objects
    //
    transform()
    {
        this.slotGroupView.transform();
    }
    
    //
    //  DESC: 2D/3D Render of game content
    //
    render( matrix )
    {
        this.slotGroupView.render( matrix );
    }
}
