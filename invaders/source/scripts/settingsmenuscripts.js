
//
//  FILE NAME: settingsmenucripts.js
//  DESC:      scripts for settings menu
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { settings } from '../../../library/utilities/settings';
import { localStorage } from '../../../library/utilities/localstorage';
import { menuManager } from '../../../library/gui/menumanager';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';

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
    //  DESC: Execute this script object
    //
    execute()
    {
        settings.user.soundEnabled = this.control.toggleState == true ? 1 : 0;
        localStorage.set( 'userSettings', JSON.stringify(settings.user) );

        let settingsMenu = menuManager.getMenu('settings_menu');

        if( settings.user.soundEnabled )
        {
            settingsMenu.getControl( "sound_effect_check_box" ).changeState( uiControlDefs.ECS_INACTIVE );
            settingsMenu.getControl( "sound_music_check_box" ).changeState( uiControlDefs.ECS_INACTIVE );
        }
        else
        {
            settingsMenu.getControl( "sound_effect_check_box" ).changeState( uiControlDefs.ECS_DISABLE );
            settingsMenu.getControl( "sound_music_check_box" ).changeState( uiControlDefs.ECS_DISABLE );
        }

        return true;
    }
}

//
//  Handle init status of sound effect check box
//
export class SoundEffectCheckBox_InitStatus
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !settings.user.soundEnabled )
            this.control.changeState( uiControlDefs.ECS_DISABLE );

        this.control.toggleState = (settings.user.soundEffectEnabled === 1);

        return true;
    }
}

//
//  Handle execute of sound effect check box
//
export class SoundEffectCheckBox_execute
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        settings.user.soundEffectEnabled = this.control.toggleState == true ? 1 : 0;
        localStorage.set( 'userSettings', JSON.stringify(settings.user) );

        return true;
    }
}

//
//  Handle init status of sound music check box
//
export class SoundMusicCheckBox_InitStatus
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !settings.user.soundEnabled )
            this.control.changeState( uiControlDefs.ECS_DISABLE );

        this.control.toggleState = (settings.user.soundMusicEnabled === 1);

        return true;
    }
}

//
//  Handle execute of sound music check box
//
export class SoundMusicCheckBox_execute
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        settings.user.soundMusicEnabled = this.control.toggleState == true ? 1 : 0;
        localStorage.set( 'userSettings', JSON.stringify(settings.user) );

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
    //  DESC: Execute this script object
    //
    execute()
    {
        settings.user.stickDeadZone = (Math.trunc(this.control.curValue) * 0.01).toFixed(2);
        localStorage.set( 'userSettings', JSON.stringify(settings.user) );
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

    scriptManager.set( 'SoundEffectCheckBox_InitStatus',
        ( control ) => { return new SoundEffectCheckBox_InitStatus( control ); } );

    scriptManager.set( 'SoundEffectCheckBox_execute',
        ( control ) => { return new SoundEffectCheckBox_execute( control ); } );

    scriptManager.set( 'SoundMusicCheckBox_InitStatus',
        ( control ) => { return new SoundMusicCheckBox_InitStatus( control ); } );

    scriptManager.set( 'SoundMusicCheckBox_execute',
        ( control ) => { return new SoundMusicCheckBox_execute( control ); } );

    scriptManager.set( 'DeadZoneSlider_InitStatus',
        ( control ) => { return new DeadZoneSlider_InitStatus( control ); } );

    scriptManager.set( 'DeadZoneSlider_execute',
        ( control ) => { return new DeadZoneSlider_execute( control ); } );
}
