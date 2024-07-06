
// 
//  FILE NAME: uicontrolnode.js
//  DESC:      UI Control node that allows for children
//

"use strict";

import { RenderNode } from './rendernode';
import { Size } from '../common/size';
import * as defs from '../common/defs';

export class UIControlNode extends RenderNode
{
    constructor( uiControl, nodeData )
    {
        super( nodeData );
        
        this.name = nodeData.nodeName;
        this.uiControl = uiControl;
        this.userId = nodeData.userId;
        this.type = defs.ENT_UI_CONTROL;
    }
    
    // 
    //  DESC: Update the control
    //
    update()
    {
        this.uiControl.update();

        // Call the parent but it has to be last
        super.update();
    }
    
    //
    //  DESC: Transform the control
    //
    transform( object = null )
    {
        if( object )
            this.uiControl.transform( object );
        else
            this.uiControl.transform();
        
        // Call the parent but it has to be last
        super.transform();
    }
    
    //
    //  DESC: Render the control
    //
    render( camera )
    {
        this.uiControl.render( camera );

        // Call the parent but it has to be last
        super.render( camera );
    }
    
    // 
    //  DESC: Get the control
    //
    get()
    {
        return this.uiControl;
    }
    
    // 
    //  DESC: Get the node id
    //
    getId()
    {
        return defs.DEFAULT_ID;
    }
    
    // 
    //  DESC: Clean up any control
    //
    cleanUp()
    {
        this.uiControl.cleanUp();
    }

    // 
    //  DESC: Calculate the radius
    //
    calcRadius()
    {
        // Allocate a size object to acumulate the size across all the children
        this._size = new Size;

        // Get the initial size
        this.calcSize( this._size );

        // Call the recursive function to acumulate the size across all the children
        super.calcRadius( this._size );

        // Calculate the radius in squared space. Avoids having to use sqrt
        this.radius = this._size.getLength() / 2;
    }
}
