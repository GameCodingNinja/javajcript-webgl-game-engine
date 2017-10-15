
// 
//  FILE NAME: ojectvisualdata3d.js
//  DESC:      Class containing the 3D object's visual data
//

"use strict";

import { Color } from '../common/color';
import { textureManager } from '../managers/texturemanager';
import * as parseHelper from '../utilities/xmlparsehelper';

export class ObjectVisualData3D
{
    constructor()
    {
        // Mesh group object
        this.meshGrp = null;

        // Name of the shader
        this.shaderID = null;

        // Initial color of the object
        this.color = new Color;

        // mesh file path
        this.meshFilePath = null;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.shaderID = obj.shaderID;
        this.meshFilePath = obj.meshFilePath;
        this.color.copy( obj.color );
        this.meshGrp = obj.meshGrp;
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( node )
    {
        let visualNode = node.getElementsByTagName('visual');
        if( visualNode.length )
        {
            let attr = visualNode[0].getAttribute('file');
            // Check for null because might want to replace with an empty string
            if( attr !== null )
                this.meshFilePath = attr;
                
            // The shader node determines which shader to use
            let shaderNode = visualNode[0].getElementsByTagName( 'shader' );
            if( shaderNode.length )
            {
                this.shaderID = shaderNode[0].getAttribute( 'id' );
            }

            // Load the color
            this.color = parseHelper.loadColor( visualNode[0], this.color );
        }
    }
    
    // 
    //  DESC: Add the textures to the mesh
    //
    addTexturesToMesh( group )
    {
        for( let i = 0; i < this.meshGrp.meshAry.length; ++i )
        {
            for( let j = 0; j < this.meshGrp.meshAry[i].textureIndexAry.length; ++j )
            {
                let textIndex = this.meshGrp.meshAry[i].textureIndexAry[j]
                
                let textPath = this.meshGrp.uniqueTexturePathAry[textIndex].path;
                
                this.meshGrp.meshAry[i].textureAry.push( textureManager.getTexture( group, textPath ) );
            }
        }
    }
    
    // 
    //  DESC: Is this genType active
    //
    isActive()
    {
        return (this.meshGrp !== null);
    }
}
