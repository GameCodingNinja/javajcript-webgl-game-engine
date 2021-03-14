
// 
//  FILE NAME: strategyloader.js
//  DESC:      Helper class for loading strategies
//

"use strict";

import { strategyManager } from '../strategy/strategymanager';
import { Strategy } from '../strategy/strategy';
import { Sprite } from '../sprite/sprite';

class Strategyloader
{
    constructor()
    {
    }

    // 
    //  DESC: Load from the XML node
    //        NOTE: The loading of strategies has to be broken up because
    //              they load their own XML that describes what is defined
    //              in the strategy.
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

            promiseAry.push( strategyManager.addStrategy( strategyName, new Strategy ) );
        }

        // Preload the strategies
        return Promise.all( promiseAry )
            .then(() => this.loadStartegy( xmlNode ));
    }
    
    // 
    //  DESC: Load the strategies
    //        NOTE: The loading of strategies has to be broken up because
    //              they load their own XML that describes what is defined
    //              in the strategy.
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
        let xmlNodeLst = xmlNode.children;

        for( let i = 0; i < xmlNodeLst.length; ++i )
        {
            if( xmlNodeLst[i].nodeName === 'node' )
            {
                // Get the name of the strategy node
                let name = xmlNodeLst[i].getAttribute( 'name' );

                // Get the instance name if one is provided.
                // Nodes with instance names are stored in a map so that a reference can be returned
                let instance = xmlNodeLst[i].getAttribute( 'instance' );

                // Creating a node is automaticly active unless defined as false. Default true even if not specified
                let active = xmlNodeLst[i].getAttribute( 'active' );
                let headNode = strategy.create( name, instance, (!active || active === 'true') );

                for( let j = 0; j < xmlNodeLst[i].children.length; ++j )
                {
                    let xmlChildNode = xmlNodeLst[i].children[j];

                    // If the head node specified an object or sprite to init
                    if( xmlChildNode.nodeName === 'object' || xmlChildNode.nodeName === 'sprite' )
                    {
                        this.init( xmlChildNode, headNode.get() );
                    }

                    // If the head node specified a child node to init
                    else if( xmlChildNode.nodeName === 'node' )
                    {
                        // Get the name of the child node
                        let childName = xmlChildNode.getAttribute( 'name' );
                        if( childName )
                        {
                            let childNode = headNode.allNodeMap.get( childName );
                            if( childNode )
                            {
                                this.init( xmlChildNode.firstElementChild, childNode.get() );
                            }
                            else
                            {
                                console.log(`Strategy Loader Warning: Child node defined for ${name} but can not be found.`);
                            }
                        }
                        else
                        {
                            console.log(`Strategy Loader Warning: Child node defined for ${name} but child node name not defined. Can't initialize.`);
                        }
                    }
                }
            }
        }
    }

    // 
    //  DESC: Init the object with the xmlNode data
    //
    init( xmlNode, object )
    {
        // Set any transforms
        if( object instanceof Sprite )
            object.reload( xmlNode );
        else
            object.loadTransFromNode( xmlNode );

        // See if there are any scripts that need to be prepared to run
        let scriptLst = xmlNode.getElementsByTagName( 'script' );
        for( let i = 0; i < scriptLst.length; ++i )
        {
            let attr = scriptLst[i].getAttribute( 'prepare' );
            if( attr )
                object.prepareScript( attr );
        }   
    }
}

export var strategyLoader = new Strategyloader;
