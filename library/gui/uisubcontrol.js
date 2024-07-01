
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
        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].update();
    }

    // 
    //  DESC: Transform the control
    //
    transform( object )
    {
        // Call the parent
        super.transform( object );

        // Update all controls
        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].transform( this );
    }

    // 
    //  DESC: Render the sub control
    //
    render( camera )
    {
        // Call the parent
        super.render( camera );

        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].render( camera );
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        // Call the parent
        super.handleEvent( event );

        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].handleEvent( event );

        if( this.isActive() && (event instanceof GenericEvent) )
        {
            if( (event.type >= menuDefs.EME_MENU_UP_ACTION) &&
                (event.type <= menuDefs.EME_MENU_RIGHT_ACTION) )
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
            else if( (event.type >= menuDefs.EME_MENU_SCROLL_UP) &&
                     (event.type <= menuDefs.EME_MENU_SCROLL_RIGHT) )
            {
                if( event.type === menuDefs.EME_MENU_SCROLL_UP )
                {
                    this.onUpScroll( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_DOWN )
                {
                    this.onDownScroll( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_LEFT )
                {
                    this.onLeftScroll( event );
                }
                else if( event.type === menuDefs.EME_MENU_SCROLL_RIGHT )
                {
                    this.onRightScroll( event );
                }
            }
            else if( event.type === menuDefs.EME_MENU_TAB_LEFT )
            {
                this.onTabLeft( event );
            }
            else if( event.type === menuDefs.EME_MENU_TAB_RIGHT )
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
            this._navNode = this.activeNode;

            do
            {
                this._navNode = this._navNode.getNode( this._navNode );
                
                if( this._navNode === null )
                {
                    break;
                }
                else if( !this._navNode.uiControl.isDisabled() )
                {
                    this.activeNode = this._navNode;control

                    eventManager.dispatchEvent(
                        menuDefs.EME_MENU_CONTROL_STATE_CHANGE,
                        uiControlDefs.ECS_ACTIVE,
                        this._navNode.uiControl );

                    break;
                }
            }
            while( this._navNode );
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
            this._state = event.arg[defs.EMSC_STATE];

            this._control = this.findSubControlByRef( event.arg[defs.EMSC_CONTROL] );

            // Restart the active state of the sub control if something
            // changed in the child controls or their children controls
            if( (this._state === uiControlDefs.ECS_ACTIVE) && (this._control !== null) )
            {
                if( this._control.state != this._state )
                {
                    this.setState(this._state, true);

                    this.resetSpriteScript();

                    this.setDisplayState();
                }
            }
            // The sub control doesn't respond to selected message
            else if( this._state < uiControlDefs.ECS_SELECT )
                super.onStateChange( event );
        }
    }

    // 
    //  DESC: Reset and recycle the contexts
    //
    reset( complete )
    {
        super.reset( complete );
        
        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].reset( complete );
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        this._result = super.onMouseMove( event );

        this._found = this.onSubControlMouseMove( event );

        // If the sub control is not found, deactivate them
        if( this._result && !this._found )
            this.deactivateSubControl();

        return this._result || this._found;
    }

    // 
    //  DESC: Handle the sub control mouse move
    //
    onSubControlMouseMove( event )
    {
        this._result1 = false;

        for( this._i = 0; this._i < this.subControlAry.length && !this._result1; ++this._i )
            this._result1 = this.subControlAry[this._i].onMouseMove( event );

        return this._result1;
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
            for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
                if( this.subControlAry[this._i].handleSelectAction( event ) )
                    return true;
        }

        return false;
    }

    // 
    //  DESC: Get the reference to the control if found
    //
    findControlByName( name )
    {
        this._ctrl1 = super.findControlByName( name );

        if( this._ctrl1 === null )
            this._ctrl1 = this.findSubControlByName( name );

        return this._ctrl1;
    }

    findControlByRef( control )
    {
        this._ctrl2 = super.findControlByRef( control );

        if( this._ctrl2 === null )
            this._ctrl2 = this.findSubControlByRef( control );

        return this._ctrl2;
    }

    // 
    //  DESC: Get the pointer to the subcontrol if found
    //
    findSubControlByName( name )
    {
        this._ctrl3 = null;

        for( this._i = 0; this._i < this.subControlAry.length && !this._ctrl3; ++this._i )
            this._ctrl3 = this.subControlAry[this._i].findControlByName( name );

        return this._ctrl3;
    }

    findSubControlByRef( control )
    {
        this._ctrl4 = null;

        for( this._i = 0; this._i < this.subControlAry.length && !this._ctrl4; ++this._i )
            this._ctrl4 = this.subControlAry[this._i].findControlByRef( control );

        return this._ctrl4;
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: This is mainly here to be virtual for sub controls
    //
    activateFirstInactiveControl()
    {
        if( super.activateFirstInactiveControl() )
        {
            this._found = false;

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
        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].deactivateControl();
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

        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].disableControl();
    }

    // 
    //  DESC: Enable the control to the inactive state
    //
    enableControl()
    {
        super.enableControl();

        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].enableControl();
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        super.setAlpha( alpha );

        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
            this.subControlAry[this._i].setAlpha( alpha );
    }

    // 
    //  DESC: Get the pointer to the active control
    //  NOTE: This is mostly needed for sub controls
    //
    getActiveControl()
    {
        this._result = null;

        if( this.respondsToSelectMsg )
            this._result = this;

        for( this._i = 0; this._i < this.subControlAry.length; ++this._i )
        {
            if( this.subControlAry[this._i].state > uiControlDefs.ECS_INACTIVE )
            {
                this._result = this.subControlAry[this._i].getActiveControl();
                break;
            }
        }
        
        return this._result;
    }
}
