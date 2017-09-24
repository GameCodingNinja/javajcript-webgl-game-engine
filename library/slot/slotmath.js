
// 
//  FILE NAME: slotmath.js
//  DESC:      Class to hold math data
//

"use strict";

import { MathSymbol } from './mathsymbol';
import { StripSet } from './stripset';
import { StripStop } from './stripstop';
import { PayCombo } from './paycombo';
import { PaytableSet } from './paytableset';
import { WeightedTable } from './weightedtable';
import { ValueTable } from './valuetable';
import * as slotDefs from './slotdefs';

export class SlotMath
{
    constructor( group, id )
    {
        // The group the math data is in
        // Mainly used for error reporting for easier identification 
        // of which math file is causing a problem.
        this.group = group;

        // The name of the math id
        this.id = id;
        
        // The name of the payline set id
        this.paylineSetId;

        // The math percentage
        this.percenatge;

        // Map of math symbol set
        this.symbolSetMapMap = new Map;

        // Map of slot strips - Stores a pointer from m_symbolSetMapMap
        this.stripMapAry = new Map;

        // Map of strip sets
        this.stripSetMapAry = new Map;

        // Map of payline combo data
        this.payComboMapAry = new Map;

        // Map of paytable set lists
        this.paytableSetMapAry = new Map;

        // Map of weighted table data
        this.weightedTableMap = new Map;

        // Map of value table data
        this.valueTableMap = new Map;
    }
    
    //
    //  DESC: LGet the symbol set
    //
    getSymbolSet( id )
    {
        let symbSet = this.symbolSetMapMap.get( id );
        if( !symbSet )
            throw new Error( `Math symbol set not found (${this.group}, ${id})!` );

        return symbSet;
    }

    //
    //  DESC: Get the slot strip
    //
    getSlotStrip( id )
    {
        let strip = this.stripMapAry.get( id );
        if( !strip )
            throw new Error( `Slot strip not found (${this.group}, ${id})!` );

        return strip;
    }

    //
    //  DESC: Get the strip set
    //
    getSlotStripSet( id )
    {
        let stripSet = this.stripSetMapAry.get( id );
        if( !stripSet )
            throw new Error( `Strip set not found (${this.group}, ${id})!` );

        return stripSet;
    }

    //
    //  DESC: Get the pay combo set
    //
    getPayComboSet( id )
    {
        let payCombo = this.payComboMapAry.get( id );
        if( !payCombo )
            throw new Error( `Pay combo set not found (${this.group}, ${id})!` );

        return payCombo;
    }

    //
    //  DESC: Get the paytable set
    //
    getPaytableSet( id )
    {
        let paytableSet = this.paytableSetMapAry.get( id );
        if( !paytableSet )
            throw new Error( `Paytable set not found (${this.group}, ${id})!` );

        return paytableSet;
    }

    //
    //  DESC: Get the weighted table
    //
    getWeightedTable( id )
    {
        let weightedTable = this.weightedTableMap.get( id );
        if( !weightedTable )
            throw new Error( `Weighted table not found (${this.group}, ${id})!` );

        return weightedTable;
    }

    //
    //  DESC: Get the value table
    //
    getValueTable( id )
    {
        let valueTable = this.valueTableMap.get( id );
        if( !valueTable )
            throw new Error( `Valuetable not found (${this.group}, ${id})!` );

        return valueTable;
    }

    //
    //  DESC: Load thes slot group data from node
    //
    loadFromNode( node )
    {
        // Get the payline id
        this.paylineSetId = node.getAttribute( 'paylineSetId' );

        // Get the math percentage
        this.percenatge = Number(node.getAttribute( 'percentage' ));

        // Load thes symbol set data from node
        this.loadSymbolSetsFromNode( node );

        // Load the slot strip data from node
        this.loadStripFromNode( node );

        // Load the slot strip set list data from node
        this.loadStripSetListFromNode( node );

        // Load the pay combo data from node
        this.loadPayComboFromNode( node );

        // Load the paytable set list data from node
        this.loadPaytableSetListFromNode( node );

        // Load the weighted table data from node
        this.loadWeightedTableFromNode( node );

        // Load the value table data from node
        this.loadValueTableFromNode( node );
    }

    //
    //  DESC: Load the symbol set data from node
    //
    loadSymbolSetsFromNode( node )
    {
        // Get the node to the symbol set list
        let symbSetNode = node.getElementsByTagName( 'symbolSetList' )[0].children;

        for( let symbLst = 0; symbLst < symbSetNode.length; ++symbLst )
        {
            // Get the symbol set id
            let setId = symbSetNode[symbLst].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.symbolSetMapMap.has( setId ) )
                throw new Error( `Duplicate symbol set name (${setId}, ${this.group})!` );

            // Create a new symbol set map inside of our map
            let symbolSetMap = new Map;
            this.symbolSetMapMap.set( setId, symbolSetMap );

            // Get the wild list node
            let wildLstNode = symbSetNode[symbLst].getElementsByTagName( 'wildSymbolList' );

            // map of wild matches
            let wildMatchesMap = new Map;

            // Load up the wild matches first to feed the constructor
            if( wildLstNode.length )
            {
                // Get the wild node
                let wildNode = wildLstNode[0].children;
                    
                for( let wildLst = 0; wildLst < wildNode.length; ++wildLst )
                {
                    // Get the wild id
                    let wildId = wildNode[wildLst].getAttribute( 'id' );
                    
                    // Check for any duplications
                    if( wildMatchesMap.has( wildId ) )
                        throw new Error( `Duplicate wild symbol in math file (${wildId}, ${this.group})!` );

                    // Add an array that will be filled with symbols that are wild for this id
                    let symbAry = [];
                    wildMatchesMap.set( wildId, symbAry );

                    // Get the wild symbol node
                    let symbNode = wildNode[wildLst].children;
                        
                    for( let symb = 0; symb < symbNode.length; ++symb )
                    {
                        // Get the wild symbol id
                        let id = symbNode[symb].getAttribute( 'id' );

                        // Add to the symbol's wild list
                        symbAry.push( id );
                    }
                }
            }

            // Get the symbol list node
            let symbNode = symbSetNode[symbLst].getElementsByTagName( 'symbolList' )[0].children;

            for( let symb = 0; symb < symbNode.length; ++symb )
            {
                // Get the symbol id
                let symbId = symbNode[symb].getAttribute( 'id' );
                
                // Check for duplicate names
                if( symbolSetMap.has( symbId ) )
                    throw new Error( `Duplicate symbol name (${symbId}, ${this.group})!` );

                // See if this symbol has a wild match
                let wildMatchAry = wildMatchesMap.get( symbId );
                
                // If none exist, create an empty array
                if( wildMatchAry === undefined )
                    wildMatchAry = [];

                // Create the math symbol
                symbolSetMap.set( symbId, new MathSymbol( symbId, wildMatchAry ) );

                // If a wild was found, erase it from the map
                if( wildMatchAry.length )
                    wildMatchesMap.delete( symbId );
            }

            // Check for any dangling wild defines
            if( wildMatchesMap.length )
                throw new Error( `Wild symbol defined but doesn not exist in symbol set (${this.group})!` );
        }
    }

    //
    //  DESC: Load the slot strip data from node
    //        Stores a reference from symbolSetMapMap
    //
    loadStripFromNode( node )
    {
        // Get the node to the math strip list
        let stripNode = node.getElementsByTagName( 'stripList' )[0].children;

        for( let i = 0; i < stripNode.length; ++i )
        {
            // Get the math strip id
            let stripId = stripNode[i].getAttribute( 'id' );

            // Get the symbol set id
            let symbSetId = stripNode[i].getAttribute( 'symbSetId' );

            // Find the symbol set this math strip is using
            let symbolSetMap = this.symbolSetMapMap.get( symbSetId );
            if( symbolSetMap === undefined )
                throw new Error( `Can't find reel strip symbol set name (${symbSetId}, ${this.group})!` );
            
            // Check for duplicate names
            if( this.stripMapAry.has( stripId ) )
                throw new Error( `Duplicate math strip name (${stripId}, ${this.group})!` );

            // Create a new math strip inside the map
            let mathSymbolAry = [];
            this.stripMapAry.set( stripId, mathSymbolAry );
            
            let symbolNode = stripNode[i].children;

            for( let j = 0; j < symbolNode.length; ++j )
            {
                // Get the symbol id
                let symbId = symbolNode[j].getAttribute( 'id' );

                let mathSymbol = symbolSetMap.get( symbId );
                if( mathSymbol === undefined )
                    throw new Error( `Math symbol not found in symbol set (${stripId}, ${this.group})!` );
                
                // Check for a weight
                let weight = 1;
                let attr = symbolNode[j].getAttribute( 'weight' );
                if( attr )
                    weight = Number( attr );
                
                // Add symbol to math strip
                mathSymbolAry.push( new StripStop( mathSymbol, weight ) );
            }
        }
    }

    //
    //  DESC: Load the strip set list data from node
    //
    loadStripSetListFromNode( node )
    {
        // Get the node to the strip set list
        let stripSetNode = node.getElementsByTagName( 'stripSetList' )[0].children;

        for( let set = 0; set < stripSetNode.length; ++set )
        {
            // Get the strip id
            let stripSetId = stripSetNode[set].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.stripSetMapAry.has( stripSetId ) )
                throw new Error( `Duplicate strip set name (${stripSetId}, ${this.group})!` );

            // Create a new strip inside the map
            let stripSetAry = [];
            this.stripSetMapAry.set( stripSetId, stripSetAry );

            // Get the strip node
            let stripNode = stripSetNode[set].children;

            for( let tbl = 0; tbl < stripNode.length; ++tbl )
            {
                // Get the strip id
                let stripId = stripNode[tbl].getAttribute( 'id' );

                // Check that this strip exists in the strip map array
                if( !this.stripMapAry.has( stripId ) )
                    throw new Error( `Strip not found in strip list (${stripId}, ${this.group})!` );
                
                // Get the evaluation symbol indexes. Reels tend to be in succession but wheels can be disbursed.
                let evalSymbIndexAry = [];
                let evalIndexNode = stripNode[tbl].children;
                for( let i = 0; i < evalIndexNode.length; ++i )
                    evalSymbIndexAry.push( Number(evalIndexNode[i].getAttribute( 'index' )) );

                // Add the strip id
                stripSetAry.push( new StripSet( stripId, evalSymbIndexAry ) );
            }
        }
    }

    //
    //  DESC: Load the pay combo data from node
    //
    loadPayComboFromNode( node )
    {
        // Get the node to the strip set list
        let payComboSetLstNode = node.getElementsByTagName( 'comboSetList' );

        if( payComboSetLstNode.length )
        {
            // Get the pay combo set node
            let payComboSetNode = payComboSetLstNode[0].children;
                
            for( let set = 0; set < payComboSetNode.length; ++set )
            {
                // Get the pay combo set id
                let payComboSetId = payComboSetNode[set].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this.payComboMapAry.has( payComboSetId ) )
                    throw new Error( `Duplicate pay combo set name (${payComboSetId}, ${this.group})!` );

                // Create a new pay combo in the map
                let payComboAry = [];
                this.payComboMapAry.set( payComboSetId, payComboAry );

                // Get the pay combo node
                let payComboNode = payComboSetNode[set].children;

                for( let pay = 0; pay < payComboNode.length; ++pay )
                {
                    // Get the symbol
                    let symb = payComboNode[pay].getAttribute( 'symb' );

                    // Get the count
                    let count = Number(payComboNode[pay].getAttribute( 'count' ));

                    // Get the value
                    let award = Number(payComboNode[pay].getAttribute( 'award' ));

                    // Get the value
                    let bonusCode = 0;
                    let attr = payComboNode[pay].getAttribute( 'bonusCode' );
                    if( attr )
                        bonusCode = Number(attr);

                    // Add the combo pay
                    payComboAry.push( new PayCombo( symb, count, award, bonusCode ) );
                }
            }
        }
    }

    //
    //  DESC: Load the paytable set list data from node
    //
    loadPaytableSetListFromNode( node )
    {
        // Get the node to the paytable set list
        let paytableSetNode = node.getElementsByTagName( 'paytableSetList' )[0].children;

        for( let set = 0; set < paytableSetNode.length; ++set )
        {
            // Get the paytable id
            let paytableSetId = paytableSetNode[set].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.paytableSetMapAry.has( paytableSetId ) )
                throw new Error( `Duplicate paytable set name (${paytableSetId}, ${this.group})!` );

            // Create a new paytable inside the map
            let paytableSetAry = [];
            this.paytableSetMapAry.set( paytableSetId, paytableSetAry );
            
            // Get the paytable node
            let paytableNode = paytableSetNode[set].children;

            for( let tbl = 0; tbl < paytableNode.length; ++tbl )
            {
                // Get the paytable type
                let paytableType = slotDefs.EP_PAYLINE;
                if( paytableNode[tbl].getAttribute('type') === 'scatter' )
                    paytableType = slotDefs.EP_SCATTER;

                // Get the paytable id
                let paytableStrId = paytableNode[tbl].getAttribute( 'id' );

                // Check that this pay combo exists in the pay combo map array
                if( !this.payComboMapAry.has( paytableStrId ) )
                    throw new Error( `Pay combo not found in paytable list (${paytableStrId}, ${this.group})!` );

                // Add the paytable id
                paytableSetAry.push( new PaytableSet( paytableType, paytableStrId ) );
            }
        }
    }

    //
    //  DESC: Load the weighted table data from node
    //
    loadWeightedTableFromNode( node )
    {
        // Get the node to the weighted table list
        let weightedTableLstNode = node.getElementsByTagName( 'weightedTableList' );
        
        if( weightedTableLstNode.length )
        {
            // Get the weighted table node
            let weightedTableNode = weightedTableLstNode[0].children;
                
            for( let set = 0; set < weightedTableNode.length; ++set )
            {
                // Get the weighted table id
                let weightedTableId = weightedTableNode[set].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this.weightedTableMap.has( weightedTableId ) )
                    throw new Error( `uplicate weighted table name (${weightedTableId}, ${this.group})!` );

                let totalWeight = 0;
                let weightAry = [];
                let valueAry = [];
                
                // Get the table node
                let tableNode = weightedTableNode[set].children;

                for( let tbl = 0; tbl < tableNode.length; ++tbl )
                {
                    // Get the weight
                    let weight = Number(tableNode[tbl].getAttribute( 'weight' ));

                    // Get the value
                    let value = Number(tableNode[tbl].getAttribute( 'value' ));

                    totalWeight += weight;
                    weightAry.push( weight );
                    valueAry.push( value );
                }

                // Create a new weighted table inside the map
                this.weightedTableMap.set( weightedTableId, new WeightedTable( totalWeight, weightAry, valueAry ) );
            }
        }
    }

    //
    //  DESC: Load the value table data from node
    //
    loadValueTableFromNode( node )
    {
        // Get the node to the value table list
        let valueTableLstNode = node.getElementsByTagName( 'valueTableList' );
        
        if( valueTableLstNode.length )
        {
            // Get the weighted table node
            let valueTableNode = valueTableLstNode[0].children;
            
            for( let set = 0; set < valueTableNode.length; ++set )
            {
                // Get the value table id
                let valueTableId = valueTableNode[set].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this.valueTableMap.has( valueTableId ) )
                    throw new Error( `uplicate value table name (${valueTableId}, ${this.group})!` );

                let valueAry = [];
                
                // Get the table node
                let tableNode = valueTableNode[set].children;

                for( let tbl = 0; tbl < tableNode.length; ++tbl )
                {
                    // Get the value
                    let value = Number(tableNode[tbl].getAttribute( 'value' ));

                    // Add table element
                    valueAry.push( value );
                }

                // Create a new value table inside the map
                this.valueTableMap.set( valueTableId, new ValueTable( valueAry ) );
            }
        }
    }
}
