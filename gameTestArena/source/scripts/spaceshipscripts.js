
//
//  FILE NAME: statescripts.js
//  DESC:      script for the state
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
import { settings } from '../../../library/utilities/settings';
import { scriptManager } from '../../../library/script/scriptmanager';
import * as defs from '../../../library/common/defs';
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

class PlayerShip_RotateGun
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            let ratio = 1 / settings.orthoAspectRatio.h;
            let halfSize = settings.size_half;

            let spritePos = this.sprite.transPos;
            let mousePos = eventManager.mouseAbsolutePos;

            let gunRotation = Math.atan2( (ratio * (halfSize.w - mousePos.x)) + spritePos.x, (ratio * (halfSize.h - mousePos.y)) - spritePos.y ) + defs.M_PI_2;
            this.sprite.setRotXYZ( 0, 0, gunRotation, false );

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return this.iter.next().done;
    }
}

// 
//  DESC: Load XML files
//
export function loadScripts()
{
    scriptManager.set( 'PlayerShip_FireTailAnim',
        ( sprite ) => { return new PlayerShip_FireTailAnim( sprite ); } );

    scriptManager.set( 'PlayerShip_RotateGun',
        ( sprite ) => { return new PlayerShip_RotateGun( sprite ); } );
}
