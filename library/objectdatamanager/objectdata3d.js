
// 
//  FILE NAME: objectdata3d.js
//  DESC:      Class that holds a 3D object data
//

"use strict";

import { iObjectData } from './iobjectdata';
//import { ObjectPhysicsData3D } from '../objectdatamanager/objectphysicsdata3d';
import { ObjectVisualData3D } from './objectvisualdata3d';

export class ObjectData3D extends iObjectData
{
    constructor()
    {
        super();

        // Visual data of the object
        this.visualData = new ObjectVisualData3D;

        // Physics data of the object
        //CObjectPhysicsData2D m_physicsData;

        // The name of the object data
        this.name = null;

        // The group the object data is in
        this.group = null;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.visualData.copy( obj.visualData );
    }
    
    // 
    //  DESC: Load the object data from the passed in node
    //
    loadObjData( xmlNode, group, name )
    {
        this.name = name;
        this.group = group;

        // Load the visual data
        this.visualData.loadObjData( xmlNode );

        // Load the physics data
        //m_physicsData.LoadFromNode( xmlNode );
    }
    
    // 
    //  DESC: Add the textures to the mesh with the "createFromData" call
    //
    createFromData( group )
    {
        // Create the visuales
        this.visualData.addTexturesToMesh( group );
    }

    // 
    //  DESC: Is this 3D object data?
    //
    is3D()
    {
        return true;
    }
}
