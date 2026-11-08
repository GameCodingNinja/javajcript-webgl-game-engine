
// 
//  FILE NAME: platform.js
//  DESC:      Singleton wrapper for the optional game portal SDKs (CrazyGames, YouTube Playables).
//             Each SDK is detected at runtime and every call does nothing when its SDK isn't there.
//

"use strict";

class Platform
{
    // 
    //  DESC: Running on CrazyGames (its SDK is loaded)
    //
    isCrazyGames()
    {
        return (typeof window.CrazyGames !== 'undefined');
    }

    // 
    //  DESC: Running in YouTube Playables
    //
    isYouTubePlayables()
    {
        return (typeof window.ytgame !== 'undefined' && window.ytgame.IN_PLAYABLES_ENV);
    }

    // 
    //  DESC: Init the SDKs that need it (CrazyGames). Wait for it before calling anything else.
    //
    async init()
    {
        if( this.isCrazyGames() )
            await window.CrazyGames.SDK.init();
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
