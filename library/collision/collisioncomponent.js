//
//  FILE NAME: collisioncomponent.js
//  DESC:      Class for handling collision data
//             NOTE: Works in squared space
//             The more complex checks were lifted from: http://jeffreythompson.org/collision-detection/
//
//             NOTE: For speed reasons, many of the checks don't work if collision object has been rotated especially rect.
//                   Not all combinations work in all situations.
//                   Point works the best in all situations.
//                   Use polygon for objects that need to be rotated.

"use strict";

import { Point } from '../common/point';
import { Line } from '../common/line';
import { Rect } from '../common/rect';
import { Polygon } from '../common/polygon';
import { signalManager } from '../managers/signalmanager';
import * as defs from '../common/defs';

// Reusable global objects so as to avoid excessive allocations and cleanup
var gPoint = new Point;
var gCorner1 = new Point;
var gCorner2 = new Point;

export class CollisionComponent
{
    constructor( objectData, sprite )
    {
        // Sprite parent to this component
        this.sprite = sprite;

        // Matrix to do the transformation with
        this.matrix = sprite.matrix;

        // Enable flag
        this.enable = false;

        // Filter to determine who we should collide with
        this.filterCategoryBits = 0x0;
        this.filterMaskBits = 0x0;
        this.collisionSignal = false;

        if( objectData.collisionData.isActive() )
        {
            this.type = objectData.collisionData.type;
            this.enable = true;
            this.filterCategoryBits = objectData.collisionData.filterCategoryBits;
            this.filterMaskBits = objectData.collisionData.filterMaskBits;
            this.collisionSignal = objectData.collisionData.collisionSignal;

            // Load the radius data
            this.loadRadiusData( objectData );

            if( objectData.collisionData.type === defs.ECT_LINE )
                this.loadLineData( objectData );

            else if( objectData.collisionData.type === defs.ECT_RECT )
                this.loadRectData( objectData );

            else if( objectData.collisionData.type === defs.ECT_POLYGON )
                this.loadPolygonData( objectData );

            else if( objectData.collisionData.type === defs.ECT_POINT )
                this.loadPointData( objectData );
        }
    }

    // 
    //  DESC: Load radius data
    //
    loadRadiusData( objectData )
    {
        this.radius = objectData.collisionData.radius;

        // Create the radius from visual size: half the diagonal, squared (diagonal² / 4)
        if( objectData.collisionData.radiusFromVisual )
            this.radius = objectData.size.getLengthSquared() / 4;

        // Adjust the radius based on the modifier
        this.radius += objectData.collisionData.radiusModifier;

        if( this.radius == -1 )
            console.warn( `Radius has not been defined (${objectData.group}, ${objectData.name})!` );

        // Radius in the object's own units. transform() scales it by the sprite (and parent) scale, for every shape.
        this.baseRadius = this.radius;
    }

    // 
    //  DESC: Load line data
    //
    loadLineData( objectData )
    {
        let halfW = objectData.size.w / 2;
        let halfH = objectData.size.h / 2;

        this.lineAry = [];
        this.transLineAry = [];

        // Convert the line points to model view offsets
        if( objectData.collisionData.pointsToModelView )
        {
            for( let i = 0; i < objectData.collisionData.lineAry.length; ++i )
            {
                this.lineAry.push( new Line );

                let head = objectData.collisionData.lineAry[i].head;
                let tail = objectData.collisionData.lineAry[i].tail;

                this.lineAry[i].head = new Point( head.x - halfW, halfH - head.y, head.z);
                this.lineAry[i].tail = new Point( tail.x - halfW, halfH - tail.y, tail.z);

                this.transLineAry.push( new Line( this.lineAry[i] ) );
            }
        }
        // Load the line data as is
        else
        {
            for( let i = 0; i < objectData.collisionData.lineAry.length; ++i )
            {
                this.lineAry.push( new Line( objectData.collisionData.lineAry[i] ) );
                this.transLineAry.push( new Line( this.lineAry[i] ) );
            }
        }
    }

    // 
    //  DESC: Load rect data
    //
    loadRectData( objectData )
    {
        this.rectAry = [];
        this.transRectAry = [];

        let halfW = objectData.size.w / 2;
        let halfH = objectData.size.h / 2;

        // Create rect from visual size
        if( objectData.collisionData.rectFromVisual )
        {
            if( objectData.collisionData.rectAsSizeModifier )
            {
                for( let i = 0; i < objectData.collisionData.rectAry.length; ++i )
                {
                    let r = objectData.collisionData.rectAry[i];
                    this.rectAry.push( new Rect(-(halfW + r.x1), halfH + r.y1, halfW + r.x2, -(halfH + r.y2)) );
                }
            }
            else
            {
                this.rectAry.push( new Rect(-halfW, halfH, halfW, -halfH) );
            }
            
            for( let i = 0; i < this.rectAry.length; ++i )
                this.transRectAry.push( new Rect(this.rectAry[i]) );
        }
        // Convert the rect to model offsets
        else if( objectData.collisionData.rectToModelView )
        {
            for( let i = 0; i < objectData.collisionData.rectAry.length; ++i )
            {
                let r = objectData.collisionData.rectAry[i];
                this.rectAry.push( new Rect(r.x1 - halfW, halfH - r.y1, r.x2 - halfW, halfH - r.y2) );
                this.transRectAry.push( new Rect(this.rectAry[i]) );
            }
        }
        // Load the rect data as is
        else
        {
            for( let i = 0; i < objectData.collisionData.rectAry.length; ++i )
            {
                this.rectAry.push( new Rect(objectData.collisionData.rectAry[i]) );
                this.transRectAry.push( new Rect(this.rectAry[i]) );
            }
        }
    }

    // 
    //  DESC: Load polygon data
    //
    loadPolygonData( objectData )
    {
        let halfW = objectData.size.w / 2;
        let halfH = objectData.size.h / 2;

        this.polygonAry = [];
        this.transPolygonAry = [];

        // Flag for optional point check
        this.optionalPointCheck = objectData.collisionData.optionalPointCheck;

        // Convert the polygon points to model view offsets
        if( objectData.collisionData.pointsToModelView )
        {
            for( let i = 0; i < objectData.collisionData.polygonAry.length; ++i )
            {
                this.polygonAry.push( new Polygon );

                for( let j = 0; j < objectData.collisionData.polygonAry[i].pointAry.length; ++j )
                {
                    let p = objectData.collisionData.polygonAry[i].pointAry[j];
                    this.polygonAry[i].pointAry.push( new Point( p.x - halfW, halfH - p.y, p.z) );
                }

                this.transPolygonAry.push( new Polygon( this.polygonAry[i] ) );
            }
        }
        // Load the polygon data as is
        else
        {
            for( let i = 0; i < objectData.collisionData.polygonAry.length; ++i )
            {
                this.polygonAry.push( new Polygon( objectData.collisionData.polygonAry[i] ) );
                this.transPolygonAry.push( new Polygon( this.polygonAry[i] ) );
            }
        }
    }

    // 
    //  DESC: Load point data
    //
    loadPointData( objectData )
    {
        let halfW = objectData.size.w / 2;
        let halfH = objectData.size.h / 2;

        this.pointAry = [];
        this.transPointAry = [];

        // Convert the polygon points to model view offsets
        if( objectData.collisionData.pointsToModelView )
        {
            for( let i = 0; i < objectData.collisionData.pointAry.length; ++i )
            {
                let p = objectData.collisionData.pointAry[i];
                this.pointAry.push( new Point( p.x - halfW, halfH - p.y, p.z) );
            }

            for( let i = 0; i < this.pointAry.length; ++i )
                this.transPointAry.push( new Point(this.pointAry[i]) );
        }
        // Load the point data as is
        else
        {
            for( let i = 0; i < objectData.collisionData.pointAry.length; ++i )
            {
                this.pointAry.push( new Point( objectData.collisionData.pointAry[i] ) );
                this.transPointAry.push( new Point( this.pointAry[i] ) );
            }
        }
    }

    // 
    //  DESC: Transform the data for collision
    //
    transform()
    {
        if( this.enable )
        {
            if( this.type === defs.ECT_RECT )
            {
                for( let i = 0; i < this.rectAry.length; ++i )
                    this.matrix.transformRect( this.transRectAry[i], this.rectAry[i] );
            }
            else if( this.type === defs.ECT_POLYGON )
            {
                for( let i = 0; i < this.polygonAry.length; ++i )
                    this.matrix.transformPolygon( this.transPolygonAry[i], this.polygonAry[i] );
            }
            else if( this.type === defs.ECT_LINE )
            {
                for( let i = 0; i < this.lineAry.length; ++i )
                    this.matrix.transformLine( this.transLineAry[i], this.lineAry[i] );
            }
            else if( this.type === defs.ECT_POINT )
            {
                for( let i = 0; i < this.pointAry.length; ++i )
                    this.matrix.transformPoint( this.transPointAry[i], this.pointAry[i] );
            }

            // Scale the radius (a circle's, and every other shape's broad phase radius) like the shapes' points:
            // the matrix's X axis length is the sprite's scale (including the parent's).
            // Squared space, so the squared radius times the squared scale.
            this._m = this.matrix.matrix;
            this.radius = this.baseRadius * ((this._m[0] * this._m[0]) + (this._m[1] * this._m[1]) + (this._m[2] * this._m[2]));
        }
    }

    // 
    //  DESC: Check for collision
    //        checkChildren: also check the child nodes' sprites (ex: a shield that's a child of the player ship).
    //        Child sprites inherit their head node's userId, so tell them apart by the sprite in the callback.
    //
    checkForCollision( nodeAry, checkChildren = false )
    {
        this._resultSprite = null;

        if( this.enable )
            this._resultSprite = this.checkNodeAryForCollision( nodeAry, checkChildren );

        return this._resultSprite;
    }

    // 
    //  DESC: Check for collision along a move (moveX, moveY), in steps of at most maxStep, stopping at the first hit.
    //        Returns the first sprite collided with or null, like checkForCollision().
    //        For a fast object that would otherwise jump past thin parts of a target between frames. It starts at the
    //        transformed position (the last transform) and shifts it along the move in place, then puts it back. The
    //        caller passes the move: positions can jump (a strategy wrapping its sprites shifts them by the map span).
    //        Point and circle collision only.
    //
    sweepForCollision( nodeAry, moveX, moveY, maxStep, checkChildren = false )
    {
        if( !this.enable )
            return null;

        if( this.type !== defs.ECT_POINT && this.type !== defs.ECT_CIRCLE )
            throw new Error( 'Sweep collision only supports point and circle collision.' );

        let steps = Math.max( 1, Math.ceil( Math.sqrt( (moveX * moveX) + (moveY * moveY) ) / maxStep ) );
        let stepX = moveX / steps;
        let stepY = moveY / steps;
        let shifts = 0;
        let result = null;

        for( let i = 0; i < steps && result === null; ++i )
        {
            if( i > 0 )
            {
                this.offsetTransform( stepX, stepY );
                shifts++;
            }

            result = this.checkForCollision( nodeAry, checkChildren );
        }

        // Back to where it started
        this.offsetTransform( -stepX * shifts, -stepY * shifts );

        return result;
    }

    // 
    //  DESC: Shift the transformed collision position in place, until the next transform. For a sweep, or to check
    //        the copy of a sprite across a wrap point. Point and circle collision only.
    //
    offsetTransform( x, y = 0 )
    {
        if( this.type === defs.ECT_POINT )
        {
            for( let i = 0; i < this.transPointAry.length; ++i )
            {
                this.transPointAry[i].x += x;
                this.transPointAry[i].y += y;
            }
        }
        else if( this.type !== defs.ECT_CIRCLE )
        {
            throw new Error( 'Collision offset only supports point and circle collision.' );
        }

        this.sprite.transPos.x += x;
        this.sprite.transPos.y += y;
    }

    // 
    //  DESC: Check the nodes for collision, recursing into the children if requested
    //        Returns the first sprite collided with or null
    //
    checkNodeAryForCollision( nodeAry, checkChildren )
    {
        let result = null;

        for( let i = 0; i < nodeAry.length && result === null; ++i )
        {
            if( this.checkSpriteForCollision( nodeAry[i].sprite ) )
                result = nodeAry[i].sprite;
            else if( checkChildren && nodeAry[i].nodeAry && nodeAry[i].nodeAry.length )
                result = this.checkNodeAryForCollision( nodeAry[i].nodeAry, true );
        }

        return result;
    }

    // 
    //  DESC: Check one sprite for collision and broadcast the collision signal on a hit
    //
    checkSpriteForCollision( sprite )
    {
        this._result = false;
        this.local_sprite = sprite;

        if( this.local_sprite && this.local_sprite.collisionComponent && this.local_sprite.collisionComponent.enable && (this.filterCategoryBits & this.local_sprite.collisionComponent.filterMaskBits) )
        {
            if( this.type === defs.ECT_POINT )
            {
                if( this.local_sprite.collisionComponent.type === defs.ECT_CIRCLE )
                {
                    this._result = this.pointToCircleCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_RECT )
                {
                    this._result = this.pointToRectCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_POLYGON )
                {
                    this._result = this.pointToPolygonCollision( this.local_sprite );
                }
            }
            else if( this.type === defs.ECT_CIRCLE )
            {
                if( this.local_sprite.collisionComponent.type === defs.ECT_POINT )
                {
                    this._result = this.local_sprite.collisionComponent.pointToCircleCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_CIRCLE )
                {
                    this._result = this.circleToCircleCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_RECT )
                {
                    this._result = this.circleToRectCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_POLYGON )
                {
                    this._result = this.circleToPolygonCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_LINE )
                {
                    this._result = this.circleToLineCollision( this.local_sprite );
                }
            }
            else if( this.type === defs.ECT_LINE )
            {
                if( this.local_sprite.collisionComponent.type === defs.ECT_CIRCLE )
                {
                    this._result = this.local_sprite.collisionComponent.circleToLineCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_LINE )
                {
                    this._result = this.lineToLineCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_RECT )
                {
                    this._result = this.lineToRectCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_POLYGON )
                {
                    this._result = this.lineToPolygonCollision( this.local_sprite );
                }
            }
            else if( this.type === defs.ECT_RECT )
            {
                if( this.local_sprite.collisionComponent.type === defs.ECT_POINT )
                {
                    this._result = this.local_sprite.collisionComponent.pointToRectCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_CIRCLE )
                {
                    this._result = this.local_sprite.collisionComponent.circleToRectCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_RECT )
                {
                    this._result = this.rectToRectCollision( this.local_sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_LINE )
                {
                    this._result = this.local_sprite.collisionComponent.lineToRectCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_POLYGON )
                {
                    this._result = this.rectToPolygonCollision( this.local_sprite );
                }
            }
            else if( this.type === defs.ECT_POLYGON )
            {
                if( this.local_sprite.collisionComponent.type === defs.ECT_POINT )
                {
                    this._result = this.local_sprite.collisionComponent.pointToPolygonCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_CIRCLE )
                {
                    this._result = this.local_sprite.collisionComponent.circleToPolygonCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_RECT )
                {
                    this._result = this.local_sprite.collisionComponent.rectToPolygonCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_LINE )
                {
                    this._result = this.local_sprite.collisionComponent.lineToPolygonCollision( this.sprite );
                }
                else if( this.local_sprite.collisionComponent.type === defs.ECT_POLYGON )
                {
                    this._result = this.polygonToPolygonCollision( this.local_sprite );
                }
            }

            // The sprite doing the collision checks should always be the first parameter
            if( this._result && this.collisionSignal )
                signalManager.broadcast_collisionSignal( this.sprite, this.local_sprite );
        }

        return this._result;
    }

    // 
    //  DESC: Check for point to circle collision
    //
    pointToCircleCollision( sprite )
    {
        this._transPointAry = this.sprite.collisionComponent.transPointAry;

        for( let i = 0; i < this._transPointAry.length; ++i )
        {
            if( this.pointToCircleCheck( this._transPointAry[i], sprite.transPos, sprite.collisionComponent.radius ) )
                return true;
        }
        
        return false;
    }

    // 
    //  DESC: Check for rect to rect collision (Axis-Aligned Bounding Box)
    //  NOTE: Does not work if one or more of the rects are rotated. Use poly for rotated box
    //
    rectToRectCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transRectAry = sprite.collisionComponent.transRectAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transRectAry.length; ++i )
            {
                for( let j = 0; j < this.transRectAry.length; ++j )
                {
                    if( this.transRectAry[j].x1 < this._transRectAry[i].x2 &&
                        this.transRectAry[j].x2 > this._transRectAry[i].x1 &&
                        this.transRectAry[j].y1 > this._transRectAry[i].y2 &&
                        this.transRectAry[j].y2 < this._transRectAry[i].y1 )
                    {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    // 
    //  DESC: Check for circle to rect collision
    //
    circleToRectCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transRectAry = sprite.collisionComponent.transRectAry;
            this._transPos = this.sprite.transPos;

            // Do the narrow phase check
            for( let i = 0; i < this._transRectAry.length; ++i )
            {
                // Find the edge the point is out side of
                this._edgeX = this._transPos.x;
                this._edgeY = this._transPos.y;

                if( this._transPos.x < this._transRectAry[i].x1 )
                    this._edgeX = this._transRectAry[i].x1;
                else if( this._transPos.x > this._transRectAry[i].x2 )
                    this._edgeX = this._transRectAry[i].x2;

                if( this._transPos.y < this._transRectAry[i].y2 )
                    this._edgeY = this._transRectAry[i].y2;
                else if( this._transPos.y > this._transRectAry[i].y1 )
                    this._edgeY = this._transRectAry[i].y1;
                
                // Get distance from closest edges
                this._distX = this._transPos.x - this._edgeX;
                this._distY = this._transPos.y - this._edgeY;
                this._distance = (this._distX * this._distX) + (this._distY * this._distY);

                if( this._distance <= this.radius )
                    return true;
            }
        }

        return false;
    }

    // 
    //  DESC: Check for point to rect collision
    //
    pointToRectCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPointAry = this.sprite.collisionComponent.transPointAry;
            this._transRectAry = sprite.collisionComponent.transRectAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transPointAry.length; ++i )
            {
                for( let j = 0; j < this._transRectAry.length; ++j )
                {
                    if( !(this._transPointAry[i].x < this._transRectAry[j].x1 || this._transPointAry[i].x > this._transRectAry[j].x2 ||
                        this._transPointAry[i].y > this._transRectAry[j].y1 || this._transPointAry[i].y < this._transRectAry[j].y2) )
                        return true;
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for point to polygon collision
    //
    pointToPolygonCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPointAry = this.sprite.collisionComponent.transPointAry;
            this._transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transPointAry.length; ++i )
            {
                for( let j = 0; j < this._transPolygonAry.length; ++j )
                {
                    if( this.pointToPolygonCheck( this._transPointAry[i], this._transPolygonAry[j]) )
                        return true;
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for circle to polygon collision
    //
    circleToPolygonCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPos = this.sprite.transPos;
            this._transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transPolygonAry.length; ++i )
            {
                for( let j = 0; j < this._transPolygonAry[i].pointAry.length; ++j )
                {
                    // Get next vertex in list. If we've hit the end, wrap around to 0
                    let next = j + 1;
                    if( next == this._transPolygonAry[i].pointAry.length )
                        next = 0;

                    // check for collision between the circle and a line formed between the two vertices
                    if( this.lineToCircleCheck(this._transPolygonAry[i].pointAry[j], this._transPolygonAry[i].pointAry[next], this._transPos, this.radius) )
                        return true;
                }

                // Optional: Test if the point is INSIDE the polygon note that this iterates all
                // sides of the polygon again, so only use this if you need to
                if( sprite.collisionComponent.optionalPointCheck )
                {
                    if( this.pointToPolygonCheck( this._transPos, this._transPolygonAry[i] ) )
                        return true;
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for line to circle collision
    //
    circleToLineCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPos = this.sprite.transPos;
            this._transLineAry = sprite.collisionComponent.transLineAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transLineAry.length; ++i )
            {
                // Check for collision between the circle and a line formed between the two vertices
                if( this.lineToCircleCheck(this._transLineAry[i].head, this._transLineAry[i].tail, this._transPos, this.radius) )
                    return true;
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for line to circle collision
    //
    lineToLineCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transLineAry = sprite.collisionComponent.transLineAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transLineAry.length; ++i )
            {
                for( let j = 0; j < this.transLineAry.length; ++j )
                {
                    // Check for collision between the circle and a line formed between the two vertices
                    if( this.lineToLineCheck( this.transLineAry[j].head, this.transLineAry[j].tail, this._transLineAry[i].head, this._transLineAry[i].tail ) )
                        return true;
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for line to rect collision
    //
    lineToRectCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transRectAry = sprite.collisionComponent.transRectAry;

            // Do the narrow phase check
            for( let i = 0; i < this._transRectAry.length; ++i )
            {
                for( let j = 0; j < this.transLineAry.length; ++j )
                {
                    if( this.lineToRectCheck( this.transLineAry[j].head, this.transLineAry[j].tail, this._transRectAry[i] ) )
                        return true;
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for line to polygon collision
    //
    lineToPolygonCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let line = 0; line < this.transLineAry.length; ++line )
            {
                for( let i = 0; i < this._transPolygonAry.length; ++i )
                {
                    for( let j = 0; j < this._transPolygonAry[i].pointAry.length; ++j )
                    {
                        // Get next vertex in list. If we've hit the end, wrap around to 0
                        let next = j + 1;
                        if( next == this._transPolygonAry[i].pointAry.length )
                            next = 0;

                        // check for collision between the line and a polygon line formed between the two vertices
                        if( this.lineToLineCheck( this._transPolygonAry[i].pointAry[j], this._transPolygonAry[i].pointAry[next], this.transLineAry[line].head, this.transLineAry[line].tail ) )
                            return true;
                    }

                    // Optional: Test if the point is INSIDE the polygon note that this iterates all
                    // sides of the polygon again, so only use this if you need to
                    if( sprite.collisionComponent.optionalPointCheck )
                    {
                        if( this.pointToPolygonCheck( this.transLineAry[line].head, this._transPolygonAry[i] ) )
                            return true;
                        
                        if( this.pointToPolygonCheck( this.transLineAry[line].tail, this._transPolygonAry[i] ) )
                            return true;
                    }
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for rect to polygon collision
    //
    rectToPolygonCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let rect = 0; rect < this.transRectAry.length; ++rect )
            {
                for( let i = 0; i < this._transPolygonAry.length; ++i )
                {
                    for( let j = 0; j < this._transPolygonAry[i].pointAry.length; ++j )
                    {
                        // Get next vertex in list. If we've hit the end, wrap around to 0
                        let next = j + 1;
                        if( next == this._transPolygonAry[i].pointAry.length )
                            next = 0;

                        // check for collision between the rect and a polygon line formed between the two vertices
                        if( this.lineToRectCheck( this._transPolygonAry[i].pointAry[j], this._transPolygonAry[i].pointAry[next], this.transRectAry[rect] ) )
                            return true;
                    }

                    // Optional: Test if the point is INSIDE the polygon note that this iterates all
                    // sides of the polygon again, so only use this if you need to
                    if( sprite.collisionComponent.optionalPointCheck )
                    {
                        gPoint.setXYZ( this.transRectAry[rect].x1, this.transRectAry[rect].y1 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[i] ) )
                            return true;
                        
                        gPoint.setXYZ( this.transRectAry[rect].x2, this.transRectAry[rect].y1 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[i] ) )
                            return true;

                        gPoint.setXYZ( this.transRectAry[rect].x2, this.transRectAry[rect].y2 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[i] ) )
                            return true;

                        gPoint.setXYZ( this.transRectAry[rect].x1, this.transRectAry[rect].y2 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[i] ) )
                            return true;
                    }
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for polygon to polygon collision
    //
    polygonToPolygonCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            this._transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check: does an edge of one polygon cross an edge of the other?
            for( let poly1 = 0; poly1 < this.transPolygonAry.length; ++poly1 )
            {
                for( let point1 = 0; point1 < this.transPolygonAry[poly1].pointAry.length; ++point1 )
                {
                    // Get next vertex in list. If we've hit the end, wrap around to 0
                    let next1 = point1 + 1;
                    if( next1 == this.transPolygonAry[poly1].pointAry.length )
                        next1 = 0;

                    for( let poly2 = 0; poly2 < this._transPolygonAry.length; ++poly2 )
                    {
                        for( let point2 = 0; point2 < this._transPolygonAry[poly2].pointAry.length; ++point2 )
                        {
                            // Get next vertex in list. If we've hit the end, wrap around to 0
                            let next2 = point2 + 1;
                            if( next2 == this._transPolygonAry[poly2].pointAry.length )
                                next2 = 0;

                            // check for collision between the two polygon lines
                            if( this.lineToLineCheck( this.transPolygonAry[poly1].pointAry[point1], this.transPolygonAry[poly1].pointAry[next1],
                                                      this._transPolygonAry[poly2].pointAry[point2], this._transPolygonAry[poly2].pointAry[next2] ) )
                                return true;
                        }
                    }
                }
            }

            // Optional: Test if one polygon is INSIDE the other. No edges cross, so each polygon is either
            // entirely inside the other or entirely outside it, and testing one of its vertices tells which.
            // (This used to test every vertex again for every pair of edges.)
            for( let poly1 = 0; poly1 < this.transPolygonAry.length; ++poly1 )
            {
                for( let poly2 = 0; poly2 < this._transPolygonAry.length; ++poly2 )
                {
                    // Is the other sprite's polygon inside this one?
                    if( this.optionalPointCheck && this.pointToPolygonCheck( this._transPolygonAry[poly2].pointAry[0], this.transPolygonAry[poly1] ) )
                        return true;

                    // Is this polygon inside the other sprite's?
                    if( sprite.collisionComponent.optionalPointCheck && this.pointToPolygonCheck( this.transPolygonAry[poly1].pointAry[0], this._transPolygonAry[poly2] ) )
                        return true;
                }
            }
        }
        
        return false;
    }

    // 
    //  DESC: Check for circle to circle check
    //
    circleToCircleCheck( sprite )
    {
        // Broad phase, fast rather than exact. The radii are stored squared, and touching is distance <= r1 + r2.
        // (r1 + r2)² <= 2 × (r1² + r2²), so this never misses a hit without a sqrt: exact for equal radii,
        // looser the more they differ. (r1² + r2² alone was too tight: about 71% of the touching distance.)
        if( this.sprite.transPos.calcLengthSquared2D( sprite.transPos ) <= 2 * (this.radius + sprite.collisionComponent.radius) )
        {
            //console.log(`circleToCircleCheck ${sprite.transPos.x}`);
            return true;
        }
        
        return false;
    }

    // 
    //  DESC: Exact circle to circle collision (the full circle vs circle test, not the broad phase)
    //
    circleToCircleCollision( sprite )
    {
        this._radiusSum = Math.sqrt( this.radius ) + Math.sqrt( sprite.collisionComponent.radius );

        return (this.sprite.transPos.calcLengthSquared2D( sprite.transPos ) <= (this._radiusSum * this._radiusSum));
    }

    // 
    //  DESC: Check for point to polygon collision
    //
    pointToPolygonCheck( point, polygon )
    {
        this._collision = false;

        for( let ii = 0; ii < polygon.pointAry.length; ++ii )
        {
            // Get next vertex in list. If we've hit the end, wrap around to 0
            let next = ii + 1;
            if( next == polygon.pointAry.length )
                next = 0;

            // Go the current and next point
            this._vc = polygon.pointAry[ii];
            this._vn = polygon.pointAry[next];
            this._px = point.x;
            this._py = point.y;

            // compare position, flip 'collision' variable back and forth
            if( ((this._vc.y >= this._py && this._vn.y < this._py) || (this._vc.y < this._py && this._vn.y >= this._py)) &&
                (this._px < (this._vn.x-this._vc.x)*(this._py-this._vc.y) / (this._vn.y-this._vc.y)+this._vc.x) )
            {
                this._collision = !this._collision;
            }
        }

        return this._collision;
    }

    // 
    //  DESC: Line to circle test
    //
    lineToCircleCheck( pointPos1, pointPos2, circlePos, radius )
    {
        // Get length of the line (squared)
        this._distance = pointPos1.calcLengthSquared2D( pointPos2 );

        // Where the point on the line closest to the circle is, as a fraction of the line (0 = pointPos1, 1 = pointPos2)
        this._dot = 0;
        if( this._distance > 0 )
            this._dot = ( ((circlePos.x-pointPos1.x)*(pointPos2.x-pointPos1.x)) + ((circlePos.y-pointPos1.y)*(pointPos2.y-pointPos1.y)) ) / this._distance;

        // Keep it on the line segment. Without this, the test used the endless line through the two points,
        // so a circle anywhere along an edge's extension (ex: straight below the player ship's nose) was a hit.
        if( this._dot < 0 )
            this._dot = 0;
        else if( this._dot > 1 )
            this._dot = 1;

        // Find the closest point on the line segment
        gPoint.setXYZ(
            pointPos1.x + (this._dot * (pointPos2.x-pointPos1.x)),
            pointPos1.y + (this._dot * (pointPos2.y-pointPos1.y)) );

        // Is the circle on the line?
        return this.pointToCircleCheck( gPoint, circlePos, radius );
    }

    // 
    //  DESC: Point to circle test
    //  NOTE: Function works in square space
    //
    pointToCircleCheck( pointPos, circlePos, radius )
    {
        // If the distance is less than the circle's radius the point is inside!
        if( pointPos.calcLengthSquared2D( circlePos ) <= radius ) 
            return true;

        return false;
    }

    // 
    //  DESC: Line to line test
    //
    lineToLineCheck( head1, tail1, head2, tail2 )
    {
        // Takes the end points directly so polygon edges and rect sides don't need copying into a line first.
        // Locals, not this._ members: numbers in locals don't allocate.
        const x1 = head1.x, y1 = head1.y, x2 = tail1.x, y2 = tail1.y;
        const x3 = head2.x, y3 = head2.y, x4 = tail2.x, y4 = tail2.y;
        const denom = ((y4-y3)*(x2-x1)) - ((x4-x3)*(y2-y1));

        // calculate the distance to intersection point
        const uA = (((x4-x3)*(y1-y3)) - ((y4-y3)*(x1-x3))) / denom;
        const uB = (((x2-x1)*(y1-y3)) - ((y2-y1)*(x1-x3))) / denom;

        // if uA and uB are between 0-1, lines are colliding
        return (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
    }

    // 
    //  DESC: Line to line test
    //
    lineToRectCheck( head, tail, rect )
    {
        // Check the line against each side of the rect
        gCorner1.setXYZ( rect.x1, rect.y1 );
        gCorner2.setXYZ( rect.x2, rect.y1 );
        if( this.lineToLineCheck( head, tail, gCorner1, gCorner2 ) )
            return true;

        gCorner1.setXYZ( rect.x2, rect.y2 );
        if( this.lineToLineCheck( head, tail, gCorner2, gCorner1 ) )
            return true;

        gCorner2.setXYZ( rect.x1, rect.y2 );
        if( this.lineToLineCheck( head, tail, gCorner1, gCorner2 ) )
            return true;

        gCorner1.setXYZ( rect.x1, rect.y1 );
        if( this.lineToLineCheck( head, tail, gCorner2, gCorner1 ) )
            return true;

        return false;
    }
}