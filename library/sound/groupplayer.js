// 
//  FILE NAME: player.js
//  DESC:      Class to hold music group to play sound ids
//

"use strict";

export class GroupPlayer
{
    constructor( soundMap, playListMap )
    {
        // Map containing a group of map of sound ID's
        this.soundMap = soundMap;

        // Map containing a group of map of play list ID's
        // Do not free the sounds copied to the play list
        this.playListMap = playListMap;
    }

    //
    //  DESC: Get the sound
    //
    getSound( soundID )
    {
        if( this.playListMap )
        {
            // Check if this is a playlist sound ID
            let playLst = this.playListMap.get( soundID );
            if( playLst )
                return playLst.getSound();
        }

        let snd = this.soundMap.get( soundID );
        if( snd === undefined )
            throw new Error( `Sound ID can't be found (${soundID})!` );

        return snd;
    }

    //
    //  DESC: Play a sound
    //
    play( soundID, loop = false )
    {
        this.getSound( soundID ).play( loop );
    }

    //
    //  DESC: Pause a sound
    //
    pause( soundID )
    {
        this.getSound( soundID ).pause();
    }

    //
    //  DESC: Resume a sound
    //
    resume( soundID )
    {
        this.getSound( soundID ).resume();
    }

    //
    //  DESC: Resume a sound
    //
    stop( soundID )
    {
        this.getSound( soundID ).stop();
    }
    
    //
    //  DESC: Set/Get the volume for music or channel
    //
    setVolume( soundID, volume )
    {
        this.getSound( soundID ).setVolume( volume );
    }

    getVolume( soundID )
    {
        return this.getSound( soundID ).getVolume();
    }

    //
    //  DESC: Is music or channel playing?
    //
    isPlaying( soundID )
    {
        return this.getSound( soundID ).isPlaying();
    }

    //
    //  DESC: Is music or channel paused?
    //
    isPaused( soundID )
    {
        return this.getSound( soundID ).isPaused();
    }
}