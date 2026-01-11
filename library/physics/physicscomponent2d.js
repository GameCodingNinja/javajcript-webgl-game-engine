
// 
//  FILE NAME: physicscomponent2d.js
//  DESC:      Class for handling the physics part of the sprite.
//

"use strict";

import { physicsWorldManager } from './physicsworldmanager';
import { Size } from '../common/size';
import { statCounter } from '../utilities/statcounter';
import * as planck from 'planck-js';

export class PhysicsComponent2D
{
    constructor( physicsData )
    {
        // Parent sprite
        this.sprite = null;
                
        // Body type
        this.bodyType = null;

        // The physics body the sprite belongs to
        this.body = null;

        // Pixels to meters conversion
        this.pixelsToMeters = 0;
        this.metersToPixels = 0;

        // Pointer to the world
        this.world = null;
        
        if( physicsData.isActive() )
        {
            this.world = physicsWorldManager.getWorld( physicsData.world );

            // MAke sure the world has been loaded
            if( this.world.pixelsPerMeter == 0 )
                throw new Error( `Physics world not loaded (${physicsData.world})!` );

            // Re-init the constants to the values needed
            this.metersToPixels = this.world.pixelsPerMeter;
            this.pixelsToMeters = 1.0 / this.metersToPixels;
        }
    }
    
    // 
    //  DESC: Init the physics by creating the body and fixture
    //  NOTE: Function must be called externally at the right time
    //        when the sprite has been setup with it's initial offsets
    //
    init( sprite )
    {
        if( this.world !== null )
        {
            this.sprite = sprite;
            this.createBody();
            this.createFixture();
        }
    }
    
    // 
    //  DESC: Create the body
    //
    createBody()
    {
        if( !this.body )
        {
            let physicsData = this.sprite.objData.physicsData;
            let worldDef = {
                type : physicsData.bodyType,
                position : planck.Vec2( this.sprite.pos.x * this.pixelsToMeters, -(this.sprite.pos.y * this.pixelsToMeters) ),
                angle : -this.sprite.rot.z,

                linearVelocity : planck.Vec2.zero(),
                angularVelocity : 0.0,

                linearDamping : physicsData.linearDamping,
                angularDamping : physicsData.angularDamping,

                fixedRotation : physicsData.fixedRotation,
                bullet : false,
                gravityScale : 1.0,

                allowSleep : true,
                awake : true,
                active : true,

                userData : this.sprite };

            // Create the body
            this.body = this.world.createBody( worldDef );
        }
    }

    // 
    //  DESC: Create the fixture
    //
    createFixture()
    {
        let fixtureAry = this.sprite.objData.physicsData.fixtureAry;

        for( let i = 0; i < fixtureAry.length; ++i )
        {
            // Create the fixture
            if( fixtureAry[i].shape === planck.Circle.TYPE )
                this.createCircularShapeFixture( fixtureAry[i] );

            else if( fixtureAry[i].shape === planck.Edge.TYPE )
                this.createEdgeShapeFixture( fixtureAry[i] );

            else if( fixtureAry[i].shape === planck.Polygon.TYPE )
                this.createPolygonShapeFixture( fixtureAry[i] );

            else if( fixtureAry[i].shape === planck.Chain.TYPE )
                this.createChainShapeFixture( fixtureAry[i] );
        }
    }
    
    // 
    //  DESC: Create the circular shape fixture
    //
    getFixtureDef( fixture )
    {
        let fixtureDef = {
            userData : this.sprite,
            friction : fixture.friction,
            restitution : fixture.restitution,
            density : fixture.density,
            isSensor : fixture.sensor,

            filterGroupIndex : 0,
            filterCategoryBits : 0x0001,
            filterMaskBits : 0xFFFF };
        
        return fixtureDef;
    }
    
    // 
    //  DESC: Create the circular shape fixture
    //
    createCircularShapeFixture( fixture )
    {
        this.body.createFixture(
            planck.Circle( (fixture.radius * this.sprite.scale.x) * this.pixelsToMeters ),
            this.getFixtureDef( fixture ) );
    }

    // 
    //  DESC: Create the edge shape fixture
    //  NOTE: An edge is a line segment of two points
    //        This is no different then making a polygon from points
    //
    createEdgeShapeFixture( fixture )
    {
        // Do a sanity check because we need two points to define an edge
        if( fixture.vertAry.length !== 2 )
            throw new Error( `Physics object has incorrect number of points defined (${fixture.vertAry.length})!` );

        // Apply scale to the size and divide by 2
        let size = new Size(
            this.sprite.objData.size.w * this.sprite.scale.x * 0.5,
            this.sprite.objData.size.h * this.sprite.scale.y * 0.5 );

        // Convert the points to world location in meters
        let Vec2Ary = [];
        this.convertPoints( Vec2Ary, fixture, size, this.sprite.scale );

        this.body.createFixture(
            planck.Edge( Vec2Ary[0], Vec2Ary[1] ),
            this.getFixtureDef( fixture ) );
    }

    // 
    //  DESC: Create the polygon shape fixture
    //
    createPolygonShapeFixture( fixture )
    {
        let Vec2Ary = [];

        // Apply scale to the size and divide by 2
        let size = new Size(
            this.sprite.objData.size.w * this.sprite.scale.x * 0.5,
            this.sprite.objData.size.h * this.sprite.scale.y * 0.5 );

        // Is this polygon shape defined by a vector of points?
        if( fixture.vertAry.length )
        {
            // Convert the points to world location in meters
            this.convertPoints( Vec2Ary, fixture, size, this.sprite.scale );
        }
        
        // If vector points are not supplied, build a square based on the object size
        else
        {
            // Bottom and left mod have their signs flipped so that a positive mod always means
            // expansion of the side, and a negative mod always means a contraction of the side
            let topMod = fixture.topMod * this.sprite.scale.y;
            let bottomMod = -fixture.bottomMod * this.sprite.scale.y;
            let leftMod = -fixture.leftMod * this.sprite.scale.x;
            let rightMod = fixture.rightMod * this.sprite.scale.x;

            // Convert to meters
            // Box2D polygons are defined using Counter Clockwise Winding (CCW)
            Vec2Ary.push(
                planck.Vec2(
                    (-(size.w + leftMod)) * this.pixelsToMeters,
                    (size.h + bottomMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                planck.Vec2(
                    (-(size.w + leftMod)) * this.pixelsToMeters,
                    (-(size.h + topMod)) * this.pixelsToMeters ) );

            Vec2Ary.push(
                planck.Vec2(
                    (size.w + rightMod) * this.pixelsToMeters,
                    (-(size.h + topMod)) * this.pixelsToMeters ) );

            Vec2Ary.push(
                planck.Vec2(
                    (size.w + rightMod) * this.pixelsToMeters,
                    (size.h + bottomMod) * this.pixelsToMeters ) );
        }

        this.body.createFixture(
            planck.Polygon( Vec2Ary ),
            this.getFixtureDef( fixture ) );
    }

    // 
    //  DESC: Create the chain shape fixture
    //
    createChainShapeFixture( fixture )
    {
        // Do a sanity check because we need more then 1 point to define a chain
        if( fixture.vertAry.length < 2 )
            throw new Error( `Physics object has incorrect number of points defined (${fixture.vertAry.length})!` );
        
        // Apply scale to the size and divide by 2
        let size = new Size(
            this.sprite.objData.size.w * this.sprite.scale.x * 0.5,
            this.sprite.objData.size.h * this.sprite.scale.y * 0.5 );

        // Convert the points to world location in meters
        let Vec2Ary = [];
        this.convertPoints( Vec2Ary, fixture, size, this.sprite.scale );

        this.body.createFixture(
            planck.Chain( Vec2Ary, fixture.chainLoop ),
            this.getFixtureDef( fixture ) );
    }

    // 
    //  DESC: Convert the points to world location in meters
    //
    convertPoints( polyPointAry, fixture, size, scale )
    {
        // Convert to meters and world coordinates
        // Box2D polygons are defined using Counter Clockwise Winding (CCW)
        for( let i = 0; i < fixture.vertAry.length; ++i )
        {
            polyPointAry.push(
                planck.Vec2( ((fixture.vertAry[i].x * scale.x) - size.w) * this.pixelsToMeters,
                             ((fixture.vertAry[i].y * scale.y) - size.h) * this.pixelsToMeters ) );
        }
    }

    // 
    //  DESC: Update the physics
    //
    update()
    {
        if( this.isActive() )
        {
            if( !this.body.isStatic() && this.body.isAwake() )
            {
                // Increment our stat counter to keep track of what is going on.
                statCounter.physicsObjCounter++;
                
                this.applyTransforms();
            }
        }
    }
    
    // 
    //  DESC: Update the physics
    //
    applyTransforms()
    {
        this._pos = this.body.getPosition();
        this._angle = this.body.getAngle();
        this.sprite.setPosXYZ( this._pos.x * this.metersToPixels, -(this._pos.y * this.metersToPixels) );
        this.sprite.setRotXYZ( 0, 0, -this._angle, false );
    }
    
    // 
    //  DESC: Set the physics to be active
    //
    setActive( active )
    {
        if( this.body )
            this.body.setActive( active );
    }
    
    // 
    //  DESC: Is this component active?
    //
    isActive()
    {
        return (this.body && this.body.isActive());
    }

    // 
    //  DESC: Is this component awake?
    //
    isAwake()
    {
        return (this.body && !this.body.isStatic() && this.body.isAwake() );
    }

    // 
    //  DESC: Update the physics
    //
    destroyBody()
    {
        if( this.body !== null )
        {
            this.world.destroyBody( this.body );
            this.body = null;
        }
    }

    // 
    //  DESC: Set the physics position and rotation
    //
    setTransform( x, y, angle, resetVelocity = false )
    {
        if( this.body !== null )
        {
            this.body.setTransform( planck.Vec2( x * this.pixelsToMeters, -(y * this.pixelsToMeters) ), angle );

            if( resetVelocity )
            {
                this.body.setLinearVelocity( planck.Vec2.zero() );
                this.body.setAngularVelocity( 0 );
            }
            
            // If this body is staic, need to apply the transforms the the sprite position
            if( this.body.isStatic() )
                this.applyTransforms();
        }
    }

    // 
    //  DESC: Set the physics position and rotation
    //
    setPosition( x, y, resetVelocity = false )
    {
        if( this.body !== null )
        {
            this.body.setPosition( planck.Vec2( x * this.pixelsToMeters, -(y * this.pixelsToMeters) ) );

            if( resetVelocity )
            {
                this.body.setLinearVelocity( planck.Vec2.zero() );
                this.body.setAngularVelocity( 0 );
            }
            
            // If this body is staic, need to apply the transforms the the sprite position
            if( this.body.isStatic() )
                this.applyTransforms();
        }
    }
    
    // 
    //  DESC: Set the angular velocity
    //
    setAngularVelocity( value )
    {
        if( this.body !== null )
            this.body.setAngularVelocity( value );
    }
    
    // 
    //  DESC: Set the angular velocity
    //
    applyAngularImpulse( value, wake = false )
    {
        if( this.body !== null )
            this.body.applyAngularImpulse( value, wake );
    }
}
