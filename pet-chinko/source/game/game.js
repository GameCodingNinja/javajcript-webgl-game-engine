
// 
//  FILE NAME: game.js
//  DESC:      CGame class
//

"use strict";

import { signalManager } from '../../../library/managers/signalmanager';
import { settings } from '../../../library/utilities/settings';
import { textureManager } from '../../../library/managers/texturemanager';
import { vertexBufferManager } from '../../../library/managers/vertexbuffermanager';
import { shaderManager } from '../../../library/managers/shadermanager';
import { StartUpState } from '../state/startupstate';
import { TitleScreenState } from '../state/titlescreenstate';
import { LoadState } from '../state/loadstate';
import { Level1State } from '../state/level1state';
import { device } from '../../../library/system/device';
import { eventManager } from '../../../library/managers/eventmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import * as stateDefs from '../state/statedefs';

// Load data from bundle
import settingsObj from '../../data/settings/settings.json';
import userSettingsObj from '../../data/settings/usersettings.json';

export class Game
{
    constructor()
    {
    }
    
    // 
    //  DESC: Init the game
    //
    init()
    {
        // Load the settings
        settings.loadFromObj( settingsObj );
        settings.loadUserSettingsFromObj( userSettingsObj );

        // Create the OpenGL context
        let gl = device.create();

        // Set the init shader callback
        signalManager.connect_initShader( this.initShaderCallBack.bind(this) );
        
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
        
        // Identify the front face winding orientation 
        if( settings.cullFrontFace === 'CCW' )
            gl.frontFace(gl.CCW);
        else if( settings.cullFrontFace === 'CW' )
            gl.frontFace(gl.CW);

        // Specify whether or not front- and/or back-facing polygons can be culled
        if( settings.cullFace === 'BACK' )
            gl.cullFace(gl.BACK);
        else if( settings.cullFace === 'FRONT' )
            gl.cullFace(gl.FRONT);
        else if( settings.cullFace === 'FRONT_AND_BACK' )
            gl.cullFace(gl.FRONT_AND_BACK);

        // Enable culling. Disabled by default
        if( settings.cullEnable )
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
        
        // Create the startup state
        this.gameState = new StartUpState( this.gameLoop.bind(this) );
    }
    
    // 
    //  DESC: Callback for shader init
    //
    initShaderCallBack( shaderId )
    {
        shaderManager.setShaderValue4fv( shaderId, 'additive', [0,0,0,1] );
    }
    
    // 
    //  DESC: Handle the state change
    //
    doStateChange()
    {
        if( this.gameState.doStateChange() )
        {
            this.gameState.cleanUp();
            
            if( this.gameState.nextState === stateDefs.EGS_TITLE_SCREEN )
                this.gameState = new TitleScreenState( this.gameLoop.bind(this) );
            
            else if( this.gameState.nextState === stateDefs.EGS_GAME_LOAD )
                this.gameState = new LoadState( this.gameState.stateMessage, this.gameLoop.bind(this) );
            
            else if( this.gameState.nextState === stateDefs.EGS_LEVEL_1 )
                this.gameState = new Level1State( this.gameLoop.bind(this) );
            
            return true;
        }
        
        return false;
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
    
    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.gameState.handleEvent( event );
    }
    
    // 
    //  DESC: Main game loop
    //
    gameLoop()
    {
        // Break out of the game loop if the 
        // state needs to do some loading
        if( this.doStateChange() )
            return;
        
        // Poll the events
        this.pollEvents();
        
        // Get our elapsed time
        highResTimer.calcElapsedTime();
        
        // Handle the physics
        this.gameState.physics();
        
        // Update animations, Move sprites, Check for collision
        this.gameState.update();

        // Transform game objects
        this.gameState.transform();

        // Clear the back buffer
        device.gl.clear( this.clearBufferMask );
        
        // Do the rendering
        this.gameState.render();
        
        // Apparently it's a good practice to do this at the end of a render cycle
        shaderManager.unbind();
        textureManager.unbind();
        vertexBufferManager.unbind();

        // Continues the loop
        requestAnimationFrame( this.gameLoop.bind(this) );
    }
}
