
// 
//  FILE NAME: runstate.js
//  DESC:      RunState Class State
//

"use strict";

import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { spriteStrategyManager } from '../../../library/managers/spritestrategymanager';
import { BasicStageStrategy2D } from '../../../library/2d/basicstagestrategy2d';
import { BasicSpriteStrategy2D } from '../../../library/2d/basicspritestrategy2d';
import { device } from '../../../library/system/device';
import { CommonState } from './commonstate';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

export class RunState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_RUN, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.physicsWorld = physicsWorldManager.getWorld( "(game)" );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === defs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.detail.arg[0] === defs.ETC_BEGIN )
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree'] );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        spriteStrategyManager.clear();
        
        objectDataManager.freeGroup( ['(run)'] );
        
        physicsWorldManager.destroyWorld( "(game)" );
    }
    
    // 
    //  DESC: Handle the physics
    //
    physics()
    {
        if( !menuManager.active )
            this.physicsWorld.variableTimeStep();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        if( !menuManager.active )
            spriteStrategyManager.update();
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        spriteStrategyManager.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        super.render();
        
        let matrix = device.orthographicMatrix;
        
        spriteStrategyManager.render( matrix );
        
        menuManager.render();
    }
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( ['(run)'], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( ['(run)'], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( ['(run)'], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(run)'], callback ) );

    // Load the physics list table and group
    loadManager.add(
        ( callback ) =>
        {
            genFunc.downloadFile( 'xml', 'data/objects/2d/physics/physicsListTable.lst',
                ( xmlNode ) =>
                {
                    // Load the object data list table
                    physicsWorldManager.loadListTable( xmlNode );

                    // Load the object data XML's
                    physicsWorldManager.loadWorldGroup2D( '(game)', callback );
                });
        });
        
    // Create the basic stage strategy
    loadManager.add(
        ( callback ) => spriteStrategyManager.load( '(stage1)', new BasicStageStrategy2D, callback ) );

    // Create the basic sprite strategy
    loadManager.add(
        ( callback ) => spriteStrategyManager.load( '(sprite)', new BasicSpriteStrategy2D, callback ) );

    // Create the ball sprites
    loadManager.add(
        ( callback ) => 
        {
            let sprites = ['triangle_blue', 'triangle_green', 'circle_blue', 'circle_green', 'circle_red', 'square_red'];
        
            for( let i = 0; i < 24; ++i )
                spriteStrategyManager.create('(sprite)', sprites[i % 6] );
            
            callback()
        } );
}
