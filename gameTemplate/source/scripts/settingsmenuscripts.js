
//
//  FILE NAME: settingsmenucripts.js
//  DESC:      scripts for settings menu
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { settings } from '../../../library/utilities/settings';
import { localStorage } from '../../../library/utilities/localstorage';

//
//  Handle init status of sound check box
//
export class SoundCheckBox_InitStatus
{
    constructor( control )
    {
        this.control = control;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Nothing to do here
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.control.toggleState = (settings.user.soundEnabled === 1);

        return true;
    }
}

//
//  Handle execute of sound check box
//
export class SoundCheckBox_execute
{
    constructor( control )
    {
        this.control = control;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Nothing to do here
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        settings.user.soundEnabled = this.control.toggleState == true ? 1 : 0;
        localStorage.set( 'userSettings', settings.user );

        return true;
    }
}

//
//  Handle init status of dead zone slider
//
export class DeadZoneSlider_InitStatus
{
    constructor( control )
    {
        this.control = control;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Nothing to do here
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.control.setSlider( settings.user.stickDeadZone * 100 );

        return true;
    }
}

//
//  Handle execute of dead zone slider
//
export class DeadZoneSlider_execute
{
    constructor( control )
    {
        this.control = control;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Nothing to do here
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        settings.user.stickDeadZone = (Math.trunc(this.control.curValue) * 0.01).toFixed(2);
        localStorage.set( 'userSettings', settings.user );
        return true;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'SoundCheckBox_InitStatus',
        ( control ) => { return new SoundCheckBox_InitStatus( control ); } );

    scriptManager.set( 'SoundCheckBox_execute',
        ( control ) => { return new SoundCheckBox_execute( control ); } );

    scriptManager.set( 'DeadZoneSlider_InitStatus',
        ( control ) => { return new DeadZoneSlider_InitStatus( control ); } );

    scriptManager.set( 'DeadZoneSlider_execute',
        ( control ) => { return new DeadZoneSlider_execute( control ); } );
}
