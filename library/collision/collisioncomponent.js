//
//  FILE NAME: collisioncomponent.js
//  DESC:      Class for handling collision data
//             NOTE: Works in squared space
//             The more complex checks were lifted from: http://jeffreythompson.org/collision-detection/
//

"use strict";

import { Point } from '../common/point';
import { Line } from '../common/line';
import { Rect } from '../common/rect';
import { Polygon } from '../common/polygon';
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

        // Callback function for when a collision is detected
        this.callbackFunc = null;

        if( objectData.collisionData.isActive() )
        {
            this.type = objectData.collisionData.type;
            this.enable = true;
            this.filterCategoryBits = objectData.collisionData.filterCategoryBits;
            this.filterMaskBits = objectData.collisionData.filterMaskBits;

            // Load the radius data
            this.loadRadiusData( objectData );

            if( objectData.collisionData.type === defs.ECT_LINE )
                this.loadLineData( objectData );

            if( objectData.collisionData.type === defs.ECT_RECT )
                this.loadRectData( objectData );

            else if( objectData.collisionData.type === defs.ECT_POLYGON )
                this.loadPolygonData( objectData );
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
        }
    }

    // 
    //  DESC: Check for collision
    //
    checkForCollision( nodeAry )
    {
        if( this.enable )
        {
            let result = false;
            
            for( let node = 0; node < nodeAry.length; ++node )
            {
                let sprite = nodeAry[node].sprite;

                if( sprite && sprite.collisionComponent && sprite.collisionComponent.enable && (this.filterMaskBits & sprite.collisionComponent.filterCategoryBits) )
                {
                    if( this.type === defs.ECT_POINT )
                    {
                        if( sprite.collisionComponent.type === defs.ECT_CIRCLE )
                        {
                            result = this.pointToCircleCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_RECT )
                        {
                            result = this.pointToRectCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_POLYGON )
                        {
                            result = this.pointToPolygonCollision( sprite );
                        }
                    }
                    else if( this.type === defs.ECT_CIRCLE )
                    {
                        if( sprite.collisionComponent.type === defs.ECT_POINT )
                        {
                            result = sprite.collisionComponent.pointToCircleCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_CIRCLE )
                        {
                            result = this.circleToCircleCheck( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_RECT )
                        {
                            result = this.circleToRectCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_POLYGON )
                        {
                            result = this.circleToPolygonCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_LINE )
                        {
                            result = this.circleToLineCollision( sprite );
                        }
                    }
                    else if( this.type === defs.ECT_LINE )
                    {
                        if( sprite.collisionComponent.type === defs.ECT_CIRCLE )
                        {
                            result = sprite.collisionComponent.circleToLineCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_LINE )
                        {
                            result = this.lineToLineCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_RECT )
                        {
                            result = this.lineToRectCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_POLYGON )
                        {
                            result = this.lineToPolygonCollision( sprite );
                        }
                    }
                    else if( this.type === defs.ECT_RECT )
                    {
                        if( sprite.collisionComponent.type === defs.ECT_POINT )
                        {
                            result = sprite.collisionComponent.pointToRectCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_CIRCLE )
                        {
                            result = sprite.collisionComponent.circleToRectCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_RECT )
                        {
                            result = this.rectToRectCollision( sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_LINE )
                        {
                            result = sprite.collisionComponent.lineToRectCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_POLYGON )
                        {
                            result = this.rectToPolygonCollision( sprite );
                        }
                    }
                    else if( this.type === defs.ECT_POLYGON )
                    {
                        if( sprite.collisionComponent.type === defs.ECT_POINT )
                        {
                            result = sprite.collisionComponent.pointToPolygonCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_CIRCLE )
                        {
                            result = sprite.collisionComponent.circleToPolygonCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_RECT )
                        {
                            result = sprite.collisionComponent.rectToPolygonCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_LINE )
                        {
                            result = sprite.collisionComponent.lineToPolygonCollision( this.sprite );
                        }
                        else if( sprite.collisionComponent.type === defs.ECT_POLYGON )
                        {
                            result = this.polygonToPolygonCollision( sprite );
                        }
                    }

                    if( result )
                    {
                        if( this.callbackFunc )
                                this.callbackFunc(this.sprite, sprite);

                        if( sprite.collisionComponent.callbackFunc )
                            sprite.collisionComponent.callbackFunc(sprite, this.sprite);
                        
                        return sprite;
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
        return this.pointToCircleCheck( this.sprite.transPos, sprite.transPos, sprite.collisionComponent.radius );
    }

    // 
    //  DESC: Check for rect to rect collision
    //
    rectToRectCollision( sprite )
    {
        // Do the broad phase check
        if( this.circleToCircleCheck( sprite ) )
        {
            let transRectAry = sprite.collisionComponent.transRectAry;

            // Do the narrow phase check
            for( let i = 0; i < transRectAry.length; ++i )
            {
                for( let j = 0; j < this.transRectAry.length; ++j )
                {
                    if( this.transRectAry[j].x1 < transRectAry[i].x2 &&
                        this.transRectAry[j].x2 > transRectAry[i].x1 &&
                        this.transRectAry[j].y1 > transRectAry[i].y2 &&
                        this.transRectAry[j].y2 < transRectAry[i].y1 )
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
            let transRectAry = sprite.collisionComponent.transRectAry;
            let transPos = this.sprite.transPos;

            // Do the narrow phase check
            for( let i = 0; i < transRectAry.length; ++i )
            {
                // Find the edge the point is out side of
                let edgeX = transPos.x;
                let edgeY = transPos.y;

                if( transPos.x < transRectAry[i].x1 )
                    edgeX = transRectAry[i].x1;
                else if( transPos.x > transRectAry[i].x2 )
                    edgeX = transRectAry[i].x2;

                if( transPos.y < transRectAry[i].y2 )
                    edgeY = transRectAry[i].y2;
                else if( transPos.y > transRectAry[i].y1 )
                    edgeY = transRectAry[i].y1;
                
                // Get distance from closest edges
                let distX = transPos.x - edgeX;
                let distY = transPos.y - edgeY;
                let distance = (distX * distX) + (distY * distY);

                if( distance <= this.radius )
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
            let transPos = this.sprite.transPos;
            let transRectAry = sprite.collisionComponent.transRectAry;

            // Just do the narrow phase check
            for( let i = 0; i < transRectAry.length; ++i )
            {
                if( !(transPos.x < transRectAry[i].x1 || transPos.x > transRectAry[i].x2 ||
                    transPos.y > transRectAry[i].y1 || transPos.y < transRectAry[i].y2) )
                    return true;
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
            let transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let i = 0; i < transPolygonAry.length; ++i )
                return this.pointToPolygonCheck( this.sprite.transPos, transPolygonAry[i] );
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
            let transPos = this.sprite.transPos;
            let transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let i = 0; i < transPolygonAry.length; ++i )
            {
                for( let j = 0; j < transPolygonAry[i].pointAry.length; ++j )
                {
                    // Get next vertex in list. If we've hit the end, wrap around to 0
                    let next = j + 1;
                    if( next == transPolygonAry[i].pointAry.length )
                        next = 0;

                    // check for collision between the circle and a line formed between the two vertices
                    if( this.lineToCircleCheck(transPolygonAry[i].pointAry[j], transPolygonAry[i].pointAry[next], transPos, this.radius) )
                        return true;
                }

                // Optional: Test if the point is INSIDE the polygon note that this iterates all
                // sides of the polygon again, so only use this if you need to
                if( sprite.collisionComponent.optionalPointCheck )
                {
                    if( this.pointToPolygonCheck( transPos, transPolygonAry[i] ) )
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
            let transPos = this.sprite.transPos;
            let transLineAry = sprite.collisionComponent.transLineAry;

            // Do the narrow phase check
            for( let i = 0; i < transLineAry.length; ++i )
            {
                // Check for collision between the circle and a line formed between the two vertices
                if( this.lineToCircleCheck(transLineAry[i].head, transLineAry[i].tail, transPos, this.radius) )
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
            let transLineAry = sprite.collisionComponent.transLineAry;

            // Do the narrow phase check
            for( let i = 0; i < transLineAry.length; ++i )
            {
                for( let j = 0; j < this.transLineAry.length; ++j )
                {
                    // Check for collision between the circle and a line formed between the two vertices
                    if( this.lineToLineCheck( this.transLineAry[j], transLineAry[i] ) )
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
            let transRectAry = sprite.collisionComponent.transRectAry;

            // Do the narrow phase check
            for( let i = 0; i < transRectAry.length; ++i )
            {
                for( let j = 0; j < this.transLineAry.length; ++j )
                {
                    if( this.lineToRectCheck( this.transLineAry[j], transRectAry[i] ) )
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
            let transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let line = 0; line < this.transLineAry.length; ++line )
            {
                for( let i = 0; i < transPolygonAry.length; ++i )
                {
                    for( let j = 0; j < transPolygonAry[i].pointAry.length; ++j )
                    {
                        // Get next vertex in list. If we've hit the end, wrap around to 0
                        let next = j + 1;
                        if( next == transPolygonAry[i].pointAry.length )
                            next = 0;

                        gLine1.head.setXYZ( transPolygonAry[i].pointAry[j].x, transPolygonAry[i].pointAry[j].y );
                        gLine1.tail.setXYZ( transPolygonAry[i].pointAry[next].x, transPolygonAry[i].pointAry[next].y );
                            
                        // check for collision between the line and a polygon line formed between the two vertices
                        if( this.lineToLineCheck( gLine1, this.transLineAry[line] ) )
                            return true;
                    }

                    // Optional: Test if the point is INSIDE the polygon note that this iterates all
                    // sides of the polygon again, so only use this if you need to
                    if( sprite.collisionComponent.optionalPointCheck )
                    {
                        if( this.pointToPolygonCheck( this.transLineAry[line].head, transPolygonAry[i] ) )
                            return true;
                        
                        if( this.pointToPolygonCheck( this.transLineAry[line].tail, transPolygonAry[i] ) )
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
            let transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let rect = 0; rect < this.transRectAry.length; ++rect )
            {
                for( let i = 0; i < transPolygonAry.length; ++i )
                {
                    for( let j = 0; j < transPolygonAry[i].pointAry.length; ++j )
                    {
                        // Get next vertex in list. If we've hit the end, wrap around to 0
                        let next = j + 1;
                        if( next == transPolygonAry[i].pointAry.length )
                            next = 0;

                        gLine1.head.setXYZ( transPolygonAry[i].pointAry[j].x, transPolygonAry[i].pointAry[j].y );
                        gLine1.tail.setXYZ( transPolygonAry[i].pointAry[next].x, transPolygonAry[i].pointAry[next].y );
                            
                        // check for collision between the rect and a polygon line formed between the two vertices
                        if( this.lineToRectCheck( gLine1, this.transRectAry[rect] ) )
                            return true;
                    }

                    // Optional: Test if the point is INSIDE the polygon note that this iterates all
                    // sides of the polygon again, so only use this if you need to
                    if( sprite.collisionComponent.optionalPointCheck )
                    {
                        gPoint.setXYZ( this.transRectAry[rect].x1, this.transRectAry[rect].y1 );
                        if( this.pointToPolygonCheck( gPoint, transPolygonAry[i] ) )
                            return true;
                        
                        gPoint.setXYZ( this.transRectAry[rect].x2, this.transRectAry[rect].y1 );
                        if( this.pointToPolygonCheck( gPoint, transPolygonAry[i] ) )
                            return true;

                        gPoint.setXYZ( this.transRectAry[rect].x2, this.transRectAry[rect].y2 );
                        if( this.pointToPolygonCheck( gPoint, transPolygonAry[i] ) )
                            return true;

                        gPoint.setXYZ( this.transRectAry[rect].x1, this.transRectAry[rect].y2 );
                        if( this.pointToPolygonCheck( gPoint, transPolygonAry[i] ) )
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
            let transPolygonAry = sprite.collisionComponent.transPolygonAry;

            // Do the narrow phase check
            for( let poly1 = 0; poly1 < this.transPolygonAry.length; ++poly1 )
            {
                for( let point1 = 0; point1 < this.transPolygonAry[poly1].pointAry.length; ++point1 )
                {
                    // Get next vertex in list. If we've hit the end, wrap around to 0
                    let next1 = point1 + 1;
                    if( next1 == this.transPolygonAry[poly1].pointAry.length )
                        next1 = 0;

                    gLine1.head.setXYZ( this.transPolygonAry[poly1].pointAry[point1].x, this.transPolygonAry[poly1].pointAry[point1].y );
                    gLine1.tail.setXYZ( this.transPolygonAry[poly1].pointAry[next1].x, this.transPolygonAry[poly1].pointAry[next1].y );

                    for( let poly2 = 0; poly2 < transPolygonAry.length; ++poly2 )
                    {
                        for( let point2 = 0; point2 < transPolygonAry[poly2].pointAry.length; ++point2 )
                        {
                            // Get next vertex in list. If we've hit the end, wrap around to 0
                            let next2 = point2 + 1;
                            if( next2 == transPolygonAry[poly2].pointAry.length )
                                next2 = 0;

                            gLine2.head.setXYZ( transPolygonAry[poly2].pointAry[point2].x, transPolygonAry[poly2].pointAry[point2].y );
                            gLine2.tail.setXYZ( transPolygonAry[poly2].pointAry[next2].x, transPolygonAry[poly2].pointAry[next2].y );
                                
                            // check for collision between the rect and a polygon line formed between the two vertices
                            if( this.lineToLineCheck( gLine1, gLine2 ) )
                                return true;

                            // Optional: Test if the point is INSIDE the polygon note that this iterates all
                            // sides of the polygon again, so only use this if you need to
                            if( this.optionalPointCheck )
                            {
                                if( this.pointToPolygonCheck( gLine2.head, this.transPolygonAry[poly1] ) )
                                    return true;
                                
                                if( this.pointToPolygonCheck( gLine2.tail, this.transPolygonAry[poly1] ) )
                                    return true;
                            }
                        }

                        // Optional: Test if the point is INSIDE the polygon note that this iterates all
                        // sides of the polygon again, so only use this if you need to
                        if( sprite.collisionComponent.optionalPointCheck )
                        {
                            if( this.pointToPolygonCheck( gLine1.head, transPolygonAry[poly2] ) )
                                return true;
                            
                            if( this.pointToPolygonCheck( gLine1.tail, transPolygonAry[poly2] ) )
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
            return true;
        
        return false;
    }

    // 
    //  DESC: Check for point to polygon collision
    //
    pointToPolygonCheck( point, polygon )
    {
        let collision = false;

        for( let i = 0; i < polygon.pointAry.length; ++i )
        {
            // Get next vertex in list. If we've hit the end, wrap around to 0
            let next = i + 1;
            if( next == polygon.pointAry.length )
                next = 0;

            // Ge the current and next point
            let vc = polygon.pointAry[i];
            let vn = polygon.pointAry[next];
            let px = point.x;
            let py = point.y;

            // compare position, flip 'collision' variable back and forth
            if( ((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
                (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x) )
            {
                collision = !collision;
            }
        }

        return collision;
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
        let distance = pointPos1.calcLengthSquared2D( pointPos2 );
      
        // Get dot product of the line and circle
        let dot = ( ((circlePos.x-pointPos1.x)*(pointPos2.x-pointPos1.x)) + ((circlePos.y-pointPos1.y)*(pointPos2.y-pointPos1.y)) ) / distance;
      
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
        let x1 = line1.head.x;
        let y1 = line1.head.y;
        let x2 = line1.tail.x;
        let y2 = line1.tail.y;
        
        let x3 = line2.head.x;
        let y3 = line2.head.y;
        let x4 = line2.tail.x;
        let y4 = line2.tail.y;

        // calculate the distance to intersection point
        let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
        let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
      
        // if uA and uB are between 0-1, lines are colliding
        if( uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1 )
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