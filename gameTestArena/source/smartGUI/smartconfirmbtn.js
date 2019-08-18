
// 
//  FILE NAME: smartconfirmbtn.js
//  DESC:      Class CSmartExitBtn
//

"use strict";

import { SmartGuiControl } from '../../../library/gui/ismartguibase';
import { menuManager } from '../../../library/gui/menumanager';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';

export class SmartConfirmBtn extends SmartGuiControl
{
    constructor( uiControl )
    {
        super( uiControl );
    }
    
    //
    //  DESC: Called when the control is executed
    //
    execute()
    {
        let menu = menuManager.getMenu("confirmation_menu");
        let yesBtn = menu.getControl("yes_btn");
        let megLbl = menu.getControl("message_lbl");
        
        let smartGuiCtrl = null;
        let conformationMsg = '';
        let executionAction = '';
        let actionType = uiControlDefs.ECAT_BACK;
        
        if( this.uiControl.name === 'main_menu_btn' )
        {
            conformationMsg = 'Are you sure you|want to go back to|the main menu?';
            actionType = uiControlDefs.ECAT_GAME_STATE_CHANGE;
            executionAction = 'title_screen_state';
        }
        
        // Set the conformation menu
        yesBtn.smartGui = smartGuiCtrl;
        yesBtn.actionType = actionType;
        yesBtn.executionAction = executionAction;
        megLbl.createFontStr( conformationMsg );
    }
}
    