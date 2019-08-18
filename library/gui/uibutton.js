
// 
//  FILE NAME: uibutton.js
//  DESC:      Class for user interface buttons
//

"use strict";
import { UIControl } from './uicontrol';
import * as uiControlDefs from '../gui/uicontroldefs';

export class UIButton extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_BUTTON;
    }
}
