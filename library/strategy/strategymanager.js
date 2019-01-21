
// 
//  FILE NAME: strategymanager.js
//  DESC:      Sprite strategy manager singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { assetHolder } from '../utilities/assetholder';
import { Camera } from '../common/camera';

class StrategyManager extends ManagerBase
{
    constructor()
    {
        super();
        
        // Map of unique strategy references
        this.strategyMap = new Map;
        
        // An array of strategy references
        this.strategyAry = [];
    }
    
    //
    //  DESC: Init function for objects that need to be
    //        created after loading the settings
    //
    init()
    {
        // Default camera
        this.defaultCamera = new Camera();
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
            if( index !== -1 )
                console.log( `Strategy is already active (${strategyId})!` );
            else
                this.strategyAry.push( strategy );
        }
        else
            throw new Error( `Strategy id can't be found (%s) (${strategyId})!` );
        
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
                console.log( `Strategy is not active (${strategyId})!` );
            else
                this.strategyAry.splice( index, 1 );
        }
        else
            console.log( `Strategy id can't be found (%s) (${strategyId})!` );
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
        for( let i = 0; i < this.strategyAry.length; i++ )
            this.strategyAry[i].cleanUp();
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
            this.strategyAry[i].render( this.defaultCamera );
    }
}

export var strategyManager = new StrategyManager;
