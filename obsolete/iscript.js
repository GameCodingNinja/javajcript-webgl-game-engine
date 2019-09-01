//
//  FILE NAME: iscript.js
//  DESC:      script interface class
//

"use strict";

export class iScript
{
    constructor()
    {
        this.finished = false;
    }
    
    // 
    //  DESC: Handle events
    //
    handleEvent()
    {
        // Empty by design
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // Empty by design
    }

    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}