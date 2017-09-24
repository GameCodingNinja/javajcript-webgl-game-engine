
// 
//  FILE NAME: settings.js
//  DESC:      game settings singleton class
//

"use strict";
import { Size } from '../common/size';
import * as defs from '../common/defs';

class Settings
{
    constructor()
    {
        this.size = new Size;
        this.size_half = new Size;
        this.nativeSize = new Size;
        this.screenAspectRatio = new Size;
        this.orthoAspectRatio = new Size;
        this.defaultSize = new Size;
        this.defaultSize_half = new Size;
        
        this.enableDepthBuffer = false;
        this.createStencilBuffer = false;
        this.clearStencilBuffer = false;
        this.stencilBufferBitSize = 1;
        this.clearTargetBuffer = true;
        this.projectionType = defs.EPT_PERSPECTIVE;
        this.viewAngle = 45.0 * defs.DEG_TO_RAD;
        this.minZdist = 5.0;
        this.maxZdist = 1000.5;
        
        // the sector size
        this.sectorSize = 0;
        this.sectorSizeHalf = 0;
    }
    
    // 
    //  DESC: Load data from XML node
    //
    load( node )
    {
        if( node )
        {
            let display = node.getElementsByTagName('display');
            if( display.length )
            {
                let resolution = display[0].getElementsByTagName('resolution');
                if( resolution.length )
                {
                    this.size.w = Number(resolution[0].getAttribute('width'));
                    this.size.h = Number(resolution[0].getAttribute('height'));
                }
                
                let defaultRes = display[0].getElementsByTagName('default');
                if( defaultRes.length )
                {
                    this.nativeSize.w = Number(defaultRes[0].getAttribute('width'));
                    this.nativeSize.h = Number(defaultRes[0].getAttribute('height'));
                    this.defaultSize.h = this.nativeSize.h;
                }
            }
            
            let device = node.getElementsByTagName('device');
            if( device.length )
            {
                let projection = device[0].getElementsByTagName('projection');
                if( projection.length )
                {
                    let attr = projection[0].getAttribute('projectType');
                    if( attr && (attr === 'orthographic') )
                        this.projectionType = defs.EPT_ORTHOGRAPHIC;
                    
                    attr = projection[0].getAttribute('minZDist');
                    if( attr )
                        this.minZdist = Number(attr);
                    
                    attr = projection[0].getAttribute('maxZDist');
                    if( attr )
                        this.maxZdist = Number(attr);
                    
                    attr = projection[0].getAttribute('view_angle');
                    if( attr )
                        this.viewAngle = Number(attr) * defs.DEG_TO_RAD;
                }
                    
                let depthStencilBuffer = device[0].getElementsByTagName('depthStencilBuffer');
                if( depthStencilBuffer.length )
                {
                    this.enableDepthBuffer = (depthStencilBuffer[0].getAttribute('enableDepthBuffer') === 'true');
                    this.createStencilBuffer = (depthStencilBuffer[0].getAttribute('createStencilBuffer') === 'true');
                    this.clearStencilBuffer = (depthStencilBuffer[0].getAttribute('clearStencilBuffer') === 'true');
                    this.stencilBufferBitSize = Number(depthStencilBuffer[0].getAttribute('stencilBufferBitSize'));
                }
                
                let targetBuffer = device[0].getElementsByTagName('targetBuffer');
                if( targetBuffer.length )
                    this.clearTargetBuffer = (targetBuffer[0].getAttribute('clear') === 'true');
            }
            
            let worldNode = node.getElementsByTagName('world');
            if( worldNode.length )
            {
                this.sectorSize = Number(worldNode[0].getAttribute('sectorSize'));
                this.sectorSizeHalf = Math.trunc(this.sectorSize / 2);
            }
        }
        
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
