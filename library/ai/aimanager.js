
//
//  FILE NAME: aimanager.js
//  DESC:      AI class singleton
//

"use strict";

import { AINodeDataList } from '../ai/ainodedatalist';
import { ManagerBase } from '../managers/managerbase';

class AIManager extends ManagerBase
{
    constructor()
    {
        super();

        // Map of the node data
        this.aiMap = new Map;
    }

    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry )
    {
        return super.loadGroupAry( 'AI Manager', this.aiMap, groupAry );
    }

    //
    //  DESC: Load the stratagy node data from xml
    //
    loadFromNode( group, xmlNode, filePath )
    {
        // Get the group map
        let groupMap = this.aiMap.get( group );

        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            // There must be a name associated with this node data
            let nodeName = xmlNode.children[i].getAttribute( 'name' );
            if( !nodeName )
                throw new Error( `AI missing node name! (${group}, ${filePath})` );

            // Allocate the node data list and add it to the map
            groupMap.set( nodeName, new AINodeDataList( xmlNode.children[i] ) );
        }

        // Nothing else to do here. Return an empty promise
        return Promise.all( [] );
    }

    //
    //  DESC: Delete the group of textures
    //
    deleteGroup( group )
    {
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap !== undefined )
        {
            let gl = device.gl;

            for( let texture of groupMap.values() )
                gl.deleteTexture( texture.id );
            
            this.textureForMapMap.delete( group );
        }
    }
}

export var aiManager = new AIManager;