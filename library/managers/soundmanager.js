
// 
//  FILE NAME: soundmanager.js
//  DESC:      Sound Manager class singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { Sound } from '../common/sound';
import { PlayList } from '../common/playlist';
import { assetHolder } from '../utilities/assetholder';

class SoundManager extends ManagerBase
{
    constructor()
    {
        super();
        
        this.context = null;
        
        if( typeof AudioContext !== 'undefined' )
            this.context = new AudioContext();
        
        else if( typeof webkitAudioContext !== 'undefined' ) 
            this.context = new webkitAudioContext();
        
        else
            throw new Error('AudioContext not supported.');
        
        // Map containing a group of sound ID's
        this.soundMapMap = new Map;

        // Map containing a group of play list ID's
        // Do not free the sounds copied to the play list
        this.playListMapMap = new Map;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry, finishCallback )
    {
        super.loadGroup( 'Sound', this.soundMapMap, groupAry, finishCallback );
    }
    
    //
    //  DESC: Load sound data from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the group map
        let groupMap = this.soundMapMap.get( group );
        
        // Get the node to the sound files to be loaded into a buffer
        let loadFilesNode = node.getElementsByTagName( 'load' );
        
        // Load the buffered sounds
        for( let i = 0; i < loadFilesNode.length; ++i )
        {
            let id = loadFilesNode[i].getAttribute( 'id' );
            let filePath = loadFilesNode[i].getAttribute( 'file' );
            
            // Check for duplicate names
            if( groupMap.has(id) )
                throw new Error( `Duplicate sound group id (${id}, ${group}, ${filePath})!` );
            
            let snd = new Sound;
            groupMap.set( id, snd );
            
            // Load from node
            snd.loadFromNode( loadFilesNode[i] );
            
            // Check if this file has already been loaded
            if( !assetHolder.has( group, filePath ) )
            {
                this.downloadFile( 'binary', group, filePath, finishCallback,
                    ( group, audioData, filePath, finishCallback ) => 
                    {
                        // Store the preloaded XML file
                        assetHolder.set( group, filePath, audioData );

                        // Call the class function to load the data
                        this.loadFromBinaryData( group, id, audioData, filePath, finishCallback );
                    });
            }
            else
            {
                this.loadFromBinaryData( group, id, assetHolder.get( group, filePath), filePath );
            }
        }
        
        // Get the node to the sound files
        let playListNode = node.getElementsByTagName( 'playList' );
        if( playListNode.length )
        {
            let groupMap = new Map;
            this.playListMapMap.set( group, groupMap );
            
            for( let i = 0; i < playListNode.length; ++i )
            {
                // Get the id
                let id = playListNode[i].getAttribute( 'id' );
                
                // Check for duplicate names
                if( groupMap.has(id) )
                    throw new Error( `Duplicate playlist group id (${id}, ${group}, ${filePath})!` );
                
                // Add the playlist data to the map
                let playLst = new PlayList;
                groupMap.set( id, playLst );
                
                // Load the playlist from node
                playLst.loadFromNode( playListNode[i], this.soundMapMap.get( group ), group, filePath );
            }
        }
    }
    
    //
    //  DESC: Load from binary data
    //
    loadFromBinaryData( group, id, audioData, filePath, finishCallback )
    {
        // Increment the load counter because the decoder is asynchronous
        ++this.loadCounter;
        
        // Get the group map
        let groupMap = this.soundMapMap.get( group );
        
        // Get the sound
        let sound = groupMap.get( id );
        
        // Create a sound buffer and decode
        this.context.decodeAudioData( audioData,
            (soundBuffer) =>
            {
                sound.init( this.context, soundBuffer );
                
                // Decrement the load counter
                --this.loadCounter;
                
                if( this.loadCounter === 0 )
                    finishCallback();
            },
            (error) => console.log(`Error decoding audio data (${error.err})!`) );
    }
    
    //
    //  DESC: Free a symbol group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Sound group name can't be found (${group})!` );

            // Erase the group
            if( this.soundMapMap.has( group ) )
                this.soundMapMap.delete( group );
            
            if( this.playListMapMap.has( group ) )
                this.playListMapMap.delete( group );
        }
    }
    
    //
    //  DESC: Get the sound
    //
    getSound( group, soundID )
    {
        // Check if this is a playlist sound ID
        let playLst = this.getPlayList( group, soundID );
        if( playLst )
        {
            return playLst.getSound();
        }

        let groupMap = this.soundMapMap.get( group );
        if( !groupMap )
            throw new Error( `Sound group name can't be found (${group})!` );

        let snd = groupMap.get( soundID );
        if( !snd )
            throw new Error( `Sound ID can't be found (${group}, ${soundID})!` );

        return snd;
    }

    //
    //  DESC: Get the playlist
    //
    getPlayList( group, playLstID )
    {
        // Check if this is a playlist sound ID
        let groupMap = this.playListMapMap.get( group );
        if( groupMap )
        {
            return groupMap.get( playLstID );
        }
        
        return undefined;
    }
    
    //
    //  DESC: Play a sound
    //
    play( group, soundID, loop = false )
    {
        this.getSound( group, soundID ).play( loop );
    }

    //
    //  DESC: Pause a sound
    //
    pause( group, soundID )
    {
        this.getSound( group, soundID ).pause();
    }

    //
    //  DESC: Resume a sound
    //
    resume( group, soundID )
    {
        this.getSound( group, soundID ).resume();
    }

    //
    //  DESC: Resume a sound
    //
    stop( group, soundID )
    {
        this.getSound( group, soundID ).stop();
    }
    
    //
    //  DESC: Set/Get the volume for music or channel
    //
    setVolume( group, soundID, volume )
    {
        this.getSound( group, soundID ).setVolume( volume );
    }

    getVolume( group, soundID )
    {
        return this.getSound( group, soundID ).getVolume();
    }

    //
    //  DESC: Is music or channel playing?
    //
    isPlaying( group, soundID )
    {
        return this.getSound( group, soundID ).isPlaying();
    }

    //
    //  DESC: Is music or channel paused?
    //
    isPaused( group, soundID )
    {
        return this.getSound( group, soundID ).isPaused();
    }
}

export var soundManager = new SoundManager;
