
// 
//  FILE NAME: sector.js
//  DESC:      Class the creates & renders all the sector nodess
//

"use strict";

import { ObjectTransform } from '../common/objecttransform';
import { NodeDataList } from '../node/nodedatalist';
import * as nodeFactory from '../node/nodefactory';

export class Sector extends ObjectTransform
{
    constructor()
    {
        super(true);
        
        // node allocation array
        this.nodeAry = [];
        
        // Map of nodes that have names
        this.nodeMap = new Map;
    }
    
    //
    //  DESC: Load the data from xml node
    //
    loadFromNode( xmlNode, filePath )
    {
        let defaultGroup = '';
        let defaultObjName = '';
        let defaultId = -1;
        
        let attr = xmlNode.getAttribute( 'defaultGroup' );
        if( attr )
            defaultGroup = attr;
        
        attr = xmlNode.getAttribute( 'defaultObjectName' );
        if( attr )
            defaultObjName = attr;
        
        attr = xmlNode.getAttribute( 'defaultId' );
        if( attr )
            defaultId = Number(attr);
        
        let sectorNode = xmlNode.children;

        for( let i = 0; i < sectorNode.length; ++i )
        {
            // Allocate the node data list to load this node
            let nodeAry = new NodeDataList( sectorNode[i], defaultGroup, defaultObjName, defaultId ).dataAry;
            
            // Build the node list
            let headNode = null;
            for( let j = 0; j < nodeAry.length; j++ )
            {
                let node = nodeFactory.create( nodeAry[j], nodeAry[j].id );

                if( headNode === null )
                    headNode = node;

                else if( !headNode.addNode( node, nodeAry[j].nodeName ) )
                    throw new Error( `Parent node not found or node does not support adding children (${nodeAry[i].nodeName}, ${node.parentId}, ${filePath})!` );
            }
            
            // Add to the node array
            this.nodeAry.push( headNode );
            
            // If it has a name, add it to the map for easy retrieval
            if( headNode.nodeName )
                this.nodeMap.set( headNode.nodeName, headNode );
        }
    }
    
    //
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Create any font strings
        // This allows for delayed VBO create so that the fonts can be allocated during a load screen
        for( let i = 0; i < this.nodeAry.length; ++i )
            this.nodeAry[i].init();
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.nodeAry.length; ++i )
            this.nodeAry[i].cleanUp();
    }
    
    //
    //  DESC: Get node by name
    //
    get( name )
    {
        let node = this.nodeMap.get( name );
        if( !node )
            throw new Error( `Sprite name can't be found (${name})!` );
        
        return node;
    }
    
    //
    //  DESC: Destroy this sector
    //
    destroy()
    {
        this.cleanUp();
        this.nodeAry = [];
    }

    //
    //  DESC: Update the nodess
    //
    update()
    {
        for( let i = 0; i < this.nodeAry.length; ++i )
            this.nodeAry[i].update();
    }

    //
    //  DESC: Transform the nodes
    //
    transform()
    {
        super.transform();
        
        for( let i = 0; i < this.nodeAry.length; ++i )
            this.nodeAry[i].transform( this );
    }

    //
    //  DESC: Render the nodess
    //
    render( camera )
    {
        for( let i = 0; i < this.nodeAry.length; ++i )
            this.nodeAry[i].render( camera );
    }
}
