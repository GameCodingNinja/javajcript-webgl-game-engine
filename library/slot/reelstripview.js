
// 
//  FILE NAME: reelstripview.js
//  DESC:      Reel strip view
//

"use strict";

import { SlotStripView } from './slotstripview';
import { Timer } from '../utilities/timer';
import { SpinProfile } from './spinprofile';
import { Symbol2d } from './symbol2d';
import { Sprite2D } from '../2d/sprite2d';
import { Point } from '../common/point';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { highResTimer } from '../utilities/highresolutiontimer';
import { soundManager } from '../managers/soundmanager';
import { eventManager } from '../managers/eventmanager';
import { gl } from '../system/device';
import * as slotDefs from './slotdefs';

export class ReelStripView extends SlotStripView
{
    constructor( slotStripModel, symbolSetView, id )
    {
        super( id );
        
        // Spin state callback
        this.spinStateCallback = null;

        // Reel strip model
        this.slotStripModel = slotStripModel;
        
        // Symbol set view
        this.symbolSetView = symbolSetView;

        // Number of visible symbols that are evaluated on this reel
        this.visibleSymbCount = slotStripModel.evalSymbIndexAry.length;

        // Number of buffer symbols
        this.bufferSymbols = 0;

        // Spin direction
        this.spinDir = slotDefs.ESD_DOWN;

        // Active display symbols
        this.symbolAry = [];

        // Symbol offsets
        this.symPosAry = [];

        // stencil mask sprite
        this.stencilMaskSprite;

        // sprite array
        this.spriteAry = [];

        // spin the reel
        this.spinReel = false;

        // spin distance
        this.spinDistance = 0;

        // Velocity of the spin
        this.velocity = 0;

        // Acceleration
        this.acceleration = 0;

        // Spin direction vector
        this.spinDirVector = -1;

        // Spin distance of the size of a symbol
        this.spinSymbDist = 0;

        // Stop for getting then next math symbol to spin
        this.spinStop = 0;

        // Close symbol alignment
        this.symbAlign = false;

        // Symbol alignment counter
        this.symbAlignCounter = 0;

        // Spin state
        this.spinState = slotDefs.ESS_STOPPED;

        // Spin Profile
        this.spinProfile = new SpinProfile;

        // Flag to disable spin timer
        this.disableSpinTimer = false;

        // Pointer to spin stop sound
        this.spinStopSnd = null;

        // Do we allow stop sounds
        this.allowStopSounds = true;
        
        // spin timer
        this.spinTimer = new Timer;
        // Set the value returned by Expired when the timer is disabled
        this.spinTimer.setDisableValue( true );
        
        // Gaff offset to current stop
        this.gaffOffset = 0;
    }
    
    //
    //  DESC: Create the reel strip from data node
    //
    create( node, group )
    {
        // Get the number of buffer symbols
        this.bufferSymbols = Number(node.getAttribute( 'bufferSymbols' ));

        // Get the size of the symbol
        let symbolSizeW = Number(node.getAttribute( 'symbolWidth' ));
        let symbolSizeH = Number(node.getAttribute( 'symbolHeight' ));
        
        // Calculate the size of this reel strip
        if( this.spinDir < slotDefs.ESD_LEFT )
            this.size.set( symbolSizeW, symbolSizeH * this.visibleSymbCount );
        else
            this.size.set( symbolSizeW * this.visibleSymbCount, symbolSizeH );

        // Get the spin direction and set the spin direction vector
        this.spinDir = Number(node.getAttribute( 'spinDirection' ));
        this.spinSymbDist = symbolSizeH;

        if( (this.spinDir === slotDefs.ESD_UP) || (this.spinDir === slotDefs.ESD_RIGHT)  )
            this.spinDirVector = 1;

        if( this.spinDir >= slotDefs.ESD_LEFT )
            this.spinSymbDist = symbolSizeW;

        // Load the transform data from node
        this.loadTransFromNode( node );

        // Get the stencil mask object name
        let stencilMaskNode = node.getElementsByTagName( 'stencilMask' );
        if( stencilMaskNode.length )
        {
            let objectName = stencilMaskNode[0].getAttribute( 'objectName' );

            // Allocate the stencil
            this.stencilMaskSprite = new Sprite2D( objectDataManager.getData( group, objectName ) );

            // Load the transform data
            this.stencilMaskSprite.load( stencilMaskNode[0] );
        }

        // Get the sprite list if any
        let spriteLstNode = node.getElementsByTagName( 'spriteList' );
        if( spriteLstNode.length )
        {
            let spriteNode = spriteLstNode[0].children;
            for( let i = 0; i < spriteNode.length; ++i )
            {
                // Get the type of object
                let objectName = spriteNode[i].getAttribute( 'objectName' );

                let sprite = new Sprite2D( objectDataManager.getData( group, objectName ) );
                this.spriteAry.push( sprite );

                // Load the transform data
                sprite.load( spriteNode[i] );
            }
        }

        // Get the sprite list if any
        let stopSoundNode = node.getElementsByTagName( 'stopSound' );
        if( stopSoundNode.length )
        {
            let group = stopSoundNode[0].getAttribute( 'group' );
            let soundId = stopSoundNode[0].getAttribute( 'soundId' );

            this.spinStopSnd = soundManager.getSound( group, soundId );
        }
        
        // Init the reel strip with symbols
        this.initReelStrip();
    }

    //
    //  DESC: Init the reel strip with symbols
    //
    initReelStrip()
    {
        let totalSymbols = this.visibleSymbCount + (this.bufferSymbols * 2);
        let offset = (((totalSymbols - 1) * this.spinSymbDist) / 2);
        
        // Check that all the symbols on the reel strips have a visual symbol partner
        let mathStripAry = this.slotStripModel.mathStripAry;
        for( let i = 0; i < mathStripAry.length; ++i )
            this.symbolSetView.getSymbol( mathStripAry[i].mathSymbol.id );

        for( let i = 0; i < totalSymbols; ++i )
        {
            // Push it into the deque and set it's position
            // Get the current stop minus the buffer symbols because we render from top to bottom
            this.symbolAry.push( this.getSymbol( this.slotStripModel.lastStop - this.bufferSymbols + i ) );

            // Are we spinning up/down or left/right?
            if( this.spinDir <= slotDefs.ESD_DOWN )
                this.symPosAry.push( new Point( 0, -(i * this.spinSymbDist) + offset ) );
            else
                this.symPosAry.push( new Point( -offset + (i * this.spinSymbDist), 0 ) );
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        // init the sprites
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a font or physics.
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    //
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        if( this.isPointInStrip( eventManager.mouseAbsolutePos.x, eventManager.mouseAbsolutePos.y ) )
        {
            if( this.spinDir < slotDefs.ESD_LEFT )
            {
                if( eventManager.mouseAbsolutePos.y < this.collisionCenter.y )
                    this.gaffOffset++;
                else
                    this.gaffOffset--;
            }
            else
            {
                if( eventManager.mouseAbsolutePos.x < this.collisionCenter.x )
                    this.gaffOffset--;
                else
                    this.gaffOffset++;
            }
            
            this.gaffSymbolPos();
        }
    }
    
    //
    //  DESC: Get the symbol from the reel strip offset
    //
    gaffSymbolPos()
    {
        this.slotStripModel.setGaffStop( this.gaffOffset );
        
        // Reset the position and the symbols of the strip
        for( let i = 0; i < this.symPosAry.length; ++i )
            this.symbolAry[i] = this.getSymbol( this.slotStripModel.gaffStop - this.bufferSymbols + i );
    }
        
    //
    //  DESC: Get the symbol from the reel strip offset
    //
    getSymbol( stop )
    {
        // Get the math symbol
        let mathSymb = this.slotStripModel.getSymbol( stop );

        return this.symbolSetView.getSymbol( mathSymb.id );
    }
    
    //
    //  DESC: Get the cycle result symbol for this spot on the reel strip
    //        NOTE: Index assumes visible symbol that can animate
    //
    getCycleResultSymbol( index )
    {
        // Get the current symbol ID
        let symbId = this.symbolAry[this.bufferSymbols + index].id;

        // allocate a new symbol for the cycle results
        // NOTE: Recipient of this pointer is responsible for deleting it
        let symbol = new Symbol2d( this.symbolSetView.getSpriteData( symbId ), symbId );

        // Replace the current symbol reference with the allocated one
        this.symbolAry[this.bufferSymbols + index] = symbol;

        return symbol;
    }

    //
    //  DESC: Set the spin profile
    //
    setSpinProfile( spinProfile )
    {
        this.spinProfile.copy( spinProfile );
    }

    //
    //  DESC: Update the reel strip
    //
    update()
    {
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].update();
        
        if( this.spinReel )
        {
            switch( this.spinState )
            {
                // Do the spin init and let it fall through to start the spin
                case slotDefs.ESS_STOPPED:
                {
                    this.spinStop = this.slotStripModel.lastStop;

                    // Set the spin stop to the current stop with offset adjustments
                    if( (this.spinDir === slotDefs.ESD_DOWN) || (this.spinDir === slotDefs.ESD_RIGHT) )
                        this.spinStop -= this.bufferSymbols;
                    else
                        this.spinStop += this.visibleSymbCount + this.bufferSymbols;

                    this.velocity = 0.0;
                    this.acceleration = this.spinProfile.accelation;
                    this.spinTimer.set( this.spinProfile.startDelay );
                    this.spinState = slotDefs.ESS_SPIN_STARTING;
                    this.gaffOffset = 0;
                }

                case slotDefs.ESS_SPIN_STARTING:
                {
                    if( this.spinTimer.expired() )
                    {
                        // Increment the velocity and accelation
                        let elapsedTime = highResTimer.elapsedTime;
                        this.velocity += this.acceleration * elapsedTime;
                        this.acceleration += this.spinProfile.impulse * elapsedTime;

                        // Cap the velocity at the max speed
                        if( this.velocity >= this.spinProfile.maxVelocity )
                        {
                            this.velocity = this.spinProfile.maxVelocity;
                            this.spinTimer.set( this.spinProfile.maxVelocityTime );
                            this.spinState = slotDefs.ESS_SPINNING;
                        }

                        this.incSpin( this.velocity );
                    }

                    break;
                }

                case slotDefs.ESS_SPINNING:
                {
                    this.incSpin( this.velocity );

                    // Disable the timer if fast stop is needed
                    this.spinTimer.disable( this.disableSpinTimer );

                    // Wait for the spin to expire
                    if( this.spinTimer.expired() && this.symbAlign )
                    {
                        // Set the new stop to start splicing at the end of the rendered strip
                        this.spinStop = this.slotStripModel.stop;

                        // Set the spin stop to the current stop with offset adjustments
                        if( (this.spinDir === slotDefs.ESD_DOWN) || (this.spinDir === slotDefs.ESD_RIGHT) )
                            this.spinStop += this.visibleSymbCount + this.bufferSymbols;
                        else
                            this.spinStop -= this.bufferSymbols + 1;

                        this.symbAlignCounter = 0;
                        
                        this.spinState = slotDefs.ESS_PREPARE_TO_STOP;
                    }

                    break;
                }

                case slotDefs.ESS_PREPARE_TO_STOP:
                {
                    this.incSpin( this.velocity );

                    if( this.symbAlign )
                    {
                        // Wait for all but the last symbol to get into place
                        if( ++this.symbAlignCounter >= (this.visibleSymbCount + (this.bufferSymbols * 2) - 1) )
                        {
                            // Set a negative accelation slow down the spin to slightly pass that last symbol and cause a bounce up into position
                            this.acceleration = -(this.spinProfile.maxVelocity / (this.spinSymbDist + this.spinProfile.bounceCorrection));

                            // Set the spin timer as an eror catch for the next state
                            this.spinTimer.set( this.spinProfile.timeOutDelay );

                            this.spinState = slotDefs.ESS_SPIN_STOPPING;
                        }
                    }

                    break;
                }

                case slotDefs.ESS_SPIN_STOPPING:
                {  
                    let elapsedTime = highResTimer.elapsedTime;
                    this.velocity += this.acceleration * elapsedTime;

                    // Add in the drag but keep it from turning the value positive
                    let drag = this.spinProfile.bounceDrag * elapsedTime;
                    if( (this.acceleration + drag) < -0.0 )
                        this.acceleration += drag;

                    // Once spin distance goes negative, we are coming back from the bounce.
                    // Spin has completed. This will also catch errors
                    // The spin timer here is also used as safty valve in the event of an error
                    // to force the reel to stop
                    if( (this.spinDistance < 0.0) || this.spinTimer.expired() )
                    {
                        // Stop the spin
                        this.velocity = 0.0;
                        this.spinReel = false;
                        this.disableSpinTimer = false;

                        // Hard set the final position of the symbols
                        this.finalizeSymbPos();

                        this.spinState = slotDefs.ESS_STOPPED;

                        // Send the signal of the spin state
                        if( this.spinStateCallback )
                            for( let i = 0; i < this.spinStateSignal.length; ++i )
                                this.spinStateSignal[i](this.reelId, slotDefs.ESS_STOPPED);

                        if( this.allowStopSounds && this.spinStopSnd )
                            this.spinStopSnd.play();

                        break;
                    }

                    this.incSpin( this.velocity );

                    break;
                }
            }
        }
    }

    //
    //  DESC: Inc the reel spin
    //
    incSpin( velocity )
    {
        // Get the distance traveled
        let dist = velocity * highResTimer.elapsedTime;

        // Are we spinning up/down or left/right?
        if( this.spinDir <= slotDefs.ESD_DOWN )
        {
            // Increment the position of all the symbols
            for( let i = 0; i < this.symPosAry.length; ++i )
                this.symPosAry[i].incXYZ( 0, dist * this.spinDirVector );
        }
        else
        {
            // Increment the position of all the symbols
            for( let i = 0; i < this.symPosAry.length; ++i )
                this.symPosAry[i].incXYZ( dist * this.spinDirVector );
        }

        // Inc for distance checking
        this.spinDistance += dist;

        // Clear the alignment flag
        this.symbAlign = false;

        if( this.spinDistance >= this.spinSymbDist )
        {
            // Get the new symbol and set it's position
            if( this.spinDir <= slotDefs.ESD_DOWN )
            {
                this.spinStop += this.spinDirVector;
            }
            else
            {
                this.spinStop -= this.spinDirVector;
            }
            
            dist = this.spinSymbDist;

            let symbol = this.getSymbol( this.spinStop );

            // Pop the old symbol and push the new one on based on the way it's spinning
            // Invert the spin direction vector to set the offset of the new symbol
            if( (this.spinDir === slotDefs.ESD_DOWN) || (this.spinDir === slotDefs.ESD_RIGHT) )
            {
                this.symbolAry.pop();
                this.symbolAry.unshift( symbol );
                
                let symPos = this.symPosAry.pop();
                
                if( this.spinDir <= slotDefs.ESD_DOWN )
                    symPos.y = this.symPosAry[0].y + (dist * -this.spinDirVector);
                else
                    symPos.x = this.symPosAry[0].x + (dist * -this.spinDirVector);
                    
                this.symPosAry.unshift( symPos );
            }
            else
            {
                this.symbolAry.shift();
                this.symbolAry.push( symbol );
                
                let symPos = this.symPosAry.shift();
                
                if( this.spinDir <= slotDefs.ESD_DOWN )
                    symPos.y = this.symPosAry[this.symPosAry.length-1].y + (dist * -this.spinDirVector);
                else
                    symPos.x = this.symPosAry[this.symPosAry.length-1].x + (dist * -this.spinDirVector);
                
                this.symPosAry.push( symPos );
            }

            // Reset the spin distance with the remainder
            this.spinDistance -= this.spinSymbDist;

            // Set the flag that indicates the reel is close to alignment
            // and a symbol was pushed on and popped off.
            this.symbAlign = true;
        }
    }

    //
    //  DESC: Hard set the final position of the symbols
    //
    finalizeSymbPos()
    {
        let offset = (((this.symPosAry.length - 1) * this.spinSymbDist) / 2);

        // Reset the position and the symbols of the strip
        for( let i = 0; i < this.symPosAry.length; ++i )
        {
            this.symbolAry[i] = this.getSymbol( this.slotStripModel.stop - this.bufferSymbols + i );

            // Are we spinning up/down or left/right?
            if( this.spinDir <= slotDefs.ESD_DOWN )
                this.symPosAry[i].setXYZ( 0, -(i * this.spinSymbDist) + offset );
            else
                this.symPosAry[i].setXYZ( -offset + (i * this.spinSymbDist) );
        }
    }

    //
    //  DESC: Transform the reel strip
    //
    transform( matrix, tranformWorldPos )
    {
        super.transform( matrix, tranformWorldPos );

        // Transform the mask
        this.stencilMaskSprite.transform( this.matrix, this.wasWorldPosTranformed() );

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
        
        // Transform the collision
        this.transformCollision();
    }

    //
    //  DESC: do the render
    //
    render( matrix )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );

        // Disable rendering to the color buffer
        // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
        gl.colorMask( false, false, false, false );

        // Disable rendering to the depth mask
        gl.depthMask( false );

        // Start using the stencil
        gl.enable( gl.STENCIL_TEST );

        gl.stencilFunc( gl.ALWAYS, 0x1, 0x1 );
        gl.stencilOp( gl.REPLACE, gl.REPLACE, gl.REPLACE );


        this.stencilMaskSprite.render( matrix );


        // Re-enable color
        // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
        gl.colorMask( true, true, true, true );

        // Where a 1 was not rendered
        gl.stencilFunc( gl.EQUAL, 0x1, 0x1 );

        // Keep the pixel
        gl.stencilOp( gl.KEEP, gl.KEEP, gl.KEEP );

        // Enable rendering to the depth mask
        gl.depthMask( true );

        
        for( let i = 0; i < this.symbolAry.length; ++i )
        {
            if( !this.symbolAry[i].deferredRender )
            {
                this.symbolAry[i].setPos( this.symPosAry[i] );
                this.symbolAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
                this.symbolAry[i].render( matrix );
            }
        }
        

        // Finished using stencil
        gl.disable( gl.STENCIL_TEST );
    }
    
    //
    //  DESC: do the deferred render. Used for the winning cycle result symbols
    //
    deferredRender( matrix )
    {
        if( this.spinState === slotDefs.ESS_STOPPED )
        {
            for( let i = 0; i < this.symbolAry.length; ++i )
            {
                if( this.symbolAry[i].deferredRender )
                {
                    this.symbolAry[i].setPos( this.symPosAry[i] );
                    this.symbolAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
                    this.symbolAry[i].render( matrix );
                }
            }
        }
    }

    //
    //  DESC: Start the spin
    //
    startSpin()
    {
        this.spinReel = true;
    }

    //
    //  DESC: Stop the spin
    //
    stopSpin()
    {
        if( this.spinReel && this.spinState < slotDefs.ESS_PREPARE_TO_STOP )
            this.disableSpinTimer = true;
    }

    //
    //  DESC: Connect to the spin state callback
    //
    connect_SpinState( callback )
    {
        if( this.spinStateCallback === null )
            this.spinStateCallback = [];
        
        this.spinStateCallback.push( callback );
    }

    //
    //  DESC: Do we allow the stop sounds?
    //
    allowStopSounds( allow )
    {
        this.allowStopSounds = allow;
    }
}
