// 
//  FILE NAME: menu.js
//  DESC:      Class for user interface menu
//

"use strict";
import { Object } from '../common/object';
import { DynamicOffset } from '../common/dynamicoffset';
import { ScrollParam } from './scrollparam';
import { settings } from '../utilities/settings';
import { Sprite } from '../sprite/sprite';
import { eventManager } from '../managers/eventmanager';
import { UIControlNavNode } from '../gui/uicontrolnavnode';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { GenericEvent } from '../common/genericevent';
import * as UIControlFactory from './uicontrolfactory';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

export class Menu extends Object
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
        this.controlMap = new Map;

        // Current active node
        this.activeNode = null;

        // menu state
        this.state = uiControlDefs.ECS_NULL;

        // Dynamic offset
        this.dynamicOffset = new DynamicOffset;

        // Scrolling parameters
        this.scrollParam = new ScrollParam;
        
        // menu alpha value
        this.alpha = 0;
        
        // The menu needs to default hidden
        this.setVisible(false);

        // The menu type
        this.type = menuDefs.EMT_NON_BLOCKING;
    }
    
    // 
    //  DESC: Load the menu info from file
    //
    loadFromNode( node )
    {
        // Get the type of object
        let attr = node.getAttribute( 'type' );
        if( attr )
        {
            if( attr === 'blocking' )
                this.type = menuDefs.EMT_BLOCKING;
        }

        // Init the script Ids
        this.initScriptIds( node );
        
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
    //  DESC: Init the script Ids and add them to the map
    //        This function loads the attribute info reguardless of what it is
    //
    initScriptIds( node )
    {
        // Check for scripting
        let scriptList = node.getElementsByTagName( 'scriptList' );
        if( scriptList.length )
            this.scriptComponent.initScriptIds( scriptList[0] );
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
        {
            this.setPos( this.dynamicOffset.getPos( settings.deviceRes_half ) );
        }
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
        for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
        {
            this.spriteAry[this._i].init();

            // Prepare any script functions that are flagged to prepareOnInit
            this.spriteAry[this._i].prepareScriptOnInit();
        }

        for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
            this.staticControlAry[this._i].init();

        for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
            this.mouseOnlyControlAry[this._i].init();

        for( this._i = 0; this._i < this.controlAry.length; ++this._i )
            this.controlAry[this._i].init();
        
        // Prepare any script functions that are flagged to prepareOnInit
        this.scriptComponent.prepareOnInit( this );
    }

    // 
    //  DESC: Init the menu controls
    //
    cleanUp()
    {
        for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
            this.spriteAry[this._i].cleanUp();

        for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
            this.staticControlAry[this._i].cleanUp();

        for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
            this.mouseOnlyControlAry[this._i].cleanUp();

        for( this._i = 0; this._i < this.controlAry.length; ++this._i )
            this.controlAry[this._i].cleanUp();
    }
    
    // 
    //  DESC: Activate this menu because it's probably a root menu
    //
    activateMenu()
    {
        this.state = menuDefs.EMS_IDLE;
        this.setVisible(true);
        this.setAlpha(1);
        this.activateFirstInactiveControl();
    }

    // 
    //  DESC: Reset the dynamic position
    //
    resetDynamicPos()
    {
        this.setDynamicPos();

        for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
            this.staticControlAry[this._i].setDynamicPos();
        
        for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
            this.mouseOnlyControlAry[this._i].setDynamicPos();

        for( this._i = 0; this._i < this.controlAry.length; ++this._i )
            this.controlAry[this._i].setDynamicPos();
    }

    // 
    //  DESC: Update the menu
    //
    update()
    {
        this.scriptComponent.update();

        if( this.isVisible() )
        {
            for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
                this.spriteAry[this._i].update();
            
            for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
                this.staticControlAry[this._i].update();
            
            for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
                this.mouseOnlyControlAry[this._i].update();
            
            for( this._i = 0; this._i < this.controlAry.length; ++this._i )
                this.controlAry[this._i].update();
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
            
            for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
                this.spriteAry[this._i].transform( this );
            
            for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
                this.staticControlAry[this._i].transform( this );
            
            for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
                this.mouseOnlyControlAry[this._i].transform( this );
            
            for( this._i = 0; this._i < this.controlAry.length; ++this._i )
                this.controlAry[this._i].transform( this );
        }
    }

    // 
    //  DESC: do the render
    //
    render( camera )
    {
        if( this.isVisible() )
        {
            for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
                this.spriteAry[this._i].render( camera );
            
            for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
                this.staticControlAry[this._i].render( camera );
            
            for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
                this.mouseOnlyControlAry[this._i].render( camera );
            
            for( this._i = 0; this._i < this.controlAry.length; ++this._i )
                this.controlAry[this._i].render( camera );
        }
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        // See if we need to reject any events based on the type of menu this is.
        if( this.type == menuDefs.EMT_BLOCKING && this.state == menuDefs.EMS_IDLE )
        {
            if( event.type === menuDefs.EME_MENU_ESCAPE_ACTION || 
                event.type === menuDefs.EME_MENU_TOGGLE_ACTION || 
                event.type === menuDefs.EME_MENU_BACK_ACTION )
            {
                return false;
            }
        }

        // Have the controls handle events
        for( this._i = 0; this._i < this.controlAry.length; ++this._i )
            this.controlAry[this._i].handleEvent( event );

        for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
            this.mouseOnlyControlAry[this._i].handleEvent( event );

        if( event instanceof GenericEvent )
        {
            if( event.type === menuDefs.EME_MENU_TRANS_IN )
            {
                this.onTransIn( event );
            }
            else if( event.type === menuDefs.EME_MENU_TRANS_OUT )
            {
                this.onTransOut( event );
            }
            else if( event.type === menuDefs.EME_MENU_REACTIVATE )
            {
                this.onReactivate( event );
            }
            else if( this.state === menuDefs.EMS_IDLE )
            {
                if( event.type === menuDefs.EME_MENU_SELECT_ACTION )
                {
                    this.onSelectAction( event );
                }
                else if( event.type === menuDefs.EME_MENU_SET_ACTIVE_CONTROL )
                {
                    this.onSetActiveControl( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_UP )
                {
                    this.onUpAction( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_DOWN )
                {
                    this.onDownAction( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_LEFT )
                {
                    this.onLeftAction( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_RIGHT )
                {
                    this.onRightAction( event );
                }
                else if( (event.type >= menuDefs.EME_MENU_UP_ACTION) &&
                         (event.type <= menuDefs.EME_MENU_RIGHT_ACTION) )
                {
                    if( event.arg[0] === defs.EAP_DOWN )
                    {
                        if( event.type === menuDefs.EME_MENU_UP_ACTION )
                        {
                            this.onUpAction( event );
                        }
                        else if( event.type === menuDefs.EME_MENU_DOWN_ACTION )
                        {
                            this.onDownAction( event );
                        }
                        if( event.type === menuDefs.EME_MENU_LEFT_ACTION )
                        {
                            this.onLeftAction( event );
                        }
                        else if( event.type === menuDefs.EME_MENU_RIGHT_ACTION )
                        {
                            this.onRightAction( event );
                        }
                    }
                }
            }
        }
        else if( this.state === menuDefs.EMS_IDLE )
        {
            if( event.type === 'mousemove' )
            {
                this.onMouseMove( event );
            }
            else if( event.type === 'wheel' )
            {
                this.onWheel( event );
            }
        }

        return true;
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_UP );
    }

    // 
    //  DESC: Handle OnMenuDown message
    //
    onDownAction( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_DOWN );
    }

    // 
    //  DESC: Handle OnMenuLeft message
    //
    onLeftAction( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_LEFT );
    }

    // 
    //  DESC: Handle OnRightAction message
    //
    onRightAction( /*event*/ )
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
                        menuDefs.EME_MENU_CONTROL_STATE_CHANGE,
                        uiControlDefs.ECS_ACTIVE,
                        navNode.uiControl );

                    break;
                }
            }
            while( navNode );
        }
    }

    // 
    //  DESC: Handle OnMouseMove message
    //
    onMouseMove( event )
    {
        for( this._each of this.controlNodeAry )
        {
            if( this._each.uiControl.onMouseMove( event ) )
                this.activeNode = this._each;
            else
                this._each.uiControl.deactivateControl();
        }

        for( this._each of this.mouseOnlyControlAry )
            if( !this._each.onMouseMove( event ) )
                this._each.deactivateControl();
    }

    // 
    //  DESC: Handle OnWheel message
    //
    onWheel( event )
    {
        for( this._each of this.mouseOnlyControlAry )
            this._each.onWheel( event );

        for( this._each of this.controlAry )
            this._each.onWheel( event );
    }

    // 
    //  DESC: Handle OnSelectAction message
    //
    onSelectAction( event )
    {
        this._selectionFound = false;

        if( (this.activeNode !== null) &&
            (this.activeNode.uiControl.handleSelectAction( event )) )
        {
            this._selectionFound = true;

            // Set the state to active which will block all messages until the state is reset to idle
            this._ctrl = this.activeNode.uiControl.getActiveControl();
            if( this._ctrl && this._ctrl.actionType > uiControlDefs.ECAT_IDLE )
                this.state = menuDefs.EMS_ACTIVE;
        }
        else if( event.arg[ defs.ESMA_DEVICE_TYPE ] === defs.MOUSE )
        {
            // For mouse only controls
            for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
            {
                if( this.mouseOnlyControlAry[this._i].handleSelectAction( event ) )
                {
                    this._selectionFound = true;

                    // Set the state to active which will block all messages until the state is reset to idle
                    if( this.mouseOnlyControlAry[this._i].actionType > uiControlDefs.ECAT_IDLE )
                        this.state = menuDefs.EMS_ACTIVE;

                    break;
                }
            }
        }

        // Try to handle touch presses on a non-active control
        // The mouse just happends to be clicked over a non-active control
        if( !this._selectionFound && event.arg[ defs.ESMA_DEVICE_TYPE ] === defs.MOUSE )
        {
            // Deactivate the control that should be active
            if( (this.activeNode !== null) &&
                (event.arg[ defs.ESMA_PRESS_TYPE ] === this.activeNode.uiControl.mouseSelectType) )
            {
                this.activeNode.uiControl.deactivateControl();

                // Go through all the controls on this menu to try to find the one clicked on
                for( this._i = 0; this._i < this.controlAry.length; ++this._i )
                {
                    if( this.controlAry[this._i].handleSelectAction( event ) )
                    {
                        // Set the state to active which will block all messages until the state is reset to idle
                        this._ctrl = this.activeNode.uiControl.getActiveControl();
                        if( this._ctrl && this._ctrl.actionType > uiControlDefs.ECAT_IDLE )
                            this.state = menuDefs.EMS_ACTIVE;

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
        if( event.arg[0] === menuDefs.EAC_FIRST_ACTIVE_CONTROL )
            this.activateFirstInactiveControl();
    }

    // 
    //  DESC: Handle OnReactivate message
    //
    onReactivate( /*event*/ )
    {
        this.state = menuDefs.EMS_IDLE;
    }

    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.arg[0] === menuDefs.ETC_BEGIN )
        {
            this.scriptComponent.prepare( 'transIn', this );

            this.state = menuDefs.EMS_ACTIVE;
        }
        else if( event.arg[0] === menuDefs.ETC_END )
        {
            this.state = menuDefs.EMS_IDLE;
        }
    }

    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.arg[0] === menuDefs.ETC_BEGIN )
        {
            this.scriptComponent.prepare( 'transOut', this );

            this.state = menuDefs.EMS_ACTIVE;
        }
        else if( event.arg[0] === menuDefs.ETC_END )
        {
            this.state = menuDefs.EMS_INACTIVE;
        }
    }

    // 
    //  DESC: Set the first inactive control to be active
    //
    activateFirstInactiveControl()
    {
        this._found = false;

        // Activate the first control found and deactivate all the rest
        for( this._i = 0; this._i < this.controlNodeAry.length; ++this._i )
        {
            if( !this._found && this.controlNodeAry[this._i].uiControl.activateFirstInactiveControl() )
            {
                this.activeNode = this.controlNodeAry[this._i];

                this._found = true;
            }
            else
            {
                this.controlNodeAry[this._i].uiControl.deactivateControl();
            }
        }
    }

    // 
    //  DESC: Reset all controls
    //
    reset()
    {
        for( this._i = 0; this._i < this.controlAry.length; ++this._i )
            this.controlAry[this._i].reset( true );

        for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
            this.mouseOnlyControlAry[this._i].reset( true );
    }

    // 
    //  DESC: Get the control in question
    //
    getControl( name )
    {
        // See if the control can be found
        this._control = this.controlMap.get( name );

        // Make sure control is available
        if( this._control === undefined )
            throw new Error( `Control being asked for is missing! (${name}).` );

        // Pass back the control if found
        return this._control;
    }

    // 
    //  DESC: Get the pointer to the active control
    //
    getActiveControl()
    {
        this._result = null;

        for( this._i = 0; this._i < this.controlAry.length; ++this._i )
        {
            if( this.controlAry[this._i].state > uiControlDefs.ECS_INACTIVE )
            {
                this._result = this.controlAry[this._i].getActiveControl();
                break;
            }
        }

        return this._result;
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
    //  DESC: Set the alpha value of this menu
    //
    setAlpha( alpha )
    {
        if( this.isVisible() )
        {
            for( this._i = 0; this._i < this.spriteAry.length; ++this._i )
                this.spriteAry[this._i].setAlpha( alpha );

            for( this._i = 0; this._i < this.staticControlAry.length; ++this._i )
                this.staticControlAry[this._i].setAlpha( alpha );

            for( this._i = 0; this._i < this.mouseOnlyControlAry.length; ++this._i )
                this.mouseOnlyControlAry[this._i].setAlpha( alpha );

            for( this._i = 0; this._i < this.controlAry.length; ++this._i )
                this.controlAry[this._i].setAlpha( alpha );
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
        return (this.state === menuDefs.EMS_IDLE);
    }

    // 
    //  DESC: Get the number of controls in this subcontrol
    //
    get length()
    {
        return this.subControlAry.length;
    }
}
