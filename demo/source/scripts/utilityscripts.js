
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
//  DESC: Script for holding for time duration
//
export class Hold
{
    constructor( sprite )
    {
        this.time = 0;
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( time )
    {
        this.time = time;
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
    }
}


//
//  DESC: Script for playing the frames of an animation
//
export class Play
{
    constructor( sprite )
    {
        this.sprite = sprite;
        
        this.time = 0;
        this.fps = 0;
        this.counter = 0;
        this.loop = false;
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( fps, loop = false )
    {
        this.fps = fps;
        this.time = 1000.0 / this.fps;
        this.loop = loop;
        this.counter = 0;
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
            this.time = 1000.0 / this.fps;
            this.counter++;
            
            if( this.counter < this.sprite.getFrameCount() )
            {
                this.sprite.setFrame( this.counter );
            }
            else
            {
                if( this.loop )
                {
                    this.counter = 0;
                    this.sprite.setFrame( this.counter );
                }
                else
                    this.finished = true;
            }
        }
    }
}

//
//  DESC: Script for fading in the menu
//
export class FadeTo
{
    constructor()
    {
        this.current = 0;
        this.final = 0;
        this.time = 0;
        this.inc = 0;
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( current, final, time )
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
            this.finished = true;

        else
            this.current += (this.inc * highResTimer.elapsedTime);
        
        if( this.current > 1 )
            this.current = 1;
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
    
    // 
    //  DESC: Init the script for use
    //
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
    get color()
    {
        if( this.finished )
            return this.final;
        else
            return this.current;
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for fading the screen
//
class ScreenFade extends FadeTo
{
    constructor( current, final, time, gameStateChangeMsg )
    {
        super();
        
        this.init( current, final, time );
        
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
    isFinished() { return this.finished; }
}

// 
//  DESC: Load the scripts in this file
//
export function loadScripts()
{
    scriptManager.set( 'ScreenFade',
        ( current, final, time, gameStateChangeMsg = false ) => { return new ScreenFade( current, final, time, gameStateChangeMsg ); } );
}
