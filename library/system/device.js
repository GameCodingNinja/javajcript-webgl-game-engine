
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
        
        document.body.style.width = `${settings.size.w}px`;
        document.body.style.height = `${settings.size.h}px`;
        this._canvas = document.getElementById('game-surface');
        this._canvas.width = settings.size.w;
        this._canvas.height = settings.size.h;

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
    handleResolutionChange( width, height )
    {
        settings.size.set( width, height );
        settings.calcRatio();
        menuManager.resetTransform();
        menuManager.resetDynamicOffset();
        cameraManager.rebuild();
        this._canvas.width = width
        this._canvas.height = height;
        this._glContext.viewport(0, 0, width, height);
        //console.log( `Canvas size: ${width} x ${height}; DPR: ${window.devicePixelRatio}` );
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
