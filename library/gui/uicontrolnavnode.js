
// 
//  FILE NAME: uicontrolnavnode.js
//  DESC:      UI Control Navigation Node
//

"use strict";
import * as defs from '../common/defs';

export class UIControlNavNode
{
    constructor( uiControl = null )
    {
        // UI Control pointer
        this.uiControl = uiControl;

        // Navigation node pointers
        this.upNode = null;
        this.downNode = null;
        this.leftNode = null;
        this.rightNode = null;
    }
    
    // 
    //  DESC: Set/Get Right Node
    //
    setNode( navId, node )
    {
        if( navId === defs.ENAV_NODE_UP )
            this.upNode = node;
        else if( navId === defs.ENAV_NODE_DOWN )
            this.downNode = node;
        else if( navId === defs.ENAV_NODE_LEFT )
            this.leftNode = node;
        else if( navId === defs.ENAV_NODE_RIGHT )
            this.rightNode = node;
    }

    getNode( navNode )
    {
        if( navNode === defs.ENAV_NODE_UP )
            return this.upNode;
        else if( navNode === defs.ENAV_NODE_DOWN )
            return this.downNode;
        else if( navNode === defs.ENAV_NODE_LEFT )
            return this.leftNode;
        else if( navNode === defs.ENAV_NODE_RIGHT )
            return this.rightNode;

        return null;
    }
}
