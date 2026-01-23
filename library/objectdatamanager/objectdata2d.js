
// 
//  FILE NAME: objectdata2d.js
//  DESC:      Class that holds a 2D object data
//

"use strict";

import { iObjectData } from './iobjectdata';
import { ObjectPhysicsData2D } from './objectphysicsdata2d';
import { ObjectVisualData2D } from './objectvisualdata2d';
import { ObjectCollisionData2D } from './objectcollision2d';
import { Size } from '../common/size';
import * as parseHelper from '../utilities/xmlparsehelper';

export class ObjectData2D extends iObjectData
{
    constructor()
    {
        super();

        // Visual data of the object
        this.visualData = new ObjectVisualData2D;

        // Physics data of the object
        this.physicsData = new ObjectPhysicsData2D;

        // Collision data of the object
        this.collisionData = new ObjectCollisionData2D;

        // The name of the object data
        this.name = null;

        // The group the object data is in
        this.group = null;

        // The initial size of the object
        this.size = new Size;

        // The radius
        this.radius = 0.0;
        this.radiusSquared = 0.0;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.visualData.copy( obj.visualData );
        this.physicsData.copy( obj.physicsData );
        this.collisionData.copy( obj.collisionData );
        this.size.copy( obj.size );
    }
    
    // 
    //  DESC: Load the object data from the passed in node
    //
    loadObjData( node, group, name )
    {
        this.name = name;
        this.group = group;

        // Load the size
        this.size = parseHelper.loadSize( node, this.size );

        // Load the visual data
        this.visualData.loadObjData( node );

        // Load the physics data
        this.physicsData.loadObjData( node );

        // Load the collision data
        this.collisionData.loadObjData( node );
    }
    
    // 
    //  DESC: Create OpenGL objects from data
    //
    createFromData( group )
    {
        // Create the visuales
        this.visualData.createFromData( group, this.size );

        this.radiusSquared = this.size.getLengthSquared() / 2;
        this.radius = this.size.getLength() / 2;
    }

    // 
    //  DESC: Is this 2D object data?
    //
    is2D()
    {
        return true;
    }

    // 
    //  DESC: Dispose of resources
    //
    dispose()
    {
        if( this.visualData && this.visualData.dispose )
            this.visualData.dispose();

        if( this.physicsData && this.physicsData.dispose )
            this.physicsData.dispose();

        if( this.collisionData && this.collisionData.dispose )
            this.collisionData.dispose();
    }
}
