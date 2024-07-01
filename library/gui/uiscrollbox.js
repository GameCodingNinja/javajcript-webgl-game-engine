
// 
//  FILE NAME: uiscrollbox.js
//  DESC:      Class for user interface scroll boxes
//

"use strict";
import { UISubControl } from './uisubcontrol';
import { Point } from '../common/point';
import { Sprite } from '../sprite/sprite';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { eventManager } from '../managers/eventmanager';
import { highResTimer } from '../utilities/highresolutiontimer';
import { device } from '../system/device';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as UIControlFactory from './uicontrolfactory';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

const IN_VIEWABLE_AREA = 1;
const NEW_ACTIVE_CTRL = 2;

export class UIScrollBox extends UISubControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_SCROLL_BOX;

        // Array list of controls in scroll box
        this.scrollControlAry = [];

        // Initial scroll box control offset
        this.initialOffset = new Point;

        // Height to cull
        this.cullHeight = 0;

        // height of control
        this.controlHeight = 0;

        // Scroll move counter
        this.scrollCurPos = 0;

        // Number of controls visible in scroll box
        this.visibleCount = 0;

        // Visible start pos
        this.visStartPos = 0;
        this.visEndPos = 0;

        // Max scroll amount
        this.maxMoveAmount = 0;

        // stencil mask sprite
        this.stencilMaskSprite;

        // Active scroll control index in this control
        this.activeScrollCtrl = defs.NO_ACTIVE_CONTROL;

        // index of first control in scroll box
        this.firstScrollCtrlIndex = 0;

        // Default offsets
        this.defaultOffsetAry = [];

        // speed members
        this.scrollSpeed = 0.05;
        this.pageSpeed = 0.05;

        // Scroll vector to indicate the control is scrolling
        this.scrollVector = 0;

        // Flag to indicate the control is paging
        this.paging = 0;

        // Scroll counter
        this.scrollCounter = 0;

        // Scroll distance
        this.scrollDistance = 0;

        // Flag to indicate scrolling needs to stop
        // but allows the scrolling to finish
        this.endScroll = false;

        // Flag to indicate that the scroll message has been sent
        this.scrollMsg = false;

        // Flag to allow for end scroll selection
        this.endScrollSelection = false;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Init the slider
        this.subControlAry[0].maxValue = this.maxMoveAmount;
        this.subControlAry[0].setSlider();

        // Get the scrolling info
        let scrollNode = node.getElementsByTagName( 'scroll' );
        if( scrollNode.length )
        {
            let attr = scrollNode[0].getAttribute( 'scrollSpeed' );
            if( attr )
                this.scrollSpeed = Number( attr );

            attr = scrollNode[0].getAttribute( 'pageSpeed' );
            if( attr )
                this.pageSpeed = Number( attr );
        }

        // Calc the start and end positions of what should
        // be viewable in the scroll box
        this.setStartEndPos();
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        super.loadControlFromNode( node );

        // Get the menu controls node
        let menuControlsNode = node.getElementsByTagName( "scrollBoxControlList" );
        if( menuControlsNode.length )
        {
            // Get the initial offset of the first control in the scroll box
            this.initialOffset = parseHelper.loadPosition( menuControlsNode[0] );

            // Get the scroll boc info node
            let controlInfoNode = menuControlsNode[0].getElementsByTagName( "controlInfo" );
            this.controlHeight = Number( controlInfoNode[0].getAttribute( "height" ) );
            this.visibleCount = Number( controlInfoNode[0].getAttribute( "visibleInScrollBox" ) );

            // Get the number of controls in this scroll box
            let scrollControlNode = menuControlsNode[0].getElementsByTagName( "control" );

            // Add the scroll control from node
            for( let i = 0; i < scrollControlNode.length; ++i )
                this.addScrollControlFromNode( scrollControlNode[i] );
        }

        // Get the stencil mask node
        let stencilMaskNode = node.getElementsByTagName( "stencilMask" );
        if( stencilMaskNode.length )
        {
            let objectName = stencilMaskNode[0].getAttribute( "objectName" );

            this.stencilMaskSprite = new Sprite( objectDataManager.getData( this.group, objectName ) );

            // Get the cull height
            this.cullHeight = (this.stencilMaskSprite.objData.size.w + this.controlHeight) / 2;

            // Load the transform data
            this.stencilMaskSprite.load( stencilMaskNode[0] );
        }
    }

    // 
    //  DESC: Add the scroll control from node
    //  NOTE: This function recalculates the scroll box members because
    //        it is also used for run-time dynamic scroll boxes
    //
    addScrollControlFromNode( node )
    {
        // The reference is placed within a array for all controls
        let ctrl = UIControlFactory.create( node, this.group );
        this.scrollControlAry.push( ctrl );

        // Get the position for this control
        let posY = this.initialOffset.y - (this.controlHeight * (this.scrollControlAry.length-1));

        // Record the default y offset
        this.defaultOffsetAry.push( posY );

        // Set the position
        ctrl.setPosXYZ( this.initialOffset.x, posY, this.initialOffset.z );

        // Init the control visual state
        ctrl.deactivateControl();

        // Calculate the maximum scroll amount in pixels
        if( this.scrollControlAry.length > this.visibleCount )
            this.maxMoveAmount = (this.scrollControlAry.length - this.visibleCount) * this.controlHeight;

        return ctrl;
    }

    // 
    //  DESC: Init the control
    //
    init()
    {
        super.init();

        // Init all controls
        for( let i = 0; i < this.scrollControlAry.length; ++i )
            this.scrollControlAry[i].init();
    }

    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        super.cleanUp();

        // Init all controls
        for( let i = 0; i < this.scrollControlAry.length; ++i )
            this.scrollControlAry[i].cleanUp();
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );

        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
            this.scrollControlAry[this._i].handleEvent( event );
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( event )
    {
        if( event.arg[0] === defs.EAP_DOWN )
            this.handleKeyboardGamepadScroll( -1 );

        else if( event.arg[0] === defs.EAP_UP )
            this.endScroll = true;
    }

    // 
    //  DESC: Handle OnDownAction message
    //
    onDownAction( event )
    {
        if( event.arg[0] === defs.EAP_DOWN )
            this.handleKeyboardGamepadScroll( 1 );

        else if( event.arg[0] === defs.EAP_UP )
            this.endScroll = true;
    }

    // 
    //  DESC: Handle OnUpScroll message
    //
    onUpScroll( /* event */ )
    {
        this.handleKeyboardGamepadScroll( -1 );
        this.scrollMsg = true;
    }

    // 
    //  DESC: Handle OnDownScroll message
    //
    onDownScroll( /* event */ )
    {
        this.handleKeyboardGamepadScroll( 1 );
        this.scrollMsg = true;

    }   // OnDownScroll

    // 
    //  DESC: Handle OnTabLeft message
    //
    onTabLeft( event )
    {
        if( event.arg[0] === defs.EAP_DOWN )
            this.handlePageScroll( -1 );
    }

    // 
    //  DESC: Handle OnTabRight message
    //
    onTabRight( event )
    {
        if( event.arg[0] === defs.EAP_DOWN )
            this.handlePageScroll( 1 );
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        this._result = super.onMouseMove( event );

        // Invalidate the active control
        this.activeScrollCtrl = defs.NO_ACTIVE_CONTROL;

        if( this.subControlAry[0].isMouseDown() )
        {
            // Get the current scroll position
            this.scrollCurPos = this.subControlAry[0].curValue;

            // Set the bounds
            this.setStartEndPos();

            // Reposition the scroll controlls
            this.repositionScrollControls();
        }

        return this._result;
    }

    // 
    //  DESC: Handle the wheel events. This control handles wheel events
    //
    onWheel( event )
    {
        this._scrollCurPos = this.scrollCurPos + (event.deltaY * 0.5);

        // Handle bounds checking
        if( this._scrollCurPos < 0 )
            this._scrollCurPos = 0;

        else if( this._scrollCurPos > this.maxMoveAmount )
            this._scrollCurPos = this.maxMoveAmount;
        
        // Set the current scroll position
        this.scrollCurPos = this._scrollCurPos;

        // Move the slider
        this.subControlAry[0].setSlider(this.scrollCurPos);

        // Set the bounds
        this.setStartEndPos();

        // Reposition the scroll controlls
        this.repositionScrollControls();
    }

    // 
    //  DESC: Update the control
    //
    update()
    {
        super.update();

        // Update all controls
        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
            this.scrollControlAry[this._i].update();

        // Handle any scrolling
        this.handleScrollUpdate();
    }

    // 
    //  DESC: Transform the control
    //
    transform( object )
    {
        // Call the parent
        super.transform( object );

        // Transform all controls
        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
            this.scrollControlAry[this._i].transform( this );

        // Transform the mask
        this.stencilMaskSprite.transform( this );
    }

    // 
    //  DESC: Render the sub control
    //
    render( camera )
    {
        // Call the parent
        super.render( camera );


        // Disable rendering to the color buffer
        // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
        device.gl.colorMask( false, false, false, false );
        
        // Disable rendering to the depth mask
        device.gl.depthMask( false );

        // Start using the stencil
        device.gl.enable( device.gl.STENCIL_TEST );

        device.gl.stencilFunc( device.gl.ALWAYS, 0x1, 0x1 );
        device.gl.stencilOp( device.gl.REPLACE, device.gl.REPLACE, device.gl.REPLACE );


        this.stencilMaskSprite.render( camera );


        // Re-enable color
        // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
        device.gl.colorMask( true, true, true, true );

        // Where a 1 was not rendered
        device.gl.stencilFunc( device.gl.EQUAL, 0x1, 0x1 );

        // Keep the pixel
        device.gl.stencilOp( device.gl.KEEP, device.gl.KEEP, device.gl.KEEP );

        // Enable rendering to the depth mask
        device.gl.depthMask( true );


        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
            this.scrollControlAry[this._i].render( camera );


        // Finished using stencil
        device.gl.disable( device.gl.STENCIL_TEST );
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: Don't want this functuality for the scroll box buttons and slider
    //
    activateFirstInactiveControl()
    {
        if( super.baseActivateFirstInactiveControl() )
        {
            for( this._i = 0; this._i < this.scrollControlAry.length; ++this._i )
            {
                if( this.scrollControlAry[this._i].activateFirstInactiveControl() )
                {
                    this.activeScrollCtrl = this._i;
                    break;
                }
            }
        }

        return this.activeScrollCtrl != defs.NO_ACTIVE_CONTROL;
    }

    // 
    //  DESC: Handle the select action
    //
    handleSelectAction( event )
    {
        this._result = super.handleSelectAction( event );

        // Let the scroll controls handle any selection
        for( this._i = 0; this._i < this.scrollControlAry.length && !this._result; ++this._i )
        {
            this._result = this.scrollControlAry[this._i].handleSelectAction( event );
            if( this._result )
            {
                // Set the active scroll control to the one the mouse clicked
                if( event.arg[defs.ESMA_DEVICE_TYPE] === defs.MOUSE )
                    this.activeScrollCtrl = this._i;
                    
                break;
            }
        }

        if( this._result && (event.arg[defs.ESMA_DEVICE_TYPE] === defs.MOUSE) &&
            (event.arg[defs.ESMA_PRESS_TYPE] === defs.EAP_DOWN) )
        {
            // Get the current scroll position
            this.scrollCurPos = this.subControlAry[0].curValue;

            // Set the bounds
            this.setStartEndPos();

            // Reposition the scroll controlls
            this.repositionScrollControls();
        }

        return this._result;
    }

    // 
    //  DESC: Handle the page scrolling
    //
    handlePageScroll( scrollVector )
    {
        if( this.scrollVector == 0 )
        {
            // If there's no controls to select or reposition, do the scroll
            if( !this.selectAndRepositionCtrl( scrollVector ) )
            {
                this._SCROLL_DOWN = (scrollVector > 0);
                this._SCROLL_UP = (scrollVector < 0);

                // Make sure we have some place to page to
                if( (this._SCROLL_UP && (this.firstScrollCtrlIndex > 0)) ||
                    (this._SCROLL_DOWN && (this.firstScrollCtrlIndex + this.visibleCount < this.scrollControlAry.length)) )
                {
                    this._visibleCount = this.visibleCount;

                    // Cap the scroll amount to what is capable
                    if( this._SCROLL_UP && (this._visibleCount > this.firstScrollCtrlIndex) )
                    {
                        this._visibleCount = this.firstScrollCtrlIndex;
                    }
                    else if( this._SCROLL_DOWN &&
                           ((this._visibleCount + this.firstScrollCtrlIndex + this.visibleCount - 1) >= this.scrollControlAry.length) )
                    {
                        this._visibleCount = this.scrollControlAry.length - this.firstScrollCtrlIndex - this.visibleCount;
                    }

                    // Init the scroll
                    this.initScrolling( scrollVector, this.controlHeight * this._visibleCount, true, true );

                    // Deactivate the last control if the scrolling has been activated
                    if( this.scrollVector )
                    {
                        if( this.activeScrollCtrl != defs.NO_ACTIVE_CONTROL )
                            this.scrollControlAry[this.activeScrollCtrl].deactivateControl();
                    }
                }
                else
                {
                    this.activeScrollCtrl = this.firstScrollCtrlIndex;

                    if( this._SCROLL_DOWN )
                        this.activeScrollCtrl += this.visibleCount - 1;

                    // If the first control can't be selected, then find one that can
                    if( !this.activateScrollCtrl( this.activeScrollCtrl ) )
                        this.selectNextControl( -scrollVector );
                }
            }
        }
    }

    // 
    //  DESC: Handle the keyboard/Gamepad scrolling
    //
    handleKeyboardGamepadScroll( scrollVector )
    {
        // If there's no controls to select or reposition, do the scroll
        if( !this.selectAndRepositionCtrl( scrollVector ) )
        {
            // Try to select the next control
            this._scrollResult = this.selectNextControl( scrollVector );

            // Scroll the contents of the scroll box if we need to activate a control
            // that's outside of the viewable area of the scroll box.
            if( !(this._scrollResult & IN_VIEWABLE_AREA) )
            {
                this.initScrolling( scrollVector, this.controlHeight );
            }
        }
    }

    // 
    //  DESC: Select the next control
    //
    selectNextControl( scrollVector )
    {
        // Set the active control to the viewable area
        this.setActiveCtrlToViewableArea( scrollVector );

        // Scroll to the next control in the viewable area
        this._scrollResult = this.scrollToTheNextCtrlInViewableArea( scrollVector );

        // If we are still in the viewable area but have no active control,
        // try to activate the current control
        if( (this._scrollResult & IN_VIEWABLE_AREA) && !(this._scrollResult & NEW_ACTIVE_CTRL) )
        {
            eventManager.dispatchEvent(
                menuDefs.EME_MENU_CONTROL_STATE_CHANGE,
                uiControlDefs.ECS_ACTIVE,
                this.scrollControlAry[this.activeScrollCtrl] );
        }

        return this._scrollResult;
    }

    // 
    //  DESC: Do we need to select and reposition the control
    //
    selectAndRepositionCtrl( scrollVector )
    {
        // If there's no selected control, don't scroll
        // just select the first selectable control
        if( this.setActiveCtrlToViewableArea( scrollVector ) )
        {
            // If the first control can't be selected, then find one that can
            if( !this.activateScrollCtrl( this.activeScrollCtrl ) )
                this.selectNextControl( 1 );

            // Get the alignment to see if it needs to be adjusted
            this._diff = this.getControlAlignment();
            if( this._diff > 0.1 )
            {
                this._pos = this.scrollCurPos / this.controlHeight;

                this._nextCtrl = (this.activeScrollCtrl - this.firstScrollCtrlIndex) * this.controlHeight;

                if( this._nextCtrl || (this.firstScrollCtrlIndex > this._pos) )
                    this.initScrolling( 1, this.controlHeight - this._diff, false );
                else
                    this.initScrolling( -1, this._diff, false );
            }

            return true;
        }

        return false;
    }

    // 
    //  DESC: Select the paged control
    //
    selectPagedControl( scrollVector )
    {
        this.activeScrollCtrl += scrollVector * this.visibleCount;

        // Cap the control index
        if( this.activeScrollCtrl <= 0 )
        {
            this.activeScrollCtrl = 0;
            scrollVector = 1;
        }
        else if( this.activeScrollCtrl >= this.scrollControlAry.length - 1 )
        {
            this.activeScrollCtrl = this.scrollControlAry.size() -1;
            scrollVector = -1;
        }

        // If the first control can't be selected, then find one that can
        if( !this.activateScrollCtrl( this.activeScrollCtrl ) )
            this.selectNextControl( scrollVector );
    }

    // 
    //  DESC: Set the active control to the viewable area
    //        This also deactivates the last known active control
    //
    setActiveCtrlToViewableArea( /* scrollVector */ )
    {
        // If the active control is not within the active area, make it so that it will be the first one selected
        if( (this.activeScrollCtrl < this.firstScrollCtrlIndex) || (this.activeScrollCtrl >= (this.firstScrollCtrlIndex + this.visibleCount)) )
        {
            if( this.activeScrollCtrl != defs.NO_ACTIVE_CONTROL )
                this.scrollControlAry[this.activeScrollCtrl].deactivateControl();

            this.activeScrollCtrl = this.firstScrollCtrlIndex;

            return true;
        }

        return false;
    }

    // 
    //  DESC: Scroll to the next control in the viewable area
    //
    scrollToTheNextCtrlInViewableArea( scrollVector )
    {
        this._newActiveCtrl = 0;
        this._inView = this.inView( this.activeScrollCtrl, scrollVector );

        // Only scroll within the viewable area
        if( this._inView )
        {
            // Set a temp variable to the active scroll control
            let tmpScrollCtrl = this.activeScrollCtrl;

            // Loop until we hit a selectable control
            do
            {
                tmpScrollCtrl += scrollVector;

                if( this.activateScrollCtrl( tmpScrollCtrl ) )
                {
                    this._newActiveCtrl = NEW_ACTIVE_CTRL;

                    this.activeScrollCtrl = tmpScrollCtrl;
                    break;
                }

                this._inView = this.inView( tmpScrollCtrl, scrollVector );
            }
            while( this._inView );
        }

        return this._inView | this._newActiveCtrl;
    }

    // 
    //  DESC: See if we can activate this scroll control
    //
    activateScrollCtrl( scrollControlIndex )
    {
        if( (scrollControlIndex != defs.NO_ACTIVE_CONTROL) &&
            (scrollControlIndex < this.scrollControlAry.length) &&
            !this.scrollControlAry[scrollControlIndex].isDisabled() )
        {
            eventManager.dispatchEvent(
                menuDefs.EME_MENU_CONTROL_STATE_CHANGE,
                uiControlDefs.ECS_ACTIVE,
                this.scrollControlAry[scrollControlIndex] );

            return true;
        }

        return false;
    }

    // 
    //  DESC: Init the variables that scroll the contents of the scroll box
    //
    initScrolling( scrollVector, distance, endScrollSelection = true, paging = false )
    {
        if( this.scrollVector === 0 )
        {
            this._SCROLL_DOWN = (scrollVector > 0);
            this._SCROLL_UP = (scrollVector < 0);

            if( ((this._SCROLL_UP && (this.scrollCurPos > 0)) ||
                (this._SCROLL_DOWN && (this.scrollCurPos < this.maxMoveAmount))) )
            {
                this.scrollVector = scrollVector;
                this.scrollCounter = 0;
                this.endScroll = false;
                this.scrollMsg = false;
                this.paging = paging;
                this.endScrollSelection = endScrollSelection;
                this.scrollDistance = distance;
            }
        }
    }

    // 
    //  DESC: Handle the time based Scrolling of the contents of the scroll box
    //
    handleScrollUpdate()
    {
        if( this.scrollVector )
        {
            this._dist = highResTimer.elapsedTime * this.scrollSpeed;

            if( this.paging )
                this._dist = highResTimer.elapsedTime * this.pageSpeed;

            if( this.scrollVector > 0 )
                this.scrollCurPos += this._dist;
            else
                this.scrollCurPos -= this._dist;

            this.subControlAry[0].setSlider(this.scrollCurPos);

            this.scrollCounter += this._dist;

            // Set the bounds
            this.setStartEndPos();

            if( this.scrollCounter >= this.scrollDistance )
            {
                if( this.endScroll || !this.scrollMsg || this.paging )
                {
                    this.alignScrollPostion();

                    if( this.endScrollSelection )
                    {
                        if( this.paging )
                            this.selectPagedControl( this.scrollVector );
                        else
                            this.selectNextControl( this.scrollVector );
                    }

                    // This has to be last
                    this.scrollVector = 0;
                }
                else
                {
                    this.scrollDistance += this.controlHeight;
                }
            }
            // Sanity check
            else if( (this.scrollCurPos < 0) || (this.scrollCurPos > this.maxMoveAmount) )
            {
                this.alignScrollPostion();
                this.scrollVector = 0;
            }

            // Reposition the scroll controls
            this.repositionScrollControls();
        }
    }

    // 
    //  DESC: Get the fractional amount the controls are off within the scroll box
    //
    getControlAlignment()
    {
        this._pos = this.scrollCurPos / this.controlHeight;
        return this.controlHeight * (this._pos - Math.trunc(this._pos));
    }

    // 
    //  DESC: Is the scroll index in view
    //
    inView( scrollIndex, scrollVector )
    {
        return ((scrollVector < 0) && (scrollIndex > this.firstScrollCtrlIndex)) ||
               (((scrollVector > 0)) && (scrollIndex < (this.firstScrollCtrlIndex + this.visibleCount - 1)));
    }

    // 
    //  DESC: Get the reference to the subcontrol if found
    //
    findSubControlByName( name )
    {
        this._ctrl = super.findSubControlByName( name );

        for( this._i = this.visStartPos; this._i < this.visEndPos && (this._ctrl === null); ++this._i )
            this._ctrl = this.scrollControlAry[this._i].findControlByName( name );

        return this._ctrl;
    }

    // 
    //  DESC: Find the sub control via is pointer
    //
    findSubControlByRef( control )
    {
        this._ctrl = super.findSubControlByRef( control );

        for( this._i = this.visStartPos; this._i < this.visEndPos && (this._ctrl === null); ++this._i )
            if( this.scrollControlAry[this._i] === control )
                this._ctrl = this.scrollControlAry[this._i];

        return this._ctrl;
    }

    // 
    //  DESC: Handle the sub control mouse move
    //
    onSubControlMouseMove( event )
    {
        this._result = super.onSubControlMouseMove( event );

        // We only care about the scroll controls if the point is within the scroll box
        if( !this._result && this.isPointInControl( event.gameAdjustedMouseX, event.gameAdjustedMouseY ) )
        {
            for( this._i = this.visStartPos; this._i < this.visEndPos && !this._result; ++this._i )
            {
                this._result = this.scrollControlAry[this._i].onMouseMove( event );

                if( this._result )
                    this.activeScrollCtrl = this._i;
            }
        }

        return this._result;
    }

    // 
    //  DESC: Deactivate the sub control
    //
    deactivateSubControl()
    {
        super.deactivateSubControl();

        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
            this.scrollControlAry[this._i].deactivateControl();
    }

    // 
    //  DESC: Set the start and end positions
    //
    setStartEndPos()
    {
        this._pos = this.scrollCurPos / this.controlHeight;

        // Push the ceiling so that the starting index is viewable
        this.firstScrollCtrlIndex = Math.trunc(this._pos + 0.7);

        this.visStartPos = Math.trunc(this._pos);
        this.visEndPos = this.visStartPos + this.visibleCount + 1;

        // Sanity checks
        if( this.visStartPos < 0 )
            this.visStartPos = 0;

        if( this.visEndPos > this.scrollControlAry.length )
            this.visEndPos = this.scrollControlAry.length;
    }

    // 
    //  DESC: Reposition the scroll controls
    //
    repositionScrollControls()
    {
        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
        {
            this._pos = this.scrollControlAry[this._i].pos;
            this._y = this.defaultOffsetAry[this._i] + this.scrollCurPos;
            this.scrollControlAry[this._i].setPosXYZ( this._pos.x, this._y, this._pos.z );
        }
    }

    // 
    //  DESC: Align the scroll box to it's proper stopping point
    //        to account for floating point movement
    //
    alignScrollPostion()
    {
        // Do bounds checking just for sanity reasons
        if( this.firstScrollCtrlIndex < 0 )
            this.firstScrollCtrlIndex = 0;

        else if( (this.firstScrollCtrlIndex + this.visibleCount) > this.scrollControlAry.length )
            this.firstScrollCtrlIndex = this.scrollControlAry.length - this.visibleCount;

        // Recalucate the scroll position which will wipe the fractional component
        this.scrollCurPos = this.firstScrollCtrlIndex * this.controlHeight;
    }

    // 
    //  DESC: Only deactivate sub controls
    //
    deactivateControl()
    {
        this.deactivateSubControl();
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        super.setAlpha( alpha );

        for( this._i = this.visStartPos; this._i < this.visEndPos; ++this._i )
            this.scrollControlAry[this._i].setAlpha( alpha );
    }

    // 
    //  DESC: Get the pointer to the active control
    //
    getActiveControl()
    {
        this._result = super.getActiveControl();

        if( this._result === null )
        {
            for( this._i = 0; this._i < this.scrollControlAry.length; ++this._i )
            {
                if( this.scrollControlAry[this._i].state > uiControlDefs.ECS_INACTIVE )
                {
                    this._result = this.scrollControlAry[this._i].getActiveControl();
                    break;
                }
            }
        }

        return this._result;
    }
}
