
// 
//  FILE NAME: soundmanager.js
//  DESC:      Sound Manager class singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { Sound } from '../sound/sound';
import { PlayList } from '../sound/playlist';
import * as genFunc from '../utilities/genfunc';

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
    loadGroup( groupAry )
    {
        return super.loadGroupAry( 'Sound', this.soundMapMap, groupAry );
    }
    
    //
    //  DESC: Load sound data from an xml node
    //
    loadFromNode( group, xmlNode, filePath )
    {
        let promiseAry = [];

        // Get the group map
        let groupMap = this.soundMapMap.get( group );
        
        // Get the node to the sound files to be loaded into a buffer
        let loadFilesNode = xmlNode.getElementsByTagName( 'load' );
        
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

            // Load the sound file
            promiseAry.push( 
                genFunc.downloadFile( 'binary', filePath )
                    .then(( binary ) => this.loadFromBinaryData( group, id, binary, filePath ))
                    .catch(( error ) => { console.error(error.stack); throw error; }));
        }
        
        // Get the node to the sound files
        let playListNode = xmlNode.getElementsByTagName( 'playList' );
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

        return Promise.all( promiseAry );
    }
    
    //
    //  DESC: Load from binary data
    //
    loadFromBinaryData( group, id, audioData, filePath )
    {
        // Get the group map
        let groupMap = this.soundMapMap.get( group );
        
        // Get the sound
        let sound = groupMap.get( id );

        return new Promise((resolve, reject) => {
        
            // Create a sound buffer and decode
            this.context.decodeAudioData( audioData,
                (soundBuffer) => 
                {
                    sound.init( this.context, soundBuffer );
                    resolve();
                },
                (error) => reject( Error(`Error decoding audio data (${error.err}, ${filePath})!`) ) );
        });
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
            
            // Stop any currently playing files
            let groupMap = this.soundMapMap.get( group );
            for( let sound of groupMap.values() )
                sound.stop();

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
            return playLst.getSound();

        let groupMap = this.soundMapMap.get( group );
        if( groupMap === undefined )
            throw new Error( `Sound group name can't be found (${group})!` );

        let snd = groupMap.get( soundID );
        if( snd === undefined )
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
        if( groupMap !== undefined )
            return groupMap.get( playLstID );
        
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