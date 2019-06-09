
// 
//  FILE NAME: strategyloader.js
//  DESC:      Helper class for loading strategies
//

"use strict";

import { strategyManager } from '../strategy/strategymanager';
import { ActorStrategy } from '../strategy/actorstrategy';
import { StageStrategy } from '../strategy/stagestrategy';

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
        let promiseAry = [];
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
                promiseAry.push( strategyManager.addStrategy( strategyName, new ActorStrategy ) );

            else if( strategyType == 'stage' )
                promiseAry.push( strategyManager.addStrategy( strategyName, new StageStrategy ) );

            else
                throw new Error( `Unknown strategy type (${strategyType})!` );
        }

        // Preload the strategies
        return Promise.all( promiseAry )
            .then(() => this.loadStartegy( xmlNode ));
    }
    
    // 
    //  DESC: Load the strategies
    //
    loadStartegy( xmlNode )
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
    }
    
    // 
    //  DESC: Populate the strategies with their objects
    //
    populateStartegy( xmlNode, strategy )
    {
        let nodeLst = xmlNode.children;

        for( let i = 0; i < nodeLst.length; ++i )
        {
            if( nodeLst[i].nodeName === 'node' )
            {
                // Get the name of the strategy node
                let name = nodeLst[i].getAttribute( 'name' );

                // Get the instance name if one is provided.
                // Nodes with instance names are stored in a map so that a reference can be returned
                let instance = nodeLst[i].getAttribute( 'instance' );

                // Creating a node is automaticly active unless defined as false. Default true even if not specified
                let active = nodeLst[i].getAttribute( 'active' );
                let strategyNode = strategy.create( name, instance, (!active || active === 'true') );

                // Get the children of this node
                let childLst = nodeLst[i].children;

                for( let j = 0; j < childLst.length; ++j )
                {
                    // If the parent node specified a sprite to init
                    if( childLst[j].nodeName === 'object' )
                    {
                        let object = strategyNode.getObject();
                        if( object )
                            object.loadTransFromNode( childLst[j] );
                        else
                            console.log(`Strategy Loader Warning: Object defined for ${name} node but is not an object node.`);
                    }

                    else if( childLst[j].nodeName === 'sprite' )
                        this.initSprite( childLst[j], strategyNode.getSprite() );

                    // If the parent node specified a child node to init
                    else if( childLst[j].nodeName === 'node' )
                    {
                        // Get the name of the child node
                        let childName = childLst[j].getAttribute( 'name' );
                        if( childName )
                            if( !this.initSprite( childLst[j].firstElementChild, strategyNode.allNodeMap.get(childName).getSprite() ) )
                                console.log(`Strategy Loader Warning: Child node defined for ${name} node can not be found.`);
                        else
                            console.log(`Strategy Loader Warning: Child node defined for ${name} node but child node name note defined.`);
                    }
                }
            }
        }
    }
    
    // 
    //  DESC: Populate the strategies with their objects
    //
    initSprite( xmlNode, sprite )
    {
        // Set any transforms
        if( sprite )
        {
            sprite.object.loadTransFromNode( xmlNode );
            
            // See if there are any scripts that need to be prepared to run
            let scriptLst = xmlNode.getElementsByTagName( 'script' );
            for( let i = 0; i < scriptLst.length; ++i )
            {
                let attr = scriptLst[i].getAttribute( 'prepare' );
                if( attr )
                    sprite.prepareScript( attr );
            }

            return true;
        }
        
        return false;    
    }
}

export var strategyLoader = new Strategyloader;
