
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
        this._canvas = null;
        this._glContext = null;
    }
    
    // 
    //  DESC: Create the OpenGL context
    //
    create()
    {
        let parm = {premultipliedAlpha: false, alpha: false, stencil:true, preserveDrawingBuffer: true};

        this._canvas = document.getElementById('game-surface');
        this._canvas.width = settings.displayRes.w;
        this._canvas.height = settings.displayRes.h;
        this._canvas.style.position = settings.canvasStylePosition;
        this._canvas.style.display = settings.canvasStyleDisplay;
        document.body.style.backgroundColor = settings.docBodyStyleBackgroundColor;
        document.body.style.margin = settings.docBodyStyleMargin;
        document.body.style.width = settings.docBodyStyleWidth;
        document.body.style.height = settings.docBodyStyleHeight;

        if( settings.centerInWnd )
        {
            this._canvas.style.left = `${(window.innerWidth - settings.displayRes.w) / 2}px`;
            this._canvas.style.top = `${(window.innerHeight - settings.displayRes.h) / 2}px`;
        }

        this._glContext =
            this._canvas.getContext('webgl2', parm) ||
            this._canvas.getContext('webgl', parm) ||
            this._canvas.getContext('experimental-webgl', parm);
        
        if( !this._glContext )
            alert('Your browser does not support WebGL');

        return this._glContext;
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
            this._canvas.width = settings.displayRes.w;
            this._canvas.height = settings.displayRes.h;
            this._glContext.viewport(0, 0, settings.displayRes.w, settings.displayRes.h);
        }

        if( settings.centerInWnd )
        {
            this._canvas.style.left = `${(width - settings.displayRes.w) / 2}px`;
            this._canvas.style.top = `${(height - settings.displayRes.h) / 2}px`;
        }

        //console.log( `Resolution Change: ${width} x ${height}; DPR: ${window.devicePixelRatio}` );
    }

    // 
    //  DESC: Get the canvas
    //
    get canvas()
    {
        return this._canvas;
    }

    // 
    //  DESC: Create the OpenGL context
    //
    get gl()
    {
        return this._glContext;
    }
}

export var device = new Device;
