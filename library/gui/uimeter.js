
// 
//  FILE NAME: uimeter.js
//  DESC:      Class for user interface meters
//

"use strict";

import { Timer } from '../utilities/timer';
import { highResTimer } from '../utilities/highresolutiontimer';
import { Size } from '../common/size';
import { UIControl } from './uicontrol';
import * as defs from '../common/defs';
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
        
        this.type = defs.ECT_METER;
        
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
        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
                this.fontSprite = this.spriteAry[i];
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
        let found = false;

        for( let i = 0; i < this.bangRangeAry.length; ++i )
        {
            if( (this.targetValue - this.currentValue) <= this.bangRangeAry[i].target )
            {
                found = true;
                this.initBangRange( this.bangRangeAry[i] );
                break;
            }
        }

        if( !found )
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

        let range = this.targetValue - this.currentValue;

        // Ramp up from start to finish
        if( bangRange.bangType === EBT_RAMP_UP )
        {
            this.impulse = range / (bangRange.estimatedTime * bangRange.estimatedTime * 1000.0);
            this.acceleration = this.impulse;
        }
        // Linear bang up from the start
        else if( bangRange.bangType === EBT_LINEAR )
        {
            this.acceleration = range / (bangRange.estimatedTime * 1000.0);
        }
        // combination of ramp up and linear
        else if( bangRange.bangType === EBT_HYBRID )
        {
            this.terminalVelocity = range / (bangRange.estimatedTime * 1000.0);
            this.impulse = range / (bangRange.estimatedTime * bangRange.estimatedTime * 500.0);
            this.acceleration = this.impulse;
        }

        // Set the timer to allow the bang-up to start off slowly
        this.startUpTimer.set( bangRange.slowStartTime );

        // Prepare the start script function if one exists
        this.fontSprite.prepareScript( 'start' );
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
            let elapsedTime = highResTimer.elapsedTime;

            // Ramp up from start to finish
            if( this.bangRange.bangType === EBT_RAMP_UP )
            {
                this.currentValue += this.velocity * elapsedTime;

                if( this.startUpTimer.expired() )
                {
                    this.velocity += this.acceleration * elapsedTime;
                    this.acceleration += this.impulse * elapsedTime;
                }
                else
                {
                    this.velocity += this.acceleration * elapsedTime;
                }
            }
            // Linear bang up from the start
            else if( this.bangRange.bangType === EBT_LINEAR )
            {
                this.currentValue += this.velocity;

                if( this.startUpTimer.expired() )
                    this.velocity += this.acceleration * elapsedTime;
            }
            // combination of ramp up and linear
            else if( this.bangRange.bangType === EBT_HYBRID )
            {
                this.currentValue += this.velocity;

                if( this.startUpTimer.expired() )
                {
                    if( this.terminalVelocity > this.acceleration )
                    {
                        this.velocity += this.acceleration * elapsedTime;
                        this.acceleration += this.impulse * elapsedTime;
                    }
                    else
                    {
                        this.velocity += this.acceleration * elapsedTime;
                    }
                }
                else
                {
                    this.velocity += this.acceleration * elapsedTime;
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
                    this.fontSprite.prepareScript( 'stop' );
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
        let size = this.fontSprite.visualComponent.getFontSize();

        // Check if the font string size is greater then what is allowed
        if( (size.w > this.maxFontStrSize.w) || (size.h > this.maxFontStrSize.h) )
        {
            let difW = this.maxFontStrSize.w / size.w;
            let difH = this.maxFontStrSize.h / size.h;

            // Is the difference less then the last size change
            if( (difW < this.bangScaleAdjustment.w) || (difH < this.bangScaleAdjustment.h) )
            {
                this.bangScaleAdjustment.set( difW, difH );

                let scaleX = this.fontSprite.scale.x;
                let scaleY = this.fontSprite.scale.y;
                if( difW < difH )
                {
                    scaleX = difW;
                    
                    if( this.scaleType !== EST_AXIS )
                        scaleY = difW;
                }
                else
                {
                    scaleY = difH;
                    
                    if( this.scaleType !== EST_AXIS )
                        scaleX = difH;
                }

                this.fontSprite.setScaleXYZ( scaleX, scaleY );
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
        
        if( !this.fontSprite.prepareScript( 'clear' ) )
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
