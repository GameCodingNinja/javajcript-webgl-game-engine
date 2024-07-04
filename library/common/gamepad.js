
// 
//  FILE NAME:  gamepad.js
//  DESC:       class for holding gamepad object and a copy of it's values
//  NOTE:       Some browsers keep the same gamepad object while others issue a new one.
//              This is a solution that will solve the problem of remembering the button pressed state.
//

"use strict";

export class Gamepad
{
    constructor( gp )
    {
        // The gamepad object this event was created from
        this.gp = gp;

        // List of last pressed values
        this._pressed = [];

        // List of last axes values
        this._axes = [];

        // Copy the values over
        for( const each of gp.buttons )
            this._pressed.push( each.pressed );

        // Copy the values over
        for( const each of gp.axes )
            this._axes.push( each );
    }

    //
    //  DESC: Set the gamepad and copy the last data
    //
    set gamepad( gp )
    {
        // Update the class member because the gamepad object might be different
        this.gp = gp;

        for( this._i = 0; this._i < gp.buttons.length; ++this._i )
            this._pressed[this._i] = gp.buttons[this._i].pressed;

        for( this._i = 0; this._i < gp.axes.length; ++this._i )
            this._axes[this._i] = gp.axes[this._i];
    }

    //
    //  DESC: Get the last set of buttons pressed
    //
    get pressed()
    {
        return this._pressed;
    }
    
    //
    //  DESC: Get the last set of axes
    //
    get axes()
    {
        return this._axes;
    }
}
