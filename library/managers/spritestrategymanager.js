
// 
//  FILE NAME: spritestrategymanager.js
//  DESC:      Sprite strategy manager singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { assetHolder } from '../utilities/assetholder';

class SpriteStrategyManager extends ManagerBase
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
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.init();
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
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.miscProcess();
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
    transform( object = null )
    {
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.transform( object );
    }

    //
    //  DESC: Render the strategy
    //
    render( matrix )
    {
        for( let [ key, strategy ] of this.strategyMap.entries() )
            strategy.render( matrix );
    }
}

export var spriteStrategyManager = new SpriteStrategyManager;
