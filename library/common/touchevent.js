
// 
//  FILE NAME:  touchevent.js
//  DESC:       class for holding a touch event
//

"use strict";

// Touch event types
export const TOUCH_DPAD_UP    = 0,
             TOUCH_DPAD_DOWN  = 1,
             TOUCH_DPAD_LEFT  = 2,
             TOUCH_DPAD_RIGHT = 3,
             TOUCH_FIRE       = 4,
             TOUCH_PAUSE      = 5;

// Touch event actions
export const TOUCH_BUTTON_DOWN = 0,
             TOUCH_BUTTON_UP   = 1;

export class TouchEvent
{
    constructor()
    {
        this._type = 0;
        this._action = 0;
    }

    init( type, action )
    {
        this._type = type;
        this._action = action;
    }

    get type()
    {
        return this._type;
    }

    get action()
    {
        return this._action;
    }
}
