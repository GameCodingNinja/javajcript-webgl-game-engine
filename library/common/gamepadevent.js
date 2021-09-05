
// 
//  FILE NAME:  gamepadevent.js
//  DESC:       class for holding a generic event
//

"use strict";

// Gamepad event types
export const GAMEPAD_BUTTON_DOWN   = 0,
             GAMEPAD_BUTTON_UP     = 1,
             GAMEPAD_AXIS_LEFT     = 2,
             GAMEPAD_AXIS_RIGHT    = 3,
             GAMEPAD_TRIGGER_LEFT  = 4,
             GAMEPAD_TRIGGER_RIGHT = 5;

// Negative axis value: X = left, Y = up
export const GAMEPAD_AXIS_LEFT_X  = 0,
             GAMEPAD_AXIS_LEFT_Y  = 1,
             GAMEPAD_AXIS_RIGHT_X = 2,
             GAMEPAD_AXIS_RIGHT_Y = 3;

export const GAMEPAD_BUTTON_A             = 0,
             GAMEPAD_BUTTON_B             = 1,
             GAMEPAD_BUTTON_X             = 2,
             GAMEPAD_BUTTON_Y             = 3,
             GAMEPAD_BUTTON_L_BUMPER      = 4,
             GAMEPAD_BUTTON_R_BUMPER      = 5,
             GAMEPAD_BUTTON_L_TRIGGER     = 6,
             GAMEPAD_BUTTON_R_TRIGGER     = 7,
             GAMEPAD_BUTTON_BACK          = 8,
             GAMEPAD_BUTTON_START         = 9,
             GAMEPAD_BUTTON_LEFTSTICK     = 10,
             GAMEPAD_BUTTON_RIGHTSTICK    = 11,
             GAMEPAD_BUTTON_DPAD_UP       = 12,
             GAMEPAD_BUTTON_DPAD_DOWN     = 13,
             GAMEPAD_BUTTON_DPAD_LEFT     = 14,
             GAMEPAD_BUTTON_DPAD_RIGHT    = 15,
             GAMEPAD_BUTTON_GUIDE         = 16,

             // Alternative key mappings
             ALT_GAMEPAD_BUTTON_BACK       = 6,
             ALT_GAMEPAD_BUTTON_START      = 7,
             ALT_GAMEPAD_BUTTON_GUIDE      = 8,
             ALT_GAMEPAD_BUTTON_LEFTSTICK  = 9,
             ALT_GAMEPAD_BUTTON_RIGHTSTICK = 10,

             // Key codes to use analog sticks as buttons
             GAMEPAD_BUTTON_L_STICK_UP    = 30,
             GAMEPAD_BUTTON_L_STICK_DOWN  = 31,
             GAMEPAD_BUTTON_L_STICK_LEFT  = 32,
             GAMEPAD_BUTTON_L_STICK_RIGHT = 33,
             GAMEPAD_BUTTON_R_STICK_UP    = 34,
             GAMEPAD_BUTTON_R_STICK_DOWN  = 35,
             GAMEPAD_BUTTON_R_STICK_LEFT  = 36,
             GAMEPAD_BUTTON_R_STICK_RIGHT = 37;

export const ANALOG_STICK_MSG_MAX = 0.7;

export class GamepadEvent
{
    constructor( type, eventIndex, gamepad )
    {
        // Event type
        this._type = type;

        // Index of the button or axis this event was created for
        this.eventIndex = eventIndex;

        // The gamepad object this event was created from
        this.gamepad = gamepad;
    }

    //
    //  DESC: Was this button touched?
    //
    get type()
    {
        return this._type;
    }

    //
    //  DESC: Was this button touched?
    //
    get touched()
    {
        return this.gamepad.buttons[this.eventIndex].touched;
    }

    //
    //  DESC: Was this button pressed?
    //  NOTE: This is hear for convience. The type indicates the state we car about
    //
    get pressed()
    {
        return this.gamepad.buttons[this.eventIndex].pressed;
    }

    //
    //  DESC: Is this button a trigger?
    //
    get trigger()
    {
        if( this.eventIndex == GAMEPAD_BUTTON_L_TRIGGER || this.eventIndex == GAMEPAD_BUTTON_R_TRIGGER )
            return true;

        return false;
    }

    //
    //  DESC: Return the value of this button.
    //  NOTE: Only the triggers have a value we might care about
    //
    get buttonValue()
    {
        return this.gamepad.buttons[this.eventIndex].value;
    }

    //
    //  DESC: Return the value of this button.
    //  NOTE: Only the triggers have a value we might care about
    //
    get buttonIndex()
    {
        return this.eventIndex;
    }

    //
    //  DESC: Return the value of the axises
    //
    get axis()
    {
        if( this.type == GAMEPAD_AXIS_LEFT )
        {
            return {
                'axisX' : this.gamepad.axes[GAMEPAD_AXIS_LEFT_X].toFixed(2),
                'axisY' : this.gamepad.axes[GAMEPAD_AXIS_LEFT_Y].toFixed(2)};
        }

        return {
            'axisX' : this.gamepad.axes[GAMEPAD_AXIS_RIGHT_X].toFixed(2),
            'axisY' : this.gamepad.axes[GAMEPAD_AXIS_RIGHT_Y].toFixed(2)};
    }

    //
    //  DESC: Return the index of this gamepad
    //
    get gamepadIndex()
    {
        return this.gamepad.index;
    }
}
