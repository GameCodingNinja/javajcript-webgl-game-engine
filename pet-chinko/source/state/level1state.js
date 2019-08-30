
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
import { soundManager } from '../../../library/managers/soundmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { settings } from '../../../library/utilities/settings';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';
import * as menuDefs from '../../../library/gui/menudefs';
import * as defs from '../../../library/common/defs';
import * as stateDefs from './statedefs';
import * as genFunc from '../../../library/utilities/genfunc';

// Load data from bundle as string
import level1StrategyLoader from 'raw-loader!../../data/objects/strategy/level1/strategy.loader';

export const ASSET_COUNT = 52;

const SPRITE_PEG = -2,
    MULTIPLIER_SPRITE = 0,
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
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 500 ) );

        // Game active flag
        this.gameActive = false;
        
        // Multiplier value
        this.multiplier = 1;
        
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
        this.ballStrategy = strategyManager.activateStrategy('_level-1-ball_');
        this.uiStrategy = strategyManager.activateStrategy('_level-ui_');

        // Create the multiplier sprite used to colide with the balls
        // NOTE: Setting the position of a static or kinematic can only be done before it's used in the physics world.
        this.multiNode = this.multiStrategy.create('dog_head_0');
        this.multiIndexPos = genFunc.randomInt(0, this.multiXPosAllAry.length-1);
        this.multiNode.get().physicsComponent.setPosition( this.multiXPosAllAry[this.multiIndexPos], MULTI_SPRITE_OFFSET_Y );

        // Node to warp animation
        this.warpNode = null;

        // temp
        this.dogHeadCounter = 0;

        // Randomly pick the first ball
        this.ballIndex = genFunc.randomInt(0, 3);

        // Get the ball instance name
        let ballInstanceName = this.getBallInstanceName( this.ballIndex );

        // Active the ui ball that is to drop
        this.uiStrategy.activateNode( 'ui_' + ballInstanceName );
        
        // get the ui elements
        this.uiWinMeter = this.uiStrategy.get( 'uiWinMeter' ).get();
        this.uiBallMeter = this.uiStrategy.get( 'uiBallMeter' ).get();
        this.uiMultiplier = this.uiStrategy.get( 'uiMultiplier' ).get();

        // Force an updated to show UI elements
        strategyManager.update();
        
        // Start the music
        soundManager.play( `(level_1)`, 'music_0', true );

        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();

        // Start the animation loop
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event.type === 'mouseup' && !menuManager.isMenuActive() && this.uiBallMeter.targetValue > 0 )
        {
            // Dec the ball meter
            this.uiBallMeter.incBangUp( -1 );

            // Get the spot on the screen they clicked
            let ratio = 1.0 / settings.orthoAspectRatio.h;
            let y = 600;
            let x = (ratio * (event.clientX + eventManager.mouseOffsetX)) - settings.defaultSize_half.w;
            
            // Set a random rotation
            let angle = genFunc.randomInt(0, 350) * defs.DEG_TO_RAD;
            
            // Get the random rotation
            let rot = genFunc.randomArbitrary( -3, 3 );

            // Save the old ball index and generate a new one
            let oldBallIndex = this.ballIndex;
            this.ballIndex = genFunc.randomInt(0, 3);

            // Get the ball instance names
            let instanceNameA = this.getBallInstanceName( oldBallIndex );
            let instanceNameB = this.getBallInstanceName( this.ballIndex );
            
            // Create the ball
            let node = this.ballStrategy.create( instanceNameA );
            node.get().physicsComponent.setTransform( x, y, angle, true );
            node.get().physicsComponent.applyAngularImpulse( rot );
            node.get().prepareScript( 'ball_ai' );

            // Deactivate/Activate if they are different
            if( oldBallIndex !== this.ballIndex )
            {
                this.uiStrategy.deactivateNode( 'ui_' + instanceNameA );
                this.uiStrategy.activateNode( 'ui_' + instanceNameB );
            }
        }
        else if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === menuDefs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.detail.arg[0] === menuDefs.ETC_BEGIN )
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
            else if( event.detail.type === menuDefs.EGE_MENU_TRANS_OUT )
            {
                if( event.detail.arg[0] === menuDefs.ETC_END )
                {
                    let tree = menuManager.getTree( 'pause_tree' );
                    if( !tree.isDefaultMenu('pause_menu') )
                        tree.setDefaultMenu('pause_menu');
                }
            }
            else if( event.detail.type === uiControlDefs.ECAT_ACTION_EVENT && event.detail.arg[0] === 'play_game' )
            {
                menuManager.getTree( 'pause_tree' ).transitionMenu();
                this.multiplier = 1;
                this.gameActive = true;
                this.uiBallMeter.incBangUp( 60 );
                this.ballStrategy.setAllToDefaultId();
                this.uiWinMeter.clear();
                this.ballStrategy.clear();
            }
            else if( event.detail.type === stateDefs.ESE_CREATE_MULTI_HEAD )
            {
                // Destroy the current one
                this.multiStrategy.destroy( this.multiNode );

                // Create a new one
                let posAry = this.multiXPosAry[this.multiIndexPos];
                let index = genFunc.randomInt(0, posAry.length-1);
                let offsetX = posAry[index];
                this.multiIndexPos = this.multiXPosAllAry.indexOf(offsetX);

                this.dogHeadCounter = (this.dogHeadCounter + 1) % 12;
                this.multiNode = this.multiStrategy.create(`dog_head_${this.dogHeadCounter}`);
                this.multiNode.get().physicsComponent.setPosition( offsetX, MULTI_SPRITE_OFFSET_Y );
            }
        }
    }

    // 
    //  DESC: get ball instance name
    //
    getBallInstanceName( index )
    {
        let result = '';
        switch(index)
        {
            case 0:
                result = 'tennis_ball_green';
            break;
            case 1:
                result = 'tennis_ball_pink';
            break;
            case 2:
                result = 'frisbee';
            break;
            case 3:
                result = 'bone_biscuit';
            break;
        }
        return result;
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

            // Is the game over
            if( this.gameActive &&
                this.uiBallMeter.currentValue === 0 &&
                !this.uiWinMeter.isBanging() &&
                (this.ballStrategy.activateCount() === 0 ||
                !this.ballStrategy.isPhysicsAwake()) )
            {
                this.gameActive = false;
                menuManager.getTree('pause_tree').setDefaultMenu('game_over_menu');
                menuManager.getTree( 'pause_tree' ).transitionMenu();
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
            
            else if( (spriteA.id === MULTIPLIER_SPRITE) || (spriteB.id === MULTIPLIER_SPRITE) )
            {
                this.multiplier++;

                // Disable the physics
                this.multiNode.get().physicsComponent.setActive( false );

                // Activate the warp animation
                let warpAnim = this.multiStrategy.create('warp');
                warpAnim.get().setPosXYZ( this.multiXPosAllAry[this.multiIndexPos], MULTI_SPRITE_OFFSET_Y );
                warpAnim.get().prepareScript('animate');

                // Activate the delayed destry script
                this.multiNode.get().prepareScript('delayDestroy');

                // Update the ui multiplier value
                this.uiMultiplier.visualComponent.createFontString( `${this.multiplier}x` );

                // Add more balls
                if( (spriteA.id === 5) || (spriteB.id === 5) )
                    this.uiBallMeter.incBangUp( 15 );
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
        if( (Math.abs(object.m_userData.pos.x) < 720) && (object.m_userData.id > defs.DEFAULT_ID) )
            this.uiWinMeter.incBangUp( this.multiplier );
    }

    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_level-1-stage_','_level-1-ball_','_level-ui_','_level-1-multiplier_'] );
        
        objectDataManager.freeGroup( ['(level_1)'] );
        
        physicsWorldManager.destroyWorld( "(game)" );

        soundManager.freeGroup( [`(level_1)`]);
    }
}

// 
//  DESC: Load files
//
export function load()
{
    let groupAry = ['(level_1)'];
    
    return Promise.all([

        // Load all the assets associated with this group(s)
        objectDataManager.loadGroup( groupAry ),

        // Load the physics world
        physicsWorldManager.loadWorldGroup2D( '(game)' ),

        // Load the Sound Manager group
        soundManager.loadGroup( [`(level_1)`] )
    ])

    // Create and load all the actor strategies.
    .then(() => strategyLoader.load( genFunc.stringLoadXML( level1StrategyLoader ) ))

    // Clean up the temporary files
    .then(() =>
    {
        assetHolder.deleteGroup( groupAry );
        spriteSheetManager.deleteGroup( groupAry );
    })
    
    
    /*objectDataManager.loadGroup( groupAry )

        // Load the physics list table and group
        .then(() => physicsWorldManager.loadWorldGroup2D( '(game)' ))

        // Create and load all the actor strategies.
        .then(() => strategyLoader.load( genFunc.stringLoadXML( level1StrategyLoader ) ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })*/

    // Load the xml group
    /*loadManager.add(
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

    // Create and load all the actor strategies. NOTE: This adds it to the load manager
    strategyLoader.load( genFunc.stringLoadXML( level1StrategyLoader ) );*/
}
