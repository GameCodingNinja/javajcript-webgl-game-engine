// 
//  FILE NAME: keycodeaction.js
//  DESC:      Class for holding key codes to test for action events
//

"use strict";

export class KeyCodeAction
{
    constructor( id )
    {
        this.idAry = [id];
    }
    
    // Set additional id's
    setId( id )
    {
        // Only set id's that are positive numbers
        if( !((id == -1) || (id == '---')) )
            this.idAry.push( id );
    }
    
    // Remove an id
    removeId( id )
    {
        var index = this.idAry.indexOf( id );
        
        if( index > -1 )
            this.idAry.splice( index, 1 );
    }

    // Check for action
    wasAction( id )
    {
        if( this.idAry.indexOf( id ) > -1 )
            return true;

        return false;
    }
}
