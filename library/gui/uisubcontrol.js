
// 
//  FILE NAME: uisubcontrol.js
//  DESC:      Class for user interface controls with sub-controls
//

"use strict";
import { UIControl } from './uicontrol';
import { UIControlNavNode } from '../gui/uicontrolnavnode';
import { eventManager } from '../managers/eventmanager';
import { GenericEvent } from '../common/genericevent';
import * as UIControlFactory from './uicontrolfactory';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

export class UISubControl extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_SUB_CONTROL;
        
        // Arry of sub-controls
        this.subControlAry = [];

        // Array list of navigation nodes
        this.controlNodeAry = [];

        // Current active node
        // NOTE: This variable does not own it's pointers.
        this.activeNode = null;

        // A sub control is a container for other controls so normally
        // it doesn't respont to select messages. There can be a case
        // where this control needs to respond.
        this.respondsToSelectMsg = false;
    }
    
    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Have the parent load it's stuff
        super.loadControlFromNode( node );

        // Get the sub-control settings
        let subControlSettingsNode = node.getElementsByTagName( 'subControlSettings' );
        if( subControlSettingsNode.length )
        {
            // Does this sub control respond to select? The default is false.
            let attr = subControlSettingsNode[0].getAttribute( 'respondsToSelectMsg' );
            if( attr === 'true' )
                this.respondsToSelectMsg = true;
        }

        // Get the menu controls node
        let controlListNode = node.getElementsByTagName( 'subControlList' );
        if( controlListNode.length )
        {
            // map to help setup the node pointers
            let navNodeMap = new Map;
            
            let controlNode = controlListNode[0].getElementsByTagName( 'control' );

            for( let i = 0; i < controlNode.length; ++i )
            {
                // The reference is placed within an array for all controls
                let control = UIControlFactory.create( controlNode[i], this.group );
                
                this.subControlAry.push( control );

                // Does this control have a name then create a node and add it to the map
                if( control.name )
                {
                    // Add a node to the vector with it's control
                    let navNode = new UIControlNavNode( control );
                    this.controlNodeAry.push( navNode );

                    // Map of menu control nodes
                    navNodeMap.set( control.name, navNode );
                }
            }

            // Find the reference nodes
            if( navNodeMap.size > 0 )
            {
                for( let i = 0; i < controlNode.length; ++i )
                    this.findNodes( controlNode[i], i, navNodeMap );
            }
        }
    }

    // 
    //  DESC: Init the control
    //
    init()
    {
        super.init();

        // Init all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].init();
    }

    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        super.cleanUp();

        // Init all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].cleanUp();
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
                throw new Error( `Control node doesn't exist! (${name})` );
        }
    }

    // 
    //  DESC: Update the control
    //
    update()
    {
        // Call the parent
        super.update();

        // Update all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].update();
    }

    // 
    //  DESC: Transform the control
    //
    transform( object )
    {
        // Call the parent
        super.transform( object );

        // Update all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].transform( this );
    }

    // 
    //  DESC: Render the sub control
    //
    render( camera )
    {
        // Call the parent
        super.render( camera );

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].render( camera );
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        // Call the parent
        super.handleEvent( event );

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].handleEvent( event );

        if( this.isActive() && (event instanceof GenericEvent) )
        {
            if( (event.type >= menuDefs.EGE_MENU_UP_ACTION) &&
                (event.type <= menuDefs.EGE_MENU_RIGHT_ACTION) )
            {
                if( event.type === menuDefs.EGE_MENU_UP_ACTION )
                {
                    this.onUpAction( event );
                }
                else if( event.type === menuDefs.EGE_MENU_DOWN_ACTION )
                {
                    this.onDownAction( event );
                }
                if( event.type === menuDefs.EGE_MENU_LEFT_ACTION )
                {
                    this.onLeftAction( event );
                }
                else if( event.type === menuDefs.EGE_MENU_RIGHT_ACTION )
                {
                    this.onRightAction( event );
                }
            }
            else if( (event.type >= menuDefs.EGE_MENU_SCROLL_UP) &&
                     (event.type <= menuDefs.EGE_MENU_SCROLL_RIGHT) )
            {
                if( event.type === menuDefs.EGE_MENU_SCROLL_UP )
                {
                    this.onUpScroll( event );
                }
                else if( event.type === menuDefs.EGE_MENU_SCROLL_DOWN )
                {
                    this.onDownScroll( event );
                }
                else if( event.type === menuDefs.EGE_MENU_SCROLL_LEFT )
                {
                    this.onLeftScroll( event );
                }
                else if( event.type === menuDefs.EGE_MENU_SCROLL_RIGHT )
                {
                    this.onRightScroll( event );
                }
            }
            else if( event.type === menuDefs.EGE_MENU_TAB_LEFT )
            {
                this.onTabLeft( event );
            }
            else if( event.type === menuDefs.EGE_MENU_TAB_RIGHT )
            {
                this.onTabRight( event );
            }
        }
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
    //  DESC: Handle OnUpScroll message
    //
    onUpScroll( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_UP );
    }

    // 
    //  DESC: Handle OnUpScroll message
    //
    onDownScroll( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_DOWN );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onLeftScroll( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_LEFT );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onRightScroll( /*event*/ )
    {
        this.navigateMenu( defs.ENAV_NODE_RIGHT );
    }

    // 
    //  DESC: Handle OnTabLeft message
    //
    onTabLeft( /*event*/ )
    {
        // Do nothing
    }

    // 
    //  DESC: Handle OnTabRight message
    //
    onTabRight( /*event*/ )
    {
        // Do nothing
    }

    // 
    //  DESC: Navigate the menu. Find the next control node that isn't
    //        disabled and make it the active control node
    //
    navigateMenu( /*navNode*/ )
    {
        if( this.activeNode !== null )
        {
            let navNode = this.activeNode;

            do
            {
                navNode = navNode.getNode( navNode );
                
                if( navNode === null )
                {
                    break;
                }
                else if( !navNode.uiControl.isDisabled() )
                {
                    this.activeNode = navNode;

                    eventManager.dispatchEvent(
                        menuDefs.EGE_MENU_CONTROL_STATE_CHANGE,
                        uiControlDefs.ECS_ACTIVE,
                        navNode.uiControl );

                    break;
                }
            }
            while( navNode );
        }
    }

    // 
    //  DESC: Handle OnStateChange message
    //
    onStateChange( event )
    {
        if( this.respondsToSelectMsg )
        {
            super.onStateChange( event );
        }
        else
        {
            let state = event.arg[defs.EMSC_STATE];

            let ctrl = this.findSubControlByRef( event.arg[defs.EMSC_CONTROL] );

            // Restart the active state of the sub control if something
            // changed in the child controls or their children controls
            if( (state === uiControlDefs.ECS_ACTIVE) && (ctrl !== null) )
            {
                if( ctrl.state != state )
                {
                    this.setState(state, true);

                    this.resetSpriteScript();

                    this.setDisplayState();
                }
            }
            // The sub control doesn't respond to selected message
            else if( state < uiControlDefs.ECS_SELECT )
                super.onStateChange( event );
        }
    }

    // 
    //  DESC: Reset and recycle the contexts
    //
    reset( complete )
    {
        super.reset( complete );
        
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].reset( complete );
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        let result = super.onMouseMove( event );

        let found = this.onSubControlMouseMove( event );

        // If the sub control is not found, deactivate them
        if( result && !found )
            this.deactivateSubControl();

        return result || found;
    }

    // 
    //  DESC: Handle the sub control mouse move
    //
    onSubControlMouseMove( event )
    {
        let result = false;

        for( let i = 0; i < this.subControlAry.length && !result; ++i )
            result = this.subControlAry[i].onMouseMove( event );

        return result;
    }

    // 
    //  DESC: Handle the select action
    //
    handleSelectAction( event )
    {
        if( this.respondsToSelectMsg )
        {
            return super.handleSelectAction( event );
        }
        else
        {
            for( let i = 0; i < this.subControlAry.length; ++i )
                if( this.subControlAry[i].handleSelectAction( event ) )
                    return true;
        }

        return false;
    }

    // 
    //  DESC: Get the reference to the control if found
    //
    findControlByName( name )
    {
        let ctrl = super.findControlByName( name );

        if( ctrl === null )
            ctrl = this.findSubControlByName( name );

        return ctrl;
    }

    findControlByRef( control )
    {
        let ctrl = super.findControlByRef( control );

        if( ctrl === null )
            ctrl = this.findSubControlByRef( control );

        return ctrl;
    }

    // 
    //  DESC: Get the pointer to the subcontrol if found
    //
    findSubControlByName( name )
    {
        let ctrl = null;

        for( let i = 0; i < this.subControlAry.length && !ctrl; ++i )
            ctrl = this.subControlAry[i].findControlByName( name );

        return ctrl;
    }

    findSubControlByRef( control )
    {
        let ctrl = null;

        for( let i = 0; i < this.subControlAry.length && !ctrl; ++i )
            ctrl = this.subControlAry[i].findControlByRef( control );

        return ctrl;
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: This is mainly here to be virtual for sub controls
    //
    activateFirstInactiveControl()
    {
        if( super.activateFirstInactiveControl() )
        {
            let found = false;

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

            return true;
        }

        return false;
    }
    
    baseActivateFirstInactiveControl()
    {
        return super.activateFirstInactiveControl();
    }

    // 
    //  DESC: Deactivate the control
    //
    deactivateControl()
    {
        super.deactivateControl();

        this.deactivateSubControl();
    }

    // 
    //  DESC: Deactivate the sub control
    //
    deactivateSubControl()
    {
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].deactivateControl();
    }

    // 
    //  DESC: Check if control is a sub control
    //
    isSubControl()
    {
        return true;
    }

    // 
    //  DESC: Disable the control
    //
    disableControl()
    {
        super.disableControl();

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].disableControl();
    }

    // 
    //  DESC: Enable the control to the inactive state
    //
    enableControl()
    {
        super.enableControl();

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].enableControl();
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        super.setAlpha( alpha );

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].setAlpha( alpha );
    }

    // 
    //  DESC: Get the pointer to the active control
    //  NOTE: This is mostly needed for sub controls
    //
    getActiveControl()
    {
        let result = null;

        if( this.respondsToSelectMsg )
            result = this;

        for( let i = 0; i < this.subControlAry.length; ++i )
        {
            if( this.subControlAry[i].state > uiControlDefs.ECS_INACTIVE )
            {
                result = this.subControlAry[i].getActiveControl();
                break;
            }
        }
        
        return result;
    }
}
