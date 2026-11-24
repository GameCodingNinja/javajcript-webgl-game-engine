//
//  FILE NAME: wreck00aiscripts.js
//  DESC:      scripts for AI
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { settings } from '../../../library/utilities/settings';
import { aiNode } from '../../../library/node/ainode';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';
import { gAIData, initAIData } from './aidata';

// Easing functions, made once: each easing.getX() call creates a new function
var gSineInOut = easing.getSineInOut();
var gSineOut = easing.getSineOut();

// Building lock cap shared by every wreck00: once WRECK00_MAX_LOCKS are locked (gCapReached), no new lock until all of
// them have cleared (shot down or building destroyed), then for WRECK00_LOCK_COOLDOWN more (gLockCooldown, ms). Both are
// updated once a frame by the first wreck00 head to run (frame token gLockFrame).
var gCapReached = false;
var gLockCooldown = 0;
var gLockFrame = -1;

// 
//  DESC: Clear the building lock cap and cooldown (Level1State restartGame() and cleanUp())
//
export function clearLockCooldown()
{
    gCapReached = false;
    gLockCooldown = 0;
}

// 
//  DESC: Number of living wreck00 with a building locked (heading to it, descending on it or shaking it)
//
function countLocks()
{
    let count = 0;
    for( let i = 0; i < gAIData.enemy.length; ++i )
    {
        if( gAIData.enemy[i].userId === gameDefs.WRECK00_SHIP_ID && gAIData.enemy[i].get().collisionComponent.enable &&
            gAIData.enemy[i].get().targetBuilding )
            count++;
    }

    return count;
}

// 
//  DESC: Can a wreck00 lock onto a building? Not while the cap is reached or during the cooldown after it cleared
//
function canLock()
{
    return !gCapReached && (gLockCooldown <= 0) && (countLocks() < gameDefs.WRECK00_MAX_LOCKS);
}

// Shapes of a roam leg's path (AI_Wreck00_Roam.pickPathShape())
const WRECK00_PATH_STRAIGHT = 0,
      WRECK00_PATH_DIP = 1,
      WRECK00_PATH_CLIMB = 2,
      WRECK00_PATH_S = 3;


//
//  DESC: AI Wreck00 base class
//
class AI_Wreck00_base extends aiNode
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
        if( this.data.playerShipSprite.collisionComponent.enable)
        {
            this.sprite.shootTime -= highResTimer.elapsedTime;

            if( this.sprite.shootTime < 0 )
            {
                if( this.data.camera.inViewWrapped( this.sprite.transPos, this.sprite.parentNode.radius, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 ) )
                {
                    // Should we skip a shot?
                    if( genFunc.randomInt( 0, 10 ) > 3 )
                    {
                        this._shootSprite = this.data.enemyShotStrategy.create('wreck00_shot').get();
                        this._shootSprite.scriptComponent.prepare( 'shoot', this._shootSprite, this.sprite );

                        this.data.groupPlayer.play( 'wreck00_gun' );
                    }

                    this.sprite.shootTime = highResTimer.elapsedTime + shootTime;
                }
            }
        }
    }

}

//
//  DESC: AI Wreck00 head (root) node base class script
//        Only supports one child
//
class AI_Wreck00_Head extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        this.data = gAIData;
        this.state = defs.EAIS_INIT;
    }
    
    // 
    //  DESC: Handle post load init
    //
    init()
    {
        initAIData();
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

        // Shared building lock cap, once a frame: when all the capped locks have cleared, start the cooldown
        if( gLockFrame !== highResTimer.lastTime )
        {
            gLockFrame = highResTimer.lastTime;
            if( gCapReached )
            {
                if( countLocks() === 0 )
                {
                    gCapReached = false;
                    gLockCooldown = gameDefs.WRECK00_LOCK_COOLDOWN;
                }
            }
            else if( gLockCooldown > 0 )
            {
                gLockCooldown -= highResTimer.elapsedTime;
            }
        }

        // Returning SUCCESS or FAILURE terminates the execution of this behavioral tree
        if( this.nodeAry[0].evaluate() != defs.EAIS_ACTIVE )
            return true;

        return false;
    }
}

//
//  DESC: AI Leaf (task) node script. Descend into the game
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Wreck00_Descend extends AI_Wreck00_base
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
        this.sprite.shoot_player_time = gameDefs.passive_shooter_time;
        this.sprite.targetBuilding = null;
        this.sprite.shakingBuilding = false;
        this.sprite.hitCount = 0;
        this.sprite.ramTime = 0;   // Time of the last ram on the player (Level1State WRECK00_RAM_COOLDOWN)
        this.sprite.shootTime = genFunc.randomInt( 0, 5000 );
        this.sprite.setPosXYZ( genFunc.randomInt( this.data.minX, this.data.maxX ), settings.deviceRes_half.h + this.sprite.parentNode.radius + genFunc.randomInt( 0, 200 ) );
        this.sprite.setFrame(0);
        this._offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5);

        // Calculated to move in pixels per second
        this.easingY.init( this.sprite.pos.y, this._offsetY, Math.abs(this.sprite.pos.y - this._offsetY) / gameDefs.pixel_per_sec_100, gSineOut );
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
    //  DESC: Handle the Descend
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
                this.shootPlayer( this.sprite.shoot_player_time );

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
class AI_Wreck00_Roam extends AI_Wreck00_base
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

        // Hover bob, eased in from 0 so it doesn't jump
        this.hoverTime = genFunc.randomInt( 0, gameDefs.WRECK00_HOVER_PERIOD );
        this.hoverRamp = 0;
        this.hoverOffset = 0;

        // Path shape of the current leg and the settle back after an overshoot
        this.pathShape = WRECK00_PATH_STRAIGHT;
        this.pathAmp = 0;
        this.settleDX = 0;
    }

    // 
    //  DESC: Start a leg of the roam to an X (unwrapped, from the shortest path), at a random speed (a multiple of
    //        pixel_per_sec_100 between speedMin and speedMax: slow drifts to faster moves), and to a random Y when
    //        it's going somewhere. Sometimes (WRECK00_OVERSHOOT_CHANCE) it glides a bit past the X and settles back,
    //        like a heavy ship, and each leg's path takes a random shape (pickPathShape()).
    //
    startLeg( targetX, speedMin, speedMax )
    {
        this._deltaX = targetX - this.sprite.pos.x;
        this._time = Math.abs( this._deltaX ) / (gameDefs.pixel_per_sec_100 * (speedMin + (Math.random() * (speedMax - speedMin))));

        this.settleDX = 0;
        if( Math.abs( this._deltaX ) > gameDefs.WRECK00_OVERSHOOT_MIN_LEG && Math.random() < gameDefs.WRECK00_OVERSHOOT_CHANCE )
            this.settleDX = -Math.sign( this._deltaX ) * genFunc.randomInt( gameDefs.WRECK00_OVERSHOOT_MIN, gameDefs.WRECK00_OVERSHOOT_MAX );

        this.easingX.init( this.sprite.pos.x, targetX - this.settleDX, this._time, gSineInOut );

        // Force an initialization to start the movement on first time execution of this function
        this.easingY.init( this._baseY, this._baseY, 0, gSineInOut );
        this.pathShape = WRECK00_PATH_STRAIGHT;

        // Only set the Y easing if not the same building position as we are now
        if( Math.abs( this._deltaX ) > 100 )
        {
            // Generate the Y range in which the enemy will travel
            this._offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5 );
            this.easingY.init( this._baseY, this._offsetY, this._time, gSineInOut );
            this.pickPathShape( this._baseY, this._offsetY );
        }
    }

    // 
    //  DESC: Pick the shape of a leg's path at random: straight, a dip (sags down and back up), a climb (arcs up and
    //        back down) or an S curve (up then down), by WRECK00_PATH_AMP_MIN/MAX, less where it would leave
    //        WRECK00_PATH_MIN_Y/MAX_Y (above the buildings, below the HUD strip)
    //
    pickPathShape( startY, endY )
    {
        this.pathShape = genFunc.randomInt( WRECK00_PATH_STRAIGHT, WRECK00_PATH_S );
        this.pathAmp = genFunc.randomInt( gameDefs.WRECK00_PATH_AMP_MIN, gameDefs.WRECK00_PATH_AMP_MAX );

        this._roomDown = Math.min( startY, endY ) - gameDefs.WRECK00_PATH_MIN_Y;
        this._roomUp = gameDefs.WRECK00_PATH_MAX_Y - Math.max( startY, endY );
        if( this.pathShape === WRECK00_PATH_DIP )
            this.pathAmp = Math.min( this.pathAmp, this._roomDown );
        else if( this.pathShape === WRECK00_PATH_CLIMB )
            this.pathAmp = Math.min( this.pathAmp, this._roomUp );
        else if( this.pathShape === WRECK00_PATH_S )
            this.pathAmp = Math.min( this.pathAmp, this._roomDown, this._roomUp );

        // Not enough room for it: straight
        if( this.pathAmp < gameDefs.WRECK00_PATH_AMP_MIN / 2 )
            this.pathShape = WRECK00_PATH_STRAIGHT;
    }

    // 
    //  DESC: Y offset of the leg's path shape (added to the eased Y), 0 at both ends of the leg
    //
    pathOffset()
    {
        if( this.pathShape === WRECK00_PATH_STRAIGHT || this.easingX.totalTime <= 0 )
            return 0;

        this._t = Math.min( 1, this.easingX.time / this.easingX.totalTime );
        if( this.pathShape === WRECK00_PATH_DIP )
            return -Math.sin( this._t * Math.PI ) * this.pathAmp;
        else if( this.pathShape === WRECK00_PATH_CLIMB )
            return Math.sin( this._t * Math.PI ) * this.pathAmp;

        return Math.sin( this._t * Math.PI * 2 ) * this.pathAmp;
    }

    // 
    //  DESC: Hover bob offset (added to the eased Y)
    //
    hover()
    {
        this.hoverTime += highResTimer.elapsedTime;
        this.hoverRamp = Math.min( 1, this.hoverRamp + (highResTimer.elapsedTime / gameDefs.WRECK00_HOVER_RAMP) );
        this.hoverOffset = Math.sin( this.hoverTime * (Math.PI * 2) / gameDefs.WRECK00_HOVER_PERIOD ) * gameDefs.WRECK00_HOVER_AMP * this.hoverRamp;

        return this.hoverOffset;
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
                this.sprite.setPosXYZ( this.easingX.getValue(), this.easingY.getValue() + this.hover() + this.pathOffset() );

                // Wrap the sprite position when crossing the map boundary
                if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                    this.sprite.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

                else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                    this.sprite.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
            }

            // Shoot at the player
            this.shootPlayer( this.sprite.shoot_player_time );

            if( this.easingX.isFinished() && this.easingY.isFinished() )
            {
                // Start the next move from the Y without the hover bob, so the bob carries on smoothly (the path
                // shape is 0 at the end of a leg)
                this._baseY = this.sprite.pos.y - this.hoverOffset;

                // Overshot the end of the leg: settle back to it
                if( this.settleDX !== 0 )
                {
                    this.easingX.init( this.sprite.pos.x, this.sprite.pos.x + this.settleDX, gameDefs.WRECK00_SETTLE_TIME, gSineInOut );
                    this.easingY.init( this._baseY, this._baseY, 0, gSineInOut );
                    this.pathShape = WRECK00_PATH_STRAIGHT;
                    this.settleDX = 0;
                }
                else if( this.sprite.targetBuilding === null )
                {
                    // Randmoly pick a building to target
                    this._index = genFunc.randomInt( 0, this.data.buildings.length-1 );
                    this._targetBuilding = this.data.buildings[this._index].get();

                    // Find a building that's not already targeted
                    this._freeBuildingFound = true;
                    for( let i = 0; i < this.data.enemy.length; ++i )
                    {
                        if( this.data.enemy[i].get().targetBuilding === this._targetBuilding )
                        {
                            this._freeBuildingFound = false;
                            break;
                        }
                    }

                    if( (this._targetBuilding.destroyed === undefined) && this._freeBuildingFound )
                    {
                        // Should we target lock on a building? Capped, so a crowd of wreck00 doesn't attack the
                        // buildings all at once
                        if( canLock() && (Math.random() < gameDefs.WRECK00_LOCK_CHANCE) )
                        {
                            // Set the target building
                            this.sprite.targetBuilding = this._targetBuilding;

                            // Reached the cap: no more locks until they've all cleared, then the cooldown
                            if( countLocks() >= gameDefs.WRECK00_MAX_LOCKS )
                                gCapReached = true;

                            // Use shortest path considering map wrapping
                            this._deltaX = genFunc.wrapDelta( this.sprite.targetBuilding.pos.x - this.sprite.pos.x, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );
                            this.startLeg( this.sprite.pos.x + this._deltaX, gameDefs.WRECK00_LOCK_SPEED_MIN, gameDefs.WRECK00_LOCK_SPEED_MAX );
                        }
                    }

                    // If a building is not targeted, go after the player unless their is more enemies then buildings
                    if( this.sprite.targetBuilding === null )
                    {
                        this._offsetX = this.data.playerShipSprite.pos.x;

                        if( this.data.buildings.length >= this.data.enemy.length )
                        {
                            this._offsetX = genFunc.randomInt( this.data.minX, this.data.maxX );
                        }
                        else
                        {
                            // Use shortest path considering map wrapping
                            this._deltaX = genFunc.wrapDelta( this._offsetX - this.sprite.pos.x, gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

                            this._offsetX = this.sprite.pos.x + this._deltaX;
                        }
                        
                        this.startLeg( this._offsetX, gameDefs.WRECK00_LEG_SPEED_MIN, gameDefs.WRECK00_LEG_SPEED_MAX );
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
class AI_Wreck00_DescendToBuilding extends AI_Wreck00_base
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
    //  DESC: Handle the Descend onto the target
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            // First interation, init the easing
            if( !this.easingY.isInitialized() )
            {
                this._offsetY = this.sprite.targetBuilding.pos.y + (this.sprite.targetBuilding.getSize().h / 2) + (this.sprite.getSize().h / 2) - 20;
                this._time = Math.abs(this.sprite.pos.y - this._offsetY) / gameDefs.pixel_per_sec_100;

                this.easingY.init( this.sprite.pos.y, this._offsetY, this._time, gSineInOut );
            }

            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            // Shoot at the player
            this.sprite.shoot_player_time = gameDefs.aggressive_shooter_time;
            this.shootPlayer( this.sprite.shoot_player_time );

            if( this.easingY.isFinished() )
            {
                this.state = defs.EAIS_SUCCESS;
                this.data.groupPlayer.play( 'wreck00_attack_building' );
                this.sprite.setFrame(1);
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf (task) node script. Destroy building
//        The last node on the branch. Implements game specific tests or actions.
//
class AI_Wreck00_DestroyBuilding extends AI_Wreck00_base
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
    //  DESC: Handle the Descend onto the target
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            this.shakeTime -= highResTimer.elapsedTime;

            // Shoot at the player
            this.shootPlayer( gameDefs.destroy_building_shooter_time );

            // Cache the building's resting position before shaking it. Cached on the sprite
            // so the death script can restore a building caught mid-attack.
            if( !this.sprite.shakingBuilding )
            {
                this.sprite.shakingBuilding = true;
                this.sprite.buildingBaseX = this.sprite.targetBuilding.pos.x;
                this.sprite.buildingBaseY = this.sprite.targetBuilding.pos.y;
            }

            // Shake a the enemy to simulate it attacking the building
            if( this.shakeTime < 0 )
            {
                this.shakeTime = highResTimer.elapsedTime + this.shakeTimeout;
                this.sprite.incPosXYZ( this.offset[this.indexX], this.offset[this.indexY] );

                // Shake the building with it, at the enemy's current shake level. Only jitter downward - the
                // building has no graphical height below it, so it can't rise above its resting Y.
                this._amp = this.offset[1];
                this.sprite.targetBuilding.setPosXYZ(
                    this.sprite.buildingBaseX + genFunc.randomInt( -this._amp, this._amp ),
                    this.sprite.buildingBaseY + genFunc.randomInt( -this._amp, 0 ) );
                this.indexX = (this.indexX + 1) % this.offset.length;
                this.indexY = (this.indexY + 1) % this.offset.length;

                if( this.indexX == 0 )
                {
                    this.shakeTimeout--;
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
                        this.sprite.targetBuilding.setPosXYZ( this.sprite.buildingBaseX, this.sprite.buildingBaseY );
                        this.sprite.shakingBuilding = false;
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
//  DESC: Load scripts
//
export function loadScripts()
{
    // Wreck00 AI functions
    scriptManager.set( 'AI_Wreck00_Head',
        ( nodeData ) => { return new AI_Wreck00_Head( nodeData ); } );

    scriptManager.set( 'AI_Wreck00_Descend',
        ( nodeData, headNode, sprite ) => { return new AI_Wreck00_Descend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Wreck00_Roam',
        ( nodeData, headNode, sprite ) => { return new AI_Wreck00_Roam( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Wreck00_DescendToBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Wreck00_DescendToBuilding( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Wreck00_DestroyBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Wreck00_DestroyBuilding( nodeData, headNode, sprite ); } );
}
