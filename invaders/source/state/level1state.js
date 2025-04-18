
// 
//  FILE NAME: level1state.js
//  DESC:      Level1State Class State
//

"use strict";

import { signalManager } from '../../../library/managers/signalmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { scriptSingleton } from '../../../library/script/scriptcomponent';
import { cameraManager } from '../../../library/managers/cameramanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { aiManager } from '../../../library/managers/aimanager';
import { CommonState } from './commonstate';
import { soundManager } from '../../../library/sound/soundmanager';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import { settings } from '../../../library/utilities/settings';
import { Timer } from '../../../library/utilities/timer';
import { device } from '../../../library/system/device';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as genFunc from '../../../library/utilities/genfunc';
import * as menuDefs from '../../../library/gui/menudefs';
import * as stateDefs from './statedefs';
import * as gameDefs from './gamedefs';
import * as ai from '../scripts/aiscripts';

import enemy_ai from 'raw-loader!../../data/objects/ai/enemy.ai';

export const ASSET_COUNT = 92;
const MOVE_NULL = -1,
      MOVE_LEFT = 0,
      MOVE_RIGHT = 1,
      MOVE_LEFT_RIGHT = 2,
      MOVE_UP = 2,
      MOVE_DOWN = 3,
      CAMERA_EASING_SPEED = 10,
      CAMERA_EASING_DIVISOR = 4,
      CAMERA_EASING_OFFSET = 350,
      PLAYER_SHIP_TOP_SPEED = 12,
      PLAYER_SHIP_BOOST_TOP_SPEED = 16,
      MAX_CLOUDS = 8,
      PLAYER_SHIP_ID = 0,
      ENEMY_SHOT_ID = -2,
      ENEMY_SHIP_ID = -3,
      CLOUD_MIN_Y = -150,
      CLOUD_MAX_Y = 300,
      LOOPING_BKG_WRAP_DIST = 1280,
      GAMEPLAY_LOOPING_WRAP_DIST = 5600,
      RADAR_SCALE = 0.1,
      LOOP_SND = true;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );

        // Set the collision callback signal
        signalManager.connect_collisionSignal( this.collisionCallBack.bind(this) );

        // Start the fade script
        scriptSingleton.prepare( scriptManager.get('ScreenFade')( 0, 1, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) );

        // Clear the event queue
        eventManager.clear();

        // Clear the last device used so that the button on start game menu is active by default
        actionManager.clearLastDeviceUsed();
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.getTree('pause_tree').setDefaultMenu('game_start_menu');
        menuManager.activateTree( ['pause_tree'] );
        menuManager.getTree( 'pause_tree' ).transitionMenu();
        
        // Prepare the strategies to run
        this.bkgStrategy = strategyManager.activateStrategy('_background_');
        strategyManager.activateStrategy('_buildingsback_');
        strategyManager.activateStrategy('_buildingsfront_');
        this.buildingsStrategy = strategyManager.activateStrategy('_buildings_');
        strategyManager.activateStrategy('_forground_');

        // Aquire strategies that are handled outside of the manager
        this.lowerHudStategy = strategyManager.get('_lower_hud_');
        this.upperHudStategy = strategyManager.get('_upper_hud_');
        this.hudLevelFont = this.upperHudStategy.get('level_font').get();
        this.hudProgressBar = this.upperHudStategy.get('level_progress_bar').get();
        this.enemyStrategy = strategyManager.get('_enemy_');

        // Randomly distrabute the clouds
        this.cloudAry = [];
        for( this._i = 0; this._i < MAX_CLOUDS; ++this._i )
        {
            this._sprite = this.bkgStrategy.get(`cloud_${this._i}`).get();
            this._sprite.speed = genFunc.randomArbitrary(0.001, 0.02);
            this._sprite.setPosXYZ(genFunc.randomInt(-640, 640), genFunc.randomInt(CLOUD_MIN_Y, CLOUD_MAX_Y));
            this._sprite.setScaleXYZ(genFunc.randomInt(2, 4), genFunc.randomInt(2, 4));
            // Flip the sprite?
            if(genFunc.randomInt(0, 1))
                this._sprite.setRotXYZ(0, 180);

            this.cloudAry.push(this._sprite);
        }

        // Get the camera and reinit
        this.buildingsbackCamera = cameraManager.get('buildingsbackCamera');
        this.buildingsfrontCamera = cameraManager.get('buildingsfrontCamera');
        this.buildingsCamera = cameraManager.get('buildingsCamera');
        this.forgroundCamera = cameraManager.get('forgroundCamera');
        this.levelCamera = cameraManager.get('levelCamera');
        this.radarCamera1 = cameraManager.get('radarCamera1');
        this.radarCamera2 = cameraManager.get('radarCamera2');
        this.wrapAroundCamera = cameraManager.get('wrapAroundCamera');
        this.buildingsbackCamera.initFromXml();
        this.buildingsfrontCamera.initFromXml();
        this.buildingsCamera.initFromXml();
        this.levelCamera.initFromXml();
        this.wrapAroundCamera.initFromXml();

        cameraManager.addToTransform( 
            ['buildingsbackCamera','buildingsfrontCamera','buildingsCamera','forgroundCamera',
             'levelCamera','radarCamera1','radarCamera2','wrapAroundCamera','menuCamera'] );

        this.radarCamera1.projHeight = device.gl.getParameter(device.gl.VIEWPORT)[3] * this.radarCamera1.scale.x;
        this.radarCamera1.initFromXml();

        this.radarCamera2.projHeight = device.gl.getParameter(device.gl.VIEWPORT)[3] * this.radarCamera2.scale.x;
        this.radarCamera2.initFromXml();

        this.radarCamAry = [this.radarCamera1,this.radarCamera2];

        // Move the buildings into the active list so that the so that the AI script tree has access to the sprites
        strategyManager.get("_buildings_").addToActiveList();

        // Init the player ship
        this.initPlayerShip();

        // Init misc objects
        this.initMiscObjects();

        this.hudProgressBar.setProgressBarMax( 10 );
        this.hudProgressBar.setCurrentValue( 0 );
        this.playerLevel = 1;

        // Player/camera movement
        this.easingX = new easing.valueTo;
        this.easingY = new easing.valueTo;
        this.cameraEasingX = new easing.valueTo;
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();

        this.moveActionAry = ['left','right','up','down'];
        this.moveDirX = MOVE_NULL;
        this.moveDirY = MOVE_NULL;
        this.lastMoveDirX = MOVE_NULL;
        this.lastMoveAction != defs.EAP_IDLE;
        this.playerShipSpeed = PLAYER_SHIP_TOP_SPEED;
        this.playerShipBoostSpeed = 0;

        // Create a player for this group
        this.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
        this.groupPlayer.play( 'player_thrust', LOOP_SND );
        this.groupPlayer.pause( 'player_thrust' );

        this.gameReady = true;
        this.musicCounter = 0;
        this.musicAry = [0, 1, 2];
        genFunc.shuffle( this.musicAry );

        this.setYTGameScore();

        // Indicate to Crazy Games the start of the loading
        if(typeof window.CrazyGames !== 'undefined')
            window.CrazyGames.SDK.game.loadingStop();
        
        requestAnimationFrame( this.callback );
    }

    // 
    //  DESC: Init the player ship
    //
    initPlayerShip()
    {
        // Get the nodes and sprites we need to call and tuck them under the node for easy access
        this.playerShip = {};
        this.playerShip.strategy = strategyManager.get('_player_ship_');
        this.playerShip.node = this.playerShip.strategy.get('player_ship');
        this.playerShip.object = this.playerShip.node.findChild('playerShip_object').get();
        this.playerShip.sprite = this.playerShip.node.get();
        this.playerShip.progressBar = this.playerShip.node.findChild('UIProgressBar').get();
        this.playerShip.fireTailSprite = this.playerShip.node.findChild('player_fire_tail').get();
        this.playerShip.fireTailScript = this.playerShip.fireTailSprite.prepareScript( 'fireTailAnim' );

        this.playerShip.progressBar.setProgressBarMax( 100 );
        this.playerShip.progressBar.setCurrentValue( 100 );

        // This part is needed for the reload but here for completeness
        this.playerShip.object.setRotXYZ();
        this.playerShip.sprite.setPosXYZ();
        this.playerShip.sprite.setRotXYZ();
        this.playerShip.sprite.collisionComponent.enable = true;
        this.playerShip.progressBar.setVisible( false );
    }

    // 
    //  DESC: Init the misc objects
    //
    initMiscObjects()
    {
        this.enemySpawnTimer = new Timer(2000);
        this.enemyMaxTimer = new Timer(15000);
        this.maxEnemies = 5;

        this.train = {};
        this.train.strategy = null;
        this.train.timer = new Timer( genFunc.randomInt( 10000, 25000 ) );
        this.train.sprite = null;
        this.train.node = null;
        this.train.dir = 0;
    }

    // 
    //  DESC: Set the level score
    //
    setYTGameScore()
    {
        if(typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV)
            ytgame.engagement.sendScore({ value: this.playerLevel });
    }

    // 
    //  DESC: Restart the game
    //
    restartGame()
    {
        this.gameReady = false;
        this.playerShip = null;

        ai.clearAIData();
        strategyManager.deleteStrategy( ['_buildings_','_enemy_','_player_ship_','_train_'] );
        strategyLoader.loadGroup( '-reloadlevel1-' )
        .then(() =>
        {
            this.buildingsStrategy = strategyManager.activateStrategy('_buildings_');

            // Move the buildings into the active list so that the so that the AI script tree has access to the sprites
            strategyManager.get("_buildings_").addToActiveList();

            // Reactivate strategies
            this.enemyStrategy = strategyManager.get('_enemy_');

            // Init the player ship
            this.initPlayerShip();

            // Init misc objects
            this.initMiscObjects();

            strategyManager.sort();

            this.buildingsbackCamera.initFromXml();
            this.buildingsfrontCamera.initFromXml();
            this.buildingsCamera.initFromXml();
            this.levelCamera.initFromXml();
            this.radarCamera1.initFromXml();
            this.radarCamera2.initFromXml();
            this.wrapAroundCamera.initFromXml();

            this.radarCamAry = [this.radarCamera1, this.radarCamera2];

            this.moveDirX = MOVE_NULL;
            this.moveDirY = MOVE_NULL;
            this.lastMoveDirX = MOVE_NULL;

            this.easingX.clear();
            this.easingY.clear();
            this.cameraEasingX.clear();

            this.hudLevelFont.visualComponent.createFontString('Level 1');
            this.hudProgressBar.setProgressBarMax( 10 );
            this.hudProgressBar.setCurrentValue( 0 );
            this.playerLevel = 1;

            this.playerShipBoostSpeed = 0;

            this.gameReady = true;

            this.setYTGameScore();

            // Clear the last device used so that the button on start game menu is active by default
            actionManager.clearLastDeviceUsed();

            scriptSingleton.prepare( scriptManager.get('ScreenFade')( 0, 1, 500, stateDefs.ESE_GAME_RELOAD ) );
        })
    }

    // 
    //  DESC: handle collisions
    //
    collisionCallBack( spriteA, spriteB )
    {
        // Player ship was involved in a collision
        if(spriteB.parentNode.userId == PLAYER_SHIP_ID)
        {
            spriteA.collisionComponent.enable = false;
            spriteB.prepareScript( 'hit', spriteA );

            // Player hit by enemy projectile
            if( spriteA.parentNode.userId == ENEMY_SHOT_ID )
            {
                this.playerShip.progressBar.incCurrentValue( -10 );
                this.playerShip.progressBar.setVisible( true );
                spriteA.prepareScript( 'hit' );
                this.groupPlayer.play( 'player_hit' );
            }
            // Player collides into enemy
            else if( spriteA.parentNode.userId == ENEMY_SHIP_ID )
            {
                this.playerShip.progressBar.incCurrentValue( -30 );
                this.playerShip.progressBar.setVisible( true );
                spriteA.prepareScript( 'hit', spriteB );
                this.groupPlayer.play( 'EXPLOSION_Metllic' );
            }

            // Player ship is to die from above hit/collision
            if( this.playerShip.progressBar.isMinValue() && this.playerShip.sprite.collisionComponent.enable )
            {
                this.playerShip.sprite.collisionComponent.enable = false;
                this.playerShip.progressBar.setVisible( false );
                this.playerShip.fireTailSprite.setVisible( false );
                this.playerShip.fireTailScript.pause = true;
                this.groupPlayer.pause( 'player_thrust' );
                this.playerShip.sprite.prepareScript( 'die' );
            }
        }
        // Player shot enemy ship
        else if( spriteB.parentNode.userId == ENEMY_SHIP_ID )
        {
            // Stop any more collision detection
            spriteA.collisionComponent.enable = false;
            spriteB.collisionComponent.enable = false;

            // Execute the scripts that handle being hit
            spriteA.prepareScript( 'hit' );
            spriteB.prepareScript( 'hit', spriteA );

            this.groupPlayer.play( 'enemy_1_explosion' );
        }
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event instanceof GenericEvent )
        {
            // Check for the "game change state" message
            if( event.type === menuDefs.EME_MENU_GAME_STATE_CHANGE )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                    scriptSingleton.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE ) );
            }
            else if( event.type === stateDefs.ESE_FADE_IN_START )
            {
                // Force an update on the start of the fade in so that the game elements are drawn
                if( event.arg[0] === stateDefs.ESE_FADE_GAME_STATE_CHANGE )
                {
                    // Do a pre-update of all strategies so they display before the game starts
                    strategyManager.update();
                    this.lowerHudStategy.update();
                    this.upperHudStategy.update();
                    this.enemyStrategy.update();
                    this.playerShip.strategy.update();
                }
                else if( event.arg[0] === stateDefs.ESE_GAME_RELOAD )
                {
                    menuManager.getTree('pause_tree').setDefaultMenu('game_start_menu');
                    menuManager.getTree('pause_tree').transitionMenu();
                }
            }
            else if( event.type === menuDefs.EME_MENU_TRANS_IN )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                {
                    let asnd = soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' );

                    if( asnd.isPaused() )
                    {
                        // Fade out the game music
                        let gsnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[this.musicCounter]}` );
                        scriptSingleton.prepare( scriptManager.get('MusicFade')( 0.0, 500, gsnd, null, () => gsnd.pause() ) );

                        // Start the ambient music
                        scriptSingleton.prepare( scriptManager.get('MusicFade')( asnd.defaultVolume, 500, asnd, () => asnd.playOrResume(true), null ) );

                        // Indicate to Crazy Games the game has started
                        if(typeof window.CrazyGames !== 'undefined')
                            window.CrazyGames.SDK.game.gameplayStop();
                    }
                }
            }
            else if( event.type === menuDefs.EME_MENU_TRANS_OUT )
            {
                if( event.arg[0] === menuDefs.ETC_END )
                {
                    let gsnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[this.musicCounter]}` );

                    if( !menuManager.getActiveTree() && (gsnd.isPaused() || !gsnd.wasPlayed()) && this.gameReady )
                    {
                        // Fade out the ambient music
                        let asnd = soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' );
                        scriptSingleton.prepare( scriptManager.get('MusicFade')( 0.0, 500, asnd, null, () => asnd.pause() ) );

                        // Start the game music
                        scriptSingleton.prepare( scriptManager.get('MusicFade')( gsnd.defaultVolume, 500, gsnd, () => gsnd.playOrResume(true), null ) );

                        // Indicate to Crazy Games the game has stopped
                        if(typeof window.CrazyGames !== 'undefined')
                            window.CrazyGames.SDK.game.gameplayStart();
                    }

                    this._tree = menuManager.getTree( 'pause_tree' );
                    if( !this._tree.isDefaultMenu('pause_menu') )
                        this._tree.setDefaultMenu('pause_menu');
                }
            }
            else if( event.type === stateDefs.ESE_SHOW_GAME_OVER_MENU )
            {
                eventManager.clear();
                actionManager.clearLastDeviceUsed();
                menuManager.getTree('pause_tree').setDefaultMenu('game_over_menu');
                menuManager.getTree('pause_tree').transitionMenu();

                // Fade out the game music
                let gsnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[this.musicCounter]}` );
                scriptSingleton.prepare( scriptManager.get('MusicFade')( 0.0, 500, gsnd, null, () => gsnd.pause() ) );

                // Start the ambient music
                let asnd = soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' );
                scriptSingleton.prepare( scriptManager.get('MusicFade')( asnd.defaultVolume, 500, asnd, () => asnd.playOrResume(true), null ) );

                // Indicate to Crazy Games the game has started
                if(typeof window.CrazyGames !== 'undefined')
                    window.CrazyGames.SDK.game.gameplayStop();
            }
            else if( event.type === uiControlDefs.ECAT_ACTION_EVENT )
            {
                if( event.arg[0] === 'restart_game' )
                {
                    scriptSingleton.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, stateDefs.ESE_GAME_RELOAD ) );
                }
            }
            else if( event.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                if( event.arg[0] === stateDefs.ESE_GAME_RELOAD )
                {
                    menuManager.getTree( 'pause_tree' ).transitionMenu();
                    this.restartGame();
                }
                else if( event.arg[0] === stateDefs.ESE_FADE_GAME_STATE_CHANGE )
                {
                    this.gameReady = false;
                }
            }
            else if( event.type === gameDefs.EGE_BUILDING_DESTROYED )
            {
                this._allToBeDeleted = true;
                this._buildingsAry = strategyManager.get('_buildings_').nodeAry;
                for( this._i = 0; this._i < this._buildingsAry.length; ++this._i )
                {
                    if( this._buildingsAry[this._i].toBeDeleted === undefined )
                    {
                        this._allToBeDeleted = false;
                        break;
                    }
                }

                if( this._allToBeDeleted )
                    eventManager.dispatchEvent( stateDefs.ESE_SHOW_GAME_OVER_MENU );
            }
            else if( event.type === gameDefs.EGE_ENEMY_DESTROYED )
            {
                if( this.hudProgressBar.isMaxValue() )
                {
                    this.hudProgressBar.setCurrentValue( 0 );
                    this.hudProgressBar.incProgressBarMax( 2 );
                    this.playerLevel += 1;

                    this.setYTGameScore();

                    this.hudLevelFont.visualComponent.createFontString( `Level ${this.playerLevel}` );

                    this.groupPlayer.play( 'level_up' );

                    // Change out the music every 5 levels
                    if( (this.playerLevel % 5) == 0)
                    {
                        // Fade out the current game music
                        let gsnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[this.musicCounter]}` );
                        scriptSingleton.prepare( scriptManager.get('MusicFade')( 0.0, 500, gsnd, null, () => gsnd.stop() ) );

                        this.musicCounter = (this.musicCounter + 1) % this.musicAry.length;

                        // Start the next game music
                        let asnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[this.musicCounter]}` );
                        scriptSingleton.prepare( scriptManager.get('MusicFade')( asnd.defaultVolume, 500, asnd, () => asnd.play(true), null ) );
                    }
                }

                this.hudProgressBar.incCurrentValue( 1 );
            }
        }
        else
        {
            if( !menuManager.active && this.playerShip.sprite.collisionComponent.enable )
            {
                // Handle the ship movement
                this.handleShipMovement( event );

                if( actionManager.wasActionPress( event, 'shoot', defs.EAP_DOWN ) )
                {
                    this._laserBlastNode = this.playerShip.strategy.create('player_shot');
                    this._laserBlastNode.get().prepareScript( 'shoot', this.easingX.getValue() );

                    this.groupPlayer.play( 'player_gun_1' );
                }
                else if( actionManager.wasActionPress( event, 'boost', defs.EAP_DOWN ) )
                {
                    if( this.lastMoveAction === defs.EAP_DOWN )
                    {
                        //console.log("boost On");
                        this.playerShipBoostSpeed = PLAYER_SHIP_BOOST_TOP_SPEED;
                        
                        if( this.lastMoveDirX === MOVE_LEFT )
                            this.easingX.init( this.easingX.getValue(), -(this.playerShipSpeed + this.playerShipBoostSpeed), 2, easing.getLinear() );
                        else
                            this.easingX.init( this.easingX.getValue(), this.playerShipSpeed + this.playerShipBoostSpeed, 2, easing.getLinear() );
                    }
                }
                else if( actionManager.wasActionPress( event, 'boost', defs.EAP_UP ) )
                {
                    if( this.playerShipBoostSpeed == PLAYER_SHIP_BOOST_TOP_SPEED )
                    {
                        //console.log("boost Off");
                        this.playerShipBoostSpeed = 0;
                    }

                    if( this.lastMoveAction === defs.EAP_DOWN )
                    {
                        if( this.lastMoveDirX === MOVE_LEFT )
                            this.easingX.init( this.easingX.getValue(), -(this.playerShipSpeed + this.playerShipBoostSpeed), 2, easing.getLinear() );
                        else
                            this.easingX.init( this.easingX.getValue(), this.playerShipSpeed + this.playerShipBoostSpeed, 2, easing.getLinear() );
                    }
                }
            }
        }
    }

    // 
    //  DESC: Handle the ship movement
    //
    handleShipMovement( event )
    {
        this._dir = -this.levelCamera.pos.x - this.playerShip.sprite.pos.x;

        for( this._i = 0; this._i < this.moveActionAry.length; ++this._i )
        {
            this._actionResult = actionManager.wasAction( event, this.moveActionAry[this._i] );
            if( this._actionResult != defs.EAP_IDLE )
            {
                if( this._i < MOVE_LEFT_RIGHT )
                {
                    // Only act on action press for the last button down
                    if( this._actionResult === defs.EAP_UP && this._i !== this.lastMoveDirX )
                        continue;

                    if( this._i === MOVE_LEFT )
                    {
                        // Flip the ship facing left
                        this.playerShip.object.setRotXYZ( 0, 180 );

                        // The camera easing positions the player ship at then end of the screen facing inwards
                        if( this._actionResult === defs.EAP_DOWN )
                        {
                            this.playerShip.fireTailSprite.setVisible( true );
                            this.playerShip.fireTailScript.pause = false;
                            this.easingX.init( this.easingX.getValue(), -(this.playerShipSpeed + this.playerShipBoostSpeed), 2, easing.getLinear() );

                            this.groupPlayer.resume( 'player_thrust' );

                            //console.log("Move Left DOWN");

                            // Camera easing has to move slower or faster then the elements on the screen to avoid movement studder
                            // Don't allow any more camera easing, in this direction, after a certain point
                            if(this._dir > -CAMERA_EASING_OFFSET)
                                this.cameraEasingX.init( this.cameraEasingX.getValue(), -CAMERA_EASING_SPEED, 1, easing.getLinear() );
                        }
                        else
                        {
                            this.playerShip.fireTailSprite.setVisible( false );
                            this.playerShip.fireTailScript.pause = true;
                            this.easingX.init( this.easingX.getValue(), 0, 3, easing.getLinear() );

                            this.groupPlayer.pause( 'player_thrust' );

                            this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );

                            //console.log("Move Left UP");

                            if( this.playerShipBoostSpeed )
                            {
                                this.playerShipBoostSpeed = 0;
                                //console.log("boost Off");
                            }
                        }

                        this.moveDirX = MOVE_LEFT;
                    }
                    else if( this._i === MOVE_RIGHT )
                    {
                        // Flip the ship facing right (default orientation)
                        this.playerShip.object.setRotXYZ();

                        // The camera easing positions the player ship at then end of the screen facing inwards
                        if( this._actionResult === defs.EAP_DOWN )
                        {
                            this.playerShip.fireTailSprite.setVisible( true );
                            this.playerShip.fireTailScript.pause = false;
                            this.easingX.init( this.easingX.getValue(), this.playerShipSpeed + this.playerShipBoostSpeed, 2, easing.getLinear() );

                            this.groupPlayer.resume( 'player_thrust' );

                            //console.log("Move Right DOWN");

                            // Camera easing has to move slower or faster then the elements on the screen to avoid movement studder
                            // Don't allow any more camera easing, in this direction, after a certain point
                            if(this._dir < CAMERA_EASING_OFFSET)
                                this.cameraEasingX.init( this.cameraEasingX.getValue(), CAMERA_EASING_SPEED, 1, easing.getLinear() );
                        }
                        else
                        {
                            this.playerShip.fireTailSprite.setVisible( false );
                            this.playerShip.fireTailScript.pause = true;
                            this.easingX.init( this.easingX.getValue(), 0, 3, easing.getLinear() );

                            this.groupPlayer.pause( 'player_thrust' );

                            this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );

                            //console.log("Move Right UP");

                            if( this.playerShipBoostSpeed )
                            {
                                this.playerShipBoostSpeed = 0;
                                //console.log("boost Off");
                            }
                        }

                        this.moveDirX = MOVE_RIGHT;
                    }

                    this.lastMoveDirX = this.moveDirX;
                    this.lastMoveAction = this._actionResult;
                }
                else
                {
                    if( this._i === MOVE_UP )
                    {
                        if( this._actionResult === defs.EAP_DOWN )
                        {
                            this.easingY.init( this.easingY.getValue(), 7, 0.5, easing.getLinear() );
                        }
                        else
                        {
                            this.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
                        }

                        this.moveDirY = MOVE_UP;
                    }
                    else if( this._i === MOVE_DOWN )
                    {
                        if( this._actionResult === defs.EAP_DOWN )
                        {
                            this.easingY.init( this.easingY.getValue(), -7, 0.5, easing.getLinear() );
                        }
                        else
                        {
                            this.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
                        }

                        this.moveDirY = MOVE_DOWN;
                    }
                }

                break;
            }
        }
    }

    // 
    //  DESC: Handle the enemy spawn
    //
    handleEnemySpawn()
    {
        if( this.enemySpawnTimer.expired(true) )
        {
            // Create a enemy and position it outside of the view
            if( this.enemyStrategy.nodeAry.length < this.maxEnemies )
            {
                this._node = this.enemyStrategy.create('enemy_ship');
                this._node.get().setPosXYZ(0, settings.deviceRes.h);
                this._node.transform();
            }

            if( this.enemyMaxTimer.expired(true) && this.maxEnemies < 25 )
            {
                this.maxEnemies++;
            }
        }
    }

    // 
    //  DESC: Handle the train spawn
    //
    handleTrainSpawn( easingVal )
    {
        if( this.train.strategy )
        {
            // If a train is active, move it
            this.train.sprite.incPosXYZ( (this.train.dir * highResTimer.elapsedTime) + -easingVal );

            // Delete the train if it exit's the side of the screen it's moving towards
            if( (this.train.dir === 1 && (this.train.sprite.transPos.x - this.train.node.radius) > settings.deviceRes_half.w) ||
                (this.train.dir === -1 && (this.train.sprite.transPos.x + this.train.node.radius) < -settings.deviceRes_half.w) )
            {
                strategyManager.deactivateStrategy( this.train.strategy );
                this.train.strategy = null;
                this.train.sprite = null;
                this.train.node = null;
                this.train.timer.reset( genFunc.randomInt( 10000, 25000 ) );
            }
        }
        // If we've been without a train for a long enough period, activate the strategy
        else if( this.train.timer.expired() )
        {
            this.train.timer.disable( true );

            this.train.strategy = strategyManager.activateStrategy('_train_');
            this.train.node = this.train.strategy.get('train');
            this.train.sprite = this.train.node.get();

            if( genFunc.randomInt( 0, 1 ) === 0 )
            {
                this.train.dir = -1;
                this.train.sprite.setPosXYZ( settings.deviceRes_half.w + this.train.node.radius, -298 );
            }
            else
            {
                this.train.dir = 1;
                this.train.sprite.setPosXYZ( -(settings.deviceRes_half.w + this.train.node.radius), -298 );
            }
        }
    }

    // 
    //  DESC: Handle the cloud movement
    //
    handleCloudMovement()
    {
        for( this._i = 0; this._i < MAX_CLOUDS; ++this._i )
        {
            this.cloudAry[this._i].incPosXYZ(highResTimer.elapsedTime * this.cloudAry[this._i].speed);

            if(this.cloudAry[this._i].pos.x - (this.cloudAry[this._i].getSize().w / 2) > settings.deviceRes_half.w)
            {
                this.cloudAry[this._i].setScaleXYZ(genFunc.randomInt(2, 4), genFunc.randomInt(2, 4));
                this.cloudAry[this._i].speed = genFunc.randomArbitrary(0.001, 0.02);
                this.cloudAry[this._i].setPosXYZ(-((this.cloudAry[this._i].getSize().w / 2) + settings.deviceRes_half.w), genFunc.randomInt(CLOUD_MIN_Y, CLOUD_MAX_Y));

                // Flip the sprite?
                this.cloudAry[this._i].setRotXYZ(0, 0);
                if(genFunc.randomInt(0, 1))
                    this.cloudAry[this._i].setRotXYZ(0, 180);
            }
        }
    }

    //
    //  DESC: Handle the radar movement
    //
    handleRadarMovement( easingVal )
    {
        this.radarCamAry[0].incPosXYZ( easingVal * RADAR_SCALE );

        // Wrap the radar by flipping the camera
        if( this.radarCamAry[1].pos.x > -68 )
        {
            this.radarCamAry.push( this.radarCamAry.shift() );
        }

        if( this.radarCamAry[0].pos.x > -68 )
        {
            this.radarCamAry[1].setPosXYZ( -(this.radarCamAry[0].pos.x - ((GAMEPLAY_LOOPING_WRAP_DIST * 2) * this.radarCamera1.scale.x)) );
        }
        else
        {
            this.radarCamAry[1].setPosXYZ( -(this.radarCamAry[0].pos.x + ((GAMEPLAY_LOOPING_WRAP_DIST * 2) * this.radarCamera1.scale.x)) );
        }
    }

    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        if( !menuManager.active && this.gameReady )
        {
            this.easingX.execute();
            this.easingY.execute();
            this.cameraEasingX.execute();

            this._easingVal = this.easingX.getValue() + this.cameraEasingX.getValue();

            // Handle the enemy spawn
            this.handleEnemySpawn();

            // Handle the train spawn
            this.handleTrainSpawn( this._easingVal );

            // Handle the cloud movement
            this.handleCloudMovement();

            // Handle the radar movement
            this.handleRadarMovement( this._easingVal );

            this.levelCamera.incPosXYZ( this._easingVal );
            this.forgroundCamera.incPosXYZ( this._easingVal );
            this.buildingsCamera.incPosXYZ( this._easingVal );
            this.buildingsbackCamera.incPosXYZ( this._easingVal * 0.25 );
            this.buildingsfrontCamera.incPosXYZ( this._easingVal * 0.5 );

            // Loop the static backgrounds
            if( this.buildingsbackCamera.pos.x < -LOOPING_BKG_WRAP_DIST )
                this.buildingsbackCamera.incPosXYZ( -(LOOPING_BKG_WRAP_DIST * 2) );
            else if( this.buildingsbackCamera.pos.x > LOOPING_BKG_WRAP_DIST )
                this.buildingsbackCamera.incPosXYZ( LOOPING_BKG_WRAP_DIST * 2 );

            if( this.buildingsfrontCamera.pos.x < -LOOPING_BKG_WRAP_DIST )
                this.buildingsfrontCamera.incPosXYZ( -(LOOPING_BKG_WRAP_DIST * 2) );
            else if( this.buildingsfrontCamera.pos.x > LOOPING_BKG_WRAP_DIST )
                this.buildingsfrontCamera.incPosXYZ( LOOPING_BKG_WRAP_DIST * 2 );

            if( this.forgroundCamera.pos.x < -LOOPING_BKG_WRAP_DIST )
                this.forgroundCamera.incPosXYZ( -(LOOPING_BKG_WRAP_DIST * 2) );
            else if( this.forgroundCamera.pos.x > LOOPING_BKG_WRAP_DIST )
                this.forgroundCamera.incPosXYZ( LOOPING_BKG_WRAP_DIST * 2 );

            // Set the wrap around camera when we are about to exceed the range of the buildings
            if( this.buildingsCamera.pos.x > -6200 && this.buildingsCamera.pos.x < -4900 )
                this.wrapAroundCamera.setPosXYZ( -(this.buildingsCamera.pos.x + ((GAMEPLAY_LOOPING_WRAP_DIST * 2))) );
            else if( this.buildingsCamera.pos.x > 5000 && this.buildingsCamera.pos.x < 6300 )
                this.wrapAroundCamera.setPosXYZ( -(this.buildingsCamera.pos.x - (GAMEPLAY_LOOPING_WRAP_DIST * 2)) );

            // Reset the building camera once we are done with filling the gap with the wrap around camera
            if( this.buildingsCamera.pos.x < -6200 )
                this.buildingsCamera.incPosXYZ( -(GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            else if( this.buildingsCamera.pos.x > 6300)
                this.buildingsCamera.incPosXYZ( GAMEPLAY_LOOPING_WRAP_DIST * 2 );

            // Stop the up/down movement
            if( (this.moveDirY === MOVE_UP && this.playerShip.sprite.transPos.y > (settings.deviceRes_half.h * 0.73)) ||
                (this.moveDirY === MOVE_DOWN && this.playerShip.sprite.transPos.y < -(settings.deviceRes_half.h * 0.92)) )
            {
                this.moveDirY = MOVE_NULL;
                this.easingY.init( 0, 0, 0, easing.getLinear(), true );
            }

            // Handle camera easing when at the other end of the screen, based on which way the player ship is facing.
            // The camera easing positions the player ship at then end of the screen facing inwards
            if( this.moveDirX > MOVE_NULL )
            {
                this._dir = -this.levelCamera.transPos.x - this.playerShip.sprite.transPos.x;

                if( (this.moveDirX === MOVE_LEFT && this._dir < -(settings.deviceRes_half.w - CAMERA_EASING_OFFSET)) )
                {
                    this.moveDirX = MOVE_NULL;
                    this._time = CAMERA_EASING_DIVISOR / Math.abs(this.cameraEasingX.getValue());

                    // Don't allow any more camera easing, in this direction, after a certain point
                    // We enter this if when the player holds down thrust
                    if( this._time < CAMERA_EASING_DIVISOR && this._dir > -CAMERA_EASING_OFFSET )
                    {
                        this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, this._time, easing.getLinear() );
                    }
                    // Bring the camera easing to a stop once we've reached our limit
                    // We enter this eles if the player is constantly thrusting
                    else
                    {
                        this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 0.25, easing.getLinear() );
                    }
                }
                else if( (this.moveDirX === MOVE_RIGHT && this._dir > (settings.deviceRes_half.w - CAMERA_EASING_OFFSET)) )
                {
                    this.moveDirX = MOVE_NULL;
                    this._time = CAMERA_EASING_DIVISOR / Math.abs(this.cameraEasingX.getValue());

                    // Don't allow any more camera easing, in this direction, after a certain point
                    // We enter this if when the player holds down thrust
                    if( this._time < CAMERA_EASING_DIVISOR && this._dir < CAMERA_EASING_OFFSET )
                    {
                        this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, this._time, easing.getLinear() );
                    }
                    // Bring the camera easing to a stop once we've reached our limit
                    // We enter this eles if the player is constantly thrusting
                    else
                    {
                        this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 0.25, easing.getLinear() );
                    }
                }
            }

            this.playerShip.sprite.incPosXYZ( this.easingX.getValue(), this.easingY.getValue() );

            // Loop the player strategy and camera
            if( this.playerShip.sprite.pos.x < -GAMEPLAY_LOOPING_WRAP_DIST )
            {
                for( this._i = 0; this._i < this.playerShip.strategy.nodeAry.length; ++this._i )
                    this.playerShip.strategy.nodeAry[this._i].get().incPosXYZ( GAMEPLAY_LOOPING_WRAP_DIST * 2 );

                this.levelCamera.incPosXYZ( GAMEPLAY_LOOPING_WRAP_DIST * 2 );
            }
            else if( this.playerShip.sprite.pos.x > GAMEPLAY_LOOPING_WRAP_DIST )
            {
                for( this._i = 0; this._i < this.playerShip.strategy.nodeAry.length; ++this._i )
                    this.playerShip.strategy.nodeAry[this._i].get().incPosXYZ( -(GAMEPLAY_LOOPING_WRAP_DIST * 2) );

                this.levelCamera.incPosXYZ( -(GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            }
            
            strategyManager.update();
            this.upperHudStategy.update();
            this.lowerHudStategy.update();
            this.enemyStrategy.update();
            this.playerShip.strategy.update();
        }
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();

        if( this.gameReady )
        {
            strategyManager.transform();
            this.upperHudStategy.transform();
            this.lowerHudStategy.transform();
            this.enemyStrategy.transform();
            this.playerShip.strategy.transform();
        }
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        if( this.gameReady )
        {
            super.render();
            
            strategyManager.render();

            // Render with the wrap around camera when we exceed the range of the buildings
            if( this.buildingsCamera.pos.x < -4900 || this.buildingsCamera.pos.x > 5000 )
            {
                this.buildingsStrategy.render( this.wrapAroundCamera );
                this.enemyStrategy.render( this.wrapAroundCamera );
            }

            this.enemyStrategy.render();
            this.playerShip.strategy.render();
            this.lowerHudStategy.render();

            // Render the top hud radar map
            this._viewPort = device.gl.getParameter(device.gl.VIEWPORT);
            device.gl.viewport(this._viewPort[0], this._viewPort[3] - (this._viewPort[3] * 0.09), this._viewPort[2], this._viewPort[3] * this.radarCamera1.scale.y);
            this.buildingsStrategy.render( this.radarCamera1 );
            this.enemyStrategy.render( this.radarCamera1 );
            this.playerShip.strategy.render( this.radarCamera1 );
            this.buildingsStrategy.render( this.radarCamera2 );
            this.enemyStrategy.render( this.radarCamera2 );
            this.playerShip.strategy.render( this.radarCamera2 );
            device.gl.viewport(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);

            this.upperHudStategy.render();

            menuManager.render();
        }
    }

    // 
    //  DESC: Clean up after this state ends
    //
    cleanUp()
    {
        // Can also delete individual strategies
        strategyManager.clear();

        // Clear out any loaded AI
        aiManager.clear();

        // Clear out any AI data dictionaries
        ai.clearAIData();
        
        objectDataManager.freeGroup( ['(level_1)'] );

        // Disconnect to the collision signal
        signalManager.clear_collisionSignal();

        this.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );

        soundManager.freeGroup( '(level_1)' );

        // Do a delayed stop on all the music except the ambient
        for( let i = 0; i < this.musicAry.length; ++i )
        {
            let gsnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[i]}` );
            scriptSingleton.prepare( scriptManager.get('DelayedExecution')( 500, null, () => gsnd.stop() ) );
        }
    }
}

// 
//  DESC: Load files
//
//  Use when you have nothing to load
//  return Promise.resolve();
//
export function load()
{
    let groupAry = ['(level_1)'];
    
    return objectDataManager.loadGroup( groupAry )

        // Load the AI. Needs to be loaded before the strategy loader
        .then(() => aiManager.loadFromXml( genFunc.stringLoadXML( enemy_ai ) ))

        // Load and execute all the strategy loaders.
        .then(() => strategyLoader.loadGroup( '-level1-' ))

        .then(() => soundManager.loadGroup( groupAry ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })
}
