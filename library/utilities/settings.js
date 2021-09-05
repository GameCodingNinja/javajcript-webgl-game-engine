
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
        this.size = new Size(853, 480);
        this.initialSize = new Size(this.size.w, this.size.h);
        this.size_half = new Size;
        this.nativeSize = new Size(1280, 720);
        this.nativeSize_half = new Size;
        this.screenAspectRatio = new Size;
        this.orthoAspectRatio = new Size;
        this.defaultSize = new Size(0, this.nativeSize.h);
        this.defaultSize_half = new Size;
        
        this.enableDepthBuffer = false;
        this.createStencilBuffer = false;
        this.clearStencilBuffer = false;
        this.stencilBufferBitSize = 1;
        this.clearTargetBuffer = true;
        this.projectionType = defs.EPT_ORTHOGRAPHIC;
        this.viewAngle = 45.0 * defs.DEG_TO_RAD;
        this.minZdist = 5.0;
        this.maxZdist = 1000.5;

        this.allowGamepad = false;

        this.gameName = "Unnamed Game";
        this.gameId = "unnamedgame";

        this.user = {
            "stickDeadZone": 0.1,
            "soundEnabled": 1 };

        // Calculate the ratios
        this.calcRatio();
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
                this.user = JSON.parse( savedUserSettings );
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
                this.size.set( obj.display.resolution.width, obj.display.resolution.height );
                this.initialSize.set( this.size.w, this.size.h );
            }

            if( obj.display.default )
            {
                this.nativeSize.set( obj.display.default.width, obj.display.default.height );
                this.nativeSize_half.w = this.nativeSize.w / 2;
                this.nativeSize_half.h = this.nativeSize.h / 2;
                this.defaultSize.h = this.nativeSize.h;
            }
        }

        if( obj.device )
        {
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
        }

        if( obj.game )
        {
            if( obj.game.name )
                this.gameName = obj.game.name;
            
            if( obj.game.id )
                this.gameId = obj.game.id;
        }

        // Calculate the ratios
        this.calcRatio();
    }
    
    // 
    //  DESC: Calculate the ratios
    //
    calcRatio()
    {
        // Height and width screen ratio for perspective projection
        this.screenAspectRatio.w = this.size.w / this.size.h;
        this.screenAspectRatio.h = this.size.h / this.size.w;
        
        // NOTE: The default width is based on the current aspect ratio
        // NOTE: Make sure the width does not have a floating point component
        this.defaultSize.w = Math.floor((this.screenAspectRatio.w * this.defaultSize.h) + 0.5);
        
        // Get half the size for use with screen boundries
        this.defaultSize_half.w = this.defaultSize.w / 2;
        this.defaultSize_half.h = this.defaultSize.h / 2;

        // Screen size devided by two
        this.size_half.w = this.size.w / 2;
        this.size_half.h = this.size.h / 2;
        
        // Precalculate the aspect ratios for orthographic projection
        this.orthoAspectRatio.h = this.size.h / this.defaultSize.h;
        this.orthoAspectRatio.w = this.size.w / this.defaultSize.w;
    }
}

export var settings = new Settings;
