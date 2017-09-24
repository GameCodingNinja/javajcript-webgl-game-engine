
// 
//  FILE NAME: loadmanager.js
//  DESC:      LoadManager class
//

"use strict";

class LoadManager
{
    constructor()
    {
        this.objects = [];
        this.loadCompleteCallback = null;
    }
    
    add(obj)
    {
        this.objects.push(obj);
    }
    
    load()
    {
        if( this.objects.length === 0 )
        {
            if( this.loadCompleteCallback === null )
                throw new Error( 'LoadManager: Load complete callback has not been set!' );
            else
                this.loadCompleteCallback();
        }
        else
        {
            let obj = this.objects.shift();
            obj( this.load.bind(this) );
        }
    }
}

var loadManager = new LoadManager;
export { loadManager }
