
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
            throw new Error( `Sprite Manager strategy Id can't be found (${strategyId}).` );
        
        return strategy;
    }
    
    
    
    /************************************************************************
    *    desc:  create the sprite and provide a unique id number for each one
    ************************************************************************/
    /*const std::vector<int> & CSpriteStrategyMgr::Create(
        const std::string & strategyId,
        const std::string & name,
        const int count,
        const CPoint<CWorldValue> & pos,
        const CPoint<float> & rot,
        const CPoint<float> & scale )
    {
        // Make sure the group we are looking has been defined in the list table file
        auto mapIter = m_pStrategyMap.find( strategyId );
        if( mapIter == m_pStrategyMap.end() )
            throw NExcept::CCriticalException("Sprite Manager Strategy Group Find Error!",
                boost::str( boost::format("Sprite Manager strategy id can't be found (%s).\n\n%s\nLine: %s") 
                    % strategyId % __FUNCTION__ % __LINE__ ));

        m_incReturn.clear();
        m_incReturn.reserve(count);

        // Create the requested number of sprites
        for( int i = 0; i < count; ++i )
        {
            m_incReturn.push_back(++m_SpriteInc);
            mapIter->second->Create( name, m_SpriteInc, pos, rot, scale );
        }

        return m_incReturn;

    }   // Create

    int CSpriteStrategyMgr::Create(
        const std::string & strategyId,
        const std::string & name,
        const CPoint<CWorldValue> & pos,
        const CPoint<float> & rot,
        const CPoint<float> & scale )
    {
        // Make sure the group we are looking has been defined in the list table file
        auto mapIter = m_pStrategyMap.find( strategyId );
        if( mapIter == m_pStrategyMap.end() )
            throw NExcept::CCriticalException("Sprite Manager Strategy Group Find Error!",
                boost::str( boost::format("Sprite Manager strategy id can't be found (%s).\n\n%s\nLine: %s") 
                    % strategyId % __FUNCTION__ % __LINE__ ));

        mapIter->second->Create( name, ++m_SpriteInc, pos, rot, scale );

        return m_SpriteInc;

    }   // Create */
    
    
    
    
    
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
