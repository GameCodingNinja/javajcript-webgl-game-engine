
// 
//  FILE NAME: stagestrategy.js
//  DESC:      Stage strategy
//

"use strict";

import { iStrategy } from './istrategy';
import { Sector } from './sector';
import * as genFunc from '../utilities/genfunc';

export class StageStrategy extends iStrategy
{
    constructor()
    {
        super();
        
        // Sector array
        this.sectorAry = [];
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( xmlNode )
    {
        let promiseAry = [];
        let sectorNode = xmlNode.getElementsByTagName( 'sector' );

        for( let i = 0; i < sectorNode.length; ++i )
        {
            let sector = new Sector;
            this.sectorAry.push( sector );
            
            sector.loadTransFromNode( sectorNode[i] );
            
            let sectorFilePath = sectorNode[i].getAttribute('file');

            promiseAry.push( 
                genFunc.downloadFile( 'xml', sectorFilePath )
                    .then(( xmlNode ) => sector.loadFromNode( xmlNode, sectorFilePath ))
                    .catch(( error ) => { console.error(error.stack); throw error; }));
        }

        return Promise.all( promiseAry );
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
    transform()
    {
        for( let i = 0; i < this.sectorAry.length; ++i )
            this.sectorAry[i].transform();
    }

    //
    //  DESC: Render the sector
    //
    render()
    {
        for( let i = 0; i < this.sectorAry.length; ++i ) 
            this.sectorAry[i].render( this.camera );
    }
}
