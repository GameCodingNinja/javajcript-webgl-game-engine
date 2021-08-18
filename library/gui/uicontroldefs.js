// 
//  FILE NAME: uicontroldefs.js
//  DESC:      misc defines
//

"use strict";

// Increment/Decement constants
export const BTN_DEC = 0,
             BTN_INC = 1;

// EControlType
export const ECT_NULL          = 0,
             ECT_LABEL         = 1,
             ECT_BUTTON        = 2,
             ECT_BUTTON_LIST   = 3,
             ECT_CHECK_BOX     = 4,
             ECT_SLIDER        = 5,
             ECT_SCROLL_BOX    = 6,
             ECT_SUB_CONTROL   = 7,
             ECT_METER         = 8,
             ECT_TAB_CONTROL   = 9,
             ECT_PROGRESS_BAR  = 10,
             ECT_AMOUNT_BUTTON = 11;

// EControlState
export const ECS_NULL      = 0,
             ECS_TRANS_IN  = 1,
             ECS_TRANS_OUT = 2,
             ECS_DISABLE   = 3,
             ECS_INACTIVE  = 4,
             ECS_ACTIVE    = 5,
             ECS_SELECT    = 6,
             ECS_CHANGE    = 7,
             ECS_EXECUTE   = 8,
             ECS_EVENT     = 9;

// EControlActionType
export const ECAT_IDLE              = -1,
             ECAT_NULL              = 0,
             ECAT_ACTION            = 1,
             ECAT_TO_TREE           = 2,
             ECAT_TO_MENU           = 3,
             ECAT_BACK              = 4,
             ECAT_CLOSE             = 5,
             ECAT_CHANGE_FOCUS      = 6,
             ECAT_GAME_STATE_CHANGE = 7,
             ECAT_QUIT_GAME         = 8,
             ECAT_ACTION_EVENT      = 9;

// EActionResponse
export const EAR_UP    = 1,
             EAR_DOWN  = 2,
             EAR_LEFT  = 4,
             EAR_RIGHT = 8;
