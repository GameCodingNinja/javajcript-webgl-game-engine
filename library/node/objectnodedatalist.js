
//
//  FILE NAME: objectnodedatalist.js
//  DESC:      Based on how the XML is written, creates a node
//             list so that the Parent/child nodes can be created
//

"use strict";

import { ObjectNodeData } from './objectnodedata';
import * as defs from '../common/defs';

export class ObjectNodeDataList
{
    constructor(
        xmlNode,
        defGroup = '',
        defObjName = '',
        userId = defs.DEFAULT_ID )
    {
        // Array of the node data
        this.dataAry = [];
        
        let defaultGroup = defGroup;
        let defaultObjName = defObjName;
        let nodeName = '';
        
        let attr = xmlNode.getAttribute( 'defaultGroup' );
        if( attr )
            defaultGroup = attr;
        
        attr = xmlNode.getAttribute( 'defaultObjectName' );
        if( attr )
            defaultObjName = attr;
        
        attr = xmlNode.getAttribute( 'defaultId' );
        if( attr )
            userId = Number(attr);
        
        // Get the sprite's unique id number
        attr = xmlNode.getAttribute( "id" );
        if( attr )
            userId = Number(attr);
        
        attr = xmlNode.getAttribute( 'name' );
        if( attr )
            nodeName = attr;
        
        this.idCounter = defs.DEFAULT_ID;
        
        let nodeData = new ObjectNodeData( xmlNode, nodeName, this.idCounter++, defs.DEFAULT_ID, defaultGroup, defaultObjName, userId );
        this.dataAry.push( nodeData );
        
        // Call the recursive function to load the children
        this.loadNode( xmlNode, nodeData, defaultGroup, defaultObjName, userId );
    }
    
    // 
    //  DESC: Load the node data recursively
    //
    loadNode( xmlNode, nodeData, defaultGroup, defaultObjName, userId )
    {
        for( let i = 0; i < xmlNode.children.length; ++i )
        {
            if( xmlNode.children[i].nodeName == 'node' )
            {
                let nodeName = '';
                let attr = xmlNode.children[i].getAttribute( 'name' );
                if( attr )
                    nodeName = attr;

                let childNodeData = new ObjectNodeData( xmlNode.children[i], nodeName, this.idCounter++, nodeData.nodeId, defaultGroup, defaultObjName, userId );
                this.dataAry.push( childNodeData );

                // Try to recursively load more children
                this.loadNode( xmlNode.children[i], childNodeData, defaultGroup, defaultObjName, userId );
            }
        }
    }
}
