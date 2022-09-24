
// 
//  FILE NAME: uicontrolnode.js
//  DESC:      UI Control node class for rendering a ui control
//

"use strict";

import { iNode } from './inode';
import * as defs from '../common/defs';

export class UIControlLeafNode extends iNode
{
    constructor( uiControl, nodeData )
    {
        super(nodeData.nodeId, nodeData.parentNodeId);
        
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
    }
    
    //
    //  DESC: Render the control
    //
    render( camera )
    {
        this.uiControl.render( camera );
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
    //  DESC: Calculate the head node radius
    //
    calcRadius()
    {
        // Empty by design
    }
}
