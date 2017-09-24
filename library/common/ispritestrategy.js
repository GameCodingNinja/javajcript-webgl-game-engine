
// 
//  FILE NAME: ispritestrategy.js
//  DESC:      Sprite Strategy Interface Class - Represents a group of sprites
//

"use strict";

export class iSpriteStrategy
{
    constructor()
    {
    }
    
    //
    //  DESC: Load the data from file
    //
    loadFromNode( node, filePath, downloadFileCallback, finishCallback )
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Allow player sprite to respond to input
    //
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Handle messages
    //
    handleMessage( msg )
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Create the sprite
    //
    create( name, id, pos, rot, scale )
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Do any pre-loop init
    //
    init()
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Load the data from file
    //
    miscProcess()
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Load the data from file
    //
    update()
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Transform the sprite
    //
    transform()
    {
        // Empty function to be overwritten
    }
    
    transform( object )
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Render the sprite
    //
    render( matrix )
    {
        // Empty function to be overwritten
    }
    
    //
    //  DESC: Delete any sprites scheduled to die
    //
    handleDelete()
    {
        // Empty function to be overwritten
    }
}
