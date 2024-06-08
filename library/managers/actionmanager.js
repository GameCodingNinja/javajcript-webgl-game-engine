// 
//  FILE NAME: actionmanager.js
//  DESC:      Class for handling action mapping
//

"use strict";
import { KeyCodeAction } from '../common/keycodeaction';
import { GamepadEvent } from '../common/gamepadevent';
import { localStorage } from '../utilities/localstorage';
import * as gamepadevent from '../common/gamepadevent';
import * as genFunc from '../utilities/genfunc';
import * as defs from '../common/defs';

export const UNBOUND_KEYCODE_STR_ID     = '---',
             UNBOUND_KEYCODE_ID         = -1;

export const MOUSE_BUTTON_LEFT          = 0,
             MOUSE_BUTTON_MIDDLE        = 1,
             MOUSE_BUTTON_RIGHT         = 2,
             MOUSE_BUTTON_1X            = 3,
             MOUSE_BUTTON_2X            = 4,
             MOUSE_BUTTON_3X            = 5,
             MOUSE_BUTTON_4X            = 6,
             MOUSE_BUTTON_5X            = 7,
             MOUSE_BUTTON_6X            = 8,
             MOUSE_BUTTON_7X            = 9,
             MOUSE_BUTTON_8X            = 10;

class ActionManager
{
    constructor()
    {
        this.keyboardKeyCodeMap = new Map;
        this.mouseKeyCodeMap = new Map;
        this.gamepadKeyCodeMap = new Map;
        
        // Action maps
        this.keyboardActionMap = new Map;
        this.mouseActionMap = new Map;
        this.gamepadActionMap = new Map;
        
        // Flag to allow action handling
        this.allowAction = true;
        
        // Last device used
        this.lastDeviceUsed = defs.DEVICE_NULL;

        // xml node
        this.mainNode = null;

        // action mapping dictionary loaded from json
        this.actionDict = null;
        
        this.keyboardKeyCodeMap.set( UNBOUND_KEYCODE_STR_ID, UNBOUND_KEYCODE_ID );
        this.keyboardKeyCodeMap.set( 'ENTER',        'Enter' );
        this.keyboardKeyCodeMap.set( 'ESCAPE',       'Escape' );
        this.keyboardKeyCodeMap.set( 'ARROW UP',     'ArrowUp' );
        this.keyboardKeyCodeMap.set( 'ARROW DOWN',   'ArrowDown' );
        this.keyboardKeyCodeMap.set( 'ARROW LEFT',   'ArrowLeft' );
        this.keyboardKeyCodeMap.set( 'ARROW RIGHT',  'ArrowRight' );
        this.keyboardKeyCodeMap.set( 'A',            'KeyA' );
        this.keyboardKeyCodeMap.set( 'B',            'KeyB' );
        this.keyboardKeyCodeMap.set( 'C',            'KeyC' );
        this.keyboardKeyCodeMap.set( 'D',            'KeyD' );
        this.keyboardKeyCodeMap.set( 'E',            'KeyE' );
        this.keyboardKeyCodeMap.set( 'F',            'KeyF' );
        this.keyboardKeyCodeMap.set( 'G',            'KeyG' );
        this.keyboardKeyCodeMap.set( 'H',            'KeyH' );
        this.keyboardKeyCodeMap.set( 'I',            'KeyI' );
        this.keyboardKeyCodeMap.set( 'J',            'KeyJ' );
        this.keyboardKeyCodeMap.set( 'K',            'KeyK' );
        this.keyboardKeyCodeMap.set( 'L',            'KeyL' );
        this.keyboardKeyCodeMap.set( 'M',            'KeyM' );
        this.keyboardKeyCodeMap.set( 'N',            'KeyN' );
        this.keyboardKeyCodeMap.set( 'O',            'KeyO' );
        this.keyboardKeyCodeMap.set( 'P',            'KeyP' );
        this.keyboardKeyCodeMap.set( 'Q',            'KeyQ' );
        this.keyboardKeyCodeMap.set( 'R',            'KeyR' );
        this.keyboardKeyCodeMap.set( 'S',            'KeyS' );
        this.keyboardKeyCodeMap.set( 'T',            'KeyT' );
        this.keyboardKeyCodeMap.set( 'U',            'KeyU' );
        this.keyboardKeyCodeMap.set( 'V',            'KeyV' );
        this.keyboardKeyCodeMap.set( 'W',            'KeyW' );
        this.keyboardKeyCodeMap.set( 'X',            'KeyX' );
        this.keyboardKeyCodeMap.set( 'Y',            'KeyY' );
        this.keyboardKeyCodeMap.set( 'Z',            'KeyZ' );
        this.keyboardKeyCodeMap.set( '0',            'Digit0' );
        this.keyboardKeyCodeMap.set( '1',            'Digit1' );
        this.keyboardKeyCodeMap.set( '2',            'Digit2' );
        this.keyboardKeyCodeMap.set( '3',            'Digit3' );
        this.keyboardKeyCodeMap.set( '4',            'Digit4' );
        this.keyboardKeyCodeMap.set( '5',            'Digit5' );
        this.keyboardKeyCodeMap.set( '6',            'Digit6' );
        this.keyboardKeyCodeMap.set( '7',            'Digit7' );
        this.keyboardKeyCodeMap.set( '8',            'Digit8' );
        this.keyboardKeyCodeMap.set( '9',            'Digit9' );
        this.keyboardKeyCodeMap.set( 'F1',           'F1' );
        this.keyboardKeyCodeMap.set( 'F2',           'F2' );
        this.keyboardKeyCodeMap.set( 'F3',           'F3' );
        this.keyboardKeyCodeMap.set( 'F4',           'F4' );
        this.keyboardKeyCodeMap.set( 'F5',           'F5' );
        this.keyboardKeyCodeMap.set( 'F6',           'F6' );
        this.keyboardKeyCodeMap.set( 'F7',           'F7' );
        this.keyboardKeyCodeMap.set( 'F8',           'F8' );
        this.keyboardKeyCodeMap.set( 'F9',           'F9' );
        this.keyboardKeyCodeMap.set( 'F10',          'F10' );
        this.keyboardKeyCodeMap.set( 'F11',          'F11' );
        this.keyboardKeyCodeMap.set( 'F12',          'F12' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 0',     'Numpad0' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 1',     'Numpad1' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 2',     'Numpad2' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 3',     'Numpad3' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 4',     'Numpad4' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 5',     'Numpad5' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 6',     'Numpad6' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 7',     'Numpad7' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 8',     'Numpad8' );
        this.keyboardKeyCodeMap.set( 'NUMPAD 9',     'Numpad9' );
        this.keyboardKeyCodeMap.set( 'NUM LOCK',     'NumLock' );
        this.keyboardKeyCodeMap.set( 'NUMPAD /',     'NumpadDivide' );
        this.keyboardKeyCodeMap.set( 'NUMPAD *',     'NumpadMultiply' );
        this.keyboardKeyCodeMap.set( 'NUMPAD -',     'NumpadSubtract' );
        this.keyboardKeyCodeMap.set( 'NUMPAD +',     'NumpadAdd' );
        this.keyboardKeyCodeMap.set( 'NUMPAD ENTER', 'NumpadEnter' );
        this.keyboardKeyCodeMap.set( 'NUMPAD .',     'NumpadDecimal' );
        this.keyboardKeyCodeMap.set( 'CTRL LEFT',    'ControlLeft' );
        this.keyboardKeyCodeMap.set( 'SHIFT LEFT',   'ShiftLeft' );
        this.keyboardKeyCodeMap.set( 'ALT LEFT',     'AltLeft' );
        this.keyboardKeyCodeMap.set( 'CTRL RIGHT',   'ControlRight' );
        this.keyboardKeyCodeMap.set( 'SHIFT RIGHT',  'ShiftRight' );
        this.keyboardKeyCodeMap.set( 'ALT RIGHT',    'AltRight' );
        this.keyboardKeyCodeMap.set( 'PRINT SCREEN', 'PrintScreen' );
        this.keyboardKeyCodeMap.set( 'SCROLL LOCK',  'ScrollLock' );
        this.keyboardKeyCodeMap.set( 'PAUSE',        'Pause' );
        this.keyboardKeyCodeMap.set( 'END',          'End' );
        this.keyboardKeyCodeMap.set( 'INSERT',       'Insert' );
        this.keyboardKeyCodeMap.set( 'DELETE',       'Delete' );
        this.keyboardKeyCodeMap.set( 'HOME',         'Home' );
        this.keyboardKeyCodeMap.set( 'PAGE UP',      'PageUp' );
        this.keyboardKeyCodeMap.set( 'PAGE DOWN',    'PageDown' );
        this.keyboardKeyCodeMap.set( 'BACKSPACE',    'Backspace' );
        this.keyboardKeyCodeMap.set( 'TAB',          'Tab' );
        this.keyboardKeyCodeMap.set( 'SPACE',        'Space' );
        this.keyboardKeyCodeMap.set( ',',            'Comma' );
        this.keyboardKeyCodeMap.set( '-',            'Minus' );
        this.keyboardKeyCodeMap.set( '.',            'Period' );
        this.keyboardKeyCodeMap.set( '/',            'Slash' );
        this.keyboardKeyCodeMap.set( '=',            'Equal' );
        this.keyboardKeyCodeMap.set( ';',            'Semicolon' );
        this.keyboardKeyCodeMap.set( '[',            'BracketLeft' );
        this.keyboardKeyCodeMap.set( '\\',           'Backslash' );
        this.keyboardKeyCodeMap.set( ']',            'BracketRight' );
        this.keyboardKeyCodeMap.set( '`',            'Backquote' );
        this.keyboardKeyCodeMap.set( "'",            'Quote' );
        this.keyboardKeyCodeMap.set( 'META LEFT',    'MetaLeft' );
        this.keyboardKeyCodeMap.set( 'META RIGHT',   'MetaRight' );
        this.keyboardKeyCodeMap.set( 'CONTEXT MENU', 'ContextMenu' );

        this.keyboardKeyCodeMap.set( 'LAUNCH MAIL',      'LaunchMail' );
        this.keyboardKeyCodeMap.set( 'LAUNCH APP 1',     'LaunchApp1' );
        this.keyboardKeyCodeMap.set( 'LAUNCH APP 2',     'LaunchApp2' );
        this.keyboardKeyCodeMap.set( 'MEDIA TRACK PREV', 'MediaTrackPrevious' );
        this.keyboardKeyCodeMap.set( 'MEDIA TRACK NEXT', 'MediaTrackNext' );
        this.keyboardKeyCodeMap.set( 'MEDIA PLAY PAUSE', 'MediaPlayPause' );
        
        this.mouseKeyCodeMap.set( UNBOUND_KEYCODE_STR_ID, UNBOUND_KEYCODE_ID );
        this.mouseKeyCodeMap.set( 'LEFT MOUSE',   MOUSE_BUTTON_LEFT );
        this.mouseKeyCodeMap.set( 'MIDDLE MOUSE', MOUSE_BUTTON_MIDDLE );
        this.mouseKeyCodeMap.set( 'RIGHT MOUSE',  MOUSE_BUTTON_RIGHT );
        this.mouseKeyCodeMap.set( 'MOUSE 1X',     MOUSE_BUTTON_1X );
        this.mouseKeyCodeMap.set( 'MOUSE 2X',     MOUSE_BUTTON_2X );
        this.mouseKeyCodeMap.set( 'MOUSE 3X',     MOUSE_BUTTON_3X );
        this.mouseKeyCodeMap.set( 'MOUSE 4X',     MOUSE_BUTTON_4X );
        this.mouseKeyCodeMap.set( 'MOUSE 5X',     MOUSE_BUTTON_5X );
        this.mouseKeyCodeMap.set( 'MOUSE 6X',     MOUSE_BUTTON_6X );
        this.mouseKeyCodeMap.set( 'MOUSE 7X',     MOUSE_BUTTON_7X );
        this.mouseKeyCodeMap.set( 'MOUSE 8',      MOUSE_BUTTON_8X );

        this.gamepadKeyCodeMap.set( UNBOUND_KEYCODE_STR_ID,     UNBOUND_KEYCODE_ID );
        this.gamepadKeyCodeMap.set( 'A',             gamepadevent.GAMEPAD_BUTTON_A );
        this.gamepadKeyCodeMap.set( 'B',             gamepadevent.GAMEPAD_BUTTON_B );
        this.gamepadKeyCodeMap.set( 'X',             gamepadevent.GAMEPAD_BUTTON_X );
        this.gamepadKeyCodeMap.set( 'Y',             gamepadevent.GAMEPAD_BUTTON_Y );
        this.gamepadKeyCodeMap.set( 'L BUMPER',      gamepadevent.GAMEPAD_BUTTON_L_BUMPER );
        this.gamepadKeyCodeMap.set( 'R BUMPER',      gamepadevent.GAMEPAD_BUTTON_R_BUMPER );
        this.gamepadKeyCodeMap.set( 'L TRIGGER',     gamepadevent.GAMEPAD_BUTTON_L_TRIGGER );
        this.gamepadKeyCodeMap.set( 'R TRIGGER',     gamepadevent.GAMEPAD_BUTTON_R_TRIGGER );
        this.gamepadKeyCodeMap.set( 'BACK',          gamepadevent.GAMEPAD_BUTTON_BACK );
        this.gamepadKeyCodeMap.set( 'START',         gamepadevent.GAMEPAD_BUTTON_START );
        this.gamepadKeyCodeMap.set( 'L STICK',       gamepadevent.GAMEPAD_BUTTON_LEFTSTICK );
        this.gamepadKeyCodeMap.set( 'R STICK',       gamepadevent.GAMEPAD_BUTTON_RIGHTSTICK );
        this.gamepadKeyCodeMap.set( 'UP',            gamepadevent.GAMEPAD_BUTTON_DPAD_UP );
        this.gamepadKeyCodeMap.set( 'DOWN',          gamepadevent.GAMEPAD_BUTTON_DPAD_DOWN );
        this.gamepadKeyCodeMap.set( 'LEFT',          gamepadevent.GAMEPAD_BUTTON_DPAD_LEFT );
        this.gamepadKeyCodeMap.set( 'RIGHT',         gamepadevent.GAMEPAD_BUTTON_DPAD_RIGHT );
        this.gamepadKeyCodeMap.set( 'GUIDE',         gamepadevent.GAMEPAD_BUTTON_GUIDE );

        // Key codes to use analog sticks as buttons
        this.gamepadKeyCodeMap.set( 'L STICK UP',    gamepadevent.GAMEPAD_BUTTON_L_STICK_UP );
        this.gamepadKeyCodeMap.set( 'L STICK DOWN',  gamepadevent.GAMEPAD_BUTTON_L_STICK_DOWN );
        this.gamepadKeyCodeMap.set( 'L STICK LEFT',  gamepadevent.GAMEPAD_BUTTON_L_STICK_LEFT );
        this.gamepadKeyCodeMap.set( 'L STICK RIGHT', gamepadevent.GAMEPAD_BUTTON_L_STICK_RIGHT );
        this.gamepadKeyCodeMap.set( 'R STICK UP',    gamepadevent.GAMEPAD_BUTTON_R_STICK_UP );
        this.gamepadKeyCodeMap.set( 'R STICK DOWN',  gamepadevent.GAMEPAD_BUTTON_R_STICK_DOWN );
        this.gamepadKeyCodeMap.set( 'R STICK LEFT',  gamepadevent.GAMEPAD_BUTTON_R_STICK_LEFT );
        this.gamepadKeyCodeMap.set( 'R STICK RIGHT', gamepadevent.GAMEPAD_BUTTON_R_STICK_RIGHT );
    }

    // 
    //  DESC: Load data from action dictionary
    //
    loadFromObj( obj )
    {
        if( obj )
        {
            this.actionDict = obj;
            let savedActionDict = localStorage.get( 'keybinding' );
            if( savedActionDict )
            {
                let actionDict = savedActionDict;

                // If the version does not match, delete the local storage
                if( this.actionDict.version != actionDict.version )
                    localStorage.free( 'keybinding' );
                else
                    this.actionDict = actionDict;
            }

            // Load the keyboard mapping
            this.loadAction( this.actionDict.keyboardMapping.playerHidden, this.keyboardKeyCodeMap, this.keyboardActionMap );
            this.loadAction( this.actionDict.keyboardMapping.playerVisible, this.keyboardKeyCodeMap, this.keyboardActionMap );

            // Load the mouse mapping
            this.loadAction( this.actionDict.mouseMapping.playerHidden, this.mouseKeyCodeMap, this.mouseActionMap );
            this.loadAction( this.actionDict.mouseMapping.playerVisible, this.mouseKeyCodeMap, this.mouseActionMap );

            // Load the gamepad mapping
            this.loadAction( this.actionDict.gamepadMapping.playerHidden, this.gamepadKeyCodeMap, this.gamepadActionMap );
            this.loadAction( this.actionDict.gamepadMapping.playerVisible, this.gamepadKeyCodeMap, this.gamepadActionMap );
        }
    }

    // 
    //  DESC: Setup the gamepad mapping based on controller mapping mode
    //
    initGamepadMapping( mapping )
    {
        // Remap for non-standard mapping
        if( mapping === '' )
        {
            this.gamepadKeyCodeMap = new Map;
            this.gamepadActionMap = new Map;

            this.gamepadKeyCodeMap.set( UNBOUND_KEYCODE_STR_ID,     UNBOUND_KEYCODE_ID );
            this.gamepadKeyCodeMap.set( 'A',             gamepadevent.GAMEPAD_BUTTON_A );
            this.gamepadKeyCodeMap.set( 'B',             gamepadevent.GAMEPAD_BUTTON_B );
            this.gamepadKeyCodeMap.set( 'X',             gamepadevent.GAMEPAD_BUTTON_X );
            this.gamepadKeyCodeMap.set( 'Y',             gamepadevent.GAMEPAD_BUTTON_Y );
            this.gamepadKeyCodeMap.set( 'L BUMPER',      gamepadevent.GAMEPAD_BUTTON_L_BUMPER );
            this.gamepadKeyCodeMap.set( 'R BUMPER',      gamepadevent.GAMEPAD_BUTTON_R_BUMPER );
            this.gamepadKeyCodeMap.set( 'BACK',          gamepadevent.ALT_GAMEPAD_BUTTON_BACK );
            this.gamepadKeyCodeMap.set( 'START',         gamepadevent.ALT_GAMEPAD_BUTTON_START );
            this.gamepadKeyCodeMap.set( 'GUIDE',         gamepadevent.ALT_GAMEPAD_BUTTON_GUIDE );
            this.gamepadKeyCodeMap.set( 'L STICK',       gamepadevent.ALT_GAMEPAD_BUTTON_LEFTSTICK );
            this.gamepadKeyCodeMap.set( 'R STICK',       gamepadevent.ALT_GAMEPAD_BUTTON_RIGHTSTICK );

            // Key codes to use analog sticks as buttons
            this.gamepadKeyCodeMap.set( 'L STICK UP',    gamepadevent.GAMEPAD_BUTTON_L_STICK_UP );
            this.gamepadKeyCodeMap.set( 'L STICK DOWN',  gamepadevent.GAMEPAD_BUTTON_L_STICK_DOWN );
            this.gamepadKeyCodeMap.set( 'L STICK LEFT',  gamepadevent.GAMEPAD_BUTTON_L_STICK_LEFT );
            this.gamepadKeyCodeMap.set( 'L STICK RIGHT', gamepadevent.GAMEPAD_BUTTON_L_STICK_RIGHT );
            this.gamepadKeyCodeMap.set( 'R STICK UP',    gamepadevent.GAMEPAD_BUTTON_R_STICK_UP );
            this.gamepadKeyCodeMap.set( 'R STICK DOWN',  gamepadevent.GAMEPAD_BUTTON_R_STICK_DOWN );
            this.gamepadKeyCodeMap.set( 'R STICK LEFT',  gamepadevent.GAMEPAD_BUTTON_R_STICK_LEFT );
            this.gamepadKeyCodeMap.set( 'R STICK RIGHT', gamepadevent.GAMEPAD_BUTTON_R_STICK_RIGHT );

            // Load the gamepad mapping
            this.loadAction( this.actionDict.gamepadMapping.playerHidden, this.gamepadKeyCodeMap, this.gamepadActionMap );
            this.loadAction( this.actionDict.gamepadMapping.playerVisible, this.gamepadKeyCodeMap, this.gamepadActionMap );
        }
    }
    
    // 
    //  DESC: Load data from file path
    //
    clearLastDeviceUsed()
    {
        this.lastDeviceUsed = defs.DEVICE_NULL;
    }

    // 
    //  DESC: Load action data from xml node
    //
    loadAction( actionDict, keyCodeMap, actionMap )
    {
        if( actionDict )
        {
            for( let each of actionDict )
            {
                // See if we can find the string that represents the key code id
                let keyCode = keyCodeMap.get( each.componetId );

                // Add it in if we found it
                if( keyCode !== undefined )
                {
                    // See if the controller action string has already been added
                    let actionStr = each.action;
                    let action = actionMap.get( each.action );

                    if( action !== undefined )
                    {
                        // If it's found, add another id to this map
                        action.setId( keyCode );
                    }
                    else
                    {
                        // Add new action to the map
                        actionMap.set( actionStr, new KeyCodeAction(keyCode) );
                    }
                }
            }
        }
    }
    
    // 
    //  DESC: Was this an action
    //
    wasActionPress( event, actionStr, actionPress )
    {
        if( this.wasAction( event, actionStr ) === actionPress )
            return true;

        return false;
    }
    
    // 
    //  DESC: Was this an action
    //
    wasAction( event, actionStr )
    {
        let result = defs.EAP_IDLE;

        if( this.allowAction )
        {
            // Check for keyboard event
            if( event instanceof KeyboardEvent )
            {
                this.lastDeviceUsed = defs.KEYBOARD;

                if( this.wasActionMap( event.code, actionStr, this.keyboardActionMap ) )
                {
                    result = defs.EAP_DOWN;

                    if( event.type === 'keyup' )
                    {
                        result = defs.EAP_UP;
                    }
                }
            }
            // Check for mouse event
            else if( event instanceof MouseEvent && event.type != 'mousemove' )
            {
                this.lastDeviceUsed = defs.MOUSE;

                if( this.wasActionMap( event.button, actionStr, this.mouseActionMap ) )
                {
                    result = defs.EAP_DOWN;

                    if( event.type === 'mouseup' )
                    {
                        result = defs.EAP_UP;
                    }
                }
            }
            // Check for gamepad event
            else if( event instanceof GamepadEvent )
            {
                this.lastDeviceUsed = defs.GAMEPAD;

                if( event.type === gamepadevent.GAMEPAD_BUTTON_DOWN || event.type === gamepadevent.GAMEPAD_BUTTON_UP )
                {
                    if( this.wasActionMap( event.buttonIndex, actionStr, this.gamepadActionMap ) )
                    {
                        result = defs.EAP_DOWN;

                        if( event.type === gamepadevent.GAMEPAD_BUTTON_UP )
                        {
                            result = defs.EAP_UP;
                        }
                    }
                }
            }
        }

        return result;
    }
    
    // 
    //  DESC: Was this an action
    //
    wasActionMap( id, actionStr, actionMap )
    {
        let result = false;

        // See if the action has already been added
        let action = actionMap.get( actionStr );

        // If it's found, see if this is the correct action
        if( action !== undefined )
        {
            result = action.wasAction( id );
        }

        return result;
    }

    // 
    //  DESC: Get the action/component strings for the give device id
    //
    getDeviceActionStr( deviceId, actionNameStr )
    {
        let mappingName = 'keyboardMapping';

        if( deviceId === defs.MOUSE )
        {
            mappingName = 'mouseMapping';
        }
        else if( deviceId === defs.GAMEPAD )
        {
            mappingName = 'gamepadMapping';
        }

        return this.getComponentStr( this.actionDict[mappingName].playerVisible, actionNameStr );
    }

    // 
    //  DESC: Get the component string for the action name id
    //
    getComponentStr( actionDict, actionNameStr )
    {
        if( actionDict )
        {
            for( let each of actionDict )
            {
                if( actionNameStr == each['action'] )
                {
                    let componetIdStr = each['componetId'];

                    let configurable = false;

                    let attr = each['configurable'];
                    if( attr )
                        configurable = (attr === 'true');

                    return [componetIdStr, configurable];
                }
            }
        }

        return ['', false];
    }

    // 
    //  DESC: Change the component string for the action Id
    //
    changeComponentStr( actionDict, actionNameStr, componetNameStr )
    {
        if( actionDict )
        {
            for( let each of actionDict )
            {
                if( actionNameStr == each['action'] )
                {
                    if( each['configurable'] === 'true' )
                    {
                        each['componetId'] = componetNameStr;

                        return true;
                    }
                }
            }
        }

        return false;
    }

    // 
    //  DESC: Reset the action
    //
    resetAction( deviceId, actionNameStr, newKeyCode )
    {
        let mappingName = 'keyboardMapping';
        let keyCodeMap = this.keyboardKeyCodeMap;
        let actionMap = this.keyboardActionMap;

        if( deviceId == defs.MOUSE )
        {
            mappingName = 'mouseMapping';
            keyCodeMap = this.mouseKeyCodeMap;
            actionMap = this.mouseActionMap;
        }
        else if( deviceId == defs.GAMEPAD )
        {
            mappingName = 'gamepadMapping';
            keyCodeMap = this.gamepadKeyCodeMap;
            actionMap = this.gamepadActionMap;
        }
        
        // If this action ID can be found and is configurable, reset it
        let [oldComponetIdStr, configurable] = this.getComponentStr( this.actionDict[mappingName].playerVisible, actionNameStr );

        if( oldComponetIdStr && configurable )
        {
            // See if we can find the string that represents the key code id
            let key = genFunc.getKey(keyCodeMap, newKeyCode);
            if( key )
            {
                let newComponetIdStr = UNBOUND_KEYCODE_STR_ID;
                if( key != oldComponetIdStr )
                    newComponetIdStr = key;
                else
                    newKeyCode = UNBOUND_KEYCODE_ID;

                let oldKeyCode = keyCodeMap.get(oldComponetIdStr);
                if( oldKeyCode != undefined )
                {
                    // Check for the action to remove the old key code and add the new one
                    let keyCodeAction = actionMap.get( actionNameStr );
                    if( keyCodeAction )
                    {
                        // Remove the old key code Id
                        keyCodeAction.removeId( oldKeyCode );

                        // Add the new key code Id
                        keyCodeAction.setId( newKeyCode );

                        // Update the action dictionary with the change
                        if( this.changeComponentStr( this.actionDict[mappingName].playerVisible, actionNameStr, newComponetIdStr ) )
                            return [newComponetIdStr, true];
                    }
                }
            }
        }

        return ['', false];
    }

    // 
    //  DESC: Save the keybinding
    //
    saveKeybinding()
    {
        localStorage.set( 'keybinding', this.actionDict );
    }

    // 
    //  DESC: Reset keybinding
    //
    resetKeybinding()
    {
        this.keyboardActionMap = new Map;
        this.mouseActionMap = new Map;
        this.gamepadActionMap = new Map;

        this.resetKeybindingToDefaults( this.actionDict.keyboardMapping.playerVisible );
        this.resetKeybindingToDefaults( this.actionDict.mouseMapping.playerVisible );
        this.resetKeybindingToDefaults( this.actionDict.gamepadMapping.playerVisible );

        localStorage.free( 'keybinding' );
        this.loadFromObj( this.actionDict );
    }

    // 
    //  DESC: Reset keybinding
    //
    resetKeybindingToDefaults( actionDict )
    {
        for( let each of actionDict )
        {
            if( each.defaultId )
                each.componetId = each.defaultId;
        }
    }

    // 
    //  DESC: What was the last device
    //
    wasLastDeviceGamepad()
    {
        return (this.lastDeviceUsed === defs.GAMEPAD);
    }

    wasLastDeviceKeyboard()
    {
        return (this.lastDeviceUsed === defs.KEYBOARD);
    }

    wasLastDeviceMouse()
    {
        return (this.lastDeviceUsed === defs.MOUSE);
    }

    // 
    //  DESC: allow event handling access function
    //
    get allowActionHandling() { return this.allowAction; }
    set allowActionHandling( value ) { this.allowAction = value; }
}

export var actionManager = new ActionManager;
