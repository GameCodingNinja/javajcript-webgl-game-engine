
// 
//  FILE NAME: actorsprite2d.js
//  DESC:      2D Actor Sprite Class
//

"use strict";

import { Object2D } from './object2d';
import { Sprite2D } from './sprite2d';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import * as defs from '../common/defs';

export class ActorSprite2D extends Object2D
{
    constructor( actorData, id = defs.SPRITE_DEFAULT_ID )
    {
        super();
        
        // Base AI scoped pointer
        this.ai = null;

        // sprite allocation array
        this.spriteAry = [];

        // Sprite map for getting sprite pointer by name
        this.spriteMap = null;

        // Unique Id number
        this.id = id;
    
        // Set the sprite type
        this.parameters.add( defs.ACTOR2D );
        
        // Get the sprite data for easy access
        let dataAry = actorData.spriteDataAry;

        // Create the sprites
        for( let i = 0; i < dataAry.length; ++i )
        {
            // Allocate the sprite and add it to the map for easy access
            let sprite = new Sprite2D( objectDataManager.getData( dataAry[i].group, dataAry[i].objectName ), dataAry[i].id );
            
            // Add the sprite to the array
            this.spriteAry.push( sprite );
            
            // If there's a name for this sprite, add it to the map
            if( dataAry[i].name )
            {
                // Create the map because now we need it
                if( !this.spriteMap )
                    this.spriteMap = new Map;

                this.spriteMap.set( dataAry[i].name, sprite );
            }

            // Copy over the transform
            sprite.copyTransform( dataAry[i] );
        }
        
        // Copy over the transform
        copyTransform( actorData );
    }
    
    // 
    //  DESC: Init the sprite
    //
    init()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    // 
    //  DESC: Init the physics
    //
    initPhysics()
    {
        
    }

    // 
    //  DESC: React to what the player is doing
    //
    handleEvent( event )
    {
        if( this.ai )
            this.ai.handleEvent( event );
    }

    // 
    //  DESC: Do the update
    //
    update()
    {
        if( this.ai )
            this.ai.update();
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].update();
    }

    // 
    //  DESC: Update the physics
    //
    physicsUpdate()
    {

    }
    
    //
    //  DESC: Transform
    //
    transform( matrix, tranformWorldPos )
    {
        super.transform( matrix, tranformWorldPos );
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].render( matrix );
        }
    }

    // 
    //  DESC: Get the sprite
    //
    getSprite( id )
    {
        if( isNaN( id ) )
        {
            let sprite = this.spriteMap.get( id );
            if( !sprite )
                throw new Error( `Sprite name does not exist (${id})!` );
            
            return sprite;
        }
        else
        {
            return this.spriteAry[id];
        }
    }

    // 
    //  DESC: Set the AI.
    //
    setAI( ai )
    {
        this.ai = ai;

        // Handle any initialization in a seperate function
        this.ai.init();
    }

}

