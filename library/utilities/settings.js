
// 
//  FILE NAME: settings.js
//  DESC:      game settings singleton class
//

"use strict";
import { Size } from '../common/size';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

class Settings
{
    constructor()
    {
        this.size = new Size(853, 480);
        this.initialSize = new Size(this.size.w, this.size.h);
        this.size_half = new Size;
        this.nativeSize = new Size(1280, 720);
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
        this.stickDeadZone = 0.3;

        this.gameName = "Unnamed Game";
        this.gameId = "unnamedgame";

        // Calculate the ratios
        this.calcRatio();
    }

    // 
    //  DESC: Load the JSON created dictionary
    //
    load( settingsDict )
    {
        let display = settingsDict['display'];
        if( display )
        {
            let resolution = display['resolution'];
            if( resolution )
            {
                this.size.set( resolution['width'], resolution['height'] );
                this.initialSize.set( this.size.w, this.size.h );
            }

            let defaultRes = display['default'];
            if( defaultRes )
            {
                this.nativeSize.set( defaultRes['width'], defaultRes['height'] );
                this.defaultSize.h = this.nativeSize.h;
            }
        }

        let device = settingsDict['device'];
        if( device )
        {
            let projection = device['projection'];
            if( projection )
            {
                if( projection['projectType'] === 'perspective' )
                    this.projectionType = defs.EPT_PERSPECTIVE;

                if( projection['minZDist'] )
                    this.minZdist = projection['minZDist'];

                if( projection['maxZDist'] )
                    this.maxZdist = projection['maxZDist'];

                if( projection['viewAngle'] )
                    this.viewAngle = projection['viewAngle'] * defs.DEG_TO_RAD;
            }

            let depthStencilBuffer = device['depthStencilBuffer'];
            if( depthStencilBuffer )
            {
                if( depthStencilBuffer['enableDepthBuffer'] )
                    this.enableDepthBuffer = (depthStencilBuffer['enableDepthBuffer'] === 'true');

                if( depthStencilBuffer['createStencilBuffer'] )
                    this.createStencilBuffer = (depthStencilBuffer['createStencilBuffer'] === 'true');

                if( depthStencilBuffer['clearStencilBuffer'] )
                    this.clearStencilBuffer = (depthStencilBuffer['clearStencilBuffer'] === 'true');

                if( depthStencilBuffer['stencilBufferBitSize'] )
                    this.stencilBufferBitSize = depthStencilBuffer['stencilBufferBitSize'];
            }

            let targetBuffer = device['targetBuffer'];
            if( targetBuffer )
            {
                if( targetBuffer['clear'] )
                    this.clearTargetBuffer = (targetBuffer['clear'] === 'true');
            }

            let gamepad = device['gamepad'];
            if( gamepad )
            {
                if( gamepad['allow'] )
                    this.allowGamepad = (gamepad['allow'] === 'true');

                if( gamepad['stickDeadZone'] )
                    this.stickDeadZone = gamepad['stickDeadZone'];
            }
        }

        let game = settingsDict['game'];
        if( game )
        {
            if( game['name'] )
                this.gameName = game['name'];
            
            if( game['id'] )
                this.gameId = game['id'];
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
