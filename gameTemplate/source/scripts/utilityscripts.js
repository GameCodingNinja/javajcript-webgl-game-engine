
//
//  FILE NAME: utilityscripts.js
//  DESC:      script for fading the screen
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { shaderManager } from '../../../library/managers/shadermanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { Color } from '../../../library/common/color';
import * as defs from '../../../library/common/defs';

//
//  DESC: Script for fading in the menu
//
export class FadeTo
{
    constructor( current, final, time )
    {
        this.current = current;
        this.final = final;
        this.time = time;
        this.inc = (this.final - this.current) / this.time;
        this.finished = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= highResTimer.elapsedTime;

        if( this.time < 0 )
        {
            this.finished = true;
        }
        else
        {
            this.current += (this.inc * highResTimer.elapsedTime);
        }
    }
}

//
//  DESC: Color to the final color in time
//
export class ColorTo
{
    constructor()
    {
        this.current = new Color;
        this.inc = new Color;
        this.final;
        this.time;
    }
    
    init( current, final, time )
    {
        this.time = time;
        this.final = final;
        this.current.copy( current );
        
        for( let i = 0; i < 4; ++i )
            this.inc.data[i] = (this.final.data[i] - this.current.data[i]) / this.time;
        
        this.finished = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        let elapsedTime = highResTimer.elapsedTime;
        this.time -= elapsedTime;

        if( this.time < 0 )
        {
            this.finished = true;
        }
        else
        {
            for( let i = 0; i < 4; ++i )
                this.current.data[i] += this.inc.data[i] * elapsedTime;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
    
    // 
    //  DESC: Finished access function
    //
    get color()
    {
        if( this.finished )
            return this.final;
        else
            return this.current;
    }
}

//
//  DESC: Script for fading the screen
//
class ScreenFade extends FadeTo
{
    constructor( current, final, time, gameStateChangeMsg )
    {
        super( current, final, time );
        
        this.gameStateChangeMsg = gameStateChangeMsg;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();

        if( this.finished )
        {
            shaderManager.setAllShaderValue4fv( 'additive', [this.final, this.final, this.final, 1] );
            
            if( this.gameStateChangeMsg )
                eventManager.dispatchEvent( defs.EGE_MENU_GAME_STATE_CHANGE, defs.ETC_END );
        }
        else
        {
            shaderManager.setAllShaderValue4fv( 'additive', [this.current, this.current, this.current, 1] );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

// 
//  DESC: Load the scripts in this file
//
export function loadScripts()
{
    scriptManager.set( 'ScreenFade',
            ( current, final, time, gameStateChangeMsg = false ) => { return new ScreenFade( current, final, time, gameStateChangeMsg ); } );
}
