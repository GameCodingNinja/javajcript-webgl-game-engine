
//
//  FILE NAME: slotscripts.js
//  DESC:      script for the menus
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { Color } from '../../../library/common/color';
import * as utilScripts from './utilityscripts';
import * as defs from '../../../library/common/defs';

//
//  DESC: Script for timing out a winning symbol
//
class Symbol_Hold extends utilScripts.Hold
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1000 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for animating a winning symbol
//
class Symbol_Animate extends utilScripts.Play
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 18 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}



// 
//  DESC: Load script into manager
//
export function loadScripts()
{
    scriptManager.set( 'Symbol_Hold',
        ( sprite ) => { return new Symbol_Hold( sprite ); } );
        
    scriptManager.set( 'Symbol_Animate',
        ( sprite ) => { return new Symbol_Animate( sprite ); } );
}
