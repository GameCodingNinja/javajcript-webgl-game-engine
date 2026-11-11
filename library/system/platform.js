
// 
//  FILE NAME: platform.js
//  DESC:      Singleton wrapper for the optional game portal SDKs (CrazyGames, YouTube Playables).
//             Each SDK is detected at runtime and every call does nothing when its SDK isn't there.
//

"use strict";

class Platform
{
    constructor()
    {
        // YouTube Playables save data, loaded by init() (its loadData() is async, the game reads it right away)
        this.youTubeData = null;

        // The CrazyGames SDK is loaded and usable, set by init()
        this.crazyGames = false;
    }

    // 
    //  DESC: Running on CrazyGames (its SDK is loaded and enabled on this domain, known after init())
    //
    isCrazyGames()
    {
        return this.crazyGames;
    }

    // 
    //  DESC: Running in YouTube Playables
    //
    isYouTubePlayables()
    {
        return (typeof window.ytgame !== 'undefined' && window.ytgame.IN_PLAYABLES_ENV);
    }

    // 
    //  DESC: Init the SDKs that need it (CrazyGames) and load the YouTube Playables save data.
    //        Wait for it before calling anything else.
    //        Outside CrazyGames and localhost the CrazyGames SDK is "disabled" and all its calls throw,
    //        so it's treated as not loaded.
    //
    async init()
    {
        if( typeof window.CrazyGames !== 'undefined' )
        {
            await window.CrazyGames.SDK.init();
            this.crazyGames = (window.CrazyGames.SDK.environment !== 'disabled');
        }

        if( this.isYouTubePlayables() )
            this.youTubeData = await window.ytgame.game.loadData();
    }

    // 
    //  DESC: Load the saved data string (null if never saved) from the platform's storage:
    //        YouTube Playables save data (one blob, key not used), the CrazyGames Data Module or the browser's localStorage
    //
    loadData( key )
    {
        this._data = null;

        if( this.isYouTubePlayables() )
            this._data = this.youTubeData;

        else if( this.isCrazyGames() )
            this._data = window.CrazyGames.SDK.data.getItem( key );

        else
            this._data = window.localStorage.getItem( key );

        return this._data;
    }

    // 
    //  DESC: Save the data string to the platform's storage (see loadData())
    //
    saveData( key, data )
    {
        if( this.isYouTubePlayables() )
            this.saveYouTubeData( data );

        else if( this.isCrazyGames() )
            window.CrazyGames.SDK.data.setItem( key, data );

        else
            window.localStorage.setItem( key, data );
    }

    // 
    //  DESC: Clear the platform's storage (see loadData())
    //
    clearData()
    {
        if( this.isYouTubePlayables() )
            this.saveYouTubeData( '' );

        else if( this.isCrazyGames() )
            window.CrazyGames.SDK.data.clear();

        else
            window.localStorage.clear();
    }

    // 
    //  DESC: Save the YouTube Playables data, reporting a failure to YouTube
    //
    saveYouTubeData( data )
    {
        this.youTubeData = data;

        window.ytgame.game.saveData( data ).then( () => {}, (e) =>
        {
            console.error( e );
            window.ytgame.health.logError();
        });
    }

    // 
    //  DESC: The game started loading its assets (CrazyGames)
    //
    loadingStart()
    {
        if( this.isCrazyGames() )
            window.CrazyGames.SDK.game.loadingStart();
    }

    // 
    //  DESC: The game finished loading its assets (CrazyGames)
    //
    loadingStop()
    {
        if( this.isCrazyGames() )
            window.CrazyGames.SDK.game.loadingStop();
    }

    // 
    //  DESC: Gameplay started or resumed (CrazyGames)
    //
    gameplayStart()
    {
        if( this.isCrazyGames() )
            window.CrazyGames.SDK.game.gameplayStart();
    }

    // 
    //  DESC: Gameplay stopped or paused (CrazyGames)
    //
    gameplayStop()
    {
        if( this.isCrazyGames() )
            window.CrazyGames.SDK.game.gameplayStop();
    }

    // 
    //  DESC: Request a rewarded ad (CrazyGames)
    //        callbacks: { adStarted: () => {}, adFinished: () => {}, adError: (error) => {} }
    //
    async requestRewardedAd( callbacks )
    {
        if( this.isCrazyGames() )
            await window.CrazyGames.SDK.ad.requestAd( 'rewarded', callbacks );
    }

    // 
    //  DESC: The portal wants the game audio muted (CrazyGames muteAudio setting)
    //
    isAudioMuted()
    {
        return (this.isCrazyGames() && window.CrazyGames.SDK.game.settings.muteAudio === true);
    }

    // 
    //  DESC: Called with true/false when the portal mutes/unmutes the game audio (CrazyGames muteAudio setting)
    //
    onAudioMutedChange( callback )
    {
        if( this.isCrazyGames() )
            window.CrazyGames.SDK.game.addSettingsChangeListener( (newSettings) => callback( newSettings.muteAudio === true ) );
    }

    // 
    //  DESC: The first frame has been drawn (YouTube Playables)
    //
    firstFrameReady()
    {
        if( this.isYouTubePlayables() )
            window.ytgame.game.firstFrameReady();
    }

    // 
    //  DESC: The game is ready to be played (YouTube Playables)
    //
    gameReady()
    {
        if( this.isYouTubePlayables() )
            window.ytgame.game.gameReady();
    }

    // 
    //  DESC: Send the player's score (YouTube Playables)
    //
    sendScore( value )
    {
        if( this.isYouTubePlayables() )
            window.ytgame.engagement.sendScore( { value: value } );
    }

    // 
    //  DESC: Called with true/false when the platform enables/disables the audio (YouTube Playables)
    //
    onAudioEnabledChange( callback )
    {
        if( this.isYouTubePlayables() )
            window.ytgame.system.onAudioEnabledChange( callback );
    }

    // 
    //  DESC: Called when the platform pauses the game (YouTube Playables)
    //
    onPause( callback )
    {
        if( this.isYouTubePlayables() )
            window.ytgame.system.onPause( callback );
    }

    // 
    //  DESC: Called when the platform resumes the game (YouTube Playables)
    //
    onResume( callback )
    {
        if( this.isYouTubePlayables() )
            window.ytgame.system.onResume( callback );
    }
}

export var platform = new Platform;
