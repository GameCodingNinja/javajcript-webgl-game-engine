
//
//  FILE NAME: keybindmenucripts.js
//  DESC:      script for keybinding
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { GamepadEvent } from '../../../library/common/gamepadevent';
import { eventManager } from '../../../library/managers/eventmanager';
import { menuManager } from '../../../library/gui/menumanager';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';
import * as gamepadevent from '../../../library/common/gamepadevent';
import * as defs from '../../../library/common/defs';
import * as menuDefs from '../../../library/gui/menudefs';

//
//  Handle init
//
export class KeyBindBtn_init
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
        let deviceAry = [
            this.control.findSubControlByName('keyboard'),
            this.control.findSubControlByName('mouse'),
            this.control.findSubControlByName('gamepad') ];

        for( let i = 0; i < deviceAry.length; i++ )
        {
            const [actionStr, configurable] = actionManager.getDeviceActionStr( i, this.control.name );

            if( actionStr )
                deviceAry[i].createFontString( actionStr );
            else
                deviceAry[i].createFontString( "NA" );

            if( !configurable )
                deviceAry[i].changeState( uiControlDefs.ECS_DISABLE );
        }

        return true;
    }
}

//
//  Handle execute event
//
export class KeyBindBtn_execute
{
    constructor( /*control*/ )
    {}

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // Disable all action checking so that most buttons
        // can be key mapped without being acted on
        actionManager.allowActionHandling = false;

        return true;
    }
}

//
//  Handle event
//
export class KeyBindBtn_event
{
    constructor( control, event )
    {
        this.control = control;
        this.event = event;
    }

    // 
    //  DESC: Bind the button press
    //
    bindButtonPress( deviceId, keyCode )
    {
        let labelStr = "keyboard";
        if( deviceId == defs.MOUSE )
            labelStr = "mouse";
        else if( deviceId == defs.GAMEPAD )
            labelStr = "gamepad";

        // Check for escape/enter to disable key mapping process
        if( !(keyCode === 'Enter' || keyCode === 'Escape') )
        {
            console.log(`${labelStr} mapped: ${keyCode}`);
            let [componetIdStr, configurable] = actionManager.resetAction( deviceId, this.control.name, keyCode );

            if( configurable )
            {
                // Reset the string Id
                let labelCrtl = this.control.findControlByName( labelStr );
                if( labelCrtl )
                {
                    labelCrtl.createFontString( componetIdStr );
                    labelCrtl.prepareSpriteScript( 'changed' );

                    // Save the key binding changes to file
                    actionManager.saveKeybinding();
                }
            }
        }

        // Re-enable action checking
        actionManager.allowActionHandling = true;

        // Dispatch a message to clear the selected control and put it back into active state
        eventManager.dispatchEvent( menuDefs.EGE_MENU_REACTIVATE );
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !actionManager.allowAction && this.control.isSelected() )
        {
            if( this.event instanceof KeyboardEvent )
            {
                if( this.event.type === 'keyup' )
                {
                    this.bindButtonPress( defs.KEYBOARD, this.event.code );
                }
            }
            else if( this.event instanceof MouseEvent )
            {
                if( this.event.type === 'mouseup' )
                {
                    this.bindButtonPress( defs.MOUSE, this.event.button );
                }
            }
            else if( this.event instanceof GamepadEvent )
            {
                if( this.event.type === gamepadevent.GAMEPAD_BUTTON_UP )
                {
                    this.bindButtonPress( defs.GAMEPAD, this.event.buttonIndex );
                }
            }
        }

        return true;
    }
}

//
//  DESC: Script for playing the active sound
//
class Control_OnKeybindReset
{
    constructor( /*control*/ )
    {
    }

    // 
    //  DESC: Handle resettings of key bind buttons
    //
    execute()
    {
        // Reset the key bindings for all controls and save
        actionManager.resetKeybinding();

        // Since the above reset all the keybinding to the default value,
        // Need to do the below to reload the data into the scroll box
        let scrollBoxCtrl = menuManager.getMenu('key_bindings_menu').getControl( "key_binding_scroll_box" );

        // Get each control and call it's init script
        for( let each of scrollBoxCtrl.scrollControlAry )
        {
            if( each.faction == "key_binding_btn" )
                each.scriptComponent.prepare( 'init', each );
        }

        eventManager.dispatchEvent( menuDefs.EGE_MENU_BACK_ACTION );

        return true;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'KeyBindBtn_init',
        ( control ) => { return new KeyBindBtn_init( control ); } );

    scriptManager.set( 'KeyBindBtn_execute',
        ( control ) => { return new KeyBindBtn_execute( control ); } );

    scriptManager.set( 'KeyBindBtn_event',
        ( control, event ) => { return new KeyBindBtn_event( control, event ); } );

    scriptManager.set( 'Control_OnKeybindReset',
        ( control ) => { return new Control_OnKeybindReset( control ); } );
}
