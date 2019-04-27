
// 
//  FILE NAME: basegame.js
//  DESC:      base game class
//

"use strict";
import { gl, device } from './device';
import { textureManager } from '../managers/texturemanager';
import { vertexBufferManager } from '../managers/vertexbuffermanager';
import { shaderManager } from '../managers/shadermanager';
import { eventManager } from '../managers/eventmanager';
import { settings } from '../utilities/settings';
import { highResTimer } from '../utilities/highresolutiontimer';

export class Basegame
{
    constructor()
    {
        this.clearBufferMask = 0;
    }
    
    // 
    //  DESC: Init the game
    //
    init()
    {
        // Create the projection matrixes
        device.createProjMatrix();
        
        // Do we add stencil buffer
        if( settings.createStencilBuffer )
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        
        // Depth testing is off by default. Enable it?
        if( settings.enableDepthBuffer )
            gl.enable(gl.DEPTH_TEST);
    
        // Init the clear color
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        
        // Init the stencil clear mask based on the bit size of the mask
        // Stencil buffer can only be 1 or 8 bits per pixel
        if( settings.stencilBufferBitSize === 1 )
        {
            gl.stencilFunc(gl.ALWAYS, 1, 0x1);
            gl.stencilMask(0x1);
        }
        else if( settings.stencilBufferBitSize === 8 )
        {
            gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
            gl.stencilMask(0xff);
        }
        
        // Cull the back face
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);
        
        // Enable alpha blending
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Make the zero texture the active texture
        gl.activeTexture(gl.TEXTURE0);
        
        // Init the clear buffer mask
        if( settings.clearTargetBuffer )
            this.clearBufferMask |= gl.COLOR_BUFFER_BIT;

        if( settings.enableDepthBuffer )
            this.clearBufferMask |= gl.DEPTH_BUFFER_BIT;

        if( settings.clearStencilBuffer )
            this.clearBufferMask |= gl.STENCIL_BUFFER_BIT;
        
        gl.clear( this.clearBufferMask );
    }
    
    //
    //  DESC: Poll for game events
    //
    pollEvents()
    {
        let event = null;
        
        // Handle events on the queue
        while( (event = eventManager.pollEvent()) )
            this.handleEvent( event );
    }
    
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
    
    doStateChange()
    {
        // Empty function to be overwritten
    }
    
    miscProcess()
    {
        // Empty function to be overwritten
    }
    
    physics()
    {
        // Empty function to be overwritten
    }
    
    update()
    {
        // Empty function to be overwritten
    }
    
    transform()
    {
        // Empty function to be overwritten
    }
    
    render()
    {
        gl.clear( this.clearBufferMask );
        
        this.preRender();
        this.postRender();
        
        // Apparently it's a good practice to do this at the end of a render cycle
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();
    }
    
    preRender()
    {
        // Empty function to be overwritten
    }
    
    postRender()
    {
        // Empty function to be overwritten
    }
    
    // 
    //  DESC: Main game loop
    //
    gameLoop()
    {
        // Break out of the game loop and handle the state change
        if( this.doStateChange() )
            return;
        
        // Poll the events
        this.pollEvents();
        
        // Get our elapsed time
        highResTimer.calcElapsedTime();
        
        // Handle any misc processing before the real work is started
        this.miscProcess();
        
        // Handle the physics
        this.physics();
        
        // Update animations, Move sprites, Check for collision
        this.update();

        // Transform game objects
        this.transform();

        // Do the rendering
        this.render();

        // Continues the loop
        requestAnimationFrame( this.gameLoop.bind(this) );
    }
}
