
//
//  FILE NAME: keybindmenucripts.js
//  DESC:      script for keybinding
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { GamepadEvent } from '../../../library/common/gamepadevent';
import { menuManager } from '../../../library/gui/menumanager';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

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

        let btnDisabled = true;

        for( let i = 0; i < deviceAry.length; i++ )
        {
            const [actionStr, configurable] = actionManager.getDeviceActionStr( i, this.control.name );

            if( actionStr )
                deviceAry[i].createFontString( actionStr );
            else
                deviceAry[i].createFontString( "NA" );

            if( !configurable )
                deviceAry[i].changeState( uiControlDefs.ECS_DISABLE );
            else
                btnDisabled = false;
        }

        return true;
    }
}

//
//  Handle execute event
//
export class KeyBindBtn_execute
{
    constructor( control )
    {}

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        // Disable all action checking so that most buttons
        // can be key mapped without being acted on
        actionManager.allowActionHandling = false;
        //menuManager.allowEventHandling = false;
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
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !actionManager.allowAction && this.control.isSelected() )
        {
            if( this.event instanceof KeyboardEvent )
            {
                if( this.event.type == 'keyup' )
                {
                    console.log('KeyboardEvent trapped.');
                }
            }
            else if( this.event instanceof MouseEvent )
            {
                if( this.event.type == 'mouseup' )
                {
                    console.log('MouseEvent trapped.');
                }
            }
            else if( this.event instanceof GamepadEvent )
            {
                console.log('GamepadEvent trapped.');
            }
        }

        return true;
    }
}



//
//  Handle event
//
/*void KeyBindBtn_event( uiControl & control, uint type, int code )
{
    if( !ActionMgr.isAction() && control.isSelected() )
    {
        uint eventType = 0;
        int eventCode = 0;
        int data = 0;
        uint index = 0;
        while( (index = ActionMgr.enumerateButtonEvents( eventType, eventCode, data, index )) > 0 )
        {
            if( eventType == NEvents::SDL_KEYUP )
            {
                Print("Type: KEYBOARD, code: "+eventCode+", data: "+data+", index: "+index);
                KeyBindBtn_bindButtonPress( control, type, NDeviceId::KEYBOARD, eventCode );
                break;
            }
            else if( eventType == NEvents::SDL_MOUSEBUTTONUP )
            {
                Print("Type: MOUSE, code: "+eventCode+", data: "+data+", index: "+index);
                KeyBindBtn_bindButtonPress( control, type, NDeviceId::MOUSE, eventCode );
                break;
            }
            else if( eventType == NEvents::SDL_CONTROLLERBUTTONUP )
            {
                Print("Type: GAMEPAD, code: "+eventCode+", data: "+data+", index: "+index);
                KeyBindBtn_bindButtonPress( control, type, NDeviceId::GAMEPAD, eventCode );
                break;
            }
        }
    }
}*/

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
}
