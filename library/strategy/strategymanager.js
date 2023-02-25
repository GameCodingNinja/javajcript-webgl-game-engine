
// 
//  FILE NAME: strategymanager.js
//  DESC:      Sprite strategy manager singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';

class StrategyManager extends ManagerBase
{
    constructor()
    {
        super();
        
        // Map of unique strategy references
        this.strategyMap = new Map;
        
        // An array of active strategy references
        this.strategyAry = [];
    }
    
    //
    //  DESC: Add strategy which will load it's data from XML node
    //
    addStrategy( strategyId, strategy )
    {
        // Check for duplicate Id's
        if( this.strategyMap.has( strategyId ) )
            throw new Error( `Duplicate strategy id (${strategyId})!` );
        
        // Add the strategy to the map
        this.strategyMap.set( strategyId, strategy );
        
        // Load all the xml's
        // See if there is any files associated with the strategy id in the list table
        // NOTE: Will return an empty strategy if a file is not defined. Will do an 
        // object data search to create a node/sprite. Assumes simple node/sprite only
        return super.load( strategyId, false );
    }
    
    //
    //  DESC: Load strategy data from an xml node
    //
    loadFromNode( strategyId, xmlNode, filePath )
    {
        let strategy = this.strategyMap.get( strategyId );
        
        strategy.loadFromNode( xmlNode, filePath );
    }
    
    //
    //  DESC: activate strategy
    //
    activateStrategy( strategyId )
    {
        let strategy = this.strategyMap.get( strategyId );
        if( strategy )
        {
            let index = this.strategyAry.findIndex( (obj) => obj === strategy );
            if( index === -1 )
                this.strategyAry.push( strategy );
            else
                console.warn( `Strategy is already active (${strategyId})!` );
        }
        else
            throw new Error( `Strategy id can't be found (${strategyId})! Need to add the strategy before you can activate it.` );
        
        return strategy;
    }
    
    //
    //  DESC: deactivate strategy
    //
    deactivateStrategy( strategyId )
    {
        let strategy = this.strategyMap.get( strategyId );
        if( strategy )
        {
            let index = this.strategyAry.findIndex( (obj) => obj === strategy );
            if( index !== -1 )
                this.strategyAry.splice( index, 1 );
            else
                console.warn( `Strategy is not active (${strategyId})!` );
        }
        else
            console.warn( `Strategy id can't be found to deactivate (${strategyId})!` );
        
        return strategy;
    }
    
    //
    //  DESC: delete strategy
    //
    deleteStrategy( strategyGrp )
    {
        let strategyGrpAry = strategyGrp;
        if( !(strategyGrp instanceof Array) )
            strategyGrpAry = [strategyGrp];

        for( let i = 0; i < strategyGrpAry.length; ++i )
        {
            // First deactivate the strategy
            this.deactivateStrategy( strategyGrpAry[i] );

            // Cleanup and delete the strategy
            let strategy = this.strategyMap.get( strategyGrpAry[i] );
            if( strategy )
            {
                strategy.cleanUp();
                this.strategyMap.delete( strategyGrpAry[i] );
            }
            else
                console.warn( `Strategy id can't be found to clean up (${strategyGrpAry[i]})!` );
        }
    }
    
    //
    //  DESC: Get a reference to the strategy
    //
    get( strategyId )
    {
        // Make sure the strategy we are looking for is available
        let strategy = this.strategyMap.get( strategyId );
        if( !strategy )
            throw new Error( `Sprite Manager strategy Id can't be found (${strategyId})!` );
        
        return strategy;
    }
    
    //
    //  DESC: Delete all the strategy
    //
    clear()
    {
        this.cleanUp();
        
        this.strategyMap.clear();
        this.strategyAry = [];
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let each of this.strategyMap.values() )
            each.cleanUp();
    }

    //
    //  DESC: Update the strategy
    //
    update()
    {
        for( let i = 0; i < this.strategyAry.length; i++ )
            this.strategyAry[i].update();
    }

    //
    //  DESC: Transform the strategy
    //
    transform()
    {
        for( let i = 0; i < this.strategyAry.length; i++ )
            this.strategyAry[i].transform();
    }

    //
    //  DESC: Render the strategy
    //
    render( overrideCamera = null )
    {
        for( let i = 0; i < this.strategyAry.length; i++ )
            if( this.strategyAry[i].isVisible() )
                this.strategyAry[i].render( overrideCamera );
    }

    //
    //  DESC: Sort the stratagies based on sort function
    //
    sort( sortFunc = null )
    {
        if( sortFunc )
            this.strategyAry.sort( sortFunc );

        // If sort function is not provided, sort on z order
        // For this to render as expected, sort in desending order. 
        else
            this.strategyAry.sort( 
                (a, b) =>
                {
                    if(a.transPos.z > b.transPos.z)
                        return -1;

                    else if(a.transPos.z < b.transPos.z)
                        return 1;

                    return 0;
                });
    }
}

export var strategyManager = new StrategyManager;
