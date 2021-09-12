
// 
//  FILE NAME: spinprofile.js
//  DESC:      Spin profile data
//             Movement is in pixels per second.
//             Time is in milliseconds.
//

"use strict";

import * as slotDefs from './slotdefs';

export class SpinProfile
{
    constructor()
    {
        // Start delay
        this.startDelay = 0;

        // Acceleration
        this.accelation = 0.0004;

        // Impulse
        this.impulse = 0;

        // max velocity
        this.maxVelocity = 2.5;

        // max velocity time
        this.maxVelocityTime = 700;

        // Bounce correction
        this.bounceDrag = 0;

        // Bounce correction
        this.bounceCorrection = 0;

        // Time out delay is used as safty valve in the 
        // event of an error to force the reel to stop
        this.timeOutDelay = 0;
        
        // For a wheel, number of 360 rotations before stopping
        this.decelerationRotationCount = 1;
        
        // For a wheel to divide against the wedge size for max and min safety checks
        this.safetyCheckDivisor = 0;
    }
    
    copy( obj )
    {
        this.startDelay = obj.startDelay;
        this.accelation = obj.accelation;
        this.impulse = obj.impulse;
        this.maxVelocity = obj.maxVelocity;
        this.maxVelocityTime = obj.maxVelocityTime;
        this.bounceDrag = obj.bounceDrag;
        this.bounceCorrection = obj.bounceCorrection;
        this.timeOutDelay = obj.timeOutDelay;
        this.decelerationRotationCount = obj.decelerationRotationCount;
        this.safetyCheckDivisor = obj.safetyCheckDivisor;
    }
    
    //
    //  DESC: Load thes reel strip data from node
    //
    loadFromNode( node )
    {
        // Get the symbols per reel
        let attr = node.getAttribute( 'startDelay' );
        if( attr )
            this.startDelay = Number(attr);

        // Get the acceleration
        attr = node.getAttribute( 'accelation' );
        if( attr )
            this.accelation = Number(attr) / 1000.0;

        // Get the impulse
        attr = node.getAttribute( 'impulse' );
        if( attr )
            this.impulse = Number(attr) / 1000.0;

        // Get the max velocity
        attr = node.getAttribute( 'maxVelocity' );
        if( attr )
            this.maxVelocity = Number(attr) / 1000.0;

        // Get the max speed time
        attr = node.getAttribute( 'maxVelocityTime' );
        if( attr )
            this.maxVelocityTime = Number(attr);

        // Get the bounce drag
        attr = node.getAttribute( 'bounceDrag' );
        if( attr )
            this.bounceDrag = Number(attr) / 1000.0;

        // Get the bounce distance
        attr = node.getAttribute( 'bounceCorrection' );
        if( attr )
            this.bounceCorrection = Number(attr);

        // Get the time out delay
        attr = node.getAttribute( 'timeOutDelay' );
        if( attr )
            this.timeOutDelay = Number(attr);

        // For a wheel, number of 360 rotations before stopping
        attr = node.getAttribute( 'decelerationRotationCount' );
        if( attr )
            this.decelerationRotationCount = Number(attr);
        
        // For a wheel to divide against the wedge size for max and min ssfty checks
        attr = node.getAttribute( 'safetyCheckDivisor' );
        if( attr )
            this.safetyCheckDivisor = Number(attr);
    }
}
