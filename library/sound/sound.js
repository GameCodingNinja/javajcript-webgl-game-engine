
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

        // Gain node for volume
        this.gainNode = null;
        
        // The time the sound started
        this.startTime = 0;
        
        // Pause flag
        this.paused = false;

        // Sound type
        this.type = defs.ESND_EFFECT;
    }
    
    //
    //  DESC: Init the sound
    //
    loadFromNode( node )
    {
        // Set the volume if defined
        let attr = node.getAttribute( 'volume' );
        if( attr )
            this.defaultVolume = Number( attr );

        attr = node.getAttribute( 'type' );
        if( attr )
        {
            if( attr === 'music' )
                this.type = defs.ESND_MUSIC;

            else if( attr === 'dialog' )
                this.type = defs.ESND_DIALOG;
        }
    }
    
    //
    //  DESC: Init the sound
    //
    init( context, buffer )
    {
        this.context = context;
        this.buffer = buffer;
        
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = this.defaultVolume;
    }
    
    //
    //  DESC: Play the sound
    //
    play( loop = false, offset = 0 )
    {
        this.stop();

        if( settings.user.soundEnabled && 
            (this.type === defs.ESND_EFFECT && settings.user.soundEffectsEnabled) ||
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
        if( this.paused && settings.user.soundEnabled )
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
}

