
// 
//  FILE NAME: menumanager.js
//  DESC:      menu manager class singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { actionManager } from '../managers/actionmanager';
import { eventManager } from '../managers/eventmanager';
import { assetHolder } from '../utilities/assetholder';
import { Menu } from '../gui/menu';
import { MenuTree } from '../gui/menutree';
import { cameraManager } from '../managers/cameramanager';
import { GenericEvent } from '../common/genericevent';
import { GamepadEvent } from '../common/gamepadevent';
import * as genFunc from '../utilities/genfunc';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

class MenuManager extends ManagerBase
{
    constructor()
    {
        super();
        
        // NOTE: Only simple allocation that don't 
        //       require Settings to be loaded
        
        // Map map of menu trees
        this.menuTreeMapMap = new Map;

        // Map of the menus
        this.menuMapMap = new Map;

        // Array of active menu trees
        this.activeMenuTreeAry = [];

        // Array of active interface trees
        this.activeInterTreeAry = [];

        // menu manager state
        this.active = false;

        // Memu manager initialized
        this.initialized = false;

        // Actions
        this.backAction;
        this.toggleAction;
        this.escapeAction;
        this.selectAction;
        this.upAction;
        this.downAction;
        this.leftAction;
        this.rightAction;
        this.tabLeft;
        this.tabRight;
        this.defaultTree;

        // scroll timer Id
        this.scrollTimerId = 0;

        // Allow message processing
        this.allow = false;
    }
    
    //
    //  DESC: Set the default camera
    //
    setDefaultCamera()
    {
        // Default camera
        this.camera = cameraManager.getDefault();
    }
    
    // 
    //  DESC: Set the camera
    //
    setCamera( cameraId )
    {
        this.camera = cameraManager.get( cameraId );
    }
    
    // 
    //  DESC: Load the menu group
    //
    loadGroupXML( group )
    {
        let promiseAry = [];

        let groupAry = group;
        if( !(group instanceof Array) )
            groupAry = [group];

        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for has been defined in the list table file
            let pathAry = this.listTableMap.get( group );
            if( pathAry !== undefined )
            {
                // Load the group data if it doesn't already exist
                if( this.menuMapMap.get( group ) === undefined )
                {
                    // Create a new group map inside of our maps
                    this.menuMapMap.set( group, new Map );
                    this.menuTreeMapMap.set( group, new Map );

                    for( let i = 0; i < pathAry.length; ++i )
                    {
                        let filePath = pathAry[i];

                        promiseAry.push( 
                            genFunc.downloadFile( 'xml', filePath )
                                .then(( xmlNode ) => this.loadFromNode( group, xmlNode ))
                                .catch(( error ) => { console.error(error.stack); throw error; }));
                    }
                }
                else
                {
                    throw new Error( `Menu group has alread been loaded (${group})!` );
                }
            }
            else
            {
                throw new Error( `Menu Manager list group name can't be found (${group})!` );
            }
        }

        return Promise.all( promiseAry );
    }
    
    //
    //  DESC: Load all object information from an xml node
    //
    loadFromNode( group, xmlNode )
    {
        // Load the menus from node
        return this.loadMenuFromNode( group, xmlNode )

            // Load the trees from node
            .then(() => this.loadTreesFromNode( group, xmlNode ))
    }
    
    //
    //  DESC: preload all object information from an xml node
    //
    loadMenuFromNode( group, xmlNode )
    {
        let promiseAry = [];

        // Get the menu group map
        let groupMap = this.menuMapMap.get( group );
        
        let menuNode = xmlNode.getElementsByTagName('menu');

        for( let i = 0; i < menuNode.length; ++i )
        {
            // Get the name of the menu
            let name = menuNode[i].getAttribute( 'name' );

            // Get the menu file path
            let filePath = menuNode[i].getAttribute( 'file' );

            // Check for duplicates
            if( groupMap.get( name ) !== undefined )
                throw new Error( `Duplicate menu name! (${name}).` );

            // Allocate a new menu
            let menu = new Menu( name, group, filePath );

            // Insert the menu into the group map
            groupMap.set( name, menu );

            // Load the transform from node
            menu.loadTransFromNode( menuNode[i] );

            // Load the dynamic offset from node
            menu.loadDynamicOffsetFromNode( menuNode[i] );

            // Check if this file has already been loaded
            if( assetHolder.allowLoad( group, filePath ) )
            {
                // Load the menu XML file
                promiseAry.push( 
                    genFunc.downloadFile( 'xml', filePath )
                        .then(( node ) => 
                        {
                            // Store the preloaded XML file
                            assetHolder.set( group, filePath, node );

                            // Recurse back until all XML files are loaded
                            return this.loadControlFromNode( group, node );
                        })
                        .catch(( error ) => { console.error(error.stack); throw error; }));
            }
        }

        return Promise.all( promiseAry );
    }
    
    //
    //  DESC: Load the trees from node
    //
    loadTreesFromNode( group, node )
    {
        // Get the menu group map
        let menuGroupMap = this.menuMapMap.get( group );
        
        // Get the tree group map
        let treeGroupMap = this.menuTreeMapMap.get( group );
        
        // Get the node to the list of trees
        let treeNode = node.getElementsByTagName('tree');

        for( let i = 0; i < treeNode.length; ++i )
        {
            // Get the name
            let name = treeNode[i].getAttribute( 'name' );

            // Get the root menu
            let rootMenu = treeNode[i].getAttribute( 'root' );

            // Get the default menu
            let defaultMenu = treeNode[i].getAttribute( 'default' );

            // Is this menu an interface menu?
            let interfaceMenu = (treeNode[i].getAttribute( 'interfaceMenu' ) === 'true');

            // Check for duplicate names
            if( treeGroupMap.get( name ) !== undefined )
                throw new Error( `Duplicate tree name! (${name}).` );

            // Add the tree data to the map
            treeGroupMap.set( name, new MenuTree( name, menuGroupMap, rootMenu, defaultMenu, interfaceMenu ) );

            // Check that the root menu exists
            if( rootMenu !== '' )
            {
                if( menuGroupMap.get( rootMenu ) === undefined )
                    throw new Error( `Root menu doesn't exist! (${name}).` );
            }
            else if( defaultMenu !== '' )
            {
                if( menuGroupMap.get( defaultMenu ) === undefined )
                    throw new Error( `Default menu doesn't exist! (${name}).` );
            }
        }
    }
    
    //
    //  DESC: load the menu controls from menu node
    //        NOTE: Promise using recursive function
    //
    loadControlFromNode( group, xmlNode )
    {
        let promiseAry = [];
        let controlLst = ['staticMenuControls', 'mouseOnlyControls', 'menuControls', 'subControlList', 'scrollBoxControlList'];
        
        // Load the control XML files
        for( let i = 0; i < controlLst.length; ++i )
        {
            let nodeLst = xmlNode.getElementsByTagName( controlLst[i] );
            if( nodeLst.length )
            {
                let controlNode = nodeLst[0].getElementsByTagName( 'control' );

                for( let j = 0; j < controlNode.length; ++j )
                {
                    let filePathNode = controlNode[j].getElementsByTagName( 'filePath' );
                    if( filePathNode.length )
                    {
                        let filePath = filePathNode[0].getAttribute('file');
                        if( filePath )
                        {
                            // Check if this file has already been scheduled for loading
                            if( assetHolder.allowLoad( group, filePath ) )
                            {
                                promiseAry.push(
                                    genFunc.downloadFile( 'xml', filePath )
                                    .then(( node ) => 
                                    {
                                        // Store the preloaded XML file
                                        assetHolder.set( group, filePath, node );
            
                                        // Recurse back until all XML files are loaded
                                        return this.loadControlFromNode( group, node );
                                    })
                                    .catch(( error ) => { console.error(error.stack); throw error; }));
                            }
                        }
                    }
                }
            }
        }

        return Promise.all( promiseAry );
    }
    
    //
    //  DESC: Create menu objects from loaded xml data
    //
    createFromData( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the menu group map
            let groupMap = this.menuMapMap.get( group );
            if( groupMap === undefined )
                throw new Error( `Group map can't be found! (${group}).` );

            for( let menu of groupMap.values() )
            {
                // Get the menu XML node
                let xmlNode = assetHolder.get( group, menu.filePath );

                // Have the menu load it's share
                menu.loadFromNode( xmlNode );
            }

            this.initGroup( group );
        }

        this.initialized = true;

        return 0;
    }

    //
    //  DESC: Free the menu group
    //
    freeGroup( group )
    {
        let groupAry = group;
        if( !(group instanceof Array) )
            groupAry = [group];

        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Object data list group name can't be found (${group})!` );

            // Get the group map
            let groupMap = this.menuTreeMapMap.get( group );
            if( groupMap !== undefined )
            {
                // Remove it from the tree vectors if it is there
                for( let menuTree of groupMap.values() )
                {
                    if( menuTree.interfaceMenu )
                    {
                        let index = this.activeInterTreeAry.indexOf( menuTree );

                        if( index > -1 )
                            this.activeInterTreeAry.splice( index, 1 );
                    }
                    else
                    {
                        let index = this.activeMenuTreeAry.indexOf( menuTree );

                        if( index > -1 )
                            this.activeMenuTreeAry.splice( index, 1 );
                    }
                }

                // Free the menu group
                this.menuTreeMapMap.delete( group );
                this.menuMapMap.delete( group );
            }
        }
    }
    
    // 
    //  DESC: Init a menu group
    //  NOTE: This allows certain actions to be done after the group load
    //
    initGroup( group )
    {
        this._groupMap = this.menuMapMap.get( group );
        if( this._groupMap !== undefined )
        {
            for( this._menu of this._groupMap.values() )
                this._menu.init();
        }
        else
        {
            throw new Error( `Menu group name can't be found to init (${group})!` );
        }
    }

    // 
    //  DESC: Clean up a menu group
    //  NOTE: This allows certain actions to be done after the group load
    //
    cleanUpGroup( group )
    {
        this._groupMap = this.menuMapMap.get( group );
        if( this._groupMap !== undefined )
        {
            for( this._menu of this._groupMap.values() )
                this._menu.cleanUp();
        }
        else
        {
            throw new Error( `Menu group name can't be found to clean up (${group})!` );
        }
    }
    
    // 
    //  DESC: Load the menu action list from XML
    //
    loadMenuAction( filePath )
    {
        return genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) => this.loadMenuActionFromNode( xmlNode ));
    }

    // 
    //  DESC: Load the menu action list from JSON
    //
    loadMenuActionFromObj( obj )
    {
        this.backAction = obj.backAction;
        this.toggleAction = obj.toggleAction;
        this.escapeAction = obj.escapeAction;
        this.selectAction = obj.selectAction;
        this.upAction = obj.upAction;
        this.downAction = obj.downAction;
        this.leftAction = obj.leftAction;
        this.rightAction = obj.rightAction;
        this.tabLeft = obj.tabLeft;
        this.tabRight = obj.tabRight;
        this.defaultTree = obj.defaultTree;
    }
    
    // 
    //  DESC: Activate a tree to be used by tree name only
    //        NOTE: Assumes unique tree names
    //
    activateTree( treeAry )
    {
        for( let tree = 0; tree < treeAry.length; ++tree )
        {
            let treeStr = treeAry[tree];
            let found = false;
            
            for( let [ groupKey, groupMap ] of this.menuTreeMapMap.entries() )
            {
                for( let key of groupMap.keys() )
                {
                    if( key === treeStr )
                    {
                        this.activateTreeGroup( groupKey, key );
                        found = true;
                        break;
                    }
                }
                
                if( found )
                    break;
            }

            // If you got this far, it's a problem
            if( !found )
                throw new Error( `Menu tree doesn't exist (${treeStr})!` );
        }
    }
    
    // 
    //  DESC: Activate a tree to be used based on group
    //
    activateTreeGroup( group, treeStr )
    {
        let groupMap = this.menuTreeMapMap.get( group );
        if( groupMap !== undefined )
        {
            // Find the tree in the map
            let tree = groupMap.get( treeStr );
            if( tree !== undefined )
            {
                if( tree.interfaceMenu )
                {
                    if( this.activeInterTreeAry.indexOf( tree ) !== -1 )
                        throw new Error( `Menu tree already active (${group} - ${treeStr})!` );

                    this.activeInterTreeAry.push( tree );
                }
                else
                {
                    if( this.activeMenuTreeAry.indexOf( tree ) !== -1 )
                        throw new Error( `Menu tree already active (${group} - ${treeStr})!` );

                    this.activeMenuTreeAry.push( tree );
                }

                // Init the tree for use
                tree.init();
            }
            else
            {
                throw new Error( `Menu tree doesn't exist (${group} - ${treeStr})!` );
            }
        }
        else
        {
            throw new Error( `Menu tree group doesn't exist (${group} - ${treeStr})!` );
        }

        // See if we are active
        this.setActiveState();
    }
    
    // 
    //  DESC: Deactivate a tree to be used by tree name only
    //        NOTE: Assumes unique tree names
    //
    deactivateTree( treeStr )
    {
        for( let [ groupKey, groupMap ] of this.menuTreeMapMap.entries() )
        {
            for( let key of groupMap.keys() )
            {
                if( key === treeStr )
                {
                    this.deactivateTreeGroup( groupKey, key );
                    return;
                }
            }
        }

        // If you got this far, it's a problem
        throw new Error( `Menu tree doesn't exist (${treeStr})!` );
    }

    // 
    //  DESC: Deactivate a tree that's in use
    //
    deactivateTreeGroup( group, treeStr )
    {
        let groupMap = this.menuTreeMapMap.get( group );
        if( groupMap !== undefined )
        {
            // Find the tree in the map
            let tree = groupMap.get( treeStr );
            if( tree !== undefined )
            {
                // Remove the tree from the vector
                if( tree.interfaceMenu )
                {
                    let index = this.activeInterTreeAry.indexOf( tree );
                    if( index > -1 )
                        this.activeInterTreeAry.splice( index, 1 );
                }
                else
                {
                    let index = this.activeMenuTreeAry.indexOf( tree );
                    if( index > -1 )
                        this.activeMenuTreeAry.splice( index, 1 );
                }
            }
            else
            {
                throw new Error( `Menu tree doesn't exist (${group} - ${treeStr})!` );
            }
        }
        else
        {
            throw new Error( `Menu tree group doesn't exist (${group} - ${treeStr})!` );
        }

        // See if we are still active
        this.setActiveState();
    }
    
    // 
    //  DESC: Clear the active trees
    //
    clearActiveTrees()
    {
        this.active = false;
        
        if( this.scrollTimerId !== 0 )
            clearInterval( this.scrollTimerId );

        this.activeMenuTreeAry.length = 0;
        this.activeInterTreeAry.length = 0;
    }
    
    // 
    //  DESC: Handle input events and dispatch menu events
    //
    handleEvent( event )
    {
        if( this.allow )
        {
            // Convert keyboard, mouse and controller messages in action type messages
            if( event instanceof GenericEvent )
            {
                // Are we doing menu actions? May need to do some scrolling
                if( (event.type >= menuDefs.EME_MENU_UP_ACTION) && (event.type <= menuDefs.EME_MENU_RIGHT_ACTION) )
                {
                    // Free a timer if one happens to be running
                    if( this.scrollTimerId != 0 )
                        clearTimeout( this.scrollTimerId );
                    
                    this.scrollTimerId = 0;

                    if( event.arg[0] === defs.EAP_DOWN )
                        this.handleEventForScrolling( event );
                }
                
                this.handleEventForTrees( event );

                // Set the active state
                this.setActiveState();
            }
            else
            {
                // Only the default tree can execute an escape or toggle when none are active.
                if( actionManager.wasActionPress( event, this.escapeAction, defs.EAP_DOWN ) )
                {
                    this._tree = this.getActiveTree();

                    if( this._tree === null )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_ESCAPE_ACTION, this.defaultTree );
                    else
                        eventManager.dispatchEvent( menuDefs.EME_MENU_ESCAPE_ACTION, this._tree.name );
                }
                else if( actionManager.wasActionPress( event, this.toggleAction, defs.EAP_DOWN ) )
                {
                    this._tree = this.getActiveTree();

                    if( this._tree === null )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_TOGGLE_ACTION, this.defaultTree );
                    else
                        eventManager.dispatchEvent( menuDefs.EME_MENU_TOGGLE_ACTION, this._tree.name );
                }
                else if( this.active )
                {
                    this._pressType;

                    // common and can result in many messages which is why it's specifically defined here
                    if( event.type === 'mousemove' || event.type === 'wheel' )
                    {
                        // Allow the mouse move message to get eaten when action handling is disabled.
                        this.handleEventForTrees( event );
                    }
                    // Select action based on input device
                    else if( (this._pressType = actionManager.wasAction( event, this.selectAction )) > defs.EAP_IDLE )
                    {
                        if( event instanceof KeyboardEvent )
                        {
                            eventManager.dispatchEvent( menuDefs.EME_MENU_SELECT_ACTION, this._pressType, defs.KEYBOARD );
                        }
                        else if( event instanceof MouseEvent )
                        {
                            eventManager.dispatchEvent(
                                menuDefs.EME_MENU_SELECT_ACTION,
                                this._pressType,
                                defs.MOUSE,
                                event.gameAdjustedMouseX,
                                event.gameAdjustedMouseY );
                        }
                        else if( event instanceof GamepadEvent )
                        {
                            eventManager.dispatchEvent( menuDefs.EME_MENU_SELECT_ACTION, this._pressType, defs.GAMEPAD );
                        }
                    }
                    else if( actionManager.wasActionPress( event, this.backAction, defs.EAP_DOWN ) )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_BACK_ACTION );

                    else if( (this._pressType = actionManager.wasAction( event, this.upAction )) > defs.EAP_IDLE )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_UP_ACTION, this._pressType );

                    else if( (this._pressType = actionManager.wasAction( event, this.downAction )) > defs.EAP_IDLE )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_DOWN_ACTION, this._pressType );

                    else if( (this._pressType = actionManager.wasAction( event, this.leftAction )) > defs.EAP_IDLE )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_LEFT_ACTION, this._pressType );

                    else if( (this._pressType = actionManager.wasAction( event, this.rightAction )) > defs.EAP_IDLE )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_RIGHT_ACTION, this._pressType );

                    else if( (this._pressType = actionManager.wasAction( event, this.tabLeft )) > defs.EAP_IDLE )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_TAB_LEFT, this._pressType );

                    else if( (this._pressType = actionManager.wasAction( event, this.tabRight )) > defs.EAP_IDLE )
                        eventManager.dispatchEvent( menuDefs.EME_MENU_TAB_RIGHT, this._pressType );

                    // If none of the predefined actions have been hit, just send the message for processing
                    else
                    {
                        this.handleEventForTrees( event );
                    }
                }
            }
        }
    }
    
    // 
    //  DESC: Handle input events depending on if this is a menu or interface tree
    //
    handleEventForTrees( event )
    {
        this._menuActive = false;

        for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
        {
            // See if there's an active tree
            this._menuActive |= this.activeMenuTreeAry[this._i].isActive();

            // Even if a menu tree is not active, it needs to receive events to become active
            this.activeMenuTreeAry[this._i].handleEvent( event );
        }

        // Only allow event handling for interface menus when regular menus are not active
        if( !this._menuActive )
        {
            for( this._i = 0; this._i < this.activeInterTreeAry.length; ++this._i )
            {
                if( this.activeInterTreeAry[this._i].isActive() )
                    this.activeInterTreeAry[this._i].handleEvent( event );
            }
        }
    }
    
    // 
    //  DESC: Handle input events depending on if this is a menu or interface tree
    //
    handleEventForScrolling( event )
    {
        if( this.active )
        {
            if( !this.handleMenuScrolling( event, this.activeMenuTreeAry ) )
            {
                // Only allow event handling for interface menus when regular menus are not active
                this.handleMenuScrolling( event, this.activeInterTreeAry );
            }
        }
    }
    
    // 
    //  DESC: Handle input events for menu scrolling
    //
    handleMenuScrolling( event, activeTreeAry )
    {
        this._menuActive = false;

        for( this._i = 0; this._i < activeTreeAry.length; ++this._i )
        {
            // See if there's an active menu
            if( activeTreeAry[this._i].isActive() )
            {
                this._menuActive = true;

                let scrollParam = activeTreeAry[this._i].getScrollParam( event.type );

                // If scrolling is allowed, start the timer
                if( scrollParam.canScroll( event.type ) )
                {
                    this.scrollTimerId = setTimeout(
                        () =>
                        {
                            this.scrollTimerId = setInterval(
                                () => eventManager.dispatchEvent( scrollParam.msg ),
                                scrollParam.scrollDelay );
                                
                            eventManager.dispatchEvent( scrollParam.msg );
                        }, 
                        scrollParam.startDelay );
                        
                    break;
                }
            }
        }

        return this._menuActive;
    }
    
    // 
    //  DESC: Update the menu
    //
    update()
    {
        if( this.active )
        {
            if( !this.updateMenu( this.activeMenuTreeAry ) )
            {
                // Only allow Updating for interface menus when regular menus are not active
                this.updateMenu( this.activeInterTreeAry );
            }
        }
    }

    // 
    //  DESC: Update the menu
    //
    updateMenu( activeTreeAry )
    {
        this._menuActive = false;

        for( this._i = 0; this._i < activeTreeAry.length; ++this._i )
        {
            // See if there's an active menu
            if( activeTreeAry[this._i].isActive() )
            {
                this._menuActive = true;
                activeTreeAry[this._i].update();
            }
        }

        return this._menuActive;
    }
    
    // 
    //  DESC: Transform the menu
    //
    transform()
    {
        if( this.active )
        {
            if( !this.transformMenu( this.activeMenuTreeAry ) )
            {
                // Only allow Updating for interface menus when regular menus are not active
                this.transformMenu( this.activeInterTreeAry );
            }
        }

    }

    // 
    //  DESC: Transform the menu
    //
    transformMenu( activeTreeAry )
    {
        this._menuActive = false;

        for( this._i = 0; this._i < activeTreeAry.length; ++this._i )
        {
            // See if there's an active menu
            if( activeTreeAry[this._i].isActive() )
            {
                this._menuActive = true;
                activeTreeAry[this._i].transform();
            }
        }

        return this._menuActive;
    }
    
    // 
    //  DESC: Render menus
    //
    render()
    {
        if( this.active )
        {
            for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
                if( this.activeMenuTreeAry[this._i].isActive() )
                    this.activeMenuTreeAry[this._i].render( this.camera );
        }
    }

    // 
    //  DESC: Render interface menus
    //
    renderInterface( matrix )
    {
        if( this.active )
        {
            for( this._i = 0; this._i < this.activeInterTreeAry.length; ++this._i )
                if( this.activeInterTreeAry[this._i].isActive() )
                    this.activeInterTreeAry[this._i].render( matrix );
        }
    }
    
    // 
    //  DESC: Is this standard menu system active?
    //
    isMenuActive()
    {
        if( this.active )
            for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
                if( this.activeMenuTreeAry[this._i].isActive() )
                    return true;

        return false;
    }

    // 
    //  Is a menu item active
    //
    isMenuItemActive()
    {
        this._result = false;

        if( this.active )
        {
            for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
            {
                if( this.activeMenuTreeAry[this._i].isActive() )
                {
                    this._result = this.activeMenuTreeAry[this._i].isMenuItemActive();

                    break;
                }
            }
        }

        return this._result;
    }

    // 
    //  Is a interface item active
    //
    isInterfaceItemActive()
    {
        this._result = false;

        if( this.active )
        {
            for( this._i = 0; this._i < this.activeInterTreeAry.length; ++this._i )
            {
                if( this.activeInterTreeAry[this._i].isActive() )
                {
                    this._result = this.activeInterTreeAry[this._i].isMenuItemActive();

                    break;
                }
            }
        }

        return this._result;
    }

    // 
    //  Set the active state
    //
    setActiveState()
    {
        this.active = false;

        for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
        {
            if( this.activeMenuTreeAry[this._i].isActive() )
            {
                this.active = true;
                break;
            }
        }

        if( !this.active )
        {
            for( this._i = 0; this._i < this.activeInterTreeAry.length; ++this._i )
            {
                if( this.activeInterTreeAry[this._i].isActive() )
                {
                    this.active = true;
                    break;
                }
            }
        }
    }
    
    // 
    //  Get the menu in question
    //
    getMenu( name )
    {
        for( let groupMap of this.menuMapMap.values() )
        {
            this._menu = groupMap.get( name );
            if( this._menu !== undefined )
                return this._menu;
        }

        throw new Error( `Menu being asked for is missing (${name})!` );
    }
    
    // 
    //  Get the reference to the control in question
    //
    getMenuControl( name, controlName )
    {
        this._menu = this.getMenu( name );
        this._control = this._menu.getControl( controlName );
        
        if( this._control === null )
            throw new Error( `Menu control being asked for is missing (${name})!` );

        return this._control;
    }

    // 
    //  Get the pointer to the active control - can return null
    //
    getActiveControl( name )
    {
        this._menu = this.getMenu(name);
        return this._menu.GetActiveControl();
    }

    // 
    //  Get the first active menu
    //  NOTE: Only call this function if you are certain it will not fail
    //
    getActiveMenu()
    {
        this._menu = null;

        for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
        {
            if( this.activeMenuTreeAry[this._i].isActive() )
            {
                this._menu = this.activeMenuTreeAry[this._i].getActiveMenu();
                break;
            }
        }

        if( this._menu === null )
            throw new Error( 'There is no active menu!' );

        return this._menu;
    }
    
    // 
    //  Get a reference to the tree
    //
    getTree( treeStr )
    {
        for( this._groupMap of this.menuTreeMapMap.values() )
        {
            for( let [ key, tree ] of this._groupMap.entries() )
            {
                if( key === treeStr )
                    return tree;
            }
        }

        // If you got this far, it's a problem
        throw new Error( `Menu tree doesn't exist (${treeStr})!` );
    }
    
    // 
    //  Get a reference to the tree based on group
    //
    getTreeGroup( group, treeStr )
    {
        this._groupMap = this.menuTreeMapMap.get( group );
        if( this._groupMap !== undefined )
        {
            // Find the tree in the map
            this._tree = this._groupMap.get( treeStr );
            if( this._tree !== undefined )
                return this._tree;
            
            throw new Error( `Menu tree doesn't exist (${group} - ${treeStr})!` );
        }
        
        throw new Error( `Menu tree group doesn't exist (${group} - ${treeStr})!` );
    }

    // 
    //  Get a reference to the active tree
    //
    getActiveTree()
    {
        this._tree = null;

        for( this._i = 0; this._i < this.activeMenuTreeAry.length; ++this._i )
        {
            if( this.activeMenuTreeAry[this._i].isActive() )
            {
                this._tree = this.activeMenuTreeAry[this._i];
                break;
            }
        }

        return this._tree;
    }
    
    // 
    //  DESC: See if the tree is in the active list
    //
    isTreeInActivelist( treeStr )
    {
        for( this._groupMap of this.menuTreeMapMap.values() )
        {
            for( let [ key, tree ] of this._groupMap.entries() )
            {
                if( key === treeStr )
                {
                    if( tree.interfaceMenu )
                    {
                        this._index = this.activeInterTreeAry.indexOf( tree );
                        if( this._index > -1 )
                            return true;
                    }
                    else
                    {
                        this._index = this.activeMenuTreeAry.indexOf( tree );
                        if( this._index > -1 )
                            return true;
                    }
                }
            }
        }
        
        return false;
    }

    // 
    //  Reset the transform
    //
    resetTransform()
    {
        for( this._groupMap of this.menuMapMap.values() )
            for( this._menu of this._groupMap.values() )
                this._menu.forceTransform();
    }

    // 
    //  Reset the dynamic positions of menus
    //
    resetDynamicOffset()
    {
        for( this._groupMap of this.menuMapMap.values() )
            for( this._menu of this._groupMap.values() )
                this._menu.resetDynamicPos();
    }
    
    // 
    //  DESC: allow event handling access function
    //
    get allowEventHandling() { return this.allow; }
    set allowEventHandling( value ) { this.allow = value; }

}

export var menuManager = new MenuManager;
