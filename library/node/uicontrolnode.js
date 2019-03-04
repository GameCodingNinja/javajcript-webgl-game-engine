
// 
//  FILE NAME: uicontrolnode.js
//  DESC:      UI Control node class for rendering just one control
//

"use strict";

import { iNode } from './inode';
import * as defs from '../common/defs';

export class UIControlNode extends iNode
{
    constructor( uiControl )
    {
        super();
        
        this.uiControl = uiControl;
        
        // Node type
        this.type = defs.ENT_UI_CONTROL;
    }
    
    // 
    //  DESC: Update the sprite
    //
    update()
    {
        this.uiControl.update();
    }
    
    //
    //  DESC: Transform the sprite
    //
    transform( object = null )
    {
        if( object )
            this.uiControl.object.transform( object );
        else
            this.uiControl.object.transform();
    }
    
    //
    //  DESC: Render the sprite
    //
    render( camera )
    {
        this.uiControl.render( camera );
    }
    
    // 
    //  DESC: Get the control
    //
    getControl()
    {
        return this.uiControl;
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return defs.SPRITE_DEFAULT_ID;
    }
    
    // 
    //  DESC: Clean up any sprites
    //
    cleanUp()
    {
        this.uiControl.cleanUp();
    }
}
