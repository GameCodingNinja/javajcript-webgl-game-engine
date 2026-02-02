
//
//  FILE NAME: eventmanager.js
//  DESC:      event manager class singleton
//

"use strict";
import { Point } from '../common/point';
import { GenericEvent } from '../common/genericevent';
import { Gamepad } from '../common/gamepad';
import { actionManager } from '../managers/actionmanager';
import { settings } from '../utilities/settings';
import { device } from '../system/device';
import { menuManager } from '../gui/menumanager';
import * as gamepadevent from '../common/gamepadevent';
import * as genFunc from '../utilities/genfunc';

const MAX_GAMEPAD_EVENT_QUEUE = 50;

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
        window.addEventListener( 'resize', this.onResize.bind(this) );

        // Wheel even handler
        window.addEventListener( 'wheel', this.onWheel.bind(this) );

        document.addEventListener('fullscreenchange', this.onFullScreenChange.bind(this) );
        document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this) );
        
        // Mouse move relative offset data types
        this.mouseAbsolutePos = new Point;
        this.mouseRelativePos = new Point;
        
        //this.mouseOffset = new Point();

        // Dictionary for holding all the gamepads
        this.gamePadList = [];

        // Store then initial backgroud color
        this.backgroundColor = document.body.style.backgroundColor;

        // fullscreen change flag
        this.fullscreenChange = false;

        // Reuable Gamepad event ques
        this.gamePadEventIndex = 0;
        this.gamePadEventQueue = [];
        for( let i = 0; i < MAX_GAMEPAD_EVENT_QUEUE; ++i )
            this.gamePadEventQueue.push( new gamepadevent.GamepadEvent() );

        this.gamepadDeadZone = gamepadevent.ANALOG_STICK_MSG_MAX;
    }
    
    //
    //  DESC: Poll events that have been queued up
    //
    pollEvent()
    {
        if( this.queue.length )
            return genFunc.removeAt(this.queue, 0);
        
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
        this.mouseOffset.setXYZ(settings
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
            this.fullscreenChange = true;
            device.handleResolutionChange( window.innerWidth, window.innerHeight, this.fullscreenChange );
        }
        else
        {
            device.handleResolutionChange( settings.lastDisplayRes.w, settings.lastDisplayRes.h, this.fullscreenChange );
            this.fullscreenChange = false;
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
        if( actionManager.wasAction( event, 'fullscreen_toggle' ) )
        {
            //console.log('onKeyDown');
            if (!document.fullscreenElement)
                device.canvas.requestFullscreen();

            else if (document.exitFullscreen)
                document.exitFullscreen();
        }

        //console.log( event.type + ', ' + event.key + ', ' + event.keyCode + ', ' + event.code );
    }

    //
    //  DESC: onWheel even handler
    //
    onWheel( event )
    {
        // Add to the event queue
        this.queue.push( event );
    }

    //
    //  DESC: onResizeObserver even handler
    //
    onResize( event )
    {
        // Don't handle resize during a fullscreen
        if( !event.target.document.fullscreen && !this.fullscreenChange &&
            !settings.displayRes.isEqual( window.innerWidth, window.innerHeight ) )
        {
            console.log( "onResize handled" );
            device.handleResolutionChange( window.innerWidth, window.innerHeight, false );
            settings.lastDisplayRes.copy( settings.displayRes );
        }
    }

    //
    //  DESC: Handle onGamepadconnected events
    //
    onGamepadconnected( event )
    {
        if( settings.allowGamepad )
        {
            actionManager.initGamepadMapping( event.gamepad.mapping );
            this.gamePadList.push( new Gamepad( event.gamepad ) );
            this.queue.push( event );
            console.debug(`Gamepad connected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}; Button Count: ${event.gamepad.buttons.length}; Axes: ${event.gamepad.axes.length}`);
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
            console.debug(`Gamepad disconnected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}`);
        }
    }

    //
    //  DESC: Handle onVisibilityChange events
    //
    onVisibilityChange( event )
    {
        if (document.hidden)
            this.queue.push( event );
    }

    //
    //  DESC: Filter the mouse position and add a new member to the event
    //
    filterMousePos( event )
    {
        this._x = event.offsetX;
        this._y = event.offsetY;
        this._movementX = event.movementX;
        this._movementY = event.movementY;
        this._pixelRatio = window.devicePixelRatio;

        if( document.fullscreenElement )
        {
            // Scale mouse coordinates based on canvas internal size vs CSS display size
            this._scaleX = device.canvas.width / device.canvas.clientWidth;
            this._scaleY = device.canvas.height / device.canvas.clientHeight;
            this._x = Math.trunc(event.offsetX * this._scaleX);
            this._y = Math.trunc(event.offsetY * this._scaleY);
            this._movementX = event.movementX * this._scaleX;
            this._movementY = event.movementY * this._scaleY;

            // Since it's needed for fullscreen, nullify it for anyone else using it
            this._pixelRatio = 1.0; 
        }

        // Create a new event member to hold game custom values
        event.gameAdjustedMouseX = this._x;
        event.gameAdjustedMouseY = this._y;
        event.gameAdjustedMovementX = this._movementX;
        event.gameAdjustedMovementY = this._movementY;
        event.gameAdjustedPixelRatio = this._pixelRatio;
        this.mouseRelativePos.setXYZ( this._movementX, this._movementY );
        this.mouseAbsolutePos.setXYZ( this._x, this._y);
    }

    //
    //  DESC: Handle gamepad
    //
    handleGamepad()
    {
        if( this.gamePadList.length )
        {
            this._gamepads = navigator.getGamepads();
            this.gamepadDeadZone = gamepadevent.ANALOG_STICK_MSG_MAX + settings.user.stickDeadZone;

            for ( this._each = 0; this._each < this.gamePadList.length; ++this._each )
            {
                this._gp = this._gamepads[this._each];

                if( this._gp && this._gp.connected )
                {
                    this._lastGp = this.gamePadList[this._each];

                    // Create Up/DOWN events for the buttons
                    for(this._i = 0; this._i < this._gp.buttons.length; ++this._i)
                    {
                        if(!this._lastGp.pressed[this._i] && this._gp.buttons[this._i].pressed)
                            this.queueGamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, this._i);
                        else if(this._lastGp.pressed[this._i] && !this._gp.buttons[this._i].pressed)
                            this.queueGamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, this._i);
                    }

                    // Process each stick axis direction independently (allows diagonal input)
                    this.processStickAxis(
                        gamepadevent.GAMEPAD_AXIS_LEFT_Y, -1,
                        gamepadevent.GAMEPAD_BUTTON_L_STICK_UP);
                        
                    this.processStickAxis(
                        gamepadevent.GAMEPAD_AXIS_LEFT_Y, 1,
                        gamepadevent.GAMEPAD_BUTTON_L_STICK_DOWN);
                        
                    this.processStickAxis(
                        gamepadevent.GAMEPAD_AXIS_LEFT_X, -1,
                        gamepadevent.GAMEPAD_BUTTON_L_STICK_LEFT);
                        
                    this.processStickAxis(
                        gamepadevent.GAMEPAD_AXIS_LEFT_X, 1,
                        gamepadevent.GAMEPAD_BUTTON_L_STICK_RIGHT);

                    this._lastGp.gamepad = this._gp;
                }
            }
        }
    }

    //
    //  DESC: Process a single stick axis direction for threshold crossing
    //
    processStickAxis( axisIndex, direction, buttonId )
    {
        this._threshold = this.gamepadDeadZone * direction;
        this._lastPast = direction > 0 
            ? this._lastGp.axes[axisIndex] > this._threshold
            : this._lastGp.axes[axisIndex] < this._threshold;

        this._nowPast = direction > 0
            ? this._gp.axes[axisIndex] > this._threshold
            : this._gp.axes[axisIndex] < this._threshold;

        if( !this._lastPast && this._nowPast )
            this.queueGamepadEvent(gamepadevent.GAMEPAD_BUTTON_DOWN, buttonId);
        
        else if( this._lastPast && !this._nowPast )
            this.queueGamepadEvent(gamepadevent.GAMEPAD_BUTTON_UP, buttonId);
    }

    //
    //  DESC: Queue a gamepad event
    //
    queueGamepadEvent( type, buttonId )
    {
        this.gamePadEventQueue[this.gamePadEventIndex].init(type, buttonId, this._gp);
        this.queue.push( this.gamePadEventQueue[this.gamePadEventIndex] );
        this.gamePadEventIndex = (this.gamePadEventIndex + 1) % MAX_GAMEPAD_EVENT_QUEUE;
    }
    
    // 
    //  DESC: Clear the event queue
    //
    clear()
    {
        this.queue.length = 0;
    }
}

export var eventManager = new EventManager;
