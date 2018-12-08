
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

        // Sprite Id incrementor
        this.spriteInc = 0;
    }
    
    //
    //  DESC: Init function for objects that need to be
    //        created after loading the settings
    //
    init()
    {
        // Default camera
        this.camera = new Camera();
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
    //  DESC: create the sprite and provide a unique id number for each one
    //
    createGroup( strategyId, name, count, pos, rot, scale )
    {
        // Make sure the strategy we are looking for is available
        let strategy = this.strategyMap.get( strategyId );
        if( !strategy )
            throw new Error( `Sprite Manager strategy Id can't be found (${strategyId})!` );

        let incReturn = [];

        // Create the requested number of sprites
        for( let i = 0; i < count; ++i )
            incReturn.push( strategy.create( name, ++this.spriteInc, pos, rot, scale ) );

        return incReturn;
    }

    create( strategyId, name, pos, rot, scale )
    {
        // Make sure the strategy we are looking for is available
        let strategy = this.strategyMap.get( strategyId );
        if( !strategy )
            throw new Error( `Sprite Manager strategy Id can't be found (${strategyId})!` );

        return strategy.create( name, ++this.spriteInc, pos, rot, scale );
    }
    
    //
    //  DESC: Delete all the strategy
    //
    clear()
    {
        this.cleanUp();
        
        this.strategyMap.clear();
        this.spriteInc = 0;
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
            strategy.render( this.camera );
    }
}

export var strategyManager = new StrategyManager;
