
// 
//  FILE NAME: uimeter.js
//  DESC:      Class for user interface meters
//

"use strict";

import { Timer } from '../utilities/timer';
import { highResTimer } from '../utilities/highresolutiontimer';
import { Size } from '../common/size';
import { UIControl } from './uicontrol';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as parseHelper from '../utilities/xmlparsehelper';

// EBangType
const EBT_RAMP_UP = 0,
      EBT_LINEAR  = 1,
      EBT_HYBRID  = 2;
    
// EScaleType
const EST_AXIS     = 0,
      EST_ACCURATE = 1;
      
class BangRange
{
    constructor( target, bangType, velocity, estimatedTime, slowStartTime )
    {
        this.target = target;
        this.bangType = bangType;
        this.velocity = velocity;
        this.estimatedTime = estimatedTime;
        this.slowStartTime = slowStartTime;
    }
}

export class UIMeter extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_METER;
        
        // Current value
        this.currentValue = 0;

        // Target value
        this.targetValue = 0;

        // Velocity value
        this.velocity = 0;

        // Terminal velocity value
        this.terminalVelocity = 0;

        // Acceleration value
        this.acceleration = 0;

        // Impulse value
        this.impulse = 0;

        // last value
        this.lastValue = 0;

        // fast bang time amount
        this.fastBangTime = 0;

        // bang up flag
        this.bangUp = false;

        // spin timer
        this.startUpTimer = new Timer;

        // Current bang range
        this.bangRange = new BangRange;

        // Sprite reference to font
        this.fontSprite = null;

        // Bang range value
        this.bangRangeAry = [];

        // Max Font string size for this meter
        this.maxFontStrSize = null;

        // The amount to scale the font by to fit within the meter
        this.bangScaleAdjustment = new Size(1, 1);

        // Scale on axis or accurate
        this.scaleType = EST_AXIS;
    }
    
    //
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Get the bang range info
        let bangRangeNode = node.getElementsByTagName( 'bangRange' );
        if( bangRangeNode.length )
        {
            // Get the fast bang time
            this.fastBangTime = Number(bangRangeNode[0].getAttribute( 'fastBangTime' ));

            // Set the scale type - How the font is scaled to fit within the meter
            if( bangRangeNode[0].getAttribute('scaleType') === 'accurate' )
                this.scaleType = EST_ACCURATE;

            let rangeNode = bangRangeNode[0].getElementsByTagName( 'range' );
            
            for( let i = 0; i < rangeNode.length; ++i )
            {
                let attr = rangeNode[i].getAttribute( 'bangUpType' );
                let bangType = EBT_RAMP_UP;
                if( attr === 'linear' )
                    bangType = EBT_LINEAR;
                else if( attr === 'hybrid' )
                    bangType = EBT_HYBRID;

                this.bangRangeAry.push( new BangRange(
                    Number(rangeNode[i].getAttribute( 'target' )),
                    bangType,
                    Number(rangeNode[i].getAttribute( 'velocity' )),
                    Number(rangeNode[i].getAttribute( 'estimatedTime' )),
                    Number(rangeNode[i].getAttribute( 'slowStartTime' )) ) );
            }
        }

        // Get the max size of the font string to fit within this meter.
        // As the string get's bigger, it will be scaled to fit.
        this.maxFontStrSize = parseHelper.loadSize( node );
        
        // If no meter scripts are defined, display the current value
        if( node.getElementsByTagName( 'meterScript' ).length == 0 )
            this.displayValue();
    }

    //
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( controlNode )
    {
        // Call the parent
        super.loadControlFromNode( controlNode );

        // Find the sprite that renders the font
        this.findFontSprite();
    }
    
    //
    //  DESC: Find the sprite that renders the font
    //        NOTE: Should always be the last font sprite in the sprite list
    //
    findFontSprite()
    {
        for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
        {
            if( this.spriteAry[this._i].visualComponent.isFontSprite() )
                this.fontSprite = this.spriteAry[this._i];
        }

        if( this.fontSprite == null )
            throw new Error( `UI Meter doesn't have a sprite for rendering a font string (${this.name}).` );
    }

    //
    //  DESC: Set the amount to the meter without banging up
    //
    set( amount )
    {
        if( amount !== this.currentValue )
        {
            this.lastValue = this.currentValue;
            this.currentValue = this.targetValue = amount;

            // Display the value in the meter
            this.displayValue();
        }
    }

    //
    //  DESC: Start the bang range
    //
    startBangUp( amount )
    {
        if( amount !== this.currentValue )
        {
            this.targetValue = amount;
            this.bangUp = true;

            this.setBangRange();
        }
    }

    //
    //  DESC: Start the bang range
    //
    incBangUp( amount )
    {
        this.targetValue += amount;
        this.bangUp = true;

        this.setBangRange();
    }

    //
    //  DESC: Set the bang range
    //
    setBangRange()
    {
        this._found = false;

        for( this._i = 0; this._i < this.bangRangeAry.length; ++this._i )
        {
            if( (this.targetValue - this.currentValue) <= this.bangRangeAry[this._i].target )
            {
                this._found = true;
                this.initBangRange( this.bangRangeAry[this._i] );
                break;
            }
        }

        if( !this._found )
            this.initBangRange( this.bangRangeAry[this.bangRangeAry.length-1] );
    }

    //
    //  DESC: Init the bang range
    //
    initBangRange( bangRange )
    {
        this.bangRange = bangRange;
        this.terminalVelocity = 0.0;
        this.acceleration = 0.0;
        this.impulse = 0.0;
        this.bangScaleAdjustment.set(1,1);

        this.fontSprite.setScaleXYZ( 1, 1, 1 );

        this.velocity = bangRange.velocity / 1000.0;

        this._range = this.targetValue - this.currentValue;

        // Ramp up from start to finish
        if( bangRange.bangType === EBT_RAMP_UP )
        {
            this.impulse = this._range / (bangRange.estimatedTime * bangRange.estimatedTime * 1000.0);
            this.acceleration = this.impulse;
        }
        // Linear bang up from the start
        else if( bangRange.bangType === EBT_LINEAR )
        {
            this.acceleration = this._range / (bangRange.estimatedTime * 1000.0);
        }
        // combination of ramp up and linear
        else if( bangRange.bangType === EBT_HYBRID )
        {
            this.terminalVelocity = this._range / (bangRange.estimatedTime * 1000.0);
            this.impulse = this._range / (bangRange.estimatedTime * bangRange.estimatedTime * 500.0);
            this.acceleration = this.impulse;
        }

        // Set the timer to allow the bang-up to start off slowly
        this.startUpTimer.set( bangRange.slowStartTime );

        // Prepare the start script function if one exists
        this.fontSprite.scriptComponent.prepare( 'start', this.fontSprite );
    }

    //
    //  DESC: Do a fast bang
    //
    fastBang()
    {
        if( this.bangUp )
        {
            let acceleration = (this.targetValue - this.currentValue) / this.fastBangTime;

            // use the fast bang acceleration if the current one is less
            if( this.acceleration < acceleration )
                this.acceleration = acceleration;
        }
    }

    //
    //  DESC: Update the control
    //
    update()
    {
        super.update();

        if( this.bangUp )
        {
            // Ramp up from start to finish
            if( this.bangRange.bangType === EBT_RAMP_UP )
            {
                this.currentValue += this.velocity * highResTimer.elapsedTime;

                if( this.startUpTimer.expired() )
                {
                    this.velocity += this.acceleration * highResTimer.elapsedTime;
                    this.acceleration += this.impulse * highResTimer.elapsedTime;
                }
                else
                {
                    this.velocity += this.acceleration * highResTimer.elapsedTime;
                }
            }
            // Linear bang up from the start
            else if( this.bangRange.bangType === EBT_LINEAR )
            {
                this.currentValue += this.velocity;

                if( this.startUpTimer.expired() )
                    this.velocity += this.acceleration * highResTimer.elapsedTime;
            }
            // combination of ramp up and linear
            else if( this.bangRange.bangType === EBT_HYBRID )
            {
                this.currentValue += this.velocity;

                if( this.startUpTimer.expired() )
                {
                    if( this.terminalVelocity > this.acceleration )
                    {
                        this.velocity += this.acceleration * highResTimer.elapsedTime;
                        this.acceleration += this.impulse * highResTimer.elapsedTime;
                    }
                    else
                    {
                        this.velocity += this.acceleration * highResTimer.elapsedTime;
                    }
                }
                else
                {
                    this.velocity += this.acceleration * highResTimer.elapsedTime;
                }
            }

            // Only update the meter if the value is different
            if( this.lastValue != this.currentValue )
            {
                this.lastValue = this.currentValue;

                // check if the bang up has finished
                if( this.currentValue > this.targetValue )
                {
                    this.currentValue = this.targetValue;
                    this.bangUp = false;

                    // Prepare the stop script function if one exists
                    this.fontSprite.scriptComponent.prepare( 'stop', this.fontSprite );
                }

                // Display the value in the meter
                this.displayValue();
            }
        }
    }

    //
    //  DESC: Display the value in the meter
    //
    displayValue()
    {
        // Display the new value
        this.fontSprite.visualComponent.createFontString( Math.trunc(this.currentValue).toString() );

        // Get the font size
        this._size = this.fontSprite.visualComponent.getSize();

        // Check if the font string size is greater then what is allowed
        if( (this._size.w > this.maxFontStrSize.w) || (this._size.h > this.maxFontStrSize.h) )
        {
            this._difW = this.maxFontStrSize.w / this._size.w;
            this._difH = this.maxFontStrSize.h / this._size.h;

            // Is the difference less then the last size change
            if( (this._difW < this.bangScaleAdjustment.w) || (this._difH < this.bangScaleAdjustment.h) )
            {
                this.bangScaleAdjustment.set( this._difW, this._difH );

                this._scaleX = this.fontSprite.scale.x;
                this._scaleY = this.fontSprite.scale.y;
                if( this._difW < this._difH )
                {
                    this._scaleX = this._difW;
                    
                    if( this.scaleType !== EST_AXIS )
                        this._scaleY = this._difW;
                }
                else
                {
                    this._scaleY = this._difH;
                    
                    if( this.scaleType !== EST_AXIS )
                        this._scaleX = this._difH;
                }

                this.fontSprite.setScaleXYZ( this._scaleX, this._scaleY );
            }
        }
    }

    //
    //  DESC: Clear the meter
    //
    clear()
    {
        this.lastValue = this.currentValue = this.targetValue = 0;
        this.bangUp = false;
        
        if( !this.fontSprite.scriptComponent.prepare( 'clear', this.fontSprite ) )
            this.fontSprite.visualComponent.createFontString( this.currentValue.toString() );
    }
    
    //
    //  DESC: Is the meter banging
    //
    isBanging()
    {
        return this.bangUp;
    }
}
