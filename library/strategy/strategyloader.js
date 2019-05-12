
// 
//  FILE NAME: strategyloader.js
//  DESC:      Helper class for loading strategies
//

"use strict";

import { strategyManager } from '../strategy/strategymanager';
import { ActorStrategy } from '../strategy/actorstrategy';
import { StageStrategy } from '../strategy/stagestrategy';
import { loadManager } from '../managers/loadmanager';

class Strategyloader
{
    constructor()
    {
    }

    // 
    //  DESC: Add to the load manager in specific order
    //
    load( xmlNode )
    {
        let strategyNode = xmlNode.getElementsByTagName( 'strategy' );

        // Have the load manager create the strategy
        for( let i = 0; i < strategyNode.length; ++i )
        {
            let strategyName = strategyNode[i].getAttribute( 'name' );
            if( !strategyName )
                throw new Error( `Strategy name not defined.` );

            let strategyType = strategyNode[i].getAttribute( 'type' );
            if( !strategyType )
                throw new Error( `Strategy type not defined.` );

            if( strategyType == 'actor' )
                loadManager.add( ( callback ) => strategyManager.addStrategy( strategyName, new ActorStrategy, callback ) );

            else if( strategyType == 'stage' )
                loadManager.add( ( callback ) => strategyManager.addStrategy( strategyName, new StageStrategy, callback ) );
        }

        // Preload the strategies
        loadManager.add( ( callback ) => this.loadStartegy( xmlNode, callback ));
    }
    
    // 
    //  DESC: Load the strategies
    //
    loadStartegy( xmlNode, callback )
    {
        let strategyNode = xmlNode.getElementsByTagName( 'strategy' );

        for( let i = 0; i < strategyNode.length; ++i )
        {
            let strategyName = strategyNode[i].getAttribute( 'name' );

            // Try to get the strategy
            let strategy = strategyManager.get( strategyName );
            if( !strategy )
                throw new Error( `Strategy name not defined (${strategyName}).` );

            // Apply a camera if one is defined
            let cameraId = strategyNode[i].getAttribute( 'camera' );
            if( cameraId )
                strategy.setCamera( cameraId );
            
            // Populate the strategies with their objects
            this.populateStartegy( strategyNode[i], strategy );
        }
        
        callback();
    }
    
    // 
    //  DESC: Populate the strategies with their objects
    //
    populateStartegy( xmlNode, strategy )
    {
        let nodeLst = xmlNode.getElementsByTagName( 'node' );

        for( let i = 0; i < nodeLst.length; ++i )
        {
            let name = nodeLst[i].getAttribute( 'name' );
            let instance = nodeLst[i].getAttribute( 'instance' );
            let active = nodeLst[i].getAttribute( 'active' );
            let node = strategy.create( name, instance, (!active || active === 'true') );
            
            // See if there is a sprite that needs to be init. There should only be one
            let spriteNode = nodeLst[i].getElementsByTagName( 'sprite' );
            if( spriteNode.length )
                this.initSprite( spriteNode[0], node.getSprite() );
        }
    }
    
    // 
    //  DESC: Populate the strategies with their objects
    //
    initSprite( xmlNode, sprite )
    {
        // Set any transforms
        sprite.object.loadTransFromNode( xmlNode );
        
        // See if there are any scripts that need to be prepared to run
        let scriptLst = xmlNode.getElementsByTagName( 'script' );
        for( let i = 0; i < scriptLst.length; ++i )
        {
            let attr = scriptLst[i].getAttribute( 'prepare' );
            if( attr )
                sprite.prepareScript( attr );
        }
    }
}

export var strategyLoader = new Strategyloader;
