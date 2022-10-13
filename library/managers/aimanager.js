
//
//  FILE NAME: aimanager.js
//  DESC:      AI class singleton
//

"use strict";

import { AINodeDataList } from '../node/ainodedatalist';
import { ManagerBase } from './managerbase';

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
        return super.loadGroupAry( 'AI Manager', null, groupAry );
    }

    //
    //  DESC: Load the stratagy node data from xml
    //
    loadFromNode( group, xmlNode, filePath )
    {
        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            // There must be a name associated with this node data
            let nodeName = xmlNode.children[i].getAttribute( 'name' );
            if( !nodeName )
                throw new Error( `AI missing node name! (${group}, ${filePath})` );

            // Check for duplicate AI names
            if( this.aiMap.has( nodeName ) )
                throw new Error( `Duplicate AI name (${nodeName}, ${group}, ${filePath})!` );

            // Allocate the node data list and add it to the map
            this.aiMap.set( nodeName, new AINodeDataList( xmlNode.children[i] ) );
        }

        // Nothing else to do here. Return an empty promise
        return Promise.all( [] );
    }

    //
    //  DESC: Delete all the AI
    //
    clear()
    {
        this.aiMap.clear();
    }

    //
    //  DESC: Delete ai by name
    //
    deleteAI( aiName )
    {
        // Check for the AI name
        let ai = this.aiMap.get( aiName );
        if( ai )
        {
            this.aiMap.delete( aiName );
        }
        else
            console.warn( `AI can't be found to delete (${aiName})!` );
    }
    
}

export var aiManager = new AIManager;