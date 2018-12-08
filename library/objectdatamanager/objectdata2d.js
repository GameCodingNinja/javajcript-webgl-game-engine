
// 
//  FILE NAME: objectdata2d.js
//  DESC:      Class that holds a 2D object data
//

"use strict";

import { ObjectPhysicsData2D } from './objectphysicsdata2d';
import { ObjectVisualData2D } from './objectvisualdata2d';
import { Size } from '../common/size';
import * as defs from '../common/defs';
import * as parseHelper from '../utilities/xmlparsehelper';

export class ObjectData2D
{
    constructor()
    {
        // Visual data of the object
        this.visualData = new ObjectVisualData2D;

        // Physics data of the object
        this.physicsData = new ObjectPhysicsData2D;

        // The name of the object data
        this.name = null;

        // The group the object data is in
        this.group = null;

        // The initial size of the object
        this.size = new Size;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.visualData.copy( obj.visualData );
        this.physicsData.copy( obj.physicsData );
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
    }
    
    // 
    //  DESC: Create OpenGL objects from data
    //
    createFromData( group )
    {
        // Create the visuales
        this.visualData.createFromData( group, this.size );
    }
}
