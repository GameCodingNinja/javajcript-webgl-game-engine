
// 
//  FILE NAME: wheelgroupview.js
//  DESC:      Class for wheel group view
//

"use strict";

import { SlotGroupView } from './slotgroupview';
import { WheelView } from './wheelview';
import * as slotDefs from './slotdefs';

export class WheelGroupView extends SlotGroupView
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
        
        let slotStripModelAry = this.slotGroupModel.slotStripModelAry;
        
        // Get the group name
        let group = node.getAttribute( 'group' );
        
        // Santy checks
        let wheelLstNode = node.getElementsByTagName( 'wheel' );
        if( wheelLstNode.length === 0 )
            throw new Error( 'Wheel list node is empty!' );
        
        // Create the wheel views
        for( let wheel = 0; wheel < wheelLstNode.length; ++wheel )
        {
            let wheelView = new WheelView( slotStripModelAry[wheel], symbolSetView, wheel );

            // Add the model slot strip to the wheel view
            this.slotStripViewAry.push( wheelView );
            wheelView.create( wheelLstNode[wheel], group );
        }
        
        // Setup the cycle result symbol arrays.
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            let cycleResultAry = [];
            this.cycleResultSymbAry.push( cycleResultAry );
            
            for( let symb = 0; symb < this.slotStripViewAry[i].symbolAry.length; ++symb )
                cycleResultAry.push(null);
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        super.init();
        
        // Do a one time transform of the non-rotating sprites
        this.transform();
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].preTransform();
    }
    
    //
    //  DESC: Generate the cycle results symbols
    //        NOTE: For a wheel, this is all of the symbol in a specific order
    //
    generateCycleResultSymbs()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            let evalSymbIndexAry = this.slotGroupModel.slotStripModelAry[i].evalSymbIndexAry;
            
            // Get the first symbol index array as the starting point
            // NOTE: It is assumed these values as listed in the math file are in order from lowest to highest
            let evalStartPoint = evalSymbIndexAry[0];
            
            for( let symb = 0; symb < this.slotStripViewAry[i].symbolAry.length; ++symb )
                this.cycleResultSymbAry[i][symb] = this.slotStripViewAry[i].getSymbol( evalStartPoint + symb );
        }
    }
}
