//
//  FILE NAME: aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { aiNode } from '../../../library/node/ainode';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';

var ai_data = {};

const pixel_per_sec = 100,
      passive_shooter_time = 3500,
      aggrssive_shooter_time = 1500,
      destroy_building_shooter_time = 1000;

// 
//  DESC: Clear the AI data
//
export function clearAIData()
{
    ai_data = {};
}

//
//  DESC: AI Enemy head (root) node base class script
//        Only supports one child
//
class AI_Enemy_Head extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        this.data = ai_data;
        this.state = defs.EAIS_INIT;
    }
    
    // 
    //  DESC: Handle post load init
    //
    init()
    {
        if( genFunc.isEmpty( this.data ) )
        {
            let playerShipStratagy = strategyManager.get('_player_ship_');
            this.data['playerShipStratagy'] = playerShipStratagy;
            this.data['buildings'] = strategyManager.get("_buildings_").nodeAry;
            this.data['enemy'] = strategyManager.get("_enemy_").nodeAry;
            this.data['playerShip'] = playerShipStratagy.get('player_ship').get();
            this.data['camera'] = playerShipStratagy.camera;
        }
    }

    // 
    //  DESC: Execute the children
    //
    execute()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.init();
            this.state = defs.EAIS_ACTIVE;
        }

        // Returning SUCCESS or FAILURE terminates the execution of this behavioral tree
        if( this.nodeAry[0].evaluate() != defs.EAIS_ACTIVE )
            return true;

        return false;
    }
}

//
//  DESC: AI Leaf (task) node script. Desend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy_Desend extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Handle post load init this.easingY.init( this.easingY.getValue(), 0, 0.25, easing.getLinear() );
    //
    init()
    {
        // Set the initial position of the sprite above the height of the screen
        // with a random amount to delay how long it takes to be visible on the screen
        this.sprite.targetBuilding = this.data['buildings'][31].get();//genFunc.randomInt( 0, this.data['buildings'].length-1 );
        this.sprite.targetLocked = false;
        this.sprite.shootTime = 0;
        let offsetY = genFunc.randomInt(0, 200);
        this.sprite.setPosXYZ( this.sprite.targetBuilding.pos.x, settings.size_half.h + (this.sprite.getSize().h / 2) + offsetY );
        offsetY += (this.sprite.getSize().h / 2) + genFunc.randomInt(50, settings.size_half.h - 50);

        // Calculated to move in pixels per second
        this.easingY.init( this.sprite.pos.y, (this.sprite.pos.y - offsetY), offsetY / pixel_per_sec, easing.getSineOut() );
    }
    
    // 
    //  DESC: Handle the desend
    //
    evaluate()
    {
        // Do first time inits
        if( this.state === defs.EAIS_INIT )
        {
            this.init();
            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            // Shoot at the player
            if( this.data['playerShip'].collisionComponent.enable )
            {
                this.sprite.shootTime -= highResTimer.elapsedTime;

                if( (this.sprite.shootTime < 0) && this.data['camera'].inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
                {
                    let shootSprite = this.data['playerShipStratagy'].create('enemy_shot').get();
                    shootSprite.scriptComponent.prepare( 'shoot', shootSprite, this.sprite );
                    this.sprite.shootTime = highResTimer.elapsedTime + passive_shooter_time;
                }
            }

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Roam around the play area.
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy_Roam extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.easingX = new easing.valueTo;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.easingX = new easing.valueTo;
        this.easingY = new easing.valueTo;
        this.sprite.targetLocked = false;
        this.state = defs.EAIS_ACTIVE;
    }
    
    // 
    //  DESC: Handle the roam until a target lock
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.easingX.execute();

            // First interation, the easing is uninitialized so don't use the value which is 0,0.
            if( this.easingY.isInitialized() )
            {
                this.sprite.setPosXYZ( this.easingX.getValue(), this.easingY.getValue() );
            }

            // Shoot at the player
            if( this.data['playerShip'].collisionComponent.enable )
            {
                this.sprite.shootTime -= highResTimer.elapsedTime;

                if( (this.sprite.shootTime < 0) && this.data['camera'].inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
                {
                    let shootSprite = this.data['playerShipStratagy'].create('enemy_shot').get();
                    shootSprite.scriptComponent.prepare( 'shoot', shootSprite, this.sprite );
                    this.sprite.shootTime = highResTimer.elapsedTime + passive_shooter_time;
                }
            }

            if( this.easingX.isFinished() && this.easingY.isFinished() )
            {
                if( !this.sprite.targetLocked )
                {
                    // Randmoly pick a building to target on
                    let index = genFunc.randomInt( 0, this.data['buildings'].length-1 );
                    let targetBuilding = this.data['buildings'][index].get();

                    if( targetBuilding.destroyed === undefined )
                    {
                        this.sprite.targetBuilding = this.data['buildings'][index].get();

                        // Calculate the travel time
                        let time = Math.abs(this.sprite.pos.x - this.sprite.targetBuilding.pos.x) / pixel_per_sec;
                        this.easingX.init( this.sprite.pos.x, this.sprite.targetBuilding.pos.x, time, easing.getSineInOut() );

                        // Force an initialization to start the movement on first time execution of this function
                        this.easingY.init( this.sprite.pos.y, this.sprite.pos.y, 0, easing.getSineInOut() );

                        // See if we should target lock on a house
                        let targetLockValue = 0;//genFunc.randomInt( 0, 2 );
                        if( targetLockValue === 0 )
                        {
                            let targetLockFound = false;
                            let enemyAry = this.data['enemy'];
                            for( let i = 0; i < enemyAry.length; i++ )
                            {
                                if( (enemyAry[i] != this.sprite) && (enemyAry[i].targetBuilding === this.sprite.targetBuilding) && enemyAry[i].targetLocked )
                                {
                                    targetLockFound = true;
                                    break;
                                }
                            }

                            if( !targetLockFound )
                            {
                                this.sprite.targetLocked = true;
                            }
                        }

                        // Only set the Y easing if not the same building position as we are now
                        if( this.sprite.targetBuilding.pos.x != this.sprite.pos.x )
                        {
                            // Filter the Y range in which the enemy will travel
                            let offsetY = genFunc.randomInt( 50, settings.size_half.h - (this.sprite.getSize().h / 2) - 50 );
                            this.easingY.init( this.sprite.pos.y, offsetY, time, easing.getSineInOut() );
                        }
                    }
                }
                else
                {
                    this.state = defs.EAIS_SUCCESS;
                }
            }
        }
        
        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Destroy building
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy_DesendToBuilding extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.easingY = new easing.valueTo;
        this.state = defs.EAIS_ACTIVE;
    }
    
    // 
    //  DESC: Handle the desend onto the target
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            // First interation, init the easing
            if( !this.easingY.isInitialized() )
            {
                let offsetY = this.sprite.targetBuilding.pos.y + (this.sprite.targetBuilding.getSize().h / 2) + (this.sprite.getSize().h / 2) - 20;
                let time = Math.abs(this.sprite.pos.y - offsetY) / pixel_per_sec;

                this.easingY.init( this.sprite.pos.y, offsetY, time, easing.getSineInOut() );
            }

            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            // Shoot at the player
            if( this.data['playerShip'].collisionComponent.enable )
            {
                this.sprite.shootTime -= highResTimer.elapsedTime;

                if( (this.sprite.shootTime < 0) && this.data['camera'].inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
                {
                    let shootSprite = this.data['playerShipStratagy'].create('enemy_shot').get();
                    shootSprite.scriptComponent.prepare( 'shoot', shootSprite, this.sprite );
                    this.sprite.shootTime = highResTimer.elapsedTime + aggrssive_shooter_time;
                }
            }

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Destroy building
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy_DestroyBuilding extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_ACTIVE;
        this.shakeTime = 0;
        this.shakeTimeout = 40;
        this.indexX = 0;
        this.indexY = 2;
        this.offset = [-1, 1, 0, 1, -1];
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_ACTIVE;
        this.shakeTime = 0;
        this.shakeTimeout = 40;
        this.indexX = 0;
        this.indexY = 2;
        this.offset = [-1, 1, 0, 1, -1];
    }
    
    // 
    //  DESC: Handle the desend onto the target
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            this.shakeTime -= highResTimer.elapsedTime;

            // Shoot at the player
            if( this.data['playerShip'].collisionComponent.enable )
            {
                this.sprite.shootTime -= highResTimer.elapsedTime;

                if( (this.sprite.shootTime < 0) && this.data['camera'].inView( this.sprite.transPos, this.sprite.parentNode.radius ) )
                {
                    let shootSprite = this.data['playerShipStratagy'].create('enemy_shot').get();
                    shootSprite.scriptComponent.prepare( 'shoot', shootSprite, this.sprite );
                    this.sprite.shootTime = highResTimer.elapsedTime + destroy_building_shooter_time;
                }
            }

            if( this.shakeTime < 0 )
            {
                this.shakeTime = highResTimer.elapsedTime + this.shakeTimeout;
                this.sprite.incPosXYZ( this.offset[this.indexX], this.offset[this.indexY] );
                this.indexX = (this.indexX + 1) % this.offset.length;
                this.indexY = (this.indexY + 1) % this.offset.length;

                if( this.indexX == 0 )
                {
                    this.shakeTimeout -= 1;
                    if( this.shakeTimeout === 30 )
                    {
                        this.offset = [-2, 2, 0, 2, -2];
                    }
                    else if( this.shakeTimeout === 20 )
                    {
                        this.offset = [-3, 3, 0, 3, -3];
                    }
                    else if( this.shakeTimeout === 10 )
                    {
                        this.offset = [-4, 4, 0, 4, -4];
                    }
                    else if( this.shakeTimeout === 0 )
                    {
                        this.offset = [-5, 5, 0, 5, -5];
                    }
                    else if( this.shakeTimeout === -10 )
                    {
                        this.sprite.targetBuilding.prepareScript( 'die' );
                        this.state = defs.EAIS_SUCCESS;
                    }
                }
            }
        }

        return this.state;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'AI_Enemy_Head',
        ( nodeData ) => { return new AI_Enemy_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy_Desend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy_Desend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy_Roam',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy_Roam( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy_DesendToBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy_DesendToBuilding( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy_DestroyBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy_DestroyBuilding( nodeData, headNode, sprite ); } );
}
