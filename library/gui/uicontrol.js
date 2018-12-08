
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
import { ScriptComponent } from '../script/scriptcomponent';
import { scriptManager } from '../script/scriptmanager';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as defs from '../common/defs';

export class UIControl extends ControlBase
{
    constructor( group )
    {
        super( group );
        
        // sprite array
        this.spriteAry = [];

        // Script component object
        this.scriptComponent = new ScriptComponent;

        // control's default state
        this.defaultState;

        // control's current state
        this.state = defs.ECS_NULL;
        this.lastState = defs.ECS_NULL;

        // Name of the action to perform under the correct circumstances
        this.executionAction;

        // How the control should respond when selected
        this.actionType = defs.ECAT_NULL;

        // This control's size
        this.size = new Size;

        // This is the size modifier
        // when calculating the collision rect
        this.sizeModifier = new Rect;

        // Collision rect
        this.collisionQuad = new Quad;

        // Collision center
        this.collisionCenter = new Point;

        // Smart Gui object
        this.smartGui = null;

        // Mouse selection type
        this.mouseSelectType = defs.EAP_UP;

        // On state script factory map
        this.scriptFactoryMap = new Map;

        // Scrolling parameters
        this.scrollParam = null;

        // Execution callbacks
        this.executionActionCallback = null;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Set the default state of the control
        let attr = node.getAttribute( 'defaultState' );
        if( attr )
            this.setDefaultState( attr );

        // Set if mouse selection is the down message
        attr = node.getAttribute( 'mouseSelectDown' );
        if( attr && (attr === 'true') )
            this.mouseSelectType = defs.EAP_DOWN;

        // Setup the action
        let actionNode = node.getElementsByTagName( 'action' );
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

        // Setup the action
        let stateScriptNode = node.getElementsByTagName( 'stateScript' );
        if( stateScriptNode.length )
        {
            // This allocates the script to the map
            let attr = stateScriptNode[0].getAttribute( "onDisabled" );
            if( attr )
                this.scriptFactoryMap.set( defs.ECS_DISABLED, scriptManager.get(attr)(this) );

            attr = stateScriptNode[0].getAttribute( "onInactive" );
            if( attr )
                this.scriptFactoryMap.set( defs.ECS_INACTIVE, scriptManager.get(attr)(this) );

            attr = stateScriptNode[0].getAttribute( "onActive" );
            if( attr )
                this.scriptFactoryMap.set( defs.ECS_ACTIVE, scriptManager.get(attr)(this) );

            attr = stateScriptNode[0].getAttribute( "onSelect" );
            if( attr )
                this.scriptFactoryMap.set( defs.ECS_SELECTED, scriptManager.get(attr)(this) );
        }

        // Load the scroll data from node
        let scrollParamNode = node.getElementsByTagName( 'scroll' );
        if( scrollParamNode.length )
        {
            this.scrollParam = new ScrollParam;
            this.scrollParam.loadFromNode( scrollParamNode );
        }

        // Get the size modifier info
        this.sizeModifier = parseHelper.loadRect( node );

        // Init to the default state
        this.revertToDefaultState();
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Get the list of object data associated with this button
        let spriteNode = node.getElementsByTagName( 'sprite' );
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
    loadSpriteFromNode( node, fontSpriteCount )
    {
        // Get the type of object
        let objectName = node.getAttribute( 'objectName' );

        // allocate the sprite in the array
        let sprite = new Sprite( objectDataManager.getData( this.group, objectName ) );
        this.spriteAry.push( sprite );

        // Load the sprite data
        sprite.load( node );

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
            sprite.visualComponent.color = parseHelper.loadColor( node, sprite.visualComponent.color );
        }
        else
        {
            // Find the largest size width and height of the different sprites for the controls size
            let width = sprite.objData.size.w + Math.abs( sprite.object.pos.x );
            let height = sprite.objData.size.h + Math.abs( sprite.object.pos.y );

            if( width > this.size.w )
                this.size.w = width;

            if( height > this.size.h )
                this.size.h = height;
        }
    }
    
    // 
    //  DESC: Load a sprite from an array
    //  NOTE: Used to init the progress bar manually
    //
    loadSpriteFromArray( objectNameAry )
    {
        for( let i = 0; i < objectNameAry.length; ++i )
        {
            // allocate the sprite in the array
            this.spriteAry.push( new Sprite( objectDataManager.getData( this.group, objectNameAry[i] ) ) );
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
            super.transform( object.matrix, object.wasWorldPosTranformed() );
        else
            super.transform();

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].object.transform( this.matrix, this.wasWorldPosTranformed() );

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
        if( event.detail.type === defs.EGE_MENU_CONTROL_STATE_CHANGE )
        {
            this.onStateChange( event );
        }
        else if( event.detail.type === defs.EGE_MENU_SELECT_EXECUTE )
        {
            this.onSelectExecute( event );
        }
        else if( event.detail.type === defs.EGE_MENU_SET_ACTIVE_CONTROL )
        {
            this.onSetActiveControl( event );
        }
        else if( event.detail.type === defs.EGE_MENU_REACTIVATE )
        {
            this.onReactivate( event );
        }
        else if( event.detail.type === defs.EGE_MENU_TRANS_IN )
        {
            this.onTransIn( event );
        }
        else if( event.detail.type === defs.EGE_MENU_TRANS_OUT )
        {
            this.onTransOut( event );
        }

        // Do any smart event handling
        this.smartHandleEvent( event );
    }

    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === defs.ETC_BEGIN )
        {
            // Set the script functions for the current displayed state
            if( this.lastState != this.state )
                this.setDisplayState();
        }
    }

    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === defs.ETC_BEGIN )
        {
            // Reset the control
            this.reset();

            // Reset the sprite scripts
            this.resetSpriteScript();

            // Set the script functions for the current displayed state
            if( this.lastState != this.state )
                this.setDisplayState();
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
        if( this.state === defs.ECS_SELECTED )
        {
            if( this.actionType === defs.ECAT_TO_TREE )
                eventManager.dispatchEvent( defs.EGE_MENU_TO_TREE, this.executionAction );

            else if( this.actionType === defs.ECAT_TO_MENU )
                eventManager.dispatchEvent( defs.EGE_MENU_TO_MENU, this.executionAction, this );

            else if( this.actionType === defs.ECAT_BACK )
                eventManager.dispatchEvent( defs.EGE_MENU_BACK_ACTION );

            else if( this.actionType === defs.ECAT_CLOSE )
                eventManager.dispatchEvent( defs.EGE_MENU_TOGGLE_ACTION );

            else if( this.actionType === defs.ECAT_GAME_STATE_CHANGE )
                eventManager.dispatchEvent( defs.EGE_MENU_GAME_STATE_CHANGE, defs.ETC_BEGIN, this.executionAction );

            //else if( this.actionType === defs.ECAT_QUIT_GAME )
                //eventManager.dispatchEvent( SDL_QUIT );

            // Smart gui execution
            this.smartExecuteAction();

            // signal execute action
            if( this.executionActionCallback !== null )
                for( let i = 0; i < this.executionActionCallback.length; ++i )
                    this.executionActionCallback[i](this);
        }
    }

    // 
    //  DESC: Handle OnSetActiveControl message
    //
    onSetActiveControl( event )
    {
        // Set the last active control to be active again
        if( (event.detail.arg[0] === defs.EAC_LAST_ACTIVE_CONTROL) &&
            (this.lastState > defs.ECS_INACTIVE))
        {
            this.lastState = this.state = defs.ECS_ACTIVE;

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
        if( this.state > defs.ECS_INACTIVE )
        {
            this.lastState = this.state = defs.ECS_ACTIVE;

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
                    defs.EGE_MENU_CONTROL_STATE_CHANGE,
                    defs.ECS_ACTIVE,
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
            this.prepareControlScriptFactory( this.state );

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
            this.lastState = this.state = defs.ECS_ACTIVE;

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
        if( (this.lastState === defs.ECS_NULL) ||
            (this.lastState > defs.ECS_INACTIVE) )
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
        if( (this.lastState === defs.ECS_NULL) ||
            (this.lastState > defs.ECS_DISABLED) )
        {
            this.lastState = this.state = defs.ECS_DISABLED;

            this.resetSpriteScript();
            this.setDisplayState();
        }
    }

    // 
    //  DESC: Enable the control to the inactive state
    //
    enableControl()
    {
        if( this.lastState <= defs.ECS_DISABLED )
        {
            this.lastState = this.state = defs.ECS_INACTIVE;

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

        // Call any init scripts
        this.prepareSpriteScriptFactoryFunction( defs.ECS_INIT );
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
        let scriptFactoryMapKey;
        let forceUpdate = false;

        switch( controlState )
        {
            case defs.ECS_INIT:
                scriptFactoryMapKey = "init";
                forceUpdate = true;
            break;

            case defs.ECS_DISABLED:
                scriptFactoryMapKey = "disabled";
                forceUpdate = true;
            break;

            case defs.ECS_INACTIVE:
                scriptFactoryMapKey = "inactive";
                forceUpdate = true;
            break;

            case defs.ECS_ACTIVE:
                scriptFactoryMapKey = "active";
            break;

            case defs.ECS_SELECTED:
                scriptFactoryMapKey = "selected";
            break;
        };

        this.prepareSpriteScriptFactory( scriptFactoryMapKey, forceUpdate );
    }

    // 
    //  DESC: Call a script function map key for sprite
    //
    prepareSpriteScriptFactory( scriptFactoryMapKey, forceUpdate )
    {    
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].prepareScript( scriptFactoryMapKey, forceUpdate );
    }

    // 
    //  DESC: Prepare the script function to run
    //
    prepareControlScriptFactory( controlState )
    {
        let script = this.scriptFactoryMap.get( controlState );
        if( script )
        {
            script.init();
            this.scriptComponent.set( script );
        }
    }

    // 
    //  DESC: Reset and recycle the contexts
    //
    reset( complete = false )
    {
        if( this.state > defs.ECS_INACTIVE )
            this.state = defs.ECS_INACTIVE;

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
            this.defaultState = defs.ECS_INACTIVE;

        else if( value === 'active' )
            this.defaultState = defs.ECS_ACTIVE;

        else if( value === 'disabled' )
            this.defaultState = defs.ECS_DISABLED;

        else if( value === 'selected' )
            this.defaultState = defs.ECS_SELECTED;
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
    //  DESC: Smart execute the action
    //
    smartExecuteAction()
    {
        if( this.smartGui )
            this.smartGui.execute();
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
            this.actionType = defs.ECAT_ACTION;

        else if( value === 'to_tree' )
            this.actionType = defs.ECAT_TO_TREE;

        else if( value === 'to_menu' )
            this.actionType = defs.ECAT_TO_MENU;

        else if( value === 'back' )
            this.actionType = defs.ECAT_BACK;

        else if( value === 'close' )
            this.actionType = defs.ECAT_CLOSE;

        else if( value === 'change_focus' )
            this.actionType = defs.ECAT_CHANGE_FOCUS;

        else if( value === 'game_state_change' )
            this.actionType = defs.ECAT_GAME_STATE_CHANGE;

        else if( value === 'quit_game' )
            this.actionType = defs.ECAT_QUIT_GAME;
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
                defs.EGE_MENU_CONTROL_STATE_CHANGE,
                defs.ECS_SELECTED,
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
                this.lastState = this.state = defs.ECS_ACTIVE;

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
        return this.state === defs.ECS_DISABLED;
    }

    isInactive()
    {
        return this.state === defs.ECS_INACTIVE;
    }

    isActive()
    {
        return (this.state === defs.ECS_ACTIVE);
    }

    isSelected()
    {
        return (this.state === defs.ECS_SELECTED);
    }

    isSelectable()
    {
        return ((this.state === defs.ECS_INACTIVE) || (this.state === defs.ECS_ACTIVE));
    }

    // 
    //  DESC: Check if control is a sub control
    //
    isSubControl()
    {
        return false;
    }

    // 
    //  DESC: Connect to the execution action signal
    //
    connect_ExecutionAction( callback )
    {
        if( this.executionActionCallback === null )
            this.executionActionCallback = [];
        
        this.executionActionCallback.push( callback );
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
