
// 
//  FILE NAME: spritedatasetmap.js
//  DESC:      Sprite data array that's grouped by map key
//

"use strict";

import { SpriteData } from '../common/spritedata';

export class SpriteDataSetMap
{
    constructor()
    {
        // Map of the sprite data
        this.dataSetMap = new Map;
    }
    
    //
    //  DESC: Load the sprite data from node
    //
    loadFromNode( node, group, name )
    {
        // Get the childern of this node
        let dataNode = node.children;

        for( let i = 0; i < dataNode.length; ++i )
        {
            // Get the sprite set string id
            let id = dataNode[i].getAttribute( 'id' );
            
            // Check for duplicate id's
            if( this.dataSetMap.has( id ) )
                throw new Error( `Duplicate sprite data set id (${id}, ${group}, ${name})!` );

            // Add the array to the map
            let dataAry = [];
            this.dataSetMap.set( id, dataAry );
            
            let spriteNode = dataNode[i].children;

            for( let j = 0; j < spriteNode.length; ++j )
                dataAry.push( new SpriteData( spriteNode[j], group ) );
        }
    }

    //
    //  DESC: Get the array of sprite data
    //
    getSpriteData( id )
    {
        let spriteDataAry = this.dataSetMap.get( id );
        if( !spriteDataAry )
            throw new Error( `Sprite data not found in set (${id})!` );

        return spriteDataAry;
    }
}
