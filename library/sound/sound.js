
// 
//  FILE NAME: sound.js
//  DESC:      Class to hold the sound resource
//

"use strict";

import { settings } from '../utilities/settings';
import * as defs from '../common/defs';

export class Sound
{
    constructor()
    {
        // Audio context
        this.context = null;
        
        // Sound buffer
        this.buffer = null;

        // Sound source that needs to be recreated
        // each time the sound is played
        this.source = null;
        
        // Default volume of sound
        this.defaultVolume = 1;

        // The init volume
        this.initVolume = 1;

        // Gain node for volume
        this.gainNode = null;
        
        // The time the sound started
        this.startTime = 0;

        // Are we playing
        this.playing = false;
        
        // Pause flag
        this.paused = false;

        // Sound type
        this.type = defs.ESND_EFFECT;

        // Play onn load
        this.playOnLoad = false;

        // Looping sound
        this.loop = false;
    }
    
    //
    //  DESC: Init the sound
    //
    loadFromNode( node )
    {
        // Set the default volume if defined. Same goes for the init volume
        this._attr = node.getAttribute( 'defaultVolume' );
        if( this._attr )
        {
            this.defaultVolume = Number( this._attr );
            this.initVolume = this.defaultVolume;
        }

        // The init volume mught be different
        this._attr = node.getAttribute( 'initVolume' );
        if( this._attr )
        {
            this.initVolume = Number( this._attr );
        }

        this._attr = node.getAttribute( 'type' );
        if( this._attr )
        {
            if( this._attr === 'music' )
                this.type = defs.ESND_MUSIC;

            else if( this._attr === 'dialog' )
                this.type = defs.ESND_DIALOG;
        }

        this._attr = node.getAttribute( 'playOnLoad' );
        if( this._attr )
            this.playOnLoad = (this._attr === 'true');

        this._attr = node.getAttribute( 'loop' );
        if( this._attr )
            this.loop = (this._attr === 'true');
    }
    
    //
    //  DESC: Init the sound
    //
    init( context, buffer )
    {
        this.context = context;
        this.buffer = buffer;
        
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = this.initVolume;
        this.gainNode.connect(this.context.destination);

        if( this.playOnLoad )
            this.play( this.loop );
    }
    
    //
    //  DESC: Play the sound
    //
    play( loop = false, offset = 0 )
    {
        this.stop();

        if( settings.user.soundEnabled && 
            ((this.type === defs.ESND_EFFECT && settings.user.soundEffectEnabled) ||
            (this.type === defs.ESND_MUSIC && settings.user.soundMusicEnabled) ||
            (this.type === defs.ESND_DIALOG && settings.user.soundDialogEnabled)) )
        {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;

            this.source.loop = loop;
            
            this.source.connect(this.gainNode);

            this.source.start(0, offset % this.buffer.duration);
            this.startTime = this.context.currentTime - offset;
            this.playing = true;
        }
    }
    
    //
    //  DESC: Stop the sound
    //
    stop()
    {
        if( this.source )
        {
            this.startTime = 0;
            this.paused = false;
            this.playing = false;
            this.source.stop();
            this.source = null;
        }
    }
    
    //
    //  DESC: Pause the sound
    //
    pause()
    {
        if( this.source )
        {
            this.paused = true;
            this.playing = false;
            this.source.stop();
            this.startTime = (this.context.currentTime - this.startTime);
        }
    }
    
    //
    //  DESC: Resume the sound
    //
    resume()
    {
        if( this.paused && settings.user.soundEnabled && 
            (this.type === defs.ESND_EFFECT && settings.user.soundEffectEnabled) ||
            (this.type === defs.ESND_MUSIC && settings.user.soundMusicEnabled) ||
            (this.type === defs.ESND_DIALOG && settings.user.soundDialogEnabled) )
        {
            this.paused = false;
            this.playing = true;
            this.play(this.source.loop, this.startTime);
        }
    }
    
    //
    //  DESC: Set/get the volume (0..1)
    //
    setVolume( volume )
    {
        this._cappedVolume = volume;
        
        if( this.gainNode )
        {
            if( this._cappedVolume < 0 )
                this._cappedVolume = 0;
            
            else if( this._cappedVolume > 1 )
                this._cappedVolume = 1;
                
            this.gainNode.gain.value = this._cappedVolume;
        }
    }
    
    getVolume()
    {
        if( this.gainNode )
            return this.gainNode.gain.value;
        
        return 0;
    }

    //
    //  DESC: Is playing?
    //
    isPlaying()
    {
        return this.playing;
    }

    //
    //  DESC: Is paused?
    //
    isPaused()
    {
        return this.paused;
    }

    //
    //  DESC: Resume if paused, play if not?
    //
    playOrResume( loop = false )
    {
        if( this.paused )
            this.resume();
        else
            this.play( loop );
    }

    //
    //  DESC: Was this sound played?
    //
    wasPlayed()
    {
        return (this.startTime !== 0);
    }

        //
    //  DESC: Dispose of sound resources
    //
    dispose()
    {
        this.source.stop();
        if( this.gainNode )
        {
            this.gainNode.disconnect();
        }
        
        this.gainNode = null;
        this.buffer = null;
        this.context = null;
    }
}

