
// 
//  FILE NAME: level1state.js
//  DESC:      Level 1 state Class State
//

"use strict";

import { CommonState } from './commonstate';
import { eventManager } from '../../../library/managers/eventmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { StageStrategy } from '../../../library/strategy/stagestrategy';
import { ActorStrategy } from '../../../library/strategy/actorstrategy';
import { actionManager } from '../../../library/managers/actionmanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { settings } from '../../../library/utilities/settings';
import * as defs from '../../../library/common/defs';
import * as stateDefs from './statedefs';
import * as genFunc from '../../../library/utilities/genfunc';

export const ASSET_COUNT = 19;

const SPRITE_PEG = -2,
      MULTIPLIER = 0,
      MULTI_SPRITE_OFFSET_Y = -470;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
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
        
        this.physicsWorld = physicsWorldManager.getWorld( "(game)" );
        
        // Clear the last device used so that the button on start game menu is active by default
        actionManager.clearLastDeviceUsed();
        
        // Add the contact listeners
        this.physicsWorld.world.on( 'begin-contact', this.beginContact.bind(this) );
        this.physicsWorld.world.on( 'end-contact', this.endContact.bind(this) );
        this.physicsWorld.world.on( 'remove-fixture', this.removeFixture.bind(this) );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Multiplier value
        this.multiplier = 1;
        
        // Total win
        this.totalWin = 0;
        
        // Clear the event queue
        eventManager.clear();
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.getTree('pause_tree').setDefaultMenu('game_start_menu');
        menuManager.activateTree( ['pause_tree'] );
        menuManager.getTree( 'pause_tree' ).transitionMenu();
        
        // Activate the strategies to run
        strategyManager.activateStrategy('_level-1-stage_');
        this.multiStrategy = strategyManager.activateStrategy('_level-1-multiplier_');
        this.gameStrategy = strategyManager.activateStrategy('_level-1-game_');
        let uiStrategy = strategyManager.activateStrategy('_level-ui_');
        
        // Create the multiplier sprite used to colide with the balls
        // NOTE: Setting the position of a static or kinematic can only be done before it's used in the physics world.
        this.multiNode = this.multiStrategy.create('dog_head');
        this.multiIndexPos = genFunc.randomInt(0, this.multiXPosAllAry.length-1);
        this.multiNode.getSprite().physicsComponent.setPosition( this.multiXPosAllAry[this.multiIndexPos], MULTI_SPRITE_OFFSET_Y );
        
        // Force an updated to show UI elements
        strategyManager.update();
        
        // get the ui elements
        this.uiWinMeter = uiStrategy.get( 'UIMeter' ).getControl();
        this.uiMultiplier = uiStrategy.get( 'multiplier' ).getSprite();
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        requestAnimationFrame( this.callback );
        
        this.index = menuManager.getMenu('title_screen_menu').getControl('level_btn_lst').getIndex() + 1;
        soundManager.play( `(level_${this.index})`, 'music_0', true );
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
            let y = 600;
            let x = (ratio * (event.clientX + eventManager.mouseOffsetX)) - settings.defaultSize_half.w;
            
            // Set a random rotation
            let angle = genFunc.randomInt(0, 350) * defs.DEG_TO_RAD;
            
            // Get the random rotation
            let rot = genFunc.randomArbitrary( -3, 3 );
            
            let ball = '';
            switch(genFunc.randomInt(0, 3))
            {
                case 0:
                    ball = 'tennis_ball_green';
                break;
                case 1:
                    ball = 'tennis_ball_pink';
                break;
                case 2:
                    ball = 'frisbee';
                break;
                case 3:
                    ball = 'bone_biscuit';
                break;
            } 
            
            // Create the ball
            let node = this.gameStrategy.create( ball );
            node.getSprite().physicsComponent.setTransform( x, y, angle, true );
            node.getSprite().physicsComponent.applyAngularImpulse( rot );
        }
        else if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === defs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.detail.arg[0] === defs.ETC_BEGIN )
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
            else if( event.detail.type === defs.EGE_MENU_TRANS_OUT )
            {
                if( event.detail.arg[0] === defs.ETC_END )
                {
                    let tree = menuManager.getTree( 'pause_tree' );
                    if( tree.isDefaultMenu('game_start_menu') )
                        tree.setDefaultMenu('pause_menu');
                }
            }
        }
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_level-1-stage_','_level-1-game_','_level-ui_','_level-1-multiplier_'] );
        
        objectDataManager.freeGroup( ['(level_1)'] );
        
        physicsWorldManager.destroyWorld( "(game)" );

        soundManager.freeGroup( [`(level_${this.index})`]);
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
            strategyManager.update();
            
            // NOTE: Can't reposition an static or kinematic. Must create a new one
            if( !this.multiNode.getSprite().physicsComponent.isActive() )
            {
                // Destroy the current one
                this.multiStrategy.destroy( this.multiNode );

                // Create a new one
                let posAry = this.multiXPosAry[this.multiIndexPos];
                let index = genFunc.randomInt(0, posAry.length-1);
                let offsetX = posAry[index];
                this.multiIndexPos = this.multiXPosAllAry.indexOf(offsetX);
                this.multiNode = this.multiStrategy.create('dog_head');
                this.multiNode.getSprite().physicsComponent.setPosition( offsetX, MULTI_SPRITE_OFFSET_Y );
            }
        }
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        strategyManager.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        super.render();
        
        strategyManager.render();
        
        menuManager.render();
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
            
            else if( (spriteA.id == MULTIPLIER) || (spriteB.id == MULTIPLIER) )
            {
                this.multiplier++;

                // Disable the physics
                this.multiNode.getSprite().physicsComponent.setActive( false );

                // Update the ui multiplier value
                this.uiMultiplier.visualComponent.createFontString( `${this.multiplier}x` );
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
        if( (Math.abs(object.m_userData.object.pos.x) < 720) && (object.m_userData.id > defs.DEFAULT_ID) )
        {
            this.totalWin += this.multiplier;
            this.uiWinMeter.startBangUp( this.totalWin );
        }
    }
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( ['(level_1)'], callback ) );

    // Load all the assets associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadAssets2D( ['(level_1)'], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(level_1)'], callback ) );

    // Load the physics list table and group
    loadManager.add(
        ( callback ) => physicsWorldManager.loadWorldGroup2D( '(game)', callback ));

    let index = menuManager.getMenu('title_screen_menu').getControl('level_btn_lst').getIndex() + 1;

    // Load the Sound Manager group
    loadManager.add( ( callback ) => soundManager.loadGroup( [`(level_${index})`], callback ));
        
    // Create the stage strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-1-stage_', new StageStrategy, callback ) );

    // Create the actor strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-1-game_', new ActorStrategy, callback ) );

    // Create the actor strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-1-multiplier_', new ActorStrategy, callback ) );

    // Create the actor strategy
    loadManager.add(
        ( callback ) => strategyManager.addStrategy( '_level-ui_', new ActorStrategy, callback ) );
        
    // Load the strategies
    loadManager.add(
        ( callback ) => strategyLoader.load( 'data/objects/strategy/level1/strategy.loader', callback ));
}
