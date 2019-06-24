
//
//  FILE NAME: utilityscripts.js
//  DESC:      script for fading the screen
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { shaderManager } from '../../../library/managers/shadermanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { iScript } from '../../../library/script/iscript';
import { eventManager } from '../../../library/managers/eventmanager';
import { Color } from '../../../library/common/color';
import * as stateDefs from '../state/statedefs';

//
//  DESC: Script for holding for time duration
//
export class Hold extends iScript
{
    constructor()
    {
        super();
        this.time = 0;
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
export class PlayAnim extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
        
        this.frameCount = this.sprite.getFrameCount();
        this.time = 0;
        this.fps = 0;
        this.counter = 0;
        this.loop = false;
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
            
            if( this.counter < this.frameCount )
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
//  DESC: Execute an action at a specific frame rate
//
export class FrameExecute extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
        
        this.time = 0;
        this.fps = 0;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( fps )
    {
        this.fps = fps;
        this.time = 1000.0 / this.fps;
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
            
            this.frame();
        }
    }
    
    // 
    //  DESC: Execute this frame
    //
    frame()
    {
        // To be overridden
    }
}


//
//  DESC: Script for fading in the menu
//
export class FadeTo extends iScript
{
    constructor()
    {
        super();
        this.current = 0;
        this.final = 0;
        this.time = 0;
        this.inc = 0;
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
    }
}

//
//  DESC: Color to the final color in time
//
export class ColorTo extends iScript
{
    constructor()
    {
        super();
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
        this.finished = false;
        
        for( let i = 0; i < 4; ++i )
            this.inc.data[i] = (this.final.data[i] - this.current.data[i]) / this.time;
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
            for( let i = 0; i < 4; ++i )
                this.current.data[i] += this.inc.data[i] * highResTimer.elapsedTime;
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
}

//
//  DESC: Script for fading the screen
//
class ScreenFade extends FadeTo
{
    constructor( current, final, time )
    {
        super();
        
        this.init( current, final, time );
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

            if( this.inc > 0 )
                eventManager.dispatchEvent( stateDefs.ESE_FADE_IN_COMPLETE );
            else
                eventManager.dispatchEvent( stateDefs.ESE_FADE_OUT_COMPLETE );
        }
        else
        {
            shaderManager.setAllShaderValue4fv( 'additive', [this.current, this.current, this.current, 1] );
        }
    }
}

// 
//  DESC: Load the scripts in this file
//
export function loadScripts()
{
    scriptManager.set( 'ScreenFade',
        ( current, final, time ) => { return new ScreenFade( current, final, time ); } );
}
