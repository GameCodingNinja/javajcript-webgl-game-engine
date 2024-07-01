
// 
//  FILE NAME: uiprogressbar.js
//  DESC:      Class for user interface progress bar
//

"use strict";
import { UIControl } from './uicontrol';
import { Sprite } from '../sprite/sprite';
import { Size } from '../common/size';
import { Point } from '../common/point';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { device } from '../system/device';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

export class UIProgressBar extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_PROGRESS_BAR;
        
        // stencil mask sprite
        this.stencilMaskSprite;

        // current value of progress bar
        this.curValue = 0;

        // Total value not capped
        this.totalValue = 0;

        // Minimum value
        this.minValue = 0;

        // Max value of progress bar
        this.maxValue = 1;

        // Sprite index to apply stencil mask to
        this.spriteApplyIndex = -1;

        // Orentation
        this.orentation = defs.EO_HORIZONTAL;
        
        // alignment of this progress bar
        this.alignment = defs.EHA_HORZ_LEFT;

        // progress bar size
        this.progressBarSize = new Size;

        // progress bar pos
        this.progressBarPos = new Point;
        
        // progress bar scale
        this.progressBarScale = new Point;
    }
    
    //
    //  DESC: Load the control info from XML node
    //
    loadFromNode( xmlNode )
    {
        super.loadFromNode( xmlNode );

        // See if a range of values was specified
        let rangeNode = xmlNode.getElementsByTagName( 'range' );
        if( rangeNode.length )
        {
            let attr = rangeNode[0].getAttribute( 'cur' );
            if( attr )
            {
                this.curValue = Number( attr );
                this.totalValue = this.curValue;
            }

            attr = rangeNode[0].getAttribute( 'min' );
            if( attr )
                this.minValue = Number( attr );

            attr = rangeNode[0].getAttribute( 'max' );
            if( attr )
                this.maxValue = Number( attr );
        }

        let orentNode = xmlNode.getElementsByTagName( "orentation" );
        if( orentNode.length )
        {
            let attr = orentNode[0].getAttribute("type");
            if( attr === 'vert' )
                this.orentation = defs.EO_VERTICAL;

            attr = orentNode[0].getAttribute("alignment");
            if( attr )
            {
                if( this.orentation === defs.EO_HORIZONTAL )
                {
                    if( attr === 'right' )
                        this.alignment = defs.EHA_HORZ_RIGHT;

                    else if( attr === 'center' )
                        this.alignment = defs.EHA_HORZ_CENTER;
                }
                else
                {
                    if( attr === 'bottom' )
                        this.alignment = defs.EVA_VERT_BOTTOM;

                    else if( attr === 'center' )
                        this.alignment = defs.EVA_VERT_CENTER;
                }
            }
        }

        // Calculate the progress bar size and position
        this.setSizePos();
    }

    //
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( controlNode )
    {
        super.loadControlFromNode( controlNode );

        // Get the stencil mask node
        let stencilMaskNode = controlNode.getElementsByTagName( "stencilMask" );
        if( stencilMaskNode.length )
        {
            let stencilMaskSprite = stencilMaskNode[0].getAttribute( "objectName" );

            this.spriteApplyIndex = Number(stencilMaskNode[0].getAttribute( "spriteIndex" ));
            
            this.initSizePosScale( this.spriteApplyIndex, stencilMaskSprite );
        }
    }

    // 
    //  DESC: Set progress bar max
    //
    setProgressBarMax( max )
    {
        this.maxValue = max;
        this.setSizePos();
    }

    // 
    //  DESC: Inc progress bar max
    //
    incProgressBarMax( inc )
    {
        this.maxValue += inc;
        this.setSizePos();
    }

    // 
    //  DESC: Init the progress bar size, pos and scale
    //
    initSizePosScale( spriteApplyIndex, stencilMaskSprite = null )
    {
        this.spriteApplyIndex = spriteApplyIndex;
        
        if( stencilMaskSprite )
        {
            this.stencilMaskSprite = new Sprite( objectDataManager.getData( this.group, stencilMaskSprite ) );
            
            // Get the size
            this.progressBarSize.copy( this.stencilMaskSprite.objData.size );

            // Get the initial position
            this.progressBarPos.copy( this.stencilMaskSprite.pos );

            // Get the initial scale
            this.progressBarScale.copy( this.stencilMaskSprite.scale );
        }
        else
        {
            // Get the size
            this.progressBarSize.copy( this.spriteAry[this.spriteApplyIndex].objData.size );

            // Get the initial position
            this.progressBarPos.copy( this.spriteAry[this.spriteApplyIndex].pos );

            // Get the initial scale
            this.progressBarScale.copy( this.spriteAry[this.spriteApplyIndex].scale );
        }
    }

    // 
    //  DESC: Set the current value
    //
    setCurrentValue( cur )
    {
        this.totalValue = cur;
        this.curValue = genFunc.cap( cur, this.minValue, this.maxValue );
        this.setSizePos();
    }
    
    // 
    //  DESC: Inc the current value
    //
    incCurrentValue( value )
    {
        if( value === undefined )
        {
            ++this.curValue;
            ++this.totalValue;
        }
        else
        {
            this.curValue += value;
            this.totalValue += value;
        }

        this.curValue = genFunc.cap( this.curValue, this.minValue, this.maxValue );
        this.setSizePos();
    }

    // 
    //  DESC: Is the current value is minValue?
    //
    isMinValue()
    {
        return (this.curValue === this.minValue);
    }

    // 
    //  DESC: Is the current value is maxValue?
    //
    isMaxValue()
    {
        return (this.curValue === this.maxValue);
    }

    //
    //  DESC: Transform the control
    //
    transform( object )
    {
        super.transform( object );

        if( this.stencilMaskSprite )
            this.stencilMaskSprite.transform( this );
    }
    
    // 
    //  DESC: Transform the collision
    //  NOTE: This object has no collision
    //
    transformCollision()
    {
        // Empty by design
    }

    //
    //  DESC: do the render
    //
    render( camera )
    {
        if( this.stencilMaskSprite )
        {
            for( this._i  = 0; this._i < this.spriteAry.length; ++this._i )
            {
                if( this._i === this.spriteApplyIndex )
                {
                    // Disable rendering to the color buffer
                    // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
                    device.gl.colorMask( false, false, false, false );

                    // Disable rendering to the depth mask
                    device.gl.depthMask( false );

                    // Start using the stencil
                    device.gl.enable( device.gl.STENCIL_TEST );

                    device.gl.stencilFunc( device.gl.ALWAYS, 0x1, 0x1 );
                    device.gl.stencilOp( device.gl.REPLACE, device.gl.REPLACE, device.gl.REPLACE );
        

                    this.stencilMaskSprite.render( camera );
                    
                    
                    // Re-enable color
                    // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
                    device.gl.colorMask( true, true, true, true );

                    // Where a 1 was not rendered
                    device.gl.stencilFunc( device.gl.EQUAL, 0x1, 0x1 );

                    // Keep the pixel
                    device.gl.stencilOp( device.gl.KEEP, device.gl.KEEP, device.gl.KEEP );

                    // Enable rendering to the depth mask
                    device.gl.depthMask( true );


                    this.spriteAry[this._i].render( this.matrix );


                    // Finished using stencil
                    device.gl.disable( device.gl.STENCIL_TEST );
                }
                else
                    this.spriteAry[this._i].render( camera );
            }
        }
        else
        {
            super.render( camera );
        }
    }

    //
    //  DESC: Calculate the progress bar size and position
    //
    setSizePos()
    {
        this._scaleX = this.progressBarScale.x;
        this._scaleY = this.progressBarScale.y;
        this._posX = this.progressBarPos.x;
        this._posY = this.progressBarPos.y;

        // Calculate the new scale for the progress bar
        this._scaler = (this.curValue - this.minValue) / (this.maxValue - this.minValue);

        if( this.orentation == defs.EO_HORIZONTAL )
        {
            this._scaleX = this.progressBarScale.x * this._scaler;
            
            this._offset = this.progressBarSize.w * this._scaler;

            if( this.alignment == defs.EHA_HORZ_LEFT )
                this._posX -= (this.progressBarSize.w - this._offset) / 2;

            else if( this.alignment.horz == defs.EHA_HORZ_RIGHT )
                this._posX += (this.progressBarSize.w - this._offset) / 2;
        }
        else
        {
            this._scaleY = this.progressBarScale.y * this._scaler;
            
            this._offset = this.progressBarSize.h * this._scaler;

            if( this.alignment === defs.EVA_VERT_TOP )
                this._posY += (this.progressBarSize.h - this._offset) / 2;

            else if( this.alignment === defs.EVA_VERT_BOTTOM )
                this._posY -= (this.progressBarSize.h - this._offset) / 2;
        }

        if( this.stencilMaskSprite )
        {
            this.stencilMaskSprite.setScaleXYZ( this._scaleX, this._scaleY, 1 );
            this.stencilMaskSprite.setPosXYZ( this._posX, this._posY );
        }
        else
        {
            this.spriteAry[this.spriteApplyIndex].setScaleXYZ( this._scaleX, this._scaleY, 1 );
            this.spriteAry[this.spriteApplyIndex].setPosXYZ( this._posX, this._posY, 0 );
        }
    }
}
