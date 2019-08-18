
// 
//  FILE NAME: uilabel.js
//  DESC:      Class for user interface labels
//

"use strict";
import { UIControl } from './uicontrol';
import * as uiControlDefs from '../gui/uicontroldefs';

export class UILabel extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_LABEL;
    }
}

