
// 
//  FILE NAME: settings.js
//  DESC:      game settings singleton class
//

"use strict";
import { Size } from '../common/size';
import { localStorage } from '../utilities/localstorage';
import * as defs from '../common/defs';

class Settings
{
    constructor()
    {
        this.deviceRes = new Size;  // Render resolution in video hardware
        this.displayRes = new Size; // Screen resolution size
        this.dynamicResize = false; // Allow the display to be resized
        this.centerInWnd = false;   // Allow the display to be centered

        this.deviceRes_half = new Size;
        this.displayRes_half = new Size;
        this.lastDisplayRes = new Size;

        this.screenAspectRatio = new Size;
        this.orthoAspectRatio = new Size;
        
        this.enableDepthBuffer = false;
        this.createStencilBuffer = false;
        this.clearStencilBuffer = false;
        this.stencilBufferBitSize = 1;
        this.clearTargetBuffer = true;
        this.projectionType = defs.EPT_ORTHOGRAPHIC;
        this.viewAngle = 45.0 * defs.DEG_TO_RAD;
        this.minZdist = 5.0;
        this.maxZdist = 1000.5;

        this.cullEnable = true;
        this.cullFrontFace = "CCW";
        this.cullFace = "BACK";

        this.allowGamepad = false;

        this.gameName = "Unnamed Game";
        this.gameId = "unnamedgame";

        this.stats = false;

        this.user = null;
    }

    // 
    //  DESC: Load the Obj data
    //
    loadUserSettingsFromObj( obj )
    {
        if( obj )
        {
            this.user = obj;
            let savedUserSettings = localStorage.get( 'userSettings' );
            if( savedUserSettings )
            {
                // If the version does not match, delete the local storage
                if( this.user.version != savedUserSettings.version )
                    localStorage.free( 'userSettings' );
                else
                    this.user = savedUserSettings;
            }
        }
    }

    // 
    //  DESC: Load the Obj data
    //
    loadFromObj( obj )
    {
        if( obj.display )
        {
            if( obj.display.resolution )
            {
                // Initial display resolution
                this.displayRes.set( obj.display.resolution.width, obj.display.resolution.height );
                this.lastDisplayRes.set( obj.display.resolution.width, obj.display.resolution.height );

                // If locked, display resolution does not expand with the size of the window
                this.dynamicResize = (obj.display.resolution.dynamicResize == 1);

                // Indicates if it is to be centered within the window
                this.centerInWnd = (obj.display.resolution.centerInWnd == 1);
            }

            if( obj.display.canvasStyle )
            {
                this.canvasStylePosition = obj.display.canvasStyle.position;
                this.canvasStyleDisplay = obj.display.canvasStyle.display;
            }

            if( obj.display.docBodyStyle )
            {
                this.docBodyStyleBackgroundColor = obj.display.docBodyStyle.backgroundColor;
                this.docBodyStyleMargin = obj.display.docBodyStyle.margin;
                this.docBodyStyleWidth = obj.display.docBodyStyle.width;
                this.docBodyStyleHeight = obj.display.docBodyStyle.height;
            }
        }

        if( obj.device )
        {
            if( obj.device.resolution )
            {
                // Device rendering resolution
                this.deviceRes.set( obj.display.resolution.width, obj.display.resolution.height );
                this.deviceRes_half.w = this.deviceRes.w / 2;
                this.deviceRes_half.h = this.deviceRes.h / 2;

                // Height and width screen ratio for perspective projection
                this.screenAspectRatio.w = obj.display.resolution.width / obj.display.resolution.height;
                this.screenAspectRatio.h = obj.display.resolution.height / obj.display.resolution.width;
            }

            if( obj.device.projection )
            {
                if( obj.device.projection.projectType === 'perspective' )
                    this.projectionType = defs.EPT_PERSPECTIVE;

                if( obj.device.projection.minZDist )
                    this.minZdist = obj.device.projection.minZDist;

                if( obj.device.projection.maxZDist )
                    this.maxZdist = obj.device.projection.maxZDist;

                if( obj.device.projection.viewAngle )
                    this.viewAngle = obj.device.projection.viewAngle * defs.DEG_TO_RAD;
            }

            if( obj.device.cull )
            {
                if( obj.device.cull.enable )
                    this.cullEnable = (obj.device.cull.enable === 'true');

                if( obj.device.cull.frontFace )
                    this.cullFrontFace = obj.device.cull.frontFace;

                if( obj.device.cull.cullFace )
                    this.cullFace = obj.device.cull.cullFace;
            }

            if( obj.device.depthStencilBuffer )
            {
                if( obj.device.depthStencilBuffer.enableDepthBuffer )
                    this.enableDepthBuffer = (obj.device.depthStencilBuffer.enableDepthBuffer === 'true');

                if( obj.device.depthStencilBuffer.createStencilBuffer )
                    this.createStencilBuffer = (obj.device.depthStencilBuffer.createStencilBuffer === 'true');

                if( obj.device.depthStencilBuffer.clearStencilBuffer )
                    this.clearStencilBuffer = (obj.device.depthStencilBuffer.clearStencilBuffer === 'true');

                if( obj.device.depthStencilBuffer.stencilBufferBitSize )
                    this.stencilBufferBitSize = obj.device.depthStencilBuffer.stencilBufferBitSize;
            }

            if( obj.device.targetBuffer )
            {
                if( obj.device.targetBuffer.clear )
                    this.clearTargetBuffer = (obj.device.targetBuffer.clear === 'true');
            }

            if( obj.device.gamepad )
            {
                if( obj.device.gamepad.allow )
                    this.allowGamepad = (obj.device.gamepad.allow === 'true');

                if( obj.device.gamepad.stickDeadZone )
                    this.stickDeadZone = obj.device.gamepad.stickDeadZone;
            }

            if( obj.device.stats )
            {
                if( obj.device.stats.allow )
                    this.stats = (obj.device.stats.allow === 'true');
            }
        }

        if( obj.game )
        {
            if( obj.game.name )
                this.gameName = obj.game.name;
            
            if( obj.game.id )
                this.gameId = obj.game.id;

            if( obj.game.version )
                this.gameVersion = obj.game.version;
        }

        // Calculate the ratios
        this.calcRatio();
    }
    
    // 
    //  DESC: Calculate the ratios
    //
    calcRatio()
    {
        if( this.dynamicResize )
        {
            if( window.innerWidth / window.innerHeight > this.screenAspectRatio.w )
            {
                this.displayRes.h = window.innerHeight;
                this.displayRes.w = Math.floor((this.screenAspectRatio.w * window.innerHeight) + 0.5);
            }
            else
            {
                this.displayRes.w = window.innerWidth;
                this.displayRes.h = Math.floor((this.screenAspectRatio.h * window.innerWidth) + 0.5);
            }
        }

        // Get half the size for use with screen boundries
        this.displayRes_half.w = this.displayRes.w / 2;
        this.displayRes_half.h = this.displayRes.h / 2;
        
        // Precalculate the aspect ratios for orthographic projection
        this.orthoAspectRatio.h = this.displayRes.h / this.deviceRes.h;
        this.orthoAspectRatio.w = this.displayRes.w / this.deviceRes.w;
    }

    // 
    //  DESC: Handle the resolution change
    //
    handleResolutionChange( width, height )
    {
        this.displayRes.set( width, height );
        this.calcRatio();
    }
}

export var settings = new Settings;
