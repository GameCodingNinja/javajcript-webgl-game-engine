
// 
//  FILE NAME: pachinkochallengestate.js
//  DESC:      Pachinko Class State
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
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
import { Sprite2D } from '../../../library/2d/sprite2d';
import { Point } from '../../../library/common/point';
import { settings } from '../../../library/utilities/settings';
import { device } from '../../../library/system/device';
import { CommonState } from './commonstate';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

const stateGroup    = '(pachinko)',
      SPRITE_PEG    = -2,
      STRAWBERRY    = 0;

export class PachinkoChallengeState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_PACHINKO_CHALLENGE, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.physicsWorld = physicsWorldManager.getWorld( "(game)" );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Add the contact listeners
        this.physicsWorld.world.on( 'begin-contact', this.beginContact.bind(this) );
        this.physicsWorld.world.on( 'end-contact', this.endContact.bind(this) );
        this.physicsWorld.world.on( 'remove-fixture', this.removeFixture.bind(this) );
        
        // Reference to the win meter
        this.winMeter = null;
        
        // Allocate a reuable position/rotation variables to keep garbadge collection down
        this.pos = new Point;
        this.rot = new Point;
        
        // Array of ball strings
        this.ballStrAry = ['triangle_blue', 'triangle_green', 'triangle_red',
                           'triangle_blue', 'triangle_green', 'triangle_red',
                           'circle_blue', 'circle_green', 'circle_red',
                           'circle_blue', 'circle_green', 'circle_red',
                           'circle_blue', 'circle_green', 'circle_red',
                           'square_blue', 'square_green', 'square_red'];
                    
        // Multiplier positions
        this.multiXPosAllAry = [-640,-480,-320,-160,0,160,320,480,640];
        
        // A multidimensional to hold the spots to randomly place the multiplier based on it's current position.
        this.multiXPosAry = [];
        this.multiXPosAry.push( [-160,0,160,320,480,640] );
        this.multiXPosAry.push( [0,160,320,480,640] );
        this.multiXPosAry.push( [160,320,480,640] );
        this.multiXPosAry.push( [-640,320,480,640] );
        this.multiXPosAry.push( [-640,-480,480,640] );
        this.multiXPosAry.push( [-640,-480,-320,640] );
        this.multiXPosAry.push( [-640,-480,-320,-160] );
        this.multiXPosAry.push( [-640,-480,-320,-160,0] );
        this.multiXPosAry.push( [-640,-480,-320,-160,0,160] );
        
        // get the sprite strategy
        this.spriteStrategy = spriteStrategyManager.get( '(sprite)' );
        
        // Sprite Id incrementor
        this.spriteInc = 0;
        
        // Multiplier index position
        this.multiIndexPos = 0;
        
        // Multiplier value
        this.multiplier = 1;
        
        // Total win
        this.totalWin = 0;
        
        // The data used to create the strawberry sprite
        this.strawberryData = this.spriteStrategy.getData( 'strawberry' );
        
        // get the multiplier sprite
        this.multiSprite = spriteStrategyManager.get( '(stage1)' ).get( 'multiplier' );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event.type === 'mouseup' && !menuManager.isMenuActive() )
        {
            // Get the spot on the screen they clicked
            let ratio = 1.0 / settings.orthoAspectRatio.h;
            this.pos.y = 600;
            this.pos.x = (ratio * (event.clientX + eventManager.mouseOffsetX)) - settings.defaultSize_half.w;
            
            // Set a random rotation
            this.rot.z = genFunc.randomInt(0, 350) * defs.DEG_TO_RAD;

            // Create the ball
            this.spriteStrategy.create(
                this.ballStrAry[genFunc.randomInt(0, this.ballStrAry.length-1)], ++this.spriteInc, this.pos, this.rot );
        }
        else if( event instanceof CustomEvent )
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
        menuManager.activateTree( ['pause_tree', 'base_game_tree'] );
        
        // Do any strategy inits mostly for fonts
        spriteStrategyManager.init();
        
        // Get the win meter
        this.winMeter = menuManager.getMenuControl( 'base_game_ui', 'win_meter' );
        this.winMeter.clear();
        
        // Create the multiplier
        this.multiIndexPos = genFunc.randomInt(0, this.multiXPosAllAry.length-1);
        this.strawberryData.pos.x = this.multiXPosAllAry[this.multiIndexPos];
        this.spriteStrategy.create( 'strawberry', STRAWBERRY );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Remove the contact listener
        this.physicsWorld.world.off( 'begin-contact', this.beginContact.bind(this) );
        this.physicsWorld.world.off( 'end-contact', this.endContact.bind(this) );
        this.physicsWorld.world.off( 'remove-fixture', this.removeFixture.bind(this) );
        
        unload();
    }
    
    // 
    //  DESC: Handle the physics
    //
    physics()
    {
        if( !menuManager.isMenuActive() )
            this.physicsWorld.variableTimeStep();
    }
    
    // 
    //  DESC: Handle the misc processes
    //
    miscProcess()
    {
        if( !menuManager.isMenuActive() )
            spriteStrategyManager.miscProcess();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        if( !menuManager.isMenuActive() )
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
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        super.preRender();
        
        let matrix = device.orthographicMatrix;
        
        spriteStrategyManager.render( matrix );
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    postRender()
    {
        super.postRender();
    }
    
    // 
    //  DESC: Called when two fixtures begin to touch
    //
    beginContact( contact )
    {
        let spriteA = contact.m_fixtureA.m_userData;
        let spriteB = contact.m_fixtureB.m_userData;
        
        if( spriteA && spriteB )
        {
            if( spriteA.id === SPRITE_PEG )
                spriteA.setFrame(1);

            else if( spriteB.id === SPRITE_PEG )
                spriteB.setFrame(1);
            
            else if( (spriteA.id == STRAWBERRY) || (spriteB.id == STRAWBERRY) )
            {
                // Delete the old strawberry
                this.spriteStrategy.postCommand( defs.ESSC_DELETE_SPRITE, STRAWBERRY );
                this.multiplier++;
                
                // Create a new one
                let posAry = this.multiXPosAry[this.multiIndexPos];
                let index = genFunc.randomInt(0, posAry.length-1);
                let offsetX = posAry[index];
                this.multiIndexPos = this.multiXPosAllAry.indexOf(offsetX);
                this.strawberryData.pos.x = offsetX;
                this.spriteStrategy.postCommand( defs.ESSC_CREATE_SPRITE, 'strawberry' );
                
                // Update the multiplier meter
                this.multiSprite.visualComponent.createFontString( `${this.multiplier}x` );
            }
        }
    }
    
    // 
    //  DESC: Called when two fixtures cease to touch
    //
    endContact( contact )
    {
        let spriteA = contact.m_fixtureA.m_userData;
        let spriteB = contact.m_fixtureB.m_userData;
        
        if( spriteA && spriteB )
        {
            if( spriteA.id === SPRITE_PEG )
                spriteA.setFrame(0);

            else if( spriteB.id === SPRITE_PEG )
                spriteB.setFrame(0);
        }
    }
    
    removeFixture( object )
    {
        if( (Math.abs(object.m_userData.pos.x) < 720) && (object.m_userData.id > 0) )
        {
            this.totalWin += this.multiplier;
            this.winMeter.startBangUp( this.totalWin );
        }
    }
}

// 
//  DESC: Unload files
//
function unload()
{
    menuManager.freeGroup( [stateGroup] );
    spriteStrategyManager.clear();
    objectDataManager.freeGroup( [stateGroup] );
    physicsWorldManager.destroyWorld( "(game)" );
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( [stateGroup], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( [stateGroup], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( [stateGroup], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( [stateGroup], callback ) );

    // Preload the ui group
    loadManager.add(
        ( callback ) => menuManager.preloadGroup( [stateGroup], callback ) );
    
    // Create the ui group
    loadManager.add(
        ( callback ) => { menuManager.createGroup( [stateGroup] ); callback(); });

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
}
