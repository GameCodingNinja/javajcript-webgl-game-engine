
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
    addStrategy( strategyId, strategy, finishCallback )
    {
        // Check for duplicate Id's
        if( this.strategyMap.has( strategyId ) )
            throw new Error( `Duplicate strategy id (${strategyId})!` );
        
        // Add the strategy to the map
        this.strategyMap.set( strategyId, strategy );
        
        // Load all the xml's
        super.load( strategyId, finishCallback );
    }
    
    //
    //  DESC: Load strategy data from an xml node
    //
    loadFromNode( strategyId, node, filePath, finishCallback )
    {
        let strategy = this.strategyMap.get( strategyId );
        
        strategy.loadFromNode( strategyId, node, filePath, this.downloadFile.bind(this), finishCallback );
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
                console.log( `Strategy is already active (${strategyId})!` );
        }
        else
            throw new Error( `Strategy id can't be found (${strategyId})!` );
        
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
                console.log( `Strategy is not active (${strategyId})!` );
        }
        else
            console.log( `Strategy id can't be found to deactivate (${strategyId})!` );
        
        return strategy;
    }
    
    //
    //  DESC: delete strategy
    //
    deleteStrategy( strategyGrp )
    {
        for( let i = 0; i < strategyGrp.length; ++i )
        {
            // First deactivate the strategy
            this.deactivateStrategy( strategyGrp[i] );

            // Cleanup and delete the strategy
            let strategy = this.strategyMap.get( strategyGrp[i] );
            if( strategy )
            {
                strategy.cleanUp();
                this.strategyMap.delete( strategyGrp[i] );
            }
            else
                console.log( `Strategy id can't be found to clean up (${strategyGrp[i]})!` );
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
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.cleanUp();
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
    render()
    {
        for( let i = 0; i < this.strategyAry.length; i++ )
            this.strategyAry[i].render();
    }
}

export var strategyManager = new StrategyManager;
