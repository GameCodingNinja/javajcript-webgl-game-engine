
//
//  FILE NAME: statescripts.js
//  DESC:      script for the state
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for fading in the menu
//
class PlayerShip_FireTailAnim
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim( sprite );
        this.animate.init( 24, true );
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
//  DESC: Load XML files
//
export function loadScripts()
{
    scriptManager.set( 'PlayerShip_FireTailAnim',
        ( sprite ) => { return new PlayerShip_FireTailAnim( sprite ); } );
}
