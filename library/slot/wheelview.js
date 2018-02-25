
// 
//  FILE NAME: wheelview.js
//  DESC:      View class for the wheel implementation
//             NOTE: Even though this is a wheel class and wheels have wedges, we're 
//                   using the Symbol2D as the wedge because it does the same thing.
//

"use strict";

import { SlotStripView } from './slotstripview';
import { Sprite2D } from '../2d/sprite2d';
import { Symbol2d } from '../slot/symbol2d';
import { SpinProfile } from './spinprofile';
import { Timer } from '../utilities/timer';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { highResTimer } from '../utilities/highresolutiontimer';
import { eventManager } from '../managers/eventmanager';
import * as slotDefs from './slotdefs';
import * as defs from '../common/defs';
import * as parseHelper from '../utilities/xmlparsehelper';

export class WheelView extends SlotStripView
{
    constructor( slotStripModel, symbolSetView, id )
    {
        super( id );
        
        // Spin state callback
        this.spinStateCallback = null;
        
        // Slot strip model
        this.slotStripModel = slotStripModel;
        
        // Symbol set view
        this.symbolSetView = symbolSetView;
        
        // The degrees per math wedge
        this.degreePerWedge = (Math.PI * 2) / slotStripModel.mathStripAry.length;
        this.saftyCheckDegree = 0;

        // sprite array
        this.spriteAry = [];
        
        // sprite array
        this.wheelSpriteAry = [];
        
        // symbol array
        this.symbolAry = [];
        
        // Spin direction
        this.spinDir = slotDefs.EDS_CLOCKWISE;
        
        // Spin Profile
        this.spinProfile = new SpinProfile;
        
        // spin the wheel
        this.spinWheel = false;
        
        // Spin state
        this.spinState = slotDefs.ESS_STOPPED;
        
        // Velocity of the spin
        this.velocity = 0;

        // Acceleration
        this.acceleration = 0;

        // Spin direction vector
        this.spinDirVector = -1;
        
        // Flag to disable spin timer
        this.disableSpinTimer = false;
        
        // spin timer
        this.spinTimer = new Timer;
        
        // Set the value returned by Expired when the timer is disabled
        this.spinTimer.setDisableValue( true );
        
        // The win point on the wheel
        this.winPointDegree;
        
        // The rotation amount that includes correction
        this.rotation = 0;
        
        // The extended rotation to hold a value greater then PI_2
        // This is needed for zero stop win rotation checks
        this.extRotation = 0;
        
        // Rotational distance to stop
        this.distToStop = 0;
        
        // last velocity to insure a negative velocity is never used
        this.lastVelocity = 0;
        
        // Max/Min range to stop rotation
        this.maxRangeToStop = 0;
        this.minRangeToStop = 0;
        
        // Flag to indicate inrange to stop
        this.inRangeToStop = false;
        
        // 360 degrees in radians
        this.PI_2 = Math.PI * 2;
        
        // Gaff offset to current stop
        this.gaffOffset = 0;
        
        // Gaff spin direction vector
        this.gaffSpinDirVector = -1;
    }
    
    //
    //  DESC: Create the wheel view from data node
    //
    create( node, group )
    {
        // Load the transform data from node
        let attr = node.getElementsByTagName( 'translation' );
        if( attr )
        {
            this.loadTransFromNode( attr[0] );
            
            // Try to load a size used for wheel gaffing
            this.size = parseHelper.loadSize( attr[0] );
        }
        
        // Set the spin direction
        attr = node.getAttribute( 'spinDirection' );
        if( attr && (Number( attr ) === slotDefs.EDS_COUNTERCLOCKWISE) )
        {
            this.spinDir = slotDefs.EDS_COUNTERCLOCKWISE;
            this.spinDirVector = 1;
        }
        
        // Load the wheel sprites from node
        this.loadWheelSprites( node, group );
        
        // Load the wheel wedges from node
        this.loadWedges( node, group );
        
        // Load the sprites from node. These are sprites that don't spin with the wheel
        this.loadSprites( node, group );
    }
    
    // 
    //  DESC: Load the wheel sprites from node.
    //        NOTE: These sprites spin with the wheel
    //
    loadWheelSprites( node, group )
    {
        let wheelSpriteLstNode = node.getElementsByTagName( 'wheelSpriteList' );
        if( wheelSpriteLstNode.length )
        {
            let spriteNode = wheelSpriteLstNode[0].getElementsByTagName( 'sprite' );
            
            for( let i = 0; i < spriteNode.length; ++i )
            {
                let objName = spriteNode[i].getAttribute( 'objectName' );
                if( !objName )
                    throw new Error( `Wheel sprite object name missing (${group})!` );
                
                // Allocate the sprite and add it to the array
                let sprite = new Sprite2D( objectDataManager.getData( group, objName ) );
                this.wheelSpriteAry.push( sprite );
                
                // Load the transform data from node
                sprite.loadTransFromNode( spriteNode[i] );
            }
        }
    }
    
    // 
    //  DESC: Load the wheel wedges from node
    //
    loadWedges( node, group )
    {
        let wedgeNode = node.getElementsByTagName( 'wedge' );
        
        for( let i = 0; i < wedgeNode.length; ++i )
        {
            let symbId = wedgeNode[i].getAttribute( 'symb' );
            
            // Symbol, wedge, it's all the same thing... a container for sprites
            let symbol = new Symbol2d( this.symbolSetView.getSpriteData( symbId ), symbId );
            symbol.loadTransFromNode( wedgeNode[i] );
            
            this.symbolAry.push( symbol );
        }
    }
    
    // 
    //  DESC: Load the sprites from node.
    //        NOTE: These are sprites that don't spin with the wheel
    //
    loadSprites( node, group )
    {
        let spriteLstNode = node.getElementsByTagName( 'nonRotateSpriteList' );
        if( spriteLstNode.length )
        {
            let spriteNode = spriteLstNode[0].getElementsByTagName( 'sprite' );
            
            for( let i = 0; i < spriteNode.length; ++i )
            {
                let objName;
                let attr = spriteNode[i].getAttribute( 'objectName' );
                if( attr )
                    objName = attr;
                
                // Allocate the sprite and add it to the array
                let sprite = new Sprite2D( objectDataManager.getData( group, objName ) );
                this.spriteAry.push( sprite );
                
                // Load the transform data from node
                sprite.loadTransFromNode( spriteNode[i] );
            }
        }
    }
    
    //
    //  DESC: Do a one time transform of the non-rotating sprites
    //
    preTransform()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
    }
    
    // 
    //  DESC: Init the sprite
    //
    init()
    {
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].init();
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].init();
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].cleanUp();
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].cleanUp();
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    //
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        if( this.isPointInStrip( eventManager.mouseX, eventManager.mouseY ) )
        {
            if( eventManager.mouseY < this.collisionCenter.y )
                this.gaffOffset++;
            else
                this.gaffOffset--;

            this.gaffWheelPos();
        }
    }
    
    //
    //  DESC: Get the symbol from the reel strip offset
    //
    gaffWheelPos()
    {
        this.slotStripModel.setGaffStop( this.gaffOffset );
        
        this.rotation = this.degreePerWedge * this.slotStripModel.gaffStop;
        
        if( this.spinDir === slotDefs.EDS_CLOCKWISE )
            this.rotation = this.PI_2 - this.rotation;
        
        // This is needed for zero stop win rotation checks
        this.extRotation = this.rotation;
        
        if( this.rotation >= this.PI_2 )
            this.rotation -= this.PI_2;
        
        this.setRotXYZ( 0, 0, this.rotation * this.spinDirVector, false );
    }
    
    //
    //  DESC: Get the symbol from the reel strip offset
    //
    getSymbol( index )
    {
        let stop = this.slotStripModel.stop + index;
        
        // Are the number of visual and math symbols equil?
        if( this.symbolAry.length === this.slotStripModel.mathStripAry.length )
        {
            let index = this.slotStripModel.getSymbolIndex( stop );

            return this.symbolAry[index];
        }

        // TODO: Need to handle this condition of unmatched math and visual symbol counts
        return this.symbolAry[0];
    }
    
    //
    //  DESC: Set the spin profile
    //
    setSpinProfile( spinProfile )
    {
        this.spinProfile.copy( spinProfile );
    }
    
    // 
    //  DESC: React to what the player is doing
    //
    update()
    {
        if( this.spinWheel )
        {
            switch( this.spinState )
            {
                // Do the spin init and let it fall through to start the spin
                case slotDefs.ESS_STOPPED:
                {
                    if( this.spinDir === slotDefs.EDS_CLOCKWISE )
                        this.winPointDegree = this.PI_2 - (this.degreePerWedge * this.slotStripModel.stop);
                    else
                    {
                        // Special condition for stop zero checks
                        if( this.slotStripModel.stop === 0 )
                            this.winPointDegree = this.PI_2;
                        else
                            this.winPointDegree = this.degreePerWedge * this.slotStripModel.stop;
                    }

                    this.velocity = 0.0;
                    this.acceleration = this.spinProfile.accelation;
                    this.saftyCheckDegree = this.degreePerWedge / this.spinProfile.safetyCheckDivisor;
                    this.spinTimer.set( this.spinProfile.startDelay );
                    this.spinState = slotDefs.ESS_SPIN_STARTING;
                    this.gaffOffset = 0;
                    this.inRangeToStop = false;
                }

                case slotDefs.ESS_SPIN_STARTING:
                {
                    if( this.spinTimer.expired() )
                    {
                        // Increment the velocity and acceleration
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

                    // Wait for the spin to expire and the rotation to be less then the win point degree
                    if( this.spinTimer.expired() && (this.rotation < this.winPointDegree) )
                        this.spinState = slotDefs.ESS_PREPARE_TO_STOP;

                    break;
                }

                case slotDefs.ESS_PREPARE_TO_STOP:
                {
                    this.incSpin( this.velocity );
                    
                    // Wait for the unadjusted rotation to exceed the win point to start slowing down
                    // extRotation is needed for zero stop win rotation checks
                    if( this.extRotation > this.winPointDegree )
                    {
                        // A velocity(4) / PI is the exact deceleration to slow down within 1 rotation
                        let vel = this.spinProfile.maxVelocity * 1000.0;
                        this.acceleration = 
                            (this.velocity / ((Math.PI * (4.0 / vel)) * this.spinProfile.decelerationRotationCount)) / 1000.0;

                        // Calculate the rotation distance to stop
                        this.distToStop = (this.PI_2 * this.spinProfile.decelerationRotationCount) - (this.extRotation - this.winPointDegree);
                        
                        this.maxRangeToStop = this.winPointDegree + this.saftyCheckDegree;
                        this.minRangeToStop = this.winPointDegree - this.saftyCheckDegree;

                        this.spinState = slotDefs.ESS_SPIN_STOPPING;
                    }

                    break;
                }

                case slotDefs.ESS_SPIN_STOPPING:
                {
                    // Decrement the velocity and accelation
                    this.velocity -= this.acceleration * highResTimer.elapsedTime;
                    
                    // Only use the last known positive velocity.
                    // This insures we don't start spinning in the opposite direction
                    if( this.velocity > 0.0 )
                        this.lastVelocity = this.velocity
                    
                    // Decrement the distance checker
                    this.distToStop -= this.lastVelocity * highResTimer.elapsedTime;
                    
                    let timeToStop = false;
                    
                    // Check if it is time to stop
                    if( (this.distToStop < 0.0) || (this.velocity < 0.0) )
                    {
                        // Calculate the future position of the wheel
                        let futureRotation = this.rotation + (this.lastVelocity * highResTimer.elapsedTime);
                        
                        // There's a special case for zero stop
                        // The min and max range need to be a moving target because the future
                        // rotation can be greater then PI_2 or 0
                        if( this.slotStripModel.stop === 0 )
                        {
                            if( futureRotation > Math.PI )
                            {
                                this.maxRangeToStop = this.PI_2 + this.saftyCheckDegree;
                                this.minRangeToStop = this.PI_2 - this.saftyCheckDegree;
                            }
                            else
                            {
                                this.maxRangeToStop = this.saftyCheckDegree;
                                this.minRangeToStop = 0;
                            }
                        }
                        
                        // Set the flag once we are in range
                        if( !this.inRangeToStop && (futureRotation > this.minRangeToStop) && (futureRotation < this.maxRangeToStop) )
                            this.inRangeToStop = true;
                        
                        // When in range, check to see if we need to stop
                        if( this.inRangeToStop )
                        {
                            if( (this.velocity < 0.0) ||
                                (futureRotation < this.minRangeToStop) ||
                                (futureRotation > this.maxRangeToStop) )
                            {
                                timeToStop = true;
                                
                                /*if( (futureRotation < this.minRangeToStop) || (futureRotation > this.maxRangeToStop) )
                                    console.log(this.id, 'exceeding range', futureRotation, this.minRangeToStop, this.maxRangeToStop);
                                else
                                    console.log(this.id, 'velocity < 0.0', futureRotation, this.minRangeToStop, this.maxRangeToStop);*/
                            }
                        }
                    }
                    
                    if( timeToStop )
                    {
                        // Stop the spin
                        this.velocity = 0.0;
                        this.lastVelocity = 0.0
                        this.distToStop = 0.0
                        this.spinWheel = false;
                        this.disableSpinTimer = false;

                        this.spinState = slotDefs.ESS_STOPPED;

                        // Send the signal of the spin state
                        if( this.spinStateCallback )
                            for( let i = 0; i < this.spinStateSignal.length; ++i )
                                this.spinStateSignal[i](this.reelId, slotDefs.ESS_STOPPED);

                        break;
                    }

                    this.incSpin( this.lastVelocity );

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
        // Get the rotation traveled
        this.rotation += velocity * highResTimer.elapsedTime;
        
        // This is needed for zero stop win rotation checks
        this.extRotation = this.rotation;
        
        if( this.rotation >= this.PI_2 )
            this.rotation -= this.PI_2;
        
        this.setRotXYZ( 0, 0, this.rotation * this.spinDirVector, false );
    }
    
    //
    //  DESC: Transform
    //
    transform( matrix, tranformWorldPos )
    {
        super.transform( matrix, tranformWorldPos );
        
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
        
        // Transform the collision
        this.transformCollision();
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].render( matrix );
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].render( matrix );
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );
    }
    
    //
    //  DESC: Do the deferred render. Used for the winning cycle result symbols
    //
    deferredRender( matrix )
    {
        
    }
    
    //
    //  DESC: Start the spin
    //
    startSpin()
    {
        this.spinWheel = true;
    }

    //
    //  DESC: Stop the spin
    //
    stopSpin()
    {
        if( this.spinWheel && this.spinState < slotDefs.ESS_PREPARE_TO_STOP )
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

