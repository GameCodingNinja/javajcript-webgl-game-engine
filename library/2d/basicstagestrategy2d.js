
// 
//  FILE NAME: basicstagestrategy2d.js
//  DESC:      Basic 2D stage strategy
//

"use strict";

import { iSpriteStrategy } from '../common/ispritestrategy';
import { Sector2D } from '../2d/sector2d';
import { assetHolder } from '../utilities/assetholder';
import { Object } from '../common/object';

export class BasicStageStrategy2D extends iSpriteStrategy
{
    constructor()
    {
        super();
        
        // Deque of the sector 2d sprites
        this.sectorAry = [];

        // default camera position
        this.defaultCameraPos = new Object;
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( strategyId, node, filePath, downloadFileCallback, finishCallback )
    {
        // Get the node to the sound files
        let cameraNode = node.getElementsByTagName( 'cameraPosition' );
        if( cameraNode.length )
            this.defaultCameraPos.loadTransFromNode( cameraNode[0] );
        
        let sectorNode = node.getElementsByTagName( 'sector' );

        for( let i = 0; i < sectorNode.length; ++i )
        {
            let sector = new Sector2D;
            this.sectorAry.push( sector );
            
            sector.loadTransFromNode( sectorNode[i] );
            
            let sectorFile = sectorNode[i].getAttribute('file');
            
            // Check if this file has already been loaded
            if( !assetHolder.has( strategyId, sectorFile ) )
            {
                // load the sector file
                downloadFileCallback(
                    'xml',
                    strategyId,
                    sectorFile,
                    finishCallback,
                    ( group, xmlNode, filePath, finishCallback ) => 
                    {
                        // Store the preloaded XML file
                        assetHolder.set( group, filePath, xmlNode );

                        // Call the sector function to load the data
                        sector.loadFromNode( group, xmlNode, filePath, finishCallback );
                    });
            }
            else
            {
                sector.loadFromNode( strategyId, assetHolder.get( strategyId, sectorFile), sectorFile, null );
            }
        }
    }

    //
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        for( let i = 0; i < this.sectorAry.length; ++i )
            this.sectorAry[i].init();
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.sectorAry.length; ++i )
            this.sectorAry[i].cleanUp();
    }

    //
    //  DESC: Update the sector
    //
    update()
    {
        for( let i = 0; i < this.sectorAry.length; ++i )
            this.sectorAry[i].update();
    }

    //
    //  DESC: Transform the sector
    //
    transform( object )
    {
        for( let i = 0; i < this.sectorAry.length; ++i )
            this.sectorAry[i].doTransform( object );
    }

    //
    //  DESC: Render the sector
    //
    render( matrix )
    {
        for( let i = 0; i < this.sectorAry.length; ++i ) 
            this.sectorAry[i].render( matrix );
    }
}

