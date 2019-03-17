
//
//  FILE NAME: statescripts.js
//  DESC:      script for the state
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for fading in the menu
//
class State_PlayLoadAnim extends utilScripts.PlayAnim
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
        super.init( 12, true );
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
