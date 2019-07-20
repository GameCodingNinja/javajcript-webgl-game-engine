
//
//  FILE NAME: nodedatalist.js
//  DESC:      Based on how the XML is written, creates a node
//             list so that the Parent/child nodes can be created
//

"use strict";

import { NodeData } from './nodedata';
import * as defs from '../common/defs';

export class NodeDataList
{
    constructor(
        node,
        defGroup = '',
        defObjName = '',
        defId = defs.DEFAULT_ID )
    {
        // Array of the node data
        this.dataAry = [];
        
        let defaultGroup = defGroup;
        let defaultObjName = defObjName;
        let nodeName = '';
        
        let attr = node.getAttribute( 'defaultGroup' );
        if( attr )
            defaultGroup = attr;
        
        attr = node.getAttribute( 'defaultObjectName' );
        if( attr )
            defaultObjName = attr;
        
        attr = node.getAttribute( 'defaultId' );
        if( attr )
            defId = Number(attr);
        
        attr = node.getAttribute( 'name' );
        if( attr )
            nodeName = attr;
        
        this.idCounter = defs.DEFAULT_ID;
        
        let nodeData = new NodeData( node, nodeName, this.idCounter++, defs.DEFAULT_ID, defaultGroup, defaultObjName, defId );
        this.dataAry.push( nodeData );
        
        // Call the recursive function to load the children
        this.loadNode( node, nodeData, defaultGroup, defaultObjName, defId );
    }
    
    // 
    //  DESC: Load the node data recursively
    //
    loadNode( node, nodeData, defaultGroup, defaultObjName, defId )
    {
        for( let i = 0; i < node.children.length; ++i )
        {
            if( node.children[i].nodeName == 'node' )
            {
                let nodeName = '';
                let attr = node.children[i].getAttribute( 'name' );
                if( attr )
                    nodeName = attr;

                let childNodeData = new NodeData( node.children[i], nodeName, this.idCounter++, nodeData.nodeId, defaultGroup, defaultObjName, defId );
                this.dataAry.push( childNodeData );

                // Try to recursively load more children
                this.loadNode( node.children[i], childNodeData, defaultGroup, defaultObjName, defId );
            }
        }
    }
}
