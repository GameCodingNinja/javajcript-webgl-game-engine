
//
//  FILE NAME: menuscripts.js
//  DESC:      script for the menus
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { Color } from '../../../library/common/color';
import * as utilScripts from './utilityscripts';
import * as defs from '../../../library/common/defs';

//
//  DESC: Script for playing the active sound
//
class Control_OnActive
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        // No init required
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
class Control_OnSelect
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        // No init required
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
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
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
            
            eventManager.dispatchEvent( defs.EGE_MENU_TRANS_IN, defs.ETC_END );
        }
        else
        {
            this.menu.setAlpha( this.current );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
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
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
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
            
            eventManager.dispatchEvent( defs.EGE_MENU_TRANS_OUT, defs.ETC_END );
        }
        else
        {
            this.menu.setAlpha( this.current );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}


//
//  DESC: Script for setting the look of the disabled state
//
class Control_Disabled
{
    constructor( sprite )
    {
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        // No init required
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
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
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
    //  DESC: Init the script for use
    //
    init()
    {
        // No init required
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setColor( this.sprite.getDefaultColor() );
        
        this.finished = true;
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
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
    //  DESC: Init the script for use
    //
    init()
    {
        // No init required
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.object.setVisible( false );
        
        this.finished = true;
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
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

        this.toggle = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( hiHSV, lowHSV )
    {
        this.sprite.object.setVisible( true );
        
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
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.3, 0.5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return false; }
}

class Control_Solid_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.1, 0.5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return false; }
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

        this.toggle = false;
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( hiHSV, lowHSV )
    {
        this.sprite.object.setVisible( true );
        
        this.hiColor.copy( this.sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        
        this.lowColor.copy( this.sprite.getDefaultColor() );
        this.lowColor.transformHSV( 0, 1, lowHSV );
        
        this.colorTo.init( this.hiColor, this.lowColor, 120 );
        
        this.toggle = false;
        this.finished = false;
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
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
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
            eventManager.dispatchEvent( defs.EGE_MENU_SELECT_EXECUTE );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Selected_Dispatch_Exe_Act extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
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
            eventManager.dispatchEvent( defs.EGE_MENU_SELECT_EXECUTE );
            eventManager.dispatchEvent( defs.EGE_MENU_REACTIVATE );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Selected_Visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}


//
//  DESC: Animates the selected state and sends a message
//
class Control_Solid_Selected_visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.object.setVisible( false );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Solid_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.object.setVisible( false );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Selected_frame_highlight extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
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
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
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
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init( hiHSV )
    {
        this.sprite.object.setVisible( true );
        
        this.hiColor.copy( this.sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        this.finished = false;
        
        this.sprite.setColor( this.hiColor );
    }
}

class Control_Fast_Face_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        this.time = 0;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
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
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Fast_Face_Selected_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        this.time = 0;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
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
            eventManager.dispatchEvent( defs.EGE_MENU_REACTIVATE );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Fast_Face_Selected_Exe_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        this.time = 0;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
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
            eventManager.dispatchEvent( defs.EGE_MENU_SELECT_EXECUTE );
            eventManager.dispatchEvent( defs.EGE_MENU_REACTIVATE );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Fast_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        this.time = 80;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
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
            this.sprite.object.setVisible( false );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_Fast_Solid_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
        
        this.time = 80;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
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
            this.sprite.object.setVisible( false );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

class Control_slider_btn_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return true; }
}


// 
//  DESC: Load XML files
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
}
