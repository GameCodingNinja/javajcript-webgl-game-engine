// 
//  FILE NAME: menutree.js
//  DESC:      Class that hold a tree of menus
//

"use strict";
import { eventManager } from '../managers/eventmanager';
import * as menuDefs from '../gui/menudefs';

export class MenuTree
{
    constructor( name, menuMap, rootMenu, defaultMenu, interfaceMenu = false )
    {
        // Name of the tree
        this.name = name;

        // Map of the menus
        this.menuMap = menuMap;

        // root menu
        this.rootMenu = menuMap.get( rootMenu );

        // default menu
        this.defaultMenu = menuMap.get( defaultMenu );

        // Is interface menu?
        this.interfaceMenu = interfaceMenu;

        // Name of menu we are transitioning to
        this.toMenu = '';

        // Array of the path taken through the menu
        this.menuPathAry = [];

        // menu tree state
        this.state = menuDefs.EMTS_IDLE;
    }
    
    // 
    //  DESC: Init the tree for use
    //
    init()
    {
        this.menuPathAry = [];

        if( this.rootMenu !== undefined )
        {
            // If we have a root menu, add it to the path
            this.menuPathAry.push( this.rootMenu );

            this.rootMenu.activateMenu();
        }
    }
    
    // 
    //  DESC: Set the default menu
    //
    setDefaultMenu( menuStr )
    {
        let menu = this.menuMap.get( menuStr );
        if( menu !== undefined )
            this.defaultMenu = menu;
        else
            throw new Error( `Menu being set is missing (${menuStr})!` );
    }
    
    // 
    //  DESC: Set the root menu
    //
    setRootMenu( menuStr )
    {
        let menu = this.menuMap.get( menuStr );
        if( menu !== undefined )
            this.rootMenu = menu;
        else
            throw new Error( `Menu being set is missing (${menuStr})!` );
    }
    
    // 
    //  DESC: Is the default menu
    //
    isDefaultMenu( menuStr )
    {
        if( this.defaultMenu && this.defaultMenu.name === menuStr )
            return true
        
        return false;
    }
    
    // 
    //  DESC: Is the root menu
    //
    isRootMenu( menuStr )
    {
        if( this.rootMenu && this.rootMenu.name === menuStr )
            return true
        
        return false;
    }

    // 
    //  DESC: Update the menu tree
    //
    update()
    {
        if( this.menuPathAry.length )
            this.menuPathAry[this.menuPathAry.length-1].update();
    }
    
    // 
    //  DESC: Transform the menu tree
    //
    transform()
    {
        if( this.menuPathAry.length )
            this.menuPathAry[this.menuPathAry.length-1].transform();
    }
    
    // 
    //  DESC: do the render
    //
    render( camera )
    {
        if( this.menuPathAry.length )
            this.menuPathAry[this.menuPathAry.length-1].render( camera );
    }
    
    // 
    //  DESC: Is a menu active?
    //
    isActive()
    {
        return (this.menuPathAry.length > 0);

    }
    
    // 
    //  DESC: Does this tee have a root menu
    //
    hasRootMenu()
    {
        return (this.rootMenu != undefined);
    }
    
    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        // Trap only controller events to check for actions
        if( !this.interfaceMenu )
        {
            if( this.menuPathAry.length )
                this.menuPathAry[this.menuPathAry.length-1].handleEvent( event );

            if( event instanceof CustomEvent )
            {
                if( this.state === menuDefs.EMTS_IDLE )
                {
                    if( event.detail.type === menuDefs.EGE_MENU_ESCAPE_ACTION )
                    {
                        this.onEscape( event );
                    }
                    else if( event.detail.type === menuDefs.EGE_MENU_TOGGLE_ACTION )
                    {
                        this.onToggle( event );
                    }
                    else if( event.detail.type === menuDefs.EGE_MENU_BACK_ACTION )
                    {
                        this.onBack( event );
                    }
                    else if( event.detail.type === menuDefs.EGE_MENU_TO_TREE )
                    {
                        this.onToTree( event );
                    }
                    else if( event.detail.type === menuDefs.EGE_MENU_TO_MENU )
                    {
                        this.onToMenu( event );
                    }
                }
                else if( event.detail.type === menuDefs.EGE_MENU_TRANS_IN )
                {
                    this.onTransIn( event );
                }
                else if( event.detail.type === menuDefs.EGE_MENU_TRANS_OUT )
                {
                    this.onTransOut( event );
                }
            }
        }
        else
        {
            // Don't process menu specific messages for an interface menu
            if( (event instanceof CustomEvent) && event.detail.type <= menuDefs.EGE_MENU_GAME_STATE_CHANGE )
                return;
                
            if( this.menuPathAry.length )
                this.menuPathAry[this.menuPathAry.length-1].handleEvent( event );
        }
    }
    
    // 
    //  DESC: Transition the menu
    //
    transitionMenu()
    {
        // If the path array is empty, transition to the default menu
        if( this.menuPathAry.length === 0 )
        {
            // Make sure the menu exists
            if( this.defaultMenu === undefined )
                throw new Error( 'Default menu does not exist!' );

            // Add the default menu to the path
            this.menuPathAry.push( this.defaultMenu );

            // Get the name of the menu we are transitioning to
            // This is also used as a flag to indicate moving up the menu tree
            this.toMenu = this.defaultMenu.name;

            // Set the state as "active" so that input messages are ignored
            this.state = menuDefs.EMTS_ACTIVE;

            // Start the transition in
            eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_IN, menuDefs.ETC_BEGIN );
        }
        else
        {
            // If this isn't the root menu, start the transition out
            if( this.menuPathAry[this.menuPathAry.length-1] != this.rootMenu )
            {
                // Set the state as "active" so that input messages are ignored
                this.state = menuDefs.EMTS_ACTIVE;

                // Start the transition out
                eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_OUT, menuDefs.ETC_BEGIN );
            }
        }
    }
    
    // 
    //  DESC: Handle OnEscape message
    //
    onEscape( event )
    {
        let nameStr = event.detail.arg[0];
        if( this.menuPathAry.length || ((nameStr !== null) && (nameStr === this.name)))
        {
            this.transitionMenu();
        }
    }
    
    // 
    //  DESC: Handle OnToggle message
    //
    onToggle( event )
    {
        let nameStr = event.detail.arg[0];
        if( this.menuPathAry.length || ((nameStr !== null) && (nameStr === this.name)))
        {
            // Toggle "on" only works when there is no root menu
            if( this.rootMenu === undefined )
            {
                this.transitionMenu();

                // For toggle, clear out the path array except for the current menu
                // The current menu will then be used for the transitions out
                if( this.menuPathAry.length > 1 )
                {
                    let curMenu = this.menuPathAry[this.menuPathAry.length-1];
                    this.menuPathAry = [];
                    this.menuPathAry.push( curMenu );
                }
            }
            else
            {
                if( this.menuPathAry.length > 1 )
                    this.transitionMenu();

                // For toggle, clear out the path array except for the current and root menu
                // The current menu will then be used for the transitions out
                if( this.menuPathAry.length > 2 )
                {
                    let curMenu = this.menuPathAry[this.menuPathAry.length-1];
                    this.menuPathAry = [];
                    this.menuPathAry.push( this.rootMenu );
                    this.menuPathAry.push( curMenu );
                }
            }
        }
    }
    
    // 
    //  DESC: Handle OnBack message
    //
    onBack( event )
    {
        // Going back one require there to be a active menu that is not root
        if( this.menuPathAry.length && (this.menuPathAry[this.menuPathAry.length-1] != this.rootMenu) )
        {
            this.transitionMenu();
        }
    }
    
    // 
    //  DESC: Handle OnToTree message
    //
    onToTree( event )
    {
        let nameStr = event.detail.arg[0];
        if( (nameStr !== null) && (nameStr === this.name) )
        {
            // Only works when there is no root menu
            if( this.rootMenu === undefined )
                this.transitionMenu();
        }
    }
    
    // 
    //  DESC: Handle OnToMenu message
    //
    onToMenu( event )
    {
        // Going to a menu require there to be a active menu
        // and the calling control is on a menu on this tree
        if( this.menuPathAry.length && 
            (this.menuPathAry[this.menuPathAry.length-1].getActiveControl() == event.detail.arg[1]) )
        {
            // Set the state as "active" so that input messages are ignored
            this.state = menuDefs.EMTS_ACTIVE;

            // Get the name of the menu we are transitioning to
            // This is also used as a flag to indicate moving deaper into the menu tree
            this.toMenu = event.detail.arg[0];

            // Do a sanity check to make sure the menu exists
            if( this.menuMap.get(this.toMenu) === undefined )
                throw new Error( `Menu does not exist! (${this.toMenu}).` );

            // Start the transition out
            eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_OUT, menuDefs.ETC_BEGIN );
        }
    }
    
    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === menuDefs.ETC_END )
        {
            if( this.toMenu.length )
            {
                this.menuPathAry.push( this.menuMap.get(this.toMenu) );
                eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_IN, menuDefs.ETC_BEGIN );
            }
            else if( this.menuPathAry.length && (this.menuPathAry[this.menuPathAry.length-1] !== this.rootMenu) )
            {
                // Pop it off the array because this menu is done
                let menu = this.menuPathAry.pop();
                
                // Do a full reset on all the controls
                menu.reset();

                if( this.menuPathAry.length )
                    eventManager.dispatchEvent( menuDefs.EGE_MENU_TRANS_IN, menuDefs.ETC_BEGIN );
            }

            // Normally, after one menu transitions out, the next menu transitions in
            // Only set the idle state if this transition out is final
            if( this.menuPathAry.length === 0 )
                this.state = menuDefs.EMTS_IDLE;
        }
    }
    
    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === menuDefs.ETC_END )
        {
            // m_toMenu is also used as a flag to indicate moving up the menu tree
            // When moving up the menu tree, activate the first control on the menu
            // When backing out of the menu tree, activate the last control used
            eventManager.dispatchEvent( menuDefs.EGE_MENU_SET_ACTIVE_CONTROL, 
                (this.toMenu.length === 0) ? menuDefs.EAC_LAST_ACTIVE_CONTROL : menuDefs.EAC_FIRST_ACTIVE_CONTROL );

            // Set to idle to allow for input messages to come through
            this.state = menuDefs.EMTS_IDLE;

            // Clear in the event we start backing out of the menu tree
            this.toMenu = '';
        }
    }
    
    // 
    //  DESC: Get the active menu
    //
    getActiveMenu()
    {
        if( this.menuPathAry.length === 0 )
            throw new Error( 'There is no active menu!' );

        return this.menuPathAry[this.menuPathAry.length-1];
    }
    
    // 
    //  DESC: Get the scroll param data
    //
    getScrollParam( msg )
    {
        if( this.menuPathAry.length === 0 )
            throw new Error( 'There is no active menu!' );

        return this.menuPathAry[this.menuPathAry.length-1].getScrollParam( msg );
    }
    
    // 
    //  DESC: Is a menu item active
    //
    isMenuItemActive()
    {
        if( this.isActive() )
        {
            if( this.getActiveMenu().getActiveControl() !== null )
                return false;
        }

        return false;
    }
    
}
