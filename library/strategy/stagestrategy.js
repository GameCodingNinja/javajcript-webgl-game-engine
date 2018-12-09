
// 
//  FILE NAME: stagestrategy.js
//  DESC:      Stage strategy
//

"use strict";

import { iStrategy } from './istrategy';
import { assetHolder } from '../utilities/assetholder';
import { Sector } from './sector';

export class StageStrategy extends iStrategy
{
    constructor()
    {
        super();
        
        // Deque of the sector 2d sprites
        this.sectorAry = [];
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( strategyId, node, filePath, downloadFileCallback, finishCallback )
    {
        let sectorNode = node.getElementsByTagName( 'sector' );

        for( let i = 0; i < sectorNode.length; ++i )
        {
            let sector = new Sector;
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
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.sectorAry.length; ++i )
            this.sectorAry[i].cleanUp();
    }
    
    //
    //  DESC: Get sprite by sector index and name
    //
    get( name, index = 0 )
    {
        let sector = this.sectorAry[index];
        if( !sector )
            throw new Error( `Sector index can't be found (${name}, ${index})!` );
        
        return sector.get( name );
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
            this.sectorAry[i].transform( object );
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
