
// 
//  FILE NAME: actorstrategy.js
//  DESC:      Basic sprite strategy 2d class
//

"use strict";

import { iStrategy } from './istrategy';
import { NodeDataList } from '../node/nodedatalist';
import { Sprite } from '../sprite/sprite';
import { signalManager } from '../managers/signalmanager';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as defs from '../common/defs';

export class ActorStrategy extends iStrategy
{
    constructor()
    {
        super();
        
        // ID Offset for this strategy 
        this.idOffset = 0;

        // ID Direction
        this.idDir = 1;

        // Id increment member
        this.idInc = 0;

        // Camera pointer
        this.camera = null;
        
        // Map of the sprite data
        this.dataMap = new Map;
        
        // Map of nodes with instance names
        this.spriteMap = new Map;
        
        // Active Array of nodes
        this.nodeAry = [];
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
            // There must be a name associated with this sprite data
            let nodeName = node.children[i].getAttribute( 'name' );
            if( !nodeName )
                throw new Error( `Sprite strategy missing sprite name!` );
            
            // Allocate the sprite data and add it to the array
            this.dataMap.set( nodeName, new NodeDataList( node.children[i], defaultGroup, defaultObjName, defaultAIName ) );
        }
    }
    
    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let [ key, sprite ] of this.spriteMap.entries() )
            sprite.cleanUp();
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
    //  DESC: create the sprite sprite
    //        NOTE: Function assumes radians
    //
    create( dataName, instanceName = null )
    {
        let sprite;
        let data = this.getData( dataName );
        
        // Create a unique node id
        let nodeId =  ((this.idInc++) + this.idOffset) * this.idDir;

        // Create the sprite
        sprite = new Sprite( objectDataManager.getData( data.group, data.objectName ), nodeId );

        // Load from sprite data
        sprite.load( data );
        
        // Add sprite to map
        this.spriteMap.set( nodeId, sprite );
        
        // Mainly for font sprites
        sprite.init();

        // Init the physics
        sprite.initPhysics();
        
        // Broadcast the signal to create the sprite AI
        if( data.aiName !== '' )
            signalManager.broadcast_aiCreate( data.aiName, sprite );
        
        return sprite;
    }
    
    //
    //  DESC: Get the sprite by id
    //
    get( id )
    {
        let sprite = this.spriteMap.get( id );
        if( !sprite )
            throw new Error( `Sprite index can't be found (${id})!` );

        return sprite;
    }
    
    //
    //  DESC: Handle the creating of any sprites
    //
    createObj( name )
    {
        this.create( name, 0 );
    }
    
    //
    //  DESC: Handle the deleting of any sprites
    //
    deleteObj( id )
    {
        // Find the sprite, delete it and remove entry from map
        let sprite = this.get( id );
        if( sprite )
        {
            // Clean up if font or physics sprite
            sprite.cleanUp();

            // Delete from map
            this.spriteMap.delete( id );
        }
    }
    
    //
    //  DESC: Handle the deleting of any object physics by Id
    //
    deletePhysics( id )
    {
        // Find the sprite and delete the physics body
        let sprite = this.spriteMap.get( id );
        if( sprite )
            sprite.physicsComponent.destroyBody();

        else
            throw new Error( `Sprite index can't be found (${id})!` );
    }
    
    //
    //  DESC: Update the sprites
    //
    update()
    {
        for( let [ key, sprite ] of this.spriteMap.entries() )
        {
            sprite.update();
            sprite.physicsUpdate();
        }
    }

    //
    //  DESC: Transform the sprite
    //
    transform()
    {
        for( let [ key, sprite ] of this.spriteMap.entries() )
            sprite.object.transform();
    }

    //
    //  DESC: Render the sprites
    //
    render( camera )
    {
        for( let [ key, sprite ] of this.spriteMap.entries() )
            sprite.render( camera );
    }
}
