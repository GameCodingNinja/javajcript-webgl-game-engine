
// 
//  FILE NAME:  objectphysicsdata2d.js
//  DESC:       Class containing the 2D object's physics data
//

"use strict";

import * as planck from 'planck-js';

export class Fixture
{
    constructor()
    {
        // Shape of the fixture
        this.shape = null;

        // Radius if shape is a circle
        this.radius = 0.0;

        // The friction is how much drag this object has on another object  
        this.friction = 0.2;

        // The density is how much the object resists movement  
        this.density = 0.2;

        // The percetange of velocity retained upon colliding with this object
        this.restitution = 0.2;

        // Amount to adjust the top, bottom, left, and right side size of the mesh
        this.topMod = 0;
        this.bottomMod = 0;
        this.leftMod = 0;
        this.rightMod = 0;

        // Flag to define if chain shape is a loop
        this.chainLoop = false;

        // Flag to indicate if fixture is a sensor. Reports collision but doesn't react to it
        this.sensor = false;

        // Collision filter
        this.filterGroupIndex = 0;
        this.filterCategoryBits = 1;
        this.filterMaskBits = 65535;

        // Polygon point vector
        this.vertAry = [];
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.shape = obj.shape;
        this.radius = obj.radius;  
        this.friction = obj.friction;  
        this.density = obj.density;
        this.restitution = obj.restitution;
        this.topMod = obj.topMod;
        this.bottomMod = obj.bottomMod;
        this.leftMod = obj.leftMod;
        this.rightMod = obj.rightMod;
        this.chainLoop = obj.chainLoop;
        this.sensor = obj.sensor;
        this.filterGroupIndex = obj.filterGroupIndex;
        this.filterCategoryBits = obj.filterCategoryBits;
        this.filterMaskBits = obj.filterMaskBits;
        
        for( let i = 0; i < obj.vertAry.length; ++i )
        {
            let vert = obj.vertAry[i];
            this.vertAry.push( new planck.Vec2( vert.x, vert.y ) );
        }
    }

    // 
    //  DESC: Dispose of fixture resources
    //
    dispose()
    {
        this.vertAry = [];
        this.shape = null;
    }
}

export class ObjectPhysicsData2D
{
    constructor()
    {
        // The name of the physics world
        this.world = null;

        // Type of physics body
        this.bodyType = null;

        // The constant decceleration of movement and rotation
        this.linearDamping = 0;
        this.angularDamping = 0;

        // If we want to prevent the object from rotating due to physicss
        this.fixedRotation = false;

        // vector of fixtures
        this.fixtureAry = [];
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.world = obj.world;
        this.bodyType = obj.bodyType;
        this.linearDamping = obj.linearDamping;
        this.angularDamping = obj.angularDamping;
        this.fixedRotation = obj.fixedRotation;
        
        for( let i = 0; i < obj.fixtureAry.length; ++i )
        {
            let fixture = new Fixture;
            fixture.copy( obj.fixtureAry[i] );
            this.fixtureAry.push(fixture);
        }
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( node )
    {
        let physicsNode = node.getElementsByTagName( 'physics' );

        // Check if the object has any physics data
        if( physicsNode.length )
        {
            let attr = physicsNode[0].getAttribute( 'world' );
            if( attr )
                this.world = attr;

            // The body of the physics sprite used for physics
            let bodyNode = physicsNode[0].getElementsByTagName( 'body' );
            if( bodyNode.length )
            {
                // Get the body type - default is static
                attr = bodyNode[0].getAttribute( 'type' );
                if( attr )
                    this.bodyType = attr;

                // The damping is the constant decceleration of movement
                attr = bodyNode[0].getAttribute( 'linearDamping' );
                if( attr )
                    this.linearDamping = Number( attr );

                // The angular damping is the constant decceleration of rotation
                attr = bodyNode[0].getAttribute( 'angularDamping' );
                if( attr )
                    this.angularDamping = Number( attr );

                // Whether the rotation due to physicss is fixed
                attr = bodyNode[0].getAttribute( 'fixedRotation' );
                if( attr )
                    this.fixedRotation = (attr === 'true');
            }

            // The body of the physics sprite used for physics
            let fixtureNode = physicsNode[0].getElementsByTagName( 'fixture' );

            for( let i = 0; i < fixtureNode.length; ++i )
            {
                let fixture = this.fixtureAry[i];

                if( fixture === undefined )
                {
                    fixture = new Fixture;
                    this.fixtureAry.push(fixture);
                }

                // Get the fixture shape
                attr = fixtureNode[i].getAttribute( 'shape' );
                if( attr )
                    fixture.shape = attr;

                // The friction is how much drag this object has on another object
                attr = fixtureNode[i].getAttribute( 'friction' );
                if( attr )
                    fixture.friction = Number( attr );

                // The density is how much the object resists movement
                attr = fixtureNode[i].getAttribute( 'density' );
                if( attr )
                    fixture.density = Number( attr );

                // The restitution is the percentage of velocity retained upon physics
                attr = fixtureNode[i].getAttribute( 'restitution' );
                if( attr )
                    fixture.restitution = Number( attr );

                // Radius if shape is a circle
                attr = fixtureNode[i].getAttribute( 'radius' );
                if( attr )
                    fixture.radius = Number( attr );

                // Is chain shape a loop?
                attr = fixtureNode[i].getAttribute( 'chainLoop' );
                if( attr )
                    fixture.chainLoop = (attr === 'true');

                // Is fixture a sensor?
                attr = fixtureNode[i].getAttribute( 'sensor' );
                if( attr )
                    fixture.sensor = (attr === 'true');

                // See if there is a vert list
                let vertNode = fixtureNode[i].getElementsByTagName( 'vert' );

                for( let j = 0; j < vertNode.length; ++j )
                {
                    fixture.vertAry.push( 
                        new planck.Vec2(
                            Number( vertNode[j].getAttribute('x') ),
                            Number( vertNode[j].getAttribute('y') ) ) );
                }

                // See if the filter is defined
                let filterNode = fixtureNode[i].getElementsByTagName( 'collisionFilter' );
                if( filterNode.length )
                {
                    attr = filterNode[0].getAttribute('categoryBits');
                    if( attr )
                        fixture.filterGroupIndex = Number( attr );

                    attr = filterNode[0].getAttribute('maskBits');
                    if( attr )
                        fixture.filterMaskBits = Number( attr );

                    attr = filterNode[0].getAttribute('groupIndex');
                    if( attr )
                        fixture.filterGroupIndex = Number( attr );
                }

                // The size mod is how much the mesh size should be adjusted on each side
                let sizeModNode = fixtureNode[i].getElementsByTagName( 'sizeMod' );
                if( sizeModNode.length )
                {
                    attr = sizeModNode[0].getAttribute('top');
                    if( attr )
                        fixture.topMod = Number( attr );

                    attr = sizeModNode[0].getAttribute('bottom');
                    if( attr )
                        fixture.bottomMod = Number( attr );

                    attr = sizeModNode[0].getAttribute('left');
                    if( attr )
                        fixture.leftMod = Number( attr );

                    attr = sizeModNode[0].getAttribute('right');
                    if( attr )
                        fixture.rightMod = Number( attr );
                }
            }
        }
    }
    
    // 
    //  DESC: Is this genType active
    //
    isActive()
    {
        return (this.bodyType !== null);
    }

    // 
    //  DESC: Dispose of physics resources
    //
    dispose()
    {
        this.fixtureAry = [];
        this.world = null;
        this.bodyType = null;
    }
}
