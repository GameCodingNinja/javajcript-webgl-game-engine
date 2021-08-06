
//
//  FILE NAME: eventmanager.js
//  DESC:      event manager class singleton
//

"use strict";
import { Point } from '../common/point';
import { GenericEvent } from '../common/genericevent';

class EventManager
{
    constructor()
    {
        this.canvas = document.getElementById('game-surface');
        this.queue = [];
        
        // Init with the most common events

        // Event handlers
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this) );
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this) );
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this) );
        document.addEventListener('scroll', this.onScroll.bind(this) );
        
        // Using document for key listener because canvas needs the focus before
        // it will trap key events. There's no good solution for force the focus
        // onto the canvas
        document.addEventListener('keydown', this.onKeyDown.bind(this) );
        document.addEventListener('keyup', this.onKeyUp.bind(this) );
        
        //this.canvas.addEventListener('keydown', this.onKeyDown.bind(this) );
        //this.canvas.addEventListener('keyup', this.onKeyUp.bind(this) );

        // Gamepad event handlers
        window.addEventListener("gamepadconnected", this.onGamepadconnected.bind(this) );
        window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected.bind(this) );
        
        // Mouse move relative offset data types
        this.mouseAbsolutePos = new Point;
        this.mouseRelativePos = new Point;
        
        this.mouseOffset = new Point(
            document.documentElement.scrollLeft - this.canvas.offsetLeft,
            document.documentElement.scrollTop - this.canvas.offsetTop );

        // Dictionary for holding all the gamepads
        this.gamePadMap = new Map;
    }
    
    //
    //  DESC: Poll events that have been queued up
    //
    pollEvent()
    {
        // Handle any gamepad inputs
        this.handleGamepad();

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
    onScroll( event )
    {
        this.mouseOffset.setXYZ(
            document.documentElement.scrollLeft - this.canvas.offsetLeft,
            document.documentElement.scrollTop - this.canvas.offsetTop );
    }
    
    //
    //  DESC: Handle onMouseDown events
    //
    onMouseDown( event )
    {
        this.queue.push( event );
        
        console.log( event.type + ', ' + event.button );
    }
    
    //
    //  DESC: Handle onMouseUp events
    //
    onMouseUp( event )
    {
        this.queue.push( event );
    }
    
    //
    //  DESC: Handle onMouseMove events
    //
    onMouseMove( event )
    {
        this.queue.push( event );
        
        this.mouseRelativePos.setXYZ( event.movementX, event.movementY );
        this.mouseAbsolutePos.setXYZ( event.clientX + this.mouseOffset.x, event.clientY + this.mouseOffset.y );
        
        //console.log(`Mouse move - ClientX: ${event.clientX}, ClientY: ${event.clientY}, OffsetX: ${event.offsetX}, OffsetY: ${event.offsetY}, RelX: ${event.movementX}, RelY: ${event.movementY}`);
        //console.log(`Canvas Offset: ${this.canvas.offsetLeft} x ${this.canvas.offsetTop}`);
        //console.log(`Document Offset: ${document.documentElement.scrollLeft} x ${document.documentElement.scrollTop}`);
        //console.log(`Move; RelX: ${this.mouseMoveRelX} RelY ${this.mouseMoveRelY}; AbsX: ${this.lastMouseMoveX} absY ${this.lastMouseMoveY}`);
    }
    
    //
    //  DESC: Handle onKeyDown events
    //
    onKeyDown( event )
    {
        if( event.repeat === false )
        {
            this.queue.push( event );
            
            console.log( event.type + ', ' + event.key + ', ' + event.keyCode + ', ' + event.code );
        }
    }
    
    //
    //  DESC: Handle onKeyUp events
    //
    onKeyUp( event )
    {
        this.queue.push( event );
    }

    //
    //  DESC: Handle onGamepadconnected events
    //
    onGamepadconnected( event )
    {
        this.gamePadMap.set( event.gamepad.index, event.gamepad );

        this.queue.push( event );

        console.log(`Gamepad connected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}; Button Count: ${event.gamepad.buttons.length}; Axes: ${event.gamepad.axes.length}`);
    }

    //
    //  DESC: Handle onGamepadDisconnected events
    //
    onGamepadDisconnected( event )
    {
        this.gamePadMap.delete(event.gamepad.index);

        this.queue.push( event );

        //console.log(`Gamepad disconnected: Index ${event.gamepad.index}; Id: ${event.gamepad.id}`);
    }

    //
    //  DESC: Handle gamepad
    //
    handleGamepad()
    {
        if( this.gamePadMap.size )
        {
            this.gamePadMap.forEach((lastGp, index) => 
            {
                let gp = navigator.getGamepads()[index];
                if(gp)
                {
                    for(let i = 0; i < gp.buttons.length; i++)
                    {
                        if(lastGp.buttons[i].pressed && !gp.buttons[i].pressed)
                            console.log( `Button Index Up: ${i};` );
                        else if(gp.buttons[i].pressed)
                            console.log( `Button Index Down: ${i};` );
                    }

                    this.gamePadMap.set(index, gp);
                }

                /*if(gp.buttons[0].pressed || gp.buttons[0].touched)
                    console.log( `Button Pressed: ${gp.buttons[0].pressed}; Button Touched: ${gp.buttons[0].touched}` );
                
                    let event = new CustomEvent('gamepadButtonDown',
                    {
                        detail:
                        {
                            gamepadIndex: index,
                            button: args
                        }
                    });
                
                this.queue.push( event );*/
            });
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
