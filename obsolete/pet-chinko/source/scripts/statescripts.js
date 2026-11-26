
//
//  FILE NAME: statescripts.js
//  DESC:      script for the state
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for rotating the loading animation
//
class State_PlayLoadAnim
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.frameExec = new utilScripts.FrameExecute();
        this.frameExec.init( 10, this.frame.bind(this) );
    }
    
    // 
    //  DESC: Executes this frame
    //
    frame()
    {
        this.sprite.incRotXYZ( 0.0, 0.0, -30.0 );
    }

    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.frameExec.execute();
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'State_PlayLoadAnim',
        ( sprite ) => { return new State_PlayLoadAnim( sprite ); } );
}
