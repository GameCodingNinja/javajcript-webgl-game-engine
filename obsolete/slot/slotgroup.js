
// 
//  FILE NAME: slotgroup.js
//  DESC:      Controller class for the slot group
//

"use strict";

export class SlotGroup
{
    constructor( slotGroupModel, slotGroupView )
    {
        // Slot group model
        this.slotGroupModel = slotGroupModel;

        // Slot group view
        this.slotGroupView = slotGroupView;
    }
    
    //
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.slotGroupView.handleEvent( event );
        this.slotGroupModel.handleEvent( event );
    }
}
