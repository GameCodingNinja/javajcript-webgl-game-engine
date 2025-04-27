
// 
//  FILE NAME: statedefs.js
//  DESC:      state specific defines
//

"use strict";
     
// These states are custom per game project
// EGameState
export const EGS_NULL         = 0,
             EGS_STARTUP      = 1,
             EGS_TITLE_SCREEN = 2,
             EGS_GAME_LOAD    = 3,
             EGS_LEVEL_1      = 4;
    
// EStateEvent
export const ESE_STATE_EVENTS            = 1000,
             ESE_FADE_GAME_STATE_CHANGE  = 1001,
             ESE_FADE_IN_START           = 1002,
             ESE_FADE_OUT_START          = 1003,
             ESE_FADE_IN_COMPLETE        = 1004,
             ESE_FADE_OUT_COMPLETE       = 1005,
             ESE_ASSET_LOAD_COMPLETE     = 1006,
             ESE_SHOW_GAME_OVER_MENU     = 1007,
             ESE_GAME_RELOAD             = 1008,
             ESE_GAME_AD_START           = 1009,
             ESE_GAME_AD_FINISHED        = 1010;
