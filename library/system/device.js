
// 
//  FILE NAME: device.js
//  DESC:      Singleton class used for openGL management
//

"use strict";

import { settings } from '../utilities/settings';
import { cameraManager } from '../managers/cameramanager';
import { menuManager } from '../gui/menumanager';

const DEFAULT_CONTEXT_ATTRS = Object.freeze({
    premultipliedAlpha: false,
    alpha: false,
    stencil: true,
    preserveDrawingBuffer: false,
    antialias: true,
    powerPreference: 'high-performance'
});

class Device
{
    constructor()
    {
        this.canvas = null;
        this.glContext = null;
        this.isWebGL2 = false;
        this.lost = false;

        this.caps = {
            maxTextureSize: 0,
            maxAnisotropy: 0,
            anisotropyExt: null,
            vaoExt: null
        };
    }
    
    // 
    //  DESC: Create the OpenGL context
    //
    create(canvasId = 'game-surface', attrs = null)
    {
        if( this.glContext )
            return this.glContext;

        // Merge passed attrs with defaults
        let contextAttrs = attrs ? Object.assign({}, DEFAULT_CONTEXT_ATTRS, attrs) : DEFAULT_CONTEXT_ATTRS;

        this.canvas = document.getElementById(canvasId);
        if( !this.canvas )
            throw new Error(`Canvas not found: #${canvasId}`);

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

        let gl2 = this.canvas.getContext('webgl2', contextAttrs);
        if( gl2 )
        {
            this.glContext = gl2;
            this.isWebGL2 = true;
        }
        else
        {
            let gl1 = this.canvas.getContext('webgl', contextAttrs) ||
                      this.canvas.getContext('experimental-webgl', contextAttrs);
            this.glContext = gl1;
            this.isWebGL2 = false;
        }
        
        if( !this.glContext )
            throw new Error('WebGL is not supported by your browser');

        this._installContextLossHandlers();
        this._initCapsAndState();

        return this.glContext;
    }

    //
    //  DESC: Install WebGL context lost/restored event handlers
    //
    _installContextLossHandlers()
    {
        this.canvas.addEventListener('webglcontextlost', (e) =>
        {
            e.preventDefault();
            this.lost = true;
            console.warn('WebGL context lost');
        }, { passive: false });

        this.canvas.addEventListener('webglcontextrestored', () =>
        {
            this.lost = false;
            this._initCapsAndState();
            console.log('WebGL context restored');
        });
    }

    //
    //  DESC: Initialize capabilities and baseline GL state
    //
    _initCapsAndState()
    {
        let gl = this.glContext;

        this.caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) | 0;

        let aniso =
            gl.getExtension('EXT_texture_filter_anisotropic') ||
            gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
            gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');

        this.caps.anisotropyExt = aniso;
        this.caps.maxAnisotropy = aniso ? (gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT) | 0) : 0;

        if( !this.isWebGL2 )
            this.caps.vaoExt = gl.getExtension('OES_vertex_array_object');
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
