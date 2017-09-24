
//
//  FILE NAME: scriptmanager.js
//  DESC:      Class for managing game scripts
//

"use strict";

class ScriptManager
{
    constructor()
    {
        this.scriptMap = new Map;
    }
    
    //
    //  DESC: Set the script by name
    //
    set( name, factory )
    {
        // Sanity check to make sure the script has not already been added in
        if( this.scriptMap.has( name ) )
        {
            throw new Error( `Script name has already been added (${name}).` );
            return;
        }
        
        this.scriptMap.set( name, factory );
    }
    
    //
    //  DESC: Get the script by name
    //
    get( name )
    {
        let scriptFactory = this.scriptMap.get( name );
        
        if( scriptFactory === undefined )
        {
            throw new Error( `Script name could not be found! (${name})` );
            return null;
        }
        
        return scriptFactory;
    }
}

export var scriptManager = new ScriptManager;
