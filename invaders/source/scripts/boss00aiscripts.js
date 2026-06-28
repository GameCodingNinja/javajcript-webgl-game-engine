//
//  FILE NAME: boss00aiscripts.js
//  DESC:      scripts for the boss00 AI
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { aiNode } from '../../../library/node/ainode';
import { soundManager } from '../../../library/sound/soundmanager';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

// Shared AI data
var ai_data = {};

// 
//  DESC: Clear the AI data
//
export function clearAIData()
{
    ai_data = {};
}

//
//  DESC: AI Boss00 base class - shared helpers
//
class AI_Boss00_base extends aiNode
{
    constructor( nodeData )
    {
        super( nodeData );

        // Pre-allocated arrays for building selection (GC optimization)
        this._candAry = [];
    }

    // 
    //  DESC: Show/hide the boss health + hit bars (visible only while it can take damage)
    //
    setBarsVisible( visible )
    {
        if( this.sprite.healthBarCtrl )
            this.sprite.healthBarCtrl.setVisible( visible );
        if( this.sprite.hitBarCtrl )
            this.sprite.hitBarCtrl.setVisible( visible );
    }

    // 
    //  DESC: Wrap-aware distance between two world X positions
    //
    wrapDistX( x1, x2 )
    {
        this._wd = Math.abs( x1 - x2 );
        if( this._wd > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this._wd = (gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) - this._wd;

        return this._wd;
    }

    // 
    //  DESC: Wrap-aware shortest delta from the boss to a target world X
    //
    wrapDeltaX( targetX )
    {
        this._wrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
        this._deltaX = targetX - this.sprite.pos.x;

        if( this._deltaX > this._wrapSpan / 2 )
            this._deltaX -= this._wrapSpan;

        else if( this._deltaX < -this._wrapSpan / 2 )
            this._deltaX += this._wrapSpan;

        return this._deltaX;
    }

    // 
    //  DESC: Select a building that is not destroyed, not already targeted, and far
    //        from the player. Randomly pick among the farthest candidates.
    //        Returns the building sprite or null if none are available.
    //
    selectFarBuilding()
    {
        // Gather valid (not destroyed, not already targeted) candidates
        this._candAry.length = 0;
        for( this._i = 0; this._i < this.data.buildings.length; ++this._i )
        {
            this._building = this.data.buildings[this._i].get();

            // Skip destroyed buildings
            if( this._building.destroyed !== undefined )
                continue;

            // Skip buildings already targeted by another entity
            this._taken = false;
            for( this._j = 0; this._j < this.data.enemy.length; ++this._j )
            {
                if( this.data.enemy[this._j].get().targetBuilding === this._building )
                {
                    this._taken = true;
                    break;
                }
            }

            if( !this._taken )
                this._candAry.push( this._building );
        }

        if( this._candAry.length === 0 )
            return null;

        // Find the farthest candidate distance from the player
        this._playerX = this.data.playerShipSprite.pos.x;
        this._maxDist = 0;
        for( this._i = 0; this._i < this._candAry.length; ++this._i )
        {
            this._d = this.wrapDistX( this._candAry[this._i].pos.x, this._playerX );
            if( this._d > this._maxDist )
                this._maxDist = this._d;
        }

        // Collect the "far half" (>= half the max distance) by compacting in place
        this._farCount = 0;
        for( this._i = 0; this._i < this._candAry.length; ++this._i )
        {
            if( this.wrapDistX( this._candAry[this._i].pos.x, this._playerX ) >= this._maxDist * 0.5 )
            {
                this._candAry[this._farCount] = this._candAry[this._i];
                ++this._farCount;
            }
        }

        // Randomly pick one of the far candidates
        return this._candAry[ genFunc.randomInt( 0, this._farCount - 1 ) ];
    }
}

//
//  DESC: AI Boss00 head (root) node script. Only supports one child.
//
class AI_Boss00_Head extends aiNode
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
            this.data.playerShipStrategy = strategyManager.get('_player_ship_');
            this.data.buildings = strategyManager.get('_buildings_').nodeAry;
            this.data.enemy = strategyManager.get('_enemy_').nodeAry;
            this.data.playerShipSprite = this.data.playerShipStrategy.get('player_ship').get();
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
//  DESC: AI Leaf node. Descend directly onto a far building and start destroying.
//
class AI_Boss00_Descend extends AI_Boss00_base
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
    //  DESC: Handle post load init
    //
    init()
    {
        // Cache the boss progress bar controls and init the boss state
        this._healthNode = this.sprite.parentNode.findChild('UIBossHealthBar');
        this._hitNode = this.sprite.parentNode.findChild('UIBossHitBar');
        this.sprite.healthBarCtrl = this._healthNode ? this._healthNode.get() : null;
        this.sprite.hitBarCtrl = this._hitNode ? this._hitNode.get() : null;

        if( this.sprite.healthBarCtrl )
        {
            this.sprite.healthBarCtrl.setProgressBarMax( gameDefs.BOSS00_HEALTH_MAX );
            this.sprite.healthBarCtrl.setCurrentValue( gameDefs.BOSS00_HEALTH_MAX );
        }
        if( this.sprite.hitBarCtrl )
        {
            this.sprite.hitBarCtrl.setProgressBarMax( gameDefs.BOSS00_HIT_BAR_MAX );
            this.sprite.hitBarCtrl.setCurrentValue( gameDefs.BOSS00_HIT_BAR_MAX );
        }

        this.sprite.bossHealth = gameDefs.BOSS00_HEALTH_MAX;
        this.sprite.bossHitBar = gameDefs.BOSS00_HIT_BAR_MAX;
        this.sprite.vulnerable = false;
        this.sprite.interrupted = false;
        this.sprite.targetBuilding = null;

        // Not hittable while descending - hide the bars
        this.sprite.collisionComponent.enable = false;
        this.setBarsVisible( false );

        // Select a far building and descend directly onto it
        this.sprite.targetBuilding = this.selectFarBuilding();
        if( this.sprite.targetBuilding !== null )
            this.sprite.setPosXYZ( this.sprite.targetBuilding.pos.x, this.sprite.pos.y );

        // Ease the boss down to its attack height over the building
        this._time = Math.abs( this.sprite.pos.y - gameDefs.BOSS00_RESTING_Y ) / gameDefs.BOSS00_DESCEND_PIXELS_PER_SEC;
        this.easingY.init( this.sprite.pos.y, gameDefs.BOSS00_RESTING_Y, this._time, easing.getSineOut() );
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
    //  DESC: Handle the descend
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.init();
            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.easingY.execute();
            this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

            if( this.easingY.isFinished() )
            {
                // Arrived over the building - now hittable, show the bars
                this.sprite.collisionComponent.enable = true;
                this.sprite.vulnerable = true;
                this.setBarsVisible( true );
                this.state = defs.EAIS_SUCCESS;
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node. Pick a far building and fast-move to it.
//
class AI_Boss00_PickAndMoveToBuilding extends AI_Boss00_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.easingX = new easing.valueTo;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_ACTIVE;
        this.selected = false;
        this.easingX.clear( easing.CLEAR_EASING_FUNC );
    }

    // 
    //  DESC: Handle the building selection and fast move
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            if( !this.selected )
            {
                this.sprite.targetBuilding = this.selectFarBuilding();

                // No building available - idle in place until one is (game over handled elsewhere)
                if( this.sprite.targetBuilding === null )
                    return this.state;

                // Traveling - not vulnerable to shots (but still collides with player); hide the bars
                this.sprite.vulnerable = false;
                this.sprite.interrupted = false;
                this.setBarsVisible( false );

                // Fast move to the target building (wrap-aware shortest path)
                // TODO (Phase 4/playtest): bias the initial direction toward the player.
                this._deltaX = this.wrapDeltaX( this.sprite.targetBuilding.pos.x );
                this._targetX = this.sprite.pos.x + this._deltaX;
                this._time = Math.abs( this._deltaX ) / gameDefs.BOSS00_MOVE_PIXELS_PER_SEC;
                this.easingX.init( this.sprite.pos.x, this._targetX, this._time, easing.getSineInOut() );

                this.selected = true;
            }
            else
            {
                this.easingX.execute();
                this.sprite.setPosXYZ( this.easingX.getValue(), this.sprite.pos.y );

                // Wrap the sprite position when crossing the map boundary
                if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                    this.sprite.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );

                else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
                    this.sprite.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );

                if( this.easingX.isFinished() )
                {
                    // Arrived - refill the hit bar, become hittable again, show the bars
                    this.sprite.bossHitBar = gameDefs.BOSS00_HIT_BAR_MAX;
                    if( this.sprite.hitBarCtrl )
                        this.sprite.hitBarCtrl.setCurrentValue( gameDefs.BOSS00_HIT_BAR_MAX );
                    this.sprite.vulnerable = true;
                    this.setBarsVisible( true );
                    this.state = defs.EAIS_SUCCESS;
                }
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node. Destroy the target building with the beam (5 seconds),
//        unless the player interrupts by depleting the hit bar.
//
class AI_Boss00_DestroyBuilding extends AI_Boss00_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.beamEasing = new easing.valueTo;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_ACTIVE;
        this.started = false;
        this.phase = 'destroying';
        this.beamEasing.clear( easing.CLEAR_EASING_FUNC );
    }

    // 
    //  DESC: Show the beam and start it widening to full width
    //
    showBeam()
    {
        this._beam = this.sprite.parentNode.findChild('boss00_beam');
        this.beamSprite = this._beam ? this._beam.get() : null;

        if( this.beamSprite )
        {
            this._wideScale = gameDefs.BOSS00_BEAM_WIDTH / this.beamSprite.objData.size.w;
            this.beamSprite.setScaleXYZ( 1, 1 );
            this.beamSprite.setVisible( true );
            this.beamEasing.init( 1, this._wideScale, gameDefs.BOSS00_BEAM_GROW_SEC, easing.getSineOut() );
        }
    }

    // 
    //  DESC: Start the beam narrowing back to thin (retract)
    //
    startBeamRetract()
    {
        if( this.beamSprite )
            this.beamEasing.init( this.beamSprite.scale.x, 1, gameDefs.BOSS00_BEAM_RETRACT_SEC, easing.getSineIn() );
    }

    // 
    //  DESC: Hide the beam and reset it to thin
    //
    hideBeam()
    {
        if( this.beamSprite )
        {
            this.beamSprite.setVisible( false );
            this.beamSprite.setScaleXYZ( 1, 1 );
        }
    }

    // 
    //  DESC: Shake the target building, progressively faster as the attack progresses
    //
    shakeBuilding()
    {
        // Wait for the initial delay (while the beam forms) before shaking
        this._shakeWindow = gameDefs.BOSS00_DESTROY_TIME - gameDefs.BOSS00_SHAKE_DELAY;
        if( this.destroyTime > this._shakeWindow )
            return;

        this._progress = (this._shakeWindow - this.destroyTime) / this._shakeWindow;

        this.shakeTime -= highResTimer.elapsedTime;
        if( this.shakeTime <= 0 )
        {
            this._interval = gameDefs.BOSS00_SHAKE_INTERVAL_START +
                (gameDefs.BOSS00_SHAKE_INTERVAL_END - gameDefs.BOSS00_SHAKE_INTERVAL_START) * this._progress;
            this.shakeTime = this._interval;

            this._amp = Math.round( gameDefs.BOSS00_SHAKE_AMP_START +
                (gameDefs.BOSS00_SHAKE_AMP_END - gameDefs.BOSS00_SHAKE_AMP_START) * this._progress );

            // Only jitter downward - the building has no graphical height below it, so it
            // can't rise above its resting Y without exposing an empty gap.
            this.sprite.targetBuilding.setPosXYZ(
                this.sprite.buildingBaseX + genFunc.randomInt( -this._amp, this._amp ),
                this.sprite.buildingBaseY + genFunc.randomInt( -this._amp, 0 ) );
        }
    }

    // 
    //  DESC: Restore the target building to its resting position
    //
    restoreBuilding()
    {
        if( this.sprite.targetBuilding !== null )
            this.sprite.targetBuilding.setPosXYZ( this.sprite.buildingBaseX, this.sprite.buildingBaseY );
    }

    // 
    //  DESC: Handle the destroy/interrupt sequence
    //
    evaluate()
    {
        if( this.state === defs.EAIS_ACTIVE )
        {
            // First iteration - start the destroy timer, show the beam, cache the building's rest position
            if( !this.started )
            {
                this.started = true;
                this.destroyTime = gameDefs.BOSS00_DESTROY_TIME;
                this.shakeTime = 0;
                // Cached on the sprite so the death script can restore a building caught mid-attack
                this.sprite.buildingBaseX = this.sprite.targetBuilding.pos.x;
                this.sprite.buildingBaseY = this.sprite.targetBuilding.pos.y;
                this.showBeam();
            }

            if( this.phase === 'destroying' )
            {
                // Player interrupted the attack (hit bar depleted - flag set by the collision handler)
                if( this.sprite.interrupted )
                {
                    // Building saved - stop shaking it, retract the beam, then pause so the player sees the change
                    this.restoreBuilding();
                    this.startBeamRetract();
                    this.pauseTime = gameDefs.BOSS00_INTERRUPT_PAUSE;
                    this.phase = 'interrupted';
                }
                // Widen the beam to full width first. The destroy duration does not begin
                // until the beam has finished expanding.
                else if( this.beamSprite && !this.beamEasing.isFinished() )
                {
                    this.beamEasing.execute();
                    this.beamSprite.setScaleXYZ( this.beamEasing.getValue(), 1 );
                }
                else
                {
                    // Beam fully expanded - run the destroy countdown (shake starts after the delay)
                    this.shakeBuilding();

                    this.destroyTime -= highResTimer.elapsedTime;
                    if( this.destroyTime <= 0 )
                    {
                        // Destroy the building (reuses the standard building death animation)
                        this.restoreBuilding();
                        if( this.sprite.targetBuilding !== null )
                            this.sprite.targetBuilding.prepareScript( 'die' );

                        this.sprite.vulnerable = false;
                        this.startBeamRetract();
                        this.phase = 'retracting';
                    }
                }
            }
            else if( this.phase === 'retracting' )
            {
                // Beam narrows and disappears as the building falls
                this.beamEasing.execute();
                if( this.beamSprite )
                    this.beamSprite.setScaleXYZ( this.beamEasing.getValue(), 1 );

                if( this.beamEasing.isFinished() )
                {
                    this.hideBeam();
                    this.sprite.targetBuilding = null;
                    this.state = defs.EAIS_SUCCESS;
                }
            }
            else // 'interrupted'
            {
                // Retract the beam while waiting out the interrupt pause
                if( this.beamSprite && !this.beamEasing.isFinished() )
                {
                    this.beamEasing.execute();
                    this.beamSprite.setScaleXYZ( this.beamEasing.getValue(), 1 );
                }

                this.pauseTime -= highResTimer.elapsedTime;
                if( this.pauseTime <= 0 )
                {
                    this.hideBeam();
                    this.sprite.targetBuilding = null;
                    this.sprite.interrupted = false;
                    this.state = defs.EAIS_SUCCESS;
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
    scriptManager.set( 'AI_Boss00_Head',
        ( nodeData ) => { return new AI_Boss00_Head( nodeData ); } );

    scriptManager.set( 'AI_Boss00_Descend',
        ( nodeData, headNode, sprite ) => { return new AI_Boss00_Descend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Boss00_PickAndMoveToBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Boss00_PickAndMoveToBuilding( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Boss00_DestroyBuilding',
        ( nodeData, headNode, sprite ) => { return new AI_Boss00_DestroyBuilding( nodeData, headNode, sprite ); } );
}
