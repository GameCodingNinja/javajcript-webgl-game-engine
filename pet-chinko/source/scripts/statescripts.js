
//
//  FILE NAME: statescripts.js
//  DESC:      script for the state
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for rotating the loading animation
//
class State_PlayLoadAnim extends utilScripts.FrameExecute
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
        super.init( 10 );
    }
    
    // 
    //  DESC: Execute this frame
    //
    frame()
    {
        this.sprite.object.incRotXYZ( 0.0, 0.0, -30.0 );
    }
}

// 
//  DESC: Load XML files
//
export function loadScripts()
{
    scriptManager.set( 'State_PlayLoadAnim',
        ( sprite ) => { return new State_PlayLoadAnim( sprite ); } );
}
