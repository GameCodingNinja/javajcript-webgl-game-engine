
//
//  FILE NAME: ismartguibase.js
//  DESC:      Smart Gui interface & Base Classes
//

"use strict";

// 
//  DESC: Smart GUI interface class
//
class iSmartGui
{
    constructor()
    {
    }
    
    // 
    //  DESC: Called when the control is created
    //
    create()
    {
        // Empty function to be overwritten
    }

    // 
    //  DESC: Called during the handle user imput
    //
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
}

// 
//  DESC: Smart GUI Menu class
//
export class SmartGuiMenu extends iSmartGui
{
    constructor( uiMenu )
    {
        super();
        
        this.uiMenu = uiMenu;
    }
}

// 
//  DESC: Smart GUI Control
//
export class SmartGuiControl extends iSmartGui
{
    constructor( uiControl )
    {
        super();
        
        this.uiControl = uiControl;
    }

    // 
    //  DESC: Called when the control is executed
    //
    execute()
    {
        // Empty function to be overwritten
    }
}
