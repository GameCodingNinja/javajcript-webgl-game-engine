// 
//  FILE NAME: menudefs.js
//  DESC:      misc defines
//

"use strict";

// EMenuType
export const EMT_NON_BLOCKING = 0,
             EMT_BLOCKING     = 1;

// EMenuState
export const EMS_INACTIVE        = 0,
             EMS_IDLE            = 1,
             EMS_ACTIVE          = 2,
             EMS_MAX_MENU_STATES = 3;

// EMenuNavigationState
export const EMNS_NULL             = 0,
             EMNS_MOUSE            = 1,
             EMNS_GAMEPAD_KEYBAORD = 2;

// EMenuTreeState
export const EMTS_INACTIVE             = 0,
             EMTS_IDLE                 = 1,
             EMTS_ACTIVE               = 2,
             EMTS_MAX_MENU_TREE_STATES = 3;

// EMenuEvent
export const EME_MENU_TRANS_IN             = 100,
             EME_MENU_TRANS_OUT            = 101,
             EME_MENU_ESCAPE_ACTION        = 102,
             EME_MENU_TOGGLE_ACTION        = 103,
             EME_MENU_BACK_ACTION          = 104,
             EME_MENU_TO_TREE              = 105,
             EME_MENU_TO_MENU              = 106,
             EME_MENU_GAME_STATE_CHANGE    = 107,
             EME_MENU_UP_ACTION            = 108,
             EME_MENU_DOWN_ACTION          = 109,
             EME_MENU_LEFT_ACTION          = 110,
             EME_MENU_RIGHT_ACTION         = 111,
             EME_MENU_CONTROL_STATE_CHANGE = 112,
             EME_MENU_SELECT_ACTION        = 113,
             EME_MENU_SELECT_EXECUTE       = 114,
             EME_MENU_SET_ACTIVE_CONTROL   = 115,
             EME_MENU_REACTIVATE           = 116,
             EME_MENU_SCROLL_UP            = 117,
             EME_MENU_SCROLL_DOWN          = 118,
             EME_MENU_SCROLL_LEFT          = 119,
             EME_MENU_SCROLL_RIGHT         = 120,
             EME_MENU_TAB_LEFT             = 121,
             EME_MENU_TAB_RIGHT            = 122;

// EActiveControl
export const EAC_NULL                 = 0,
             EAC_FIRST_ACTIVE_CONTROL = 1,
             EAC_LAST_ACTIVE_CONTROL  = 2;

// ETransCode
export const ETC_RESET = 0,
             ETC_BEGIN = 1,
             ETC_END   = 2;