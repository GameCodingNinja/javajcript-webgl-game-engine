
// 
//  FILE NAME: xmlparsehelper.js
//  DESC:      General xml parse helper functions
//             NOTE: Nonexistant attributes return null
//

"use strict";
import { Color } from '../common/color';
import { Size } from '../common/size';
import { Point } from '../common/point';
import { Rect } from '../common/rect';
import { Vertex2d } from '../common/vertex2d';
import { DynamicOffset } from '../common/dynamicoffset';
import * as defs from '../common/defs';

// 
//  DESC: Load the 2d vertex
//
export function loadVertex2d( xmlNode )
{
    if( xmlNode )
    {
        let vert2d = new Vertex2d;
        
        let attr = xmlNode.getAttribute('x');
        if( attr )
            vert2d.x = Number( attr );

        attr = xmlNode.getAttribute('y');
        if( attr )
            vert2d.y = Number( attr );

        attr = xmlNode.getAttribute('z');
        if( attr )
            vert2d.z = Number( attr );

        attr = xmlNode.getAttribute('u');
        if( attr )
            vert2d.u = Number( attr );

        attr = xmlNode.getAttribute('v');
        if( attr )
            vert2d.v = Number( attr );
        
        return vert2d;
    }

    return null;
}

// 
//  DESC: Load the position
//
export function loadPosition( xmlNode )
{
    let positionNode = xmlNode.getElementsByTagName( 'position' );

    if( positionNode.length )
    {
        let point = new Point;
        
        let attr = positionNode[0].getAttribute( 'x' );
        if( attr )
            point.x = Number( attr );
        
        attr = positionNode[0].getAttribute( 'y' );
        if( attr )
            point.y = Number( attr );
        
        attr = positionNode[0].getAttribute( 'z' );
        if( attr )
            point.z = Number( attr );
        
        return point;
    }

    return null;
}

// 
//  DESC: Load the position
//
export function loadRotation( xmlNode )
{
    let rotationNode = xmlNode.getElementsByTagName( 'rotation' );

    if( rotationNode.length )
    {
        let rotation = new Point;
        
        let attr = rotationNode[0].getAttribute( 'x' );
        if( attr )
            rotation.x = Number( attr );
        
        attr = rotationNode[0].getAttribute( 'y' );
        if( attr )
            rotation.y = Number( attr );
        
        attr = rotationNode[0].getAttribute( 'z' );
        if( attr )
            rotation.z = Number( attr );
        
        return rotation;
    }

    return null;
}

// 
//  DESC: Load the scale
//
export function loadScale( xmlNode )
{
    let scaleNode = xmlNode.getElementsByTagName( 'scale' );

    if( scaleNode.length )
    {
        let scale = new Point;
        
        let attr = scaleNode[0].getAttribute( 'x' );
        if( attr )
            scale.x = Number( attr );
        
        attr = scaleNode[0].getAttribute( 'y' );
        if( attr )
            scale.y = Number( attr );
        
        attr = scaleNode[0].getAttribute( 'z' );
        if( attr )
            scale.z = Number( attr );
        
        return scale;
    }

    return null;
}

// 
//  DESC: Load the center position
//
export function loadCenterPos( xmlNode )
{
    let centerPosNode = xmlNode.getElementsByTagName( 'centerPos' );

    if( centerPosNode.length )
    {
        let centerPos = new Point;
        
        let attr = centerPosNode[0].getAttribute( 'x' );
        if( attr )
            centerPos.x = Number( attr );
        
        attr = centerPosNode[0].getAttribute( 'y' );
        if( attr )
            centerPos.y = Number( attr );
    
        attr = centerPosNode[0].getAttribute( 'z' );
        if( attr )
            centerPos.z = Number( attr );
        
        return centerPos;
    }

    return null;
}

// 
//  DESC: Load the generic x, y, z values
//
export function loadXYZ( xmlNode )
{
    let point = new Point;

    let attr = xmlNode.getAttribute('x');
    if( attr )
        point.x = Number( attr );

    attr = xmlNode.getAttribute('y');
    if( attr )
        point.y = Number( attr );

    attr = xmlNode.getAttribute('z');
    if( attr )
        point.z = Number( attr );

    return point;

}   // LoadScale

// 
//  DESC: Load the color
//
export function loadColor( xmlNode, currentColor = null )
{
    let color = new Color;
    
    if( currentColor )
        color.copy( currentColor );

    let colorNode = xmlNode.getElementsByTagName( 'color' );
    if( colorNode.length )
    {
        let attr = colorNode[0].getAttribute('r');
        if( attr )
            color.r = Number(attr);

        attr = colorNode[0].getAttribute('g');
        if( attr )
            color.g = Number(attr);

        attr = colorNode[0].getAttribute('b');
        if( attr )
            color.b = Number(attr);

        attr = colorNode[0].getAttribute('a');
        if( attr )
            color.a = Number(attr);

        // Convert if in RGBA format
        color.convert();
    }

    return color;
}

// 
//  DESC: Load the size
//
export function loadSize( xmlNode, currentSize = null )
{
    let size = new Size;
    
    if( currentSize )
        size.copy( currentSize );

    let sizeNode = xmlNode.getElementsByTagName( 'size' );
    if( sizeNode.length )
    {
        let attr = sizeNode[0].getAttribute('width');
        if( attr )
            size.w = Number(attr);

        attr = sizeNode[0].getAttribute('height');
        if( attr )
            size.h = Number(attr);
    }

    return size;
}

// 
//  DESC: Load the rect
//
export function loadRect( xmlNode )
{
    let rectNode = xmlNode.getElementsByTagName( 'rect' );
    
    if( rectNode.length )
        return loadRectFromChild( rectNode[0] );

    return new Rect;
}

export function loadRectFromChild( xmlNode )
{
    let rect = new Rect;
    
    let attr = xmlNode.getAttribute('x1');
        if( attr )
            rect.x1 = Number(attr);
        
    attr = xmlNode.getAttribute('y1');
        if( attr )
            rect.y1 = Number(attr);
        
    attr = xmlNode.getAttribute('x2');
        if( attr )
            rect.x2 = Number(attr);

    attr = xmlNode.getAttribute('y2');
        if( attr )
            rect.y2 = Number(attr);

    return rect;
}

// 
//  DESC: Load the horizontal alignment
//
export function loadHorzAlignment( xmlNode, aHorzAlign )
{
    let horzAlign = aHorzAlign;

    let horzAlignAttr = xmlNode.getAttribute( 'horzAlign' );
    if( horzAlignAttr )
    {
        if( horzAlignAttr === 'left' )
            horzAlign = defs.EHA_HORZ_LEFT;

        else if( horzAlignAttr === 'center' )
            horzAlign = defs.EHA_HORZ_CENTER;

        else if( horzAlignAttr === 'right' )
            horzAlign = defs.EHA_HORZ_RIGHT;
    }

    return horzAlign;
}

// 
//  DESC: Load the vertical alignment
//
export function loadVertAlignment( xmlNode, aVertAlign )
{
    let vertAlign = aVertAlign;

    let vertAlignAttr = xmlNode.getAttribute( 'vertAlign' );
    if( vertAlignAttr )
    {
        if( vertAlignAttr === 'top' )
            vertAlign = defs.EVA_VERT_TOP;

        else if( vertAlignAttr === 'center' )
            vertAlign = defs.EVA_VERT_CENTER;

        else if( vertAlignAttr === 'bottom' )
            vertAlign = defs.EVA_VERT_BOTTOM;
    }

    return vertAlign;
}

// 
//  DESC: Load the dynamic offset
//
export function loadDynamicOffset( xmlNode )
{
    let dynamicOffsetNode = xmlNode.getElementsByTagName( 'dynamicOffset' );

    if( dynamicOffsetNode.length )
    {
        let dynamicOffset = new DynamicOffset;
        
        let attr = dynamicOffsetNode[0].getAttribute('left');
        if( attr )
        {
            dynamicOffset.add( defs.EDO_LEFT );
            dynamicOffset.setX( Number( attr ) );
        }
        else
        {
            attr = dynamicOffsetNode[0].getAttribute('right');
            if( attr )
            {
                dynamicOffset.add( defs.EDO_RIGHT );
                dynamicOffset.setX( Number( attr ) );
            }
            else
            {
                attr = dynamicOffsetNode[0].getAttribute('horzCenter');
                if( attr )
                {
                    dynamicOffset.add( defs.EDO_HORZ_CENTER );
                    dynamicOffset.setX( Number( attr ) );
                }
            }
        }
        
        attr = dynamicOffsetNode[0].getAttribute('top');
        if( attr )
        {
            dynamicOffset.add( defs.EDO_TOP );
            dynamicOffset.setY( Number( attr ) );
        }
        else
        {
            attr = dynamicOffsetNode[0].getAttribute('bottom');
            if( attr )
            {
                dynamicOffset.add( defs.EDO_BOTTOM );
                dynamicOffset.setY( Number( attr ) );
            }
            else
            {
                attr = dynamicOffsetNode[0].getAttribute('vertCenter');
                if( attr )
                {
                    dynamicOffset.add( defs.EDO_VERT_CENTER );
                    dynamicOffset.setX( Number( attr ) );
                }
            }
        }
        
        return dynamicOffset;
    }

    return null;
}
