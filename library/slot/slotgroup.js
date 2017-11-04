
// 
//  FILE NAME: slotgroup.js
//  DESC:      Controller class for the slot group
//

"use strict";

export class SlotGroup
{
    constructor( slotGroupModel, slotGroupView, cycleResults )
    {
        // Slot group model
        this.slotGroupModel = slotGroupModel;

        // Slot group view
        this.slotGroupView = slotGroupView;
        
        // Cycle results interface
        this.cycleResults = cycleResults;
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        this.slotGroupView.init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a font or physics.
    //
    cleanUp()
    {
        this.slotGroupView.cleanUp();
    }
    
    //
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.slotGroupView.handleEvent( event );
        this.slotGroupModel.handleEvent( event );
    }
    
    //
    //  DESC: Update objects that require them
    //
    update()
    {
        this.slotGroupView.update();
        
        if( this.cycleResults && this.cycleResults.isActive() )
            this.cycleResults.update();
    }

    //
    //  DESC: Start the cycle results
    //
    activateCycleResults()
    {
        if( this.cycleResults )
            this.cycleResults.activate();
    }

    //
    //  DESC: Stop the cycle results
    //
    deactivateCycleResults()
    {
        if( this.cycleResults )
            this.cycleResults.deactivate();
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
    //  DESC: Is the cycle results active
    //
    isCycleResultsActive()
    {
        if( this.cycleResults )
            return this.cycleResults.isActive();

        return false;
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
        
        if( this.cycleResults )
            this.cycleResults.render( matrix );
    }
}
