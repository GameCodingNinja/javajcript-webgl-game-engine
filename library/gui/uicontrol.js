
// 
//  FILE NAME: uicontrol.js
//  DESC:      class for user interface controls
//

"use strict";

import { ControlBase } from './controlbase';
import { ScrollParam } from './scrollparam';
import { Sprite } from '../sprite/sprite';
import { Size } from '../common/size';
import { Point } from '../common/point';
import { Quad } from '../common/quad';
import { Rect } from '../common/rect';
import { Matrix } from '../utilities/matrix';
import { settings } from '../utilities/settings';
import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { eventManager } from '../managers/eventmanager';
import { actionManager } from '../managers/actionmanager';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as menuDefs from '../gui/menudefs';
import * as defs from '../common/defs';

export class UIControl extends ControlBase
{
    constructor( group )
    {
        super( group );
        
        // sprite array
        this.spriteAry = [];

        // control's default state
        this.defaultState;

        // control's current state
        this.state = uiControlDefs.ECS_NULL;
        this.lastState = uiControlDefs.ECS_NULL;

        // Name of the action to perform under the correct circumstances
        this.executionAction;

        // How the control should respond when selected
        this.actionType = uiControlDefs.ECAT_NULL;

        // This control's size
        this.size = new Size;

        // This is the size modifier
        // when calculating the collision rect
        this.sizeModifier = new Rect;

        // Collision rect
        this.collisionQuad = new Quad;

        // Collision center
        this.collisionCenter = new Point;

        // Mouse selection type
        this.mouseSelectType = defs.EAP_UP;

        // Scrolling parameters
        this.scrollParam = null;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( xmlNode )
    {
        super.loadFromNode( xmlNode );

        // Set the default state of the control
        let attr = xmlNode.getAttribute( 'defaultState' );
        if( attr )
            this.setDefaultState( attr );

        // Set if mouse selection is the down message
        attr = xmlNode.getAttribute( 'mouseSelectDown' );
        if( attr && (attr === 'true') )
            this.mouseSelectType = defs.EAP_DOWN;

        // Setup the action
        let actionNode = xmlNode.getElementsByTagName( 'action' );
        if( actionNode.length )
        {
            // Set the action type
            attr = actionNode[0].getAttribute( 'actionType' )
            if( attr )
                this.setActionType( attr );

            // Set the execution action
            attr = actionNode[0].getAttribute( 'executionAction' )
            if( attr )
                this.executionAction = attr;
        }

        // Check for scripting
        let scriptList = xmlNode.getElementsByTagName( 'scriptList' );
        if( scriptList.length )
            this.scriptComponent.initScriptIds( scriptList[0] );

        // Load the scroll data from node
        let scrollParamNode = xmlNode.getElementsByTagName( 'scroll' );
        if( scrollParamNode.length )
        {
            this.scrollParam = new ScrollParam;
            this.scrollParam.loadFromNode( scrollParamNode );
        }

        // Get the size modifier info
        this.sizeModifier = parseHelper.loadRect( xmlNode );

        // Init to the default state
        this.revertToDefaultState();
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( xmlNode )
    {
        // Get the list of object data associated with this button
        let spriteNode = xmlNode.getElementsByTagName( 'sprite' );
        if( spriteNode.length )
        {
            // This is to get around the fact that objects are passed by "copy of reference".
            // This simulates passing an int by reference.
            let fontSpriteCount = [0];

            // Load the sprite from node
            for( let i = 0; i < spriteNode.length; ++i )
                this.loadSpriteFromNode( spriteNode[i], fontSpriteCount );
        }
    }

    // 
    //  DESC: Load a sprite from an XML node
    //
    loadSpriteFromNode( xmlNode, fontSpriteCount )
    {
        // Get the type of object
        let objectName = xmlNode.getAttribute( 'objectName' );

        // allocate the sprite in the array
        let sprite = new Sprite( objectDataManager.getData( this.group, objectName ) );
        this.spriteAry.push( sprite );

        // Load the sprite data
        sprite.load( xmlNode );

        // See if this sprite is used for rendering a font string
        if( sprite.visualComponent.isFontSprite() )
        {
            // Set the font string to be created later
            if( this.stringAry.length && (fontSpriteCount[0] < this.stringAry.length) && (sprite.visualComponent.fontData.fontString === '' ) )
            {
                sprite.visualComponent.setFontString( this.stringAry[ fontSpriteCount[0] ] );
                ++fontSpriteCount[0];
            }

            // set the color if it is different
            sprite.visualComponent.color = parseHelper.loadColor( xmlNode, sprite.visualComponent.color );
        }
        else
        {
            // Find the largest size width and height of the different sprites for the controls size
            let width = sprite.objData.size.w + Math.abs( sprite.pos.x );
            let height = sprite.objData.size.h + Math.abs( sprite.pos.y );

            if( width > this.size.w )
                this.size.w = width;

            if( height > this.size.h )
                this.size.h = height;
        }
    }

    // 
    //  DESC: Update the control
    //
    update()
    {
        this.scriptComponent.update();

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].update();
    }

    // 
    //  DESC: Transform the control
    //
    transform( object = null )
    {
        if( object )
            super.transform( object );
        else
            super.transform();

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this );

        // Transform the collision
        this.transformCollision();
    }

    // 
    //  DESC: Transform the collision
    //
    transformCollision()
    {
        if( this.wasWorldPosTranformed() && !this.size.isEmpty() )
        {
            let finalMatrix = new Matrix( this.matrix );
            finalMatrix.scaleFromValue( settings.orthoAspectRatio.h );
            finalMatrix.invertY();

            // Get half the screen size to convert to screen coordinates
            let screenHalf = settings.size_half;

            // Create the rect of the control based on half it's size
            let halfwidth = this.size.w * 0.5;
            let halfHeight = this.size.h * 0.5;

            let quad = new Quad;
            quad.point[0].x = -halfwidth + -this.sizeModifier.x1;
            quad.point[0].y = -halfHeight + -this.sizeModifier.y1;
            quad.point[1].x = halfwidth + this.sizeModifier.x2;
            quad.point[1].y = -halfHeight + -this.sizeModifier.y1;
            quad.point[2].x = halfwidth + this.sizeModifier.x2;
            quad.point[2].y = halfHeight + this.sizeModifier.y2;
            quad.point[3].x = -halfwidth + -this.sizeModifier.x1;
            quad.point[3].y = halfHeight + this.sizeModifier.y2;

            finalMatrix.transformQuad( this.collisionQuad, quad );

            // Convert the translated rect to screen coordinates
            this.collisionQuad.point[0].x += screenHalf.w;
            this.collisionQuad.point[0].y += screenHalf.h;
            this.collisionQuad.point[1].x += screenHalf.w;
            this.collisionQuad.point[1].y += screenHalf.h;
            this.collisionQuad.point[2].x += screenHalf.w;
            this.collisionQuad.point[2].y += screenHalf.h;
            this.collisionQuad.point[3].x += screenHalf.w;
            this.collisionQuad.point[3].y += screenHalf.h;

            finalMatrix.transformPoint( this.collisionCenter, new Point );

            // Convert to screen coordinates
            this.collisionCenter.x += screenHalf.w;
            this.collisionCenter.y += screenHalf.h;
        }
    }

    // 
    //  DESC: do the render
    //
    render( camera )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( camera );
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        if( event.detail.type === menuDefs.EGE_MENU_CONTROL_STATE_CHANGE )
        {
            this.onStateChange( event );
        }
        else if( event.detail.type === menuDefs.EGE_MENU_SELECT_EXECUTE )
        {
            this.onSelectExecute( event );
        }
        else if( event.detail.type === menuDefs.EGE_MENU_SET_ACTIVE_CONTROL )
        {
            this.onSetActiveControl( event );
        }
        else if( event.detail.type === menuDefs.EGE_MENU_REACTIVATE )
        {
            this.onReactivate( event );
        }
        else if( event.detail.type === menuDefs.EGE_MENU_TRANS_IN )
        {
            this.onTransIn( event );
        }
        else if( event.detail.type === menuDefs.EGE_MENU_TRANS_OUT )
        {
            this.onTransOut( event );
        }

        // Prepare script function associated with handling this game event
        this.prepareControlScript( uiControlDefs.ECS_EVENT );
    }

    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === menuDefs.ETC_BEGIN )
        {
            // Set the script functions for the current displayed state
            if( this.lastState != this.state )
                this.setDisplayState();
            
            // Prepare script function associated with handling this game event
            this.prepareControlScript( uiControlDefs.ECS_TRANS_IN );
        }
    }

    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === menuDefs.ETC_BEGIN )
        {
            // Reset the control
            this.reset();

            // Reset the sprite scripts
            this.resetSpriteScript();

            // Set the script functions for the current displayed state
            if( this.lastState != this.state )
                this.setDisplayState();
            
            // Prepare script function associated with handling this game event
            this.prepareControlScript( uiControlDefs.ECS_TRANS_OUT );
        }
    }

    // 
    //  DESC: Handle OnStateChange message
    //
    onStateChange( event )
    {
        // This control is the focus of the state change
        // The control's "this" pointer is used as a means of identification
        if( event.detail.arg[1] === this )
            this.changeState( event.detail.arg[0] );
        else
            this.deactivateControl();
    }

    // 
    //  DESC: Handle OnSelectExecute message
    //
    onSelectExecute( event )
    {
        if( this.state === uiControlDefs.ECS_SELECT )
        {
            if( this.actionType === uiControlDefs.ECAT_TO_TREE )
                eventManager.dispatchEvent( menuDefs.EGE_MENU_TO_TREE, this.executionAction );

            else if( this.actionType === uiControlDefs.ECAT_TO_MENU )
                eventManager.dispatchEvent( menuDefs.EGE_MENU_TO_MENU, this.executionAction, this );

            else if( this.actionType === uiControlDefs.ECAT_BACK )
                eventManager.dispatchEvent( menuDefs.EGE_MENU_BACK_ACTION );

            else if( this.actionType === uiControlDefs.ECAT_CLOSE )
                eventManager.dispatchEvent( menuDefs.EGE_MENU_TOGGLE_ACTION );

            else if( this.actionType === uiControlDefs.ECAT_GAME_STATE_CHANGE )
                eventManager.dispatchEvent( menuDefs.EGE_MENU_GAME_STATE_CHANGE, menuDefs.ETC_BEGIN, this.executionAction );

            else if( this.actionType === uiControlDefs.ECAT_ACTION_EVENT )
                eventManager.dispatchEvent( uiControlDefs.ECAT_ACTION_EVENT, this.executionAction, this );

            // Prepare script function associated with handling this game event
            this.prepareControlScript( uiControlDefs.ECS_EXECUTE );
        }
    }

    // 
    //  DESC: Handle OnSetActiveControl message
    //
    onSetActiveControl( event )
    {
        // Set the last active control to be active again
        if( (event.detail.arg[0] === menuDefs.EAC_LAST_ACTIVE_CONTROL) &&
            (this.lastState > uiControlDefs.ECS_INACTIVE))
        {
            this.lastState = this.state = uiControlDefs.ECS_ACTIVE;

            // Don't animate the control if the mouse was used
            if( !actionManager.wasLastDeviceMouse() )
            {
                this.resetSpriteScript();
                this.setDisplayState();
            }
        }
    }

    // 
    //  DESC: Handle OnReactivate message
    //
    onReactivate( event )
    {
        // Set the last active control to be active again
        if( this.state > uiControlDefs.ECS_INACTIVE )
        {
            this.lastState = this.state = uiControlDefs.ECS_ACTIVE;

            // Don't animate the control if the mouse was used
            if( !actionManager.wasLastDeviceMouse() ||
                this.isPointInControl( eventManager.mouseX, eventManager.mouseY ) )
            {
                this.resetSpriteScript();
                this.setDisplayState();
            }
        }
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        let result = false;

        if( !this.isDisabled() && this.isPointInControl( event.clientX + eventManager.mouseOffsetX, event.clientY + eventManager.mouseOffsetY ) )
        {
            result = true;

            // Only send the message if it's not already active
            if( !this.isActive() )
            {
                eventManager.dispatchEvent(
                    menuDefs.EGE_MENU_CONTROL_STATE_CHANGE,
                    uiControlDefs.ECS_ACTIVE,
                    this );
            }
        }

        return result;
    }

    // 
    //  DESC: Change the control state
    //
    changeState( state )
    {
        if( this.state !== state )
        {
            this.state = state;

            // Prepare any script functions associated with the state change
            this.prepareControlScript( this.state );

            this.resetSpriteScript();
            this.setDisplayState();

            this.lastState = this.state;
        }
    }

    // 
    //  DESC: Activate the control
    //
    activateControl()
    {
        // The focus has switched to this control
        if( !this.isDisabled() )
        {
            this.lastState = this.state = uiControlDefs.ECS_ACTIVE;

            this.resetSpriteScript();
            this.setDisplayState();

            return true;
        }

        return false;
    }

    // 
    //  DESC: Deactivate the control
    //
    deactivateControl()
    {
        // The focus has switched away from this control
        if( (this.lastState === uiControlDefs.ECS_NULL) ||
            (this.lastState > uiControlDefs.ECS_INACTIVE) )
        {
            // Reset the control
            this.reset();

            this.resetSpriteScript();
            this.setDisplayState();

            this.lastState = this.state;
        }
    }

    // 
    //  DESC: Disable the control
    //
    disableControl()
    {
        if( (this.lastState === uiControlDefs.ECS_NULL) ||
            (this.lastState > uiControlDefs.ECS_DISABLE) )
        {
            this.lastState = this.state = uiControlDefs.ECS_DISABLE;

            this.resetSpriteScript();
            this.setDisplayState();
        }
    }

    // 
    //  DESC: Enable the control to the inactive state
    //
    enableControl()
    {
        if( this.lastState <= uiControlDefs.ECS_DISABLE )
        {
            this.lastState = this.state = uiControlDefs.ECS_INACTIVE;

            this.resetSpriteScript();
            this.setDisplayState();
        }
    }

    // 
    //  DESC: Set the sprite's display based on it's current state
    //
    setDisplayState()
    {
        // Set the script function
        this.prepareSpriteScriptFactoryFunction( this.state );
    }

    // 
    //  DESC: Set the sprite's display based on it's current state
    //
    init()
    {
        // Create any font strings
        // This allows for delayed VBO create so that the fonts can be allocated during a load screen
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();

        // Prepare any script functions that are flagged to prepareOnInit
        this.scriptComponent.prepareOnInit( this );
    }

    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        // Free the font VBO
        // This allows for early VBO delete so that the menu manager can be freed from a thread
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }

    // 
    //  DESC: Prepare the sprite script factory function
    //
    prepareSpriteScriptFactoryFunction( controlState )
    {
        let scriptId = "null";

        switch( controlState )
        {
            case uiControlDefs.ECS_DISABLE:
                scriptId = "disable";
            break;

            case uiControlDefs.ECS_INACTIVE:
                scriptId = "inactive";
            break;

            case uiControlDefs.ECS_ACTIVE:
                scriptId = "active";
            break;

            case uiControlDefs.ECS_SELECT:
                scriptId = "select";
            break;
        }

        this.prepareSpriteScript( scriptId );
    }

    // 
    //  DESC: Call a script function map key for sprite
    //
    prepareSpriteScript( scriptId )
    {    
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].scriptComponent.prepare( scriptId, this.spriteAry[i] );
    }

    // 
    //  DESC: Prepare the script function to run
    //
    prepareControlScript( controlState, event )
    {
        let scriptId = "null";

        switch( controlState )
        {
            case uiControlDefs.ECS_TRANS_IN:
                scriptId = "transIn";
            break;

            case uiControlDefs.ECS_TRANS_OUT:
                scriptId = "transOut";
            break;

            case uiControlDefs.ECS_DISABLE:
                scriptId = "disable";
            break;

            case uiControlDefs.ECS_INACTIVE:
                scriptId = "inactive";
            break;

            case uiControlDefs.ECS_ACTIVE:
                scriptId = "active";
            break;

            case uiControlDefs.ECS_SELECT:
                scriptId = "select";
            break;

            case uiControlDefs.ECS_CHANGE:
                scriptId = "change";
            break;

            case uiControlDefs.ECS_EXECUTE:
                scriptId = "execute";
            break;

            case uiControlDefs.ECS_EVENT:
                scriptId = "event";
            break;
        }

        if( controlState == uiControlDefs.ECS_EVENT )
            this.scriptComponent.prepare( scriptId, this, event );
        else
            this.scriptComponent.prepare( scriptId, this );
    }

    // 
    //  DESC: Reset and recycle the contexts
    //
    reset( complete = false )
    {
        if( this.state > uiControlDefs.ECS_INACTIVE )
            this.state = uiControlDefs.ECS_INACTIVE;

        if( complete )
            this.lastState = this.state;
    }

    // 
    //  DESC: Reset the sprite script
    //
    resetSpriteScript()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].scriptComponent.reset();
    }

    // 
    //  DESC: Set the default state of this control
    //
    setDefaultState( value )
    {
        if( value === 'inactive' )
            this.defaultState = uiControlDefs.ECS_INACTIVE;

        else if( value === 'active' )
            this.defaultState = uiControlDefs.ECS_ACTIVE;

        else if( value === 'disabled' )
            this.defaultState = uiControlDefs.ECS_DISABLE;

        else if( value === 'selected' )
            this.defaultState = uiControlDefs.ECS_SELECT;
    }

    // 
    //  DESC: Set the control to their default behavior
    //
    revertToDefaultState()
    {
        this.state = this.defaultState;
    }

    // 
    //  DESC: Set the state of this control
    //
    setState( state, setLastState )
    {
        this.state = state;

        if( setLastState )
            this.lastState = state;
    }

    // 
    //  DESC: Set the control's action type
    //
    setActionType( value )
    {
        if( value === 'action' )
            this.actionType = uiControlDefs.ECAT_ACTION;

        else if( value === 'to_tree' )
            this.actionType = uiControlDefs.ECAT_TO_TREE;

        else if( value === 'to_menu' )
            this.actionType = uiControlDefs.ECAT_TO_MENU;

        else if( value === 'back' )
            this.actionType = uiControlDefs.ECAT_BACK;

        else if( value === 'close' )
            this.actionType = uiControlDefs.ECAT_CLOSE;

        else if( value === 'change_focus' )
            this.actionType = uiControlDefs.ECAT_CHANGE_FOCUS;

        else if( value === 'game_state_change' )
            this.actionType = uiControlDefs.ECAT_GAME_STATE_CHANGE;

        else if( value === 'quit_game' )
            this.actionType = uiControlDefs.ECAT_QUIT_GAME;
        
        else if( value === 'action_event' )
            this.actionType = uiControlDefs.ECAT_ACTION_EVENT;
    }

    // 
    //  DESC: Create the font string
    //
    createFontStr( fontString, spriteIndex = 0 )
    {
        let fontSpriteCounter = 0;

        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
            {
                if( fontSpriteCounter === spriteIndex )
                {
                    this.spriteAry[i].visualComponent.createFontString( fontString );
                    break;
                }

                ++fontSpriteCounter;
            }
        }
    }

    createFontString( stringIndex = 0, spriteIndex = 0 )
    {
        if( this.stringAry.length )
            this.createFontStr( this.stringAry[stringIndex], spriteIndex );
    }

    // 
    //  DESC: Set the font string
    //
    setFontString( fontString, spriteIndex = 0 )
    {
        let fontSpriteCounter = 0;

        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
            {
                if( fontSpriteCounter === spriteIndex )
                {
                    this.spriteAry[i].visualComponent.setFontString( fontString );
                    break;
                }

                ++fontSpriteCounter;
            }
        }
    }

    // 
    //  DESC: Handle the select action
    //  NOTE: Only process this message if it's keyboard/gamepad down or mouse up
    //
    handleSelectAction( event )
    {
        if( (this.isSelectable() &&
            (event.detail.arg[defs.ESMA_DEVICE_TYPE] === defs.MOUSE) &&
            (event.detail.arg[defs.ESMA_PRESS_TYPE] === this.mouseSelectType) &&
            this.isPointInControl( event.detail.arg[defs.ESMA_MOUSE_X], event.detail.arg[defs.ESMA_MOUSE_Y] ) ) ||

            (this.isActive() && (event.detail.arg[defs.ESMA_DEVICE_TYPE] !== defs.MOUSE) && (event.detail.arg[defs.ESMA_PRESS_TYPE] === defs.EAP_DOWN)) )
        {
            eventManager.dispatchEvent(
                menuDefs.EGE_MENU_CONTROL_STATE_CHANGE,
                uiControlDefs.ECS_SELECT,
                this );

            return true;
        }

        return false;
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: This is mainly here to be virtual for sub controls
    //
    activateFirstInactiveControl()
    {
        // If a mouse was used, set the control as active but don't animate it.
        // This allows us to use the keys to scroll when pressed
        if( actionManager.wasLastDeviceMouse() )
        {
            if( !this.isDisabled() )
            {
                this.lastState = this.state = uiControlDefs.ECS_ACTIVE;

                return true;
            }

            return false;
        }

        return this.activateControl();
    }

    // 
    //  DESC: Is the point in the control
    //
    isPointInControl( x, y )
    {
        return this.collisionQuad.isPointInQuad( x, y );
    }

    // 
    //  DESC: Get the pointer to the control if found
    //  NOTE: These function is mainly for sub controls
    //
    findControlByName( name )
    {
        if( this.name === name )
            return this;

        return null;
    }

    findControlByRef( ctrl )
    {
        if( ctrl === this )
            return this;

        return null;
    }

    // 
    //  DESC: Set the string to vector
    //
    setStringToList( str )
    {
        this.stringAry.push( str );
    }

    // 
    //  DESC: Is this control disabled/active/selected
    //
    isDisabled()
    {
        return this.state === uiControlDefs.ECS_DISABLE;
    }

    isInactive()
    {
        return this.state === uiControlDefs.ECS_INACTIVE;
    }

    isActive()
    {
        return (this.state === uiControlDefs.ECS_ACTIVE);
    }

    isSelected()
    {
        return (this.state === uiControlDefs.ECS_SELECT);
    }

    isSelectable()
    {
        return ((this.state === uiControlDefs.ECS_INACTIVE) || (this.state === uiControlDefs.ECS_ACTIVE));
    }

    // 
    //  DESC: Check if control is a sub control
    //
    isSubControl()
    {
        return false;
    }
    
    // 
    //  DESC: Get the pointer to the active control
    //  NOTE: This is mostly needed for sub controls
    //
    getActiveControl()
    {
        return this;
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].setAlpha( alpha );
    }
    
    // 
    //  DESC: Check if this control can scroll
    //
    canScroll( msg )
    {
        if( this.isActive() && this.scrollParam && this.scrollParam.canScroll(msg) )
            return true;
        
        return false;
    }
}
