
// 
//  FILE NAME: actordata.js
//  DESC:      Actor Data Class
//

"use strict";

import { Object } from '../common/object';
import { SpriteData } from '../common/spritedata';
import * as defs from '../common/defs';

export class ActorData extends Object
{
    constructor( node, defGroup, defObjName, defAIName, defId = defs.SPRITE_DEFAULT_ID )
    {
        super();
        
        // Set the sprite type
        this.parameters.add( defs.ACTOR2D );
        
        // Name of the ai
        this.aiName = defAIName;
        
        // Flag to indicate this is the player actor
        this.playerActor = false;
        
        // Unique Id number
        this.id = defId;

        // sprite data vector
        this.spriteDataAry = [];
        
        // Get the sprite's AI name
        let attr = node.getAttribute( "aiName" );
        if( attr )
            this.aiName = attr;
        
        // Get the sprite's unique id number
        attr = node.getAttribute( "id" );
        if( attr )
            this.id = Number(attr);
        
        // visible property
        attr = node.getAttribute( 'visible' );
        if( attr )
            this.setVisible( attr === 'true' );

        // See if we have a sprite list which we should since it's an actor sprite
        let spriteNode = node.getElementsByTagName( 'sprite' );
        if( !spriteNode.length )
            throw new Error( `Actor Sprite node empty!` );
        
        for( let i = 0; i < spriteNode.length; ++i )
            this.spriteDataAry.push( new SpriteData( spriteNode[i], defGroup, defObjName, defAIName, defId ) );

        // Load the transform data from node
        this.loadTransFromNode( node );
    }
}

