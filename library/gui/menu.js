// 
//  FILE NAME: menu.js
//  DESC:      Class for user interface menu
//

"use strict";
import { Object2D } from '../2d/object2d';
import { DynamicOffset } from '../common/dynamicoffset';
import { ScrollParam } from './scrollparam';
import { settings } from '../utilities/settings';
import { Sprite } from '../sprite/sprite';
import { eventManager } from '../managers/eventmanager';
import { UIControlNavNode } from '../gui/uicontrolnavnode';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { ScriptComponent } from '../script/scriptcomponent';
import { scriptManager } from '../script/scriptmanager';
import * as UIControlFactory from './uicontrolfactory';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as defs from '../common/defs';

export class Menu extends Object2D
{
    constructor( name, group, filePath )
    {
        super();
        
        // This menu's name
        this.name = name;
        
        // Group name
        this.group = group;
        
        // File path
        this.filePath = filePath;
        
        // Array of menu static sprites
        this.spriteAry = [];

        // Array list of static controls
        this.staticControlAry = [];

        // Array list of mouse only controls
        this.mouseOnlyControlAry = [];

        // Array list of controls
        this.controlAry = [];

        // Array list of navigation nodes
        this.controlNodeAry = [];

        // Map container of controls for easy name access
        // NOTE: This container does not own it's pointers.
        this.controlMap = new Map;

        // Current active node
        this.activeNode = null;

        // menu state
        this.state = defs.ECS_NULL;

        // Dynamic offset
        this.dynamicOffset = new DynamicOffset;

        // Scrolling parameters
        this.scrollParam = new ScrollParam;

        // Base smart Gui control scoped pointer
        this.smartGui = null;
        
        // menu alpha value
        this.alpha = 0;

        // The script conponent
        this.scriptComponent = new ScriptComponent;
        
        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = new Map;
        
        // The menu needs to default hidden
        this.setVisible(false);
    }
    
    // 
    //  DESC: Load the menu info from file
    //
    loadFromNode( node )
    {
        // Init the script factory functions
        this.initScriptFactoryFunctions( node );
        
        // Load the scroll data from node
        this.scrollParam.loadFromNode( node.getElementsByTagName( 'scroll' ) );

        // Get the static sprite
        let nodeLst = node.getElementsByTagName( 'spriteList' );
        if( nodeLst.length )
        {
            let spriteNode = nodeLst[0].children;
            
            for( let i = 0; i < spriteNode.length; ++i )
                this.loadStaticSpriteFromNode( spriteNode[i] );
        }

        // Get the static menu controls node
        nodeLst = node.getElementsByTagName( 'staticMenuControls' );
        if( nodeLst.length )
        {
            let controlNode = nodeLst[0].children;
            
            for( let i = 0; i < controlNode.length; ++i )
                this.loadStaticControlFromNode( controlNode[i] );
        }

        // Get the mouse only menu controls node
        nodeLst = node.getElementsByTagName( 'mouseOnlyControls' );
        if( nodeLst.length )
        {
            let controlNode = nodeLst[0].children;
            
            for( let i = 0; i < controlNode.length; ++i )
                this.loadMouseOnlyControlFromNode( controlNode[i] );
        }

        // Get the menu controls
        nodeLst = node.getElementsByTagName( 'menuControls' );
        if( nodeLst.length )
        {
            let controlNode = nodeLst[0].children;
            
            // map to help setup the node pointers
            let navNodeMap = new Map;

            // Load the controls
            for( let i = 0; i < controlNode.length; ++i )
                this.loadControlFromNode( controlNode[i], navNodeMap );

            // Map the controls to their respective nodes
            for( let i = 0; i < controlNode.length; ++i )
                this.findNodes( controlNode[i], i, navNodeMap );
        }
    }
    
    // 
    //  DESC: Init the script factory functions and add them to the map
    //        This function loads the attribute info reguardless of what it is
    //
    initScriptFactoryFunctions( node )
    {
        // Check for scripting
        let scriptLst = node.getElementsByTagName( 'scriptLst' );
        if( scriptLst.length )
        {
            let scriptNode = scriptLst[0].children;
            
            for( let i = 0; i < scriptNode.length; ++i )
            {
                let attr = scriptNode[i].attributes[0];
                
                if( attr )
                    // This allocates the script to the map
                    this.scriptFactoryMap.set( attr.name, scriptManager.get(attr.value)(this) );
            }
        }
    }
    
    // 
    //  DESC: Load a static sprite from an XML node
    //
    loadStaticSpriteFromNode( node )
    {
        // Get the type of object
        let objectName = node.getAttribute( 'objectName' );

        // Allocate the static sprite and add it to the array
        let sprite = new Sprite( objectDataManager.getData( this.group, objectName ) );
        this.spriteAry.push( sprite );

        // Load the transform data
        sprite.load( node );

        // Init the script factory functions
        sprite.initScriptFactoryFunctions( node );
    }

    // 
    //  DESC: Load static controls from an XML node
    //
    loadStaticControlFromNode( node )
    {
        // New up the control with its respected control type
        let control = UIControlFactory.create( node, this.group );
        this.staticControlAry.push( control );

        // Does this control have a name then add it to the map
        if( control.name )
            this.controlMap.set( control.name, control );
    }

    // 
    //  DESC: Load mouse only controls from an XML node
    //
    loadMouseOnlyControlFromNode( node )
    {
        // New up the control with its respected control type
        let control = UIControlFactory.create( node, this.group );
        this.mouseOnlyControlAry.push( control );

        // Does this control have a name then add it to the map
        if( control.name )
            this.controlMap.set( control.name, control );
    }

    // 
    //  DESC: Load a control from an XML node
    //
    loadControlFromNode( node, navNodeMap )
    {
        // New up the control with its respected control type
        let control = UIControlFactory.create( node, this.group );
        this.controlAry.push( control );

        // Does this control have a name then add it to the map
        if( control.name )
        {
            // Check for duplicate names
            if( this.controlMap.has( control.name ) )
                throw new Error( `Duplicate control name! (${control.name})` );
            
            // Map of menu controls
            this.controlMap.set( control.name, control );

            // Add a node to the array with it's control
            let navNode = new UIControlNavNode( control );
            this.controlNodeAry.push( navNode );

            // Map of menu control nodes
            navNodeMap.set( control.name, navNode );
        }
    }
    
    // 
    //  DESC: Load the dynamic offset data from node
    //
    loadDynamicOffsetFromNode( node )
    {
        // Load the dynamic offset
        this.dynamicOffset = parseHelper.loadDynamicOffset( node );

        // Set the dynamic position
        this.setDynamicPos();
    }

    // 
    //  DESC: Set the dynamic position
    //
    setDynamicPos()
    {
        // Position the menu based on the dynamic offset
        if( this.dynamicOffset )
            this.setPos( this.dynamicOffset.getPos( settings.defaultSize_half ) );
    } 

    // 
    //  DESC: Reset the dynamic position
    //
    resetDynamicPos()
    {
        this.setDynamicPos();

        for( let i = 0; i < this.staticControlAry.length; ++i )
            this.staticControlAry[i].setDynamicPos();
        
        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].setDynamicPos();

        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].setDynamicPos();
    }

    // 
    //  DESC: Find the reference nodes
    //
    findNodes( node, nodeIndex, navNodeMap )
    {
        let navNode = node.getElementsByTagName( 'navigate' );
        if( navNode.length )
        {
            this.setNodes( navNode, nodeIndex, 'up',    defs.ENAV_NODE_UP,    navNodeMap );
            this.setNodes( navNode, nodeIndex, 'down',  defs.ENAV_NODE_DOWN,  navNodeMap );
            this.setNodes( navNode, nodeIndex, 'left',  defs.ENAV_NODE_LEFT,  navNodeMap );
            this.setNodes( navNode, nodeIndex, 'right', defs.ENAV_NODE_RIGHT, navNodeMap );
        }
    }

    // 
    //  DESC: Find the reference nodes
    //
    setNodes( node, nodeIndex, attrStr, navId, navNodeMap )
    {
        let attr = node[0].getAttribute( attrStr );
        if( attr )
        {
            let ctrlNode = navNodeMap.get( attr );
            if( ctrlNode !== undefined )
                this.controlNodeAry[nodeIndex].setNode( navId, ctrlNode );
            else
                throw new Error( `Control node doesn't exist! (${attr}, ${attrStr})` );
        }
    }
    
    // 
    //  DESC: Init the menu controls
    //
    init()
    {
        for( let i = 0; i < this.staticControlAry.length; ++i )
            this.staticControlAry[i].init();

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].init();

        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].init();

    }   // Init

    // 
    //  DESC: Init the menu controls
    //
    cleanUp()
    {
        for( let i = 0; i < this.staticControlAry.length; ++i )
            this.staticControlAry[i].cleanUp();

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].cleanUp();

        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].cleanUp();

    }   // CleanUp
    
    // 
    //  DESC: Activate this menu because it's probably a root menu
    //
    activateMenu()
    {
        this.state = defs.EMS_IDLE;
        this.setVisible(true);
        this.setAlpha(1);
        this.activateFirstInactiveControl();
    }

    // 
    //  DESC: Update the menu
    //
    update()
    {
        this.scriptComponent.update();

        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].update();
            
            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].update();
            
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].update();
            
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].update();
        }
    }

    // 
    //  DESC: Transform the menu
    //
    transform()
    {
        if( this.isVisible() )
        {
            super.transform();
            
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].object.transform( this );
            
            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].transform( this );
            
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].transform( this );
            
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].transform( this );
        }
    }

    // 
    //  DESC: do the render
    //
    render( camera )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].render( camera );
            
            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].render( camera );
            
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].render( camera );
            
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].render( camera );
        }
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        if( event instanceof CustomEvent )
        {
            // Have the controls handle events
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].handleEvent( event );

            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                    this.mouseOnlyControlAry[i].handleEvent( event );
            
            if( event.detail.type === defs.EGE_MENU_TRANS_IN )
            {
                this.onTransIn( event );
            }
            else if( event.detail.type === defs.EGE_MENU_TRANS_OUT )
            {
                this.onTransOut( event );
            }
            else if( event.detail.type === defs.EGE_MENU_REACTIVATE )
            {
                this.onReactivate( event );
            }
            else if( this.state === defs.EMS_IDLE )
            {
                if( event.detail.type === defs.EGE_MENU_SELECT_ACTION )
                {
                    this.onSelectAction( event );
                }
                else if( event.detail.type === defs.EGE_MENU_SET_ACTIVE_CONTROL )
                {
                    this.onSetActiveControl( event );
                }
                else if( event.detail.type === defs.EGE_MENU_SCROLL_UP )
                {
                    this.onUpAction( event );
                }
                else if( event.detail.type === defs.EGE_MENU_SCROLL_DOWN )
                {
                    this.onDownAction( event );
                }
                else if( event.detail.type === defs.EGE_MENU_SCROLL_LEFT )
                {
                    this.onLeftAction( event );
                }
                else if( event.detail.type === defs.EGE_MENU_SCROLL_RIGHT )
                {
                    this.onRightAction( event );
                }
                else if( (event.detail.type >= defs.EGE_MENU_UP_ACTION) &&
                         (event.detail.type <= defs.EGE_MENU_RIGHT_ACTION) )
                {
                    if( event.detail.arg[0] === defs.EAP_DOWN )
                    {
                        if( event.detail.type === defs.EGE_MENU_UP_ACTION )
                        {
                            this.onUpAction( event );
                        }
                        else if( event.detail.type === defs.EGE_MENU_DOWN_ACTION )
                        {
                            this.onDownAction( event );
                        }
                        if( event.detail.type === defs.EGE_MENU_LEFT_ACTION )
                        {
                            this.onLeftAction( event );
                        }
                        else if( event.detail.type === defs.EGE_MENU_RIGHT_ACTION )
                        {
                            this.onRightAction( event );
                        }
                    }
                }
            }
        }
        else if( this.state === defs.EMS_IDLE )
        {
            if( event.type === 'mousemove' )
            {
                this.onMouseMove( event );
            }
        }

        // Handle any smart menu events
        this.smartHandleEvent( event );
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( event )
    {
        this.navigateMenu( defs.ENAV_NODE_UP );
    }

    // 
    //  DESC: Handle OnMenuDown message
    //
    onDownAction( event )
    {
        this.navigateMenu( defs.ENAV_NODE_DOWN );
    }

    // 
    //  DESC: Handle OnMenuLeft message
    //
    onLeftAction( event )
    {
        this.navigateMenu( defs.ENAV_NODE_LEFT );
    }

    // 
    //  DESC: Handle OnRightAction message
    //
    onRightAction( event )
    {
        this.navigateMenu( defs.ENAV_NODE_RIGHT );
    }

    // 
    //  DESC: Navigate the menu. Find the next control node that isn't
    //        disabled and make it the active control node
    //
    navigateMenu( navNodeAction )
    {
        if( this.activeNode !== null )
        {
            let navNode = this.activeNode;

            do
            {
                navNode = navNode.getNode( navNodeAction );
                
                if( navNode === null )
                {
                    break;
                }
                else if( !navNode.uiControl.isDisabled() )
                {
                    this.activeNode = navNode;

                    eventManager.dispatchEvent(
                        defs.EGE_MENU_CONTROL_STATE_CHANGE,
                        defs.ECS_ACTIVE,
                        navNode.uiControl );

                    break;
                }
            }
            while( true );
        }
    }

    // 
    //  DESC: Handle OnMouseMove message
    //
    onMouseMove( event )
    {
        for( let i = 0; i < this.controlNodeAry.length; ++i )
        {
            if( this.controlNodeAry[i].uiControl.onMouseMove( event ) )
                this.activeNode = this.controlNodeAry[i];
            else
                this.controlNodeAry[i].uiControl.deactivateControl();
        }

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            if( !this.mouseOnlyControlAry[i].onMouseMove( event ) )
                this.mouseOnlyControlAry[i].deactivateControl();
    }

    // 
    //  DESC: Handle OnSelectAction message
    //
    onSelectAction( event )
    {
        let selectionFound = false;

        if( (this.activeNode !== null) &&
            (this.activeNode.uiControl.handleSelectAction( event )) )
        {
            selectionFound = true;

            // Set the state to active which will block all messages until the state is reset to idle
            if( this.activeNode.uiControl.actionType > defs.ECAT_NULL )
                this.state = defs.EMS_ACTIVE;
        }
        else if( event.detail.arg[ defs.ESMA_DEVICE_TYPE ] === defs.MOUSE )
        {
            // For mouse only controls
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            {
                if( this.mouseOnlyControlAry[i].handleSelectAction( event ) )
                {
                    selectionFound = true;

                    // Set the state to active which will block all messages until the state is reset to idle
                    if( this.mouseOnlyControlAry[i].actionType > defs.ECAT_NULL )
                        this.state = defs.EMS_ACTIVE;

                    break;
                }
            }
        }

        // Try to handle touch presses on a non-active control
        // The mouse just happends to be clicked over a non-active control
        if( !selectionFound && event.detail.arg[ defs.ESMA_DEVICE_TYPE ] === defs.MOUSE )
        {
            // Deactivate the control that should be active
            if( (this.activeNode !== null) &&
                (event.detail.arg[ defs.ESMA_PRESS_TYPE ] === this.activeNode.uiControl.mouseSelectType) )
            {
                this.activeNode.uiControl.deactivateControl();

                // Go through all the controls on this menu to try to find the one clicked on
                for( let i = 0; i < this.controlAry.length; ++i )
                {
                    if( this.controlAry[i].handleSelectAction( event ) )
                    {
                        // Set the state to active which will block all messages until the state is reset to idle
                        if( this.activeNode.uiControl.actionType > defs.ECAT_NULL )
                            this.state = defs.EMS_ACTIVE;

                        break;
                    }
                }
            }
        }
    }

    // 
    //  DESC: Handle OnSetActiveControl message
    //
    onSetActiveControl( event )
    {
        // Set the first inactive control to active
        if( event.detail.arg[0] === defs.EAC_FIRST_ACTIVE_CONTROL )
            this.activateFirstInactiveControl();
    }

    // 
    //  DESC: Handle OnReactivate message
    //
    onReactivate( event )
    {
        this.state = defs.EMS_IDLE;
    }

    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === defs.ETC_BEGIN )
        {
            this.prepare( 'transIn' );

            this.state = defs.EMS_ACTIVE;
        }
        else if( event.detail.arg[0] === defs.ETC_END )
        {
            this.state = defs.EMS_IDLE;
        }
    }

    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === defs.ETC_BEGIN )
        {
            this.prepare( 'transOut' );

            this.state = defs.EMS_ACTIVE;
        }
        else if( event.detail.arg[0] === defs.ETC_END )
        {
            this.state = defs.EMS_INACTIVE;
        }
    }

    // 
    //  DESC: Prepare the script function to run
    //
    prepare( scriptFactoryId )
    {
        let script = this.scriptFactoryMap.get( scriptFactoryId );
        if( script )
        {
            script.init();
            this.scriptComponent.set( script );
        }
    }

    // 
    //  DESC: Set the first inactive control to be active
    //
    activateFirstInactiveControl()
    {
        let found = false;

        // Activate the first control found and deactivate all the rest
        for( let i = 0; i < this.controlNodeAry.length; ++i )
        {
            if( !found && this.controlNodeAry[i].uiControl.activateFirstInactiveControl() )
            {
                this.activeNode = this.controlNodeAry[i];

                found = true;
            }
            else
            {
                this.controlNodeAry[i].uiControl.deactivateControl();
            }
        }
    }

    // 
    //  DESC: Reset all controls
    //
    reset()
    {
        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].reset( true );

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].reset( true );
    }

    // 
    //  DESC: Get the control in question
    //
    getControl( name )
    {
        // See if the control can be found
        let control = this.controlMap.get( name );

        // Make sure control is available
        if( control === undefined )
            throw new Error( `Control being asked for is missing! (${name}).` );

        // Pass back the control if found
        return control;
    }

    // 
    //  DESC: Get the pointer to the active control
    //
    getActiveControl()
    {
        let result = null;

        for( let i = 0; i < this.controlAry.length; ++i )
        {
            if( this.controlAry[i].state > defs.ECS_INACTIVE )
            {
                result = this.controlAry[i].getActiveControl();
                break;
            }
        }

        return result;
    }

    // 
    //  DESC: Does this menu use dynamic offsets
    //
    isDynamicOffset()
    {
        return !this.dynamicOffset.isEmpty();
    }

    // 
    //  DESC: Get the scroll params
    //
    getScrollParam( msg )
    {
        if( (this.activeNode != null) &&
            this.activeNode.uiControl.canScroll(msg) )
        {
            return this.activeNode.uiControl.scrollParam;
        }

        return this.scrollParam;
    }
    
    // 
    //  DESC: Do any smart create
    //
    smartCreate()
    {
        if( this.smartGui )
            this.smartGui.create();
    }

    // 
    //  DESC: Do any smart event handling
    //
    smartHandleEvent( event )
    {
        if( this.smartGui )
            this.smartGui.handleEvent( event );
    }

    // 
    //  DESC: Set the alpha value of this menu
    //
    setAlpha( alpha )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].setAlpha( alpha );

            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].setAlpha( alpha );

            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].setAlpha( alpha );

            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].setAlpha( alpha );
        }

        this.alpha = alpha;
    }
    
    // 
    //  DESC: Get the alpha value of this menu
    //
    getAlpha()
    {
        return this.alpha;
    }

    // 
    //  DESC: Is the menu idle
    //
    isIdle()
    {
        return (this.state === defs.EMS_IDLE);
    }
}
