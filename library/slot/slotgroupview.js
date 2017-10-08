
// 
//  FILE NAME: slotgroupview.js
//  DESC:      View base class for the slot group
//

"use strict";

import { Object2D } from '../2d/object2d';
import { SpinProfile } from './spinprofile';
import { Sprite2D } from '../2d/sprite2d';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as slotDefs from './slotdefs';

export class SlotGroupView extends Object2D
{
    constructor( slotGroupModel )
    {
        super();
        
        // Array of slot strip views
        this.slotStripViewAry = [];
        
        // Hold a reference to the slot group model
        this.slotGroupModel = slotGroupModel;
        
        // Spin profile map
        this.spinProfileMapAry = new Map;

        // Default spin profile
        this.defaultSpinProfile;

        // Cycle result symb vectors
        this.cycleResultSymbAry = [];

        // cycle results text sprite
        this.cycleResultsTxtSprite = null;
    }
    
    //
    //  DESC: Create the group view
    //
    create( node, symbolSetView )
    {
        // Get the group name
        let group = node.getAttribute( 'group' );
        
        // Load the transform data from node
        let attr = node.getElementsByTagName( 'translation' );
        if( attr )
            this.loadTransFromNode( attr[0] );
        
        // Get the cycle results text node and object data
        let cycleResultsTxtNode = node.getElementsByTagName( 'cycleResultsText' );
        let objectName = cycleResultsTxtNode[0].getAttribute( 'objectName' );

        // Allocate the cycle results text
        this.cycleResultsTxtSprite = new Sprite2D( objectDataManager.getData( group, objectName ) );
        this.cycleResultsTxtSprite.setVisible( false );
        this.cycleResultsTxtSprite.loadTransFromNode( cycleResultsTxtNode[0] );
        
        // Load the font properties from XML node
        this.cycleResultsTxtSprite.visualComponent.loadFontPropFromNode( cycleResultsTxtNode[0] );
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a font or physics.
    //
    cleanUp()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].cleanUp();
        
        // Do clean up and free the memory allocated for the cycle result symbols
        this.freeCycleResultSymbs();
        
        // Free the OpenGL font data
        if( this.cycleResultsTxtSprite )
            this.cycleResultsTxtSprite.cleanUp();
    }
    
    //
    //  DESC: Do clean up and free the memory allocated for the cycle result symbols
    //
    freeCycleResultSymbs()
    {
        for( let reel = 0; reel < this.cycleResultSymbAry.length; ++reel )
        {
            for( let symb = 0; symb < this.cycleResultSymbAry[reel].length; ++symb )
            {
                if( this.cycleResultSymbAry[reel][symb] )
                {
                    this.cycleResultSymbAry[reel][symb].cleanUp();
                    this.cycleResultSymbAry[reel][symb] = null;
                }
            }
        }
    }
    
    //
    //  DESC: Set the cycle results text
    //
    setCycleResultText( visible, pay )
    {
        this.cycleResultsTxtSprite.setVisible( visible );

        if( visible && (pay !== null) )
        {
            let text;

            if( pay.payType == slotDefs.EP_PAYLINE )
            {
                text = `Line ${pay.payLine+1} Pays ${pay.getFinalAward()}`;
            }
            else
            {
                if( pay.bonusCode > 0 )
                    text = `Bonus Pays ${pay.getFinalAward()}`;
                else
                    text = `Scatter Pays ${pay.getFinalAward()}`;
            }

            this.cycleResultsTxtSprite.visualComponent.createFontString(text);
        }
    }
    
    //
    //  DESC: Load the spin profile from XML node
    //
    loadSpinProfileFromNode( node )
    {
        // Sanity check
        this.defaultSpinProfile = node.getAttribute( "default" );
        if( !this.defaultSpinProfile )
            throw new Error( `Spin profile default attribute not set!` );
        
        let profileLstNode = node.children;

        for( let i = 0; i < profileLstNode.length; ++i )
        {
            // Get the spin profile id
            let profileId = profileLstNode[i].getAttribute( "id" );
            
            // Check for duplicate names
            if( this.spinProfileMapAry.has( profileId ) )
                throw new Error( `Duplicate spin profile id (${profileId})!` );

            // Create a new spin profile
            let spinProfileAry = []
            this.spinProfileMapAry.set( profileId, spinProfileAry );

            let profileNode = profileLstNode[i].children;

            for( let j = 0; j < profileNode.length; ++j )
            {
                let spinProfile = new SpinProfile;
                spinProfileAry.push( spinProfile );

                spinProfile.loadFromNode( profileNode[j] );
            }
        }
    }
    
    //
    //  DESC: Update the reel group
    //
    update()
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].update();
        }
    }

    //
    //  DESC: Transform the reel group
    //
    transform()
    {
        if( this.isVisible() )
        {
            super.transform();

            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].transform( this.matrix, this.wasWorldPosTranformed() );

            this.cycleResultsTxtSprite.transform( this.matrix, this.wasWorldPosTranformed() );
        }
    }

    //
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].render( matrix );

            this.cycleResultsTxtSprite.render( matrix );
        }
    }
    
    //
    //  DESC: Start the reels spinning
    //
    startSpin()
    {
        if( this.isSpinState( slotDefs.ESS_STOPPED ) )
        {
            let spinProfile = this.spinProfileMapAry.get( this.defaultSpinProfile );
            if( !spinProfile )
                throw new Error( `Spin profile does not exist!` );

            // Init the reels with the spin profile
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].setSpinProfile( spinProfile[i] );

            // Start the spin
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].startSpin();
        }
    }
    
    //
    //  DESC: Stop the reels spinning
    //
    stopSpin()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].stopSpin();
    }

    //
    //  DESC: Is the spin state
    //
    isSpinState( state )
    {
        let result = true;

        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            if( this.slotStripViewAry[i].spinState !== state )
            {
                result = false;
                break;
            }
        }

        return result;
    }

    //
    //  DESC: Do we allow the stop sounds?
    //
    allowStopSounds( allow )
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry.allowStopSounds( allow );
    }
    
    //
    //  DESC: Clear the cycle results symbols?
    //
    clearCycleResultSymbs()
    {
        // Empty by design. Clearing may not be required
    }
}
