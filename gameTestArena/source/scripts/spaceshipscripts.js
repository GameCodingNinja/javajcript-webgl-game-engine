
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
class PlayerShip_FireTailAnim extends utilScripts.PlayAnim
{
    constructor( sprite )
    {
        super( sprite );
        
        this.init();
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 24, true );
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