
//
//  FILE NAME: statescripts.js
//  DESC:      scripts for the state
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for fading in the menu
//
class State_PlayLoadAnim
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim( sprite );
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.animate.init( 12, true );
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return this.animate.execute();
    }
}

//
//  DESC: Script for fading in the menu
//
class State_RotateCube
{
    constructor( sprite )
    {
        this.sprite = sprite;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Nothing to do here
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this._rot = highResTimer.elapsedTime * 0.04;
        this.sprite.incRotXYZ( this._rot, this._rot, 0 );

        return false;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'State_PlayLoadAnim',
        ( sprite ) => { return new State_PlayLoadAnim( sprite ); } );
        
    scriptManager.set( 'State_RotateCube',
        ( sprite ) => { return new State_RotateCube( sprite ); } );
}
