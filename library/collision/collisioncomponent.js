//
//  FILE NAME: collisioncomponent.js
//  DESC:      Class for handling collision data
//

"use strict";

import { Rect } from '../common/rect';
import * as parseHelper from '../utilities/xmlparsehelper';

export const COL_NULL  = 0,
             COL_RECT  = 1,
             COL_TRY   = 2,
             COL_POINT = 3;

export class CollisionComponent
{
    constructor( xmlNode, node )
    {
        // xmlNode from the base node level
        this.xmlNode = xmlNode;

        // Object to use for matrix and size
        this.node = node;

        // Object to use for matrix and size
        this.obj = node.get();

        // Matrix to do the transformation with
        this.matrix = node.get().matrix;

        // Data type
        this.type = COL_NULL;

        // Enable flag
        this.enable = false;

        // Collision data
        this.data = null;

        // Translated collision data
        this.trans = null;

        // Callback function for when a collision is detected
        this.callbackFunc = null;
    }

    // 
    //  DESC: Init the collision
    //
    init()
    {
        for( let i = 0; i < this.xmlNode.children.length; ++i )
        {
            if( this.xmlNode.children[i].nodeName == 'AABB' )
            {
                this.type = COL_RECT;
                this.data = [];
                this.trans = [];

                let attr = this.xmlNode.children[i].getAttribute( 'enable' );
                if( attr )
                {
                    this.enable = (attr === 'true');
                }

                attr = this.xmlNode.children[i].getAttribute( 'radius' );
                if( attr )
                {
                    this.radius = Number(attr);
                }

                let nodeAry = this.xmlNode.children[i].getElementsByTagName( 'rect' );

                for( let j = 0; j < nodeAry.length; ++j )
                {
                    this.data.push( parseHelper.loadRectFromChild( nodeAry[j] ) );
                    this.trans.push( new Rect );
                    this.trans[j].copy( this.data[j] );
                }

                break;
            }
        }
    }

    // 
    //  DESC: Transform the rects for collision
    //
    transform()
    {
        if( this.enable )
        {
            if( this.type == COL_RECT )
            {
                for( let i = 0; i < this.data.length; ++i )
                    this.matrix.transformRect( this.trans[i], this.data[i] );
            }
        }
    }

    // 
    //  DESC: Check for collision
    //
    checkForCollision( node )
    {
        if( this.enable && node.collisionComponent && node.collisionComponent.enable )
        {
            // Do the broad phase check
            let obj = node.collisionComponent.obj;
            if( this.obj.transPos.calcLength2D( obj.transPos ) <= (this.node.radius + node.radius) )
            {
            }
        }
    }
}

// 
//  DESC: Function to check collision detection has been defined
//
export function isCollision( xmlNode )
{
    for( let i = 0; i < xmlNode.children.length; ++i )
    {
        if( xmlNode.children[i].nodeName == 'AABB' )
        {
            if( xmlNode.children[i].getElementsByTagName( 'rect' ) )
                return true;
        }
    }

    return false;
}
