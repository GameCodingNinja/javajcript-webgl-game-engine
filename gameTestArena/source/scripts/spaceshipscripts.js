
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
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
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
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            this._ratio = 1 / settings.orthoAspectRatio.h;
            this._halfSize = settings.displayRes_half;

            this._spritePos = this.sprite.transPos;
            this._mousePos = eventManager.mouseAbsolutePos;

            this._gunRotation = Math.atan2( (this._ratio * (this._halfSize.w - this._mousePos.x)) + this._spritePos.x, (this._ratio * (this._halfSize.h - this._mousePos.y)) - this._spritePos.y ) + defs.M_PI_2;
            this.sprite.setRotXYZ( 0, 0, this._gunRotation, false );

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
