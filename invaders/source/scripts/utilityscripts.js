
//
//  FILE NAME: utilityscripts.js
//  DESC:      scripts for fading the screen
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
        
        for( let i = 0; i < 4; ++i )
            this.inc.data[i] = (this.final.data[i] - this.value.data[i]) / this.time;

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

            for( let i = 0; i < 4; ++i )
                this.value.data[i] += this.inc.data[i] * highResTimer.elapsedTime;
                
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
    constructor( current, final, time, fadeType )
    {
        this.fadeTo = new FadeTo();
        this.fadeTo.init( current, final, time );
        this.iter = this.iteration();
        this.fadeType = fadeType;
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        if( this.fadeTo.inc > 0 )
            eventManager.dispatchEvent( stateDefs.ESE_FADE_IN_START, this.fadeType );
        else
            eventManager.dispatchEvent( stateDefs.ESE_FADE_OUT_START, this.fadeType );

        do
        {
            if( this.fadeTo.execute() )
            {
                shaderManager.setAllShaderValue4fv( 'additive', [this.fadeTo.value, this.fadeTo.value, this.fadeTo.value, 1] );

                if( this.fadeTo.inc > 0 )
                    eventManager.dispatchEvent( stateDefs.ESE_FADE_IN_COMPLETE, this.fadeType );
                else
                    eventManager.dispatchEvent( stateDefs.ESE_FADE_OUT_COMPLETE, this.fadeType );

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
//  DESC: Script for fading the music
//
class MusicFade
{
    constructor( final, time, snd, preAction = null, postAction = null )
    {
        this.fadeTo = new FadeTo();
        this.fadeTo.init( snd.getVolume(), final, time );
        this.iter = this.iteration();
        this.snd = snd;
        this.result;
        this.postAction = postAction;

        if( preAction )
            preAction();
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            this.result = this.fadeTo.execute();

            this.snd.setVolume( this.fadeTo.value );

            if( this.result )
                break;

            yield;
        }
        while( true );

        if( this.postAction )
            this.postAction();
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
//  DESC: Script that executes a function before and after a timeout
//
class DelayedExecution
{
    constructor( time, preAction = null, postAction = null )
    {
        this.hold = new Hold();
        this.hold.init( time );
        this.postAction = postAction;
        this.iter = this.iteration();

        if( preAction )
            preAction();
    }
    
    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            if( this.hold.execute() )
            {
                if( this.postAction )
                    this.postAction();

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
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'ScreenFade',
        ( current, final, time, fadeType = null ) => { return new ScreenFade( current, final, time, fadeType ); } );

    scriptManager.set( 'MusicFade',
        ( final, time, snd, preAction, postAction ) => { return new MusicFade( final, time, snd, preAction, postAction ); } );

    scriptManager.set( 'DelayedExecution',
        ( time, preAction, postAction ) => { return new DelayedExecution( time, preAction, postAction ); } );
}
