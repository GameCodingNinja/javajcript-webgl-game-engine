
//
//  FILE NAME: eventmanager.js
//  DESC:      event manager class singleton
//

"use strict";
import { Point } from '../common/point';
import { GenericEvent } from '../common/genericevent';
import { Gamepad } from '../common/gamepad';
import { menuManager } from '../gui/menumanager';
import { actionManager } from '../managers/actionmanager';
import { settings } from '../utilities/settings';
import * as gamepadevent from '../common/gamepadevent';
import { device } from '../system/device';

class EventManager
{
    constructor()
    {
        this.canvas = document.getElementById('game-surface');
        this.queue = [];
        
        // Init with the most common events

        // Event handlers
        this.canvas.addEventListener( 'mousedown', this.onMouseDown.bind(this) );
        this.canvas.addEventListener( 'mouseup', this.onMouseUp.bind(this) );
        this.canvas.addEventListener( 'mousemove', this.onMouseMove.bind(this) );
        //document.addEventListener( 'scroll', this.onScroll.bind(this) );
        
        // Using document for key listener because canvas needs the focus before
        // it will trap key events. There's no good solution for force the focus
        // onto the canvas
        document.addEventListener( 'keydown', this.onKeyDown.bind(this) );
        document.addEventListener( 'keyup', this.onKeyUp.bind(this) );
        
        //this.canvas.addEventListener('keydown', this.onKeyDown.bind(this) );
        //this.canvas.addEventListener('keyup', this.onKeyUp.bind(this) );

        // Gamepad event handlers
        window.addEventListener( "gamepadconnected", this.onGamepadconnected.bind(this) );
        window.addEventListener( "gamepaddisconnected", this.onGamepadDisconnected.bind(this) );

        // Resize even handler
        //window.addEventListener( 'resize', this.onResize.bind(this) );

        document.addEventListener('fullscreenchange', this.onFullScreenChange.bind(this) );
        
        // Mouse move relative offset data types
        this.mouseAbsolutePos = new Point;
        this.mouseRelativePos = new Point;
        
        //this.mouseOffset = new Point();

        // Dictionary for holding all the gamepads
        this.gamePadMap = new Map;

        // Store then initial backgroud color
        this.backgroundColor = document.body.style.backgroundColor;
    }
    
    //
    //  DESC: Poll events that have been queued up
    //
    pollEvent()
    {
        if( this.queue.length )
            return this.queue.shift();
        
        return null;
    }
    
    //
    //  DESC: Add an event to the event queue
    //
    dispatchEvent( type, ...args )
    {
        this.queue.push( new GenericEvent( type, args ) );
    }
    
    //
    //  DESC: Handle onScroll events
    //
    /*onScroll( event )
    {
        this.mouseOffset.setXYZ(
            document.documentElement.scrollLeft - this.canvas.offsetLeft,
            document.documentElement.scrollTop - this.canvas.offsetTop );
    }*/
    
    //
    //  DESC: Handle onMouseDown events
    //
    onMouseDown( event )
    {
        // Filter the mouse position and add a new membe to the event
        this.filterMousePos( event );

        // Add to the event queue
        this.queue.push( event );
        
        //console.log( event.type + ', ' + event.button );
    }
    
    //
    //  DESC: Handle onMouseUp events
    //
    onMouseUp( event )
    {
        // Filter the mouse position and add a new membe to the event
        this.filterMousePos( event );

        // Add to the event queue
        this.queue.push( event );

        //console.log( event.type + ', ' + event.button );
    }
    
    //
    //  DESC: Handle onMouseMove events
    //
    onMouseMove( event )
    {
        // Filter the mouse position and add a new membe to the event
        this.filterMousePos( event );

        // Add to the event queue
        this.queue.push( event );

        //console.log(`Mouse move - ClientX: ${event.clientX}, ClientY: ${event.clientY}, OffsetX: ${event.offsetX}, OffsetY: ${event.offsetY}, RelX: ${event.movementX}, RelY: ${event.movementY}`);
        //console.log(`Canvas Offset: ${this.canvas.offsetLeft} x ${this.canvas.offsetTop}`);
        //console.log(`Document Offset: ${document.documentElement.scrollLeft} x ${document.documentElement.scrollTop}`);
        //console.log(`Move; RelX: ${this.mouseMoveRelX} RelY ${this.mouseMoveRelY}; AbsX: ${this.lastMouseMoveX} absY ${this.lastMouseMoveY}`);
    }

    //
    //  DESC: Handle onKeyDown events
    //
    onFullScreenChange( event )
    {
        console.log('onFullScreenChange');
        if (document.fullscreenElement)
        {
            let dpr = window.devicePixelRatio;
            let width = Math.trunc(event.target.clientWidth * dpr);
            let height = Math.trunc(event.target.clientHeight * dpr);
            device.handleResolutionChange( width, height );
            document.body.style.backgroundColor = 'black';
        }
        else
        {
            device.handleResolutionChange( settings.initialSize.w, settings.initialSize.h );
            document.body.style.backgroundColor = this.backgroundColor;
        }
    }
    
    //
    //  DESC: Handle onKeyDown events
    //
    onKeyDown( event )
    {
        if( event.repeat === false )
        {
            this.queue.push( event );

            //console.log( event.type + ', ' + event.key + ', ' + event.keyCode + ', ' + event.code );
        }
    }
    
    //
    //  DESC: Handle onKeyUp events
    //
    onKeyUp( event )
    {
        this.queue.push( event );

        // Check for fullscreen toggle
        if( actionManager.wasAction( event, 'Fullscreen Toggle' ) )
        {
            console.log('onKeyDown');
                if (!document.fullscreenElement)
                    device.canvas.requestFullscreen();

                else if (document.exitFullscreen)
                    document.exitFullscreen();
        }

        //console.log( event.type + ', ' + event.key + ', ' + event.keyCode + ', ' + event.code );
    }

    //
    //  DESC: onResizeObserver even handler
    //
    /*onResize( event )
    {
    }*/

    //
    //  DESC: Handle onGamepadconnected events
    //
    onGamepadconnected( event )
    {
        if( settings.allowGamepad )
        {
            this.gamePadMap.set( event.gamepad.index, new Gamepad( event.gamepad ) );
            this.queue.push( event );
            console.log(`Gamepad connected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}; Button Count: ${event.gamepad.buttons.length}; Axes: ${event.gamepad.axes.length}`);
        }
    }

    //
    //  DESC: Handle onGamepadDisconnected events
    //
    onGamepadDisconnected( event )
    {
        if( settings.allowGamepad )
        {
            this.queue.push( event );
            console.log(`Gamepad disconnected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}`);
        }
    }

    //
    //  DESC: Filter the mouse position and add a new member to the event
    //
    filterMousePos( event )
    {
        let x = event.offsetX;
        let y = event.offsetY;
        let pixelRatio = window.devicePixelRatio;

        if( document.fullscreenElement )
        {
            x = Math.trunc(event.offsetX * pixelRatio);
            y = Math.trunc(event.offsetY * pixelRatio);

            // Since it's needed for fullscreen, nullify it for anyone else using it
            pixelRatio = 1.0; 
        }

        // Create a new event member to hold game custom values
        event.gameAdjustedX = x;
        event.gameAdjustedY = y;
        event.gameAdjustedPixelRatio = pixelRatio;

        this.mouseRelativePos.setXYZ( event.movementX, event.movementY );
        this.mouseAbsolutePos.setXYZ( x, y);
    }

    //
    //  DESC: Handle gamepad
    //
    handleGamepad()
    {
        if( this.gamePadMap.size )
        {
            // Send out events for the button presses
            for ( let [index, lastGp] of this.gamePadMap )
            {
                let gp = navigator.getGamepads()[index];

                if( gp && gp.connected )
                {
                    // Create Up/DOWN events for the buttons
                    for(let i = 0; i < gp.buttons.length; i++)
                    {
                        // Check for button down
                        if(!lastGp.pressed[i] && gp.buttons[i].pressed)
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, i, gp) );
                            console.log( `Button Index Down: ${i};` );
                        }
                        // Check for button up
                        else if(lastGp.pressed[i] && !gp.buttons[i].pressed)
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, i, gp) );
                            console.log( `Button Index Up: ${i};` );
                        }
                    }

                    // Only check these if the menu is active
                    if( menuManager.active )
                    {
                        //console.log( `Left Axes X Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X]};` );
                        //console.log( `Left Axes Y Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y]};` );

                        // Create UP/DOWN events for the Left analog stick
                        if(!(lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] < -gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            (gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] < -gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, gamepadevent.GAMEPAD_BUTTON_L_STICK_UP, gp) );
                            //console.log( `Left Y Axes UP Button Down; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y]};` );
                        }
                        else if((lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] < -gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            !(gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] < -gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, gamepadevent.GAMEPAD_BUTTON_L_STICK_UP, gp) );
                            //console.log( `Left Y Axes UP Button Up; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y]};` );
                        }
                        else if(!(lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] > gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            (gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] > gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, gamepadevent.GAMEPAD_BUTTON_L_STICK_DOWN, gp) );
                            //console.log( `Left Y Axes DOWN Button Down; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y]};` );
                        }
                        else if((lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] > gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            !(gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y] > gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, gamepadevent.GAMEPAD_BUTTON_L_STICK_DOWN, gp) );
                            //console.log( `Left Y Axes DOWN Button Up; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_Y]};` );
                        }

                        // Create Left/Right events for the Left analog stick
                        else if(!(lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] < -gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            (gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] < -gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, gamepadevent.GAMEPAD_BUTTON_L_STICK_LEFT, gp) );
                            //console.log( `Left X Axes LEFT Button Down; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X]};` );
                        }
                        else if((lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] < -gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            !(gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] < -gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, gamepadevent.GAMEPAD_BUTTON_L_STICK_LEFT, gp) );
                            //console.log( `Left X Axes LEFT Button Up; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X]};` );
                        }
                        else if(!(lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] > gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            (gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] > gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, gamepadevent.GAMEPAD_BUTTON_L_STICK_RIGHT, gp) );
                            //console.log( `Left X Axes RIGHT Button Down; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X]};` );
                        }
                        else if((lastGp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] > gamepadevent.ANALOG_STICK_MSG_MAX) && 
                            !(gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X] > gamepadevent.ANALOG_STICK_MSG_MAX))
                        {
                            this.queue.push( new gamepadevent.GamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, gamepadevent.GAMEPAD_BUTTON_L_STICK_RIGHT, gp) );
                            //console.log( `Left X Axes RIGHT Button Up; Value: ${gp.axes[gamepadevent.GAMEPAD_AXIS_LEFT_X]};` );
                        }
                    }

                    // Sets the current gamepad
                    lastGp.gamepad = gp;
                }
            }
        }
    }
    
    // 
    //  DESC: Clear the event queue
    //
    clear()
    {
        this.queue = [];
    }
}

export var eventManager = new EventManager;
