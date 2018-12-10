
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
            let callback = this.loadCompleteCallback;
            this.loadCompleteCallback = null;
            
            if( callback !== null )
                callback();
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
