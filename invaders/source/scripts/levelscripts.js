
//
//  FILE NAME: levelcripts.js
//  DESC:      script for the level
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import * as utilScripts from './utilityscripts';

//
//  DESC: Script for animating fire tale
//
class PlayerShip_FireTailAnim
{
    constructor( sprite )
    {
        this.animate = new utilScripts.PlayAnim( sprite );
        this.animate.init( 24, true );
        this.pause = true;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !this.pause )
            return this.animate.execute();
        
        return false;
    }
}


// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'PlayerShip_FireTailAnim',
        ( sprite ) => { return new PlayerShip_FireTailAnim( sprite ); } );
}
