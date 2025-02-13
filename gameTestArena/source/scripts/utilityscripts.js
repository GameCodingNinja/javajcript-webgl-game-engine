
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
import * as stateDefs from '../state/statedefs';

//
//  DESC: Script for holding for time duration
//
export class Hold
{
    constructor()
    {
        this.time = 0;
        this.iter = null;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( time )
    {
        this.time = time;
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            this.time -= highResTimer.elapsedTime;

            if( this.time < 0 )
                break;

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}


//
//  DESC: Script for playing the frames of an animation
//
export class PlayAnim
{
    constructor( sprite )
    {
        this.sprite = sprite;
        
        this.frameCount = this.sprite.getFrameCount();
        this.time = 0;
        this.fps = 0;
        this.counter = 0;
        this.loop = false;
        this.iter = null;
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
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
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
                        break;
                }
            }

            yield;
        }
        while(true)
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

//
//  DESC: Execute an action at a specific frame rate
//
export class FrameExecute
{
    constructor()
    {
        this.time = 0;
        this.duration = 0;
        this.durationTime = 0;
        this.fps = 0;
        this.iter = null;
        this.callback = null;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( fps, callback, duration = 0 )
    {
        this.fps = fps;
        this.time = 1000.0 / this.fps;
        this.duration = duration;
        if( duration > 0 )
            this.durationTime = 1000.0 / duration;
        this.callback = callback;
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            this.time -= highResTimer.elapsedTime;

            if( this.time < 0 )
            {
                this.time = 1000.0 / this.fps;
                this.callback();
            }

            // Do we specify a count
            if( this.duration > 0 )
            {
                this.durationTime -= highResTimer.elapsedTime;
                if( this.durationTime < 0 )
                    break;
            }

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}


//
//  DESC: Script for fading in the menu
//
export class FadeTo
{
    constructor()
    {
        this.value = 0;
        this.final = 0;
        this.time = 0;
        this.inc = 0;
        this.iter = null;
    }

    // 
    //  DESC: Init the script for use
    //
    init( start, final, time )
    {
        this.value = start;
        this.final = final;
        this.time = time;
        this.inc = (final - start) / time;
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            this.time -= highResTimer.elapsedTime;

            if( this.time < 0 )
            {
                this.value = this.final;
                break;
            }

            this.value += (this.inc * highResTimer.elapsedTime);
                
            yield;
        }
        while( true );
    }

    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

//
//  DESC: Color to the final color in time
//
export class ColorTo
{
    constructor()
    {
        this.value = new Color;
        this.inc = new Color;
        this.final = null;
        this.time = 0;
        this.iter = null;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( start, final, time )
    {
        this.time = time;
        this.final = final;
        this.value.copy( start );
        
        for( this._i = 0; this._i < 4; ++this._i )
            this.inc.data[this._i] = (this.final.data[this._i] - this.value.data[this._i]) / this.time;

        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            this.time -= highResTimer.elapsedTime;

            if( this.time < 0 )
            {
                this.value.copy( this.final );
                break;
            }

            for( this._i = 0; this._i < 4; ++this._i )
                this.value.data[this._i] += this.inc.data[this._i] * highResTimer.elapsedTime;
                
            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

//
//  DESC: Script for fading the screen
//
class ScreenFade
{
    constructor( current, final, time )
    {
        this.fadeTo = new FadeTo();
        this.fadeTo.init( current, final, time );
        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            if( this.fadeTo.execute() )
            {
                shaderManager.setAllShaderValue4fv( 'additive', [this.fadeTo.value, this.fadeTo.value, this.fadeTo.value, 1] );

                if( this.fadeTo.inc > 0 )
                    eventManager.dispatchEvent( stateDefs.ESE_FADE_IN_COMPLETE );
                else
                    eventManager.dispatchEvent( stateDefs.ESE_FADE_OUT_COMPLETE );

                break;
            }

            shaderManager.setAllShaderValue4fv( 'additive', [this.fadeTo.value, this.fadeTo.value, this.fadeTo.value, 1] );

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
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
