
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
        super( nodeData );
        
        this.name = nodeData.nodeName;
        this.uiControl = uiControl;
        this.userId = nodeData.userId;
        this.type = defs.ENT_UI_CONTROL;
        this.useSizeForRadiusCalc = nodeData.useSizeForRadiusCalc;
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
    //  DESC: Adjust the size based on the object
    //
    calcSize( size )
    {
        if( this.useSizeForRadiusCalc )
        {
            this._size = this.get().getSize();
            if( this._size )
            {
                if( this._size.w > size.w )
                    size.w = this._size.w;

                if( this._size.h > size.h )
                    size.h = this._size.h;
            }
        }
    }

    // 
    //  DESC: Calculate the radius
    //
    calcRadius()
    {
        // Calculate the radius in squared space. Avoids having to use sqrt
        this.radius = this.get().getSize().getLength() / 2;
    }
}
