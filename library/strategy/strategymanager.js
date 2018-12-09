
// 
//  FILE NAME: strategymanager.js
//  DESC:      Sprite strategy manager singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { assetHolder } from '../utilities/assetholder';
import { Camera } from '../utilities/camera';

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
    //  DESC: Load strategy data from an xml node
    //
    load( strategyId, spriteStrategy, finishCallback )
    {
        // Check for duplicate Id's
        if( this.strategyMap.has( strategyId ) )
            throw new Error( `Duplicate strategy id (${strategyId})!` );
        
        // Add the strategy to the map
        this.strategyMap.set( strategyId, spriteStrategy );
        
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
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.update();
    }

    //
    //  DESC: Transform the strategy
    //
    transform()
    {
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.transform();
    }

    //
    //  DESC: Render the strategy
    //
    render()
    {
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.render( this.defaultCamera );
    }
}

export var strategyManager = new StrategyManager;
