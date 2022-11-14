
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
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
import { cameraManager } from '../../../library/managers/cameramanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { aiManager } from '../../../library/managers/aimanager';
import { CommonState } from './commonstate';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import { settings } from '../../../library/utilities/settings';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as genFunc from '../../../library/utilities/genfunc';
import * as menuDefs from '../../../library/gui/menudefs';
import * as stateDefs from './statedefs';

import enemy_ai from 'raw-loader!../../data/objects/ai/enemy.ai';

export const ASSET_COUNT = 48;
const MOVE_NULL = -1,
      MOVE_LEFT = 0,
      MOVE_RIGHT = 1,
      MOVE_LEFT_RIGHT = 2,
      MOVE_UP = 2,
      MOVE_DOWN = 3,
      CAMERA_EASING_SPEED = 11,
      CAMERA_EASING_DIVISOR = 3,
      CAMERA_EASING_OFFSET = 350,
      MAX_CLOUDS = 8;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );

        // Set the collision callback signal
        signalManager.connect_collisionSignal( this.collisionCallBack.bind(this) );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree'] );
        
        // Clear the event queue
        eventManager.clear();
        
        // Prepare the strategies to run
        this.bkgStratagy = strategyManager.activateStrategy('_background_');
        strategyManager.activateStrategy('_buildingsback_');
        strategyManager.activateStrategy('_buildingsfront_');
        strategyManager.activateStrategy('_buildings_');
        strategyManager.activateStrategy('_forground_');

        // Randomly distrabute the clouds
        this.cloudAry = [];
        for( let i = 0; i < MAX_CLOUDS; i++ )
        {
            let node = this.bkgStratagy.get(`cloud_${i}`);
            let cloud = new Object();
            cloud.speed = genFunc.randomArbitrary(0.001, 0.02);
            cloud.sprite = node.get();
            cloud.sprite.setPosXYZ(genFunc.randomInt(-640, 640), genFunc.randomInt(-100, 350));
            cloud.sprite.setScaleXYZ(genFunc.randomInt(2, 4), genFunc.randomInt(2, 4));
            // Flip the sprite?
            if(genFunc.randomInt(0, 1))
                cloud.sprite.setRotXYZ(0, 180);

            this.cloudAry.push(cloud);
        }

        // Get the camera and reinit
        this.buildingsbackCamera = cameraManager.get('buildingsbackCamera');
        this.buildingsfrontCamera = cameraManager.get('buildingsfrontCamera');
        this.buildingsCamera = cameraManager.get('buildingsCamera');
        this.forgroundCamera = cameraManager.get('forgroundCamera');
        this.camera = cameraManager.get('levelCamera');
        this.buildingsbackCamera.initFromXml();
        this.buildingsfrontCamera.initFromXml();
        this.buildingsCamera.initFromXml();
        this.camera.initFromXml();

        // The enemy strategy needs to be activated before the player ship strategy
        this.enemyStratagy = strategyManager.activateStrategy('_enemy_');

        // Get the nodes and sprites we need to call and tuck them under the node for easy access
        this.playerShipStratagy = strategyManager.activateStrategy('_player_ship_');
        this.playerShipNode = this.playerShipStratagy.get('player_ship');
        this.playerShipNode.fireTailSprite = this.playerShipNode.findChild('player_fire_tail').sprite;
        this.playerShipNode.fireTailScript = this.playerShipNode.fireTailSprite.scriptComponent.prepare( 'fireTailAnim', this.playerShipNode.fireTailSprite );

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
        
        requestAnimationFrame( this.callback );
    }

    // 
    //  DESC: handle collisions
    //
    collisionCallBack( spriteA, spriteB )
    {
        // Stop any more collision detection
        spriteA.collisionComponent.enable = false;
        spriteB.collisionComponent.enable = false;

        // Schedule these sprite to be destroyed
        this.playerShipStratagy.destroy(spriteA.parentNode);
        this.enemyStratagy.destroy(spriteB.parentNode);
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
            if( event.type === menuDefs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }

        if( !menuManager.active )
        {
            // Handle the ship movement
            this.handleShipMovement( event );

            if( actionManager.wasActionPress( event, 'shoot', defs.EAP_DOWN ) )
            {
                let laserBlast = this.playerShipStratagy.create('player_lazer').get();
                laserBlast.scriptComponent.prepare( 'shoot', laserBlast, this.easingX.getValue() );
            }
        }
    }

    // 
    //  DESC: Handle the ship movement
    //
    handleShipMovement( event )
    {
        for( let i = 0; i < this.moveActionAry.length; i++ )
        {
            let actionResult = actionManager.wasAction( event, this.moveActionAry[i] );
            if( actionResult != defs.EAP_IDLE )
            {
                if( i < MOVE_LEFT_RIGHT )
                {
                    // Only act on action press for the last button down
                    if( actionResult === defs.EAP_UP && i !== this.lastMoveDirX )
                        continue;

                    if( i === MOVE_LEFT )
                    {
                        // Flip the ship facing left
                        this.playerShipNode.object.setRotXYZ( 0, 180 );

                        if( actionResult === defs.EAP_DOWN )
                        {
                            this.playerShipNode.fireTailSprite.setVisible( true );
                            this.playerShipNode.fireTailScript.pause = false;
                            this.easingX.init( this.easingX.getValue(), -10, 2, easing.getLinear() );

                            // Camera easing has to move slower or faster then the elements on the screen to avoid movement studder
                            this.cameraEasingX.init( this.cameraEasingX.getValue(), -CAMERA_EASING_SPEED, 2, easing.getLinear() );
                        }
                        else
                        {
                            this.playerShipNode.fireTailSprite.setVisible( false );
                            this.playerShipNode.fireTailScript.pause = true;
                            this.easingX.init( this.easingX.getValue(), 0, 3, easing.getLinear() );
                            this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );
                        }

                        this.moveDirX = MOVE_LEFT;
                    }
                    else if( i === MOVE_RIGHT )
                    {
                        // Flip the ship facing right (default orientation)
                        this.playerShipNode.object.setRotXYZ();

                        if( actionResult === defs.EAP_DOWN )
                        {
                            this.playerShipNode.fireTailSprite.setVisible( true );
                            this.playerShipNode.fireTailScript.pause = false;
                            this.easingX.init( this.easingX.getValue(), 10, 2, easing.getLinear() );

                            // Camera easing has to move slower or faster then the elements on the screen to avoid movement studder
                            this.cameraEasingX.init( this.cameraEasingX.getValue(), CAMERA_EASING_SPEED, 2, easing.getLinear() );
                        }
                        else
                        {
                            this.playerShipNode.fireTailSprite.setVisible( false );
                            this.playerShipNode.fireTailScript.pause = true;
                            this.easingX.init( this.easingX.getValue(), 0, 3, easing.getLinear() );
                            this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 1, easing.getLinear() );
                        }

                        this.moveDirX = MOVE_RIGHT;
                    }

                    this.lastMoveDirX = this.moveDirX;
                }
                else
                {
                    if( i === MOVE_UP )
                    {
                        if( actionResult === defs.EAP_DOWN )
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
                        if( actionResult === defs.EAP_DOWN )
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
    //  DESC: Clean up after this state ends
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_forground_','_background_','_buildingsfront_','_buildingsback_','_buildings_','_player_ship_','_enemy_'] );

        // Clear out any loaded AI
        aiManager.clear();
        
        objectDataManager.freeGroup( ['(level_1)'] );

        // Disconnect to the collision signal
        signalManager.clear_collisionSignal();
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
            this.easingX.execute();
            this.easingY.execute();
            this.cameraEasingX.execute();

            let easingVal = this.easingX.getValue() + this.cameraEasingX.getValue();
            this.camera.incPosXYZ( easingVal );
            this.forgroundCamera.incPosXYZ( easingVal );
            this.buildingsCamera.incPosXYZ( easingVal );
            this.buildingsbackCamera.incPosXYZ( easingVal * 0.25 );
            this.buildingsfrontCamera.incPosXYZ( easingVal * 0.5 );

            // Loop the static backgrounds
            if( this.buildingsbackCamera.pos.x < -1280 )
                this.buildingsbackCamera.incPosXYZ( -1280 );
            else if( this.buildingsbackCamera.pos.x > 1280 )
                this.buildingsbackCamera.incPosXYZ( 1280 );

            if( this.buildingsfrontCamera.pos.x < -1280 )
                this.buildingsfrontCamera.incPosXYZ( -1280 );
            else if( this.buildingsfrontCamera.pos.x > 1280 )
                this.buildingsfrontCamera.incPosXYZ( 1280 );

            if( this.forgroundCamera.pos.x < -1280 )
                this.forgroundCamera.incPosXYZ( -1280 );
            else if( this.forgroundCamera.pos.x > 1280 )
                this.forgroundCamera.incPosXYZ( 1280 );

            if( this.buildingsCamera.pos.x < -2800 )
                this.buildingsCamera.incPosXYZ( -2800 );
            else if( this.buildingsCamera.pos.x > 2800)
                this.buildingsCamera.incPosXYZ( 2800 );

            let incY = this.easingY.getValue();
            let playerPos = this.playerShipNode.object.transPos;

            // Stop the up/down movement
            if( (this.moveDirY === MOVE_DOWN && playerPos.y < -settings.defaultSize_half.h) ||
                (this.moveDirY === MOVE_UP && playerPos.y > settings.defaultSize_half.h) )
            {
                this.moveDirY = MOVE_NULL;
                incY = 0;
                this.easingY.init( 0, 0, 0, easing.getLinear() );
            }

            let dir = -this.camera.transPos.x - playerPos.x;
            let radius = settings.defaultSize_half.w - CAMERA_EASING_OFFSET;
            let offset = Math.abs(dir);

            // Slow the camera movement to a stop
            if( (this.moveDirX === MOVE_RIGHT && dir > 0 && offset > radius) ||
                (this.moveDirX === MOVE_LEFT && dir < 0 && offset > radius) )
            {
                this.moveDirX = MOVE_NULL;
                let time = CAMERA_EASING_DIVISOR / Math.abs(this.cameraEasingX.getValue());
                if( time < CAMERA_EASING_DIVISOR )
                    this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, time, easing.getLinear() );
                else
                    this.cameraEasingX.init( this.cameraEasingX.getValue(), 0, 0, easing.getLinear() );
            }

            this.playerShipNode.object.incPosXYZ( this.easingX.getValue(), incY );

            
            for( let i = 0; i < MAX_CLOUDS; i++ )
            {
                this.cloudAry[i].sprite.incPosXYZ(highResTimer.elapsedTime * this.cloudAry[i].speed);

                if(this.cloudAry[i].sprite.pos.x - (this.cloudAry[i].sprite.getSize().w / 2) > settings.size_half.w)
                {
                    this.cloudAry[i].sprite.setScaleXYZ(genFunc.randomInt(2, 4), genFunc.randomInt(2, 4));
                    this.cloudAry[i].speed = genFunc.randomArbitrary(0.001, 0.02);
                    this.cloudAry[i].sprite.setPosXYZ(-((this.cloudAry[i].sprite.getSize().w / 2) + settings.size_half.w), genFunc.randomInt(-100, 350));

                    // Flip the sprite?
                    this.cloudAry[i].sprite.setRotXYZ(0, 0);
                    if(genFunc.randomInt(0, 1))
                        this.cloudAry[i].sprite.setRotXYZ(0, 180);
                }
            }

            strategyManager.update();
        }
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        this.buildingsbackCamera.transform();
        this.buildingsfrontCamera.transform();
        this.buildingsCamera.transform();
        this.forgroundCamera.transform();
        this.camera.transform();
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


        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })
}
