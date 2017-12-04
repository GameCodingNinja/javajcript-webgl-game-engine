
// 
//  FILE NAME: spritedataary.js
//  DESC:      Sprite data grouped into one array
//

"use strict";

import { SpriteData } from '../common/spritedata';

export class SpriteDataAry
{
    constructor()
    {
        // Map of the sprite data
        this.dataAry = [];
    }
    
    //
    //  DESC: Load the sprite data from node
    //
    loadFromNode( node, group, name )
    {
        // Get the childern of this node
        let dataNode = node.children;

        for( let i = 0; i < dataNode.length; ++i )
            this.dataAry.push( new SpriteData( dataNode[i], group ) );
    }

    //
    //  DESC: Get the array of sprite data
    //
    getSpriteData( index )
    {
        let spriteData = this.dataAry.get( index );
        if( !spriteData )
            throw new Error( `Sprite data index not found in set (${index})!` );

        return spriteData;
    }
}
