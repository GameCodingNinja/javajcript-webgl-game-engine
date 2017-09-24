
//
//  FILE NAME: slotmathmanager.js
//  DESC:      Singlton for managing slot math data
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { assetHolder } from '../utilities/assetholder';
import { SlotMath } from './slotmath';
import { PaylineSet } from './paylineset';

class SlotMathManager extends ManagerBase
{
    constructor()
    {
        super();
        
        // Map of a map of all the reel group data
        this.slotMathMapMap = new Map;

        // Payline description
        this.paylineSetMap = new Map;
    }
    
    //
    //  DESC: Get the symbol set view data
    //
    getSlotMath( group, id )
    {
        // Get the group map
        let groupMap = this.slotMathMapMap.get( group );
        if( groupMap !== undefined )
        {
            let slotMath = groupMap.get( id );
            if( slotMath )
                return slotMath;
            else
                throw new Error( `Slot Math name can't be found (${group}, ${name})!` );
        }
        else
            throw new Error( `Slot Math group can't be found (${group}, ${name})!` );
        
        return null;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry, finishCallback )
    {
        super.loadGroup( 'Slot math', this.slotMathMapMap, groupAry, finishCallback );
    }
    
    //
    //  DESC: Load all slot math data from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the id
        let id = node.getAttribute( "id" );
    
        // Get the group map
        let groupMap = this.slotMathMapMap.get( group );
        
        // Check for duplicate names
        if( groupMap.has(id) )
            throw new Error( `Duplicate math group id (${id}, ${group}, ${filePath})!` );
        
        // Allocate the math group data to the map
        let slotMath = new SlotMath(group, id);
        groupMap.set( id, slotMath );
        
        // Load the data from node
        slotMath.loadFromNode( node );
    }

    //
    //  DESC: Load the payline configuration from XML file
    //
    loadPaylineSetFromNode( node )
    {
        // Get the node to the payline set list
        let paylineSetNode = node.children;

        for( let i = 0; i < paylineSetNode.length; ++i )
        {
            // Get the id
            let id = paylineSetNode[i].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.paylineSetMap.has( id ) )
                throw new Error( `Duplicate payline set id (${id}, ${this.group})!` );

            let payline = new PaylineSet;
            this.paylineSetMap.set( id, payline );
            
            // Get the line nodes
            let lineNode = paylineSetNode[i].getElementsByTagName( 'line' );

            for( let j = 0; j < lineNode.length; ++j )
            {
                let lineAry = [];
                payline.line.push( lineAry );
                
                for( let w = 0; w < lineNode[j].attributes.length; ++w )
                    lineAry.push( Number(lineNode[j].attributes[w].value) );
            }
            
            // Get the scatter nodes
            let scatterNode = paylineSetNode[i].getElementsByTagName( 'scatter' );

            for( let j = 0; j < scatterNode.length; ++j )
            {
                let scatterAry = [];
                payline.scatter.push( scatterAry );
                
                for( let w = 0; w < scatterNode[j].attributes.length; ++w )
                    scatterAry.push( Number(scatterNode[j].attributes[w].value) );
            }
        }
    }

    //
    //  DESC: Get the payline set
    //
    getPaylineSet( id )
    {
        let paylineSet = this.paylineSetMap.get( id );
        if( !paylineSet )
            throw new Error( `Payline Set id can't be found (${this.group}, ${id})!` );

        return paylineSet;
    }
    
    //
    //  DESC: Free a symbol group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Slot math group name can't be found (${group})!` );

            // Get the group map
            if( this.slotMathMapMap.has( group ) )
                this.slotMathMapMap.delete( group );
        }
    }
    
    //
    //  DESC: Free the payline set
    //
    freePaylineSet()
    {
        this.paylineSetMap.clear();
    }
    
    //
    //  DESC: Clear out all the data
    //
    clear()
    {
        this.freePaylineSet();
        this.slotMathMapMap.clear();
    }
}

export var slotMathManager = new SlotMathManager;
