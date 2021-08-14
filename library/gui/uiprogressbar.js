
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
                this.curValue = Number( attr );

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
        this.curValue = cur;
        
        this.setSizePos();
    }
    
    // 
    //  DESC: Inc the current value
    //
    incCurrentValue()
    {
        ++this.curValue;
        
        this.setSizePos();
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
    }

    //
    //  DESC: do the render
    //
    render( camera )
    {
        let gl = device.gl;
        
        if( this.stencilMaskSprite )
        {
            for( let i  = 0; i < this.spriteAry.length; ++i )
            {
                if( i === this.spriteApplyIndex )
                {
                    // Disable rendering to the color buffer
                    // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
                    gl.colorMask( false, false, false, false );

                    // Disable rendering to the depth mask
                    gl.depthMask( false );

                    // Start using the stencil
                    gl.enable( gl.STENCIL_TEST );

                    gl.stencilFunc( gl.ALWAYS, 0x1, 0x1 );
                    gl.stencilOp( gl.REPLACE, gl.REPLACE, gl.REPLACE );
        

                    this.stencilMaskSprite.render( camera );
                    
                    
                    // Re-enable color
                    // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
                    gl.colorMask( true, true, true, true );

                    // Where a 1 was not rendered
                    gl.stencilFunc( gl.EQUAL, 0x1, 0x1 );

                    // Keep the pixel
                    gl.stencilOp( gl.KEEP, gl.KEEP, gl.KEEP );

                    // Enable rendering to the depth mask
                    gl.depthMask( true );


                    this.spriteAry[i].render( this.matrix );


                    // Finished using stencil
                    gl.disable( gl.STENCIL_TEST );
                }
                else
                    this.spriteAry[i].render( camera );
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
        let scaleX = this.progressBarScale.x;
        let scaleY = this.progressBarScale.y;
        let posX = this.progressBarPos.x;
        let posY = this.progressBarPos.y;

        // Calculate the new scale for the progress bar
        let scaler = (this.curValue - this.minValue) / (this.maxValue - this.minValue);

        if( this.orentation == defs.EO_HORIZONTAL )
        {
            scaleX = this.progressBarScale.x * scaler;
            
            let offset = this.progressBarSize.w * scaler;

            if( this.alignment == defs.EHA_HORZ_LEFT )
                posX -= (this.progressBarSize.w - offset) / 2;

            else if( this.alignment.horz == defs.EHA_HORZ_RIGHT )
                posX += (this.progressBarSize.w - offset) / 2;
        }
        else
        {
            scaleY = this.progressBarScale.y * scaler;
            
            let offset = this.progressBarSize.h * scaler;

            if( this.alignment === defs.EVA_VERT_TOP )
                posY += (this.progressBarSize.h - offset) / 2;

            else if( this.alignment === defs.EVA_VERT_BOTTOM )
                posY -= (this.progressBarSize.h - offset) / 2;
        }

        if( this.stencilMaskSprite )
        {
            this.stencilMaskSprite.setScaleXYZ( scaleX, scaleY, 1 );
            this.stencilMaskSprite.setPosXYZ( posX, posY );
        }
        else
        {
            this.spriteAry[this.spriteApplyIndex].setScaleXYZ( scaleX, scaleY, 1 );
            this.spriteAry[this.spriteApplyIndex].setPosXYZ( posX, posY, 0 );
        }
    }
}
