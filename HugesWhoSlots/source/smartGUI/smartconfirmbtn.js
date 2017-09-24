
// 
//  FILE NAME: smartconfirmbtn.js
//  DESC:      Class CSmartExitBtn
//

"use strict";

import { SmartGuiControl } from '../../../library/gui/ismartguibase';
import { menuManager } from '../../../library/gui/menumanager';
import * as defs from '../../../library/common/defs';

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
        let actionType = defs.ECAT_BACK;
        
        if( this.uiControl.name === 'home_btn' )
        {
            conformationMsg = 'Are you sure you|want to go back to|the lobby?';
            actionType = defs.ECAT_GAME_STATE_CHANGE;
            executionAction = 'lobby_state';
        }
        else if( this.uiControl.name === 'big_pay_back_btn' )
        {
            conformationMsg = 'Are you sure you|want to play|"The Big Payback"?';
            actionType = defs.ECAT_GAME_STATE_CHANGE;
            executionAction = 'big_pay_back_state';
        }
        
        // Set the conformation menu
        yesBtn.smartGui = smartGuiCtrl;
        yesBtn.actionType = actionType;
        yesBtn.executionAction = executionAction;
        megLbl.createFontStr( conformationMsg );
    }
}
    