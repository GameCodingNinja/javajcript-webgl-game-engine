
// 
//  FILE NAME: gamedefs.js
//  DESC:      Game specific defines
//

"use strict";

// EGameEvent
export const EGE_BUILDING_DESTROYED     = 2000,
             GAMEPLAY_LOOPING_WRAP_DIST = 5600,
             PLAYER_SHIP_ID = 0,
             PLAYER_SHOT_ID = 1,
             ENEMY00_SHIP_ID = -3,
             ENEMY01_SHIP_ID = -4,
             BOSS00_SHIP_ID = -20,
             BOSS00_RESTING_Y = 55,
             BOSS00_HEALTH_MAX = 5,
             BOSS00_HIT_BAR_MAX = 20,
             BOSS00_DESTROY_TIME = 7000,
             BOSS00_INTERRUPT_PAUSE = 1000,
             BOSS00_BEAM_WIDTH = 33,
             BOSS00_BEAM_GROW_SEC = 1,
             BOSS00_BEAM_RETRACT_SEC = 0.4,
             BOSS00_SHAKE_DELAY = 1000,
             BOSS00_SHAKE_INTERVAL_START = 80,
             BOSS00_SHAKE_INTERVAL_END = 15,
             BOSS00_SHAKE_AMP_START = 2,
             BOSS00_SHAKE_AMP_END = 7,
             BOSS00_MOVE_PIXELS_PER_SEC = 1300,
             BOSS00_DESCEND_PIXELS_PER_SEC = 300,
             pixel_per_sec_100 = 100,
             pixel_per_sec_200 = 200,
             pixel_per_sec_300 = 300,
             X_EASING_SPEED = 30,
             passive_shooter_time = 2000,
             aggressive_shooter_time = 1000,
             destroy_building_shooter_time = 500;

// Game-specific touch event types (starting at 100 to leave room for library types)
export const TOUCH_FIRE        = 100,
             TOUCH_PAUSE       = 101,
             TOUCH_BOOST       = 102,
             TOUCH_DPAD_Y_MOVE = 103;
