
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
        let attr = node.getAttribute( 'defaultVolume' );
        if( attr )
        {
            this.defaultVolume = Number( attr );
            this.initVolume = this.defaultVolume;
        }

        // The init volume mught be different
        attr = node.getAttribute( 'initVolume' );
        if( attr )
        {
            this.initVolume = Number( attr );
        }

        attr = node.getAttribute( 'type' );
        if( attr )
        {
            if( attr === 'music' )
                this.type = defs.ESND_MUSIC;

            else if( attr === 'dialog' )
                this.type = defs.ESND_DIALOG;
        }

        attr = node.getAttribute( 'playOnLoad' );
        if( attr )
            this.playOnLoad = (attr === 'true');

        attr = node.getAttribute( 'loop' );
        if( attr )
            this.loop = (attr === 'true');
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
            (this.type === defs.ESND_EFFECT && settings.user.soundEffectEnabled) ||
            (this.type === defs.ESND_MUSIC && settings.user.soundMusicEnabled) ||
            (this.type === defs.ESND_DIALOG && settings.user.soundDialogEnabled) )
        {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;

            this.source.loop = loop;
            
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.context.destination);
            
            this.source.start(0, offset % this.buffer.duration);
            this.startTime = this.context.currentTime - offset;
        }
    }
    
    //
    //  DESC: Stop the sound
    //
    stop()
    {
        if( this.startTime )
        {
            if( !this.source.loop )
                this.startTime = 0;
            
            this.paused = false;
            this.source.stop();
        }
    }
    
    //
    //  DESC: Pause the sound
    //
    pause()
    {
        if( !this.paused && this.startTime )
        {
            this.paused = true;
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
            this.play(this.source.loop, this.startTime);
        }
    }
    
    //
    //  DESC: Set/get the volume (0..1)
    //
    setVolume( volume )
    {
        let cappedVolume = volume;
        
        if( this.gainNode )
        {
            if( cappedVolume < 0 )
                cappedVolume = 0;
            
            else if( cappedVolume > 1 )
                cappedVolume = 1;
                
            this.gainNode.gain.value = cappedVolume;
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
        if( this.startTime && this.source.loop )
            return true;
        
        return (this.startTime && ((this.context.currentTime - this.startTime) < this.source.buffer.duration) );
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
}

