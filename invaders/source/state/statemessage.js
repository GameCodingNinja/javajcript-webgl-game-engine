
// 
//  FILE NAME: statemessage.js
//  DESC:      This class is custom per game project
//

"use strict";

export class StateMessage
{
    constructor()
    {
        this.loadState = 0;
        this.unloadState = 0;
    }
    
    setMsg( loadState, unloadState )
    {
        this.loadState = loadState;
        this.unloadState = unloadState;
    }
}
