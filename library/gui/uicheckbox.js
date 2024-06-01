
// 
//  FILE NAME: uicheckbox.js
//  DESC:      Class for user interface check box buttons
//

"use strict";
import { UIControl } from './uicontrol';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as defs from '../common/defs';

export class UICheckBox extends UIControl
{
    constructor( group )
    {
        super( group );
        
        this.type = uiControlDefs.ECT_CHECK_BOX;
        
        // Select state
        this.toggleState = false;
    }
    
    // 
    //  DESC: Handle OnSelectExecute message
    //
    onSelectExecute( event )
    {
        if( this.state === uiControlDefs.ECS_SELECT )
            this.toggleState = !this.toggleState;

        super.onSelectExecute( event );
    }

    // 
    //  DESC: Render the control
    //
    render( matrix )
    {
        for( this._i = 0; this._i < this.spriteAry.length-1; ++this._i )
            this.spriteAry[this._i].render( matrix );

        if( this.toggleState === defs.TOGGLE_STATE_ON )
            this.spriteAry[this.spriteAry.length-1].render( matrix );
    }
}


