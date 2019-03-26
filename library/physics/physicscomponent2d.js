
// 
//  FILE NAME: physicscomponent2d.js
//  DESC:      Class for handling the physics part of the sprite.
//

"use strict";

import { physicsWorldManager } from './physicsworldmanager';
import { Size } from '../common/size';
import * as planck from '../../Box2D/planck.min';
//import * as planck from '../../Box2D/planck';

export class PhysicsComponent2D
{
    constructor( physicsData )
    {
        // Body type
        this.bodyType = null;

        // The physics body the sprite belongs to
        this.body = null;

        // Pixels to meters conversion
        this.pixelsToMeters = 0;
        this.metersToPixels = 0;

        // Pointer to the world
        this.world = null;
        
        // Flag to indicate static body
        this.staticBody = false;
        
        if( physicsData.isActive() )
        {
            this.world = physicsWorldManager.getWorld( physicsData.world );

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
            this.createBody( sprite );
            this.createFixture( sprite );
        }
    }
    
    // 
    //  DESC: Create the body
    //
    createBody( sprite )
    {
        if( !this.body )
        {
            let physicsData = sprite.objData.physicsData;
            let worldDef = {
                type : physicsData.bodyType,
                position : planck.Vec2( sprite.object.pos.x * this.pixelsToMeters, -(sprite.object.pos.y * this.pixelsToMeters) ),
                angle : -sprite.object.rot.z,

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

                userData : sprite };

            // Create the body
            this.body = this.world.createBody( worldDef );
            
            if( physicsData.bodyType === 'static' )
                this.staticBody = true;
        }
    }

    // 
    //  DESC: Create the fixture
    //
    createFixture( sprite )
    {
        let fixtureAry = sprite.objData.physicsData.fixtureAry;

        for( let i = 0; i < fixtureAry.length; ++i )
        {
            // Create the fixture
            if( fixtureAry[i].shape === planck.Circle.TYPE )
                this.createCircularShapeFixture( sprite, fixtureAry[i] );

            else if( fixtureAry[i].shape === planck.Edge.TYPE )
                this.createEdgeShapeFixture( sprite, fixtureAry[i] );

            else if( fixtureAry[i].shape === planck.Polygon.TYPE )
                this.createPolygonShapeFixture( sprite, fixtureAry[i] );

            else if( fixtureAry[i].shape === planck.Chain.TYPE )
                this.createChainShapeFixture( sprite, fixtureAry[i] );
        }
    }
    
    // 
    //  DESC: Create the circular shape fixture
    //
    getFixtureDef( sprite, fixture )
    {
        let fixtureDef = {
            userData : sprite,
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
    createCircularShapeFixture( sprite, fixture )
    {
        this.body.createFixture(
            planck.Circle( (fixture.radius * sprite.object.scale.x) * this.pixelsToMeters ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Create the edge shape fixture
    //  NOTE: An edge is a line segment of two points
    //        This is no different then making a polygon from points
    //
    createEdgeShapeFixture( sprite, fixture )
    {
        // Do a sanity check because we need two points to define an edge
        if( fixture.vertAry.length !== 2 )
            throw new Error( `Physics object has incorrect number of points defined (${fixture.vertAry.length})!` );

        // Apply scale to the size and divide by 2
        let size = new Size(
            sprite.objData.size.w * sprite.object.scale.x * 0.5,
            sprite.objData.size.h * sprite.object.scale.y * 0.5 );

        // Convert the points to world location in meters
        let Vec2Ary = [];
        this.convertPoints( Vec2Ary, fixture, size, sprite.object.scale );

        this.body.createFixture(
            planck.Edge( Vec2Ary[0], Vec2Ary[1] ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Create the polygon shape fixture
    //
    createPolygonShapeFixture( sprite, fixture )
    {
        let Vec2Ary = [];

        // Apply scale to the size and divide by 2
        let size = new Size(
            sprite.objData.size.w * sprite.object.scale.x * 0.5,
            sprite.objData.size.h * sprite.object.scale.y * 0.5 );

        // Is this polygon shape defined by a vector of points?
        if( fixture.vertAry.length )
        {
            // Convert the points to world location in meters
            this.convertPoints( Vec2Ary, fixture, size, sprite.object.scale );
        }
        
        // If vector points are not supplied, build a square based on the object size
        else
        {
            // Bottom and left mod have their signs flipped so that a positive mod always means
            // expansion of the side, and a negative mod always means a contraction of the side
            let topMod = fixture.topMod * sprite.object.scale.y;
            let bottomMod = -fixture.bottomMod * sprite.object.scale.y;
            let leftMod = -fixture.leftMod * sprite.object.scale.x;
            let rightMod = fixture.rightMod * sprite.object.scale.x;

            // Convert to meters
            // Box2D polygons are defined using Counter Clockwise Winding (CCW)
            Vec2Ary.push(
                planck.Vec2(
                    (-size.w + leftMod) * this.pixelsToMeters,
                    (size.h + topMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                planck.Vec2(
                    (-size.w + leftMod) * this.pixelsToMeters,
                    (-size.h + bottomMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                planck.Vec2(
                    (size.w + rightMod) * this.pixelsToMeters,
                    (-size.h + bottomMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                planck.Vec2(
                    (size.w + rightMod) * this.pixelsToMeters,
                    (size.h + topMod) * this.pixelsToMeters ) );
        }

        this.body.createFixture(
            planck.Polygon( Vec2Ary ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Create the chain shape fixture
    //
    createChainShapeFixture( sprite, fixture )
    {
        // Do a sanity check because we need more then 1 point to define a chain
        if( fixture.vertAry.length > 1 )
            throw new Error( `Physics object has incorrect number of points defined (${fixture.vertAry.length})!` );
        
        // Apply scale to the size and divide by 2
        let size = new Size(
            sprite.objData.size.w * sprite.object.scale.x * 0.5,
            sprite.objData.size.h * sprite.object.scale.y * 0.5 );

        // Convert the points to world location in meters
        let Vec2Ary = [];
        this.convertPoints( Vec2Ary, fixture, size, sprite.object.scale );

        this.body.createFixture(
            planck.Chain( Vec2Ary, fixture.chainLoop ),
            this.getFixtureDef( sprite, fixture ) );
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
    update( sprite )
    {
        if( this.isActive() )
        {
            //CStatCounter::Instance().IncPhysicsObjectsCounter();

            if( !this.staticBody && this.body.isAwake() )
            {
                let pos = this.body.getPosition();
                let angle = this.body.getAngle();
                sprite.object.setPosXYZ( pos.x * this.metersToPixels, -(pos.y * this.metersToPixels) );
                sprite.object.setRotXYZ( 0, 0, -angle, false );
            }
        }
    }
    
    // 
    //  DESC: Is this component active?
    //
    isActive()
    {
        return (this.body !== null);
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
    setTransform( x, y, angle, resetVelocity )
    {
        if( this.body !== null )
        {
            this.body.setTransform( planck.Vec2( x * this.pixelsToMeters, -(y * this.pixelsToMeters) ), angle );

            if( resetVelocity )
            {
                this.body.setLinearVelocity( planck.Vec2.zero() );
                this.body.setAngularVelocity( 0 );
            }
        }
    }

    // 
    //  DESC: Set the linear velocity
    //
    setLinearVelocity( x, y )
    {
        if( this.body !== null )
            this.body.setLinearVelocity( planck.Vec2( x * this.pixelsToMeters, -(y * this.pixelsToMeters) ) );
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
