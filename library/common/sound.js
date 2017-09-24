
// 
//  FILE NAME: sound.js
//  DESC:      Class to hold the sound reference and type
//

"use strict";

export class Sound
{
    constructor( type = 0 )
    {
        // Sound type - loaded or stream
        this.type = type;
        
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
        this.startTime = null;
        
        // Pause flag
        this.paused = false;
        
        // The play time
        this.playDuration = 0;
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
        
        this.playDuration = offset;
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;

        this.source.loop = loop;
        
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        
        this.startTime = this.context.currentTime;
        this.source.start(0, offset);
    }
    
    //
    //  DESC: Stop the sound
    //
    stop()
    {
        if( this.startTime )
        {
            this.startTime = null;
            this.paused = false;
            this.playDuration = 0;
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
            this.playDuration += (this.context.currentTime - this.startTime);
            this.source.stop();
        }
    }
    
    //
    //  DESC: Resume the sound
    //
    resume()
    {
        if( this.paused )
        {
            this.paused = false;
            this.play(false, this.playDuration);
        }
    }
    
    //
    //  DESC: Set/get the volume (0..1)
    //
    setVolume( volume )
    {
        if( this.gainNode )
            this.gainNode.gain.value = volume;
    }
    
    setVolume( volume )
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
        return (this.startTime !== null);
    }

    //
    //  DESC: Is paused?
    //
    isPaused()
    {
        return this.paused;
    }
}

