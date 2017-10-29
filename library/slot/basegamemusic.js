
// 
//  FILE NAME: basegamemusic.js
//  DESC:      Class for handling base game music
//

"use strict";

import { iGameMusic } from './igamemusic';
import { Timer } from '../utilities/timer';
import { soundManager } from '../managers/soundmanager';
import { highResTimer } from '../utilities/highresolutiontimer';

export class BaseGameMusic extends iGameMusic
{
    constructor( group, soundId, fadeTime, musicTimeOut )
    {
        super();
        
        // stop spin music timer
        this.stopSpinMusicTimer = new Timer;
        
        // Get the spin music
        this.spinMusic = soundManager.getSound( group, soundId );
        
        // The default volume level
        this.defVolume = this.spinMusic.getVolume();
        
        // Fade duration
        this.fadeDuration = 1.0 / fadeTime;
        
        // Music time out
        this.musicTimeOut = musicTimeOut;
    }
    
    //
    //  DESC: Handle update checks
    //
    update()
    {
        // Fade down the music if the player is not spinning
        if( !this.spinMusic.isPaused() && this.spinMusic.isPlaying() && this.stopSpinMusicTimer.expired() )
        {
            let volume = this.spinMusic.getVolume() - (this.fadeDuration * highResTimer.elapsedTime);
            this.spinMusic.setVolume(volume);

            if( volume < 0.0 )
                this.spinMusic.pause();
        }
        else if( !this.spinMusic.isPaused() && this.spinMusic.getVolume() < this.defVolume )
        {
            let volume = this.spinMusic.getVolume() + (this.fadeDuration * highResTimer.elapsedTime);
            
            if( volume > this.defVolume )
                volume = this.defVolume;
            
            this.spinMusic.setVolume(volume);
        }
    }
    
    //
    //  DESC: Fast a fade down. Could be exiting the game
    //
    fastFadeDown( fadeDurationOverride = 0 )
    {
        this.stopSpinMusicTimer.setExpired();
        
        if( fadeDurationOverride > 0 )
            this.fadeDuration = 1.0 / fadeDurationOverride;
    }
    
    //
    //  DESC: Start the music
    //
    startMusic()
    {
        this.stopSpinMusicTimer.disable( true );
        
        if( !this.spinMusic.isPlaying() )
            this.spinMusic.play(true);
        
        else if( this.spinMusic.isPaused() )
            this.spinMusic.resume();
    }
    
    //
    //  DESC: Start the music timeout
    //
    setTimeOut()
    {
        // Set the timer that waits to see if the music should time out
        this.stopSpinMusicTimer.disable( false );
        this.stopSpinMusicTimer.set( this.musicTimeOut );
    }
}
