
// 
//  FILE NAME: device.js
//  DESC:      Singleton class used for openGL management
//

"use strict";

import { settings } from '../utilities/settings';
import { Matrix } from '../utilities/matrix';

class Device
{
    constructor()
    {
        this.perspectiveMatrix = new Matrix;
        this.orthographicMatrix = new Matrix;
        this.canvas = null;
        this.glContext = null;
        
        // Create the OpenGL context
        this.create();
    }
    
    // 
    //  DESC: Create the OpenGL context
    //
    create()
    {
        this.canvas = document.getElementById('game-surface');
	this.glContext = this.canvas.getContext('webgl',{premultipliedAlpha: false, alpha: false, stencil:true, preserveDrawingBuffer: true});

	if( !this.glContext )
        {
            console.log('WebGL not supported, falling back on experimental-webgl');
            this.glContext = this.canvas.getContext('experimental-webgl',{premultipliedAlpha: false, alpha: false, stencil:true, preserveDrawingBuffer: true});
	}

	if( !this.glContext )
        {
            alert('Your browser does not support WebGL');
        }
    }
    
    // 
    //  DESC: Create the projection matrixes
    //
    createProjMatrix()
    {
        this.perspectiveMatrix.perspectiveFovRH(
            settings.viewAngle,
            settings.screenAspectRatio.w,
            settings.minZdist,
            settings.maxZdist );
            
        this.orthographicMatrix.orthographicRH(
            settings.defaultSize.w,
            settings.defaultSize.h,
            settings.minZdist,
            settings.maxZdist );
    }
}

export var device = new Device;
export var gl = device.glContext;
