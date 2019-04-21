
// 
//  FILE NAME: physicsworld2d.js
//  DESC:      Wrapper class for Box2D's b2World
//

"use strict";

import { highResTimer } from '../utilities/highresolutiontimer';
import * as genFunc from '../utilities/genfunc';
import * as planck from 'planck-js';

export class PhysicsWorld2D
{
    constructor()
    {
        // Box2D world
        this.world = planck.World();
        
        // All bodies that are handled by this physics world
        this.bodyAry = [];

        // If we're actively running simulations
        this.active = false;

        // If we're going to start a step this frame
        this.beginStep = 0;

        // Timer to let us know when to do another step
        this.timer = 0;

        // The ammount of time to simulate in milliseconds
        this.stepTime = 0;

        // The ammount of time to simulate in Seconds
        this.stepTimeSec = 0;

        // The number of velocity and position steps to calculate
        this.velStepCount = 0;
        this.posStepCount = 0;

        // pixels per meter scaler
        this.pixelsPerMeter = 0;
    }
    
    //
    //  DESC: Load the physics world from XML node
    //
    loadFromNode( node )
    {
        // Get the world's settings, if any are set
        let settingsNode = node.getElementsByTagName( "settings" );
        if( settingsNode.length )
        {
            let attr = settingsNode[0].getAttribute( 'active' );
            if( attr )
                this.active = (attr === 'true');
        }

        // Get the world's gravity, if any are set
        let gravityNode = node.getElementsByTagName( "gravity" );
        if( gravityNode.length )
        {
            let gravity = planck.Vec2(
                Number( gravityNode[0].getAttribute( "x" ) ),
                Number( gravityNode[0].getAttribute( "y" ) ) );

            this.world.setGravity( gravity );
        }

        // Get the stepping which determins how accurate the physics are
        let steppingNode = node.getElementsByTagName( "stepping" );
        if( steppingNode.length )
        {
            this.velStepCount = Number( steppingNode[0].getAttribute( "velocity" ) );
            this.posStepCount = Number( steppingNode[0].getAttribute( "position" ) );

            let fps = Number( steppingNode[0].getAttribute( "fps" ) );

            // If the number is negative, get the current refresh rate
            /*if( fps < 0.0 )
            {
                SDL_DisplayMode dm;
                SDL_GetDesktopDisplayMode(0, &dm);

                if( dm.refresh_rate == 0 )
                    fps = 60.f;
                else
                    fps = dm.refresh_rate;
            }*/

            this.setFPS( fps );
        }

        // Get the conversion of pixels per meter because Box2D works in meters
        let conversionNode = node.getElementsByTagName( "conversion" );
        if( conversionNode.length )
            this.pixelsPerMeter = Number( conversionNode[0].getAttribute( "pixelsPerMeter" ) );
    }
    
    //
    //  DESC: Create a physics body
    //  NOTE: Function should only be called from physics component
    //
    createBody( def )
    {
        let body = this.world.createBody( def );

        if( body === null )
            throw new Error( `Error creating physics body!` );

        this.bodyAry.push( body );

        return body;
    }
    
    //
    //  DESC: Destroy a physics body
    //  NOTE: Function should only be called from physics component
    //
    destroyBody( body )
    {
        let index = this.bodyAry.indexOf( body );

        if( index !== -1 )
        {
            // Destroy the body
            this.world.destroyBody( body );

            // Remove the body from the array
            this.bodyAry.splice( index, 1 );
        }
    }
    
    //
    //  DESC: Perform fixed time step physics simulation
    //
    fixedTimeStep()
    {
        if( this.active )
        {
            // Increment the timer
            this.timer += highResTimer.elapsedTime;

            if( this.timer > this.stepTime )
            {
                this.timer = genFunc.modulus( this.timer, this.stepTime );

                // Begin the physics world step
                this.world.step( this.stepTimeSec, this.velStepCount, this.posStepCount );
            }

            //this.timeRatio = this.timer / this.stepTime;
        }
    }

    //
    //  DESC: Perform variable time step physics simulation
    //
    variableTimeStep()
    {
        if( this.active )
        {
            // Begin the physics world step
            this.world.step( highResTimer.elapsedTime / 1000.0, this.velStepCount, this.posStepCount );
        }
    }
    
    //
    //  DESC: Set the fps to run the simulation at
    //
    setFPS( fps )
    {
        // Make sure we don't have a negative or zero fps
        if( fps > 1.0 )
        {
            // Calculate the step paramaters
            this.stepTimeSec = 1.0 / fps;
            this.stepTime = this.stepTimeSec * 1000.0;

            // Set the timer so that we'll begin a step next time we call Update
            this.timer = this.stepTime;
        }
    }
}
