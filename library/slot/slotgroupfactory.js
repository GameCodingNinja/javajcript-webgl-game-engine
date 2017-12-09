// 
//  FILE NAME: slotgroupfactory.js
//  DESC:      Factory for slot group creation
//

"use strict";

import { SlotGroupModel } from './slotgroupmodel';
import { ReelGroupView } from './reelgroupview';
import { WheelGroupView } from './wheelgroupview';
import { SlotGroup } from './slotgroup';
import * as slotDefs from './slotdefs';

// 
//  DESC: Create the slot group
//
export function create(
        slotDevice,
        slotStripSetId,
        paytableSetId,
        slotMath,
        viewCfgNode,
        viewSpinProfileCfgNode,
        symbolSetView,
        playResult,
        cycleResults = null )
{
    // Create the group model
    var slotGroupModel = new SlotGroupModel( slotMath, playResult );
    slotGroupModel.create( slotStripSetId, paytableSetId );

    // Create the group view
    if( slotDevice === slotDefs.ED_REEL )
        var slotGroupView = new ReelGroupView( slotGroupModel );

    else if( slotDevice === slotDefs.ED_WHEEL )
        var slotGroupView = new WheelGroupView( slotGroupModel );

    else
        throw new Error( `Undefined slot device!` );
    
    // Create group view based on xml node and symbol set view
    slotGroupView.create( viewCfgNode, symbolSetView, cycleResults );

    // Load the spin profile from XML node
    slotGroupView.loadSpinProfileFromNode( viewSpinProfileCfgNode );
    
    // Init the cycle results if we have one
    if( cycleResults )
        cycleResults.init( slotGroupView );

    // Create the slot group
    return new SlotGroup( slotGroupModel, slotGroupView );
}
