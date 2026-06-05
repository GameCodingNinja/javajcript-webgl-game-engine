
// 
//  FILE NAME:  touchevent.js
//  DESC:       class for holding a touch event
//

"use strict";

// Touch event types
export const TOUCH_DPAD_UP    = 0,
             TOUCH_DPAD_DOWN  = 1,
             TOUCH_DPAD_LEFT  = 2,
             TOUCH_DPAD_RIGHT = 3;

// Touch event actions
export const TOUCH_BUTTON_DOWN = 0,
             TOUCH_BUTTON_UP   = 1;

export class TouchEvent
{
    constructor()
    {
        this.type = 0;
        this.action = 0;
        this.value = 0;
    }

    init( type, action, value = 0 )
    {
        this.type = type;
        this.action = action;
        this.value = value;
    }
}
