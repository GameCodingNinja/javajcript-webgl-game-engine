
// 
//  FILE NAME: strategyloader.js
//  DESC:      Helper class for loading strategies
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { strategyManager } from '../strategy/strategymanager';
import { Strategy } from '../strategy/strategy';
import { Sprite } from '../sprite/sprite';

class Strategyloader extends ManagerBase
{
    constructor()
    {
        super();
    }

    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry )
    {
        return super.loadGroupAry( 'Strategy Loader', null, groupAry );
    }

    //
    //  DESC: Load strategy loader data from an xml node
    //  Note: This is called from managerbase.js
    //
    loadFromNode( group, xmlNode /*, filePath */ )
    {
        return this.loadFromXml( xmlNode );
    }

    // 
    //  DESC: Load from the XML node
    //        NOTE: The loading of strategies has to be broken up because
    //              they load their own XML that describes what is defined
    //              in the strategy.
    //
    loadFromXml( xmlNode )
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
        let defaultName = xmlNode.getAttribute( 'defaultName' );
        let defaultGroup = xmlNode.getAttribute( 'defaultGroup' );

        let xmlNodeLst = xmlNode.children;

        for( let i = 0; i < xmlNodeLst.length; i++ )
        {
            if( xmlNodeLst[i].nodeName === 'node' )
            {
                // Get the name of the strategy node
                let name = xmlNodeLst[i].getAttribute( 'name' );
                if( !name )
                    name = defaultName

                // See if a group has been specified
                let group = xmlNodeLst[i].getAttribute( 'group' );
                if( !group )
                    group = defaultGroup

                // Get the instance name if one is provided.
                // Nodes with instance names are stored in a map so that a reference can be returned
                let instance = xmlNodeLst[i].getAttribute( 'instance' );

                // Creating a node is automaticly active unless defined as false. Default true even if not specified
                let active = xmlNodeLst[i].getAttribute( 'active' );
                let headNode = strategy.create( name, instance, (!active || active === 'true'), group );
                let recalcRadius = false;

                for( let j = 0; j < xmlNodeLst[i].children.length; j++ )
                {
                    let xmlChildNode = xmlNodeLst[i].children[j];

                    // If the head node specified an object or sprite to init
                    if( xmlChildNode.nodeName === 'object' || xmlChildNode.nodeName === 'sprite' )
                    {
                        this.init( xmlChildNode, headNode.get() );

                        let xmlObjLst = xmlChildNode.children;

                        // Check if scale has been defined because we'll need to recalculate the radius
                        for( let w = 0; w < xmlObjLst.length; w++ )
                        {
                            if( xmlObjLst[w].nodeName === 'scale')
                            {
                                recalcRadius = true;
                                break;
                            }
                        }
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
                                console.warn(`Strategy Loader Warning: Child node defined for ${name} but can not be found.`);
                            }
                        }
                        else
                        {
                            console.warn(`Strategy Loader Warning: Child node defined for ${name} but child node name not defined. Can't initialize.`);
                        }
                    }
                }

                // If scale is defined anywhere, recalculate the radius
                if( recalcRadius )
                    headNode.calcRadius();
            }
            else if( xmlNodeLst[i].nodeName === 'object' )
            {
                strategy.loadTransFromNode( xmlNodeLst[i] );
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
        let scriptList = xmlNode.getElementsByTagName( 'script' );
        for( let i = 0; i < scriptList.length; ++i )
        {
            let attr = scriptList[i].getAttribute( 'prepare' );
            if( attr )
                object.scriptComponent.prepare( attr, object );
        }   
    }
}

export var strategyLoader = new Strategyloader;
