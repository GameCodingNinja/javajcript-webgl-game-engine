
//
//  FILE NAME: strategy.js
//  DESC:      Strategy class
//

"use strict";

import { Object } from '../common/object';
import { StrategyNodeDataList } from '../node/strategynodedatalist';
import { cameraManager } from '../managers/cameramanager';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as nodeFactory from '../node/nodefactory';
import * as defs from '../common/defs';
import * as genFunc from '../utilities/genfunc';

export class Strategy extends Object
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
        
        // Array of nodess to be removed from the active vector
        this.deactivateAry = [];
        
        // Array of nodess to be removed from the active vector and deleted
        this.deleteAry = [];

        // Array of nodess to be removed from the active vector and added to the pool
        this.recycleAry = [];

        // Clear all array
        this.clearAllAry = [];

        // Clear all nodes flag
        this.clearAllNodesFlag = false;

        // Pool map for sprite recycle
        this.recycleMap = new Map;

        // Pre-bound sort function to avoid GC from closure creation
        this.sortByZDesc = this.sortByZDesc.bind(this);
    }

    //
    //  DESC: Load the stratagy node data from xml
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

        attr = xmlNode.getAttribute( 'defaultCamera' );
        if( attr !== null )
            this.setCamera( attr )

        // Load any transforms for the strategy
        //this.loadTransFromNode( xmlNode );

        let xmlNodeLst = xmlNode.children;

        for( let i = 0; i < xmlNodeLst.length; ++i )
        {
            if( xmlNodeLst[i].nodeName === 'node' )
            {
                // There must be a name associated with this node data
                let nodeName = xmlNodeLst[i].getAttribute( 'name' );
                if( !nodeName )
                    throw new Error( `Strategy missing node name! (${filePath})` );

                // Allocate the node data list and add it to the map
                this.dataMap.set( nodeName, new StrategyNodeDataList( xmlNodeLst[i], defaultGroup, defaultObjName, defaultId ) );
            }
            else if( xmlNodeLst[i].nodeName === 'object' )
            {
                this.loadTransFromNode( xmlNodeLst[i] );
            }
        }
    }

    //
    //  DESC: Clear out all nodes
    //
    clear()
    {
        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            this.deleteAry.push( this.nodeAry[this._i] );
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( this._node of this.nodeMap.values() )
            this._node.cleanUp();

        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            this.nodeAry[this._i].cleanUp();
    }

    //
    //  DESC: Get the sprite data container by name
    //
    getData( name, group = '' )
    {
        // If the data can't be found, this could be a simple one-off sprite node 
        // which can be generated from the group and object data name
        this._data = this.dataMap.get( name );
        if( this._data === undefined )
        {
            // If we can't find the data and the group param is empty, see if we can find the group 
            // in the Object Data Manager as a last attemp. 
            if( !group )
            {
                group = objectDataManager.findGroup( name );
                if( group )
                    console.debug( `Simple Strategy node sprite auto generated from group search (${group}, ${name})!` );
            }
            else
                console.debug( `Simple Strategy node sprite auto generated from group and object name (${group}, ${name})!` );

            // If we found group that has an object of the same name, create the data and pass it along
            if( group )
            {
                this.loadFromNode( 
                    genFunc.stringLoadXML(`<strategy defaultGroup="${group}"><node name="${name}"><sprite/></node></strategy>`).getElementsByTagName( 'strategy' )[0],
                    'Dynamic generation');
                this._data = this.dataMap.get( name );
            }
            else
                throw new Error( `Error finding node data (${name})!` );
        }

        return this._data;
    }

    //
    //  DESC: create the sprite node
    //
    create( dataName, instanceName = null, makeActive = true, group = '' )
    {
        // Get the data for this data name
        this._nodeDataAry = this.getData( dataName, group ).dataAry;

        // Do we have any nodes from the pool to draw from?
        this._poolNodeAry = this.recycleMap.get( this._nodeDataAry[0].nodeName );
        if( this._poolNodeAry != undefined && this._poolNodeAry.length )
        {
            this._node = this._poolNodeAry[this._poolNodeAry.length-1];
            this._poolNodeAry.length -= 1;
            this._node.resetTree();

            if( !instanceName || makeActive )
                this.activateAry.push( this._node );

            //console.log(`Sprite Recycle; Name: ${dataName}; Node: ${this._node}`);

            return this._node;
        }

        //console.log(`Sprite Create; Name: ${dataName}`);

        // Build the node list
        this._headNode = null;
        for( this._i = 0; this._i < this._nodeDataAry.length; ++this._i )
        {
            this._node = nodeFactory.create( this._nodeDataAry[this._i] );

            if( this._headNode === null )
                this._headNode = this._node;

            else if( !this._headNode.addNode( this._node ) )
                throw new Error( `Parent node not found or node does not support adding children (${this._nodeDataAry[i].nodeName}, ${this._node.parentId})!` );
        }

        // Init the head node
        this._headNode.init();

        // Set the strategy for easy reference
        this._headNode.strategy = this;

        // Add the node to the array for adding to the active list
        if( !instanceName || makeActive )
            this.activateAry.push( this._headNode );

        // If there is an instance name with this node, add it to the map
        if( instanceName )
        {
            // Check for duplicate names
            if( this.nodeMap.has( instanceName ) )
                throw new Error( `Duplicate node instance name (${instanceName})!` );

            this.nodeMap.set( instanceName, this._headNode );
        }

        return this._headNode;
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
        this._result = 0;

        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
        {
            this._sprite = this.nodeAry[this._i].get();
            if( this._sprite.isPhysicsActive() )
            {
                if( this._sprite.isPhysicsAwake() )
                {
                    this._result += 1;
                }
            }
        }

        return this._result;
    }

    //
    //  DESC: activate node
    //
    isPhysicsAwake()
    {
        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
        {
            this._sprite = this.nodeAry[this._i].get();
            if( this._sprite.isPhysicsActive() )
            {
                if( this._sprite.isPhysicsAwake() )
                {
                    return true;
                }
            }
        }

        return false;
    }

    //
    //  DESC: Init the script tree
    //
    initScriptTree()
    {
        for( this._i = 0; this._i < this.activateAry.length; ++this._i )
            this.activateAry[this._i].get().scriptComponent.initScriptTree();
    }
    
    //
    //  DESC: activate node
    //
    activateNode( instanceName )
    {
        this._node = this.nodeMap.get( instanceName );
        if( this._node !== undefined )
        {
            this._index = genFunc.indexOf( this.nodeAry, this._node );

            if( this._index === -1 )
                this.activateAry.push( this._node );
            else
                console.warn( `Node is already active (${instanceName})!` );
        }
        else
            throw new Error( `Node can't be found (%s) (${instanceName})!` );
        
        return this._node;
    }
    
    //
    //  DESC: deactivate node
    //
    deactivateNode( instanceName )
    {
        this._node = this.nodeMap.get( instanceName );
        if( this._node !== undefined )
        {
            if( genFunc.indexOf( this.nodeAry, this._node ) !== -1 )
                this.deactivateAry.push( this._node );
            else
                console.warn( `Node is not active (${instanceName})!` );
        }
        else
            console.error( `Node can't be found (%s) (${instanceName})!` );
    }

    //
    //  DESC: deactivate all the nodes
    //
    deactivateAll()
    {
        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            this.deactivateAry.push( this.nodeAry[this._i] );
    }

    //
    //  DESC: Add the node to the delete list
    //
    destroy( node )
    {
        this.deleteAry.push( node );
    }

    //
    //  DESC: Add the node to the pool list
    //
    recycle( node )
    {
        this.recycleAry.push( node );
    }

    //
    //  DESC: Get the node by id
    //
    get( id )
    {
        this._node = null;
    
        if( typeof id === 'string' )
        {
            this._node = this.nodeMap.get( id );
            if( this._node === undefined )
                throw new Error( `Node instance name can't be found (${id})!` );
        }
        else
        {
            this._index = -1;

            for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            {
                if( this.nodeAry[this._i].userId === id  )
                {
                    this._index = this._i;
                    break;
                }
            }

            if( this._index !== -1 )
                this._node = this.nodeAry[this._index];
            else
                throw new Error( `Node index can't be found (${id})!` );
        }

        return this._node;
    }

    //
    //  DESC: Update the nodes
    //
    update()
    {
        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            this.nodeAry[this._i].update();

        // Remove nodes from the active list
        this.removeFromActiveList();
        
        // Remove deleted nodes from the active list and map
        this.deleteFromActiveList();

        // Remove recycled nodes from the active list and add to pool
        this.recycleFromActiveList();

        // Add created nodes to the active list
        this.addToActiveList();
    }

    //
    //  DESC: Transform the nodes
    //
    transform()
    {
        super.transform();

        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            this.nodeAry[this._i].transform( this );
    }

    //
    //  DESC: Render the nodes
    //
    render( overrideCamera = null )
    {
        this._camera = this.camera;
        if( overrideCamera )
            this._camera = overrideCamera;

        // Cull frustrum on the head node
        if( this._camera.cull === defs.CULL_NULL )
        {
            for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
                this.nodeAry[this._i].render( this._camera );
        }
        else
        {
            if( this._camera.cull === defs.CULL_FULL )
            {
                for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
                {
                    if( this._camera.inView( this.nodeAry[this._i].get().transPos, this.nodeAry[this._i].radius ) )
                        this.nodeAry[this._i].render( this._camera );
                }
            }
            else if( this._camera.cull === defs.CULL_X_ONLY )
            {
                for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
                {
                    if( this._camera.inViewX( this.nodeAry[this._i].get().transPos, this.nodeAry[this._i].radius ) )
                        this.nodeAry[this._i].render( this._camera );
                }
            }
            else if( this._camera.cull === defs.CULL_Y_ONLY )
            {
                for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
                {
                    if( this._camera.inViewY( this.nodeAry[this._i].get().transPos, this.nodeAry[this._i].radius ) )
                        this.nodeAry[this._i].render( this._camera );
                }
            }
        }
    }

    //
    //  DESC: Add created nodes to the active list
    //
    addToActiveList()
    {
        if( this.activateAry.length )
        {
            for( this._i = 0; this._i < this.activateAry.length; ++this._i )
            {
                this.activateAry[this._i].update();
                this.nodeAry.push( this.activateAry[this._i] );
            }

            this.activateAry.length = 0;
        }
    }

    //
    //  DESC: Remove deleted nodes from the active list and map
    //
    removeFromActiveList()
    {
        if( this.deactivateAry.length )
        {
            for( this._i = 0; this._i < this.deactivateAry.length; ++this._i )
            {
                this._index = genFunc.indexOf( this.nodeAry, this.deactivateAry[this._i] );

                if( this._index !== -1 )
                    genFunc.removeAt( this.nodeAry, this._index );
                else
                    throw new Error( `Node id can't be found to remove from active list!` );
            }

            this.deactivateAry.length = 0;
        }
    }
    
    //
    //  DESC: Remove deleted nodes from the active list and map
    //
    deleteFromActiveList()
    {
        if( this.deleteAry.length )
        {
            for( this._i = 0; this._i < this.deleteAry.length; ++this._i )
            {
                this._index = genFunc.indexOf( this.nodeAry, this.deleteAry[this._i] );

                if( this._index !== -1 )
                {
                    // Clean up if font or physics sprite
                    this.nodeAry[this._index].cleanUp();
                    genFunc.removeAt( this.nodeAry, this._index );
                }
                else
                    throw new Error( `Node can't be found to delete!` );
                
                // If this same node is in the map, delete it here too.
                this._key = genFunc.getKey( this.nodeMap, this.deleteAry[this._i] );

                if( this._key !== undefined )
                    this.nodeMap.delete(this._key);
            }

            this.deleteAry.length = 0;
        }
    }

    //
    //  DESC: Remove recycled nodes from the active list and add to pool
    //
    recycleFromActiveList()
    {
        if( this.recycleAry.length )
        {
            for( this._i = 0; this._i < this.recycleAry.length; ++this._i )
            {
                this._index = genFunc.indexOf( this.nodeAry, this.recycleAry[this._i] );

                if( this._index !== -1 )
                {
                    this.setNodeToRecycle( this.nodeAry[this._index] );
                    genFunc.removeAt( this.nodeAry, this._index );
                    
                }
                else
                {
                    console.warn( `Node can't be found to recycle!: ${this.recycleAry[this._i].name}` );
                }
            }

            this.recycleAry.length = 0;
        }
    }

    //
    //  DESC: Set all the ids to the default id
    //
    setAllToDefaultId()
    {
        for( this._i = 0; this._i < this.nodeAry.length; ++this._i )
            this.nodeAry[this._i].userId = defs.DEFAULT_ID;
    }

    // 
    //  DESC: Set the camera
    //
    setCamera( cameraId )
    {
        this.camera = cameraManager.get( cameraId );
    }

    //
    //  DESC: Sort the active nodes based on sort function
    //
    sortActive( sortFunc = null )
    {
        if( sortFunc )
            this.nodeAry.sort( sortFunc );

        // If sort function is not provided, sort on z order
        // For this to render as expected, sort in descending order. 
        else
            this.nodeAry.sort( this.sortByZDesc );
    }

    //
    //  DESC: Sort the active nodes based on sort function
    //
    sortPending( sortFunc = null )
    {
        if( sortFunc )
            this.activateAry.sort( sortFunc );

        // If sort function is not provided, sort on z order
        // For this to render as expected, sort in descending order. 
        else
            this.activateAry.sort( this.sortByZDesc );
    }

    //
    //  DESC: Add a node to recycle
    //
    setNodeToRecycle( node )
    {
        //console.log(`set recycled node: ${node.name}`);

        this._recycleAry = this.recycleMap.get(node.name);

        node.get().scriptComponent.recycleActiveScripts();

        if( this._recycleAry == undefined )
        {
            this.recycleMap.set(node.name, [node]);
        }
        else
        {
            this._recycleAry.push(node);
        }
    }

    //
    //  DESC: Sort comparator for z-order descending
    //
    sortByZDesc(a, b)
    {
        if(a.get().transPos.z > b.get().transPos.z)
            return -1;

        else if(a.get().transPos.z < b.get().transPos.z)
            return 1;

        return 0;
    }
}
