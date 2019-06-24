
//
//  FILE NAME: statescripts.js
//  DESC:      script for the state
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { iScript } from '../../../library/script/iscript';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for fading in the menu
//
class State_PlayLoadAnim extends utilScripts.PlayAnim
{
    constructor( sprite )
    {
        super( sprite );
        
        this.init( 12, true );
    }
}

//
//  DESC: Script for fading in the menu
//
class State_RotateCube extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        let rot = highResTimer.elapsedTime * 0.04;
        this.sprite.incRotXYZ( rot, rot, 0 );
    }
}

// 
//  DESC: Load XML files
//
export function loadScripts()
{
    scriptManager.set( 'State_PlayLoadAnim',
        ( sprite ) => { return new State_PlayLoadAnim( sprite ); } );
        
    scriptManager.set( 'State_RotateCube',
        ( sprite ) => { return new State_RotateCube( sprite ); } );
}
