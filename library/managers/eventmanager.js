
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
import { isMobile } from '../system/device';
import { menuManager } from '../gui/menumanager';
import * as gamepadevent from '../common/gamepadevent';
import { TouchEvent } from '../common/touchevent';
import * as touchevent from '../common/touchevent';
import * as genFunc from '../utilities/genfunc';
import { EME_USER_FOCUS_LOST, EME_USER_FOCUS_GAINED } from '../gui/menudefs';
import { soundManager } from '../sound/soundmanager';

const MAX_GAMEPAD_EVENT_QUEUE = 50;
const MAX_TOUCH_POOL = 5;
const MAX_TOUCH_EVENT_QUEUE = 20;

class EventManager
{
    constructor()
    {
        this.canvas = document.getElementById('game-surface');
        this.queue = [];
        this.touchPool = null;
        this.touchEventQueue = null;
        
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

        // Track focus state to avoid duplicate events
        this.hasFocus = true;

        // Reuable Gamepad event ques
        this.gamePadEventIndex = 0;
        this.gamePadEventQueue = [];
        for( this._i = 0; this._i < MAX_GAMEPAD_EVENT_QUEUE; ++this._i )
            this.gamePadEventQueue.push( new gamepadevent.GamepadEvent() );

        this.gamepadDeadZone = gamepadevent.ANALOG_STICK_MSG_MAX;

        // For Mobile: Optional game-specific callback for left-side per-frame touch processing
        this.leftTouchCallback = null;

        // For Mobile: Optional game-specific callback for left-side touch end
        this.leftTouchEndCallback = null;

        // For Mobile: Optional game-specific callback for right-side touch end
        this.rightTouchEndCallback = null;

        // For Mobile: Optional game-specific callback for right-side per-frame touch processing
        this.rightTouchCallback = null;

        // For Mobile: Optional game-specific callback for whole-screen touch end (bypasses d-pad/side split)
        this.touchEndCallback = null;

        // For Mobile: Identifier of the single touch captured for menu interaction
        // (-1 = none). While captured, that touch is routed into the menu system
        // as synthetic mouse events instead of the gameplay touch path.
        this.menuTouchId = -1;
        this.menuTouchLastX = 0;
        this.menuTouchLastY = 0;
    }

    //
    //  DESC: Post init due to the need for settings.js
    //
    initTouchEventListeners()
    {
        if( isMobile() && settings.allowTouch )
        {
            this.canvas.addEventListener( 'touchstart',  this.onTouchStart.bind(this),  { passive: false } );
            this.canvas.addEventListener( 'touchmove',   this.onTouchMove.bind(this),   { passive: false } );
            this.canvas.addEventListener( 'touchend',    this.onTouchEnd.bind(this),    { passive: false } );
            this.canvas.addEventListener( 'touchcancel', this.onTouchEnd.bind(this),    { passive: false } );

            // Pre-allocated touch pool for mobile input
            this.touchPool = [];
            for( this._i = 0; this._i < MAX_TOUCH_POOL; ++this._i )
                this.touchPool.push({ id: -1, startX: 0, startY: 0, currentX: 0, currentY: 0, startTime: 0, side: '',
                    dpadLeft: false, dpadRight: false, dpadUp: false, dpadDown: false, ended: false });

            // Reusable touch event queue
            this.touchEventIndex = 0;
            this.touchEventQueue = [];
            for( this._i = 0; this._i < MAX_TOUCH_EVENT_QUEUE; ++this._i )
                this.touchEventQueue.push( new TouchEvent() );
        }
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
            actionManager.initGamepadMapping( event.gamepad );
            this.gamePadList[event.gamepad.index] = new Gamepad( event.gamepad );
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
            delete this.gamePadList[event.gamepad.index];
            this.queue.push( event );
            console.debug(`Gamepad disconnected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}`);
        }
    }

    //
    //  DESC: Handle onVisibilityChange events
    //
    onVisibilityChange( event )
    {
        if( document.hidden )
            this._dispatchFocusLost();
        else
            this._dispatchFocusGained();
    }

    //
    //  DESC: Suspend all sounds and dispatch focus lost event (deduped)
    //
    _dispatchFocusLost()
    {
        if( this.hasFocus )
        {
            this.hasFocus = false;
            soundManager.suspendAllSounds();
            this.dispatchEvent( EME_USER_FOCUS_LOST );
        }
    }

    //
    //  DESC: Resume all sounds and dispatch focus gained event (deduped)
    //
    _dispatchFocusGained()
    {
        if( !this.hasFocus )
        {
            this.hasFocus = true;
            soundManager.resumeAllSounds();
            this.dispatchEvent( EME_USER_FOCUS_GAINED );
        }
    }

    //
    //  DESC: Filter the mouse position and add a new member to the event
    //
    filterMousePos( event )
    {
        this._applyGameAdjustedPointerData( event, event.offsetX, event.offsetY, event.movementX, event.movementY );
    }

    //
    //  DESC: Compute the game-adjusted pointer data (position, movement, pixel
    //        ratio) and attach it to the event. Shared by real mouse events and
    //        synthetic touch-driven mouse events (which supply absolute position
    //        and a caller-computed movement delta).
    //
    _applyGameAdjustedPointerData( event, x, y, movementX, movementY )
    {
        this._x = x;
        this._y = y;
        this._movementX = movementX;
        this._movementY = movementY;
        this._pixelRatio = window.devicePixelRatio;

        if( document.fullscreenElement )
        {
            // Scale mouse coordinates from CSS display size into logical (displayRes)
            // space. Use displayRes (not canvas.width) since the backing store is
            // scaled by the device pixel ratio.
            this._scaleX = settings.displayRes.w / device.canvas.clientWidth;
            this._scaleY = settings.displayRes.h / device.canvas.clientHeight;
            this._x = Math.trunc(x * this._scaleX);
            this._y = Math.trunc(y * this._scaleY);
            this._movementX = movementX * this._scaleX;
            this._movementY = movementY * this._scaleY;

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
        this._gamepads = navigator.getGamepads();
        if( this._gamepads )
        {
            this.gamepadDeadZone = gamepadevent.ANALOG_STICK_MSG_MAX + settings.user.stickDeadZone;

            for ( this._each = 0; this._each < this._gamepads.length; ++this._each )
            {
                this._gp = this._gamepads[this._each];

                if( !this._gp || !this._gp.connected )
                    continue;

                this._lastGp = this.gamePadList[this._each];

                if( this._lastGp )
                {
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
    //  DESC: For Mobile: Handle touch - called once per frame like handleGamepad
    //        All touch event generation happens here
    //
    handleTouch()
    {
        if( this.touchPool )
        {
            for( this._ti = 0; this._ti < MAX_TOUCH_POOL; ++this._ti )
            {
                this._slot = this.touchPool[this._ti];
                if( this._slot.id === -1 || this._slot.ended )
                    continue;

                // Process active left-side touches for d-pad
                if( this._slot.side === 'left' )
                {
                    this._tdx = this._slot.currentX - this._slot.startX;
                    this._tdy = this._slot.currentY - this._slot.startY;

                    if( settings.touchDpadLeftRight )
                    {
                        // Left
                        this._nowPast = (this._tdx < -settings.user.touchDeadZone);
                        if( !this._slot.dpadLeft && this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_LEFT, touchevent.TOUCH_BUTTON_DOWN );
                        else if( this._slot.dpadLeft && !this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_LEFT, touchevent.TOUCH_BUTTON_UP );
                        this._slot.dpadLeft = this._nowPast;

                        // Right
                        this._nowPast = (this._tdx > settings.user.touchDeadZone);
                        if( !this._slot.dpadRight && this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_RIGHT, touchevent.TOUCH_BUTTON_DOWN );
                        else if( this._slot.dpadRight && !this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_RIGHT, touchevent.TOUCH_BUTTON_UP );
                        this._slot.dpadRight = this._nowPast;
                    }

                    if( settings.touchDpadUpDown )
                    {
                        // Up (screen Y is inverted: negative = up)
                        this._nowPast = (this._tdy < -settings.user.touchDeadZone);
                        if( !this._slot.dpadUp && this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_UP, touchevent.TOUCH_BUTTON_DOWN );
                        else if( this._slot.dpadUp && !this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_UP, touchevent.TOUCH_BUTTON_UP );
                        this._slot.dpadUp = this._nowPast;

                        // Down (screen Y is inverted: positive = down)
                        this._nowPast = (this._tdy > settings.user.touchDeadZone);
                        if( !this._slot.dpadDown && this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_DOWN, touchevent.TOUCH_BUTTON_DOWN );
                        else if( this._slot.dpadDown && !this._nowPast )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_DOWN, touchevent.TOUCH_BUTTON_UP );
                        this._slot.dpadDown = this._nowPast;
                    }

                    // Delegate to game-specific per-frame callback
                    if( this.leftTouchCallback )
                        this.leftTouchCallback( this._slot );
                }
                // Right-side: delegate to game-specific per-frame callback
                else if( this._slot.side === 'right' && this.rightTouchCallback )
                {
                    this.rightTouchCallback( this._slot );
                }
            }
        }
    }
    
    //
    //  DESC: Find a touch pool slot by identifier
    //
    _findTouchSlot( identifier )
    {
        for( this._si = 0; this._si < MAX_TOUCH_POOL; ++this._si )
        {
            if( this.touchPool[this._si].id === identifier )
                return this.touchPool[this._si];
        }
        return null;
    }

    //
    //  DESC: Find a free touch pool slot
    //
    _findFreeTouchSlot()
    {
        for( this._si = 0; this._si < MAX_TOUCH_POOL; ++this._si )
        {
            if( this.touchPool[this._si].id === -1 )
                return this.touchPool[this._si];
        }
        return null;
    }

    //
    //  DESC: Handle onTouchStart events
    //
    onTouchStart( event )
    {
        // Request fullscreen on first touch if not already fullscreen
        if( !document.fullscreenElement )
            device.canvas.requestFullscreen().catch(() => {});

        // While a menu is active, route the touch into the menu system as synthetic
        // mouse events so menu controls (sliders, buttons, etc.) work via touch.
        if( menuManager.active )
        {
            event.preventDefault();
            this._menuTouchStart( event );
            return;
        }

        event.preventDefault();

        // clientWidth (CSS size) matches the touch clientX values; canvas.width is
        // the DPR-scaled backing store and must not be used here.
        this._halfWidth = device.canvas.clientWidth / 2;

        for( this._ti = 0; this._ti < event.changedTouches.length; ++this._ti )
        {
            this._t = event.changedTouches[this._ti];
            this._slot = this._findFreeTouchSlot();
            if( this._slot )
            {
                this._slot.id = this._t.identifier;
                this._slot.startX = this._t.clientX;
                this._slot.startY = this._t.clientY;
                this._slot.currentX = this._t.clientX;
                this._slot.currentY = this._t.clientY;
                this._slot.startTime = performance.now();
                this._slot.side = (this._t.clientX < this._halfWidth) ? 'left' : 'right';
                this._slot.dpadLeft = false;
                this._slot.dpadRight = false;
                this._slot.dpadUp = false;
                this._slot.dpadDown = false;
                this._slot.ended = false;
            }
        }
    }

    //
    //  DESC: Handle onTouchMove events
    //
    onTouchMove( event )
    {
        // A touch captured for menu interaction is routed as synthetic mouse moves.
        if( this.menuTouchId !== -1 )
        {
            event.preventDefault();
            this._menuTouchMove( event );
            return;
        }

        for( this._ti = 0; this._ti < event.changedTouches.length; ++this._ti )
        {
            this._t = event.changedTouches[this._ti];
            this._slot = this._findTouchSlot( this._t.identifier );
            if( this._slot )
            {
                this._slot.currentX = this._t.clientX;
                this._slot.currentY = this._t.clientY;
            }
        }
    }

    //
    //  DESC: Handle onTouchEnd and onTouchCancel events - state only, no event queuing
    //
    onTouchEnd( event )
    {
        // Release the menu-captured touch (always, even if the menu has since
        // closed) so the synthetic mouseup fires and the control state is reset.
        if( this.menuTouchId !== -1 )
        {
            event.preventDefault();
            this._menuTouchEnd( event );
            return;
        }

        for( this._ti = 0; this._ti < event.changedTouches.length; ++this._ti )
        {
            this._t = event.changedTouches[this._ti];
            this._slot = this._findTouchSlot( this._t.identifier );
            if( this._slot )
            {
                // Whole-screen callback bypasses d-pad/side split
                if( this.touchEndCallback )
                {
                    this._dx = this._t.clientX - this._slot.startX;
                    this._dy = this._t.clientY - this._slot.startY;
                    this.touchEndCallback( this._slot, this._dx, this._dy );
                }
                // Left-side: release any active d-pad directions
                else if( this._slot.side === 'left' )
                {
                    if( settings.touchDpadLeftRight )
                    {
                        if( this._slot.dpadLeft )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_LEFT, touchevent.TOUCH_BUTTON_UP );

                        if( this._slot.dpadRight )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_RIGHT, touchevent.TOUCH_BUTTON_UP );
                    }

                    if( settings.touchDpadUpDown )
                    {
                        if( this._slot.dpadUp )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_UP, touchevent.TOUCH_BUTTON_UP );

                        if( this._slot.dpadDown )
                            this._queueTouchEvent( touchevent.TOUCH_DPAD_DOWN, touchevent.TOUCH_BUTTON_UP );
                    }

                    // Delegate to game-specific left-side touch end callback
                    if( this.leftTouchEndCallback )
                        this.leftTouchEndCallback( this._slot );
                }
                // Right-side: delegate to game-specific callback
                else if( this._slot.side === 'right' && this.rightTouchEndCallback )
                {
                    this._dx = this._t.clientX - this._slot.startX;
                    this._dy = this._t.clientY - this._slot.startY;
                    this.rightTouchEndCallback( this._slot, this._dx, this._dy, performance.now() - this._slot.startTime );
                }

                // Free the slot
                this._slot.id = -1;
            }
        }
    }

    //
    //  DESC: For Mobile: Build a synthetic mouse event from a touch so menu
    //        controls (which are driven by mouse events) respond to touch.
    //        x/y are canvas-local CSS pixels; dx/dy are the movement delta.
    //        NOTE: only used while a menu is active (gameplay is not in its
    //        hot loop), so the per-event allocation here is acceptable.
    //
    _makeMenuMouseEvent( type, x, y, dx, dy )
    {
        this._mouseEvt = new MouseEvent( type, { button: 0 } );
        this._applyGameAdjustedPointerData( this._mouseEvt, x, y, dx, dy );
        return this._mouseEvt;
    }

    //
    //  DESC: For Mobile: Capture a single touch for menu interaction and queue a
    //        synthetic mousedown (preceded by a move to sync hover/active state).
    //
    _menuTouchStart( event )
    {
        // Only one touch drives the menu at a time
        if( this.menuTouchId !== -1 )
            return;

        this._mt = event.changedTouches[0];
        this._rect = this.canvas.getBoundingClientRect();
        this._mtX = this._mt.clientX - this._rect.left;
        this._mtY = this._mt.clientY - this._rect.top;

        this.menuTouchId = this._mt.identifier;
        this.menuTouchLastX = this._mtX;
        this.menuTouchLastY = this._mtY;

        this.queue.push( this._makeMenuMouseEvent( 'mousemove', this._mtX, this._mtY, 0, 0 ) );
        this.queue.push( this._makeMenuMouseEvent( 'mousedown', this._mtX, this._mtY, 0, 0 ) );
    }

    //
    //  DESC: For Mobile: Queue a synthetic mousemove for the captured menu touch,
    //        deriving the movement delta from the last touch position.
    //
    _menuTouchMove( event )
    {
        for( this._ti = 0; this._ti < event.changedTouches.length; ++this._ti )
        {
            this._mt = event.changedTouches[this._ti];
            if( this._mt.identifier === this.menuTouchId )
            {
                this._rect = this.canvas.getBoundingClientRect();
                this._mtX = this._mt.clientX - this._rect.left;
                this._mtY = this._mt.clientY - this._rect.top;
                this._mtdX = this._mtX - this.menuTouchLastX;
                this._mtdY = this._mtY - this.menuTouchLastY;
                this.menuTouchLastX = this._mtX;
                this.menuTouchLastY = this._mtY;

                this.queue.push( this._makeMenuMouseEvent( 'mousemove', this._mtX, this._mtY, this._mtdX, this._mtdY ) );
                break;
            }
        }
    }

    //
    //  DESC: For Mobile: Release the captured menu touch and queue a synthetic
    //        mouseup so controls (e.g. slider press) reset their state.
    //
    _menuTouchEnd( event )
    {
        for( this._ti = 0; this._ti < event.changedTouches.length; ++this._ti )
        {
            this._mt = event.changedTouches[this._ti];
            if( this._mt.identifier === this.menuTouchId )
            {
                this._rect = this.canvas.getBoundingClientRect();
                this._mtX = this._mt.clientX - this._rect.left;
                this._mtY = this._mt.clientY - this._rect.top;

                this.queue.push( this._makeMenuMouseEvent( 'mouseup', this._mtX, this._mtY, 0, 0 ) );

                this.menuTouchId = -1;
                break;
            }
        }
    }

    //
    //  DESC: Queue a touch event
    //
    _queueTouchEvent( type, action, value )
    {
        this.touchEventQueue[this.touchEventIndex].init( type, action, value );
        this.queue.push( this.touchEventQueue[this.touchEventIndex] );
        this.touchEventIndex = (this.touchEventIndex + 1) % MAX_TOUCH_EVENT_QUEUE;
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
