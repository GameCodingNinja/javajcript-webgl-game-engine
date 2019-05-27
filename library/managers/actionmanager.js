// 
//  FILE NAME: actionmanager.js
//  DESC:      Class for handling action mapping
//

"use strict";
import { KeyCodeAction } from '../common/keycodeaction';
import * as genFunc from '../utilities/genfunc';
import * as defs from '../common/defs';

class ActionManager
{
    constructor()
    {
        this.keyboardKeyCodeMap = new Map;
        this.mouseKeyCodeMap = new Map;
        //this.gamepadKeyCodeMap = new Map;
        
        // Action maps
        this.keyboardActionMap = new Map;
        this.mouseActionMap = new Map;
        this.gamepadActionMap = new Map;
        
        // Flag to allow action handling
        this.allowAction = true;
        
        // Last device used
        this.lastDeviceUsed = defs.DEVICE_NULL;
        
        this.keyboardKeyCodeMap.set( '---', -1 );
        this.keyboardKeyCodeMap.set( 'RETURN', 13 );
        this.keyboardKeyCodeMap.set( 'ESCAPE', 27 );
        
        this.keyboardKeyCodeMap.set( 'ARROW UP',    38 );
        this.keyboardKeyCodeMap.set( 'ARROW DOWN',  40 );
        this.keyboardKeyCodeMap.set( 'ARROW LEFT',  37 );
        this.keyboardKeyCodeMap.set( 'ARROW RIGHT', 39 );

        this.keyboardKeyCodeMap.set( 'A', 'A'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'B', 'B'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'C', 'C'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'D', 'D'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'E', 'E'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'F', 'F'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'G', 'G'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'H', 'H'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'I', 'I'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'J', 'J'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'K', 'K'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'L', 'L'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'M', 'M'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'N', 'N'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'O', 'O'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'P', 'P'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'Q', 'Q'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'R', 'R'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'S', 'S'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'T', 'T'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'U', 'U'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'V', 'V'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'W', 'W'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'X', 'X'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'Y', 'Y'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'Z', 'Z'.charCodeAt(0) );
        
        this.keyboardKeyCodeMap.set( '0', '0'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '1', '1'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '2', '2'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '3', '3'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '4', '4'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '5', '5'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '6', '6'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '7', '7'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '8', '8'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '9', '9'.charCodeAt(0) );
        
        this.keyboardKeyCodeMap.set( 'F1',  112 );
        this.keyboardKeyCodeMap.set( 'F2',  113 );
        this.keyboardKeyCodeMap.set( 'F3',  114 );
        this.keyboardKeyCodeMap.set( 'F4',  115 );
        this.keyboardKeyCodeMap.set( 'F5',  116 );
        this.keyboardKeyCodeMap.set( 'F6',  117 );
        this.keyboardKeyCodeMap.set( 'F7',  118 );
        this.keyboardKeyCodeMap.set( 'F8',  119 );
        this.keyboardKeyCodeMap.set( 'F9',  120 );
        this.keyboardKeyCodeMap.set( 'F10', 121 );
        this.keyboardKeyCodeMap.set( 'F11', 122 );
        this.keyboardKeyCodeMap.set( 'F12', 123 );
        
        this.keyboardKeyCodeMap.set( 'NUMPAD 0', 96 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 1', 97 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 2', 98 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 3', 99 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 4', 100 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 5', 101 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 6', 102 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 7', 103 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 8', 104 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 9', 105 );
        
        this.keyboardKeyCodeMap.set( 'NUM LOCK',     144 );
        this.keyboardKeyCodeMap.set( 'NUMPAD /',     111 );
        this.keyboardKeyCodeMap.set( 'NUMPAD *',     106 );
        this.keyboardKeyCodeMap.set( 'NUMPAD -',     109 );
        this.keyboardKeyCodeMap.set( 'NUMPAD +',     107 );
        this.keyboardKeyCodeMap.set( 'NUMPAD ENTER', 13 );
        this.keyboardKeyCodeMap.set( 'NUMPAD .',     110 );
        
        this.keyboardKeyCodeMap.set( 'CTRL',  17 );
        this.keyboardKeyCodeMap.set( 'SHIFT', 16 );
        this.keyboardKeyCodeMap.set( 'ALT',   18 );
        
        this.keyboardKeyCodeMap.set( 'PRINT SCREEN', 42 );
        this.keyboardKeyCodeMap.set( 'SCROLL LOCK',  145 );
        this.keyboardKeyCodeMap.set( 'PAUSE',        19 );
        
        this.keyboardKeyCodeMap.set( 'END',       35 );
        this.keyboardKeyCodeMap.set( 'INSERT',    45 );
        this.keyboardKeyCodeMap.set( 'DELETE',    46 );
        this.keyboardKeyCodeMap.set( 'HOME',      36 );
        this.keyboardKeyCodeMap.set( 'PAGE UP',   33 );
        this.keyboardKeyCodeMap.set( 'PAGE DOWN', 34 );
        
        this.keyboardKeyCodeMap.set( 'BACKSPACE', 8 );
        this.keyboardKeyCodeMap.set( 'TAB',       9 );
        this.keyboardKeyCodeMap.set( 'SPACE',     32 );
        this.keyboardKeyCodeMap.set( ',',         188 );
        this.keyboardKeyCodeMap.set( '-',         173 );
        this.keyboardKeyCodeMap.set( '.',         190 );
        this.keyboardKeyCodeMap.set( '/',         191 );
        this.keyboardKeyCodeMap.set( '=',         61 );
        
        this.keyboardKeyCodeMap.set( ';',  59 );
        this.keyboardKeyCodeMap.set( '[',  219 );
        this.keyboardKeyCodeMap.set( '\\', 220 );
        this.keyboardKeyCodeMap.set( ']',  221 );
        this.keyboardKeyCodeMap.set( '`',  192 );
        this.keyboardKeyCodeMap.set( "'",  222 );
        
        this.mouseKeyCodeMap.set( '---',  -1 );
        this.mouseKeyCodeMap.set( 'LEFT MOUSE',   0 );
        this.mouseKeyCodeMap.set( 'MIDDLE MOUSE', 1 );
        this.mouseKeyCodeMap.set( 'RIGHT MOUSE',  2 );
    }
    
    // 
    //  DESC: Load data from file path
    //
    clearLastDeviceUsed()
    {
        this.lastDeviceUsed = defs.DEVICE_NULL;
    }
    
    // 
    //  DESC: Load data from file path
    //
    load( filePath )
    {
        return genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) => this.loadFromNode( xmlNode ));
    }
    
    // 
    //  DESC: Load data from XML node
    //
    loadFromNode( xmlNode )
    {
        if( xmlNode )
        {
            // Load the keyboard/mouse/gamepad mapping
            this.loadKeyboardMappingFromNode( xmlNode.getElementsByTagName('keyboardMapping') );
            this.loadMouseMappingFromNode( xmlNode.getElementsByTagName( 'mouseMapping' ) );
            //this.loadGamepadMappingFromNode( node.getElementsByTagName( 'gamepadMapping' ) );
        }
    }
    
    // 
    //  DESC: Load the keyboard mapping from node
    //
    loadKeyboardMappingFromNode( node )
    {
        // Load the player hidden controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerHidden'), this.keyboardKeyCodeMap, this.keyboardActionMap );

        // Load the player visible controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerVisible'), this.keyboardKeyCodeMap, this.keyboardActionMap );
    }

    // 
    //  DESC: Load the keyboard mapping from node
    //
    loadMouseMappingFromNode( node )
    {
        // Load the player hidden controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerHidden'), this.mouseKeyCodeMap, this.mouseActionMap );

        // Load the player visible controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerVisible'), this.mouseKeyCodeMap, this.mouseActionMap );
    }

    // 
    //  DESC: Load the keyboard mapping from node
    //
    /*loadGamepadMappingFromNode( node )
    {
        // Load the player hidden controls
        LoadActionFromNode( node[0].getElementsByTagName("playerHidden"), this.gamepadKeyCodeMap, this.gamepadActionMap );

        // Load the player visible controls
        LoadActionFromNode( node[0].getElementsByTagName("playerVisible"), this.gamepadKeyCodeMap, this.gamepadActionMap );
    }*/
    
    // 
    //  DESC: Load action data from xml node
    //
    loadActionFromNode( node, keyCodeMap, actionMap )
    {
        if( node.length )
        {
            let actionNode = node[0].getElementsByTagName('actionMap');

            for( let i = 0; i < actionNode.length; ++i )
            {
                // See if we can find the string that represents the key code id
                let componentIdStr = actionNode[i].getAttribute( 'componetId' );
                let keyCode = keyCodeMap.get( componentIdStr );

                // Add it in if we found it
                if( keyCode !== undefined )
                {
                    let actionStr = actionNode[i].getAttribute( 'action' );

                    // See if the controller action string has already been added
                    let action = actionMap.get( actionStr );

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

                if( this.wasActionMap( event.keyCode, actionStr, this.keyboardActionMap ) )
                {
                    result = defs.EAP_UP;

                    // Check for the "D" character code for keydown
                    if( event.type.charCodeAt(3) === 100 )
                    {
                        result = defs.EAP_DOWN;
                    }
                }
            }
            // Check for mouse event
            else if( event instanceof MouseEvent )
            {
                this.lastDeviceUsed = defs.MOUSE;

                if( this.wasActionMap( event.button, actionStr, this.mouseActionMap ) )
                {
                    result = defs.EAP_UP;

                    // Check for the "D" character code for mousedown
                    if( event.type.charCodeAt(5) === 100 )
                    {
                        result = defs.EAP_DOWN;
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
}

export var actionManager = new ActionManager;
