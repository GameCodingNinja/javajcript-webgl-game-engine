
// 
//  FILE NAME: basicspritestrategy2d.js
//  DESC:      Basic sprite strategy 2d class
//

"use strict";

import { BaseStrategy } from '../common/basestrategy';
import { SpriteData } from '../common/spritedata';
import { ActorData } from '../common/actordata';
import { Sprite2D } from '../2d/sprite2d';
import { ActorSprite2D } from '../2d/actorsprite2d';
import { ActorData } from '../common/actordata';
import { signalManager } from '../managers/signalmanager';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as defs from '../common/defs';

export class BasicSpriteStrategy2D extends BaseStrategy
{
    constructor( idOffset = 0, idDir = 1 )
    {
        super( idOffset, idDir );
        
        // Map of the sprite data
        this.dataMap = new Map;
        
        // Map of all the sprites
        this.spriteMap = new Map;
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( strategyId, node, filePath, downloadFileCallback, finishCallback )
    {
        let defaultGroup = '';
        let defaultObjName = '';
        let defaultAIName = '';
        let defaultId = -1;
        
        let attr = node.getAttribute( 'defaultGroup' );
        if( attr )
            defaultGroup = attr;
        
        attr = node.getAttribute( 'defaultObjectName' );
        if( attr )
            defaultObjName = attr;
        
        attr = node.getAttribute( 'defaultAIName' );
        if( attr )
            defaultAIName = attr;
        
        attr = node.getAttribute( 'defaultId' );
        if( attr )
            defaultId = Number(attr);
        
        // Get all the sprites
        let spriteNode = node.getElementsByTagName( 'sprite' );
        
        for( let i = 0; i < spriteNode.length; ++i )
        {
            // There must be a name associated with this sprite data
            let name = spriteNode[i].getAttribute( 'name' );
            if( !name )
                throw new Error( `Sprite strategy missing sprite name!` );
            
            // Allocate the sprite data and add it to the array
            this.dataMap.set( name, new SpriteData( spriteNode[i], defaultGroup, defaultObjName, defaultAIName, defaultId ) );
        }
        
        // Get all the actors
        let actorNode = node.getElementsByTagName( 'actor' );
        
        for( let i = 0; i < actorNode.length; ++i )
        {
            // There must be a name associated with this sprite data
            let name = actorNode[i].getAttribute( 'name' );
            if( !name )
                throw new Error( `Sprite strategy missing actor name!` );
            
            // Allocate the sprite data and add it to the array
            this.dataMap.set( name, new ActorData( actorNode[i], defaultGroup, defaultObjName, defaultAIName, defaultId ) );
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
    create( name, id, pos, rot, scale )
    {
        let sprite;
        let data = this.getData( name );

        // Generate the id
        let spriteId = (id + this.idOffset) * this.idDir;
        
        // If the sprite data defined a unique id, use that
        if( data.id !== defs.SPRITE_DEFAULT_ID )
            spriteId = data.id;
        
        // Check for duplicate id's
        if( this.spriteMap.has( spriteId ) )
            throw new Error( `Duplicate sprite id (${spriteId})!` );

        // Create the sprite
        if( data.parameters.isSet( defs.SPRITE2D ) )
            sprite = new Sprite2D( objectDataManager.getData( data.group, data.objectName ), spriteId );

        else if( data.parameters.isSet( defs.ACTOR2D ) )
            sprite = new ActorSprite2D( data, spriteId );

        // Copy transform data specified in the xml
        sprite.copyTransform( data );
        
        // Add sprite to map
        this.spriteMap.set( spriteId, sprite );

        // Use passed in transforms if specified
        if( pos && !pos.isEmpty() )
            sprite.setPos(pos);

        if( rot && !rot.isEmpty() )
            sprite.setRot(rot, false);

        if( scale && !scale.isEquilXYZ( 1, 1, 1 ) )
            sprite.setScale(scale);
        
        // Mainly for font sprites
        sprite.init();

        // Init the physics
        sprite.initPhysics();
        
        // Broadcast the signal to create the sprite AI
        if( data.aiName !== '' )
            signalManager.broadcast_aiCreate( data.aiName, sprite );
        
        return spriteId;
    }
    
    //
    //  DESC: Get the sprite by id
    //
    get( id )
    {
        let sprite = this.spriteMap.get( id );
        if( !sprite )
            throw new Error( `Error finding sprite (${id})!` );

        return sprite;
    }
    
    //
    //  DESC: Handle the creating of any sprites
    //
    createObj( name )
    {
        this.create( name, 0 );

    }   // CreateObj
    
    //
    //  DESC: Handle the deleting of any sprites
    //
    deleteObj( id )
    {
        // Find the sprite, delete it and remove entry from map
        let sprite = this.spriteMap.get( id );
        if( sprite )
        {
            // Specificly delete the physics body before deleting the sprite
            sprite.physicsComponent.destroyBody();
            
            // Clean up if font sprite
            sprite.cleanUp();

            // Delete from map
            this.spriteMap.delete( id );
        }
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
    transform( object )
    {
        if( object )
        {
            for( let [ key, sprite ] of this.spriteMap.entries() )
                sprite.transform( object.matrix, object.wasWorldPosTranformed() );
        }
        else
        {
            for( let [ key, sprite ] of this.spriteMap.entries() )
                sprite.transform();
        }
    }

    //
    //  DESC: Render the sprites
    //
    render( matrix )
    {
        for( let [ key, sprite ] of this.spriteMap.entries() )
            sprite.render( matrix );
    }
}
