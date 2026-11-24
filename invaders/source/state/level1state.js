
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
import { device, isMobile } from '../../../library/system/device';
import { platform } from '../../../library/system/platform';
import { Color } from '../../../library/common/color';
import * as uiControlDefs from '../../../library/gui/uicontroldefs';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as genFunc from '../../../library/utilities/genfunc';
import * as menuDefs from '../../../library/gui/menudefs';
import * as touchevent from '../../../library/common/touchevent';
import * as stateDefs from './statedefs';
import * as gameDefs from './gamedefs';
import * as aidata from '../scripts/aidata';
import * as pest01aiscripts from '../scripts/pest01aiscripts';
import * as wreck00aiscripts from '../scripts/wreck00aiscripts';

// AI_Wreck00 AI_Pest00 AI_Pest01 AI_MiniBoss00 AI_MiniBoss01
import wreck00_ai from 'raw-loader!../../data/objects/ai/wreck00.ai';
import pest00_ai from 'raw-loader!../../data/objects/ai/pest00.ai';
import pest01_ai from 'raw-loader!../../data/objects/ai/pest01.ai';
import mini_boss_00_ai from 'raw-loader!../../data/objects/ai/mini_boss_00.ai';
import mini_boss_01_ai from 'raw-loader!../../data/objects/ai/mini_boss_01.ai';
import boss00_ai from 'raw-loader!../../data/objects/ai/boss00.ai';

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
      WRECK00_SHOT_ID = -2,
      HEALTH_CHARACTER = -50,
      WRECK00_SHIP_HIT_VALUE = 1,
      MINI_BOSS_00_SHIP_HIT_VALUE = 5,
      MINI_BOSS_01_SHIP_HIT_VALUE = 3,
      MINI_BOSS_00_INITIAL_SHIP_HIT_COUNT = 30,
      MINI_BOSS_00_MAX_SHIP_HIT_COUNT = 100,
      MINI_BOSS_00_SHIP_HIT_INC = 10,
      MINI_BOSS_01_INITIAL_SHIP_HIT_COUNT = 10,
      MINI_BOSS_01_MAX_SHIP_HIT_COUNT = 60,
      MINI_BOSS_01_SHIP_HIT_INC = 5,
      WRECK00_SHIP_HIT_COUNT = 3,
      WRECK00_RAM_COOLDOWN = 500,
      WRECK00_SHOT_DAMAGE = 10,             // Player ship damage (health is 100, DEFAULT_SHIP_PROGRESS_BAR_VALUE)
      WRECK00_AGGRESSIVE_SHOT_DAMAGE = 20,
      WRECK00_RAM_DAMAGE = 15,
      PEST00_RAM_DAMAGE = 15,
      PEST01_RAM_DAMAGE = 15,
      MINI_BOSS_RAM_DAMAGE = 15,
      BOSS00_RAM_DAMAGE = 15,
      HEALTH_CHARACTER_HEAL = 30,
      BUILDING_SAVE_BONUS = 2,              // Extra points for killing a wreck00 while it's attacking a building
      BUILDING_SAVE_HEAL = 10,              // Player health for the save
      PEST00_SHIP_HIT_VALUE = 2,
      PEST00_SHIP_HIT_COUNT = 3,
      PEST00_RAM_COOLDOWN = 500,
      PEST01_SHIP_HIT_VALUE = 1,
      PEST01_SWARM_BONUS = 3,               // Extra points for killing all the swarm members
      PEST_LEVEL_THRESHOLD = 2,             // The Pest group (pest00, pest01) shares one spawn timer, started at this level
      PEST_BATTLE_SPAWN_LEVEL = 15,         // From this level Pests also spawn while a mini-boss or the boss is out
      PEST_SPAWN_TIME_MIN = 20000,
      PEST_SPAWN_TIME_MAX = 50000,
      MAX_PEST_STREAK = 2,                  // After this many of the same Pest in a row, the other one spawns next
      BOSS00_SHIP_HIT_VALUE = 10,
      MINI_BOSS_00_LEVEL_THRESHOLD = 5,
      MINI_BOSS_01_LEVEL_THRESHOLD = 3,
      MAX_WRECK00 = 30,
      MIN_WRECK00 = 5,
      HEALTH_CHAR_THRESHOLD = 3,
      CLOUD_MIN_Y = -150,
      CLOUD_MAX_Y = 300,
      LOOPING_BKG_WRAP_DIST = 1280,
      // The enemies are also rendered with the wrap around camera once the view is past this (wider than the
      // buildings' -4900/5000). The boss (about 670px wide, culling radius about 389) can sit right up to the
      // wrap point (5600), so it's visible across it from 5600 - (640 half screen + 389) = 4571.
      ENEMY_WRAP_RENDER_DIST = 4500,
      RADAR_SCALE = 0.1,
      DEFAULT_SHIP_PROGRESS_BAR_VALUE = 100,
      DEFAULT_SHIP_BOOST_BAR_VALUE = 3000,
      DEFAULT_SHIP_SHIELD_BAR_VALUE = 1000,
      SHIELD_RECHARGE_SPEED = 0.05,
      GAME_START_MENU_DEFAULT_MSG = 0,
      GAME_START_MENU_AD_THANKS_MSG = 1,
      GAME_START_MENU_AD_ERROR_MSG = 2,
      REWARD_FEATURE_UNLIMITED_BOOST = 1,
      REWARD_FEATURE_DOUBLE_HEALTH = 2,
      REWARD_FEATURE_HEAL_OVER_TIME = 3,
      REWARD_FEATURE_RAPID_FIRE = 4,
      REWARD_FEATURE_SHIELD_OVERDRIVE = 5,
      SHIELD_OVERDRIVE_SCALE = 1.5,
      RAPID_FIRE_INTERVAL = 150,
      TOUCH_HOLD_TIME = 300,
      TOUCH_BOOST_SWIPE_DIST = 40,
      MAX_MINI_BOSS_STREAK = 2,
      GOD_MODE = false;

var gAdPlayed = false,
    gAdError = false,
    gAdErrorCode = "";

const fadeOutAmbientMusic_cb =
{
    adStarted: () => {
    },
    adFinished: () => {
        gAdPlayed = true;
        
        eventManager.dispatchEvent( stateDefs.ESE_GAME_AD_FINISHED, 0 );
    },
    adError: (error) => {
        gAdError = true;
        gAdErrorCode = error;

        eventManager.dispatchEvent( stateDefs.ESE_GAME_AD_FINISHED, 0 );
    }
};


export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );

        // Set the collision callback signal
        signalManager.connect_collisionSignal( this.collisionCallBack.bind(this) );

        // Start the fade script
        scriptSingleton.prepare( 'screen_fade', 0, 1, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE );

        // Clear the event queue
        eventManager.clear();

        // Register touch callbacks for mobile
        if( isMobile() )
        {
            eventManager.leftTouchCallback = this.onLeftTouch.bind(this);
            eventManager.leftTouchEndCallback = this.onLeftTouchEnd.bind(this);
            eventManager.rightTouchEndCallback = this.onRightTouchEnd.bind(this);
            eventManager.rightTouchCallback = this.onRightTouch.bind(this);

            // Apply the left-handed (swap movement/action sides) preference
            eventManager.leftHandedTouch = (settings.user.leftHandedTouch === 1);
        }

        // Clear the last device used so that the button on start game menu is active by default
        actionManager.clearLastDeviceUsed();
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.getTree('pause_tree').setDefaultMenu('game_start_menu');
        menuManager.activateTree( ['pause_tree'] );
        menuManager.getTree( 'pause_tree' ).transitionMenu();
        
        // Prepare the strategies to run
        this.bkgStrategy = strategyManager.activateStrategy('_background_');
        this.buildingsBackStrategy = strategyManager.activateStrategy('_buildingsback_');
        this.buildingsFrontStrategy = strategyManager.activateStrategy('_buildingsfront_');
        this.buildingsStrategy = strategyManager.activateStrategy('_buildings_');
        this.forgroundStrategy = strategyManager.activateStrategy('_forground_');

        // Aquire strategies that are handled outside of the manager
        this.lowerHudStategy = strategyManager.get('_lower_hud_');
        this.upperHudStategy = strategyManager.get('_upper_hud_');
        this.hudLevelFont = this.upperHudStategy.get('level_font').get();
        this.hudProgressBar = this.upperHudStategy.get('level_progress_bar').get();
        this.enemyStrategy = strategyManager.get('_enemy_');
        this.enemyShotStrategy = strategyManager.get('_enemy_shot_');

        // Y Offset based on the building for the health character
        this.healthCharYOffsetAry = [80,102,45,86,110,68,66,98];

        // Randomly distrabute the clouds
        this.cloudAry = [];
        for( let i = 0; i < MAX_CLOUDS; ++i )
        {
            this._sprite = this.bkgStrategy.get(`cloud_${i}`).get();
            this._sprite.speed = genFunc.randomArbitrary(0.001, 0.02);
            this._sprite.setPosXYZ(genFunc.randomInt(-640, 640), genFunc.randomInt(CLOUD_MIN_Y, CLOUD_MAX_Y));
            this._sprite.setScaleXYZ(genFunc.randomInt(2, 4), genFunc.randomInt(2, 4));
            // Flip the sprite?
            if(genFunc.randomInt(0, 1))
                this._sprite.setRotXYZ(0, 180);

            this.cloudAry.push(this._sprite);
        }

        // Init the hud background colors
        this.hudBkColor = [];
        this.hudBkColor.push(new Color(0, 150, 255, 1));
        this.hudBkColor.push(new Color(114, 114, 216, 1));
        this.hudBkColor.push(new Color(255, 190, 163, 1));

        // Init the hud frame colors
        this.hudFrameColor = [];
        this.hudFrameColor.push(new Color(48, 97, 153, 1));
        this.hudFrameColor.push(new Color(56, 56, 108, 1));
        this.hudFrameColor.push(new Color(125, 83, 94, 1));

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

        this.radarCamera1.projHeight = device.gl.getParameter(device.gl.VIEWPORT)[3] * RADAR_SCALE;
        this.radarCamera1.initFromXml();

        this.radarCamera2.projHeight = device.gl.getParameter(device.gl.VIEWPORT)[3] * RADAR_SCALE;
        this.radarCamera2.initFromXml();

        this.radarCamAry = [this.radarCamera1,this.radarCamera2];

        // Move the buildings into the active list so that the AI script tree has access to the sprites
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
        this.lastMoveAction = defs.EAP_IDLE;

        if(GOD_MODE)
            this.unlimitedBoost = true;
        else
            this.unlimitedBoost = false;

        // Rapid Fire reward: holding the fire button (on mobile, holding the right side) keeps firing
        this.rapidFire = false;

        // Shield Overdrive reward: 1.5x the shield time and recharge rate, no lockout after a full drain
        this.shieldOverdrive = false;

        // Create a player for this group
        this.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
        this.groupPlayer.play( 'player_thrust', true );
        this.groupPlayer.pause( 'player_thrust' );

        this.gameStartStopToggle = false;
        this.gameReady = true;
        this.musicCounter = 0;
        this.musicAry = [0, 1, 2];
        genFunc.shuffle( this.musicAry );

        this.setYTGameScore();

        // Indicate to the game portal the end of the loading
        platform.loadingStop();
        
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
        this.playerShip.boostBar = this.playerShip.node.findChild('UIBoostBar').get();
        this.playerShip.shieldBar = this.playerShip.node.findChild('UIShieldBar').get();
        this.playerShip.shieldSprite = this.playerShip.node.findChild('player_shield').get();
        this.playerShip.fireTailSprite = this.playerShip.node.findChild('player_fire_tail').get();
        this.playerShip.fireTailScript = this.playerShip.fireTailSprite.prepareScript( 'fireTailAnim' );
        this.playerShip.speed = PLAYER_SHIP_TOP_SPEED;
        this.playerShip.boostSpeed = 0;
        this.playerShip.boostButtonPress = defs.EAP_UP;
        this.playerShip.waitForFullBoostCharge = false;
        this.playerShip.shieldButtonPress = defs.EAP_UP;
        this.playerShip.waitForFullShieldCharge = false;
        this.playerShip.collisionTimer = new Timer(1000, true);

        this.playerShip.progressBar.setProgressBarMax( DEFAULT_SHIP_PROGRESS_BAR_VALUE );
        this.playerShip.progressBar.setCurrentValue( DEFAULT_SHIP_PROGRESS_BAR_VALUE );

        this.playerShip.boostBar.setProgressBarMax( DEFAULT_SHIP_BOOST_BAR_VALUE );
        this.playerShip.boostBar.setCurrentValue( DEFAULT_SHIP_BOOST_BAR_VALUE );

        this.playerShip.shieldBar.setProgressBarMax( DEFAULT_SHIP_SHIELD_BAR_VALUE );
        this.playerShip.shieldBar.setCurrentValue( DEFAULT_SHIP_SHIELD_BAR_VALUE );

        // This part is needed for the reload but here for completeness
        this.playerShip.object.setRotXYZ();
        this.playerShip.sprite.setPosXYZ();
        this.playerShip.sprite.setRotXYZ();
        this.playerShip.sprite.collisionComponent.enable = true;
        this.playerShip.progressBar.setVisible( false );
        this.playerShip.boostBar.setVisible( false );
        this.setShield( false );
        this.playerShip.shieldBar.setVisible( false );
    }

    // 
    //  DESC: Init the misc objects
    //
    initMiscObjects()
    {
        this.slowHealTimer = null;
        this.musicTimer = new Timer((1000 * 60 * 5));

        this.wreck00SpawnTimer = new Timer(1000 * 2.5);
        this.miniBossSpawnTimer = new Timer(genFunc.randomInt( (1000 * 30), (1000 * 130)));
        this.miniBossSpawnTimer.disable();
        this.lastMiniBossType = '';
        this.miniBossStreakCount = 0;
        this.lastPestType = '';
        this.pestStreakCount = 0;
        this.healthSpawnTimer = new Timer(genFunc.randomInt( (1000 * 20), (1000 * 60)));
        this.healthSpawnTimer.disable();
        this.wreck00MaxTimer = new Timer(1000 * 20);
        this.wreck00Max = MIN_WRECK00;
        this.pestSpawnTimer = new Timer(genFunc.randomInt( PEST_SPAWN_TIME_MIN, PEST_SPAWN_TIME_MAX ));
        this.pestSpawnTimer.disable();

        // The boss battle takes the place of the next mini-boss once the player has fought both mini-bosses
        this.foughtMiniBoss00 = false;
        this.foughtMiniBoss01 = false;

        // Boss battle in progress (boss music plays instead of the game music, wreck00 spawns slower)
        this.bossBattleActive = false;
        this.wreck00BossSpawnTick = 0;

        // Boss head sprite, and whether the screen is locked because the boss is in view (see handleBossScreenLock())
        this.bossSprite = null;
        this.bossScreenLock = false;
        this.bossBrake = false;
        this.bossBrakeDone = false;

        // Fire button held (for the Rapid Fire reward)
        this.shootHeld = false;
        this.rapidFireTime = 0;

        // For Mobile: the shield is held with two fingers on the right side
        this.touchShieldHeld = false;

        this.miniBoss00ShipHitCount = MINI_BOSS_00_INITIAL_SHIP_HIT_COUNT;
        this.miniBoss01ShipHitCount = MINI_BOSS_01_INITIAL_SHIP_HIT_COUNT;

        this.train = {};
        this.train.strategy = null;
        this.train.timer = new Timer( genFunc.randomInt( 10000, 25000 ) );
        this.train.sprite = null;
        this.train.node = null;
        this.train.dir = 0;
        this.train.camera = cameraManager.get('trainCamera');

        this.allowMiniBoss = false;

        // Swarm out (Level1State.handleEnemySpawn() restarts the Pest spawn timer when it's gone)
        this.swarmActive = false;

        // The game start menu is up (first start and restart): the spawn timers don't run until it
        // closes (resumed in the EME_MENU_TRANS_OUT handler). Disabled timers ignore pause; they're
        // enabled during gameplay.
        this.wreck00SpawnTimer.pause();
        this.miniBossSpawnTimer.pause();
        this.healthSpawnTimer.pause();
        this.wreck00MaxTimer.pause();
        this.pestSpawnTimer.pause();
        this.train.timer.pause();
    }

    // 
    //  DESC: Set the level score
    //
    setYTGameScore()
    {
        platform.sendScore( this.playerLevel );
    }

    // 
    //  DESC: Restart the game
    //
    restartGame()
    {
        this.gameReady = false;
        this.playerShip = null;

        // Stop all the level sounds so the pause menu doesn't resume them. Re-prime the thrust
        // (it's resumed/paused by the ship movement)
        soundManager.stopGroup( '(level_1)' );
        this.groupPlayer.play( 'player_thrust', true );
        this.groupPlayer.pause( 'player_thrust' );

        aidata.clearAIData();
        pest01aiscripts.clearSwarm();
        wreck00aiscripts.clearLockCooldown();
        strategyManager.deleteStrategy( ['_buildings_','_enemy_','_enemy_shot_','_player_ship_','_train_'] );
        strategyLoader.loadGroup( '-reloadlevel1-' )
        .then(() =>
        {
            this.buildingsStrategy = strategyManager.activateStrategy('_buildings_');

            // Move the buildings into the active list so that the AI script tree has access to the sprites
            strategyManager.get("_buildings_").addToActiveList();

            // Reactivate strategies
            this.enemyStrategy = strategyManager.get('_enemy_');
            this.enemyShotStrategy = strategyManager.get('_enemy_shot_');

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

            // Setup the rewards if the player watched an ad
            this.setupRewards();

            this.gameReady = true;

            this.setYTGameScore();

            // Clear the last device used so that the button on start game menu is active by default
            actionManager.clearLastDeviceUsed();

            scriptSingleton.prepare( 'screen_fade', 0, 1, 500, stateDefs.ESE_GAME_RELOAD );
        })
    }

    // 
    //  DESC: Start the Ad
    //
    startAd()
    {
        this.gameReady = false;

        // Preload the strategies
        Promise.all([
            platform.requestRewardedAd( fadeOutAmbientMusic_cb )
        ]);
    }

    // 
    //  DESC: Something hit the player ship: the explosion and its sound, or only the impact sound on the shield
    //
    playerHitEffect( sprite, soundId )
    {
        if( this._shieldHit )
        {
            this.groupPlayer.play( 'player_impact' );
        }
        else
        {
            this.playerShip.sprite.prepareScript( 'hit', sprite );
            this.groupPlayer.play( soundId );
        }
    }

    // 
    //  DESC: handle collisions
    //
    collisionCallBack( spriteA, spriteB )
    {
        // The shield was hit: handled like a hit on the player ship (projectile hit, wreck00 hit/die, score,
        // ram cooldown), except the ship takes no damage and there's no explosion, just the impact sound
        // (the shield is a child of the player ship node, so it has the ship's userId: compare the sprite)
        this._shieldHit = (spriteB === this.playerShip.shieldSprite);
        if( this._shieldHit )
            spriteB = this.playerShip.sprite;

        // Player ship was involved in a collision
        if(spriteB.parentNode.userId == gameDefs.PLAYER_SHIP_ID)
        {
            spriteA.collisionComponent.enable = false;

            // Player hit by wreck00 projectile
            if( spriteA.parentNode.userId == WRECK00_SHOT_ID )
            {
                if( GOD_MODE == false && !this._shieldHit )
                {
                    // Was player hit by an aggressive shot? Takes more damage
                    if(spriteA.visualComponent.frameIndex == 1)
                        this.playerShip.progressBar.incCurrentValue( -WRECK00_AGGRESSIVE_SHOT_DAMAGE );
                    else
                        this.playerShip.progressBar.incCurrentValue( -WRECK00_SHOT_DAMAGE );
                    this.playerShip.progressBar.setVisible( true );
                }
                this.playerHitEffect( spriteA, 'player_hit' );
                spriteA.prepareScript( 'hit' );
            }
            // Player hit by a boss00 missile
            else if( spriteA.parentNode.userId == gameDefs.BOSS00_SHOT_ID )
            {
                if( GOD_MODE == false && !this._shieldHit )
                {
                    this.playerShip.progressBar.incCurrentValue( -gameDefs.BOSS00_MISSILE_DAMAGE );
                    this.playerShip.progressBar.setVisible( true );
                }
                this.playerHitEffect( spriteA, 'player_hit' );
                spriteA.prepareScript( 'hit' );
            }
            // Player collides into wreck00
            else if( spriteA.parentNode.userId == gameDefs.WRECK00_SHIP_ID )
            {
                // Re-enable collision for wreck00 for the aggressive type
                spriteA.collisionComponent.enable = true;

                // Each wreck00 has its own short ram cooldown (not the shared playerShip.collisionTimer), so one ram
                // counts once (the collision repeats every frame of contact) without blocking hits on other enemies
                if( performance.now() - spriteA.ramTime > WRECK00_RAM_COOLDOWN )
                {
                    spriteA.ramTime = performance.now();

                    if( GOD_MODE == false && !this._shieldHit )
                    {
                        this.playerShip.progressBar.incCurrentValue( -WRECK00_RAM_DAMAGE );
                        this.playerShip.progressBar.setVisible( true );
                    }

                    spriteA.prepareScript( 'hit', spriteB );

                    spriteA.hitCount++;

                    // In passive mode (frame 0), one shot kills
                    if( spriteA.visualComponent.frameIndex === 0 )
                    {
                        spriteA.collisionComponent.enable = false;
                        spriteA.prepareScript( 'die', spriteB );
                        this.updateHudProgress( WRECK00_SHIP_HIT_VALUE );
                    }
                    // In aggressive mode (frame 1), takes multiple shots to kill
                    else if( spriteA.hitCount == WRECK00_SHIP_HIT_COUNT )
                    {
                        this._saveBonus = this.buildingSaveBonus( spriteA );   // before the die script lets go of the building
                        spriteA.collisionComponent.enable = false;
                        spriteA.prepareScript( 'die', spriteB );
                        this.updateHudProgress( (WRECK00_SHIP_HIT_VALUE * 2) + this._saveBonus );
                    }

                    this.playerHitEffect( spriteA, 'EXPLOSION_Metllic' );
                }
            }
            // Player hit by a mini_boss_00 mine
            else if( spriteA.parentNode.userId == gameDefs.MINI_BOSS_00_MINE_ID )
            {
                if( GOD_MODE == false && !this._shieldHit )
                {
                    this.playerShip.progressBar.incCurrentValue( -gameDefs.MINI_BOSS_00_MINE_DAMAGE );
                    this.playerShip.progressBar.setVisible( true );
                }
                this.playerHitEffect( spriteA, 'player_hit' );
                spriteA.prepareScript( 'hit' );
            }
            // Player hit by a pest00 missile
            else if( spriteA.parentNode.userId == gameDefs.PEST00_SHOT_ID )
            {
                if( GOD_MODE == false && !this._shieldHit )
                {
                    this.playerShip.progressBar.incCurrentValue( -gameDefs.PEST00_MISSILE_DAMAGE );
                    this.playerShip.progressBar.setVisible( true );
                }
                this.playerHitEffect( spriteA, 'player_hit' );
                spriteA.prepareScript( 'hit' );
            }
            // Player collides into pest00
            else if( spriteA.parentNode.userId == gameDefs.PEST00_SHIP_ID )
            {
                // Keep pest00 collidable (the top of this branch disabled it)
                spriteA.collisionComponent.enable = true;

                // Its own short ram cooldown, like wreck00, so one ram counts once
                if( performance.now() - spriteA.ramTime > PEST00_RAM_COOLDOWN )
                {
                    spriteA.ramTime = performance.now();

                    if( GOD_MODE == false && !this._shieldHit )
                    {
                        this.playerShip.progressBar.incCurrentValue( -PEST00_RAM_DAMAGE );
                        this.playerShip.progressBar.setVisible( true );
                    }

                    // A ram only damages the player ship, never pest00

                    this.playerHitEffect( spriteA, 'EXPLOSION_Metllic' );
                }
            }
            // Player hit by a pest01 shot
            else if( spriteA.parentNode.userId == gameDefs.PEST01_SHOT_ID )
            {
                if( GOD_MODE == false && !this._shieldHit )
                {
                    this.playerShip.progressBar.incCurrentValue( -gameDefs.PEST01_SHOT_DAMAGE );
                    this.playerShip.progressBar.setVisible( true );
                }
                this.playerHitEffect( spriteA, 'player_hit' );
                spriteA.prepareScript( 'hit' );
            }
            // Player collides into a pest01 swarm member: it disturbs the swarm and the member dies
            else if( spriteA.parentNode.userId == gameDefs.PEST01_SHIP_ID )
            {
                if( GOD_MODE == false && !this._shieldHit )
                {
                    this.playerShip.progressBar.incCurrentValue( -PEST01_RAM_DAMAGE );
                    this.playerShip.progressBar.setVisible( true );
                }
                this.playerHitEffect( spriteA, 'EXPLOSION_Metllic' );
                this.pest01Killed( spriteA, spriteB );
            }
            // Player collides into mini_boss_00 or mini_boss_01
            else if( spriteA.parentNode.userId == gameDefs.MINI_BOSS_00_SHIP_ID || spriteA.parentNode.userId == gameDefs.MINI_BOSS_01_SHIP_ID )
            {
                spriteA.collisionComponent.enable = true;
                if(this.playerShip.collisionTimer.expired(true))
                {
                    if( GOD_MODE == false && !this._shieldHit )
                    {
                        this.playerShip.progressBar.incCurrentValue( -MINI_BOSS_RAM_DAMAGE );
                        this.playerShip.progressBar.setVisible( true );
                    }
                    this.playerHitEffect( spriteA, 'EXPLOSION_Metllic' );
                }
            }
            // Player collides into the boss (the boss damages the player when it barrels past)
            else if( spriteA.parentNode.userId == gameDefs.BOSS00_SHIP_ID )
            {
                // Keep the boss collidable (the top of this branch disabled it)
                spriteA.collisionComponent.enable = true;
                if(this.playerShip.collisionTimer.expired(true))
                {
                    if( GOD_MODE == false && !this._shieldHit )
                    {
                        this.playerShip.progressBar.incCurrentValue( -BOSS00_RAM_DAMAGE );
                        this.playerShip.progressBar.setVisible( true );
                    }
                    this.playerHitEffect( spriteA, 'EXPLOSION_Metllic' );
                }
            }
            // Player collides with health character
            else if( spriteA.parentNode.userId == HEALTH_CHARACTER )
            {
                // We are done with these sprites, queue it up to be recycled
                this.enemyStrategy.recycle( spriteA.parentNode );
                this.enemyStrategy.recycle( 'help' );
                this.groupPlayer.play( 'exclamation_male_b' );
                this.healthSpawnTimer.reset();

                // Release it's lock on the building
                spriteA.targetBuilding = null;

                if(!this.playerShip.progressBar.isMaxValue())
                {
                    this.playerShip.progressBar.incCurrentValue( HEALTH_CHARACTER_HEAL );

                    if(this.playerShip.progressBar.isMaxValue())
                        this.playerShip.progressBar.setVisible( false );
                }
            }

            // Player ship is to die from above hit/collision
            if( this.playerShip.progressBar.isMinValue() && this.playerShip.sprite.collisionComponent.enable )
            {
                this.playerShip.sprite.collisionComponent.enable = false;
                this.playerShip.progressBar.setVisible( false );
                this.playerShip.boostBar.setVisible( false );
                this.playerShip.shieldBar.setVisible( false );
                this.playerShip.fireTailSprite.setVisible( false );
                this.playerShip.fireTailScript.pause = true;
                this.groupPlayer.pause( 'player_thrust' );
                this.playerShip.sprite.prepareScript( 'die' );
            }
        }
        // Player shot wreck00 ship
        else if( spriteB.parentNode.userId == gameDefs.WRECK00_SHIP_ID )
        {
            // Stop any more collision detection for the shot
            spriteA.collisionComponent.enable = false;

            // Re-enable collision for wreck00 for the aggressive type
            spriteB.collisionComponent.enable = true;

            // Execute the scripts that handle being hit
            spriteB.prepareScript( 'hit', spriteA );

            spriteB.hitCount++;

            // In passive mode (frame 0), one shot kills
            if( spriteB.visualComponent.frameIndex === 0 )
            {
                spriteB.collisionComponent.enable = false;
                spriteB.prepareScript( 'die', spriteA );
                this.updateHudProgress( WRECK00_SHIP_HIT_VALUE );
            }
            // In aggressive mode (frame 1), takes multiple shots to kill
            else if( spriteB.hitCount == WRECK00_SHIP_HIT_COUNT )
            {
                this._saveBonus = this.buildingSaveBonus( spriteB );   // before the die script lets go of the building
                spriteB.collisionComponent.enable = false;
                spriteB.prepareScript( 'die', spriteA );
                this.updateHudProgress( (WRECK00_SHIP_HIT_VALUE * 2) + this._saveBonus );
            }

            this.groupPlayer.play( 'enemy_explosion' );
        }
        // Player shot pest00 ship
        else if( spriteB.parentNode.userId == gameDefs.PEST00_SHIP_ID )
        {
            // Stop any more collision detection for the shot
            spriteA.collisionComponent.enable = false;

            // Execute the scripts that handle being hit (the explosion)
            spriteB.prepareScript( 'hit', spriteA );

            // Spinning (spin attack and flee): the hit doesn't count, it slows the spin a step (fewer missiles
            // per volley), and enough of them stop the spin (the flee stops it, AI_Pest00_Flee)
            if( spriteB.spinning )
            {
                if( ++spriteB.spinHitCount >= gameDefs.PEST00_MISSILES_MAX )
                {
                    spriteB.spinning = false;
                    spriteB.knockedOut = true;

                    // The player shot its spin to a stop: one more hit kills it
                    spriteB.hitCount = PEST00_SHIP_HIT_COUNT - 1;
                }
            }
            else if( ++spriteB.hitCount >= PEST00_SHIP_HIT_COUNT )
            {
                spriteB.collisionComponent.enable = false;
                spriteB.prepareScript( 'die', spriteA );
                this.updateHudProgress( PEST00_SHIP_HIT_VALUE );

                // The spawn timer for the next pest00 starts when this one dies
                this.pestSpawnTimer.reset( genFunc.randomInt( PEST_SPAWN_TIME_MIN, PEST_SPAWN_TIME_MAX ) );
            }

            this.groupPlayer.play( 'enemy_explosion' );
        }
        // Player shot a pest01 swarm member: one hit kills, and it disturbs the swarm
        else if( spriteB.parentNode.userId == gameDefs.PEST01_SHIP_ID )
        {
            // Stop any more collision detection for the shot
            spriteA.collisionComponent.enable = false;

            // Execute the scripts that handle being hit (the explosion)
            spriteB.prepareScript( 'hit', spriteA );
            this.pest01Killed( spriteB, spriteA );

            this.groupPlayer.play( 'enemy_explosion' );
        }
        // Player shot mini_boss_00 ship
        else if( spriteB.parentNode.userId == gameDefs.MINI_BOSS_00_SHIP_ID )
        {
            // Stop any more collision detection for the shot
            spriteA.collisionComponent.enable = false;

            // Execute the scripts that handle being hit
            spriteB.prepareScript( 'hit', spriteA );

            spriteB.hitCount++;

            if(spriteB.hitCount == this.miniBoss00ShipHitCount)
            {
                spriteB.collisionComponent.enable = false;
                spriteB.prepareScript( 'die' );
                this.updateHudProgress( MINI_BOSS_00_SHIP_HIT_VALUE );

                this.groupPlayer.play( 'mini_boss_00_descend_to_crash' );

                soundManager.fadeTo( '(level_1)', 'mini_boss_00_loop_sound', 0.0, 2000, defs.ESND_FADE_STOP );

                this.miniBossSpawnTimer.reset();

                // Each kill makes the next mini_boss_00 take more hits
                if( this.miniBoss00ShipHitCount < MINI_BOSS_00_MAX_SHIP_HIT_COUNT )
                    this.miniBoss00ShipHitCount += MINI_BOSS_00_SHIP_HIT_INC;
            }

            this.groupPlayer.play( 'enemy_explosion' );
        }
        // Player shot mini_boss_01 ship
        else if( spriteB.parentNode.userId == gameDefs.MINI_BOSS_01_SHIP_ID )
        {
            // Stop any more collision detection for the shot
            spriteA.collisionComponent.enable = false;

            // Execute the scripts that handle being hit
            spriteB.prepareScript( 'hit', spriteA );

            spriteB.hitCount++;

            if(spriteB.hitCount == this.miniBoss01ShipHitCount)
            {
                spriteB.collisionComponent.enable = false;
                spriteB.prepareScript( 'die' );
                this.updateHudProgress( MINI_BOSS_01_SHIP_HIT_VALUE );

                soundManager.fadeTo( '(level_1)', 'mini_boss_01_loop_sound', 0.0, 2000, defs.ESND_FADE_STOP );

                this.miniBossSpawnTimer.reset();

                // Each kill makes the next mini_boss_01 take more hits
                if( this.miniBoss01ShipHitCount < MINI_BOSS_01_MAX_SHIP_HIT_COUNT )
                    this.miniBoss01ShipHitCount += MINI_BOSS_01_SHIP_HIT_INC;
            }

            this.groupPlayer.play( 'enemy_explosion' );
        }
        // Player shot the BOSS00
        else if( spriteB.parentNode.userId == gameDefs.BOSS00_SHIP_ID )
        {
            // Stop any more collision detection for the shot
            spriteA.collisionComponent.enable = false;

            // The boss only takes damage while attacking a building (hit bar active)
            if( spriteB.vulnerable )
            {
                // Explosion + hide the player shot
                spriteB.prepareScript( 'hit', spriteA );
                this.groupPlayer.play( 'enemy_explosion' );

                // Drain the hit bar
                spriteB.bossHitBar -= 1;
                if( spriteB.hitBarCtrl )
                    spriteB.hitBarCtrl.setCurrentValue( spriteB.bossHitBar );

                // Hit bar depleted -> interrupt the attack and cost the boss a health point
                if( spriteB.bossHitBar <= 0 )
                {
                    spriteB.vulnerable = false;
                    spriteB.interrupted = true;

                    // The boss fires missiles faster each time its hit bar is depleted
                    spriteB.fireInterval -= gameDefs.BOSS00_FIRE_INTERVAL_STEP;

                    spriteB.bossHealth -= 1;
                    if( spriteB.healthBarCtrl )
                        spriteB.healthBarCtrl.setCurrentValue( spriteB.bossHealth );

                    // Health depleted -> the boss dies
                    if( spriteB.bossHealth <= 0 )
                    {
                        spriteB.collisionComponent.enable = false;
                        spriteB.prepareScript( 'die', spriteA );
                        this.updateHudProgress( BOSS00_SHIP_HIT_VALUE );
                    }
                }
            }
        }
        // Player shot health character
        else if( spriteB.parentNode.userId == HEALTH_CHARACTER )
        {
            // Stop any more collision detection for the shot
            spriteB.collisionComponent.enable = false;

            // Release it's lock on the building
            spriteB.targetBuilding = null;

            // Execute the scripts that handle being hit
            spriteB.prepareScript( 'hit', spriteA );

            this.groupPlayer.play( 'scream_male_b' );
            this.groupPlayer.play( 'gore_splat' );
            this.healthSpawnTimer.reset();
        }
    }

    // 
    //  DESC: Setup the rewards if the player watched an ad
    //
    setupRewards()
    {
        if( platform.hasRewardedAds() )
            this._menu = menuManager.getMenu("game_over_menu_ad");
        else
            this._menu = menuManager.getMenu("game_over_menu");

        this._featureIndex = this._menu.getControl("feature_btn_lst").activeIndex;
        this._battleTimeIndex = this._menu.getControl("battle_time_btn_lst").activeIndex;

        if(GOD_MODE)
            this.unlimitedBoost = true;
        else
            this.unlimitedBoost = false;

        this.rapidFire = false;
        this.shieldOverdrive = false;

        if( gAdPlayed || !platform.hasRewardedAds() )
        {
            if( this._featureIndex === REWARD_FEATURE_UNLIMITED_BOOST )
            {
                this.unlimitedBoost = true;
            }
            else if( this._featureIndex === REWARD_FEATURE_DOUBLE_HEALTH )
            {
                this.playerShip.progressBar.setProgressBarMax( DEFAULT_SHIP_PROGRESS_BAR_VALUE * 2 );
                this.playerShip.progressBar.setCurrentValue( DEFAULT_SHIP_PROGRESS_BAR_VALUE * 2 );
                this.playerShip.progressBar.setScaleXYZ( 0.6, 0.5 );
            }
            else if( this._featureIndex === REWARD_FEATURE_HEAL_OVER_TIME )
            {
                this.slowHealTimer = new Timer(2000);
            }
            else if( this._featureIndex === REWARD_FEATURE_RAPID_FIRE )
            {
                this.rapidFire = true;
            }
            // initPlayerShip() sets the normal shield bar on every restart, so only the reward changes it
            else if( this._featureIndex === REWARD_FEATURE_SHIELD_OVERDRIVE )
            {
                this.shieldOverdrive = true;
                this.playerShip.shieldBar.setProgressBarMax( DEFAULT_SHIP_SHIELD_BAR_VALUE * SHIELD_OVERDRIVE_SCALE );
                this.playerShip.shieldBar.setCurrentValue( DEFAULT_SHIP_SHIELD_BAR_VALUE * SHIELD_OVERDRIVE_SCALE );
            }

            this.setBattleTime( this._battleTimeIndex );
        }
        else
        {
            this.playerShip.progressBar.setProgressBarMax( DEFAULT_SHIP_PROGRESS_BAR_VALUE );
            this.playerShip.progressBar.setCurrentValue( DEFAULT_SHIP_PROGRESS_BAR_VALUE );
            this.playerShip.progressBar.setScaleXYZ( 0.35, 0.5 );

            this.setBattleTime();
        }
    }

    // 
    //  DESC: Set the battle time
    //
    setBattleTime( index = 0 )
    {
        for( let i = 0; i < this.bkgStrategy.nodeAry.length; ++i )
            this.bkgStrategy.nodeAry[i].get().setFrame( index );

        for( let i = 0; i < this.buildingsBackStrategy.nodeAry.length; ++i )
            this.buildingsBackStrategy.nodeAry[i].get().setFrame( index );

        for( let i = 0; i < this.buildingsFrontStrategy.nodeAry.length; ++i )
            this.buildingsFrontStrategy.nodeAry[i].get().setFrame( index );

        for( let i = 0; i < this.buildingsStrategy.nodeAry.length; ++i )
            this.buildingsStrategy.nodeAry[i].get().setFrame( index );

        for( let i = 0; i < this.forgroundStrategy.nodeAry.length; ++i )
            this.forgroundStrategy.nodeAry[i].get().setFrame( index );

        strategyManager.get('_train_').get('train').get().setFrame( index );

        this.lowerHudStategy.get('hud_background').get().setColor( this.hudBkColor[index] );
        this.lowerHudStategy.get('hud_frame').get().setColor( this.hudFrameColor[index] );
        this.upperHudStategy.get('hud_screen_frame').get().setColor( this.hudFrameColor[index] );
        this.upperHudStategy.get('level_background').get().setColor( this.hudBkColor[index] );
        this.upperHudStategy.get('level_frame').get().setColor( this.hudFrameColor[index] );
        this.upperHudStategy.get('level_font').get().setColor( this.hudFrameColor[index] );
    }

    // 
    //  DESC: Display the game start menu based on ad results
    //
    displayGameStartMenu()
    {
        this._menu = menuManager.getMenu("game_start_menu");
        this._boldFontMsg = this._menu.getControl("bold_font_msg");
        this._regFontMsg = this._menu.getControl("reg_font_msg");

        if( gAdPlayed )
        {
            this._boldFontMsg.createFontString( GAME_START_MENU_AD_THANKS_MSG );
            this._regFontMsg.createFontString( GAME_START_MENU_AD_THANKS_MSG );
        }
        else if( gAdError )
        {
            if(gAdErrorCode == "unfilled")
            {
                this._boldFontMsg.createFontString( GAME_START_MENU_DEFAULT_MSG );
                this._regFontMsg.createFontString( GAME_START_MENU_DEFAULT_MSG );
            }
            else
            {
                this._boldFontMsg.createFontString( GAME_START_MENU_AD_ERROR_MSG );
                this._regFontMsg.createFontString( GAME_START_MENU_AD_ERROR_MSG );
            }
        }
        else
        {
            this._boldFontMsg.createFontString( GAME_START_MENU_DEFAULT_MSG );
            this._regFontMsg.createFontString( GAME_START_MENU_DEFAULT_MSG );
        }

        gAdPlayed = false;
        gAdError = false;

        menuManager.getTree('pause_tree').setDefaultMenu('game_start_menu');
        menuManager.getTree('pause_tree').transitionMenu();
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
                    scriptSingleton.prepare( 'screen_fade', 1, 0, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE );
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
                    // Display the game start menu based on ad results
                    this.displayGameStartMenu();
                }
            }
            else if( event.type === menuDefs.EME_MENU_TRANS_IN )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                {
                    if( settings.user.soundMusicEnabled )
                    {
                        let asnd = soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' );

                        // Crossfade from the game music to the ambient music
                        if( asnd.isPaused() )
                            soundManager.crossfade( this.getGameMusic(), asnd, 500 );
                    }

                    if( this.gameStartStopToggle )
                    {
                        this.gameStartStopToggle = !this.gameStartStopToggle;

                        // The fire button release can be missed while paused (ex: focus lost)
                        this.shootHeld = false;

                        // So can the shield release: drop the shield and let the bar recharge
                        this.playerShip.shieldButtonPress = defs.EAP_UP;
                        this.setShield( false );
                        this.touchShieldHeld = false;

                        this.musicTimer.pause();
                        this.wreck00SpawnTimer.pause();
                        this.miniBossSpawnTimer.pause();
                        this.train.timer.pause();
                        this.healthSpawnTimer.pause();
                        this.wreck00MaxTimer.pause();
                        this.pestSpawnTimer.pause();

                        // Pause the looping level sounds (enemy loops, boss alarm, thrust)
                        soundManager.pauseLoopingSounds( '(level_1)' );

                        // Indicate to the game portal the gameplay has stopped
                        platform.gameplayStop();
                    }
                }
            }
            else if( event.type === menuDefs.EME_MENU_TRANS_OUT )
            {
                if( event.arg[0] === menuDefs.ETC_END )
                {
                    if( !menuManager.getActiveTree() && this.gameReady )
                    {
                        if( settings.user.soundEnabled && settings.user.soundMusicEnabled && 
                            (event.arg[1].name == 'game_start_menu' || 
                            event.arg[1].name == 'pause_menu' || 
                            event.arg[1].name == 'settings_menu' || 
                            event.arg[1].name == 'key_bindings_menu') )
                        {
                            // Crossfade from the ambient music to the game music
                            soundManager.crossfade( soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' ), this.getGameMusic(), 500 );
                        }

                        if( !this.gameStartStopToggle )
                        {
                            this.gameStartStopToggle = !this.gameStartStopToggle;

                            this.musicTimer.resume();
                            this.wreck00SpawnTimer.resume();
                            this.miniBossSpawnTimer.resume();
                            this.train.timer.resume();
                            this.healthSpawnTimer.resume();
                            this.wreck00MaxTimer.resume();
                            this.pestSpawnTimer.resume();

                            // Resume the looping sounds the pause menu paused (not the ones stopped since, ex: by a restart)
                            soundManager.resumeLoopingSounds( '(level_1)' );

                            // Indicate to the game portal the gameplay has started
                            platform.gameplayStart();
                        }

                        this._tree = menuManager.getTree( 'pause_tree' );
                        if( !this._tree.isDefaultMenu('pause_menu') )
                            this._tree.setDefaultMenu('pause_menu');
                    }
                }
            }
            else if( event.type === stateDefs.ESE_SHOW_GAME_OVER_MENU )
            {
                eventManager.clear();
                actionManager.clearLastDeviceUsed();

                if( platform.hasRewardedAds() )
                    menuManager.getTree('pause_tree').setDefaultMenu('game_over_menu_ad');
                else
                    menuManager.getTree('pause_tree').setDefaultMenu('game_over_menu');

                menuManager.getTree('pause_tree').transitionMenu();

                // Crossfade from the game music to the ambient music
                soundManager.crossfade( this.getGameMusic(), soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' ), 500 );

                let gsnd_loop01 = soundManager.getSound( '(level_1)', `mini_boss_00_loop_sound` );
                if(gsnd_loop01.isPlaying( 'mini_boss_00_loop_sound' ))
                    gsnd_loop01.fadeTo( 0.0, 2000, defs.ESND_FADE_STOP );

                let gsnd_loop02 = soundManager.getSound( '(level_1)', `mini_boss_01_loop_sound` );
                if(gsnd_loop02.isPlaying( 'mini_boss_01_loop_sound' ))
                    gsnd_loop02.fadeTo( 0.0, 2000, defs.ESND_FADE_STOP );

                let gsnd_alarm = soundManager.getSound( '(level_1)', 'boss_alarm' );
                if(gsnd_alarm.isPlaying())
                    gsnd_alarm.fadeTo( 0.0, 2000, defs.ESND_FADE_STOP );

                if( !this.gameStartStopToggle )
                {
                    this.gameStartStopToggle = !this.gameStartStopToggle;

                    this.musicTimer.resume();
                    this.wreck00SpawnTimer.resume();
                    this.miniBossSpawnTimer.resume();
                    this.train.timer.resume();
                    this.healthSpawnTimer.resume();
                    this.wreck00MaxTimer.resume();
                    this.pestSpawnTimer.resume();

                    // Indicate to the game portal the gameplay has stopped
                    platform.gameplayStop();
                }
            }
            else if( event.type === uiControlDefs.ECAT_ACTION_EVENT )
            {
                if( event.arg[0] === 'restart_game' )
                {
                    scriptSingleton.prepare( 'screen_fade', 1, 0, 500, stateDefs.ESE_GAME_RELOAD );
                }
                else if( event.arg[0] === 'restart_game_with_ad' )
                {
                    // Fade out the ambient music
                    let asnd = soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' );
                    if(asnd.isPlaying())
                        asnd.fadeTo( 0.0, 250, defs.ESND_FADE_PAUSE );
                    
                    scriptSingleton.prepare( 'screen_fade', 1, 0, 500, stateDefs.ESE_GAME_AD_START );
                }
            }
            else if( event.type === stateDefs.ESE_FADE_OUT_COMPLETE )
            {
                if( event.arg[0] === stateDefs.ESE_GAME_RELOAD )
                {
                    menuManager.getTree( 'pause_tree' ).transitionMenu();
                    this.restartGame();
                }
                else if( event.arg[0] === stateDefs.ESE_GAME_AD_START )
                {
                    menuManager.getTree( 'pause_tree' ).transitionMenu();
                    this.startAd();
                }
                else if( event.arg[0] === stateDefs.ESE_FADE_GAME_STATE_CHANGE )
                {
                    this.gameReady = false;
                }
            }
            else if( event.type === stateDefs.ESE_GAME_AD_FINISHED )
            {
                // Fade in the ambient music
                let asnd = soundManager.getSound( '(music)', 'LOOP_Synthetic_Humanity' );
                if(asnd.isPaused())
                {
                    asnd.playOrResume( true );
                    asnd.fadeTo( asnd.defaultVolume, 500 );
                }
                this.restartGame();
            }
            else if( event.type === menuDefs.EME_USER_FOCUS_LOST )
            {
                // Not while the game isn't ready (ex: during a rewarded ad, a click on it opens another page).
                // The restart after the ad would toggle this menu closed instead of opening the start menu.
                if( !menuManager.active && this.gameReady )
                    menuManager.getTree('pause_tree').transitionMenu();
            }
            else if( event.type === gameDefs.EGE_BOSS_DEFEATED )
            {
                this.endBossMusic();
                this.bossSprite = null;

                // Re-enable mini-boss (mini_boss_00/01) spawns with a restarted timer. The player has
                // to fight both mini-bosses again before the next boss battle.
                this.miniBossSpawnTimer.reset();
                this.foughtMiniBoss00 = false;
                this.foughtMiniBoss01 = false;
            }
            else if( event.type === gameDefs.EGE_BUILDING_DESTROYED )
            {
                this._allToBeDeleted = true;
                this._buildingsAry = strategyManager.get('_buildings_').nodeAry;
                for( let i = 0; i < this._buildingsAry.length; ++i )
                {
                    if( this._buildingsAry[i].toBeDeleted === undefined )
                    {
                        this._allToBeDeleted = false;
                        break;
                    }
                }

                if( this._allToBeDeleted )
                    eventManager.dispatchEvent( stateDefs.ESE_SHOW_GAME_OVER_MENU );
            }
        }
        else
        {
            // Fire button released (checked even when a menu is up, so it can't get stuck held)
            if( actionManager.wasActionPress( event, 'shoot', defs.EAP_UP ) )
                this.shootHeld = false;

            // Shield button released (checked even when a menu is up, so it can't get stuck on)
            if( actionManager.wasActionPress( event, 'shield', defs.EAP_UP ) )
            {
                this.playerShip.shieldButtonPress = defs.EAP_UP;
                this.setShield( false );
            }

            if( !menuManager.active && this.playerShip.sprite.collisionComponent.enable )
            {
                // Handle the ship movement
                this.handleShipMovement( event );

                if( actionManager.wasActionPress( event, 'shoot', defs.EAP_DOWN ) )
                {
                    this.firePlayerShot();

                    // With Rapid Fire, keep firing while the button is held (see update())
                    this.shootHeld = true;
                    this.rapidFireTime = RAPID_FIRE_INTERVAL;
                }
                // Boost is ignored during the boss slow-down (a release still lets the boost bar recharge)
                else if( actionManager.wasActionPress( event, 'boost', defs.EAP_DOWN ) && !this.bossBrake )
                {
                    this.playerShip.boostButtonPress = defs.EAP_DOWN;
                    this.handleBoostActivation();
                }
                else if( actionManager.wasActionPress( event, 'boost', defs.EAP_UP ) )
                {
                    this.playerShip.boostSpeed = 0;
                    this.playerShip.boostButtonPress = defs.EAP_UP;

                    if( this.lastMoveAction === defs.EAP_DOWN && !this.bossBrake )
                    {
                        if( this.lastMoveDirX === MOVE_LEFT )
                            this.easingX.init( this.easingX.getValue(), -(this.playerShip.speed + this.playerShip.boostSpeed), 2, easing.getLinear() );
                        else
                            this.easingX.init( this.easingX.getValue(), this.playerShip.speed + this.playerShip.boostSpeed, 2, easing.getLinear() );
                    }
                }

                // Shield. After a full drain, it can't come back up until the bar is full again (except with
                // Shield Overdrive). The bar only recharges while the button is up, so holding it stalls the recharge.
                if( actionManager.wasActionPress( event, 'shield', defs.EAP_DOWN ) )
                {
                    this.playerShip.shieldButtonPress = defs.EAP_DOWN;

                    // Needs some charge, so an empty bar doesn't flash the shield up for a frame
                    if( !this.playerShip.shieldBar.isMinValue() &&
                        (!this.playerShip.waitForFullShieldCharge || this.playerShip.shieldBar.isMaxValue()) )
                    {
                        this.playerShip.waitForFullShieldCharge = false;
                        this.setShield( true );
                    }
                }
            }
        }
    }

    // 
    //  DESC: Raise or drop the player ship shield
    //
    setShield( on )
    {
        // Kept on the ship's head sprite so the enemy collision scripts only check the ship's children
        // (where the shield is) while the shield is up
        this.playerShip.sprite.shieldOn = on;
        this.playerShip.shieldSprite.setVisible( on );
        this.playerShip.shieldSprite.collisionComponent.enable = on;

        // The ship can't be hit while the shield is up, so only the shield collides. The ship's collision "enable"
        // is left alone because it's the ship's alive flag (input, enemy shooting, death check). The shield has
        // the same filter mask as the ship (see level1DataList.lst), so it's used to restore the ship's.
        this.playerShip.sprite.collisionComponent.filterMaskBits =
            on ? 0 : this.playerShip.shieldSprite.collisionComponent.filterMaskBits;

        if( on )
            this.playerShip.shieldBar.setVisible( true );
    }

    // 
    //  DESC: Fire a player shot
    //
    firePlayerShot()
    {
        this._laserBlastNode = this.playerShip.strategy.create('player_shot');
        this._laserBlastNode.get().prepareScript( 'shoot', this.easingX.getValue() );

        this.groupPlayer.play( 'player_gun_1' );
    }

    // 
    //  DESC: Handle boost activation
    //
    handleBoostActivation()
    {
        if( this.lastMoveAction === defs.EAP_DOWN )
        {
            if(this.unlimitedBoost || !this.playerShip.waitForFullBoostCharge || this.playerShip.boostBar.isMaxValue())
            {
                this.playerShip.waitForFullBoostCharge = false;
                this.playerShip.boostSpeed = PLAYER_SHIP_BOOST_TOP_SPEED;

                // Shown with unlimited boost too, but then it stays full (it's never drained in update())
                this.playerShip.boostBar.setVisible( true );

                if( this.lastMoveDirX === MOVE_LEFT )
                    this.easingX.init( this.easingX.getValue(), -(this.playerShip.speed + this.playerShip.boostSpeed), 2, easing.getLinear() );
                else
                    this.easingX.init( this.easingX.getValue(), this.playerShip.speed + this.playerShip.boostSpeed, 2, easing.getLinear() );
            }
        }
    }

    // 
    //  DESC: A wreck00 killed while attacking a building saved it: heal the player and return the bonus points
    //
    buildingSaveBonus( sprite )
    {
        if( !sprite.shakingBuilding )
            return 0;

        if( !this.playerShip.progressBar.isMaxValue() )
        {
            this.playerShip.progressBar.incCurrentValue( BUILDING_SAVE_HEAL );

            if( this.playerShip.progressBar.isMaxValue() )
                this.playerShip.progressBar.setVisible( false );
        }

        return BUILDING_SAVE_BONUS;
    }

    // 
    //  DESC: Update hud progress
    //
    updateHudProgress( value )
    {
        if( this.hudProgressBar.isMaxValue() )
        {
            this.hudProgressBar.setCurrentValue( 0 );
            this.hudProgressBar.incProgressBarMax( 1 );
            this.playerLevel += value;

            this.setYTGameScore();

            this.hudLevelFont.visualComponent.createFontString( `Level ${this.playerLevel}` );

            this.groupPlayer.play( 'level_up' );

            // Enable mini-boss spawns when the earliest level threshold is reached
            if( this.playerLevel >= MINI_BOSS_01_LEVEL_THRESHOLD && this.allowMiniBoss == false )
            {
                this.miniBossSpawnTimer.reset();
                this.allowMiniBoss = true;
            }

            // Enable pest00 spawns
            if( this.playerLevel >= PEST_LEVEL_THRESHOLD && this.pestSpawnTimer.disabled )
                this.pestSpawnTimer.reset();

            // Enable health character
            if( this.playerLevel == HEALTH_CHAR_THRESHOLD && this.healthSpawnTimer.disabled )
                this.healthSpawnTimer.reset();

            // Adjust how fast wreck00 is spawned
            if( this.playerLevel == 5 && this.wreck00SpawnTimer.timeInterval > (1000 * 2.3) )
                this.wreck00SpawnTimer.reset((1000 * 2.25));

            else if( this.playerLevel == 10 && this.wreck00SpawnTimer.timeInterval > (1000 * 2.1) )
                this.wreck00SpawnTimer.reset((1000 * 2));

            else if( this.playerLevel == 20 && this.wreck00SpawnTimer.timeInterval > (1000 * 1.8) )
                this.wreck00SpawnTimer.reset((1000 * 1.75));

            else if( this.playerLevel == 40 && this.wreck00SpawnTimer.timeInterval > (1000 * 1.6) )
                this.wreck00SpawnTimer.reset((1000 * 1.5));
        }

        this.hudProgressBar.incCurrentValue( value );
    }

    // 
    //  DESC: Handle changing the music every 5 minutes
    //
    handleMusicChange()
    {
        // Change out the music every 5 minutes (not during the boss battle)
        if( !this.bossBattleActive && this.musicTimer.expired(true) )
        {
            // Crossfade from the current game music to the next one
            let gsnd = this.getGameMusic();
            this.musicCounter = (this.musicCounter + 1) % this.musicAry.length;
            soundManager.crossfade( gsnd, this.getGameMusic(), 500, defs.ESND_FADE_STOP );
        }
    }

    // 
    //  DESC: Get the music that should be playing during gameplay (boss battle or game music)
    //
    getGameMusic()
    {
        if( this.bossBattleActive )
            return soundManager.getSound( '(music)', 'LOOP_City-Showdown' );

        return soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[this.musicCounter]}` );
    }

    // 
    //  DESC: Boss battle started - fade out the game music, fade in the boss music, and sound the alarm
    //
    startBossMusic()
    {
        if( this.bossBattleActive )
            return;

        let gsnd = this.getGameMusic();

        this.bossBattleActive = true;

        // Always start the boss music from the beginning (it may have been left paused by a game over)
        let bsnd = this.getGameMusic();
        bsnd.stop();
        soundManager.crossfade( gsnd, bsnd, gameDefs.BOSS00_MUSIC_FADE_MS );

        // Loop the alarm at the start of the battle (reset the volume - a previous fade-out leaves it at 0),
        // then fade it out BOSS00_ALARM_TIME into the battle
        let asnd = soundManager.getSound( '(level_1)', 'boss_alarm' );
        asnd.play( true, 0, true );
        scriptSingleton.prepare( 'delayed_execution', gameDefs.BOSS00_ALARM_TIME, null, () =>
        {
            // Also when paused by the menu - stop() clears the paused state so it won't resume
            if( asnd.isPlaying() || asnd.isPaused() )
                asnd.fadeTo( 0.0, gameDefs.BOSS00_MUSIC_FADE_MS, defs.ESND_FADE_STOP );
        });
    }

    // 
    //  DESC: Boss defeated - fade out the boss music and alarm, and fade the game music back in
    //
    endBossMusic()
    {
        if( this.bossBattleActive )
        {
            soundManager.fadeTo( '(level_1)', 'boss_alarm', 0.0, gameDefs.BOSS00_MUSIC_FADE_MS, defs.ESND_FADE_STOP );

            let bsnd = this.getGameMusic();

            this.bossBattleActive = false;

            // Crossfade from the boss music back to the game music
            soundManager.crossfade( bsnd, this.getGameMusic(), gameDefs.BOSS00_MUSIC_FADE_MS, defs.ESND_FADE_STOP );

            // Restart the 5 minute music rotation so it doesn't swap tracks right after the boss
            this.musicTimer.reset();
        }
    }

    // 
    //  DESC: Handle the ship movement
    //
    handleShipMovement( event )
    {
        this._dir = -this.levelCamera.pos.x - this.playerShip.sprite.pos.x;

        for( let i = 0; i < this.moveActionAry.length; ++i )
        {
            this._actionResult = actionManager.wasAction( event, this.moveActionAry[i] );
            if( this._actionResult != defs.EAP_IDLE )
            {
                if( i < MOVE_LEFT_RIGHT )
                {
                    // Only act on action press for the last button down
                    if( this._actionResult === defs.EAP_UP && i !== this.lastMoveDirX )
                        continue;

                    if( i === MOVE_LEFT )
                    {
                        // Flip the ship facing left
                        this.playerShip.object.setRotXYZ( 0, 180 );

                        // The camera easing positions the player ship at then end of the screen facing inwards
                        if( this._actionResult === defs.EAP_DOWN )
                        {
                            this.playerShip.fireTailSprite.setVisible( true );
                            this.playerShip.fireTailScript.pause = false;
                            this.groupPlayer.resume( 'player_thrust' );

                            //console.log("Move Left DOWN");

                            // Ignored during the boss slow-down (applied when it finishes, see handleBossScreenLock())
                            if( !this.bossBrake )
                            {
                                this.easingX.init( this.easingX.getValue(), -(this.playerShip.speed + this.playerShip.boostSpeed), 2, easing.getLinear() );

                                // Camera easing has to move slower or faster then the elements on the screen to avoid movement studder
                                // Don't allow any more camera easing, in this direction, after a certain point
                                if(this._dir > -CAMERA_EASING_OFFSET)
                                    this.startCameraEasing( MOVE_LEFT );
                            }
                        }
                        else
                        {
                            this.playerShip.fireTailSprite.setVisible( false );
                            this.playerShip.fireTailScript.pause = true;
                            this.groupPlayer.pause( 'player_thrust' );

                            // Ignored during the boss slow-down (applied when it finishes, see handleBossScreenLock())
                            if( !this.bossBrake )
                            {
                                this.easingX.init( this.easingX.getValue(), 0, 3, easing.getLinear() );
                                this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );
                                this.playerShip.boostSpeed = 0;
                            }
                        }

                        this.moveDirX = MOVE_LEFT;
                    }
                    else if( i === MOVE_RIGHT )
                    {
                        // Flip the ship facing right (default orientation)
                        this.playerShip.object.setRotXYZ();

                        // The camera easing positions the player ship at then end of the screen facing inwards
                        if( this._actionResult === defs.EAP_DOWN )
                        {
                            this.playerShip.fireTailSprite.setVisible( true );
                            this.playerShip.fireTailScript.pause = false;
                            this.groupPlayer.resume( 'player_thrust' );

                            //console.log("Move Right DOWN");

                            // Ignored during the boss slow-down (applied when it finishes, see handleBossScreenLock())
                            if( !this.bossBrake )
                            {
                                this.easingX.init( this.easingX.getValue(), this.playerShip.speed + this.playerShip.boostSpeed, 2, easing.getLinear() );

                                // Camera easing has to move slower or faster then the elements on the screen to avoid movement studder
                                // Don't allow any more camera easing, in this direction, after a certain point
                                if(this._dir < CAMERA_EASING_OFFSET)
                                    this.startCameraEasing( MOVE_RIGHT );
                            }
                        }
                        else
                        {
                            this.playerShip.fireTailSprite.setVisible( false );
                            this.playerShip.fireTailScript.pause = true;
                            this.groupPlayer.pause( 'player_thrust' );

                            // Ignored during the boss slow-down (applied when it finishes, see handleBossScreenLock())
                            if( !this.bossBrake )
                            {
                                this.easingX.init( this.easingX.getValue(), 0, 3, easing.getLinear() );
                                this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );
                                this.playerShip.boostSpeed = 0;
                            }
                        }

                        this.moveDirX = MOVE_RIGHT;
                    }

                    this.lastMoveDirX = this.moveDirX;
                    this.lastMoveAction = this._actionResult;

                    if(this.playerShip.boostButtonPress === defs.EAP_DOWN && !this.bossBrake)
                        this.handleBoostActivation();
                }
                else
                {
                    if( i === MOVE_UP )
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
                    else if( i === MOVE_DOWN )
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
        // The swarm is gone (all killed): the Pest spawn timer starts over
        if( this.swarmActive && this.countPest01() === 0 )
        {
            this.swarmActive = false;
            this.pestSpawnTimer.reset( genFunc.randomInt( PEST_SPAWN_TIME_MIN, PEST_SPAWN_TIME_MAX ) );
        }

        // Create a Pest (from level PEST_LEVEL_THRESHOLD): pest00 or the pest01 swarm, picked at random, but after
        // MAX_PEST_STREAK of the same one in a row the other one spawns next (like the mini-bosses).
        // One Pest at a time, and none while a mini-boss or the boss is out until the level reaches
        // PEST_BATTLE_SPAWN_LEVEL: if it expires then, the timer just goes round again.
        // The timer restarts when pest00 dies (collisionCallBack()) or the swarm is gone (above).
        if( this.pestSpawnTimer.expired(true) )
        {
            this.pestSpawnTimer.reset( genFunc.randomInt( PEST_SPAWN_TIME_MIN, PEST_SPAWN_TIME_MAX ) );

            if( (this.playerLevel >= PEST_BATTLE_SPAWN_LEVEL || (!this.bossBattleActive && !this.isMiniBossActive())) &&
                this.countPests() === 0 )
            {
                this._pestType = (Math.random() < 0.5) ? 'pest01_ship' : 'pest00_ship';
                if( (this._pestType === this.lastPestType) && (this.pestStreakCount >= MAX_PEST_STREAK) )
                    this._pestType = (this._pestType === 'pest01_ship') ? 'pest00_ship' : 'pest01_ship';

                if( this._pestType === this.lastPestType )
                {
                    this.pestStreakCount++;
                }
                else
                {
                    this.lastPestType = this._pestType;
                    this.pestStreakCount = 1;
                }

                if( this._pestType === 'pest01_ship' )
                {
                    this.spawnSwarm();
                }
                else
                {
                    // Its AI positions it above the screen
                    this._node = this.enemyStrategy.create('pest00_ship');
                    this._node.get().setPosXYZ(0, settings.deviceRes.h);
                }
            }
        }

        // Create wreck00 and position it outside of the view.
        // During the boss battle only every Nth spawn tick spawns one (much slower).
        if( this.wreck00SpawnTimer.expired(true) )
        {
            if( (this.enemyStrategy.nodeAry.length - this.countPests()) < this.wreck00Max &&
                (!this.bossBattleActive || (++this.wreck00BossSpawnTick % gameDefs.BOSS00_WRECK00_SPAWN_SLOWDOWN) === 0) )
            {
                this._node = this.enemyStrategy.create('wreck00_ship');
                this._node.get().setPosXYZ(0, settings.deviceRes.h);
            }

            if( this.wreck00MaxTimer.expired(true) && this.wreck00Max < MAX_WRECK00 )
            {
                this.wreck00Max++;
            }
        }
        // Create a mini-boss and position it outside of the view
        else if( this.miniBossSpawnTimer.expired(false, true) )
        {
            this.miniBossSpawnTimer.disable();

            // Once the player has fought both mini-bosses, the boss battle takes this mini-boss's turn.
            // The mini-boss timer stays disabled during the battle (mini_boss_00/01 paused) until the boss is defeated.
            if( this.foughtMiniBoss00 && this.foughtMiniBoss01 )
            {
                this.spawnBoss();
                return;
            }

            // Determine which mini-boss to spawn based on level thresholds
            if( this.playerLevel >= MINI_BOSS_00_LEVEL_THRESHOLD )
            {
                this._miniBossType = (genFunc.randomInt( 0, 9 ) < 6) ? 'mini_boss_01_ship' : 'mini_boss_00_ship';
                if( (this._miniBossType === this.lastMiniBossType) && (this.miniBossStreakCount >= MAX_MINI_BOSS_STREAK) )
                {
                    if( this._miniBossType === 'mini_boss_01_ship' )
                        this._miniBossType = 'mini_boss_00_ship';
                    else
                        this._miniBossType = 'mini_boss_01_ship';
                }
            }
            else
            {
                this._miniBossType = 'mini_boss_00_ship';
            }
            
            // Track which mini-bosses the player has fought since the last boss battle
            if( this._miniBossType === 'mini_boss_00_ship' )
                this.foughtMiniBoss00 = true;
            else
                this.foughtMiniBoss01 = true;

            if( this._miniBossType === this.lastMiniBossType )
            {
                this.miniBossStreakCount++;
            }
            else
            {
                this.lastMiniBossType = this._miniBossType;
                this.miniBossStreakCount = 1;
            }

            this._spawnX = this.playerShip.sprite.pos.x + gameDefs.GAMEPLAY_LOOPING_WRAP_DIST;
            if( this._spawnX > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                this._spawnX -= gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;

            this._node = this.enemyStrategy.create(this._miniBossType);
            this._node.get().setPosXYZ(this._spawnX, settings.deviceRes.h + (this._node.radius / 2));
            this._node.get().setRotXYZ();

            if( genFunc.randomInt( 0, 1 ) === 0 )
                this._node.get().setRotXYZ(0, 180);
        }
        // Create a health character and position it on a building
        else if(this.healthSpawnTimer.expired( false, false ))
        {
            this._buildings = this.buildingsStrategy.nodeAry;

            // Pick a random building out of the free ones (not targeted, not destroyed)
            this._freeCount = 0;
            for( let j = 0; j < this._buildings.length; ++j )
                if( this.isBuildingFree( this._buildings[j].get() ) )
                    this._freeCount++;

            // If none are free, we'll try again next time
            if( this._freeCount > 0 )
            {
                this._index = genFunc.randomInt( 0, this._freeCount-1 );
                for( let j = 0; j < this._buildings.length; ++j )
                {
                    this._targetBuilding = this._buildings[j].get();
                    if( this.isBuildingFree( this._targetBuilding ) && (this._index-- === 0) )
                        break;
                }

                this.groupPlayer.play( 'health_char_spawn' );

                this._helpSprite = this.enemyStrategy.create('help').get();
                this._healthSprite = this.enemyStrategy.create('health_character').get();
                this._healthSprite.targetBuilding = this._targetBuilding;
                this.healthSpawnTimer.disable();

                // Parce the additive Y offset for the health character to stand on the building
                this._yOffsetValueHealth = parseInt(this._targetBuilding.parentNode.name.match(/\d+$/)[0], 10) - 1;

                this._healthSprite.setPosXYZ(this._targetBuilding.pos.x, this._targetBuilding.pos.y + this.healthCharYOffsetAry[this._yOffsetValueHealth]);
                this._helpSprite.setPosXYZ(this._healthSprite.pos.x, this._healthSprite.pos.y + 90);
            }
        }
    }

    // 
    //  DESC: Is the building free for the health character? Not destroyed (a destroyed building
    //        stays in the strategy while it sinks, after the enemy has let go of it) and not
    //        targeted by an enemy
    //
    isBuildingFree( building )
    {
        if( building.destroyed !== undefined )
            return false;

        for( let i = 0; i < this.enemyStrategy.nodeAry.length; ++i )
            if( this.enemyStrategy.nodeAry[i].get().targetBuilding === building )
                return false;

        return true;
    }

    // 
    //  DESC: Number of Pests alive, pest00 and pest01 swarm members (they don't take up wreck00's spawn slots)
    //
    countPests()
    {
        this._pestCount = 0;
        for( let pi = 0; pi < this.enemyStrategy.nodeAry.length; ++pi )
        {
            // Not counting one that's dying (falling off the screen)
            if( (this.enemyStrategy.nodeAry[pi].userId === gameDefs.PEST00_SHIP_ID ||
                 this.enemyStrategy.nodeAry[pi].userId === gameDefs.PEST01_SHIP_ID) &&
                this.enemyStrategy.nodeAry[pi].get().collisionComponent.enable )
                this._pestCount++;
        }

        return this._pestCount;
    }

    // 
    //  DESC: Number of pest01 swarm members alive
    //
    countPest01()
    {
        this._pestCount = 0;
        for( let pi = 0; pi < this.enemyStrategy.nodeAry.length; ++pi )
        {
            // Not counting one that's dying (falling off the screen)
            if( this.enemyStrategy.nodeAry[pi].userId === gameDefs.PEST01_SHIP_ID &&
                this.enemyStrategy.nodeAry[pi].get().collisionComponent.enable )
                this._pestCount++;
        }

        return this._pestCount;
    }

    // 
    //  DESC: Spawn the pest01 swarm above the screen, PEST01_SPAWN_DIST_MIN/MAX to either side of the player, off the
    //        screen (it descends into the cruise band)
    //
    spawnSwarm()
    {
        // Away from the player, either side, off the screen (like pest00)
        this._x = genFunc.wrapDelta( this.playerShip.sprite.pos.x +
            (((Math.random() < 0.5) ? -1 : 1) * genFunc.randomInt( gameDefs.PEST01_SPAWN_DIST_MIN, gameDefs.PEST01_SPAWN_DIST_MAX )),
            gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

        pest01aiscripts.startSwarm( this._x );

        for( let i = 0; i < gameDefs.PEST01_MEMBERS; ++i )
            pest01aiscripts.addMember( i, this.enemyStrategy.create('pest01_ship').get() );

        this.swarmActive = true;
    }

    // 
    //  DESC: A pest01 swarm member was killed (by a shot or a ram): score, and the bonus for the last one
    //
    pest01Killed( sprite, killerSprite )
    {
        pest01aiscripts.disturbSwarm();

        sprite.collisionComponent.enable = false;
        sprite.prepareScript( 'die', killerSprite );

        this.updateHudProgress( PEST01_SHIP_HIT_VALUE + ((this.countPest01() === 0) ? PEST01_SWARM_BONUS : 0) );
    }

    // 
    //  DESC: Is a mini-boss out?
    //
    isMiniBossActive()
    {
        for( let i = 0; i < this.enemyStrategy.nodeAry.length; ++i )
        {
            if( this.enemyStrategy.nodeAry[i].userId === gameDefs.MINI_BOSS_00_SHIP_ID ||
                this.enemyStrategy.nodeAry[i].userId === gameDefs.MINI_BOSS_01_SHIP_ID )
                return true;
        }

        return false;
    }

    // 
    //  DESC: Spawn the boss and start the boss battle
    //
    spawnBoss()
    {
        // Spawn above the screen. The AI moves it over a building far from the player and descends.
        this._bossNode = this.enemyStrategy.create('boss00_ship');
        this._bossNode.get().setPosXYZ( 0, settings.deviceRes.h );
        this.bossSprite = this._bossNode.get();

        // The boss head is a SpriteNode (it has children), whose init() only prepares
        // the children's prepareOnInit scripts - not the head sprite's own. Prepare the
        // head sprite's AI + collision scripts manually. Guarded so a recycled node
        // (already prepared by resetTree) isn't double-prepared.
        if( !this._bossNode.get().scriptComponent.isActive() )
            this._bossNode.get().prepareScriptOnInit();

        // Boss battle music
        this.startBossMusic();
    }

    // 
    //  DESC: Start the camera easing that slides the player ship to the back of the screen when it
    //        moves in moveDir. During the boss battle it's faster when the ship turns toward the boss,
    //        so the ship is at its normal position (not the middle of the screen) by the time the boss
    //        comes into view. Reversing away from the boss (ex: to slow down) uses the normal speed.
    //
    startCameraEasing( moveDir )
    {
        this._fastCameraEasing = false;

        if( this.bossBattleActive && this.bossSprite )
        {
            // Wrap-aware screen distance from the ship to the boss
            this._bossDeltaX = (this.bossSprite.pos.x + this.buildingsCamera.pos.x) -
                (this.playerShip.sprite.pos.x + this.levelCamera.pos.x);
            this._bossDeltaX = genFunc.wrapDelta( this._bossDeltaX, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

            this._fastCameraEasing = ((moveDir === MOVE_RIGHT) === (this._bossDeltaX > 0));
        }

        this._cameraEasingSpeed = this._fastCameraEasing ? gameDefs.BOSS00_CAMERA_EASING_SPEED : CAMERA_EASING_SPEED;

        this.cameraEasingX.init( this.cameraEasingX.getValue(),
            (moveDir === MOVE_LEFT) ? -this._cameraEasingSpeed : this._cameraEasingSpeed,
            this._fastCameraEasing ? gameDefs.BOSS00_CAMERA_EASING_RAMP_SEC : 1, easing.getLinear() );
    }

    // 
    //  DESC: Boss battle screen lock. Once the boss is in view (body on the screen), the screen stops
    //        scrolling and only the player ship moves, until the boss flies off the screen or dies.
    //        Must be called after _easingVal is set (it zeroes it while locked).
    //
    handleBossScreenLock()
    {
        if( this.bossBattleActive && this.bossSprite )
        {
            // Boss X on the screen (camera pos is the negated camera position), wrapped to the nearest copy
            this._bossScreenX = this.bossSprite.pos.x + this.buildingsCamera.pos.x;
            this._bossScreenX = genFunc.wrapDelta( this._bossScreenX, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

            // Coming into view of the boss: slow the ship down once, before the lock, so it stops in time.
            // Only while the boss is over its building attacking (vulnerable), not while it travels, so chasing
            // a boss that flies off isn't interrupted. Re-armed once the boss is completely off the side of the screen.
            if( !this.bossBrakeDone )
            {
                if( this.bossSprite.vulnerable &&
                    (Math.abs( this._bossScreenX ) < gameDefs.BOSS00_BRAKE_START_DIST) &&
                    this.buildingsCamera.inViewY( this.bossSprite.transPos, this.bossSprite.parentNode.radius ) )
                {
                    this.bossBrakeDone = true;
                    this.startBossBrake();
                }
            }
            else if( Math.abs( this._bossScreenX ) > (settings.deviceRes_half.w + gameDefs.BOSS00_SCREEN_LOCK_INSET) )
            {
                this.bossBrakeDone = false;
            }

            // Lock once the boss body is on the screen while it's over its building attacking (vulnerable: down,
            // not traveling). Unlock as soon as it stops attacking (ex: it leaves for the next building) so the
            // player has full control to chase it, or once it's completely off the side of the screen.
            if( !this.bossScreenLock )
            {
                this.bossScreenLock = this.bossSprite.vulnerable &&
                    (Math.abs( this._bossScreenX ) < (settings.deviceRes_half.w - gameDefs.BOSS00_SCREEN_LOCK_INSET)) &&
                    this.buildingsCamera.inViewY( this.bossSprite.transPos, this.bossSprite.parentNode.radius );
            }
            else if( !this.bossSprite.vulnerable ||
                (Math.abs( this._bossScreenX ) > (settings.deviceRes_half.w + gameDefs.BOSS00_SCREEN_LOCK_INSET)) )
            {
                this.endBossScreenLock();
            }
        }
        else
        {
            this.bossBrakeDone = false;

            if( this.bossScreenLock )
                this.endBossScreenLock();
        }

        // Locked: the cameras don't move
        if( this.bossScreenLock )
            this._easingVal = 0;

        // The slow-down finished (left/right/boost input was ignored during it): give the control back.
        // If a direction is held, speed up in it like a thrust press does, else let the camera easing settle.
        if( this.bossBrake && this.easingX.isFinished() )
        {
            this.bossBrake = false;

            if( this.lastMoveAction === defs.EAP_DOWN )
            {
                this.easingX.init( this.easingX.getValue(),
                    ((this.lastMoveDirX === MOVE_LEFT) ? -1 : 1) * (this.playerShip.speed + this.playerShip.boostSpeed), 2, easing.getLinear() );

                this._dir = -this.levelCamera.pos.x - this.playerShip.sprite.pos.x;
                if( (this.lastMoveDirX === MOVE_LEFT) ? (this._dir > -CAMERA_EASING_OFFSET) : (this._dir < CAMERA_EASING_OFFSET) )
                    this.startCameraEasing( this.lastMoveDirX );
            }
            else
            {
                this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );
            }
        }
    }

    // 
    //  DESC: The boss is coming into view. If the ship is flying toward the boss, slow it down
    //        fast (once) so it doesn't run into the boss. The player has the control again right after.
    //
    startBossBrake()
    {
        this._shipScreenX = this.playerShip.sprite.pos.x + this.levelCamera.pos.x;

        if( (this.easingX.getValue() !== 0) && ((this.easingX.getValue() > 0) === (this._bossScreenX > this._shipScreenX)) )
        {
            this.playerShip.boostSpeed = 0;
            this.easingX.init( this.easingX.getValue(), 0, gameDefs.BOSS00_LOCK_BRAKE_SEC, easing.getLinear() );
            this.bossBrake = true;
        }
    }

    // 
    //  DESC: End the boss screen lock. The facing-direction camera easing was ignored while locked, so drop it.
    //        If the ship is moving, slide it back to its normal position (back of the screen) like a thrust press does.
    //
    endBossScreenLock()
    {
        this.bossScreenLock = false;
        this.cameraEasingX.clear();

        this._shipScreenX = this.playerShip.sprite.pos.x + this.levelCamera.pos.x;

        if( this.lastMoveDirX === MOVE_LEFT && this.easingX.getValue() < 0 && this._shipScreenX < CAMERA_EASING_OFFSET )
        {
            this.moveDirX = MOVE_LEFT;
            this.startCameraEasing( MOVE_LEFT );
        }
        else if( this.lastMoveDirX === MOVE_RIGHT && this.easingX.getValue() > 0 && this._shipScreenX > -CAMERA_EASING_OFFSET )
        {
            this.moveDirX = MOVE_RIGHT;
            this.startCameraEasing( MOVE_RIGHT );
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
        else if( this.train.timer.expired( false, true ) )
        {
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
        for( let i = 0; i < MAX_CLOUDS; ++i )
        {
            this.cloudAry[i].incPosXYZ(highResTimer.elapsedTime * this.cloudAry[i].speed);

            if(this.cloudAry[i].pos.x - (this.cloudAry[i].getSize().w / 2) > settings.deviceRes_half.w)
            {
                this.cloudAry[i].setScaleXYZ(genFunc.randomInt(2, 4), genFunc.randomInt(2, 4));
                this.cloudAry[i].speed = genFunc.randomArbitrary(0.001, 0.02);
                this.cloudAry[i].setPosXYZ(-((this.cloudAry[i].getSize().w / 2) + settings.deviceRes_half.w), genFunc.randomInt(CLOUD_MIN_Y, CLOUD_MAX_Y));

                // Flip the sprite?
                this.cloudAry[i].setRotXYZ(0, 0);
                if(genFunc.randomInt(0, 1))
                    this.cloudAry[i].setRotXYZ(0, 180);
            }
        }
    }

    //
    //  DESC: Handle the radar movement
    //
    handleRadarMovement( easingVal )
    {
        this.radarCamAry[0].incPosXYZ( easingVal * RADAR_SCALE );

        if( this.radarCamAry[0].pos.x > -68 )
        {
            this.radarCamAry[1].setPosXYZ( -(this.radarCamAry[0].pos.x - ((gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) * RADAR_SCALE)) );
        }
        else
        {
            this.radarCamAry[1].setPosXYZ( -(this.radarCamAry[0].pos.x + ((gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) * RADAR_SCALE)) );
        }

        // Wrap the radar by flipping the camera
        // This needs to be last otherwise the radar cameras get out-of-sync with the level camera
        if( this.radarCamAry[1].pos.x > -68 )
        {
            this.radarCamAry.push( this.radarCamAry.shift() );
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

            // Normalize movement to elapsed time so varying frame durations
            // don't cause visible speed-ups / slow-downs (especially on mobile touch)
            this._easingVal *= highResTimer.timeScale;

            // Boss battle: lock the screen while the boss is in view (only the player ship moves)
            this.handleBossScreenLock();

            // Handle the enemy spawn
            this.handleEnemySpawn();

            // Rapid Fire reward: keep firing while the fire button is held
            if( this.rapidFire && this.shootHeld && this.playerShip.sprite.collisionComponent.enable )
            {
                this.rapidFireTime -= highResTimer.elapsedTime;
                if( this.rapidFireTime <= 0 )
                {
                    this.rapidFireTime = RAPID_FIRE_INTERVAL;
                    this.firePlayerShot();
                }
            }

            // Handle the train spawn
            this.handleTrainSpawn( this._easingVal );

            // Handle the cloud movement
            this.handleCloudMovement();

            // Handle the radar movement
            this.handleRadarMovement( this._easingVal );

            // Handle changing the music every 5 minutes
            this.handleMusicChange();

            if(this.slowHealTimer && this.slowHealTimer.expired(true))
            {
                if(this.playerShip.progressBar.isVisible())
                {
                    if(this.playerShip.progressBar.isMaxValue())
                        this.playerShip.progressBar.setVisible( false );
                    else
                        this.playerShip.progressBar.incCurrentValue(1.5);
                }
            }

            if( !this.unlimitedBoost )
            {
                if(this.playerShip.boostSpeed === PLAYER_SHIP_BOOST_TOP_SPEED && !this.playerShip.boostBar.isMinValue())
                {
                    this.playerShip.boostBar.incCurrentValue( -highResTimer.elapsedTime );

                    if(this.playerShip.boostBar.isMinValue())
                    {
                        this.playerShip.waitForFullBoostCharge = true;
                        this.playerShip.boostSpeed = 0;
                        if( this.lastMoveDirX === MOVE_LEFT )
                            this.easingX.init( this.easingX.getValue(), -(this.playerShip.speed + this.playerShip.boostSpeed), 2, easing.getLinear() );
                        else
                            this.easingX.init( this.easingX.getValue(), this.playerShip.speed + this.playerShip.boostSpeed, 2, easing.getLinear() );
                    }
                }
                else if(this.playerShip.boostButtonPress === defs.EAP_UP)
                {
                    this.playerShip.boostBar.incCurrentValue( highResTimer.elapsedTime * 1.5 );

                    if(this.playerShip.boostBar.isMaxValue())
                    {
                        this.playerShip.boostButtonPress = defs.EAP_IDLE;
                        this.playerShip.boostBar.setVisible( false );
                    }
                }
            }
            // Unlimited boost: the bar stays full, so hide it as soon as the boost is released
            // (like the normal bar does once it's recharged)
            else if( this.playerShip.boostButtonPress === defs.EAP_UP )
            {
                this.playerShip.boostButtonPress = defs.EAP_IDLE;
                this.playerShip.boostBar.setVisible( false );
            }

            // Shield bar: drains while the shield is up, recharges slowly while the button is up
            if( this.playerShip.sprite.shieldOn )
            {
                this.playerShip.shieldBar.incCurrentValue( -highResTimer.elapsedTime );

                if( this.playerShip.shieldBar.isMinValue() )
                {
                    // Shield Overdrive doesn't lock the shield out after a full drain
                    this.playerShip.waitForFullShieldCharge = !this.shieldOverdrive;
                    this.setShield( false );
                }
            }
            else if( this.playerShip.shieldButtonPress === defs.EAP_UP )
            {
                this.playerShip.shieldBar.incCurrentValue( highResTimer.elapsedTime * SHIELD_RECHARGE_SPEED * (this.shieldOverdrive ? SHIELD_OVERDRIVE_SCALE : 1) );

                if( this.playerShip.shieldBar.isMaxValue() )
                {
                    this.playerShip.shieldButtonPress = defs.EAP_IDLE;
                    this.playerShip.shieldBar.setVisible( false );
                }
            }

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

            // Reset the building camera once we are done with filling the gap with the wrap around camera
            if( this.buildingsCamera.pos.x < -6200 )
                this.buildingsCamera.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            else if( this.buildingsCamera.pos.x > 6300)
                this.buildingsCamera.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

            // Near the wrap point, put the wrap around camera on the copy of the view on the other side of the map.
            // The enemies' band (ENEMY_WRAP_RENDER_DIST) is wider than the buildings' and contains it.
            if( this.buildingsCamera.pos.x < -ENEMY_WRAP_RENDER_DIST )
                this.wrapAroundCamera.setPosXYZ( -(this.buildingsCamera.pos.x + (gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2)) );
            else if( this.buildingsCamera.pos.x > ENEMY_WRAP_RENDER_DIST )
                this.wrapAroundCamera.setPosXYZ( -(this.buildingsCamera.pos.x - (gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2)) );

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

            this.playerShip.sprite.incPosXYZ( this.easingX.getValue() * highResTimer.timeScale, this.easingY.getValue() * highResTimer.timeScale );

            // Screen locked for the boss: keep the ship on the screen
            if( this.bossScreenLock )
            {
                this._shipScreenX = this.playerShip.sprite.pos.x + this.levelCamera.pos.x;
                this._shipLimitX = settings.deviceRes_half.w - gameDefs.BOSS00_SCREEN_LOCK_EDGE;

                if( this._shipScreenX > this._shipLimitX )
                    this.playerShip.sprite.incPosXYZ( this._shipLimitX - this._shipScreenX );
                else if( this._shipScreenX < -this._shipLimitX )
                    this.playerShip.sprite.incPosXYZ( -this._shipLimitX - this._shipScreenX );
            }

            // Loop the player strategy and camera
            if( this.playerShip.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            {
                for( let i = 0; i < this.playerShip.strategy.nodeAry.length; ++i )
                    this.playerShip.strategy.nodeAry[i].get().incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

                this.levelCamera.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );
            }
            else if( this.playerShip.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            {
                for( let i = 0; i < this.playerShip.strategy.nodeAry.length; ++i )
                    this.playerShip.strategy.nodeAry[i].get().incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );

                this.levelCamera.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            }
            
            strategyManager.update();
            this.upperHudStategy.update();
            this.lowerHudStategy.update();
            this.enemyStrategy.update();
            this.enemyShotStrategy.update();
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
            this.enemyShotStrategy.transform();
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
                this.forgroundStrategy.render( this.forgroundCamera );
                if( this.train.strategy )
                    this.train.strategy.render( this.train.camera );
            }

            // Render the enemies across the wrap around in a wider band than the buildings (big enemies like the boss)
            if( this.buildingsCamera.pos.x < -ENEMY_WRAP_RENDER_DIST || this.buildingsCamera.pos.x > ENEMY_WRAP_RENDER_DIST )
            {
                this.enemyStrategy.render( this.wrapAroundCamera );
                this.enemyShotStrategy.render( this.wrapAroundCamera );
            }

            this.enemyStrategy.render();
            this.enemyShotStrategy.render();
            this.playerShip.strategy.render();
            this.lowerHudStategy.render();

            // Render the top hud radar map
            this._viewPort = device.gl.getParameter(device.gl.VIEWPORT);
            device.gl.viewport(this._viewPort[0], this._viewPort[3] - (this._viewPort[3] * 0.09), this._viewPort[2], this._viewPort[3] * RADAR_SCALE);
            this.buildingsStrategy.render( this.radarCamera1 );
            this.enemyStrategy.render( this.radarCamera1 );
            this.enemyShotStrategy.render( this.radarCamera1 );
            this.playerShip.strategy.render( this.radarCamera1 );
            this.buildingsStrategy.render( this.radarCamera2 );
            this.enemyStrategy.render( this.radarCamera2 );
            this.enemyShotStrategy.render( this.radarCamera2 );
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
        aidata.clearAIData();
        pest01aiscripts.clearSwarm();
        wreck00aiscripts.clearLockCooldown();
        
        objectDataManager.freeGroup( ['(level_1)'] );

        // Disconnect to the collision signal
        signalManager.clear_collisionSignal();

        this.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );

        soundManager.freeGroup( '(level_1)' );

        // Do a delayed stop on all the music except the ambient
        for( let i = 0; i < this.musicAry.length; ++i )
        {
            let gsnd = soundManager.getSound( '(music)', `LOOP_Techno_in_Space_${this.musicAry[i]}` );
            scriptSingleton.prepare( 'delayed_execution', 500, null, () => gsnd.stop() );
        }

        let bsnd = soundManager.getSound( '(music)', 'LOOP_City-Showdown' );
        scriptSingleton.prepare( 'delayed_execution', 500, null, () => bsnd.stop() );
    }

    //
    //  DESC: For Mobile: Left-side per-frame touch callback - continuous Y position tracking
    //
    onLeftTouch( slot )
    {
        if( !menuManager.active && this.playerShip.sprite.collisionComponent.enable )
        {
            this._gameY = settings.deviceRes_half.h - (slot.currentY / device.canvas.clientHeight) * settings.deviceRes.h;

            // Clamp to the existing bounds
            if( this._gameY < -(settings.deviceRes_half.h * 0.92) )
                this._gameY = -(settings.deviceRes_half.h * 0.92);
            else if( this._gameY > (settings.deviceRes_half.h * 0.73) )
                this._gameY = (settings.deviceRes_half.h * 0.73);

            this._diffY = this._gameY - this.playerShip.sprite.pos.y;

            if( this._diffY > settings.user.touchDeadZone )
            {
                this.easingY.init( this.easingY.getValue(), 7, 0.5, easing.getLinear() );
                this.moveDirY = MOVE_UP;
            }
            else if( this._diffY < -settings.user.touchDeadZone )
            {
                this.easingY.init( this.easingY.getValue(), -7, 0.5, easing.getLinear() );
                this.moveDirY = MOVE_DOWN;
            }
            else
            {
                this.moveDirY = MOVE_NULL;
                this.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
            }
        }
    }

    //
    //  DESC: For Mobile: Left-side touch end callback - stop Y movement
    //
    onLeftTouchEnd()
    {
        this.moveDirY = MOVE_NULL;
        this.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
    }

    //
    //  DESC: For Mobile: Right-side per-frame touch callback - detect two fingers (shield),
    //        a quick swipe up (boost) or a hold (fire)
    //
    onRightTouch( slot )
    {
        // A finger that's part of the shield gesture does nothing else until it's lifted
        if( !slot.shieldHold )
        {
            // Two fingers on the right side → shield until either is lifted. Cancels this finger's boost or fire.
            this._rightTouchCount = 0;
            for( let ti = 0; ti < eventManager.touchPool.length; ++ti )
            {
                this._slot = eventManager.touchPool[ti];
                if( this._slot.id !== -1 && !this._slot.ended && this._slot.side === 'right' )
                    ++this._rightTouchCount;
            }

            if( this._rightTouchCount > 1 )
            {
                if( slot.boostHold )
                    eventManager._queueTouchEvent( gameDefs.TOUCH_BOOST, touchevent.TOUCH_BUTTON_UP );
                else if( slot.fireHold )
                    eventManager._queueTouchEvent( gameDefs.TOUCH_FIRE, touchevent.TOUCH_BUTTON_UP );

                slot.boostHold = false;
                slot.fireHold = false;
                slot.shieldHold = true;

                if( !this.touchShieldHeld )
                {
                    this.touchShieldHeld = true;
                    eventManager._queueTouchEvent( gameDefs.TOUCH_SHIELD, touchevent.TOUCH_BUTTON_DOWN );
                }
            }
            else if( !slot.boostHold && !slot.fireHold )
            {
                this._tdx = slot.currentX - slot.startX;
                this._tdy = slot.currentY - slot.startY;
                this._holdTime = performance.now() - slot.startTime;

                // Quick swipe up → boost until the finger is lifted (dy is negative going up)
                if( this._holdTime < TOUCH_HOLD_TIME && -this._tdy > TOUCH_BOOST_SWIPE_DIST && -this._tdy > Math.abs( this._tdx ) )
                {
                    slot.boostHold = true;
                    eventManager._queueTouchEvent( gameDefs.TOUCH_BOOST, touchevent.TOUCH_BUTTON_DOWN );
                }
                // Small movement held long enough → fire (with the Rapid Fire reward, it keeps firing until lifted)
                else if( this._holdTime >= TOUCH_HOLD_TIME && (this._tdx * this._tdx + this._tdy * this._tdy) < 400 )
                {
                    slot.fireHold = true;
                    eventManager._queueTouchEvent( gameDefs.TOUCH_FIRE, touchevent.TOUCH_BUTTON_DOWN );
                }
            }
        }
    }

    //
    //  DESC: For Mobile: Right-side touch end callback - release the boost or fire hold, swipe to pause or tap to fire
    //
    onRightTouchEnd( slot, dx, dy )
    {
        // dx is in CSS pixels (clientX delta), so compare against the CSS width
        // (clientWidth), not the DPR-scaled backing store (canvas.width).
        this._swipeDist = device.canvas.clientWidth * 0.6;

        // A shield finger lifted → drop the shield (not a tap, swipe or pause)
        if( slot.shieldHold )
        {
            if( this.touchShieldHeld )
            {
                this.touchShieldHeld = false;
                eventManager._queueTouchEvent( gameDefs.TOUCH_SHIELD, touchevent.TOUCH_BUTTON_UP );
            }
        }
        // Boost swipe lifted → stop boosting
        else if( slot.boostHold )
            eventManager._queueTouchEvent( gameDefs.TOUCH_BOOST, touchevent.TOUCH_BUTTON_UP );

        // Fire hold lifted → stop firing
        else if( slot.fireHold )
            eventManager._queueTouchEvent( gameDefs.TOUCH_FIRE, touchevent.TOUCH_BUTTON_UP );

        // Swipe across 60%+ of screen width, away from the action thumb, → toggle pause.
        // Right-handed: action thumb is on the right, so swipe right-to-left (dx negative).
        // Left-handed: action thumb is on the left, so swipe left-to-right (dx positive).
        else if( (eventManager.leftHandedTouch && dx > this._swipeDist) ||
            (!eventManager.leftHandedTouch && dx < -this._swipeDist) )
            eventManager._queueTouchEvent( gameDefs.TOUCH_PAUSE, touchevent.TOUCH_BUTTON_DOWN );

        // Quick tap → fire one shot
        else if( !menuManager.active && (dx * dx + dy * dy) < 400 )
        {
            eventManager._queueTouchEvent( gameDefs.TOUCH_FIRE, touchevent.TOUCH_BUTTON_DOWN );
            eventManager._queueTouchEvent( gameDefs.TOUCH_FIRE, touchevent.TOUCH_BUTTON_UP );
        }

        // Reset the hold states for the next touch
        slot.boostHold = false;
        slot.fireHold = false;
        slot.shieldHold = false;
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
        .then(() => aiManager.loadFromXml( [
            genFunc.stringLoadXML( wreck00_ai ),
            genFunc.stringLoadXML( pest00_ai ),
            genFunc.stringLoadXML( pest01_ai ),
            genFunc.stringLoadXML( mini_boss_00_ai ),
            genFunc.stringLoadXML( mini_boss_01_ai ),
            genFunc.stringLoadXML( boss00_ai )] ))

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
