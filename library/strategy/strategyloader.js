
// 
//  FILE NAME: strategyloader.js
//  DESC:      Helper class for loading strategies
//

"use strict";

import { strategyManager } from '../strategy/strategymanager';
import { assetHolder } from '../utilities/assetholder';
import * as genFunc from '../utilities/genfunc';

class Strategyloader
{
    constructor()
    {
    }
    
    // 
    //  DESC: Load the file defining what the strategy holds
    //
    load( group, filePath, callback )
    {
        // Check if this file has already been loaded
        if( !assetHolder.has( group, filePath ) )
            genFunc.downloadFile( 'xml', filePath, ( xmlNode ) => this.loadStartegy( xmlNode, filePath, callback ));
        else
            this.loadStartegy( assetHolder.get( group, filePath ), filePath, callback );
    }
    
    // 
    //  DESC: Load the strategies
    //
    loadStartegy( xmlNode, filePath, callback )
    {
        let strategyNode = xmlNode.getElementsByTagName( 'strategy' );

        for( let i = 0; i < strategyNode.length; ++i )
        {
            let strategyName = strategyNode[i].getAttribute( 'name' );
            if( !strategyName )
                throw new Error( `Strategy name not defined (${filePath}).` );

            // Try to get the strategy
            let strategy = strategyManager.get( strategyName );
            if( !strategy )
                throw new Error( `Strategy name not defined (${strategyName}, ${filePath}).` );

            // Apply a camera if one is defined
            let cameraId = strategyNode[i].getAttribute( 'camera' );
            if( cameraId )
                strategy.setCamera( cameraId );
            
            // Populate the strategies with their objects
            this.populateStartegy( strategyNode[i], strategy, filePath );
        }
        
        callback();
    }
    
    // 
    //  DESC: Populate the strategies with their objects
    //
    populateStartegy( xmlNode, strategy, filePath )
    {
        let nodeLst = xmlNode.getElementsByTagName( 'node' );

        for( let i = 0; i < nodeLst.length; ++i )
        {
            let name = nodeLst[i].getAttribute( 'name' );
            let instance = nodeLst[i].getAttribute( 'instance' );
            let node = strategy.create( name, instance );
            
            // See if there is a sprite that needs to be init. There should only be one
            let spriteNode = nodeLst[i].getElementsByTagName( 'sprite' );
            if( spriteNode.length )
                this.initSprite( spriteNode[0], node.getSprite(), filePath );
        }
    }
    
    // 
    //  DESC: Populate the strategies with their objects
    //
    initSprite( xmlNode, sprite, filePath )
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
