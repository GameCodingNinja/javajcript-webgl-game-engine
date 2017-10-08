
// 
//  FILE NAME: basestrategy.js
//  DESC:      Base strategy class
//

"use strict";

import { iSpriteStrategy } from '../common/ispritestrategy';
import * as defs from '../common/defs';

const CMD = 0,
      SPRITE_ID = 1;

export class BaseStrategy extends iSpriteStrategy
{
    constructor( idOffset, idDir )
    {
        super();
        
        // ID Offset for this strategy 
        this.idOffset = idOffset;

        // ID Direction
        this.idDir = idDir;

        // Array of commands
        this.commandAry = [];
    }
    
    //
    //  DESC: Post a sprite strategy command
    //
    postCommand( cmd, code )
    {
        this.commandAry.push( [cmd, code] );
    }
    
    //
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        if( this.commandAry.length )
        {
            for( let i = 0; i < this.commandAry.length; ++i )
            {
                if( this.commandAry[i][CMD] === defs.ESSC_DELETE_SPRITE )
                    this.deleteObj( this.commandAry[i][SPRITE_ID] );
                
                else if( this.commandAry[i][CMD] === defs.ESSC_CREATE_SPRITE )
                    this.createObj( this.commandAry[i][SPRITE_ID] );
                
                else if( this.commandAry[i][CMD] === defs.ESSC_DELETE_PHYSICS )
                    this.deletePhysics( this.commandAry[i][SPRITE_ID] );
            }
            
            this.commandAry = [];
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
    //  DESC: Handle the creating of any object by name
    //
    createObj( name )
    {
        // Virtual function meant to be over written by inherited class
    }
    
    //
    //  DESC: Handle the deleting of any object physics by Id
    //
    deletePhysics( id )
    {
        // Virtual function meant to be over written by inherited class
    }
}
