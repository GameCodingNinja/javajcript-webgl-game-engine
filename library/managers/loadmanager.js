
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
    }
    
    add(obj)
    {
        this.objects.push(obj);
    }
    
    load()
    {
        if( this.objects.length > 0 )
        {
            let obj = this.objects.shift();
            obj( this.load.bind(this) );
        }
    }
}

var loadManager = new LoadManager;
export { loadManager }
