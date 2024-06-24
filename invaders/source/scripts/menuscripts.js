
//
//  FILE NAME: menuscripts.js
//  DESC:      scripts for the menus
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/sound/soundmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { Color } from '../../../library/common/color';
import * as utilScripts from './utilityscripts';
import * as menuDefs from '../../../library/gui/menudefs';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';

//
//  DESC: Script for playing the active sound
//
class Control_OnActive
{
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
        soundManager.play( '(menu)', 'active' );

        return true;
    }
}

//
//  DESC: Script for playing the select sound
//
class Control_OnSelect
{
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
        soundManager.play( '(menu)', 'select' );

        return true;
    }
}

//
//  DESC: Script for fading in the menu
//
class Menu_TransIn
{
    constructor( menu )
    {
        this.fadeTo = new utilScripts.FadeTo();
        this.menu = menu;
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.menu.setAlpha( 0.0 );
        this.menu.setVisible( true );
        this.fadeTo.init( 0, 1, 250 );

        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterater the logic
    //
    * iteration()
    {
        do
        {
            if( this.fadeTo.execute() )
            {
                this.menu.setAlpha( this.fadeTo.value );
                eventManager.dispatchEvent( menuDefs.EME_MENU_TRANS_IN, menuDefs.ETC_END );

                break;
            }

            this.menu.setAlpha( this.fadeTo.value );

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

//
//  DESC: Script for fading out the menu
//
class Menu_TransOut
{
    constructor( menu )
    {
        this.fadeTo = new utilScripts.FadeTo();
        this.menu = menu;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.menu.setAlpha( this.current );
        this.menu.setVisible( true );
        this.fadeTo.init( 1, 0, 250 );

        this.iter = this.iteration();
    }

    // 
    //  DESC: Iterater the logic
    //
    * iteration()
    {
        do
        {
            if( this.fadeTo.execute() )
            {
                this.menu.setAlpha( this.fadeTo.value );

                eventManager.dispatchEvent( menuDefs.EME_MENU_TRANS_OUT, menuDefs.ETC_END );

                break;
            }

            this.menu.setAlpha( this.fadeTo.value );

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

//
//  DESC: Show the menu without doing an transition
//
class Menu_Show
{
    constructor( menu )
    {
        this.menu = menu;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.menu.setAlpha( 1.0 );
        this.menu.setVisible( false );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        this.menu.setVisible( true );
        eventManager.dispatchEvent( menuDefs.EME_MENU_TRANS_IN, menuDefs.ETC_END );

        return true;
    }
}

//
//  DESC: Hide the menu without doing an transition
//
class Menu_Hide
{
    constructor( menu )
    {
        this.menu = menu;

        // Continues the init
        this.recycle();
    }
    
    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.menu.setAlpha( 1.0 );
        this.menu.setVisible( true );
    }

    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        this.menu.setVisible( false );
        eventManager.dispatchEvent( menuDefs.EME_MENU_TRANS_OUT, menuDefs.ETC_END );

        return true;
    }
}

//
//  DESC: Script for setting the look of the disabled state
//
class Control_Disabled
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.color = new Color;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.color.copy( this.sprite.getDefaultColor() );
        this.color.transformHSV( 0, 0, 1 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setColor( this.color );

        return true;
    }
}

//
//  DESC: Script for setting the look of the inactive state
//
class Control_Inactive
{
    constructor( sprite )
    {
        this.sprite = sprite;
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
        this.sprite.setColor( this.sprite.getDefaultColor() );

        return true;
    }
}

//
//  DESC: Script for setting the look of the hidden state
//
class Control_Hidden
{
    constructor( sprite )
    {
        this.sprite = sprite;
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
        this.sprite.setVisible( false );

        return true;
    }
}


//
//  DESC: Base script for animating the look of the active state
//
class Base_Control_Active
{
    constructor( sprite )
    {
        this.sprite = sprite;

        this.hiColor = new Color;
        this.lowColor = new Color;
        this.colorTo = new utilScripts.ColorTo;
        this.iter = null;

        this.toggle = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( hiHSV, lowHSV )
    {
        this.sprite.setVisible( true );
        
        this.hiColor.copy( this.sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        
        this.lowColor.copy( this.sprite.getDefaultColor() );
        this.lowColor.transformHSV( 0, 1, lowHSV );
        
        this.colorTo.init( this.sprite.getColor(), this.hiColor, 500 );
        this.iter = this.iteration();
        
        this.toggle = false;
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            if( this.colorTo.execute() )
            {
                this.sprite.setColor( this.colorTo.value );

                if( this.toggle )
                    this.colorTo.init( this.sprite.getColor(), this.hiColor, 500 );
                else
                    this.colorTo.init( this.sprite.getColor(), this.lowColor, 500 );
                
                this.toggle = !this.toggle;
            }

            this.sprite.setColor( this.colorTo.value );

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

class Control_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.3, 0.5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return super.execute();
    }
}

class Control_Solid_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.1, 0.5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return super.execute();
    }
}


//
//  DESC: Base script for animating the look of the selected state
//        NOTE: Start the button on the hi color, transition
//              to the low color and then back to the hi color
//
class Base_Control_Selected
{
    constructor( sprite )
    {
        this.sprite = sprite;

        this.hiColor = new Color;
        this.lowColor = new Color;

        this.colorTo = new utilScripts.ColorTo;
        this.iter = null;

        this.toggle = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( hiHSV, lowHSV )
    {
        this.sprite.setVisible( true );
        
        this.hiColor.copy( this.sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        
        this.lowColor.copy( this.sprite.getDefaultColor() );
        this.lowColor.transformHSV( 0, 1, lowHSV );
        
        this.colorTo.init( this.hiColor, this.lowColor, 120 );
        this.iter = this.iteration();
        
        this.toggle = false;
    }

    // 
    //  DESC: Iterate the logic
    //
    * iteration()
    {
        do
        {
            if( this.colorTo.execute() )
            {
                if( this.toggle )
                {
                    this.sprite.setColor( this.sprite.getDefaultColor() );
                    break;
                }
                else
                {
                    this.colorTo.init( this.sprite.getColor(), this.hiColor, 100 );
                    
                    this.toggle = true;
                }
            }

            this.sprite.setColor( this.colorTo.value );

            yield;
        }
        while( true );
    }
    
    // 
    //  DESC: Execute the iteration
    //
    execute()
    {
        return this.iter.next().done;
    }
}

//
//  DESC: Animates the selected state and sends a message
//
class Control_Selected_Dispatch_Exe extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( super.execute() )
        {
            eventManager.dispatchEvent( menuDefs.EME_MENU_SELECT_EXECUTE );
            return true;
        }

        return false;
    }
}

class Control_Selected_Dispatch_Exe_Act extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( super.execute() )
        {
            eventManager.dispatchEvent( menuDefs.EME_MENU_SELECT_EXECUTE );
            eventManager.dispatchEvent( menuDefs.EME_MENU_REACTIVATE );

            return true;
        }

        return false;
    }
}

class Control_Selected_Visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return super.execute();
    }
}


//
//  DESC: Animates the selected state and sends a message
//
class Control_Solid_Selected_visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return super.execute();
    }
}

class Control_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( super.execute() )
        {
            this.sprite.setVisible( false );
            return true;
        }

        return false;
    }
}

class Control_Solid_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( super.execute() )
        {
            this.sprite.setVisible( false );
            return true;
        }

        return false;
    }
}

class Control_Selected_frame_highlight extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( super.execute() )
        {
            this.sprite.setRGBA( 1, 1, 1, 1 );
            return true;
        }

        return false;
    }
}


//
//  DESC: Fast display of selected state
//
class Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.hiColor = new Color;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( hiHSV )
    {
        this.sprite.setVisible( true );
        
        this.hiColor.copy( this.sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        
        this.sprite.setColor( this.hiColor );
    }
}

class Control_Fast_Face_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.time = 80;
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= highResTimer.elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setDefaultColor();
            return true;
        }

        return false;
    }
}

class Control_Fast_Face_Selected_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.time = 80;
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= highResTimer.elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setDefaultColor();
            eventManager.dispatchEvent( menuDefs.EME_MENU_REACTIVATE );
            return true;
        }

        return false;
    }
}

class Control_Fast_Face_Selected_Exe_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.time = 80;
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= highResTimer.elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setDefaultColor();
            eventManager.dispatchEvent( menuDefs.EME_MENU_SELECT_EXECUTE );
            eventManager.dispatchEvent( menuDefs.EME_MENU_REACTIVATE );
            return true;
        }

        return false;
    }
}

class Control_Fast_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.time = 80;
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= highResTimer.elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setVisible( false );
            return true;
        }

        return false;
    }
}

class Control_Fast_Solid_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.time = 80;
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= highResTimer.elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setVisible( false );
            return true;
        }

        return false;
    }
}

class Control_slider_btn_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        return true;
    }
}

//
//  DESC: Execution script for a button control to change to the confirmation menu
//
class ConfirmBtn_execute
{
    constructor( control )
    {
        this.control = control;

        // Continues the init
        this.recycle();
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        this.menu = menuManager.getMenu("confirmation_menu");
        this.yesBtn = menu.getControl("yes_btn");
        this.megLbl = menu.getControl("message_lbl");
        
        this.conformationMsg = '';
        this.executionAction = '';
        this.actionType = uiControlDefs.ECAT_BACK;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.control.name === 'play_game_btn' )
        {
            this.conformationMsg = "Are you sure you|want to play the game?";
            this.actionType = uiControlDefs.ECAT_GAME_STATE_CHANGE;
            this.executionAction = "level_1_state";
        }
        else if( this.control.name === 'title_screen_btn' )
        {
            this.conformationMsg = 'Are you sure you|want to go back to|the Title Screen?';
            this.actionType = uiControlDefs.ECAT_GAME_STATE_CHANGE;
            this.executionAction = 'title_screen_state';
        }
        else if( this.control.name === 'Key_Binding_reset_btn' )
        {
            this.conformationMsg = 'Are you sure you want|to reset keybinding back|to the default settings?';
            this.actionType = uiControlDefs.ECAT_SCRIPT_EXECUTE;
            this.executionAction = 'keybindReset';
        }
        
        // Set the conformation menu
        this.yesBtn.actionType = this.actionType;
        this.yesBtn.executionAction = this.executionAction;
        this.megLbl.createFontString( this.conformationMsg );

        return true;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'Control_OnActive',
        ( control ) => { return new Control_OnActive( control ); } );
            
    scriptManager.set( 'Control_OnSelect',
        ( control ) => { return new Control_OnSelect( control ); } );  
            
    scriptManager.set( 'Menu_TransIn',
        ( menu ) => { return new Menu_TransIn( menu ); } );
            
    scriptManager.set( 'Menu_TransOut',
        ( menu ) => { return new Menu_TransOut( menu ); } );

    scriptManager.set( 'Menu_Show',
        ( menu ) => { return new Menu_Show( menu ); } );

    scriptManager.set( 'Menu_Hide',
        ( menu ) => { return new Menu_Hide( menu ); } );
            
    scriptManager.set( 'Control_Disabled',
        ( sprite ) => { return new Control_Disabled( sprite ); } );
            
    scriptManager.set( 'Control_Inactive',
        ( sprite ) => { return new Control_Inactive( sprite ); } );
            
    scriptManager.set( 'Control_Hidden',
        ( sprite ) => { return new Control_Hidden( sprite ); } );
            
    scriptManager.set( 'Control_Active',
        ( sprite ) => { return new Control_Active( sprite ); } );
            
    scriptManager.set( 'Control_Solid_Active',
        ( sprite ) => { return new Control_Solid_Active( sprite ); } );
            
    scriptManager.set( 'Control_Selected_Dispatch_Exe',
        ( sprite ) => { return new Control_Selected_Dispatch_Exe( sprite ); } );
            
    scriptManager.set( 'Control_Selected_Dispatch_Exe_Act',
        ( sprite ) => { return new Control_Selected_Dispatch_Exe_Act( sprite ); } );
            
    scriptManager.set( 'Control_Selected_Visible',
        ( sprite ) => { return new Control_Selected_Visible( sprite ); } );
            
    scriptManager.set( 'Control_Solid_Selected_visible',
        ( sprite ) => { return new Control_Solid_Selected_visible( sprite ); } );
            
    scriptManager.set( 'Control_Selected',
        ( sprite ) => { return new Control_Selected( sprite ); } );
            
    scriptManager.set( 'Control_Solid_Selected',
        ( sprite ) => { return new Control_Solid_Selected( sprite ); } );
            
    scriptManager.set( 'Control_Selected_frame_highlight',
        ( sprite ) => { return new Control_Selected_frame_highlight( sprite ); } );
            
    scriptManager.set( 'Control_Fast_Face_Selected',
        ( sprite ) => { return new Control_Fast_Face_Selected( sprite ); } );
            
    scriptManager.set( 'Control_Fast_Face_Selected_Act',
        ( sprite ) => { return new Control_Fast_Face_Selected_Act( sprite ); } );
    
    scriptManager.set( 'Control_Fast_Face_Selected_Exe_Act',
        ( sprite ) => { return new Control_Fast_Face_Selected_Exe_Act( sprite ); } );
            
    scriptManager.set( 'Control_Fast_Selected',
        ( sprite ) => { return new Control_Fast_Selected( sprite ); } );
            
    scriptManager.set( 'Control_Fast_Solid_Selected',
        ( sprite ) => { return new Control_Fast_Solid_Selected( sprite ); } );
            
    scriptManager.set( 'Control_slider_btn_Selected',
        ( sprite ) => { return new Control_slider_btn_Selected( sprite ); } );
    
    scriptManager.set( 'ConfirmBtn_execute',
        ( control ) => { return new ConfirmBtn_execute( control ); } );
}
