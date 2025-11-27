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

// Reusable global objects so as to avoid exessive allocations and cleanup
var gPoint = new Point;
var gLine1 = new Line;
gLine1.head = new Point;
gLine1.tail = new Point;
var gLine2 = new Line;
gLine2.head = new Point;
gLine2.tail = new Point;

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

        // Create the radius from visual size
        if( objectData.collisionData.radiusFromVisual )
            this.radius = objectData.size.getLengthSquared() / 2;

        // Adjust the radius based on the modifier
        this.radius += objectData.collisionData.radiusModifier;

        if( this.radius == -1 )
            console.warn( `Radius has not been defined (${objectData.group}, ${objectData.name})!` );
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
                for( this._i = 0; this._i < this.rectAry.length; ++this._i )
                    this.matrix.transformRect( this.transRectAry[this._i], this.rectAry[this._i] );
            }
            else if( this.type === defs.ECT_POLYGON )
            {
                for( this._i = 0; this._i < this.polygonAry.length; ++this._i )
                    this.matrix.transformPolygon( this.transPolygonAry[this._i], this.polygonAry[this._i] );
            }
            else if( this.type === defs.ECT_LINE )
            {
                for( this._i = 0; this._i < this.lineAry.length; ++this._i )
                    this.matrix.transformLine( this.transLineAry[this._i], this.lineAry[this._i] );
            }
            else if( this.type === defs.ECT_POINT )
            {
                for( this._i = 0; this._i < this.pointAry.length; ++this._i )
                    this.matrix.transformPoint( this.transPointAry[this._i], this.pointAry[this._i] );
            }
        }
    }

    // 
    //  DESC: Check for collision
    //
    checkForCollision( nodeAry )
    {
        if( this.enable )
        {
            this._result = false;
            
            for( this._node = 0; this._node < nodeAry.length; ++this._node )
            {
                this.local_sprite = nodeAry[this._node].sprite;

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
                            this._result = this.circleToCircleCheck( this.local_sprite );
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

                    if( this._result )
                    {
                        // The sprite doing the collision checks should always be the first parameter
                        if( this.collisionSignal )
                            signalManager.broadcast_collisionSignal( this.sprite, this.local_sprite );
                        //console.log('hit');
                        
                        return this.local_sprite;
                    }
                }
            }
        }

        return null;
    }

    // 
    //  DESC: Check for point to circle collision
    //
    pointToCircleCollision( sprite )
    {
        this._transPointAry = this.sprite.collisionComponent.transPointAry;

        for( this._i = 0; this._i < this._transPointAry.length; ++this._i )
        {
            if( this.pointToCircleCheck( this._transPointAry[this._i], sprite.transPos, sprite.collisionComponent.radius ) )
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
            for( this._i = 0; this._i < this._transRectAry.length; ++this._i )
            {
                for( this._j = 0; this._j < this.transRectAry.length; ++this._j )
                {
                    if( this.transRectAry[this._j].x1 < this._transRectAry[this._i].x2 &&
                        this.transRectAry[this._j].x2 > this._transRectAry[this._i].x1 &&
                        this.transRectAry[this._j].y1 > this._transRectAry[this._i].y2 &&
                        this.transRectAry[this._j].y2 < this._transRectAry[this._i].y1 )
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
            for( this._i = 0; this._i < this._transRectAry.length; ++this._i )
            {
                // Find the edge the point is out side of
                this._edgeX = this._transPos.x;
                this._edgeY = this._transPos.y;

                if( this._transPos.x < this._transRectAry[this._i].x1 )
                    this._edgeX = this._transRectAry[this._i].x1;
                else if( this._transPos.x > this._transRectAry[this._i].x2 )
                    this._edgeX = this._transRectAry[this._i].x2;

                if( this._transPos.y < this._transRectAry[this._i].y2 )
                    this._edgeY = this._transRectAry[this._i].y2;
                else if( this._transPos.y > this._transRectAry[this._i].y1 )
                    this._edgeY = this._transRectAry[this._i].y1;
                
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
            for( this._i = 0; this._i < this._transPointAry.length; ++this._i )
            {
                for( this._j = 0; this._j < this._transRectAry.length; ++this._j )
                {
                    if( !(this._transPointAry[this._i].x < this._transRectAry[this._j].x1 || this._transPointAry[this._i].x > this._transRectAry[this._j].x2 ||
                        this._transPointAry[this._i].y > this._transRectAry[this._j].y1 || this._transPointAry[this._i].y < this._transRectAry[this._j].y2) )
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
            for( this._i = 0; this._i < this._transPointAry.length; ++this._i )
            {
                for( this._j = 0; this._j < this._transPolygonAry.length; ++this._j )
                {
                    if( this.pointToPolygonCheck( this._transPointAry[this._i], this._transPolygonAry[this._j]) )
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
            for( this._i = 0; this._i < this._transPolygonAry.length; ++this._i )
            {
                for( this._j = 0; this._j < this._transPolygonAry[this._i].pointAry.length; ++this._j )
                {
                    // Get next vertex in list. If we've hit the end, wrap around to 0
                    this._next = this._j + 1;
                    if( this._next == this._transPolygonAry[this._i].pointAry.length )
                        this._next = 0;

                    // check for collision between the circle and a line formed between the two vertices
                    if( this.lineToCircleCheck(this._transPolygonAry[this._i].pointAry[this._j], this._transPolygonAry[this._i].pointAry[next], this._transPos, this.radius) )
                        return true;
                }

                // Optional: Test if the point is INSIDE the polygon note that this iterates all
                // sides of the polygon again, so only use this if you need to
                if( sprite.collisionComponent.optionalPointCheck )
                {
                    if( this.pointToPolygonCheck( this._transPos, this._transPolygonAry[this._i] ) )
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
            for( this._i = 0; this._i < this._transLineAry.length; ++this._i )
            {
                // Check for collision between the circle and a line formed between the two vertices
                if( this.lineToCircleCheck(this._transLineAry[this._i].head, this._transLineAry[this._i].tail, this._transPos, this.radius) )
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
            for( this._i = 0; this._i < transLineAry.length; ++this._i )
            {
                for( this._j = 0; this._j < this.transLineAry.length; ++this._j )
                {
                    // Check for collision between the circle and a line formed between the two vertices
                    if( this.lineToLineCheck( this.transLineAry[this._j], this._transLineAry[this._i] ) )
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
            for( this._i = 0; this._i < this._transRectAry.length; ++this._i )
            {
                for( this._j = 0; this._j < this.transLineAry.length; ++this._j )
                {
                    if( this.lineToRectCheck( this.transLineAry[this._j], this._transRectAry[this._i] ) )
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
            for( this._line = 0; this._line < this.transLineAry.length; ++this._line )
            {
                for( this._i = 0; this._i < this._transPolygonAry.length; ++this._i )
                {
                    for( this._j = 0; this._j < this._transPolygonAry[this._i].pointAry.length; ++this._j )
                    {
                        // Get next vertex in list. If we've hit the end, wrap around to 0
                        this._next = this._j + 1;
                        if( this._next == this._transPolygonAry[this._i].pointAry.length )
                            this._next = 0;

                        gLine1.head.setXYZ( this._transPolygonAry[this._i].pointAry[this._j].x, this._transPolygonAry[this._i].pointAry[this._j].y );
                        gLine1.tail.setXYZ( this._transPolygonAry[this._i].pointAry[this._next].x, this._transPolygonAry[this._i].pointAry[this._next].y );
                            
                        // check for collision between the line and a polygon line formed between the two vertices
                        if( this.lineToLineCheck( gLine1, this.transLineAry[this._line] ) )
                            return true;
                    }

                    // Optional: Test if the point is INSIDE the polygon note that this iterates all
                    // sides of the polygon again, so only use this if you need to
                    if( sprite.collisionComponent.optionalPointCheck )
                    {
                        if( this.pointToPolygonCheck( this.transLineAry[this._line].head, this._transPolygonAry[this._i] ) )
                            return true;
                        
                        if( this.pointToPolygonCheck( this.transLineAry[this._line].tail, this._transPolygonAry[this._i] ) )
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
            for( this._rect = 0; this._rect < this.transRectAry.length; ++this._rect )
            {
                for( this._i = 0; this._i < this._transPolygonAry.length; ++this._i )
                {
                    for( this._j = 0; this._j < this._transPolygonAry[this._i].pointAry.length; ++this._j )
                    {
                        // Get next vertex in list. If we've hit the end, wrap around to 0
                        this._next = this._j + 1;
                        if( this._next == this._transPolygonAry[this._i].pointAry.length )
                            this._next = 0;

                        gLine1.head.setXYZ( this._transPolygonAry[this._i].pointAry[this._j].x, this._transPolygonAry[this._i].pointAry[this._j].y );
                        gLine1.tail.setXYZ( this._transPolygonAry[this._i].pointAry[this._next].x, this._transPolygonAry[this._i].pointAry[this._next].y );
                            
                        // check for collision between the rect and a polygon line formed between the two vertices
                        if( this.lineToRectCheck( gLine1, this.transRectAry[this._rect] ) )
                            return true;
                    }

                    // Optional: Test if the point is INSIDE the polygon note that this iterates all
                    // sides of the polygon again, so only use this if you need to
                    if( sprite.collisionComponent.optionalPointCheck )
                    {
                        gPoint.setXYZ( this.transRectAry[this._rect].x1, this.transRectAry[this._rect].y1 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[this._i] ) )
                            return true;
                        
                        gPoint.setXYZ( this.transRectAry[this._rect].x2, this.transRectAry[this._rect].y1 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[this._i] ) )
                            return true;

                        gPoint.setXYZ( this.transRectAry[this._rect].x2, this.transRectAry[this._rect].y2 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[this._i] ) )
                            return true;

                        gPoint.setXYZ( this.transRectAry[this._rect].x1, this.transRectAry[this._rect].y2 );
                        if( this.pointToPolygonCheck( gPoint, this._transPolygonAry[this._i] ) )
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

            // Do the narrow phase check
            for( this._poly1 = 0; this._poly1 < this.transPolygonAry.length; ++this._poly1 )
            {
                for( this._point1 = 0; this._point1 < this.transPolygonAry[this._poly1].pointAry.length; ++this._point1 )
                {
                    // Get next vertex in list. If we've hit the end, wrap around to 0
                    this._next1 = this._point1 + 1;
                    if( this._next1 == this.transPolygonAry[this._poly1].pointAry.length )
                        this._next1 = 0;

                    gLine1.head.setXYZ( this.transPolygonAry[this._poly1].pointAry[this._point1].x, this.transPolygonAry[this._poly1].pointAry[this._point1].y );
                    gLine1.tail.setXYZ( this.transPolygonAry[this._poly1].pointAry[this._next1].x, this.transPolygonAry[this._poly1].pointAry[this._next1].y );

                    for( this._poly2 = 0; this._poly2 < this._transPolygonAry.length; ++this._poly2 )
                    {
                        for( this._point2 = 0; this._point2 < this._transPolygonAry[this._poly2].pointAry.length; ++this._point2 )
                        {
                            // Get next vertex in list. If we've hit the end, wrap around to 0
                            this._next2 = this._point2 + 1;
                            if( this._next2 == this._transPolygonAry[this._poly2].pointAry.length )
                                this._next2 = 0;

                            gLine2.head.setXYZ( this._transPolygonAry[this._poly2].pointAry[this._point2].x, this._transPolygonAry[this._poly2].pointAry[this._point2].y );
                            gLine2.tail.setXYZ( this._transPolygonAry[this._poly2].pointAry[this._next2].x, this._transPolygonAry[this._poly2].pointAry[this._next2].y );
                                
                            // check for collision between the rect and a polygon line formed between the two vertices
                            if( this.lineToLineCheck( gLine1, gLine2 ) )
                                return true;

                            // Optional: Test if the point is INSIDE the polygon note that this iterates all
                            // sides of the polygon again, so only use this if you need to
                            if( this.optionalPointCheck )
                            {
                                if( this.pointToPolygonCheck( gLine2.head, this.transPolygonAry[this._poly1] ) )
                                    return true;
                                
                                if( this.pointToPolygonCheck( gLine2.tail, this.transPolygonAry[this._poly1] ) )
                                    return true;
                            }
                        }

                        // Optional: Test if the point is INSIDE the polygon note that this iterates all
                        // sides of the polygon again, so only use this if you need to
                        if( sprite.collisionComponent.optionalPointCheck )
                        {
                            if( this.pointToPolygonCheck( gLine1.head, this._transPolygonAry[poly2] ) )
                                return true;
                            
                            if( this.pointToPolygonCheck( gLine1.tail, this._transPolygonAry[poly2] ) )
                                return true;
                        }
                    }
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
        if( this.sprite.transPos.calcLengthSquared2D( sprite.transPos ) <= (this.radius + sprite.collisionComponent.radius) )
        {
            //console.log(`circleToCircleCheck ${sprite.transPos.x}`);
            return true;
        }
        
        return false;
    }

    // 
    //  DESC: Check for point to polygon collision
    //
    pointToPolygonCheck( point, polygon )
    {
        this._collision = false;

        for( this._ii = 0; this._ii < polygon.pointAry.length; ++this._ii )
        {
            // Get next vertex in list. If we've hit the end, wrap around to 0
            this._next = this._ii + 1;
            if( this._next == polygon.pointAry.length )
                this._next = 0;

            // Go the current and next point
            this._vc = polygon.pointAry[this._ii];
            this._vn = polygon.pointAry[this._next];
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
        // Is either end INSIDE the circle? if so, return true immediately
        if( this.pointToCircleCheck( pointPos1, circlePos, radius ) ||
            this.pointToCircleCheck( pointPos2, circlePos, radius ) )
            return true;
      
        // Get length of the line
        this._distance = pointPos1.calcLengthSquared2D( pointPos2 );
      
        // Get dot product of the line and circle
        this._dot = ( ((circlePos.x-pointPos1.x)*(pointPos2.x-pointPos1.x)) + ((circlePos.y-pointPos1.y)*(pointPos2.y-pointPos1.y)) ) / this._distance;
      
        // Find the closest point on the line
        gPoint.setXYZ(
            pointPos1.x + (dot * (pointPos2.x-pointPos1.x)),
            pointPos1.y + (dot * (pointPos2.y-pointPos1.y)) );

        // !! Commented out because it's too precise to trigger and keeps the below from catching any collision
        // Is this point actually on the line segment?
        // If so keep going, but if not, return false
        //if( !this.lineToPointCheck( pointPos1, pointPos2, closest ) )
        //    return false;

        // Is the circle on the line?
        if( this.pointToCircleCheck( gPoint, circlePos, radius ) )
            return true;

        return false;
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
    lineToLineCheck( line1, line2 )
    {
        this._x1 = line1.head.x;
        this._y1 = line1.head.y;
        this._x2 = line1.tail.x;
        this._y2 = line1.tail.y;
        
        this._x3 = line2.head.x;
        this._y3 = line2.head.y;
        this._x4 = line2.tail.x;
        this._y4 = line2.tail.y;

        // calculate the distance to intersection point
        this._uA = ((this._x4-this._x3)*(this._y1-this._y3) - (this._y4-this._y3)*(this._x1-this._x3)) / ((this._y4-this._y3)*(this._x2-this._x1) - (this._x4-this._x3)*(this._y2-this._y1));
        this._uB = ((this._x2-this._x1)*(this._y1-this._y3) - (this._y2-this._y1)*(this._x1-this._x3)) / ((this._y4-this._y3)*(this._x2-this._x1) - (this._x4-this._x3)*(this._y2-this._y1));
      
        // if uA and uB are between 0-1, lines are colliding
        if( this._uA >= 0 && this._uA <= 1 && this._uB >= 0 && this._uB <= 1 )
            return true;

        return false;
    }

    // 
    //  DESC: Line to line test
    //
    lineToRectCheck( line, rect )
    {
        gLine2.head.setXYZ( rect.x1, rect.y1 );
        gLine2.tail.setXYZ( rect.x2, rect.y1 );

        // Check for collision between the circle and a line formed between the two vertices
        if( this.lineToLineCheck( line, gLine2 ) )
            return true;

        gLine2.head.setXYZ( rect.x2, rect.y1 );
        gLine2.tail.setXYZ( rect.x2, rect.y2 );

        // Check for collision between the circle and a line formed between the two vertices
        if( this.lineToLineCheck( line, gLine2 ) )
            return true;

        gLine2.head.setXYZ( rect.x2, rect.y2 );
        gLine2.tail.setXYZ( rect.x1, rect.y2 );

        // Check for collision between the circle and a line formed between the two vertices
        if( this.lineToLineCheck( line, gLine2 ) )
            return true;

        gLine2.head.setXYZ( rect.x1, rect.y2 );
        gLine2.tail.setXYZ( rect.x1, rect.y1 );

        // Check for collision between the circle and a line formed between the two vertices
        if( this.lineToLineCheck( line, gLine2 ) )
            return true;

        return false;
    }

    // 
    //  DESC: Line to Point test
    //
    /*lineToPointCheck( pointPos1, pointPos2, pos )
    {
        // Get distance from the point to the two ends of the line
        let d1 = pos.calcLengthSquared( pointPos1 );
        let d2 = pos.calcLengthSquared( pointPos2 );
      
        // Get the length of the line
        let lineLen = pointPos1.calcLengthSquared( pointPos2 );
      
        // since floats are so minutely accurate, add
        // a little buffer zone that will give collision
        let buffer = 0.2;    // higher # = less accurate
      
        // if the two distances are equal to the line's
        // length, the point is on the line!
        // note we use the buffer here to give a range, rather
        // than one #
        if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer)
            return true;

        return false;
    }*/
}