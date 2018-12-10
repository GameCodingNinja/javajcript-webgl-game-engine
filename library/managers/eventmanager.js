
//
//  FILE NAME: eventmanager.js
//  DESC:      event manager class singleton
//

"use strict";

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
        
        // Using document for key listener because canvas needs the focus before
        // it will trap key events. There's no good solution for force the focus
        // onto the canvas
        document.addEventListener('keydown', this.onKeyDown.bind(this) );
        document.addEventListener('keyup', this.onKeyUp.bind(this) );
        
        document.addEventListener('scroll', this.onScroll.bind(this) );
        
        //this.canvas.addEventListener('keydown', this.onKeyDown.bind(this) );
        //this.canvas.addEventListener('keyup', this.onKeyUp.bind(this) );
        
        // Mouse move relative offset data types
        this.lastMouseMoveX = 0;
        this.lastMouseMoveY = 0;
        
        this.mouseMoveRelX = 0;
        this.mouseMoveRelY = 0;
        
        this.mouseMoveOffsetX = (document.documentElement.scrollLeft - this.canvas.offsetLeft);
        this.mouseMoveOffsetY = (document.documentElement.scrollTop - this.canvas.offsetTop);
    }
    
    get mouseX() { return this.lastMouseMoveX; }
    get mouseY() { return this.lastMouseMoveY; }
    
    get mouseRelX() { return this.mouseMoveRelX; }
    get mouseRelY() { return this.mouseMoveRelY; }
    
    get mouseOffsetX() { return this.mouseMoveOffsetX; }
    get mouseOffsetY() { return this.mouseMoveOffsetY; }
    
    pollEvent()
    {
        if( this.queue.length )
            return this.queue.shift();
        
        return null;
    }
    
    dispatchEvent( _type, ...args )
    {
        let event = new CustomEvent('customEvent',
            {
                detail:
                {
                    type: _type,
                    arg: args
                }
            });
        
        this.queue.push( event );
    }
    
    onScroll( event )
    {
        this.mouseMoveOffsetX = (document.documentElement.scrollLeft - this.canvas.offsetLeft);
        this.mouseMoveOffsetY = (document.documentElement.scrollTop - this.canvas.offsetTop);
    }
    
    onMouseDown( event )
    {
        this.queue.push( event );
        
        //console.log( event.type + ', ' + event.button );
    }
    
    onMouseUp( event )
    {
        this.queue.push( event );
    }
    
    onMouseMove( event )
    {
        this.queue.push( event );
        
        this.mouseMoveRelX = event.movementX;
        this.mouseMoveRelY = event.movementY;
        
        this.lastMouseMoveX = event.clientX + this.mouseMoveOffsetX;
        this.lastMouseMoveY = event.clientY + this.mouseMoveOffsetY;
        
        //console.log( `Mouse move - ClientX: ${event.clientX}, ClientY: ${event.clientY}, OffsetX: ${event.offsetX}, OffsetY: ${event.offsetY}, RelX: ${event.movementX}, RelY: ${event.movementY}` );
        //console.log(`Canvas Offset: ${this.canvas.offsetLeft} x ${this.canvas.offsetTop}`);
        //console.log(`Document Offset: ${document.documentElement.scrollLeft} x ${document.documentElement.scrollTop}`);
    }
    
    onKeyDown( event )
    {
        if( event.repeat === false )
        {
            this.queue.push( event );
            
            //console.log( event.type + ', ' + event.key + ', ' + event.keyCode );
        }
    }
    
    onKeyUp( event )
    {
        this.queue.push( event );
    }
    
    onCustomEvent( event )
    {
        this.queue.push( event );
        
        //console.log( `Custom Event was sent. ${event.detail.type}, ${event.detail.arg[0]}, ${event.detail.arg[1]}` );
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
