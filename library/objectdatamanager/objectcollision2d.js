
// 
//  FILE NAME:  objectcollision2d.js
//  DESC:       Class containing the object's collision data
//

"use strict";

import * as parseHelper from '../utilities/xmlparsehelper';
import { Line } from '../common/line';
import { Rect } from '../common/rect';
import { Polygon } from '../common/polygon';
import * as defs from '../common/defs';

export class ObjectCollisionData2D
{
    constructor()
    {
        // Data type
        this.type = defs.ECT_NULL;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.type = obj.type;

        this.radius = obj.radius;
        this.radiusFromVisual = obj.radiusFromVisual;
        this.radiusModifier = obj.radiusModifier;
        
        if( obj.type === defs.ECT_LINE )
        {
            this.pointsToModelView = obj.pointsToModelView;
            this.lineAry = [];

            for( let i = 0; i < obj.lineAry.length; ++i )
                this.lineAry.push( new Line( obj.lineAry[i] ) )
        }
        else if( obj.type === defs.ECT_RECT )
        {
            this.rectToModelView = obj.rectToModelView;

            for( let i = 0; i < obj.rectAry.length; ++i )
                this.rectAry.push( new Rect(obj.rectAry[i]) );
        }
        else if( obj.type === defs.ECT_POLYGON )
        {
            this.pointsToModelView = obj.pointsToModelView;
            this.optionalPointCheck = obj.optionalPointCheck;
            this.polygonAry = [];

            for( let i = 0; i < obj.polygonAry.length; ++i )
                this.polygonAry.push( new Polygon( obj.polygonAry[i] ) )
        }
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( xmlNode )
    {
        let collisionNode = xmlNode.getElementsByTagName( 'collision' );

        // Check if the object has any collision data
        if( collisionNode.length )
        {
            this.filterCategoryBits = 0x00000001;
            this.filterMaskBits = 0xFFFFFFFF;
            this.collisionSignal = false;

            let attr = collisionNode[0].getAttribute( 'filterCategoryBits' );
            if( attr )
            {
                this.filterCategoryBits = Number(attr);
            }

            attr = collisionNode[0].getAttribute( 'filterMaskBits' );
            if( attr )
            {
                this.filterMaskBits = Number(attr);
            }

            attr = collisionNode[0].getAttribute( 'collisionSignal' );
            if( attr )
            {
                this.collisionSignal = (attr === 'true');
            }

            // Load the radius data
            this.loadRadiusData( collisionNode[0].children[0] );

            if( collisionNode[0].children[0].nodeName == 'lineList' )
                this.loadLineData( collisionNode[0].children[0] );

            else if( collisionNode[0].children[0].nodeName == 'rectList' )
                this.loadRectData( collisionNode[0].children[0] );

            else if( collisionNode[0].children[0].nodeName == 'circle' )
                this.type = defs.ECT_CIRCLE;

            else if( collisionNode[0].children[0].nodeName == 'pointList' )
                this.loadPointData( collisionNode[0].children[0] );

            else if( collisionNode[0].children[0].nodeName == 'polygonList' )
                this.loadPolygonData( collisionNode[0].children[0] );
        }
    }

    // 
    //  DESC: Load the radius data
    //
    loadRadiusData( xmlNode )
    {
        this.radius = -1;
        let attr = xmlNode.getAttribute( 'radius' );
        if( attr )
        {
            // Radius is calculated in square space
            this.radius = Number(attr) * Number(attr);
        }

        this.radiusFromVisual = false;
        attr = xmlNode.getAttribute( 'radiusFromVisual' );
        if( attr )
        {
            this.radiusFromVisual = (attr === 'true');
        }

        this.radiusModifier = 0;
        attr = xmlNode.getAttribute( 'radiusModifier' );
        if( attr )
        {
            // Modifer is calculated in square space
            this.radiusModifier = Number(attr) * Number(attr);
        }
    }

    // 
    //  DESC: Load the line data
    //
    loadLineData( xmlNode )
    {
        this.type = defs.ECT_LINE;
        this.lineAry = [];

        this.pointsToModelView = false;
        let attr = xmlNode.getAttribute( 'pointsToModelView' );
        if( attr )
        {
            this.pointsToModelView = (attr === 'true');
        }

        let lineNodeAry = xmlNode.getElementsByTagName( 'line' );
        for( let i = 0; i < lineNodeAry.length; ++i )
            this.lineAry.push( parseHelper.loadLine( lineNodeAry[i] ) );
    }

    // 
    //  DESC: Load the AABB data
    //
    loadRectData( xmlNode )
    {
        this.type = defs.ECT_RECT;

        this.rectFromVisual = false;
        let attr = xmlNode.getAttribute( 'rectFromVisual' );
        if( attr )
        {
            this.rectFromVisual = (attr === 'true');
        }

        this.rectAsSizeModifier = false;
        attr = xmlNode.getAttribute( 'rectAsSizeModifier' );
        if( attr )
        {
            this.rectAsSizeModifier = (attr === 'true');
        }

        this.rectToModelView = false;
        attr = xmlNode.getAttribute( 'rectToModelView' );
        if( attr )
        {
            this.rectToModelView = (attr === 'true');
        }

        // Load any rects
        this.rectAry = [];
        let rectNodeAry = xmlNode.getElementsByTagName( 'rect' );
        for( let i = 0; i < rectNodeAry.length; ++i )
            this.rectAry.push( parseHelper.loadRectFromChild( rectNodeAry[i] ) );
    }

    // 
    //  DESC: Load the polygon data
    //
    loadPolygonData( xmlNode )
    {
        this.type = defs.ECT_POLYGON;
        this.polygonAry = [];

        this.pointsToModelView = false;
        let attr = xmlNode.getAttribute( 'pointsToModelView' );
        if( attr )
        {
            this.pointsToModelView = (attr === 'true');
        }

        this.optionalPointCheck = false;
        attr = xmlNode.getAttribute( 'optionalPointCheck' );
        if( attr )
        {
            this.optionalPointCheck = (attr === 'true');
        }

        let polygonNodeAry = xmlNode.getElementsByTagName( 'polygon' );
        for( let i = 0; i < polygonNodeAry.length; ++i )
            this.polygonAry.push( parseHelper.loadPolygon( polygonNodeAry[i] ) );
    }

    // 
    //  DESC: Load the point data
    //
    loadPointData( xmlNode )
    {
        this.type = defs.ECT_POINT;
        this.pointAry = [];

        this.pointsToModelView = false;
        let attr = xmlNode.getAttribute( 'pointsToModelView' );
        if( attr )
        {
            this.pointsToModelView = (attr === 'true');
        }

        let pointNodeAry = xmlNode.getElementsByTagName( 'point' );
        for( let i = 0; i < pointNodeAry.length; ++i )
            this.pointAry.push( parseHelper.loadPoint( pointNodeAry[i] ) );
    }
    
    // 
    //  DESC: Is this collision active
    //
    isActive()
    {
        return (this.type !== defs.ECT_NULL);
    }

    // 
    //  DESC: Dispose of collision resources
    //
    dispose()
    {
        this.type = defs.ECT_NULL;

        if( this.lineAry )
            this.lineAry = [];

        if( this.rectAry )
            this.rectAry = [];

        if( this.polygonAry )
            this.polygonAry = [];

        if( this.pointAry )
            this.pointAry = [];
    }
}
