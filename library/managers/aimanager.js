//
//  FILE NAME: aimanager.js
//  DESC:      AI class singleton
//

"use strict";

import { AINodeDataList } from '../node/ainodedatalist';
import { scriptManager } from '../script/scriptmanager';
import { ManagerBase } from './managerbase';
import * as defs from '../common/defs';

class AIManager extends ManagerBase
{
    constructor()
    {
        super();

        // Map of the node data
        this.aiMap = new Map;
    }

    // 
    //  DESC: Load from the XML node
    //        NOTE: The loading of strategies has to be broken up because
    //              they load their own XML that describes what is defined
    //              in the strategy.
    //
    loadFromXml( xmlNode )
    {
        if( xmlNode instanceof Array )
        {
            for( let i = 0; i < xmlNode.length; ++i )
                this.loadFromNode( 'manual load', xmlNode[i].children[0], 'from raw-loader!' );
        }
        else
        {
            this.loadFromNode( 'manual load', xmlNode.children[0], 'from raw-loader!' );
        }
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
    //  DESC: Create the AI script
    //
    get( name, object )
    {
        this._headNode = null;
        this._aiNodeData = this.aiMap.get( name );
        if(this._aiNodeData)
        {
            this._aiNodeDataAry = this._aiNodeData.dataAry;
            for( this._i = 0; this._i < this._aiNodeDataAry.length; this._i++ )
            {
                this._node;

                // Handle the head node
                if( this._aiNodeDataAry[this._i].behavior === defs.EAIB_HEAD )
                {
                    this._headNode = scriptManager.get( this._aiNodeDataAry[this._i].scriptName )(this._aiNodeDataAry[this._i]);
                    continue;
                }
                // The leaf node executes game logic so need to pass in the object
                else if( this._aiNodeDataAry[this._i].behavior === defs.EAIB_LEAF_TASK )
                {
                    this._node = scriptManager.get( this._aiNodeDataAry[this._i].scriptName )(this._aiNodeDataAry[this._i], this._headNode, object);
                }
                else
                {
                    this._node = scriptManager.get( this._aiNodeDataAry[this._i].scriptName )(this._aiNodeDataAry[this._i], this._headNode);
                }

                if( !this._headNode.addNode( this._node ) )
                {
                    throw new Error( `Parent node not found or node does not support adding children (${this._aiNodeDataAry[i].scriptName}, ${this._node.parentId})!` );
                }
            }
        }
        else
        {
            throw new Error( `Error finding ai node data (${name})!` );
        }

        // Initialize the tree by doing a reset
        this._headNode.resetTree();

        return this._headNode;
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
        if( this.aiMap.has( aiName ) )
        {
            this.aiMap.delete( aiName );
        }
        else
            console.warn( `AI can't be found to delete (${aiName})!` );
    }
    
}

export var aiManager = new AIManager;