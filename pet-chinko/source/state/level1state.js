
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
import stageStrategyLoader from 'raw-loader!../../data/objects/strategy/level1/stage.strategy.loader';

export const ASSET_COUNT = 45;

const SPRITE_PEG = -2,
    MULTIPLIER_SPRITE = 0,
    MULTI_SPRITE_OFFSET_Y = -470,
    MAX_MULTI = 3,
    DELETE_BIT = 0x200;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
        // Multiplier positions
        this.multiXPosAry = [-640,-480,-320,-160,0,160,320,480,640];

        // Setup the counter and index for the multiplier art
        this.multiArtCounter = 0;
        this.multiArtIndexAry = [0,1,2,3,4,5];
        genFunc.shuffle( this.multiArtIndexAry );
        
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

        // Setup Multiplier position
        this.activePosIndexAry = [];
        let multiIndexPosAry = [0,1,2,3,4,5,6,7,8];
        genFunc.shuffle( multiIndexPosAry );

        // Create the multiplier sprite used to colide with the balls
        // NOTE: Setting the position of a static or kinematic can only be done before it's used in the physics world.
        for( let i = 0; i < MAX_MULTI; i++ )
        {
            let indexPos = this.getMultiPosX( multiIndexPosAry[i], multiIndexPosAry );

            let artIndex = this.multiArtIndexAry[this.multiArtCounter++];
            let multiNode = this.multiStrategy.create(`dog_head_${artIndex}`);
            multiNode.get().multiIndexPos = indexPos;
            multiNode.get().setPosXYZ( this.multiXPosAry[indexPos], MULTI_SPRITE_OFFSET_Y );
            multiNode.get().physicsComponent.setPosition( this.multiXPosAry[indexPos], MULTI_SPRITE_OFFSET_Y );
            this.activePosIndexAry.push(indexPos);
        }

        // Node to warp animation
        this.warpNode = null;

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

            let ballArray = [0,1,2,3,0,1,2];

            // Save the old ball index and generate a new one
            let oldBallIndex = this.ballIndex;
            this.ballIndex = ballArray[genFunc.randomInt(0, ballArray.length-1)];

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
                let multiIndexPosAry = [0,1,2,3,4,5,6,7,8];

                // Remove the active indexes from the position index array
                for( let i = 0; i < this.activePosIndexAry.length; i++ )
                {
                    let index = multiIndexPosAry.indexOf( this.activePosIndexAry[i] );
                    if( index !== -1 )
                    multiIndexPosAry.splice( index, 1 );
                }

                // Shuffle the remaining indexes
                genFunc.shuffle( multiIndexPosAry );

                // Pop the last index if it's greater then the max allowed
                if( this.activePosIndexAry.length > MAX_MULTI )
                    this.activePosIndexAry.pop();

                // Destroy the current one
                this.multiStrategy.destroy( event.detail.arg[0].parentNode );

                this.multiArtCounter = (this.multiArtCounter + 1) % 6;
                if( this.multiCounter == 0 )
                    genFunc.shuffle( this.multiArtIndexAry );

                let indexPos = this.getMultiPosX( multiIndexPosAry[0], multiIndexPosAry );

                // Create the new multiplier head
                let artIndex = this.multiArtIndexAry[this.multiArtCounter++];
                let multiNode = this.multiStrategy.create(`dog_head_${artIndex}`);
                multiNode.get().multiIndexPos = indexPos;
                multiNode.get().setPosXYZ( this.multiXPosAry[indexPos], MULTI_SPRITE_OFFSET_Y );
                multiNode.get().physicsComponent.setPosition( this.multiXPosAry[indexPos], MULTI_SPRITE_OFFSET_Y );
                this.activePosIndexAry.push( indexPos );

                // Remove the index of the multiplier to be deleted and add it to the end to be popped off next time
                let index = this.activePosIndexAry.indexOf( event.detail.arg[0].multiIndexPos );
                if( index !== -1 && index != this.activePosIndexAry.length - 1 )
                {
                    this.activePosIndexAry.splice( index, 1 );
                    this.activePosIndexAry.push(event.detail.arg[0].multiIndexPos);
                }
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
    //  DESC: handle events
    //
    getMultiPosX( defPosIndex, multiIndexPosAry )
    {
        let indexPos = defPosIndex

        // See if we can find a new position that is not next to anyone else
        for( let i = 0; i < multiIndexPosAry.length; i++ )
        {
            let found = true;
            for( let j = 0; j < this.activePosIndexAry.length; j++ )
            {
                if( Math.abs(multiIndexPosAry[i] - this.activePosIndexAry[j]) <= 1 )
                {
                    found = false;
                    break;
                }
            }

            if( found )
            {
                indexPos = multiIndexPosAry[i];
                break;
            }
        }

        return indexPos;
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
                let sprite = spriteA;
                if( spriteB.id === MULTIPLIER_SPRITE )
                    sprite = spriteB;

                // Check if this sprite's delete flag is set
                if( !sprite.parameters.isSet( DELETE_BIT ) )
                {
                    sprite.parameters.add( DELETE_BIT );

                    this.multiplier++;

                    // Disable the physics
                    sprite.physicsComponent.setActive( false );

                    // Activate the warp animation
                    let warpAnim = this.multiStrategy.create('warp');
                    warpAnim.get().setPosXYZ( this.multiXPosAry[sprite.multiIndexPos], MULTI_SPRITE_OFFSET_Y );
                    warpAnim.get().prepareScript('animate');

                    // Activate the delayed destry script
                    sprite.prepareScript('delayDestroy');

                    // Update the ui multiplier value
                    this.uiMultiplier.visualComponent.createFontString( `${this.multiplier}x` );

                    // Add more balls
                    if( (spriteA.id === 5) || (spriteB.id === 5) )
                        this.uiBallMeter.incBangUp( 15 );
                }
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

    // Load stage strategy.
    .then(() => strategyLoader.load( genFunc.stringLoadXML( stageStrategyLoader ) ))

    // Load the remaining strategies.
    .then(() => strategyLoader.load( genFunc.stringLoadXML( level1StrategyLoader ) ))

    // Clean up the temporary files
    .then(() =>
    {
        assetHolder.deleteGroup( groupAry );
        spriteSheetManager.deleteGroup( groupAry );
    })

}
