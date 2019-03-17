
// 
//  FILE NAME: physicsworldmanager.js
//  DESC:      Physics manager class singleton
//

"use strict";

import { ManagerBase } from '../managers/managerbase';
import { PhysicsWorld2D } from './physicsworld2d';
import { PhysicsWorld3D } from './physicsworld3d';

const LOAD_2D = 0;
const LOAD_3D = 1;

class PhysicsWorldManager extends ManagerBase
{
    constructor()
    {
        super();
        
        this.worldMap = new Map;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadWorldGroup2D( group, finishCallback )
    {
        this.loadWorldGroup( LOAD_2D, group, finishCallback );
    }
    
    loadWorldGroup3D( group, finishCallback )
    {
        this.loadWorldGroup( LOAD_3D, group, finishCallback );
    }
    
    loadWorldGroup( loadType, group, finishCallback )
    {
        // Make sure the group we are looking for has been defined in the list table file
        let pathAry = this.listTableMap.get( group );
        if( pathAry !== undefined )
        {
            // Load the group data if it doesn't already exist
            if( this.worldMap.get( group ) === undefined )
            {
                // Create a new physics world inside of our map
                if( loadType === LOAD_2D )
                    this.worldMap.set( group, new PhysicsWorld2D );
                else
                    this.worldMap.set( group, new PhysicsWorld3D );

                // There will only be one xml per physics world
                let filePath = pathAry[0];
                
                this.downloadFile( 'xml', group, filePath, finishCallback,
                    ( group, xmlNode, filePath, finishCallback ) => 
                    {
                        // Load from an xml node
                        this.loadFromNode( group, xmlNode, filePath );
                    });
                
                // If there's nothing to load, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Physics world group has alread been loaded (${group})!` );
            }
        }
        else
        {
            throw new Error( `Physics world list group name can't be found (${group})!` );
        }
    }
    
    //
    //  DESC: Load from an xml node
    //
    loadFromNode( group, node, filePath )
    {
        // Get the physics world
        let world = this.worldMap.get( group );
        if( world === undefined )
            throw new Error( `Physics World doesn't exist (${group}, ${filePath})!` );
        
        world.loadFromNode( node );
    }
    
    //
    //  DESC: Get the physics world
    //
    getWorld( group )
    {
        let world = this.worldMap.get( group );
        if( world === undefined )
            throw new Error( `Physics World doesn't exist (${group})!` );

        return world;
    }
    
    //
    //  DESC: Destroy the physics world
    //
    destroyWorld( group )
    {
        this.worldMap.delete( group );
    }
}

export var physicsWorldManager = new PhysicsWorldManager;
