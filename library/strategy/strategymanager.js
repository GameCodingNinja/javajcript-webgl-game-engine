
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
        this._strategy = this.strategyMap.get( strategyId );
        if( this._strategy )
        {
            this._index = this.strategyAry.findIndex( (obj) => obj === this._strategy );
            if( this._index === -1 )
                this.strategyAry.push( this._strategy );
            else
                console.warn( `Strategy is already active (${strategyId})!` );
        }
        else
            throw new Error( `Strategy id can't be found (${strategyId})! Need to add the strategy before you can activate it.` );
        
        return this._strategy;
    }
    
    //
    //  DESC: deactivate strategy
    //
    deactivateStrategy( strategyId )
    {
        this._strategy = this.strategyMap.get( strategyId );
        if( this._strategy )
        {
            this._index = this.strategyAry.findIndex( (obj) => obj === this._strategy );
            if( this._index !== -1 )
                this.strategyAry.splice( this._index, 1 );
            else
                console.warn( `Strategy is not active (${strategyId})!` );
        }
        else
            console.warn( `Strategy id can't be found to deactivate (${strategyId})!` );
        
        return this._strategy;
    }
    
    //
    //  DESC: delete strategy
    //
    deleteStrategy( strategyGrp )
    {
        this._strategyGrpAry = strategyGrp;
        if( !(strategyGrp instanceof Array) )
            this._strategyGrpAry = [strategyGrp];

        for( this._i = 0; this._i < this._strategyGrpAry.length; ++this._i )
        {
            // First deactivate the strategy
            this.deactivateStrategy( this._strategyGrpAry[this._i] );

            // Cleanup and delete the strategy
            this._strategy = this.strategyMap.get( this._strategyGrpAry[this._i] );
            if( this._strategy )
            {
                this._strategy.cleanUp();
                this.strategyMap.delete( this._strategyGrpAry[this._i] );
            }
            else
                console.warn( `Strategy id can't be found to clean up (${this._strategyGrpAry[this._i]})!` );
        }
    }
    
    //
    //  DESC: Get a reference to the strategy
    //
    get( strategyId )
    {
        // Make sure the strategy we are looking for is available
        this._strategy = this.strategyMap.get( strategyId );
        if( !this._strategy )
            throw new Error( `Sprite Manager strategy Id can't be found (${strategyId})!` );
        
        return this._strategy;
    }
    
    //
    //  DESC: Delete all the strategy
    //
    clear()
    {
        this.cleanUp();
        
        this.strategyMap.clear();
        this.strategyAry.length = 0;
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( this._each of this.strategyMap.values() )
            this._each.cleanUp();
    }

    //
    //  DESC: Update the strategy
    //
    update()
    {
        for( this._i = 0; this._i < this.strategyAry.length; ++this._i )
            this.strategyAry[this._i].update();
    }

    //
    //  DESC: Transform the strategy
    //
    transform()
    {
        for( this._i = 0; this._i < this.strategyAry.length; ++this._i )
            this.strategyAry[this._i].transform();
    }

    //
    //  DESC: Render the strategy
    //
    render( overrideCamera = null )
    {
        for( this._i = 0; this._i < this.strategyAry.length; ++this._i )
            if( this.strategyAry[this._i].isVisible() )
                this.strategyAry[this._i].render( overrideCamera );
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
