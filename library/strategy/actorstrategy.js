
//
//  FILE NAME: actorstrategy.js
//  DESC:      Basic sprite strategy 2d class
//

"use strict";

import { iStrategy } from './istrategy';
import { NodeDataList } from '../node/nodedatalist';
import { Sprite } from '../sprite/sprite';
import * as nodeFactory from '../node/nodefactory';
import * as defs from '../common/defs';

export class ActorStrategy extends iStrategy
{
    constructor()
    {
        super();

        // Map of the node data
        this.dataMap = new Map;

        // Map of nodes with instance names
        this.nodeMap = new Map;

        // Active Array of nodes
        this.nodeAry = [];

        // Array of nodess to be added to the active vector
        this.activateAry = [];
        
        // Array of nodess to be removed to the active vector
        this.deactivateAry = [];
        
        // Set of indexes to delete
        this.deleteAry = [];
    }

    //
    //  DESC: Load the node data from xml
    //
    loadFromNode( strategyId, node, filePath, downloadFileCallback, finishCallback )
    {
        let defaultGroup = '';
        let defaultObjName = '';
        let defaultAIName = '';
        let defaultId = -1;

        let attr = node.getAttribute( 'defaultGroup' );
        if( attr !== null )
            defaultGroup = attr;

        attr = node.getAttribute( 'defaultObjectName' );
        if( attr !== null )
            defaultObjName = attr;

        attr = node.getAttribute( 'defaultAIName' );
        if( attr !== null )
            defaultAIName = attr;

        attr = node.getAttribute( 'defaultId' );
        if( attr !== null )
            defaultId = Number(attr);

        for( let i = 0; i < node.children.length; ++i )
        {
            // There must be a name associated with this node data
            let nodeName = node.children[i].getAttribute( 'name' );
            if( !nodeName )
                throw new Error( `Actor strategy missing node name!` );

            // Allocate the node data list and add it to the map
            this.dataMap.set( nodeName, new NodeDataList( node.children[i], defaultGroup, defaultObjName, defaultAIName ) );
        }
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].cleanUp();
    }

    //
    //  DESC: Get the sprite data container by name
    //
    getData( name )
    {
        let data = this.dataMap.get( name );
        if( !data )
            throw new Error( `Error finding sprite data (${name})!` );

        return data;
    }

    //
    //  DESC: create the sprite node
    //
    create( dataName, instanceName = null, makeActive = true )
    {
        // Get the data for this data name
        let nodeAry = this.getData( dataName ).dataAry;

        // Build the node list
        let headNode = null;
        for( let i = 0; i < nodeAry.length; i++ )
        {
            let node = nodeFactory.create( nodeAry[i] );

            if( headNode === null )
                headNode = node;

            else if( !headNode.addNode( node, nodeAry[i].nodeName ) )
                throw new Error( `Parent node not found or node does not support adding children (${nodeAry[i].nodeName}, ${node.parentId})!` );
        }

        // Add the node to the array for adding to the active list
        if( !instanceName || makeActive )
            this.activateAry.push( headNode );

        // If there is an instance name with this node, add it to the map
        if( instanceName )
        {
            // Check for duplicate names
            if( this.nodeMap.has( instanceName ) )
                throw new Error( `Duplicate node instance name (${instanceName})!` );

            this.nodeMap.set( instanceName, headNode );
        }

        return headNode;
    }
    
    //
    //  DESC: activate node
    //
    activateNode( instanceName )
    {
        let node = this.nodeMap.get( instanceName );
        if( node )
        {
            let index = this.nodeAry.findIndex( (obj) => obj === node );
            if( index !== -1 )
                console.log( `Node is already active (${instanceName})!` );
            else
                this.activateAry.push( node );
        }
        else
            throw new Error( `Node can't be found (%s) (${instanceName})!` );
        
        return node;
    }
    
    //
    //  DESC: deactivate node
    //
    deactivateNode( instanceName )
    {
        let node = this.nodeMap.get( instanceName );
        if( node )
        {
            let index = this.nodeAry.findIndex( (obj) => obj === node );
            if( index !== -1 )
                console.log( `Node is not active (${instanceName})!` );
            else
                this.deactivateAry.push( this.nodeAry[index] );
        }
        else
            console.log( `Node can't be found (%s) (${instanceName})!` );
    }
    
    //
    //  DESC: destroy the node
    //
    destroy( node )
    {
        this.deleteAry.push( node );
    }

    //
    //  DESC: Get the node by id
    //
    get( id )
    {
        let node = null;
    
        if( typeof id === 'string' )
        {
            node = this.nodeMap.get( id );
            if( !node )
                throw new Error( `Node instance name can't be found (${id})!` );
        }
        else
        {
            let index = this.nodeAry.findIndex( (node) => node.getId() === id );
            if( index !== -1 )
                node = this.nodeAry[index];
            else
                throw new Error( `Node index can't be found (${id})!` );
        }

        return node;
    }

    //
    //  DESC: Update the sprites
    //
    update()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].update();

        // Add created nodes to the active list
        this.addToActiveList();

        // Remove nodes from the active list
        this.removeFromActiveList();
        
        // Remove deleted nodes from the active list and map
        this.deleteFromActiveList();
    }

    //
    //  DESC: Transform the sprite
    //
    transform()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].transform();
    }

    //
    //  DESC: Render the sprites
    //
    render()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].render( this.camera );
    }

    //
    //  DESC: Add created nodes to the active list
    //
    addToActiveList()
    {
        if( this.activateAry.length )
        {
            for( let i = 0; i < this.activateAry.length; i++ )
            {
                this.activateAry[i].update();
                this.nodeAry.push( this.activateAry[i] );
            }

            this.activateAry = [];
        }
    }

    //
    //  DESC: Remove deleted nodes from the active list and map
    //
    removeFromActiveList()
    {
        if( this.deactivateAry.length )
        {
            for( let i = 0; i < this.deactivateAry.length; i++ )
            {
                let node = this.deactivateAry[i];

                let index = this.nodeAry.findIndex( (obj) => obj === node );
                if( index !== -1 )
                    this.nodeAry.splice( index, 1 );
                else
                    throw new Error( `Node id can't be found to remove from active list!` );
            }
        }
    }
    
    //
    //  DESC: Remove deleted nodes from the active list and map
    //
    deleteFromActiveList()
    {
        if( this.deleteAry.length )
        {
            for( let i = 0; i < this.deleteAry.length; i++ )
            {
                let node = this.deleteAry[i];

                let index = this.nodeAry.findIndex( (obj) => obj === node );
                if( index !== -1 )
                {
                    // Clean up if font or physics sprite
                    this.nodeAry[index].cleanUp();
                    this.nodeAry.splice( index, 1 );
                }
                else
                    throw new Error( `Node can't be found to delete!` );
                
                // If this same node is in the map, delete it here too.
                for( let [ key, obj ] of this.nodeMap.entries() )
                {
                    if( obj === node )
                    {
                        this.nodeMap.delete(key);
                        break;
                    }
                }
            }

            this.deleteAry = [];
        }
    }
}
