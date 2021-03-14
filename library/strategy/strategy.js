
//
//  FILE NAME: strategy.js
//  DESC:      Basic strategy class
//

"use strict";

import { ObjectTransform } from '../common/objecttransform';
import { NodeDataList } from '../node/nodedatalist';
import { cameraManager } from '../managers/cameramanager';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as nodeFactory from '../node/nodefactory';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

export class Strategy extends ObjectTransform
{
    constructor()
    {
        super();

        // Camera
        this.camera = cameraManager.getDefault();

        // Map of the node data
        this.dataMap = new Map;

        // Active Array of nodes
        this.nodeAry = [];

        // Map of nodes with instance names
        this.nodeMap = new Map;

        // Array of nodes to be added to the active vector
        this.activateAry = [];
        
        // Array of nodess to be removed to the active vector
        this.deactivateAry = [];
        
        // Set of indexes to delete
        this.deleteAry = [];

        // Clear all array
        this.clearAllAry = [];

        // Clear all nodes flag
        this.clearAllNodesFlag = false;
    }

    //
    //  DESC: Load the node data from xml
    //
    loadFromNode( xmlNode, filePath )
    {
        let defaultGroup = '';
        let defaultObjName = '';
        let defaultId = defs.DEFAULT_ID;

        let attr = xmlNode.getAttribute( 'defaultGroup' );
        if( attr !== null )
            defaultGroup = attr;

        attr = xmlNode.getAttribute( 'defaultObjectName' );
        if( attr !== null )
            defaultObjName = attr;

        attr = xmlNode.getAttribute( 'defaultId' );
        if( attr !== null )
            defaultId = Number(attr);

        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            // There must be a name associated with this node data
            let nodeName = xmlNode.children[i].getAttribute( 'name' );
            if( !nodeName )
                throw new Error( `Strategy missing node name! (${filePath})` );

            // Allocate the node data list and add it to the map
            this.dataMap.set( nodeName, new NodeDataList( xmlNode.children[i], defaultGroup, defaultObjName, defaultId ) );
        }
    }

    //
    //  DESC: Clear out all nodes
    //
    clear()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
            this.deleteAry.push( this.nodeAry[i] );
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        // See if any nodes in the map are not part of the node array and clean
        for( let node of this.nodeMap.values() )
        {
            let index = this.nodeAry.findIndex( (obj) => obj === node );
            if( index === -1 )
                node.cleanUp();
        }

        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].cleanUp();
    }

    //
    //  DESC: Get the sprite data container by name
    //
    getData( name, group = '' )
    {
        // If the data can't be found, this could be a simple one-off sprite node 
        // which can be generated from the group and object data name
        let data = this.dataMap.get( name );
        if( !data )
        {
            // If we can't find the data and the group param is empty, see if we can find the group 
            // in the Object Data Manager as a last attemp. 
            if( !group )
            {
                group = objectDataManager.findGroup( name );
                if( group )
                    console.log( `Simple Strategy node sprite auto generated from group search (${group}, ${name})!` );
            }
            else
                console.log( `Simple Strategy node sprite auto generated from group and object name (${group}, ${name})!` );

            // If we found group that has an object of the same name, create the data and pass it along
            if( group )
            {
                this.loadFromNode( 
                    genFunc.stringLoadXML(`<strategy defaultGroup="${group}"><node name="${name}"><sprite/></node></strategy>`).getElementsByTagName( 'strategy' )[0],
                    'Dynamic generation');
                data = this.dataMap.get( name );
            }
            else
                throw new Error( `Error finding node data (${name})!` );
        }

        return data;
    }

    //
    //  DESC: create the sprite node
    //
    create( dataName, instanceName = null, makeActive = true, group = '' )
    {
        // Get the data for this data name
        let nodeAry = this.getData( dataName, group ).dataAry;

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
    activateCount()
    {
        return this.nodeAry.length;
    }

    //
    //  DESC: Count of awake nodes
    //
    awakeCount()
    {
        let result = 0;

        for( let i = 0; i < this.nodeAry.length; i++ )
        {
            let sprite = this.nodeAry[i].get();
            if( sprite.isPhysicsActive() )
                if( sprite.isPhysicsAwake() )
                    result += 1;
        }

        return result;
    }

    //
    //  DESC: activate node
    //
    isPhysicsAwake()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
        {
            let sprite = this.nodeAry[i].get();
            if( sprite.isPhysicsActive() )
                if( sprite.isPhysicsAwake() )
                    return true;
        }

        return false;
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
                this.deactivateAry.push( this.nodeAry[index] );
            else
                console.log( `Node is not active (${instanceName})!` );
        }
        else
            console.log( `Node can't be found (%s) (${instanceName})!` );
    }

    //
    //  DESC: deactivate all the nodes
    //
    deactivateAll()
    {
        for( let [ key, node ] of this.nodeMap.entries() )
        {
            let index = this.nodeAry.findIndex( (obj) => obj === node );
            if( index !== -1 )
                this.deactivateAry.push( this.nodeAry[index] );
            else
                console.log( `Node is not active (${key})!` );
        }
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

        // Remove nodes from the active list
        this.removeFromActiveList();
        
        // Remove deleted nodes from the active list and map
        this.deleteFromActiveList();

        // Add created nodes to the active list
        this.addToActiveList();
    }

    //
    //  DESC: Transform the sprite
    //
    transform()
    {
        super.transform();

        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].transform( this );
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

            this.deactivateAry = [];
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

    //
    //  DESC: Set all the ids to the default id
    //
    setAllToDefaultId()
    {
        for( let i = 0; i < this.nodeAry.length; i++ )
            this.nodeAry[i].setId( defs.DEFAULT_ID );
    }

    // 
    //  DESC: Set the camera
    //
    setCamera( cameraId )
    {
        this.camera = cameraManager.get( cameraId );
    }
}
