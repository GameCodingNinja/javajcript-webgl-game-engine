
//
//  FILE NAME: menuscripts.js
//  DESC:      script for the menus
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { iScript } from '../../../library/script/iscript';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { Color } from '../../../library/common/color';
import * as utilScripts from './utilityscripts';
import * as menuDefs from '../../../library/gui/menudefs';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';

//
//  DESC: Script for playing the active sound
//
class Control_OnActive extends iScript
{
    constructor( control )
    {
        super();
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        soundManager.play( '(menu)', 'active' );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return true; }
}

//
//  DESC: Script for playing the select sound
//
class Control_OnSelect extends iScript
{
    constructor( control )
    {
        super();
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        soundManager.play( '(menu)', 'select' );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return true; }
}

//
//  DESC: Script for fading in the menu
//
class Menu_TransIn extends utilScripts.FadeTo
{
    constructor( menu )
    {
        super();
        
        this.menu = menu;

        super.init( 0, 1, 250 );

        this.menu.setAlpha( this.current );
        this.menu.setVisible( true );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            this.menu.setAlpha( this.final );
            
            eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_IN, menuDefs.ETC_END );
        }
        else
        {
            this.menu.setAlpha( this.current );
        }
    }
}

//
//  DESC: Script for fading out the menu
//
class Menu_TransOut extends utilScripts.FadeTo
{
    constructor( menu )
    {
        super();
        
        this.menu = menu;

        super.init( 1, 0, 250 );
        
        this.menu.setAlpha( this.current );
        this.menu.setVisible( true );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            this.menu.setAlpha( this.final );
            this.menu.setVisible( false );
            
            eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_OUT, menuDefs.ETC_END );
        }
        else
        {
            this.menu.setAlpha( this.current );
        }
    }
}

//
//  DESC: Script for setting the look of the disabled state
//
class Control_Disabled extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        let color = new Color;
        color.copy( this.sprite.getDefaultColor() );
        color.transformHSV( 0, 0, 1 );

        this.sprite.setColor( color );
        
        this.finished = true;
    }
}

//
//  DESC: Script for setting the look of the inactive state
//
class Control_Inactive extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setColor( this.sprite.getDefaultColor() );
        this.finished = true;
    }
}

//
//  DESC: Script for setting the look of the hidden state
//
class Control_Hidden extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setVisible( false );
        this.finished = true;
    }
}


//
//  DESC: Base script for animating the look of the active state
//
class Base_Control_Active extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;

        this.hiColor = new Color;
        this.lowColor = new Color;
        this.colorTo = new utilScripts.ColorTo;

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
        
        this.toggle = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.colorTo.execute();
        
        this.sprite.setColor( this.colorTo.color );
        
        if( this.colorTo.isFinished() )
        {
            if( this.toggle )
                this.colorTo.init( this.sprite.getColor(), this.hiColor, 500 );
            else
                this.colorTo.init( this.sprite.getColor(), this.lowColor, 500 );
            
            this.toggle = !this.toggle;
        }
    }
}

class Control_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.3, 0.5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
}

class Control_Solid_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.1, 0.5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
}


//
//  DESC: Base script for animating the look of the selected state
//        NOTE: Start the button on the hi color, transition
//              to the low color and then back to the hi color
//
class Base_Control_Selected extends iScript
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;

        this.hiColor = new Color;
        this.lowColor = new Color;

        this.colorTo = new utilScripts.ColorTo;

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
        
        this.toggle = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.colorTo.execute();
        
        this.sprite.setColor( this.colorTo.color );
        
        if( this.colorTo.isFinished() )
        {
            if( this.toggle )
            {
                this.sprite.setColor( this.sprite.getDefaultColor() );
                this.finished = true;
            }
            else
            {
                this.colorTo.init( this.sprite.getColor(), this.hiColor, 100 );
                
                this.toggle = true;
            }
        }
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

        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            eventManager.dispatchEvent( menuDefs.EGE_MENU_SELECT_EXECUTE );
        }
    }
}

class Control_Selected_Dispatch_Exe_Act extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            eventManager.dispatchEvent( menuDefs.EGE_MENU_SELECT_EXECUTE );
            eventManager.dispatchEvent( menuDefs.EGE_MENU_REACTIVATE );
        }
    }
}

class Control_Selected_Visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
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

        super.init( 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
}

class Control_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setVisible( false );
    }
}

class Control_Solid_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setVisible( false );
    }
}

class Control_Selected_frame_highlight extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setRGBA( 1, 1, 1, 1 );
    }
}


//
//  DESC: Fast display of selected state
//
class Base_Control_Fast_Selected extends iScript
{
    constructor( sprite )
    {
        super();
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
            this.finished = true;
        }
    }
}

class Control_Fast_Face_Selected_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
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
            eventManager.dispatchEvent( menuDefs.EGE_MENU_REACTIVATE );
            this.finished = true;
        }
    }
}

class Control_Fast_Face_Selected_Exe_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
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
            eventManager.dispatchEvent( menuDefs.EGE_MENU_SELECT_EXECUTE );
            eventManager.dispatchEvent( menuDefs.EGE_MENU_REACTIVATE );
            this.finished = true;
        }
    }
}

class Control_Fast_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
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
            this.finished = true;
        }
    }
}

class Control_Fast_Solid_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
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
            this.finished = true;
        }
    }
}

class Control_slider_btn_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );

        super.init( 1.7 );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return true; }
}


//
//  DESC: Execution script for a button control to change to the confirmation menu
//
class ConfirmBtn_execute extends iScript
{
    constructor( control )
    {
        super();
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        let menu = menuManager.getMenu("confirmation_menu");
        let yesBtn = menu.getControl("yes_btn");
        let megLbl = menu.getControl("message_lbl");
        
        let conformationMsg = '';
        let executionAction = '';
        let actionType = uiControlDefs.ECAT_BACK;
        
        if( this.control.name === 'continue_btn' )
        {
            conformationMsg = "Are you sure you|want to continue|on to the next state?";
            actionType = uiControlDefs.ECAT_GAME_STATE_CHANGE;
            executionAction = "level_1_state";
        }
        else if( this.control.name === 'main_menu_btn' )
        {
            conformationMsg = 'Are you sure you|want to go back to|the main menu?';
            actionType = uiControlDefs.ECAT_GAME_STATE_CHANGE;
            executionAction = 'title_screen_state';
        }
        
        // Set the conformation menu
        yesBtn.actionType = actionType;
        yesBtn.executionAction = executionAction;
        megLbl.createFontStr( conformationMsg );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return true; }
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
