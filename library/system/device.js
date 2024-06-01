
// 
//  FILE NAME: device.js
//  DESC:      Singleton class used for openGL management
//

"use strict";

import { settings } from '../utilities/settings';
import { cameraManager } from '../managers/cameramanager';
import { menuManager } from '../gui/menumanager';

class Device
{
    constructor()
    {
        this.canvas = null;
        this.glContext = null;
    }
    
    // 
    //  DESC: Create the OpenGL context
    //
    create()
    {
        let parm = {premultipliedAlpha: false, alpha: false, stencil:true, preserveDrawingBuffer: true};

        this.canvas = document.getElementById('game-surface');
        this.canvas.width = settings.displayRes.w;
        this.canvas.height = settings.displayRes.h;
        this.canvas.style.position = settings.canvasStylePosition;
        this.canvas.style.display = settings.canvasStyleDisplay;
        document.body.style.backgroundColor = settings.docBodyStyleBackgroundColor;
        document.body.style.margin = settings.docBodyStyleMargin;
        document.body.style.width = settings.docBodyStyleWidth;
        document.body.style.height = settings.docBodyStyleHeight;

        if( settings.centerInWnd )
        {
            this.canvas.style.left = `${(window.innerWidth - settings.displayRes.w) / 2}px`;
            this.canvas.style.top = `${(window.innerHeight - settings.displayRes.h) / 2}px`;
        }

        this.glContext =
            this.canvas.getContext('webgl2', parm) ||
            this.canvas.getContext('webgl', parm) ||
            this.canvas.getContext('experimental-webgl', parm);
        
        if( !this.glContext )
            alert('Your browser does not support WebGL');

        return this.glContext;
    }

    //
    //  DESC: Handle the resolution change
    //
    handleResolutionChange( width, height, fullscreenChange )
    {
        if( settings.dynamicResize || fullscreenChange )
        {
            settings.handleResolutionChange( width, height );
            menuManager.resetTransform();
            menuManager.resetDynamicOffset();
            cameraManager.rebuild();
            this.canvas.width = settings.displayRes.w;
            this.canvas.height = settings.displayRes.h;
            this.glContext.viewport(0, 0, settings.displayRes.w, settings.displayRes.h);
        }

        if( settings.centerInWnd )
        {
            this.canvas.style.left = `${(width - settings.displayRes.w) / 2}px`;
            this.canvas.style.top = `${(height - settings.displayRes.h) / 2}px`;
        }

        //console.log( `Resolution Change: ${width} x ${height}; DPR: ${window.devicePixelRatio}` );
    }

    // 
    //  DESC: Create the OpenGL context
    //
    get gl()
    {
        return this.glContext;
    }
}

export var device = new Device;
