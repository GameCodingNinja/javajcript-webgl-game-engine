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
import { soundManager } from '../../../library/sound/soundmanager';
import { scriptSingleton } from '../../../library/script/scriptcomponent';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

// Shared AI data
var ai_data_00 = {};

const pixel_per_sec_100 = 100,
      pixel_per_sec_200 = 200,
      passive_shooter_time = 2000,
      aggrssive_shooter_time = 1000,
      destroy_building_shooter_time = 500;

// 
//  DESC: Clear the AI data
//
export function clearAIData()
{
    ai_data_00 = {};
}

//
//  DESC: AI Enemy00 base class
//
class AI_Enemy00_base extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );
    }

    // 
    //  DESC: Shoot at the player
    //
    shootPlayer( shootTime )
    {
        // Shoot at the player
        if( this.data.playerShip.collisionComponent.enable)
        {
            this.sprite.shootTime -= highResTimer.elapsedTime;

            if( this.sprite.shootTime < 0 )
            {
                if( this.data.camera.inView( this.sprite.transPos, this.sprite.parentNode.radius )  )
                {
                    // Should we skip a shot?
                    if( genFunc.randomInt( 0, 10 ) > 3 )
                    {
                        let shootSprite = this.data.playerShipStratagy.create('enemy_shot').get();
                        shootSprite.scriptComponent.prepare( 'shoot', shootSprite, this.sprite );

                        this.data.groupPlayer.play( 'enemy00_gun' );
                    }

                    this.sprite.shootTime = highResTimer.elapsedTime + shootTime;
                }
            }
        }
    }
}

//
//  DESC: AI Enemy00 head (root) node base class script
//        Only supports one child
//
class AI_Enemy00_Head extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        this.data = ai_data_00;
        this.state = defs.EAIS_INIT;
    }
    
    // 
    //  DESC: Handle post load init
    //
    init()
    {
        if( genFunc.isEmpty( this.data ) )
        {
            this.data.playerShipStratagy = strategyManager.get('_player_ship_');
            this.data.buildings = strategyManager.get("_buildings_").nodeAry;
            this.data.enemy = strategyManager.get("_enemy_").nodeAry;
            this.data.playerShip = this.data.playerShipStratagy.get('player_ship').get();
            this.data.camera = this.data.playerShipStratagy.camera;
            this.data.minX = this.data.buildings[0].get().pos.x;
            this.data.maxX = this.data.buildings[this.data.buildings.length-1].get().pos.x;
            this.data.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
        }
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Initialize the tree by doing a reset
        this.resetTree();
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
class AI_Enemy00_Desend extends AI_Enemy00_base
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
        this.sprite.targetBuilding = null;
        this.sprite.shootTime = genFunc.randomInt( 0, 5000 );
        this.sprite.setPosXYZ( genFunc.randomInt( this.data.minX, this.data.maxX ), settings.deviceRes_half.h + this.sprite.parentNode.radius + genFunc.randomInt( 0, 200 ) );
        let offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5);

        // Calculated to move in pixels per second
        this.easingY.init( this.sprite.pos.y, offsetY, (this.sprite.pos.y - offsetY) / pixel_per_sec_100, easing.getSineOut() );
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingY.clear();
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

            // Shoot at the player once it's in view
            if( (this.sprite.pos.y + this.sprite.parentNode.radius) < settings.deviceRes_half.h )
                this.shootPlayer( passive_shooter_time );

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
class AI_Enemy00_Roam extends AI_Enemy00_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.easingX = new easing.valueTo;
        this.easingY = new easing.valueTo;
        this.data = headNode.data;
        this.sprite = sprite;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.easingX.clear(easing.CLEAR_EASING_FUNC);
        this.easingY.clear(easing.CLEAR_EASING_FUNC);
        this.sprite.targetBuilding = null;
        this.state = defs.EAIS_ACTIVE;
    }
    
    // 
    //  DESC: Handle the roam until a target lock
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE && this.data.buildings.length )
        {
            this.easingY.execute();
            this.easingX.execute();

            // First interation, the easing is uninitialized so don't use the value which is 0,0.
            if( this.easingY.isInitialized() )
            {
                this.sprite.setPosXYZ( this.easingX.getValue(), this.easingY.getValue() );
            }

            // Shoot at the player
            this.shootPlayer( passive_shooter_time );

            if( this.easingX.isFinished() && this.easingY.isFinished() )
            {
                if( this.sprite.targetBuilding === null )
                {
                    // Randmoly pick a building to target
                    this._index = genFunc.randomInt( 0, this.data.buildings.length-1 );
                    this._targetBuilding = this.data.buildings[this._index].get();

                    // Find a building that's not already targeted
                    this._freeBuildingFound = true;
                    for( this._i = 0; this._i < this.data.enemy.length; ++this._i )
                    {
                        if( this.data.enemy[this._i].get().targetBuilding === this._targetBuilding )
                        {
                            this._freeBuildingFound = false;
                            break;
                        }
                    }

                    if( (this._targetBuilding.destroyed === undefined) && this._freeBuildingFound )
                    {
                        // Should we target lock on a building?
                        if( genFunc.randomInt( 0, 10 ) > 4 )
                        {
                            // Set the target building
                            this.sprite.targetBuilding = this._targetBuilding;

                            // Calculate the travel time
                            this._time = Math.abs(this.sprite.pos.x - this.sprite.targetBuilding.pos.x) / pixel_per_sec_100;
                            this.easingX.init( this.sprite.pos.x, this.sprite.targetBuilding.pos.x, this._time, easing.getSineInOut() );

                            // Force an initialization to start the movement on first time execution of this function
                            this.easingY.init( this.sprite.pos.y, this.sprite.pos.y, 0, easing.getSineInOut() );

                            // Only set the Y easing if not the same building position as we are now
                            if( Math.abs( this.sprite.targetBuilding.pos.x - this.sprite.pos.x) > 100 )
                            {
                                // Generate the Y range in which the enemy will travel
                                let offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5 );
                                this.easingY.init( this.sprite.pos.y, offsetY, this._time, easing.getSineInOut() );
                            }
                        }
                    }

                    // If a building is not targeted, go after the player unless their is more enemies then buildings
                    if( this.sprite.targetBuilding === null )
                    {
                        this._offsetX = this.data.playerShip.pos.x;

                        if( this.data.buildings.length >= this.data.enemy.length )
                        {
                            this._offsetX = genFunc.randomInt( this.data.minX, this.data.maxX );
                        }
                        
                        // Calculate the travel time
                        this._time = Math.abs( this.sprite.pos.x - this._offsetX ) / pixel_per_sec_100;
                        this.easingX.init( this.sprite.pos.x, this._offsetX, this._time, easing.getSineInOut() );

                        // Force an initialization to start the movement on first time execution of this function
                        this.easingY.init( this.sprite.pos.y, this.sprite.pos.y, 0, easing.getSineInOut() );

                        // Only set the Y easing if not the same building position as we are now
                        if( Math.abs( this.sprite.pos.x - this._offsetX ) > 100 )
                        {
                            // Generate the Y range in which the enemy will travel
                            this._offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5 );

                            this.easingY.init( this.sprite.pos.y, this._offsetY, this._time, easing.getSineInOut() );
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
class AI_Enemy00_DesendToBuilding extends AI_Enemy00_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_ACTIVE;
        this.easingY.clear(easing.CLEAR_EASING_FUNC);
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
                this._offsetY = this.sprite.targetBuilding.pos.y + (this.sprite.targetBuilding.getSize().h / 2) + (this.sprite.getSize().h / 2) - 20;
                this._time = Math.abs(this.sprite.pos.y - this._offsetY) / pixel_per_sec_100;

                this.easingY.init( this.sprite.pos.y, this._offsetY, this._time, easing.getSineInOut() );
            }

            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            // Shoot at the player
            this.shootPlayer( aggrssive_shooter_time );

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;
                this.data.groupPlayer.play( 'enemy00_attack_building' );
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Destroy building
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy00_DestroyBuilding extends AI_Enemy00_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.shakeLevel = [[-1, 1, 0, 1, -1], [-2, 2, 0, 2, -2], [-3, 3, 0, 3, -3], [-4, 4, 0, 4, -4], [-5, 5, 0, 5, -5]];
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
        this.offset = this.shakeLevel[0];
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
            this.shootPlayer( destroy_building_shooter_time );

            // Shake a the enemy to simulate it attacking the building
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
                        this.offset = this.shakeLevel[1];
                    }
                    else if( this.shakeTimeout === 20 )
                    {
                        this.offset = this.shakeLevel[2];
                    }
                    else if( this.shakeTimeout === 10 )
                    {
                        this.offset = this.shakeLevel[3];
                    }
                    else if( this.shakeTimeout === 0 )
                    {
                        this.offset = this.shakeLevel[4];
                    }
                    else if( this.shakeTimeout === -10 )
                    {
                        this.sprite.targetBuilding.prepareScript( 'die' );
                        this.sprite.targetBuilding = null;

                        if( this.data.buildings.length === 1 )
                        {
                            this.state = defs.EAIS_FAILURE;
                        }
                        else
                        {
                            this.state = defs.EAIS_SUCCESS;
                        }
                    }
                }
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Enemy01 head (root) node base class script
//        Only supports one child
//
class AI_Enemy01_Head extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        this.state = defs.EAIS_INIT;
    }

    // 
    //  DESC: Recycle the script
    //
    recycle()
    {
        // Initialize the tree by doing a reset
        this.resetTree();
    }

    // 
    //  DESC: Execute the children
    //
    execute()
    {
        if( this.state === defs.EAIS_INIT )
        {
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
class AI_Enemy01_Desend extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingY = new easing.valueTo;
        this.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
    }

    // 
    //  DESC: Handle post load init this.easingY.init
    //
    init()
    {
        // Calculated to move in pixels per second
        this.easingY.init( this.sprite.pos.y, 0, (this.sprite.pos.y - 0) / pixel_per_sec_200, easing.getSineOut() );

        // Init the hit count
        this.sprite.hitCount = 0;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingY.clear();
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
            this.groupPlayer.play('enemy01_desend');
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;

                let gsnd = soundManager.getSound( '(level_1)', `enemy01_loop_sound` );
                scriptSingleton.prepare( scriptManager.get('SoundFade')( 0.7, 1000, gsnd, () => gsnd.play('enemy01_loop_sound', true), null ) );
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Desend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Enemy01_Go extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
        this.easingX = new easing.valueTo;
    }

    // 
    //  DESC: Handle post load init this.easingY.init
    //
    init()
    {
        // Calculated to move in pixels per second
        if(this.sprite.rot.y > 1)
            this.easingX.init( this.easingX.getValue(), -20, 2, easing.getLinear() );
        else
            this.easingX.init( this.easingX.getValue(), 20, 2, easing.getLinear() );
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
        this.easingX.clear();
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
            this.easingX.execute();
            this.sprite.incPosXYZ( this.easingX.getValue(), 0 );

            // Loop the player strategy and camera
            if( this.sprite.pos.x < -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST + 50) )
            {
                this.sprite.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );
            }
            else if( this.sprite.pos.x > (gameDefs.GAMEPLAY_LOOPING_WRAP_DIST - 20) )
            {
                this.sprite.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
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
    // Enemy00 AI functions
    scriptManager.set( 'AI_Enemy00_Head',
        ( nodeData ) => { return new AI_Enemy00_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy00_Desend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy00_Desend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy00_Roam',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy00_Roam( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy00_DesendToBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy00_DesendToBuilding( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy00_DestroyBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy00_DestroyBuilding( nodeData, headNode, sprite ); } );


    // Enemy01 AI functions
    scriptManager.set( 'AI_Enemy01_Head',
        ( nodeData ) => { return new AI_Enemy01_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy01_Desend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Desend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy01_Go',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Go( nodeData, headNode, sprite ); } );
}
