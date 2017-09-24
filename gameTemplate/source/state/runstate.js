
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
import { Sprite2D } from '../../../library/2d/sprite2d';
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
        
        /*let pegOffset = [
            [-800, 320],[-640, 320],[-480, 320],[-320, 320],[-160, 320],[0, 320],
            [160, 320],[320, 320],[480, 320],[640, 320],[800, 320],
            
            [-720, 160],[-560, 160],[-400, 160],[-240, 160],[-80, 160],
            [80, 160],[240, 160],[400, 160],[560, 160],[720, 160],
            
            [-800, 0],[-640, 0],[-480, 0],[-320, 0],[-160, 0],[0, 0],
            [160, 0],[320, 0],[480, 0],[640, 0],[800, 0],

            [-720, -160],[-560, -160],[-400, -160],[-240, -160],[-80, -160],
            [80, -160],[240, -160],[400, -160],[560, -160],[720, -160],

            [-800, -320],[-640, -320],[-480, -320],[-320, -320],[-160, -320],[0, -320],
            [160, -320],[320, -320],[480, -320],[640, -320],[800, -320],
        ];
        
        this.pegAry = [];
        let pegSpriteData = objectDataManager.getData( '(run)', 'peg' );
        
        for( let i = 0; i < pegOffset.length; ++i )
        {
            let peg = new Sprite2D( pegSpriteData );
            peg.setPosXYZ( pegOffset[i][0], pegOffset[i][1], 0 );
            peg.initPhysics();
            peg.transform();
            
            this.pegAry.push( peg );
        }*/

        
        this.fallObjects = [];
        
        for( let i = 0; i < 20; ++i )
            this.fallObjects.push(
                this.generateObj( i % 5,
                genFunc.randomInt(-700,700),
                genFunc.randomInt(600,1000),
                genFunc.randomInt(0,360) * defs.DEG_TO_RAD ) );
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
    }
    
    generateObj( type, offsetX, offsetY, rot )
    {
        let object;
        
        if( type === 0 )
        {
            object = new Sprite2D( objectDataManager.getData( '(run)', 'triangle_blue' ) );
        }
        else if( type === 1 )
        {
            object = new Sprite2D( objectDataManager.getData( '(run)', 'triangle_green' ) );
        }
        else if( type === 2 )
        {
            object = new Sprite2D( objectDataManager.getData( '(run)', 'circle_blue' ) );
        }
        else if( type === 3 )
        {
            object = new Sprite2D( objectDataManager.getData( '(run)', 'circle_green' ) );
        }
        else
        {
            object = new Sprite2D( objectDataManager.getData( '(run)', 'square_red' ) );
            object.setScaleXYZ( 0.9, 0.9, 1 );
        }
        
        object.setPosXYZ( offsetX, offsetY, 0 );
        object.setRotXYZ( 0, 0, rot );
        object.initPhysics();
        
        return object;
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
        {
            spriteStrategyManager.update();
            
            for( let i = 0; i < this.fallObjects.length; ++i )
            {
                this.fallObjects[i].physicsUpdate();
                
                if( this.fallObjects[i].pos.y < -600 )
                    this.fallObjects[i].physicsComponent.setTransform(
                        genFunc.randomInt(-700,700),
                        genFunc.randomInt(600,1000),
                        genFunc.randomInt(0,360) * defs.DEG_TO_RAD,
                        true );
            }
        }
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        spriteStrategyManager.transform();
        
        for( let i = 0; i < this.fallObjects.length; ++i )
            this.fallObjects[i].transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        super.preRender();
        
        let matrix = device.orthographicMatrix;
        
        spriteStrategyManager.render( matrix );

        for( let i = 0; i < this.fallObjects.length; ++i )
            this.fallObjects[i].render( matrix );
        
        //for( let i = 0; i < this.pegAry.length; ++i )
        //    this.pegAry[i].render( matrix );
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    postRender()
    {
        super.postRender();
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
}
