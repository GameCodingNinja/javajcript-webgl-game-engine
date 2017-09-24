// 
//  FILE NAME: uicontrolfactory.js
//  DESC:      factory for control creation
//

"use strict";
import { signalManager } from '../managers/signalmanager';
import { UILabel } from './uilabel';
import { UIButton } from './uibutton';
import { UISubControl } from './uisubcontrol';
import { UIButtonList } from './uibuttonlist';
import { UICheckBox } from './uicheckbox';
import { UISlider } from './uislider';
import { UIScrollBox } from './uiscrollbox';
import { UIMeter } from './uimeter';
import { UIProgressBar } from './uiprogressbar';

// 
//  DESC: Load the control info from XML node
//
export function create( node, group )
{
    let control = null;

    // Get the control type. This is required
    let ctrlType = node.getAttribute( 'controlType' );

    // New up the control with its respected control type
    if( ctrlType === 'label' )
        control = new UILabel( group );

    else if( ctrlType === 'button' )
        control = new UIButton( group );

    else if( ctrlType === 'sub_control' )
        control = new UISubControl( group );

    else if( ctrlType === 'button_list' )
        control = new UIButtonList( group );

    else if( ctrlType === 'check_box' )
        control = new UICheckBox( group );

    else if( ctrlType === 'slider' )
        control = new UISlider( group );

    else if( ctrlType === 'scroll_box' )
        control = new UIScrollBox( group );

    else if( ctrlType === 'meter' )
        control = new UIMeter( group );

    else if( ctrlType === 'progress_bar' )
        control = new UIProgressBar( group );

    else
        throw new Error( `UI Control not defined! (${ctrlType})` );

    // Have the control load it's share
    control.loadFromNode( node );

    // Broadcast signal to let the game handle smart gui inits
    signalManager.broadcast_smartGui( control );

    // Do any smart gui Create
    control.smartCreate();

    return control;

}
