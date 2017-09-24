
// 
//  FILE NAME: reelgroupview.js
//  DESC:      View class for the reel group
//

"use strict";

import { SlotGroupView } from './slotgroupview';
import { ReelStripView } from './reelstripview';

export class ReelGroupView extends SlotGroupView
{
    constructor( slotGroupModel )
    {
        super( slotGroupModel );
    }
    
    //
    //  DESC: Create the group views
    //
    create( node, symbolSetView )
    {
        super.create( node, symbolSetView );
        
        // Get the group name
        let group = node.getAttribute( 'group' );

        // Do some santy checks
        let reelNode = node.getElementsByTagName( 'reelstrip' );
        if( reelNode.length === 0 )
            throw new Error( 'Reel strip list node is empty!' );
        
        if( this.slotGroupModel.slotStripModelAry.length !== reelNode.length )
            throw new Error( 'Reelstrip model count does not match view count!' );
        
        // Build the visible symbol set
        symbolSetView.buildSymbolSetView();
        
        // Create the view reel strips
        for( let reel = 0; reel < reelNode.length; ++reel )
        {
            let reelStripView = new ReelStripView( this.slotGroupModel.slotStripModelAry[reel], symbolSetView, reel );

            // Add the model reel strip to the view reel strip
            this.slotStripViewAry.push( reelStripView );
            reelStripView.create( reelNode[reel], group );
        }
        
        // Setup the cycle result symbol arrays
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            let cycleResultAry = [];
            this.cycleResultSymbAry.push( cycleResultAry );
            
            for( let j = 0; j < this.slotStripViewAry[i].visibleSymbCount; ++j )
                cycleResultAry.push(null);
        }
    }
    
    //
    //  DESC: Generate the cycle results symbols
    //
    generateCycleResultSymbs()
    {
        for( let reel = 0; reel < this.cycleResultSymbAry.length; ++reel )
        {
            let evalSymbIndexAry = this.slotGroupModel.slotStripModelAry[reel].evalSymbIndexAry;

            for( let symb = 0; symb < evalSymbIndexAry.length; ++symb )
                this.cycleResultSymbAry[reel][symb] = this.slotStripViewAry[reel].getCycleResultSymbol( evalSymbIndexAry[symb] );
        }
    }
    
    //
    //  DESC: Clear the cycle results symbols
    //
    clearCycleResultSymbs()
    {
        // This replaces the temporary cycle symbols with the ones used for spinning
        for( let reel = 0; reel < this.slotStripViewAry.length; ++reel )
            this.slotStripViewAry[reel].clearCycleResultSymbs();

        // Do clean up and free the memory allocated for the cycle result symbols
        this.freeCycleResultSymbs();
    }
}
