//
//  FILE NAME: enemy01aiscripts.js
//  DESC:      scripts for the enemy01 AI
//             A harasser that ignores the buildings. It roams around away from the player for a while,
//             then charges in, stops to do a spin attack (flings a ring of homing missiles) and runs off.
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { settings } from '../../../library/utilities/settings';
import { aiNode } from '../../../library/node/ainode';
import { soundManager } from '../../../library/sound/soundmanager';
import * as genFunc from '../../../library/utilities/genfunc';
import * as defs from '../../../library/common/defs';
import * as easing from '../../../library/utilities/easingfunc';
import * as gameDefs from '../state/gamedefs';

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
var gDegToRad = Math.PI / 180;
var gTwoPi = Math.PI * 2;

// Turn rates converted from degrees/sec to radians/ms
var gRoamTurnRate = gameDefs.ENEMY01_ROAM_TURN_RATE * gDegToRad / 1000;
var gAvoidTurnRate = gameDefs.ENEMY01_AVOID_TURN_RATE * gDegToRad / 1000;
var gLoopTurnRate = gameDefs.ENEMY01_LOOP_TURN_RATE * gDegToRad / 1000;

// Weave: wave amplitudes in radians, phase rate in radians/ms
var gWaveAmp = gameDefs.ENEMY01_WAVE_AMP * gDegToRad;
var gAvoidWaveAmp = gameDefs.ENEMY01_AVOID_WAVE_AMP * gDegToRad;
var gWaveRate = gTwoPi / gameDefs.ENEMY01_WAVE_PERIOD;
var gChargeTurnRate = gameDefs.ENEMY01_CHARGE_TURN_RATE * gDegToRad / 1000;
var gFleeTurnRate = gameDefs.ENEMY01_FLEE_TURN_RATE * gDegToRad / 1000;

// Full spin speed and the slowest firing spin speed in radians/ms, and how much it speeds up or slows down each ms
var gSpinRate = gameDefs.ENEMY01_SPIN_RATE * gTwoPi / 1000;
var gSpinRateMin = gameDefs.ENEMY01_SPIN_RATE_MIN * gTwoPi / 1000;
var gSpinAccel = gSpinRate / (gameDefs.ENEMY01_SPIN_UP_SEC * 1000);

// Flee dodge: angle in radians, turn rate in radians/ms
var gDodgeAngle = gameDefs.ENEMY01_DODGE_ANGLE * gDegToRad;
var gDodgeTurnRate = gameDefs.ENEMY01_DODGE_TURN_RATE * gDegToRad / 1000;

// Easing functions allocated once (the get functions create a new closure on every call)
var gSineOut = easing.getSineOut();

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
//  DESC: Keep an angle in the -PI..PI range
//
function normalizeAngle( angle )
{
    if( angle > Math.PI )
        return angle - gTwoPi;
    else if( angle < -Math.PI )
        return angle + gTwoPi;

    return angle;
}

//
//  DESC: AI Enemy01 base class - shared helpers
//        It flies forward along its heading (sprite.heading, radians) at its speed (sprite.speed, px/s).
//        Both live on the sprite so the speed carries smoothly from one leaf to the next.
//
class AI_Enemy01_base extends aiNode
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData );

        this.data = headNode.data;
        this.sprite = sprite;
        this.state = defs.EAIS_INIT;
    }

    // 
    //  DESC: Reset the node
    //
    reset()
    {
        this.state = defs.EAIS_INIT;
    }

    // 
    //  DESC: Wrap-aware X delta from this enemy to the player
    //
    shipDeltaX()
    {
        return genFunc.wrapDelta( this.data.playerShipSprite.pos.x - this.sprite.pos.x, gWrapSpan );
    }

    // 
    //  DESC: Turn the heading toward an angle, limited by a turn rate (radians/ms)
    //
    faceAngle( angle, turnRate )
    {
        this._turn = normalizeAngle( angle - this.sprite.heading );
        this._maxTurn = turnRate * highResTimer.elapsedTime;

        if( this._turn > this._maxTurn )
            this._turn = this._maxTurn;
        else if( this._turn < -this._maxTurn )
            this._turn = -this._maxTurn;

        this.sprite.heading = normalizeAngle( this.sprite.heading + this._turn );
    }

    // 
    //  DESC: Change the speed toward a target speed by up to accel (px/s/s)
    //
    approachSpeed( target, accel )
    {
        this._dv = accel * highResTimer.elapsedTime / 1000;

        if( this.sprite.speed < target )
            this.sprite.speed = Math.min( this.sprite.speed + this._dv, target );
        else
            this.sprite.speed = Math.max( this.sprite.speed - this._dv, target );
    }

    // 
    //  DESC: Fly forward along the heading, wrap at the map boundary, and stay above the ground and
    //        fully below the HUD strip at the top of the screen (the cruise band is kept by the steering, bandAngle())
    //
    moveForward()
    {
        this._step = this.sprite.speed * highResTimer.elapsedTime / 1000;
        this.sprite.incPosXYZ( Math.cos( this.sprite.heading ) * this._step, Math.sin( this.sprite.heading ) * this._step );

        if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this.sprite.incPosXYZ( gWrapSpan );
        else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this.sprite.incPosXYZ( -gWrapSpan );

        this._topY = gameDefs.ENEMY01_VIEW_TOP - this.sprite.parentNode.radius;
        this._bottomY = -(settings.deviceRes_half.h - this.sprite.parentNode.radius);
        if( this.sprite.pos.y > this._topY )
            this.sprite.setPosXYZ( this.sprite.pos.x, this._topY );
        else if( this.sprite.pos.y < this._bottomY )
            this.sprite.setPosXYZ( this.sprite.pos.x, this._bottomY );
    }

    // 
    //  DESC: Adjust a wanted heading to keep the cruise band (above the buildings, below the top of the
    //        screen): when it would leave the band within ENEMY01_BAND_LOOKAHEAD at its current
    //        heading and speed, and isn't already heading back, it climbs or dives back in. Looking
    //        ahead turns it early enough that a fast swoop doesn't overshoot far. Turning at the normal
    //        rate makes it a swoop: it can dip into the building area, but doesn't stay there.
    //
    bandAngle( angle )
    {
        this._lookY = this.sprite.pos.y + (Math.sin( this.sprite.heading ) * this.sprite.speed * gameDefs.ENEMY01_BAND_LOOKAHEAD);

        if( this._lookY < gameDefs.ENEMY01_MIN_Y && Math.sin( angle ) < 0.5 )
            return Math.atan2( 0.6, (Math.cos( angle ) < 0) ? -1 : 1 );

        if( this._lookY > gameDefs.ENEMY01_MAX_Y && Math.sin( angle ) > -0.5 )
            return Math.atan2( -0.6, (Math.cos( angle ) < 0) ? -1 : 1 );

        return angle;
    }

    // 
    //  DESC: Add a wave to a wanted heading so it weaves instead of flying straight.
    //        Call once a frame (it advances the wave).
    //
    weave( angle, amp )
    {
        this.sprite.wavePhase += highResTimer.elapsedTime * gWaveRate;
        if( this.sprite.wavePhase > gTwoPi )
            this.sprite.wavePhase -= gTwoPi;

        return angle + (amp * Math.sin( this.sprite.wavePhase ));
    }

    // 
    //  DESC: Point the nose (the art points right) along the heading plus the spin (sprite.spinAngle)
    //
    applyRot()
    {
        this.sprite.setRotXYZ( 0, 0, this.sprite.heading + this.sprite.spinAngle, false );
    }

    // 
    //  DESC: Speed the spin up or down to the speed for its spin hit count, and advance it
    //
    spinStep()
    {
        // Each shot that hits the spin slows it a step (one missile fewer per volley), from the full spin speed
        // down to ENEMY01_SPIN_RATE_MIN at one missile. The last one stops it (AI_Enemy01_Flee).
        this._missiles = gameDefs.ENEMY01_MISSILES_MAX - this.sprite.spinHitCount;
        if( this._missiles > 0 )
            this._spinTarget = gSpinRateMin + ((gSpinRate - gSpinRateMin) * (this._missiles - 1) / (gameDefs.ENEMY01_MISSILES_MAX - 1));
        else
            this._spinTarget = 0;
        if( this.sprite.spinRate < this._spinTarget )
            this.sprite.spinRate = Math.min( this.sprite.spinRate + (gSpinAccel * highResTimer.elapsedTime), this._spinTarget );
        else
            this.sprite.spinRate = Math.max( this.sprite.spinRate - (gSpinAccel * highResTimer.elapsedTime), this._spinTarget );

        this.sprite.spinAngle += this.sprite.spinRate * highResTimer.elapsedTime;
        if( this.sprite.spinAngle > gTwoPi )
            this.sprite.spinAngle -= gTwoPi;
    }

    // 
    //  DESC: Fling a volley of missiles out at the same time, evenly spaced around the enemy, starting at
    //        its spin angle. The faster the spin, the more missiles: ENEMY01_MISSILES_MAX at full spin,
    //        one fewer for each shot that hit the spin. Not spinning (the spin was stopped), one missile at the player.
    //
    fireMissiles()
    {
        if( this.data.playerShipSprite.collisionComponent.enable && this.inView() )
        {
            if( this.sprite.spinning )
            {
                this._count = gameDefs.ENEMY01_MISSILES_MAX - this.sprite.spinHitCount;
                this._angle = this.sprite.heading + this.sprite.spinAngle;
            }
            else
            {
                this._count = 1;
                this._angle = Math.atan2( this.data.playerShipSprite.pos.y - this.sprite.pos.y, this.shipDeltaX() );
            }

            this._step = gTwoPi / this._count;

            for( this._i = 0; this._i < this._count; ++this._i )
            {
                this._shootSprite = this.data.enemyShotStrategy.create('enemy01_shot').get();
                this._shootSprite.scriptComponent.prepare( 'shoot', this._shootSprite, this.sprite, this._angle + (this._i * this._step) );
            }

            this.data.groupPlayer.play( 'boss_rocket_launch' );
        }
    }

    // 
    //  DESC: Is this enemy in view?
    //
    inView()
    {
        return this.data.playerCamera.inViewWrapped( this.sprite.transPos, this.sprite.parentNode.radius, gWrapSpan );
    }
}

//
//  DESC: AI Enemy01 head (root) node script
//        Only supports one child
//
class AI_Enemy01_Head extends aiNode
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
            this.data.playerShipSprite = this.data.playerShipStrategy.get('player_ship').get();
            this.data.playerCamera = this.data.playerShipStrategy.camera;
            this.data.enemyShotStrategy = strategyManager.get('_enemy_shot_');
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
//  DESC: AI Leaf node script. Descend into the game from above the screen
//
class AI_Enemy01_Descend extends AI_Enemy01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );

        this.easingY = new easing.valueTo;
    }

    // 
    //  DESC: Init the per-enemy state (runs on every spawn) and start the descent
    //
    init()
    {
        this.sprite.hitCount = 0;
        this.sprite.ramTime = 0;     // Time of the last ram on the player (Level1State ENEMY01_RAM_COOLDOWN)
        this.sprite.speed = 0;
        this.sprite.caughtUp = false;   // The player caught up with it while roaming: skip the charge
        this.sprite.spinning = false;   // Spinning (spin attack and flee): player shots don't count as hits
        this.sprite.spinAngle = 0;      // Spin added to the heading for the rotation (radians, 0 - 2PI)
        this.sprite.spinRate = 0;       // Spin speed (radians/ms)
        this.sprite.spinHitCount = 0;   // Player shots that hit this spin, each slows it (Level1State.collisionCallBack())
        this.sprite.knockedOut = false; // Enough spin hits knocked it out of the spin: the flee stops it (AI_Enemy01_Flee)
        this.sprite.volleyTime = 0;     // Time since the last missile volley while spinning (ms)
        this.sprite.wavePhase = Math.random() * gTwoPi;
        this.sprite.heading = -(Math.PI / 2);
        this.applyRot();

        // Away from the player, either side, off the screen
        this._x = this.data.playerShipSprite.pos.x +
            (((Math.random() < 0.5) ? -1 : 1) * genFunc.randomInt( gameDefs.ENEMY01_SPAWN_DIST_MIN, gameDefs.ENEMY01_SPAWN_DIST_MAX ));
        if( this._x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this._x += gWrapSpan;
        else if( this._x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this._x -= gWrapSpan;

        this.sprite.setPosXYZ( this._x, settings.deviceRes_half.h + this.sprite.parentNode.radius + genFunc.randomInt( 0, 200 ) );
        this._offsetY = genFunc.randomInt( -(settings.deviceRes_half.h * 0.15), settings.deviceRes_half.h * 0.5 );

        this.easingY.init( this.sprite.pos.y, this._offsetY, Math.abs(this.sprite.pos.y - this._offsetY) / gameDefs.ENEMY01_DESCEND_PIXELS_PER_SEC, gSineOut );
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
                this.state = defs.EAIS_SUCCESS;

            // The player came over while it drops in: once it's fully below the HUD strip, spin attack right away
            // (the roam and the charge are skipped), so it isn't a sitting duck
            else if( this.sprite.pos.y < (gameDefs.ENEMY01_VIEW_TOP - this.sprite.parentNode.radius) && this.inView() )
            {
                this.sprite.caughtUp = true;
                this.state = defs.EAIS_SUCCESS;
            }
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node script. Fly around away from the player for a while, in wide smooth curves
//        between waypoints that are kept well away from the player, weaving in waves with a full loop
//        every so often. When the player gets close it runs away fast, weaving, off the ship's firing
//        line, so it can't easily be shot down. If the player still catches up with it (it's in view),
//        it spin attacks where it is and flees.
//
class AI_Enemy01_Roam extends AI_Enemy01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Pick a waypoint on this enemy's side of the player, away from the player
    //
    pickWaypoint()
    {
        this._dx = -this.shipDeltaX();
        this.side = (this._dx < 0) ? -1 : 1;

        this.waypointX = this.data.playerShipSprite.pos.x + (this.side * genFunc.randomInt( gameDefs.ENEMY01_ROAM_DIST_MIN, gameDefs.ENEMY01_ROAM_DIST_MAX ));
        this.waypointY = genFunc.randomInt( gameDefs.ENEMY01_MIN_Y + 60, gameDefs.ENEMY01_MAX_Y - 40 );
    }

    // 
    //  DESC: Handle the roam
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.pickWaypoint();
            this.roamTime = genFunc.randomInt( gameDefs.ENEMY01_ROAM_TIME_MIN, gameDefs.ENEMY01_ROAM_TIME_MAX );
            this.avoiding = false;
            this.loopTime = genFunc.randomInt( gameDefs.ENEMY01_LOOP_TIME_MIN, gameDefs.ENEMY01_LOOP_TIME_MAX );
            this.loopLeft = 0;
            this.roamAge = 0;
            this.state = defs.EAIS_ACTIVE;
        }

        // The player caught up with it (it's in view): spin attack where it is and flee (the charge is skipped).
        // Not right at the start of the roam, so it doesn't attack again straight after descending.
        // Caught up while it dropped in (AI_Enemy01_Descend), it goes straight on to the attack.
        if( this.state === defs.EAIS_ACTIVE )
        {
            if( this.sprite.caughtUp )
                this.state = defs.EAIS_SUCCESS;

            this.roamAge += highResTimer.elapsedTime;
            if( this.roamAge > gameDefs.ENEMY01_CATCH_GRACE && this.inView() )
            {
                this.sprite.caughtUp = true;
                this.state = defs.EAIS_SUCCESS;
            }
        }

        if( this.state === defs.EAIS_ACTIVE && this.avoidPlayer() )
        {
            this.avoiding = true;
            this.loopLeft = 0;
        }
        else if( this.state === defs.EAIS_ACTIVE && this.loopLeft > 0 )
        {
            // Flying a loop
            this._turn = gLoopTurnRate * highResTimer.elapsedTime;
            this.sprite.heading = normalizeAngle( this.sprite.heading + (this.loopDir * this._turn) );
            this.loopLeft -= this._turn;
            this.approachSpeed( gameDefs.ENEMY01_ROAM_SPEED, gameDefs.ENEMY01_ROAM_ACCEL );
        }
        else if( this.state === defs.EAIS_ACTIVE )
        {
            // Done avoiding: carry on to a new waypoint away from the player
            if( this.avoiding )
            {
                this.avoiding = false;
                this.pickWaypoint();
            }

            this._wpDX = genFunc.wrapDelta( this.waypointX - this.sprite.pos.x, gWrapSpan );
            this._wpDY = this.waypointY - this.sprite.pos.y;

            // Reached the waypoint, or the player got close to it: pick another one away from the player
            if( (Math.abs( this._wpDX ) + Math.abs( this._wpDY )) < 150 ||
                Math.abs( genFunc.wrapDelta( this.waypointX - this.data.playerShipSprite.pos.x, gWrapSpan ) ) < gameDefs.ENEMY01_ROAM_KEEP_AWAY )
            {
                this.pickWaypoint();
                this._wpDX = genFunc.wrapDelta( this.waypointX - this.sprite.pos.x, gWrapSpan );
                this._wpDY = this.waypointY - this.sprite.pos.y;
            }

            this.faceAngle( this.bandAngle( this.weave( Math.atan2( this._wpDY, this._wpDX ), gWaveAmp ) ), gRoamTurnRate );
            this.approachSpeed( gameDefs.ENEMY01_ROAM_SPEED, gameDefs.ENEMY01_ROAM_ACCEL );

            // Time for a loop: a full circle, turning up when it's in the lower half of its band, down in the upper half
            this.loopTime -= highResTimer.elapsedTime;
            if( this.loopTime <= 0 )
            {
                this.loopTime = genFunc.randomInt( gameDefs.ENEMY01_LOOP_TIME_MIN, gameDefs.ENEMY01_LOOP_TIME_MAX );
                this.loopLeft = gTwoPi;
                this.loopDir = ((Math.cos( this.sprite.heading ) >= 0) ? 1 : -1) *
                    ((this.sprite.pos.y < ((gameDefs.ENEMY01_MIN_Y + gameDefs.ENEMY01_MAX_Y) / 2)) ? 1 : -1);
            }
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.moveForward();
            this.applyRot();

            this.roamTime -= highResTimer.elapsedTime;
            if( this.roamTime <= 0 )
                this.state = defs.EAIS_SUCCESS;
        }

        return this.state;
    }

    // 
    //  DESC: Run from the player when it gets close: straight away from it, and off the ship's
    //        firing line (its Y), keeping the cruise band.
    //        Returns false when the player isn't close.
    //
    avoidPlayer()
    {
        this._awayX = -this.shipDeltaX();
        if( Math.abs( this._awayX ) >= gameDefs.ENEMY01_AVOID_DIST )
            return false;

        this._awayY = this.sprite.pos.y - this.data.playerShipSprite.pos.y;
        this._vy = ((this._awayY < 0) ? -1 : 1) * ((Math.abs( this._awayY ) < 200) ? 0.8 : 0.25);

        // Near the edge of the cruise band: run straight sideways rather than out of the band
        if( (this._vy < 0 && this.sprite.pos.y < (gameDefs.ENEMY01_MIN_Y + 60)) ||
            (this._vy > 0 && this.sprite.pos.y > (gameDefs.ENEMY01_MAX_Y - 60)) )
            this._vy = 0;

        this.faceAngle( this.bandAngle( this.weave( Math.atan2( this._vy, (this._awayX < 0) ? -1 : 1 ), gAvoidWaveAmp ) ), gAvoidTurnRate );
        this.approachSpeed( gameDefs.ENEMY01_AVOID_SPEED, gameDefs.ENEMY01_AVOID_ACCEL );

        return true;
    }
}

//
//  DESC: AI Leaf node script. Charge in at the player and brake to a stop near it, in view, for the spin attack.
//        It aims at a point ENEMY01_CHARGE_STOP_DIST beside the ship on the side it comes from, at the ship's Y
//        kept in the cruise band (so it stops above the buildings when the player flies low). The point is kept
//        ENEMY01_CHARGE_SCREEN_MARGIN in from the side of the screen: the ship is often near the side of the
//        screen, and a spin attack out of view fires no missiles. When that leaves too little room beside the
//        ship, the point moves above or below it (whichever has more room in the band).
//
class AI_Enemy01_Charge extends AI_Enemy01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Handle the charge
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.chargeTime = 0;
            this.chargeViewTime = 0;
            this.side = (this.shipDeltaX() > 0) ? -1 : 1;   // The side of the ship it comes from
            this.state = defs.EAIS_ACTIVE;

            // The player caught up with it while roaming: go straight to the spin attack
            if( this.sprite.caughtUp )
            {
                this.sprite.caughtUp = false;
                this.state = defs.EAIS_SUCCESS;
            }
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            // Screen X (a camera stores its position negated) of the ship and this enemy
            this._camX = this.data.playerCamera.pos.x;
            this._shipScreenX = genFunc.wrapDelta( this.data.playerShipSprite.pos.x + this._camX, gWrapSpan );
            this._screenX = genFunc.wrapDelta( this.sprite.pos.x + this._camX, gWrapSpan );

            // The stop point beside the ship, kept in view
            this._limitX = settings.deviceRes_half.w - gameDefs.ENEMY01_CHARGE_SCREEN_MARGIN;
            this._aimX = Math.min( Math.max( this._shipScreenX + (this.side * gameDefs.ENEMY01_CHARGE_STOP_DIST), -this._limitX ), this._limitX );
            this._shipY = this.data.playerShipSprite.pos.y;
            this._aimY = this._shipY;

            // Not enough room beside the ship: above or below it, whichever has more room in the band
            this._besideX = Math.abs( this._aimX - this._shipScreenX );
            if( this._besideX < gameDefs.ENEMY01_CHARGE_STOP_DIST )
            {
                this._offsetY = Math.sqrt( (gameDefs.ENEMY01_CHARGE_STOP_DIST * gameDefs.ENEMY01_CHARGE_STOP_DIST) - (this._besideX * this._besideX) );
                this._aimY += ((gameDefs.ENEMY01_MAX_Y - this._shipY) > (this._shipY - gameDefs.ENEMY01_MIN_Y)) ? this._offsetY : -this._offsetY;
            }

            this._aimY = Math.min( Math.max( this._aimY, gameDefs.ENEMY01_MIN_Y ), gameDefs.ENEMY01_MAX_Y );

            this._dx = genFunc.wrapDelta( this._aimX - this._screenX, gWrapSpan );
            this._dy = this._aimY - this.sprite.pos.y;
            this._dist = Math.sqrt( (this._dx * this._dx) + (this._dy * this._dy) );

            // Full speed, then brake (constant deceleration) to stop at the stop point
            this._targetSpeed = Math.min( gameDefs.ENEMY01_CHARGE_SPEED, Math.sqrt( 2 * gameDefs.ENEMY01_CHARGE_BRAKE * this._dist ) );

            this.faceAngle( this.bandAngle( Math.atan2( this._dy, this._dx ) ), gChargeTurnRate );
            this.approachSpeed( this._targetSpeed, (this._targetSpeed < this.sprite.speed) ? gameDefs.ENEMY01_CHARGE_BRAKE * 2 : gameDefs.ENEMY01_CHARGE_ACCEL );
            this.moveForward();
            this.applyRot();

            // Done at the stop point. While the ship flies, the stop point moves with it and it trails it
            // (it never slows down there), so it's also done after a short time in view.
            this.chargeTime += highResTimer.elapsedTime;
            if( this.inView() )
                this.chargeViewTime += highResTimer.elapsedTime;

            if( this._dist < gameDefs.ENEMY01_CHARGE_ARRIVE_DIST ||
                this.chargeViewTime > gameDefs.ENEMY01_CHARGE_VIEW_TIME ||
                this.chargeTime > gameDefs.ENEMY01_CHARGE_TIME_MAX )
                this.state = defs.EAIS_SUCCESS;
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node script. Spin attack: quick spin up, fling the first volley of missiles out at full spin.
//        It keeps spinning and firing volleys while it flees (AI_Enemy01_Flee).
//
class AI_Enemy01_Spin extends AI_Enemy01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Handle the spin
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            // Player shots don't count as hits while it spins, they slow the spin (Level1State.collisionCallBack())
            this.sprite.spinning = true;
            this.sprite.spinHitCount = 0;
            this.sprite.volleyTime = gameDefs.ENEMY01_VOLLEY_INTERVAL - gameDefs.ENEMY01_FLEE_VOLLEY_DELAY;   // Also when knocked out before the first volley
            this.state = defs.EAIS_ACTIVE;
        }

        // Knocked out of the spin before it could fire: no missiles, the flee stops the spin
        if( this.state === defs.EAIS_ACTIVE && this.sprite.knockedOut )
            this.state = defs.EAIS_SUCCESS;

        if( this.state === defs.EAIS_ACTIVE )
        {
            // Coast to a stop
            this.approachSpeed( 0, gameDefs.ENEMY01_CHARGE_BRAKE );
            this.moveForward();

            // Spin up
            this.spinStep();

            // Up to speed (slower for each shot that hit it during the spin up): fling the first
            // volley out and flee, still spinning
            if( this.sprite.spinRate >= this._spinTarget )
            {
                this.fireMissiles();
                this.sprite.volleyTime = gameDefs.ENEMY01_VOLLEY_INTERVAL - gameDefs.ENEMY01_FLEE_VOLLEY_DELAY;   // First flee volley after ENEMY01_FLEE_VOLLEY_DELAY
                this.state = defs.EAIS_SUCCESS;
            }

            this.applyRot();
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node script. Run off away from the player at ENEMY01_FLEE_SPEED, swooping up and down and
//        dodging player shots, still spinning and firing a volley every ENEMY01_VOLLEY_INTERVAL while in
//        view (one missile once the spin is stopped), until it's ENEMY01_FLEE_DIST away (off the screen, so the player has time to chase it), then
//        roam again. Each shot that hits the spin slows it (spinStep()); the last one stops it (sprite.knockedOut).
//
class AI_Enemy01_Flee extends AI_Enemy01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );

        this.spinStopEasing = new easing.valueTo;
    }

    // 
    //  DESC: Start a new swoop: up or down (usually the other way from the last one, back toward the
    //        middle of the band near its edges), at a random angle for a random time, so it's erratic
    //
    newSwoop()
    {
        if( this.sprite.pos.y > (gameDefs.ENEMY01_MAX_Y - 60) )
            this.swoopUp = false;
        else if( this.sprite.pos.y < (gameDefs.ENEMY01_MIN_Y + 60) )
            this.swoopUp = true;
        else if( Math.random() < gameDefs.ENEMY01_SWOOP_FLIP_CHANCE )
            this.swoopUp = !this.swoopUp;

        this.swoopAngle = (this.swoopUp ? 1 : -1) * genFunc.randomInt( gameDefs.ENEMY01_SWOOP_ANGLE_MIN, gameDefs.ENEMY01_SWOOP_ANGLE_MAX ) * gDegToRad;
        // A mix of short jinks and longer swoops
        if( Math.random() < gameDefs.ENEMY01_SWOOP_LONG_CHANCE )
            this.swoopTime = genFunc.randomInt( gameDefs.ENEMY01_SWOOP_LONG_MIN, gameDefs.ENEMY01_SWOOP_LONG_MAX );
        else
            this.swoopTime = genFunc.randomInt( gameDefs.ENEMY01_SWOOP_SHORT_MIN, gameDefs.ENEMY01_SWOOP_SHORT_MAX );
    }

    // 
    //  DESC: Find a player shot heading at this enemy, close and lined up. Returns null if none.
    //
    findShot()
    {
        this._nodeAry = this.data.playerShipStrategy.nodeAry;

        for( this._i = 0; this._i < this._nodeAry.length; ++this._i )
        {
            if( this._nodeAry[this._i].userId !== gameDefs.PLAYER_SHOT_ID )
                continue;

            this._shot = this._nodeAry[this._i].get();
            if( !this._shot.collisionComponent.enable )
                continue;

            // A shot flipped like the ship (rot.y) flies left
            this._dx = genFunc.wrapDelta( this.sprite.pos.x - this._shot.pos.x, gWrapSpan ) * ((this._shot.rot.y > 1) ? -1 : 1);
            if( this._dx > 0 && this._dx < gameDefs.ENEMY01_DODGE_DIST &&
                Math.abs( this._shot.pos.y - this.sprite.pos.y ) < gameDefs.ENEMY01_DODGE_Y )
                return this._shot;
        }

        return null;
    }

    // 
    //  DESC: The wanted heading for a climb (+) or dive (-) angle, flying in the flee direction
    //
    fleeHeading( angle )
    {
        return (this.fleeDir > 0) ? angle : (Math.PI - angle);
    }

    // 
    //  DESC: Handle the flee
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.fleeDir = (this.shipDeltaX() > 0) ? -1 : 1;
            this.swoopUp = (this.sprite.pos.y < this.data.playerShipSprite.pos.y);
            this.newSwoop();
            this.dodgeTime = 0;
            this.dodgeCooldown = 0;
            this.stopping = false;
            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.dodgeCooldown -= highResTimer.elapsedTime;

            if( this.dodgeTime > 0 )
            {
                // Dodging: a quick jink up or down
                this.dodgeTime -= highResTimer.elapsedTime;
                this.faceAngle( this.bandAngle( this.fleeHeading( this.dodgeUp ? gDodgeAngle : -gDodgeAngle ) ), gDodgeTurnRate );
            }
            else
            {
                // A player shot heading at it: maybe dodge, away from the shot (back toward the band near its edges)
                if( this.dodgeCooldown <= 0 && this.findShot() !== null )
                {
                    this.dodgeCooldown = gameDefs.ENEMY01_DODGE_COOLDOWN;
                    if( Math.random() < gameDefs.ENEMY01_DODGE_CHANCE )
                    {
                        this.dodgeTime = gameDefs.ENEMY01_DODGE_TIME;
                        this.dodgeUp = (this.sprite.pos.y >= this._shot.pos.y);
                        if( this.sprite.pos.y > (gameDefs.ENEMY01_MAX_Y - 60) )
                            this.dodgeUp = false;
                        else if( this.sprite.pos.y < (gameDefs.ENEMY01_MIN_Y + 60) )
                            this.dodgeUp = true;

                        // Carry on swooping the way it dodged
                        this.swoopUp = !this.dodgeUp;
                    }
                }

                // Swooping up and down
                this.swoopTime -= highResTimer.elapsedTime;
                if( this.swoopTime <= 0 )
                    this.newSwoop();

                this.faceAngle( this.bandAngle( this.fleeHeading( this.swoopAngle ) ), gFleeTurnRate );
            }

            this.approachSpeed( gameDefs.ENEMY01_FLEE_SPEED, gameDefs.ENEMY01_FLEE_ACCEL );
            this.moveForward();

            // The last spin hit stops the spin: ease to the next whole turn (at least a radian away), starting at
            // about its spin speed, so it ends facing the way it flies
            if( this.sprite.knockedOut && !this.stopping )
            {
                this._target = Math.ceil( this.sprite.spinAngle / gTwoPi ) * gTwoPi;
                if( this._target - this.sprite.spinAngle < 1 )
                    this._target += gTwoPi;

                this._time = (Math.PI / 2) * (this._target - this.sprite.spinAngle) / Math.max( this.sprite.spinRate * 1000, 0.001 );
                this.spinStopEasing.init( this.sprite.spinAngle, this._target, Math.min( Math.max( this._time, 0.3 ), 1.5 ), gSineOut );
                this.sprite.spinRate = 0;
                this.stopping = true;
            }

            if( this.stopping )
            {
                this.spinStopEasing.execute();
                this.sprite.spinAngle = this.spinStopEasing.getValue();

                if( this.spinStopEasing.isFinished() )
                {
                    this.sprite.spinAngle = 0;
                    this.sprite.knockedOut = false;
                    this.stopping = false;
                }
            }
            else
            {
                this.spinStep();
            }

            this.applyRot();

            // Another volley every so often (when in view): smaller for each spin hit, one missile
            // once the spin is stopped
            this.sprite.volleyTime += highResTimer.elapsedTime;
            if( this.sprite.volleyTime >= gameDefs.ENEMY01_VOLLEY_INTERVAL )
            {
                this.fireMissiles();
                this.sprite.volleyTime = 0;
            }

            // Far enough away (off the screen): stop spinning
            if( Math.abs( this.shipDeltaX() ) > gameDefs.ENEMY01_FLEE_DIST )
            {
                this.sprite.spinning = false;
                this.sprite.knockedOut = false;
                this.sprite.spinRate = 0;
                this.sprite.spinAngle = 0;
                this.applyRot();
                this.state = defs.EAIS_SUCCESS;
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
    // Enemy01 AI functions
    scriptManager.set( 'AI_Enemy01_Head',
        ( nodeData ) => { return new AI_Enemy01_Head( nodeData ); } );

    scriptManager.set( 'AI_Enemy01_Descend',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Descend( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy01_Roam',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Roam( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy01_Charge',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Charge( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy01_Spin',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Spin( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Enemy01_Flee',
        ( nodeData, headNode, sprite ) => { return new AI_Enemy01_Flee( nodeData, headNode, sprite ); } );
}
