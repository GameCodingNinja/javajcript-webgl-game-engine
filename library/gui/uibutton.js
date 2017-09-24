
// 
//  FILE NAME: uibutton.js
//  DESC:      Class for user interface buttons
//

"use strict";
import { UIControl } from './uicontrol';
import * as defs from '../common/defs';

export class UIButton extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = defs.ECT_BUTTON;
    }
}
