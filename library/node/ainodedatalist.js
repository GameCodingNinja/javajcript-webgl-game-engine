
//
//  FILE NAME: ainodedatalist.js
//  DESC:      Based on how the XML is written, creates a node
//             list so that the Parent/child nodes can be created
//

"use strict";

import { AINodeData } from './ainodedata';
import * as defs from '../common/defs';

export class AINodeDataList
{
    constructor( xmlNode )
    {
        // Array of the node data
        this.dataAry = [];
        
        this.idCounter = defs.DEFAULT_ID;
        
        let nodeData = new AINodeData( xmlNode, this.idCounter++, defs.DEFAULT_ID );
        this.dataAry.push( nodeData );
        
        // Call the recursive function to load the children
        this.loadNode( xmlNode, nodeData );
    }
    
    // 
    //  DESC: Load the node data recursively
    //
    loadNode( xmlNode, nodeData )
    {
        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            if( xmlNode.children[i].nodeName == 'node' )
            {
                let childNodeData = new AINodeData( xmlNode.children[i], this.idCounter++, nodeData.nodeId );
                this.dataAry.push( childNodeData );

                // Try to recursively load more children
                this.loadNode( xmlNode.children[i], childNodeData );
            }
        }
    }
}
