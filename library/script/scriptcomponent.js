
//
//  FILE NAME: scriptcomponent.js
//  DESC:      Class for handling game scripting
//

"use strict";

export class ScriptComponent
{
    constructor()
    {
        this.scriptAry = [];
    }
    
    // 
    //  DESC: Update the script
    //
    set( script )
    {
        this.scriptAry.push( script );
    }
    
    // 
    //  DESC: Update the script
    //
    update()
    {
        // Call the active scripts
        for( let i = this.scriptAry.length - 1; i > -1; --i )
        {
            this.scriptAry[i].execute();
            
            // If the script is finished, remove it
            if( this.scriptAry[i].isFinished )
                this.scriptAry.splice( i, 1 );
        }
    }
    
    // 
    //  DESC: Is this component active?
    //
    isActive()
    {
        return (this.scriptAry.length > 0);
    }
    
    // 
    //  DESC: clear out the scripts
    //
    reset()
    {
        this.scriptAry = [];
    }
}
