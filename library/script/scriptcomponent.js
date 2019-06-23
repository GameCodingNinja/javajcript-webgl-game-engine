
//
//  FILE NAME: scriptcomponent.js
//  DESC:      Class for handling game scripting
//

"use strict";
import { scriptManager } from '../script/scriptmanager';

export class ScriptComponent
{
    constructor()
    {
        this.scriptAry = [];

        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = null;
    }

    // 
    //  DESC: Init the script Ids and add them to the map
    //        This loads the attribute info reguardless of what it is
    //
    initScriptIds( xmlNode )
    {
        // Check for scripting
        let scriptNode = xmlNode.getElementsByTagName( 'script' );

        if( !this.scriptFactoryMap && scriptNode.length )
            this.scriptFactoryMap = new Map;

        for( let i = 0; i < scriptNode.length; ++i )
        {
            let attr = scriptNode[i].attributes[0];
            if( attr )
                // This allocates the script to the map
                this.scriptFactoryMap.set( attr.name, attr.value );
        }
    }

    // 
    //  DESC: Get the script
    //
    get( scriptId )
    {
        if( this.scriptFactoryMap )
        {
            let scriptFactoryId = this.scriptFactoryMap.get( scriptId );
            if( scriptFactoryId )
                return scriptManager.get( scriptFactoryId );
        }

        null;
    }
    
    // 
    //  DESC: Set a script Id to the map
    //
    set( key, scriptId)
    {
        if( !this.scriptFactoryMap )
            this.scriptFactoryMap = new Map;

        this.scriptFactoryMap.set( key, scriptId );
    }

    // 
    //  DESC: Add a script
    //
    prepare( script )
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
            if( this.scriptAry[i].isFinished() )
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
