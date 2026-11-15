
// 
//  FILE NAME: platform.js
//  DESC:      Singleton wrapper for the optional game portal SDKs (CrazyGames, YouTube Playables, GameMonetize).
//             Each SDK is detected at runtime and every call does nothing when its SDK isn't there.
//

"use strict";

// Time (ms) a GameMonetize ad has to start (SDK_GAME_PAUSE) before the request counts as no ad available
const GAMEMONETIZE_AD_TIMEOUT = 15000;

class Platform
{
    constructor()
    {
        // YouTube Playables save data, loaded by init() (its loadData() is async, the game reads it right away)
        this.youTubeData = null;

        // The CrazyGames SDK is loaded and usable, set by init()
        this.crazyGames = false;

        // Pending GameMonetize rewarded ad request (its callbacks, null when none), a GameMonetize ad is playing,
        // and the timeout for the ad to start
        this.gmCallbacks = null;
        this.gmAdShowing = false;
        this.gmTimeoutId = 0;

        // A GameMonetize ad paused by a click on it (the advertiser's page opened). The SDK never resumes it,
        // so it's resumed when the page is visible and focused again.
        this.gmAdPaused = false;
        document.addEventListener( 'visibilitychange', () => this.resumeGameMonetizeAd() );
        window.addEventListener( 'focus', () => this.resumeGameMonetizeAd() );

        // Called when a GameMonetize ad starts/ends (the game has to mute/unmute)
        this.adPauseCallback = null;
        this.adResumeCallback = null;

        // The GameMonetize SDK events, forwarded by the SDK_OPTIONS.onEvent in index.html.
        // The SDK copies SDK_OPTIONS when it loads (async, maybe before this bundle), so onEvent can't be set from here.
        window.gameMonetizeOnEvent = (event) => this.onGameMonetizeEvent( event );
    }

    // 
    //  DESC: Running on CrazyGames (its SDK is loaded and enabled on this domain, known after init())
    //
    isCrazyGames()
    {
        return this.crazyGames;
    }

    // 
    //  DESC: The page is served from a CrazyGames domain (also their iOS/Android apps) or localhost (sitelock)
    //
    isCrazyGamesHost()
    {
        let hostname = window.location.hostname;

        return (hostname === 'crazygames.com' || hostname.endsWith( '.crazygames.com' ) ||
                hostname === 'localhost' || hostname === '127.0.0.1');
    }

    // 
    //  DESC: Running in YouTube Playables
    //
    isYouTubePlayables()
    {
        return (typeof window.ytgame !== 'undefined' && window.ytgame.IN_PLAYABLES_ENV);
    }

    // 
    //  DESC: Running with the GameMonetize SDK (its SDK_OPTIONS script is in index.html).
    //        The SDK itself may still be missing (ad blocker), requestRewardedAd() checks for it.
    //
    isGameMonetize()
    {
        return (typeof window.SDK_OPTIONS !== 'undefined' && !!window.SDK_OPTIONS.gameId);
    }

    // 
    //  DESC: The platform has rewarded ads (requestRewardedAd() can play one)
    //
    hasRewardedAds()
    {
        return (this.isCrazyGames() || this.isGameMonetize());
    }

    // 
    //  DESC: Init the SDKs that need it (CrazyGames) and load the YouTube Playables save data.
    //        Wait for it before calling anything else.
    //        Sitelock: with the CrazyGames SDK loaded, the game only runs on CrazyGames (and localhost for testing).
    //        Anywhere else it shows a message and rejects, so the game never starts.
    //        The CrazyGames SDK is "disabled" outside CrazyGames and localhost and all its calls throw,
    //        so it's treated as not loaded.
    //
    async init()
    {
        if( typeof window.CrazyGames !== 'undefined' )
        {
            if( !this.isCrazyGamesHost() )
            {
                document.body.style.backgroundColor = 'black';
                document.body.innerHTML = '<p style="color: white; font: 24px sans-serif; text-align: center; margin-top: 40vh;">Available only on CrazyGames</p>';
                throw new Error( 'Sitelock: this game is available only on CrazyGames' );
            }

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
    //  DESC: Request a rewarded ad (CrazyGames, GameMonetize)
    //        callbacks: { adStarted: () => {}, adFinished: () => {}, adError: (error) => {} }
    //        GameMonetize has no rewarded ad type: its ad (skippable or not) counts as watched when it ends.
    //        It reports adError( 'unfilled' ) when no ad plays (SDK missing, no ad, too soon after the last one,
    //        not started within GAMEMONETIZE_AD_TIMEOUT) and adError( 'error' ) on SDK_ERROR.
    //
    async requestRewardedAd( callbacks )
    {
        if( this.isCrazyGames() )
            await window.CrazyGames.SDK.ad.requestAd( 'rewarded', callbacks );

        else if( this.isGameMonetize() )
        {
            // The SDK script didn't load (ex: ad blocker)
            if( typeof window.sdk === 'undefined' || typeof window.sdk.showBanner !== 'function' )
            {
                callbacks.adError( 'unfilled' );
                return;
            }

            this.gmCallbacks = callbacks;
            clearTimeout( this.gmTimeoutId );
            this.gmTimeoutId = setTimeout( () => this.endGameMonetizeAd( 'unfilled' ), GAMEMONETIZE_AD_TIMEOUT );

            window.sdk.showBanner();
        }
    }

    // 
    //  DESC: Handle a GameMonetize SDK event (see the constructor)
    //
    onGameMonetizeEvent( event )
    {
        // An ad is about to play: the game has to pause and mute
        if( event.name === 'SDK_GAME_PAUSE' )
        {
            clearTimeout( this.gmTimeoutId );
            this.gmAdShowing = true;

            if( this.adPauseCallback )
                this.adPauseCallback();

            if( this.gmCallbacks )
                this.gmCallbacks.adStarted();
        }
        // The ad ended (watched or skipped, the SDK doesn't say). The SDK also sends it without a
        // SDK_GAME_PAUSE when it plays no ad (no ad, ad error, too soon after the last ad).
        else if( event.name === 'SDK_GAME_START' )
        {
            this.gmAdPaused = false;

            if( this.gmAdShowing )
            {
                this.gmAdShowing = false;

                if( this.adResumeCallback )
                    this.adResumeCallback();

                this.endGameMonetizeAd( null );
            }
            else
            {
                this.endGameMonetizeAd( 'unfilled' );
            }
        }
        else if( event.name === 'SDK_ERROR' )
        {
            this.gmAdPaused = false;

            if( this.gmAdShowing )
            {
                this.gmAdShowing = false;

                if( this.adResumeCallback )
                    this.adResumeCallback();
            }

            this.endGameMonetizeAd( 'error' );
        }
        // A click on the ad opens the advertiser's page and pauses the ad (see resumeGameMonetizeAd())
        else if( event.name === 'PAUSED' )
        {
            this.gmAdPaused = this.gmAdShowing;
        }
        else if( event.name === 'RESUMED' )
        {
            this.gmAdPaused = false;
        }
    }

    // 
    //  DESC: Resume a GameMonetize ad paused by a click on it, once the page is visible again.
    //        The SDK has no resume call, so it resumes the SDK's Google IMA ads manager.
    //
    resumeGameMonetizeAd()
    {
        if( this.gmAdPaused && !document.hidden )
        {
            let adsManager = window.sdk && window.sdk.videoAdInstance && window.sdk.videoAdInstance.adsManager;
            if( adsManager && typeof adsManager.resume === 'function' )
                adsManager.resume();
        }
    }

    // 
    //  DESC: Report the result of the pending GameMonetize ad request, if any (error is null when the ad played)
    //
    endGameMonetizeAd( error )
    {
        clearTimeout( this.gmTimeoutId );

        let callbacks = this.gmCallbacks;
        this.gmCallbacks = null;

        if( callbacks )
        {
            if( error )
                callbacks.adError( error );
            else
                callbacks.adFinished();
        }
    }

    // 
    //  DESC: Called when a GameMonetize ad starts playing, including ads the game didn't request (the game has to mute)
    //
    onAdPause( callback )
    {
        this.adPauseCallback = callback;

        // An ad is already playing (ex: a preroll that started before the game connected this)
        if( this.gmAdShowing )
            callback();
    }

    // 
    //  DESC: Called when a GameMonetize ad ends (the game can unmute)
    //
    onAdResume( callback )
    {
        this.adResumeCallback = callback;
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
