
// 
//  FILE NAME: slotdefs.js
//  DESC:      misc slot defines
//

"use strict";

// ESlotDevice
export const ED_NULL  = 0,
             ED_REEL  = 1,
             ED_WHEEL = 2;

// ESpinDirection
export const ESD_UP               = 0,
             ESD_DOWN             = 1,
             ESD_LEFT             = 2,
             ESD_RIGHT            = 3,
             EDS_CLOCKWISE        = 4,
             EDS_COUNTERCLOCKWISE = 5;

// EPayType
export const EP_PAYLINE = 0,
             EP_SCATTER = 1;
    
// ESpinState
export const ESS_STOPPED         = 0,
             ESS_SPIN_STARTING   = 1,
             ESS_SPINNING        = 2,
             ESS_PREPARE_TO_STOP = 3,
             ESS_SPIN_STOPPING   = 4;
    
// ESlotState
export const ESLOT_IDLE                    = 0,
             ESLOT_WAIT_CYCLE_RESULTS_STOP = 1,
             ESLOT_PLACE_WAGER             = 2,
             ESLOT_GENERATE_STOPS          = 3,
             ESLOT_EVALUATE                = 4,
             ESLOT_PRE_SPIN                = 5,
             ESLOT_SPIN                    = 6,
             ESLOT_POST_SPIN               = 7,
             ESLOT_PRE_AWARD_WIN           = 8,
             ESLOT_BONUS_DECISION          = 9,
             ESLOT_PRE_BONUS               = 10,
             ESLOT_BONUS                   = 11,
             ESLOT_POST_BONUS              = 12,
             ESLOT_POST_AWARD_WIN          = 13,
             ESLOT_WAIT_FOR_AWARD          = 14,
             ESLOT_END                     = 15;
