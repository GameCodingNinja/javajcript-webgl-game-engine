
// 
//  FILE NAME: sector2d.js
//  DESC:      Class the creates & renders all the sector sprites
//

"use strict";

import { Object2D } from './object2d';
import { settings } from '../utilities/settings';
import { Sprite2D } from '../2d/sprite2d';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { signalManager } from '../managers/signalmanager';

export class Sector2D extends Object2D
{
    constructor()
    {
        super();
        
        // sprite allocation array
        this.spriteAry = [];

        // The projection type
        this.projectionType = settings.projectionType;

        // Half of the sector size
        this.sectorSizeHalf = settings.sectorSizeHalf;
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( strategyId, xmlNode, filePath, finishCallback )
    {
        let defaultObjName = '';
        let defaultGroup = '';
        let defaultId = -1;
        let defaultAIName = '';
        
        let attr = xmlNode.getAttribute( 'defaultObjectName' );
        if( attr )
            defaultObjName = attr;
        
        attr = xmlNode.getAttribute( 'defaultGroup' );
        if( attr )
            defaultGroup = attr;
        
        attr = xmlNode.getAttribute( 'defaultId' );
        if( attr )
            defaultId = Number(attr);
        
        attr = xmlNode.getAttribute( 'defaultAIName' );
        if( attr )
            defaultAIName = attr;
        
        let spriteNode = xmlNode.getElementsByTagName( 'sprite' );

        for( let i = 0; i < spriteNode.length; ++i )
        {
            let objName = defaultObjName;
            let group = defaultGroup;
            let id = defaultId;
            let aiName = defaultAIName;
            
            attr = spriteNode[i].getAttribute( 'group' );
            if( attr )
                group = attr;
            
            attr = spriteNode[i].getAttribute( 'objectName' );
            if( attr )
                objName = attr;

            attr = spriteNode[i].getAttribute( 'id' );
            if( attr )
                id = Number(attr);
            
            attr = spriteNode[i].getAttribute( 'aiName' );
            if( attr )
                aiName = attr;
            
            // Allocate the sprite and add it to the array
            let sprite = new Sprite2D( objectDataManager.getData( group, objName ), id );
            this.spriteAry.push( sprite );
            
            // Load the transform data from node
            sprite.loadTransFromNode( spriteNode[i] );
            
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
            this.spriteAry[i].update();
    }

    //
    //  DESC: Transform the sprite
    //
    doTransform( object )
    {
        if( object )
            this.transform( object.matrix, object.wasWorldPosTranformed() );
        else
            this.transform();
        
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
