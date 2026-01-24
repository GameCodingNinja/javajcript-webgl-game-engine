
// 
//  FILE NAME: soundmanager.js
//  DESC:      Sound Manager class singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { Sound } from '../sound/sound';
import { PlayList } from '../sound/playlist';
import { GroupPlayer } from '../sound/groupplayer';
import * as genFunc from '../utilities/genfunc';

class SoundManager extends ManagerBase
{
    constructor()
    {
        super();
        
        this.context = null;
        
        if( typeof AudioContext !== 'undefined' )
            this.context = new AudioContext();
        
        else
            throw new Error('AudioContext not supported.');
        
        // Map containing a group of map of sound ID's
        this.soundMapMap = new Map;

        // Map containing a group of map of play list ID's
        // Do not free the sounds copied to the play list
        this.playListMapMap = new Map;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( group )
    {
        if( group instanceof Array )
            return super.loadGroupAry( 'Sound', this.soundMapMap, group );
        
        return super.loadGroupAry( 'Sound', this.soundMapMap, [group] );
    }
    
    //
    //  DESC: Load sound data from an xml node
    //
    loadFromNode( group, xmlNode, filePath )
    {
        let promiseAry = [];

        // Get the group map
        this._groupMap = this.soundMapMap.get( group );
        
        // Get the node to the sound files to be loaded into a buffer
        this._loadFilesNode = xmlNode.getElementsByTagName( 'load' );
        
        // Load the buffered sounds
        for( this._i = 0; this._i < this._loadFilesNode.length; ++this._i )
        {
            let id = this._loadFilesNode[this._i].getAttribute( 'id' );
            let filePath = this._loadFilesNode[this._i].getAttribute( 'file' );
            
            // Check for duplicate names
            if( this._groupMap.has(id) )
                throw new Error( `Duplicate sound group id (${id}, ${group}, ${filePath})!` );
            
            this._snd = new Sound;
            this._groupMap.set( id, this._snd );
            
            // Load from node
            this._snd.loadFromNode( this._loadFilesNode[this._i] );

            // Load the sound file
            promiseAry.push( 
                genFunc.downloadFile( 'binary', filePath )
                    .then(( binary ) => this.loadFromBinaryData( group, id, binary, filePath ))
                    .catch(( error ) => { console.error(error.stack); throw error; }));
        }
        
        // Get the node to the sound files
        this._playListNode = xmlNode.getElementsByTagName( 'playList' );
        if( this._playListNode.length )
        {
            // Create the group map if it doesn't already exist
            this._groupMap = this.playListMapMap.get( group );
            if( this._groupMap === undefined )
            {
                this._groupMap = new Map;
                this.playListMapMap.set( group, this._groupMap );
            }
            
            for( this._i = 0; this._i < this._playListNode.length; ++this._i )
            {
                // Get the id
                this._id = this._playListNode[this._i].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this._groupMap.has(this._id) )
                    throw new Error( `Duplicate playlist group id (${this._id}, ${group}, ${filePath})!` );
                
                // Add the playlist data to the map
                this._playLst = new PlayList;
                this._groupMap.set( this._id, this._playLst );
                
                // Load the playlist from node
                this._playLst.loadFromNode( this._playListNode[this._i], this.soundMapMap.get( group ), group, filePath );
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
        this._groupMap = this.soundMapMap.get( group );
        
        // Get the sound
        let sound = this._groupMap.get( id );

        return this.context.decodeAudioData( audioData )
            .then(( soundBuffer ) => { sound.init( this.context, soundBuffer ); })
            .catch(( error ) => { throw new Error(`Error decoding audio data (${filePath}): ${error?.message ?? error}`); });
    }
    
    //
    //  DESC: Free a group
    //
    freeGroup( group )
    {
        this._groupAry = group;
        if( !(group instanceof Array) )
            this._groupAry = [group];

        for( this._grp = 0; this._grp < this._groupAry.length; ++this._grp )
        {
            this._group = this._groupAry[this._grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( this._group ) === undefined )
                throw new Error( `Sound group name can't be found (${this._group})!` );
            
            // Stop any currently playing files
            this._groupMap = this.soundMapMap.get( this._group );
            if( this._groupMap )
            {
                for( this._sound of this._groupMap.values() )
                    this._sound.dispose();
            }

            // Erase the group
            if( this.soundMapMap.has( group ) )
                this.soundMapMap.delete( group );
            
            if( this.playListMapMap.has( group ) )
                this.playListMapMap.delete( group );
        }
    }

    //
    //  DESC: Stop a group
    //
    stopGroup( group )
    {
        // Stop any currently playing files
        this._groupMap = this.soundMapMap.get( group );
        if( this._groupMap )
        {
            for( this._sound of this._groupMap.values() )
                this._sound.stop();
        }
    }

    //
    //  DESC: Create and return a group player
    //
    createGroupPlayer( group )
    {
        this._soundMap = this.soundMapMap.get( group );

        // At a minmum, a sound map group needs to exist
        if( this._soundMap === undefined )
            throw new Error( `Sound group name can't be found (${group})!` );

        return new GroupPlayer( this._soundMap, this.playListMapMap.get( group ) );
    }
    
    //
    //  DESC: Get the sound
    //
    getSound( group, soundID )
    {
        // Check if this is a playlist sound ID
        this._playLst = this.getPlayList( group, soundID );
        if( this._playLst )
            return this._playLst.getSound();

        this._groupMap = this.soundMapMap.get( group );
        if( this._groupMap === undefined )
            throw new Error( `Sound group name can't be found (${group})!` );

        this._snd = this._groupMap.get( soundID );
        if( this._snd === undefined )
            throw new Error( `Sound ID can't be found (${group}, ${soundID})!` );

        return this._snd;
    }

    //
    //  DESC: Pause all active sounds
    //
    suspendAllSounds()
    {
        if(this.context)
            this.context.suspend();
    }

    //
    //  DESC: Resume all active sounds
    //
    resumeAllSounds()
    {
        if(this.context)
            this.context.resume();
    }

    //
    //  DESC: Get the playlist
    //
    getPlayList( group, playLstID )
    {
        // Check if this is a playlist sound ID
        this._groupMap = this.playListMapMap.get( group );
        if( this._groupMap !== undefined )
            return this._groupMap.get( playLstID );
        
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
