
// 
//  FILE NAME: uilabel.js
//  DESC:      Class for user interface labels
//

"use strict";
import { UIControl } from './uicontrol';
import * as defs from '../common/defs';

export class UILabel extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = defs.ECT_LABEL;
    }
}

