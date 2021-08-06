
// 
//  FILE NAME: uibuttonlist.js
//  DESC:      Class for user interface buttons
//

"use strict";
import { UISubControl } from './uisubcontrol';
import { BitMask } from '../utilities/bitmask';
import { eventManager } from '../managers/eventmanager';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

export class UIButtonList extends UISubControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_BUTTON_LIST;
        
        // Active index into the list
        this.activeIndex = 0;

        // Index of the image list
        this.imageLstIndex = -1;
        
        // Last font index used for the font list
        this.lastFontSpriteIndex = 0;

        // Indicates if the control responds to up, down, left or right
        this.actionMask = new BitMask;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        // Call the parent
        super.loadFromNode( node );

        // See what the control will respond to
        let actionResponseNode = node.getElementsByTagName( 'actionResponse' );
        let attr = actionResponseNode[0].getAttribute('up');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( uiControlDefs.EAR_UP );
        }

        attr = actionResponseNode[0].getAttribute('down');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( uiControlDefs.EAR_DOWN );
        }

        attr = actionResponseNode[0].getAttribute('left');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( uiControlDefs.EAR_LEFT );
        }

        attr = actionResponseNode[0].getAttribute('right');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( uiControlDefs.EAR_RIGHT );
        }
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Call the parent
        super.loadControlFromNode( node );

        // See if there is an image list
        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].objData.visualData.getFrameCount() > 1 )
            {
                this.imageLstIndex = i;
                break;
            }
        }
        
        // Find the last font sprite in the list
        let fontSpriteCounter = 0;
        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
            {
                this.lastFontSpriteIndex = fontSpriteCounter;
                ++fontSpriteCounter;
            }
        }
    }

    // 
    //  DESC: Inc/Dec control
    //
    inc()
    {
        eventManager.dispatchEvent(
            menuDefs.EGE_MENU_CONTROL_STATE_CHANGE,
            uiControlDefs.ECS_SELECT,
            this.subControlAry[uiControlDefs.BTN_INC] );
    }

    dec()
    {
        eventManager.dispatchEvent(
            menuDefs.EGE_MENU_CONTROL_STATE_CHANGE,
            uiControlDefs.ECS_SELECT,
            this.subControlAry[uiControlDefs.BTN_DEC] );
    }

    // 
    //  DESC: Handle Onmessage
    //
    onDownAction( event )
    {
        if( (event.arg[0] === defs.EAP_DOWN) && this.actionMask.isSet( uiControlDefs.EAR_DOWN ) )
            this.dec();
    }

    onUpAction( event )
    {
        if( (event.arg[0] === defs.EAP_DOWN) && this.actionMask.isSet( uiControlDefs.EAR_UP ) )
            this.inc();
    }

    onLeftAction( event )
    {
        if( (event.arg[0] === defs.EAP_DOWN) && this.actionMask.isSet( uiControlDefs.EAR_LEFT ) )
            this.dec();

    }

    onRightAction( event )
    {
        if( (event.arg[0] === defs.EAP_DOWN) && this.actionMask.isSet( uiControlDefs.EAR_RIGHT ) )
            this.inc();
    }

    // 
    //  DESC: Handle OnLeftScroll message
    //
    onDownScroll( event )
    {
        if( this.actionMask.isSet( uiControlDefs.EAR_DOWN ) )
            this.dec();
    }

    onUpScroll( event )
    {
        if( this.actionMask.isSet( uiControlDefs.EAR_UP ) )
            this.inc();
    }

    onLeftScroll( event )
    {
        if( this.actionMask.isSet( uiControlDefs.EAR_LEFT ) )
            this.dec();
    }

    onRightScroll( event )
    {
        if( this.actionMask.isSet( uiControlDefs.EAR_RIGHT ) )
            this.inc();
    }

    // 
    //  DESC: Handle OnStateChange message
    //
    onStateChange( event )
    {
        super.onStateChange( event );

        let state = event.arg[0];

        if( state === uiControlDefs.ECS_SELECT )
        {
            if( this.subControlAry[uiControlDefs.BTN_DEC] == event.arg[1] )
            {
                // Dec the list
                this.decList();

                // Update the display
                this.updateDisplay( this.activeIndex );
            }
            else if( this.subControlAry[uiControlDefs.BTN_INC] == event.arg[1] )
            {
                // Inc the list
                this.incList();

                // Update the display
                this.updateDisplay( this.activeIndex );
            }
        }
    }

    // 
    //  DESC: Inc the list
    //
    incList()
    {
        if( this.stringAry.length )
            this.activeIndex = (this.activeIndex + 1) % this.stringAry.length;
    }

    decList()
    {
        if( this.stringAry.length )
        {
            if( this.activeIndex > 0 )
                this.activeIndex = (this.activeIndex - 1) % this.stringAry.length;
            else
                this.activeIndex = this.stringAry.length - 1;
        }
    }

    // 
    //  DESC: Update the display
    //
    updateDisplay( index )
    {
        this.activeIndex = index;

        this.createFontString( this.activeIndex, this.lastFontSpriteIndex );

        if( this.imageLstIndex > -1 )
            this.spriteAry[this.imageLstIndex].visualComponent.setFrame( this.activeIndex );
    }
    
    // 
    //  DESC: Get the active index
    //
    getIndex()
    {
        return this.activeIndex;
    }
}
