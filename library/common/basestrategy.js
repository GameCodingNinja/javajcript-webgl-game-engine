
// 
//  FILE NAME: basestrategy.js
//  DESC:      Base strategy class
//

"use strict";

import { iSpriteStrategy } from '../common/ispritestrategy';
import * as defs from '../common/defs';

export class BaseStrategy extends iSpriteStrategy
{
    constructor( idOffset, idDir )
    {
        super();
        
        // ID Offset for this strategy 
        this.idOffset = idOffset;

        // ID Direction
        this.idDir = idDir;

        // Array of indexes to delete
        this.deleteAry = [];

        // Array of sprites to create
        this.createAry = [];
    }
    
    //
    //  DESC: Post a sprite strategy command
    //
    postCommand( cmd, code )
    {
        // Add to the delete index
        if( cmd === defs.ESSC_KILL_SPRITE )
            this.deleteAry.push( code );
        
        // Add the create name
        else if( cmd === defs.ESSC_CREATE_SPRITE )
            this.createAry.push( code );
    }
    
    //
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        handleDelete();

        handleCreate();
    }

    //
    //  DESC: Handle the deleting of any object by Id
    //
    handleDelete()
    {
        if( this.deleteAry.length )
        {
            for( let i = 0; i < this.deleteAry.length; ++i )
                this.deleteObj( this.deleteAry[i] );

            this.deleteAry = [];
        }
    }
    
    //
    //  DESC: Handle the deleting of any object by Id
    //
    deleteObj( id )
    {
        // Virtual function meant to be over written by inherited class
    }
    
    //
    //  DESC: Handle the creating of new sprite objects by name
    //
    handleCreate()
    {
        if( this.createAry.length )
        {
            for( let i = 0; i < this.createAry.length; ++i )
                this.createObj( this.createAry[i] );

            this.createAry = [];
        }
    }

    //
    //  DESC: Handle the creating of any object by name
    //
    createObj( name )
    {
        // Virtual function meant to be over written by inherited class
    }
}
