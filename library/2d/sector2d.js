
// 
//  FILE NAME: sector2d.js
//  DESC:      Class the creates & renders all the sector sprites
//

"use strict";

import { Object2D } from './object2d';
import { settings } from '../utilities/settings';
import { Sprite2D } from '../2d/sprite2d';
import { ActorSprite2D } from '../2d/actorsprite2d';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { signalManager } from '../managers/signalmanager';
import { ActorData } from '../common/actordata';

export class Sector2D extends Object2D
{
    constructor()
    {
        super();
        
        // sprite allocation array
        this.spriteAry = [];
        
        // Map of sprites that have names
        this.spriteMap = new Map;

        // The projection type
        this.projectionType = settings.projectionType;

        // Half of the sector size
        this.sectorSizeHalf = settings.sectorSizeHalf;
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( strategyId, node, filePath, finishCallback )
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
        
        let spriteNode = node.children;

        for( let i = 0; i < spriteNode.length; ++i )
        {
            let objName = defaultObjName;
            let group = defaultGroup;
            let id = defaultId;
            let aiName = defaultAIName;
            let name = null;
            
            attr = spriteNode[i].getAttribute( 'group' );
            if( attr )
                group = attr;
            
            attr = spriteNode[i].getAttribute( 'name' );
            if( attr )
                name = attr;
            
            attr = spriteNode[i].getAttribute( 'objectName' );
            if( attr )
                objName = attr;
            
            attr = spriteNode[i].getAttribute( 'aiName' );
            if( attr )
                aiName = attr;
            
            attr = spriteNode[i].getAttribute( 'id' );
            if( attr )
                id = Number(attr);
            
            let sprite = null;
            
            // Allocate the sprite and add it to the array
            if( spriteNode[i].tagName === 'sprite' )
                sprite = new Sprite2D( objectDataManager.getData( group, objName ), id );

            else
                sprite = new ActorSprite2D( new ActorData( spriteNode[i], group, objName, aiName, id ) );
            
            // Load the transform data from node
            sprite.load( spriteNode[i] );
            
            // Add to the sprite array
            this.spriteAry.push( sprite );
            
            // If it has a name, add it to the map for easy retrieval
            if( name )
                this.spriteMap.set( name, sprite );

            // Init the physics
            sprite.initPhysics();
            
            // Broadcast the signal to create the sprite AI
            if( aiName !== '' )
                signalManager.broadcast_aiCreate( aiName, sprite );
        }
    }
    
    //
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Create any font strings
        // This allows for delayed VBO create so that the fonts can be allocated during a load screen
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    //
    //  DESC: Get sprite by sector index and name
    //
    get( name )
    {
        let sprite = this.spriteMap.get( name );
        if( !sprite )
            throw new Error( `Sprite name can't be found (${name})!` );
        
        return sprite;
    }
    
    //
    //  DESC: Destroy this sector
    //
    destroy()
    {
        this.spriteAry = [];
    }

    //
    //  DESC: Update the sprites
    //
    update()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            this.spriteAry[i].update();
            this.spriteAry[i].physicsUpdate();
        }
    }

    //
    //  DESC: Transform the sprite
    //
    transform( object )
    {
        if( object )
            super.transform( object.matrix, object.wasWorldPosTranformed() );
        else
            super.transform();
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
    }

    //
    //  DESC: Render the sprites
    //
    render( matrix )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );
    }
}
