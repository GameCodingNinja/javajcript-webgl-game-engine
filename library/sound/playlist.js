
// 
//  FILE NAME: playlist.js
//  DESC:      Play list class
//

"use strict";

import * as genFunc from '../utilities/genfunc';

// EPlayListType
export const EST_NULL       = 0,
             EST_RANDOM     = 1,
             EST_SEQUENTIAL = 2;

export class PlayList
{
    constructor()
    {
        // Counter
        this.counter = 0;

        // current index
        this.current = 0;

        // playlist type - random or sequential
        this.type = EST_NULL;

        // array of sounds
        this.soundAry = [];
    }
    
    // 
    //  DESC: load the playlist from node
    //
    loadFromNode( node, soundGroupMap, group, filePath )
    {
        // Get the play type
        let playtype = node.getAttribute( 'playtype' );
        if( playtype )
        {
            if( playtype === 'random' )
                this.type = EST_RANDOM;
            
            else if( playtype === 'sequential' )
                this.type = EST_SEQUENTIAL;
        }
        
        // Get the sound list node
        let soundNode = node.children;
        if( soundNode.length )
        {
            for( let i = 0; i < soundNode.length; ++i )
            {
                // Get the id
                let id = soundNode[i].getAttribute( "id" );
                
                // Add the sound to the playlist
                let snd = soundGroupMap.get( id );
                if( snd )
                    this.soundAry.push( snd );
                else
                    throw new Error( `Playlist sound Id does not exist (${id}, ${group}, ${filePath})!` );
            }
        }
    }
    
    // 
    //  DESC: Get the sound for the playlist
    //
    getSound()
    {
        // Is it time to shuffle?
        if( (this.type === EST_RANDOM) && (this.counter === 0) )
            genFunc.shuffle( this.soundAry );

        this.current = this.counter;
        this.counter = (this.counter + 1) % this.soundAry.length;

        return this.soundAry[this.current];
    }

    // 
    //  DESC: Play the play list
    //
    play( loop = false, offset = 0 )
    {
        if( (this.type === EST_RANDOM) && (this.counter === 0) )
            genFunc.shuffle( this.soundAry );

        this.current = this.counter;
        this.soundAry[this.current].play( loop, offset );
        this.counter = (this.counter + 1) % this.soundAry.length;
    }

    // 
    //  DESC: Stop the sound
    //
    stop()
    {
        this.soundAry[this.current].stop();
    }

    // 
    //  DESC: Pause the sound
    //
    pause()
    {
        this.soundAry[this.current].pause();
    }

    // 
    //  DESC: Resume the sound
    //
    resume()
    {
        this.soundAry[this.current].resume();
    }

    // 
    //  DESC: Set/Get the volume for music or channel
    //
    setVolume( volume )
    {
        this.soundAry[this.current].setVolume( volume );
    }

    getVolume()
    {
        return this.soundAry[this.current].getVolume();
    }

    // 
    //  DESC: Is music or channel playing?
    //
    isPlaying()
    {
        return this.soundAry[this.current].isPlaying();
    }

    // 
    //  DESC: Is music or channel paused?
    //
    isPaused()
    {
        return this.soundAry[this.current].isPaused();
    }
}
