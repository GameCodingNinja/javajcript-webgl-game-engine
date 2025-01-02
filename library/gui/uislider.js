
// 
//  FILE NAME: uislider.js
//  DESC:      Class for user interface slider
//

"use strict";
import { UISubControl } from './uisubcontrol';
import { Point } from '../common/point';
import { settings } from '../utilities/settings';
import { eventManager } from '../managers/eventmanager';
import { menuManager } from '../gui/menumanager';
import { Matrix } from '../utilities/matrix';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

var globalMatrix = new Matrix

export class UISlider extends UISubControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_SLIDER;
        
        // Slider travel distance in pixels
        this.travelDistPixels = 0;

        // Slider Orientation
        this.orientation = defs.EO_HORIZONTAL;

        // Min value
        this.minValue = 0;

        // Max value
        this.maxValue = 0;

        // Current value
        this.curValue = 0;

        // inc value
        this.incValue = 0;

        // Flag to indicate to display the value as an int
        this.displayValueAsInt = false;

        // Amount of decimal places
        this.displayValueDecimalPlaces = 2;

        // Default position of the slider button
        this.defaultPos = new Point;

        // slider button hold flag
        this.sliderBtnHold = false;

        // The current press type
        this.pressType = defs.EAP_IDLE;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Get the slider specific settings
        let settingsNode = node.getElementsByTagName( 'settings' );
        if( settingsNode.length )
        {
            let attr = settingsNode[0].getAttribute( 'orientation' );
            if( attr && (attr === 'VERT') )
                this.orientation = defs.EO_VERTICAL;

            attr = settingsNode[0].getAttribute( 'minValue' );
            if( attr )
                this.minValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'maxValue' );
            if( attr )
                this.maxValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'incValue' );
            if( attr )
                this.incValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'defValue' );
            if( attr )
                this.curValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'displayValueAsInt' );
            if( attr && (attr === 'true') )
                this.displayValueAsInt = true;

            attr = settingsNode[0].getAttribute( 'displayValueDecimalPlaces' );
            if( attr )
                this.displayValueDecimalPlaces = Number(attr);
        }
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Have the parent load it's stuff
        super.loadControlFromNode( node );

        // Get the position of the slider button as the default position
        this.defaultPos.copy( this.subControlAry[0].pos );

        // Get the slider specific settings
        let settingsNode = node.getElementsByTagName( 'settings' );
        if( settingsNode.length )
        {
            let attr = settingsNode[0].getAttribute( 'maxTravelDistPixels' );
            if( attr )
                this.travelDistPixels = Number(attr);
        }
    }

    // 
    //  DESC: Init the control
    //
    init()
    {
        super.init();

        this.updateSlider();
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( event )
    {
        if( this.orientation == defs.EO_VERTICAL )
        {
            // Handle the slider change
            if( event.arg[0] === defs.EAP_DOWN )
                this.handleSliderChange( -this.incValue, true );
                
            else if( event.arg[0] === defs.EAP_UP )
                // Prepare script function associated with handling this game event
                this.prepareControlScript( uiControlDefs.ECS_EXECUTE );
        }
    }

    // 
    //  DESC: Handle OnDownAction message
    //
    onDownAction( event )
    {
        if( this.orientation == defs.EO_VERTICAL )
        {
            // Handle the slider change
            if( event.arg[0] === defs.EAP_DOWN )
                this.handleSliderChange( this.incValue, true );

            else if( event.arg[0] === defs.EAP_UP )
                // Prepare script function associated with handling this game event
                this.prepareControlScript( uiControlDefs.ECS_EXECUTE );
        }
    }

    // 
    //  DESC: Handle OnLeftAction message
    //
    onLeftAction( event )
    {
        if( this.orientation == defs.EO_HORIZONTAL )
        {
            // Handle the slider change
            if( event.arg[0] === defs.EAP_DOWN )
                this.handleSliderChange( -this.incValue, true );

            else if( event.arg[0] === defs.EAP_UP )
                // Prepare script function associated with handling this game event
                this.prepareControlScript( uiControlDefs.ECS_EXECUTE );
        }
    }

    // 
    //  DESC: Handle OnRightAction message
    //
    onRightAction( event )
    {
        if( this.orientation == defs.EO_HORIZONTAL )
        {
            // Handle the slider change
            if( event.arg[0] === defs.EAP_DOWN )
                this.handleSliderChange( this.incValue, true );

            else if( event.arg[0] === defs.EAP_UP )
                // Prepare script function associated with handling this game event
                this.prepareControlScript( uiControlDefs.ECS_EXECUTE );
        }
    }

    // 
    //  DESC: Handle OnUpScroll message
    //
    onUpScroll( /*event*/ )
    {
        if( this.orientation == defs.EO_VERTICAL )
            this.handleSliderChange( -this.incValue );
    }

    // 
    //  DESC: Handle OnDownScroll message
    //
    onDownScroll( /*event*/ )
    {
        if( this.orientation == defs.EO_VERTICAL )
            this.handleSliderChange( this.incValue );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onLeftScroll( /*event*/ )
    {
        if( this.orientation == defs.EO_HORIZONTAL )
            this.handleSliderChange( -this.incValue );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onRightScroll( /*event*/ )
    {
        if( this.orientation == defs.EO_HORIZONTAL )
            this.handleSliderChange( this.incValue );
    }

    // 
    //  DESC: Handle OnMouseMove message
    //
    onMouseMove( event )
    {
        this._result = super.onMouseMove( event );

        if( this.isActive() && (this.pressType === defs.EAP_DOWN) )
        {
            globalMatrix.initilizeMatrix();
            globalMatrix.mergeMatrix( this.matrix.matrix );
            globalMatrix.mergeMatrix( menuManager.camera.matrix.matrix );
            globalMatrix.scaleFromValue( settings.orthoAspectRatio.h );

            // (1.0 / this.matrix.matrix[]) handles the scaling of the control
            if( this.orientation === defs.EO_HORIZONTAL )
                this.incSliderMovePos( event.movementX * (1 / event.gameAdjustedPixelRatio) * (1.0 / globalMatrix.matrix[0]) );
            else
                this.incSliderMovePos( event.movementY * (1 / event.gameAdjustedPixelRatio) * (1.0 / globalMatrix.matrix[5]) );
        }

        return this._result;
    }

    // 
    //  DESC: Handle the select action
    //
    handleSelectAction( event )
    {
        this._result = this.isActive() &&
                     (event.arg[defs.ESMA_DEVICE_TYPE] === defs.MOUSE) &&
                     this.isPointInControl( event.arg[defs.ESMA_MOUSE_X], event.arg[defs.ESMA_MOUSE_Y] );
             
        if( this._result && (event.arg[defs.ESMA_PRESS_TYPE] === this.mouseSelectType) )
        {
            // Get the press type to know if we need to move the slider 
            // along with the mouse move
            this.pressType = this.mouseSelectType;

            if( event.arg[defs.ESMA_PRESS_TYPE] === defs.EAP_DOWN )
            {
                this.prepareControlScript( uiControlDefs.ECS_SELECT );

                globalMatrix.initilizeMatrix();
                globalMatrix.mergeMatrix( this.matrix.matrix );
                globalMatrix.mergeMatrix( menuManager.camera.matrix.matrix );
                globalMatrix.scaleFromValue( settings.orthoAspectRatio.h );

                // (1.0 / this.matrix.matrix[]) handles the scaling of the control
                if( this.orientation === defs.EO_HORIZONTAL )
                    this.incSliderMovePos( (event.arg[defs.ESMA_MOUSE_X] - this.subControlAry[0].collisionCenter.x) * (1.0 / globalMatrix.matrix[0]) );
                else
                    this.incSliderMovePos( (event.arg[defs.ESMA_MOUSE_Y] - this.subControlAry[0].collisionCenter.y) * (1.0 / globalMatrix.matrix[5]) );
            }
        }
        else if( event.arg[defs.ESMA_PRESS_TYPE] !== this.mouseSelectType )
        {
            // Prepare script function associated with handling this game event
            this.prepareControlScript( uiControlDefs.ECS_EXECUTE );
            
            this.pressType = defs.EAP_IDLE;
        }

        return this._result;
    }

    // 
    //  DESC: Deactivate the control
    //
    deactivateControl()
    {
        super.deactivateControl();

        this.pressType = defs.EAP_IDLE;
    }

    // 
    //  DESC: Handle the slider change
    //
    handleSliderChange( value, prepareOnSelect = false )
    {
        if( this.isActive() )
        {
            if( prepareOnSelect )
                this.prepareControlScript( uiControlDefs.ECS_SELECT );

            // Send a message to blink the button
            eventManager.dispatchEvent( 
                menuDefs.EME_MENU_CONTROL_STATE_CHANGE,
                uiControlDefs.ECS_SELECT,
                this.subControlAry[0] );

            this.incSlider( value );
        }
    }

    // 
    //  DESC: Set the slider inc value
    //
    setSlider( value = 0 )
    {
        this.curValue = value;

        // Update the slider
        this.updateSlider();
    }

    // 
    //  DESC: Set the slider inc value
    //
    incSlider( value = 0 )
    {
        this.curValue += value;

        // Update the slider
        this.updateSlider();
    }

    // 
    //  DESC: Inc the slider based on mouse movement
    //
    incSliderMovePos( value )
    {
        this.curValue += value * ((this.maxValue - this.minValue) / this.travelDistPixels);

        // Update the slider
        this.updateSlider();
    }

    // 
    //  DESC: Update the slider
    //
    updateSlider()
    {
        // Cap current value to it's range
        this.capSliderValue();

        // Set the position of the slider
        this.setSliderPos();

        // Set the slider label if there is one
        if( this.stringAry.length )
        {
            // Format for display
            this._valueStr;

            if( this.displayValueAsInt )
                this._valueStr = this.stringAry[this.stringAry.length-1].replace(/%d/i, Math.trunc(this.curValue));
            else
            this._valueStr = this.stringAry[this.stringAry.length-1].replace(/%d/i, this.curValue.toFixed(this.displayValueDecimalPlaces));

            this.createFontString( this._valueStr );
        }
    }

    // 
    //  DESC: Cap the slider value
    //
    capSliderValue()
    {
        // Cap current value to range
        if( this.curValue < this.minValue )
            this.curValue = this.minValue;

        else if( this.curValue > this.maxValue )
            this.curValue = this.maxValue;
    }

    // 
    //  DESC: Set the position of the slider
    //
    setSliderPos()
    {
        if( Math.abs(this.maxValue) > 0.001 )
        {
            this._startPos = -(this.travelDistPixels / 2);
            this._pixelsPerValue = this.travelDistPixels / (this.maxValue - this.minValue);
            this._pos = this._startPos + (this._pixelsPerValue * (this.curValue - this.minValue));

            if( this.orientation === defs.EO_HORIZONTAL )
                this.subControlAry[0].setPosXYZ( this.defaultPos.x + this._pos, this.defaultPos.y );
            else
                this.subControlAry[0].setPosXYZ( this.defaultPos.x, this.defaultPos.y + -this._pos );
        }
    }

    // 
    //  DESC: Is the mouse down
    //
    isMouseDown()
    {
        return (this.pressType === defs.EAP_DOWN);
    }
}
