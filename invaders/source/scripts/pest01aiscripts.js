//
//  FILE NAME: pest01aiscripts.js
//  DESC:      scripts for the pest01 AI (the swarm)
//             A swarm of drones that flies around as a flock, ignoring the buildings and the player, for about a
//             minute. Shoot one or fly into one (or wait the minute) and the swarm breaks apart: the members scatter,
//             fly off to regroup somewhere else on the map, then as an angry flock repeat a cycle: keep away from the
//             player for a while, then make an attack run past the player and away again (catching up with it sets off
//             the run). Members shoot at the player whenever they're in view. It only scatters once: after that it keeps
//             hunting until every member is killed.
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

var gWrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
var gDegToRad = Math.PI / 180;
var gTwoPi = Math.PI * 2;

// Rates converted from degrees/sec to radians/ms
var gTurnRate = gameDefs.PEST01_TURN_RATE * gDegToRad / 1000;
var gWanderTurnRate = gameDefs.PEST01_WANDER_TURN_RATE * gDegToRad / 1000;
var gRunTurnRate = gameDefs.PEST01_RUN_TURN_RATE * gDegToRad / 1000;
var gFleeTurnRate = gameDefs.PEST01_FLEE_TURN_RATE * gDegToRad / 1000;
var gWiggleRateMin = gameDefs.PEST01_FLOCK_WIGGLE_RATE_MIN * gDegToRad / 1000;
var gWiggleRateMax = gameDefs.PEST01_FLOCK_WIGGLE_RATE_MAX * gDegToRad / 1000;

// The swarm center stays in the cruise band with room for the flock
var gCenterMinY = gameDefs.PEST00_MIN_Y + gameDefs.PEST01_FLOCK_RADIUS;
var gCenterMaxY = gameDefs.PEST00_MAX_Y - gameDefs.PEST01_FLOCK_RADIUS;

// Easing function allocated once (the get functions create a new closure on every call)
var gSineOut = easing.getSineOut();

// The swarm (one at a time). Allocated once, set up by startSwarm() on every spawn.
var gSwarm = {
    easingY: new easing.valueTo,
    descending: false,
    members: new Array( gameDefs.PEST01_MEMBERS ).fill( null ),
    x: 0,
    y: 0,
    heading: 0,
    speed: 0,
    vx: 0,      // Velocity of the swarm center (px/s), which the flock follows
    vy: 0,
    wayX: 0,
    wayY: 0,
    needWaypoint: true,
    age: 0,
    disturbed: false,       // Shot, rammed or 60 s passed: it turns angry and hunts
    skipScatter: false,     // 60 s passed: no scatter or regroup, it attacks as it is
    regroupPicked: false,   // The regroup point has been picked (by the first member done scattering)
    regrouping: false,      // The swarm center waits at the regroup point until the members have joined
    regroupTime: 0,
    attackRun: false,   // Hunting: an attack run past the player (otherwise avoiding it)
    passed: false,      // The attack run has passed the player
    runDir: 1,          // Which way the attack run goes in X
    runOffsetY: 0,      // The attack run passes this far above or below the player
    modeTime: 0,        // ms in the current hunting mode
    avoidTime: 0,       // How long it avoids the player before the next attack run
    roaming: false,     // Docile or avoiding: roaming far (may lap the map), otherwise hovering around the player's area...
    roamTime: 0,        // ...until it switches (ms)
    chaseTime: 0,       // ms the player has been chasing it while it avoids...
    evadeTime: 0,       // ...until it circles back past the player (an attack run) and flees the other way
    lastShipX: 0,       // The player ship's X last frame (its speed toward the swarm tells if it's chasing)
    jinkTime: 0,        // Fleeing: ms until the next jink...
    jinkUp: 1,          // ...which way it jinks (1 up, -1 down)...
    jinkAngle: 0,       // ...and how sharply (radians off its course)
    frameTime: -1 };

// Temporaries for addMember()
var gSpawnR = 0;
var gSpawnA = 0;

// 
//  DESC: Clear the swarm (Level1State restartGame() and cleanUp())
//
export function clearSwarm()
{
    gSwarm.disturbed = false;
    gSwarm.skipScatter = false;
    gSwarm.regroupPicked = false;
    gSwarm.regrouping = false;
    gSwarm.members.fill( null );
}

// 
//  DESC: Start a new swarm above the screen at this X (Level1State creates its members with addMember()).
//        It descends into the cruise band, then wanders.
//
export function startSwarm( x )
{
    gSwarm.x = x;
    gSwarm.y = settings.deviceRes_half.h + gameDefs.PEST01_FLOCK_RADIUS + 60;
    gSwarm.vx = 0;
    gSwarm.vy = 0;
    gSwarm.descending = true;
    gSwarm.heading = -(Math.PI / 2);

    gSwarm.wayY = genFunc.randomInt( gCenterMinY, gCenterMaxY );
    gSwarm.easingY.init( gSwarm.y, gSwarm.wayY, (gSwarm.y - gSwarm.wayY) / gameDefs.PEST01_DESCEND_SPEED, gSineOut );
    gSwarm.speed = gameDefs.PEST01_WANDER_SPEED;
    gSwarm.needWaypoint = true;
    gSwarm.age = 0;
    setRoamMode( Math.random() >= gameDefs.PEST01_HOVER_CHANCE );   // Starts hovering or roaming, at random
    gSwarm.disturbed = false;
    gSwarm.skipScatter = false;
    gSwarm.regroupPicked = false;
    gSwarm.regrouping = false;
    gSwarm.frameTime = -1;
    gSwarm.members.fill( null );
}

// 
//  DESC: Start roaming far or hovering around the player's area, for a random time
//
function setRoamMode( roam )
{
    gSwarm.roaming = roam;
    gSwarm.roamTime = roam ?
        genFunc.randomInt( gameDefs.PEST01_ROAM_TIME_MIN, gameDefs.PEST01_ROAM_TIME_MAX ) :
        genFunc.randomInt( gameDefs.PEST01_HOVER_TIME_MIN, gameDefs.PEST01_HOVER_TIME_MAX );
}

// 
//  DESC: Add a member to the swarm, at a random point around the swarm center
//
export function addMember( slot, sprite )
{
    gSwarm.members[slot] = sprite;
    sprite.slot = slot;
    sprite.swarmAlive = true;   // Cleared when it dies (Pest01Ship_Die)

    // Set here, not in the Docile leaf: each member reads the others' velocity (flock()), and on the first frame
    // some haven't run their leaf yet (an unset velocity made the whole flock NaN, invisible)
    sprite.vx = 0;
    sprite.vy = 0;

    gSpawnR = gameDefs.PEST01_FLOCK_RADIUS * Math.sqrt( Math.random() );
    gSpawnA = Math.random() * gTwoPi;
    sprite.setPosXYZ( gSwarm.x + (Math.cos( gSpawnA ) * gSpawnR), gSwarm.y + (Math.sin( gSpawnA ) * gSpawnR) );
}

// 
//  DESC: A player shot or the ship hit a member: the swarm scatters and regroups elsewhere. Only the first time:
//        after that a hit just kills the member and the flock keeps hunting.
//
export function disturbSwarm()
{
    if( gSwarm.disturbed )
        return;

    gSwarm.disturbed = true;
    gSwarm.regrouping = true;
}

//
//  DESC: AI Pest01 base class - shared helpers
//
class AI_Pest01_base extends aiNode
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
    //  DESC: Wrap-aware X delta from this member to the player
    //
    shipDeltaX()
    {
        return genFunc.wrapDelta( this.data.playerShipSprite.pos.x - this.sprite.pos.x, gWrapSpan );
    }

    // 
    //  DESC: Is this member in view?
    //
    inView()
    {
        return this.data.camera.inViewWrapped( this.sprite.transPos, this.sprite.parentNode.radius, gWrapSpan );
    }

    // 
    //  DESC: Turn the nose (the art points right) toward the way it's flying, limited by PEST01_TURN_RATE.
    //        It may fly upside down going left.
    //
    face()
    {
        if( ((this.sprite.vx * this.sprite.vx) + (this.sprite.vy * this.sprite.vy)) > 400 )
            this.faceToward( Math.atan2( this.sprite.vy, this.sprite.vx ) );
        else
            this.sprite.setRotXYZ( 0, 0, this.sprite.faceAngle, false );
    }

    // 
    //  DESC: Turn the nose toward an angle, limited by PEST01_TURN_RATE
    //
    faceToward( angle )
    {
        this._turn = angle - this.sprite.faceAngle;
        if( this._turn > Math.PI )
            this._turn -= gTwoPi;
        else if( this._turn < -Math.PI )
            this._turn += gTwoPi;

        this._maxTurn = gTurnRate * highResTimer.elapsedTime;
        this.sprite.faceAngle += Math.min( Math.max( this._turn, -this._maxTurn ), this._maxTurn );
        if( this.sprite.faceAngle > Math.PI )
            this.sprite.faceAngle -= gTwoPi;
        else if( this.sprite.faceAngle < -Math.PI )
            this.sprite.faceAngle += gTwoPi;

        this.sprite.setRotXYZ( 0, 0, this.sprite.faceAngle, false );
    }

    // 
    //  DESC: Move by its velocity (sprite.vx/vy, px/s) and wrap at the map boundary. Nothing stops it at the top
    //        or bottom of the screen (a hard stop there looked like hitting an invisible wall): turnIntoBand()
    //        brings it back.
    //
    moveByVelocity()
    {
        this.sprite.incPosXYZ( this.sprite.vx * highResTimer.elapsedTime / 1000, this.sprite.vy * highResTimer.elapsedTime / 1000 );
        this.wrapX();
    }

    // 
    //  DESC: Turn back into the cruise band (PEST00_MIN_Y/MAX_Y) when out of it: a pull back in (PEST01_BAND_PULL per
    //        px out) plus a brake on its speed further out (PEST01_BAND_DAMP), so it curves back in quickly instead
    //        of coasting far above or below the screen. Its sideways speed is untouched, so it turns rather than
    //        stops (a hard stop and a speed cap at the edges both looked like hitting an invisible wall).
    //
    turnIntoBand()
    {
        if( this.sprite.pos.y > gameDefs.PEST00_MAX_Y )
            this.sprite.vy -= (((this.sprite.pos.y - gameDefs.PEST00_MAX_Y) * gameDefs.PEST01_BAND_PULL) +
                (Math.max( 0, this.sprite.vy ) * gameDefs.PEST01_BAND_DAMP)) * highResTimer.elapsedTime / 1000;
        else if( this.sprite.pos.y < gameDefs.PEST00_MIN_Y )
            this.sprite.vy += (((gameDefs.PEST00_MIN_Y - this.sprite.pos.y) * gameDefs.PEST01_BAND_PULL) +
                (Math.max( 0, -this.sprite.vy ) * gameDefs.PEST01_BAND_DAMP)) * highResTimer.elapsedTime / 1000;
    }

    // 
    //  DESC: Wrap the X position at the map boundary
    //
    wrapX()
    {
        if( this.sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this.sprite.incPosXYZ( gWrapSpan );
        else if( this.sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            this.sprite.incPosXYZ( -gWrapSpan );
    }

    // 
    //  DESC: Pick the next waypoint for the swarm center (docile, and hunting while it avoids the player): hovering
    //        around the player's area (within PEST01_WANDER_RANGE), or roaming PEST01_ROAM_STEP_MIN/MAX on the way it's
    //        flying, so it may go far and lap the map (gSwarm.roaming, switched by updateRoamMode()). Chased, it goes
    //        on away from the player.
    //
    pickWaypoint()
    {
        if( this._chased || gSwarm.roaming )
        {
            this._dir = this._chased ? ((this._shipDx < 0) ? 1 : -1) : ((Math.cos( gSwarm.heading ) < 0) ? -1 : 1);
            gSwarm.wayX = gSwarm.x + (this._dir * genFunc.randomInt( gameDefs.PEST01_ROAM_STEP_MIN, gameDefs.PEST01_ROAM_STEP_MAX ));
        }
        else
        {
            gSwarm.wayX = this.data.playerShipSprite.pos.x + genFunc.randomInt( -gameDefs.PEST01_WANDER_RANGE, gameDefs.PEST01_WANDER_RANGE );
        }

        gSwarm.wayX = genFunc.wrapDelta( gSwarm.wayX, gWrapSpan );
        gSwarm.wayY = genFunc.randomInt( gCenterMinY, gCenterMaxY );
        gSwarm.needWaypoint = false;
    }

    // 
    //  DESC: Pick the regroup point after a scatter, somewhere else on the map: PEST01_REGROUP_DIST_MIN/MAX from the
    //        player on the side the swarm was on (off the screen). The swarm center waits there for the members.
    //
    pickRegroupPoint()
    {
        this._side = (genFunc.wrapDelta( gSwarm.x - this.data.playerShipSprite.pos.x, gWrapSpan ) < 0) ? -1 : 1;

        gSwarm.x = this.data.playerShipSprite.pos.x +
            (this._side * genFunc.randomInt( gameDefs.PEST01_REGROUP_DIST_MIN, gameDefs.PEST01_REGROUP_DIST_MAX ));
        if( gSwarm.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            gSwarm.x += gWrapSpan;
        else if( gSwarm.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            gSwarm.x -= gWrapSpan;

        gSwarm.y = genFunc.randomInt( gCenterMinY, gCenterMaxY );
        gSwarm.vx = 0;
        gSwarm.vy = 0;
        gSwarm.descending = false;   // In case it was disturbed while dropping in
        gSwarm.heading = (this._side > 0) ? 0 : Math.PI;   // Heads on away from the player when it starts hunting
        gSwarm.regroupTime = 0;
        gSwarm.regroupPicked = true;
    }

    // 
    //  DESC: Switch between hovering around the player's area (PEST01_HOVER_TIME_MIN/MAX) and roaming far
    //        (PEST01_ROAM_TIME_MIN/MAX), docile or hunting, so it isn't predictable: a hover always ends in a roam,
    //        a roam is followed by a hover or another roam at random (PEST01_HOVER_CHANCE)
    //
    updateRoamMode()
    {
        gSwarm.roamTime -= highResTimer.elapsedTime;
        if( gSwarm.roamTime <= 0 )
        {
            setRoamMode( !gSwarm.roaming || (Math.random() >= gameDefs.PEST01_HOVER_CHANCE) );
            gSwarm.needWaypoint = true;
        }
    }

    // 
    //  DESC: The angry flock keeps away from the player for a while (PEST01_AVOID_TIME_MIN/MAX)
    //
    startAvoid()
    {
        gSwarm.attackRun = false;
        gSwarm.modeTime = 0;
        gSwarm.avoidTime = genFunc.randomInt( gameDefs.PEST01_AVOID_TIME_MIN, gameDefs.PEST01_AVOID_TIME_MAX );
        gSwarm.chaseTime = 0;
        gSwarm.lastShipX = this.data.playerShipSprite.pos.x;
        gSwarm.evadeTime = genFunc.randomInt( gameDefs.PEST01_EVADE_TIME_MIN, gameDefs.PEST01_EVADE_TIME_MAX );
        gSwarm.speed = gameDefs.PEST01_WANDER_SPEED;
        gSwarm.needWaypoint = true;
    }

    // 
    //  DESC: The angry flock makes an attack run: a pass by the player, PEST01_RUN_OFFSET_Y above or below it
    //
    startRun()
    {
        gSwarm.attackRun = true;
        gSwarm.passed = false;
        gSwarm.modeTime = 0;
        gSwarm.runDir = (genFunc.wrapDelta( this.data.playerShipSprite.pos.x - gSwarm.x, gWrapSpan ) < 0) ? -1 : 1;
        gSwarm.runOffsetY = (Math.random() < 0.5) ? -gameDefs.PEST01_RUN_OFFSET_Y : gameDefs.PEST01_RUN_OFFSET_Y;
        gSwarm.speed = gameDefs.PEST01_RUN_SPEED;
    }

    // 
    //  DESC: Where the angry swarm center heads (this._dx/_dy) and its turn rate (this._turnRate). It repeats a cycle:
    //        avoid the player, then an attack run past it and away again. Chased while it's avoiding, it flees faster
    //        than the ship, then circles back around the player (the attack run) and flees the other way; catching
    //        up with it sets that off right away.
    //
    huntTarget()
    {
        gSwarm.modeTime += highResTimer.elapsedTime;
        this._shipDx = genFunc.wrapDelta( this.data.playerShipSprite.pos.x - gSwarm.x, gWrapSpan );

        // The player ship's X speed toward the swarm (px/s, wrap-aware)
        this._shipMoveX = genFunc.wrapDelta( this.data.playerShipSprite.pos.x - gSwarm.lastShipX, gWrapSpan );
        this._shipToward = ((this._shipDx < 0) ? this._shipMoveX : -this._shipMoveX) * 1000 / Math.max( 1, highResTimer.elapsedTime );
        gSwarm.lastShipX = this.data.playerShipSprite.pos.x;

        if( gSwarm.attackRun )
        {
            this._turnRate = gRunTurnRate;

            // Passed the player: carry on the same way until far enough past it, then back to avoiding
            if( !gSwarm.passed && (this._shipDx * gSwarm.runDir) <= 0 )
                gSwarm.passed = true;

            if( gSwarm.passed )
            {
                gSwarm.speed = gameDefs.PEST01_FLEE_SPEED;   // Gets away faster than the ship can follow without boost
                this._dx = gSwarm.runDir;
                this._dy = 0;
                this.evade();
                if( Math.abs( this._shipDx ) > gameDefs.PEST01_RUN_PAST_DIST )
                    this.startAvoid();
            }
            else
            {
                this._dx = this._shipDx;
                this._dy = Math.min( Math.max( this.data.playerShipSprite.pos.y + gSwarm.runOffsetY, gCenterMinY ), gCenterMaxY ) - gSwarm.y;
            }

            if( gSwarm.modeTime > gameDefs.PEST01_RUN_MAX_TIME )
                this.startAvoid();

            return;
        }

        this._turnRate = gWanderTurnRate;

        // The player chasing it: within PEST01_CHASE_DIST and flying toward it at PEST01_CHASE_MIN_SPEED or more
        this._chased = (Math.abs( this._shipDx ) < gameDefs.PEST01_CHASE_DIST && this._shipToward > gameDefs.PEST01_CHASE_MIN_SPEED);
        gSwarm.chaseTime = this._chased ? (gSwarm.chaseTime + highResTimer.elapsedTime) : 0;

        // Avoided long enough, chased for a while, or the player caught up with it: attack run. When chased it's an
        // evade: it circles back around the player, passing it, and flees the other way.
        if( gSwarm.modeTime > gSwarm.avoidTime || gSwarm.chaseTime > gSwarm.evadeTime ||
            (gSwarm.modeTime > gameDefs.PEST01_AVOID_GRACE && Math.abs( this._shipDx ) < gameDefs.PEST01_CATCH_DIST) )
        {
            this.startRun();
            this.huntTarget();
            return;
        }

        this.updateRoamMode();

        if( gSwarm.needWaypoint )
            this.pickWaypoint();

        // The player coming after it: flee faster than the ship can follow without boost, to a waypoint farther
        // from the player than it is
        if( this._chased )
        {
            gSwarm.speed = gameDefs.PEST01_FLEE_SPEED;
            if( Math.abs( genFunc.wrapDelta( gSwarm.wayX - this.data.playerShipSprite.pos.x, gWrapSpan ) ) < Math.abs( this._shipDx ) )
                this.pickWaypoint();
        }
        else
        {
            gSwarm.speed = gameDefs.PEST01_WANDER_SPEED;
        }

        this._dx = genFunc.wrapDelta( gSwarm.wayX - gSwarm.x, gWrapSpan );
        this._dy = gSwarm.wayY - gSwarm.y;

        if( ((this._dx * this._dx) + (this._dy * this._dy)) < (gameDefs.PEST01_WAYPOINT_DIST * gameDefs.PEST01_WAYPOINT_DIST) )
            this.pickWaypoint();

        if( this._chased )
            this.evade();
    }

    // 
    //  DESC: Fleeing from the player: zigzag, jinking up or down off its course (this._jink, PEST01_JINK_ANGLE_MIN/MAX)
    //        every PEST01_JINK_TIME_MIN/MAX, turning sharper (PEST01_FLEE_TURN_RATE), so the flock weaves and is harder
    //        to catch and shoot. Mostly flips each jink, always jinks back toward the middle near the edge of the band,
    //        and flips right away when it reaches the edge.
    //
    evade()
    {
        // Reached the edge of the band: jink the other way now (a zigzag, not a slide along the edge)
        gSwarm.jinkTime -= highResTimer.elapsedTime;
        if( (gSwarm.jinkUp > 0 && gSwarm.y >= gCenterMaxY) || (gSwarm.jinkUp < 0 && gSwarm.y <= gCenterMinY) )
            gSwarm.jinkTime = 0;

        if( gSwarm.jinkTime <= 0 )
        {
            gSwarm.jinkTime = genFunc.randomInt( gameDefs.PEST01_JINK_TIME_MIN, gameDefs.PEST01_JINK_TIME_MAX );
            gSwarm.jinkAngle = genFunc.randomInt( gameDefs.PEST01_JINK_ANGLE_MIN, gameDefs.PEST01_JINK_ANGLE_MAX ) * gDegToRad;

            if( gSwarm.y > gCenterMaxY - gameDefs.PEST01_JINK_EDGE )
                gSwarm.jinkUp = -1;
            else if( gSwarm.y < gCenterMinY + gameDefs.PEST01_JINK_EDGE )
                gSwarm.jinkUp = 1;
            else if( Math.random() < gameDefs.PEST01_JINK_FLIP_CHANCE )
                gSwarm.jinkUp = -gSwarm.jinkUp;
        }

        // A positive angle turns up going right and down going left
        this._jink = gSwarm.jinkUp * gSwarm.jinkAngle * ((this._dx < 0) ? -1 : 1);
        this._turnRate = gFleeTurnRate;
    }

    // 
    //  DESC: Have all the living members joined the regrouped flock?
    //
    allRegrouped()
    {
        for( let i = 0; i < gSwarm.members.length; ++i )
        {
            this._member = gSwarm.members[i];
            if( this._member !== null && this._member.swarmAlive && !this._member.regrouped )
                return false;
        }

        return true;
    }

    // 
    //  DESC: Move the swarm center (once a frame, whichever member gets here first) in smooth curves. Docile, it
    //        wanders between waypoints around the player's area, and after PEST01_ATTACK_TIME the swarm breaks off
    //        anyway. After the scatter it waits at the regroup point until the members have joined, then hunts
    //        (huntTarget()).
    //
    updateSwarm()
    {
        if( gSwarm.frameTime === highResTimer.lastTime )
            return;

        gSwarm.frameTime = highResTimer.lastTime;

        if( gSwarm.regrouping )
        {
            gSwarm.regroupTime += highResTimer.elapsedTime;
            if( this.allRegrouped() || gSwarm.regroupTime > gameDefs.PEST01_REGROUP_MAX_TIME )
            {
                gSwarm.regrouping = false;
                this.startAvoid();
            }

            return;
        }

        gSwarm.age += highResTimer.elapsedTime;

        // Drop in from above the screen, then wander off to the side
        if( gSwarm.descending )
        {
            gSwarm.easingY.execute();
            gSwarm.vx = 0;
            gSwarm.vy = (gSwarm.easingY.getValue() - gSwarm.y) * 1000 / highResTimer.elapsedTime;
            gSwarm.y = gSwarm.easingY.getValue();

            if( gSwarm.easingY.isFinished() )
            {
                gSwarm.descending = false;
                gSwarm.heading = (Math.random() < 0.5) ? 0 : Math.PI;
                gSwarm.needWaypoint = true;
            }

            return;
        }

        this._jink = 0;
        this._chased = false;

        if( gSwarm.disturbed )
        {
            this.huntTarget();
        }
        else
        {
            this.updateRoamMode();

            if( gSwarm.needWaypoint )
                this.pickWaypoint();

            this._dx = genFunc.wrapDelta( gSwarm.wayX - gSwarm.x, gWrapSpan );
            this._dy = gSwarm.wayY - gSwarm.y;

            if( ((this._dx * this._dx) + (this._dy * this._dy)) < (gameDefs.PEST01_WAYPOINT_DIST * gameDefs.PEST01_WAYPOINT_DIST) )
                this.pickWaypoint();

            this._turnRate = gWanderTurnRate;

            // Undisturbed long enough: the swarm turns angry and makes an attack run, without a scatter or regroup
            // (scattering for no reason looked odd)
            if( gSwarm.age > gameDefs.PEST01_ATTACK_TIME )
            {
                gSwarm.disturbed = true;
                gSwarm.skipScatter = true;
                gSwarm.regroupPicked = true;
                this.startAvoid();
                this.startRun();
            }
        }

        // Turn toward where it's heading (plus a jink when fleeing), limited by the turn rate
        this._turn = Math.atan2( this._dy, this._dx ) + this._jink - gSwarm.heading;
        if( this._turn > Math.PI )
            this._turn -= gTwoPi;
        else if( this._turn < -Math.PI )
            this._turn += gTwoPi;

        this._maxTurn = this._turnRate * highResTimer.elapsedTime;
        gSwarm.heading += Math.min( Math.max( this._turn, -this._maxTurn ), this._maxTurn );

        gSwarm.vx = Math.cos( gSwarm.heading ) * gSwarm.speed;
        gSwarm.vy = Math.sin( gSwarm.heading ) * gSwarm.speed;

        this._step = gSwarm.speed * highResTimer.elapsedTime / 1000;
        gSwarm.x += Math.cos( gSwarm.heading ) * this._step;
        gSwarm.y = Math.min( Math.max( gSwarm.y + (Math.sin( gSwarm.heading ) * this._step), gCenterMinY ), gCenterMaxY );

        if( gSwarm.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            gSwarm.x += gWrapSpan;
        else if( gSwarm.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            gSwarm.x -= gWrapSpan;

    }

    // 
    //  DESC: Add a push away from the other members inside a distance (up to an amount, a speed or an
    //        acceleration) to this._wantX/Y
    //
    separate( dist, speed )
    {
        for( let i = 0; i < gSwarm.members.length; ++i )
        {
            this._member = gSwarm.members[i];
            if( this._member === null || this._member === this.sprite || !this._member.swarmAlive )
                continue;

            this._ox = genFunc.wrapDelta( this.sprite.pos.x - this._member.pos.x, gWrapSpan );
            this._oy = this.sprite.pos.y - this._member.pos.y;
            this._d = Math.sqrt( (this._ox * this._ox) + (this._oy * this._oy) );
            if( this._d < dist && this._d > 0.5 )
            {
                this._push = (1 - (this._d / dist)) * speed / this._d;
                this._wantX += this._ox * this._push;
                this._wantY += this._oy * this._push;
            }
        }
    }

    // 
    //  DESC: Add a push away from the player ship inside a distance (up to an amount, a speed or an
    //        acceleration) to this._wantX/Y
    //
    avoidShip( dist, amount )
    {
        this._ox = -this.shipDeltaX();
        this._oy = this.sprite.pos.y - this.data.playerShipSprite.pos.y;
        this._d = Math.sqrt( (this._ox * this._ox) + (this._oy * this._oy) );
        if( this._d < dist && this._d > 0.5 )
        {
            this._push = (1 - (this._d / dist)) * amount / this._d;
            this._wantX += this._ox * this._push;
            this._wantY += this._oy * this._push;
        }
    }

    // 
    //  DESC: Change the velocity (sprite.vx/vy) toward the wanted one (this._wantX/Y), limited by an acceleration (px/s/s)
    //
    steerVelocity( accel )
    {
        this._dvx = this._wantX - this.sprite.vx;
        this._dvy = this._wantY - this.sprite.vy;
        this._dv = Math.sqrt( (this._dvx * this._dvx) + (this._dvy * this._dvy) );
        this._maxDv = accel * highResTimer.elapsedTime / 1000;
        if( this._dv > this._maxDv )
        {
            this._dvx *= this._maxDv / this._dv;
            this._dvy *= this._maxDv / this._dv;
        }

        this.sprite.vx += this._dvx;
        this.sprite.vy += this._dvy;
    }

    // 
    //  DESC: Set the wanted velocity (this._wantX/Y) toward a point, up to a speed, slowing down near it
    //        (wanted speed = distance * arriveRate)
    //
    arriveAt( dx, dy, speed, arriveRate )
    {
        this._dist = Math.sqrt( (dx * dx) + (dy * dy) );
        this._wantX = 0;
        this._wantY = 0;
        if( this._dist > 1 )
        {
            this._speed = Math.min( speed, this._dist * arriveRate );
            this._wantX = dx / this._dist * this._speed;
            this._wantY = dy / this._dist * this._speed;
        }
    }

    // 
    //  DESC: Shoot at the player every so often while it's in view and the player is alive: straight at the
    //        player from wherever it is, whichever way it's facing (steering at the player to line its nose up
    //        didn't look good)
    //
    shoot()
    {
        this.sprite.fireTime -= highResTimer.elapsedTime;
        if( this.sprite.fireTime > 0 )
            return;

        if( !this.data.playerShipSprite.collisionComponent.enable || !this.inView() )
        {
            // Not in view: shoot soon after it comes into view (staggered, so they don't all fire together)
            this.sprite.fireTime = genFunc.randomInt( 200, 800 );
            return;
        }

        this._angle = Math.atan2( this.data.playerShipSprite.pos.y - this.sprite.pos.y, this.shipDeltaX() );
        this._shotSprite = this.data.enemyShotStrategy.create('pest01_shot').get();
        this._shotSprite.scriptComponent.prepare( 'shoot', this._shotSprite, this.sprite, this._angle );
        this.data.groupPlayer.play( 'pest01_shot' );

        this.sprite.fireTime = genFunc.randomInt( gameDefs.PEST01_FIRE_INTERVAL_MIN, gameDefs.PEST01_FIRE_INTERVAL_MAX );
    }

    // 
    //  DESC: Fly with the flock (boids): toward the middle of the other members (cohesion), matching their
    //        velocity (alignment), apart from the ones too close (separation), following the wandering swarm
    //        center (the leader), plus a slow wiggle so it never flies dead straight. Always moving, between
    //        PEST01_FLOCK_MIN_SPEED and PEST01_FLOCK_MAX_SPEED (PEST01_FAST_FLOCK_MAX_SPEED while the swarm
    //        center is faster than PEST01_WANDER_SPEED: attack run, fleeing). Used by the docile and the hunting (angry) flock.
    //
    flock()
    {
        // Middle and average velocity of the other members
        this._n = 0;
        this._cx = 0;
        this._cy = 0;
        this._avx = 0;
        this._avy = 0;
        for( let i = 0; i < gSwarm.members.length; ++i )
        {
            this._member = gSwarm.members[i];
            if( this._member === null || this._member === this.sprite || !this._member.swarmAlive )
                continue;

            this._n++;
            this._cx += genFunc.wrapDelta( this._member.pos.x - this.sprite.pos.x, gWrapSpan );
            this._cy += this._member.pos.y - this.sprite.pos.y;
            this._avx += this._member.vx;
            this._avy += this._member.vy;
        }

        // Acceleration (px/s/s) in this._wantX/Y
        this._wantX = 0;
        this._wantY = 0;
        if( this._n > 0 )
        {
            this._wantX += (this._cx / this._n) * gameDefs.PEST01_FLOCK_COHESION;
            this._wantY += (this._cy / this._n) * gameDefs.PEST01_FLOCK_COHESION;
            this._wantX += ((this._avx / this._n) - this.sprite.vx) * gameDefs.PEST01_FLOCK_ALIGNMENT;
            this._wantY += ((this._avy / this._n) - this.sprite.vy) * gameDefs.PEST01_FLOCK_ALIGNMENT;
        }

        // Follow the swarm center
        this._wantX += (genFunc.wrapDelta( gSwarm.x - this.sprite.pos.x, gWrapSpan ) * gameDefs.PEST01_FLOCK_LEADER) +
            ((gSwarm.vx - this.sprite.vx) * gameDefs.PEST01_FLOCK_LEADER_ALIGN);
        this._wantY += ((gSwarm.y - this.sprite.pos.y) * gameDefs.PEST01_FLOCK_LEADER) +
            ((gSwarm.vy - this.sprite.vy) * gameDefs.PEST01_FLOCK_LEADER_ALIGN);

        this.separate( gameDefs.PEST01_FLOCK_SEPARATION_DIST, gameDefs.PEST01_FLOCK_SEPARATION );

        // Part around the player ship, so the swarm doesn't fly into a ship that's sitting still
        // (only a shot or the player ramming it should set it off)
        this.avoidShip( gameDefs.PEST01_FLOCK_SHIP_CLEAR_DIST, gameDefs.PEST01_FLOCK_SHIP_CLEAR );

        // Wiggle
        this.sprite.wiggleAngle += this.sprite.wiggleRate * highResTimer.elapsedTime;
        this._wantX += Math.cos( this.sprite.wiggleAngle ) * gameDefs.PEST01_FLOCK_WIGGLE;
        this._wantY += Math.sin( this.sprite.wiggleAngle ) * gameDefs.PEST01_FLOCK_WIGGLE;

        // Limit the acceleration, apply it, and keep the speed in range
        this._a = Math.sqrt( (this._wantX * this._wantX) + (this._wantY * this._wantY) );
        if( this._a > gameDefs.PEST01_FLOCK_ACCEL )
        {
            this._wantX *= gameDefs.PEST01_FLOCK_ACCEL / this._a;
            this._wantY *= gameDefs.PEST01_FLOCK_ACCEL / this._a;
        }

        this.sprite.vx += this._wantX * highResTimer.elapsedTime / 1000;
        this.sprite.vy += this._wantY * highResTimer.elapsedTime / 1000;

        this._speed = Math.sqrt( (this.sprite.vx * this.sprite.vx) + (this.sprite.vy * this.sprite.vy) );
        this._maxSpeed = (gSwarm.speed > gameDefs.PEST01_WANDER_SPEED) ? gameDefs.PEST01_FAST_FLOCK_MAX_SPEED : gameDefs.PEST01_FLOCK_MAX_SPEED;
        if( this._speed > this._maxSpeed )
        {
            this.sprite.vx *= this._maxSpeed / this._speed;
            this.sprite.vy *= this._maxSpeed / this._speed;
        }
        else if( this._speed < gameDefs.PEST01_FLOCK_MIN_SPEED && this._speed > 0.01 )
        {
            this.sprite.vx *= gameDefs.PEST01_FLOCK_MIN_SPEED / this._speed;
            this.sprite.vy *= gameDefs.PEST01_FLOCK_MIN_SPEED / this._speed;
        }

        // Once the swarm has descended, turn back into the cruise band when it strays out (after the
        // acceleration limit, so it always works)
        if( !gSwarm.descending )
            this.turnIntoBand();

        this.sprite.incPosXYZ( this.sprite.vx * highResTimer.elapsedTime / 1000, this.sprite.vy * highResTimer.elapsedTime / 1000 );
        this.wrapX();
    }
}

//
//  DESC: AI Pest01 head (root) node script
//        Only supports one child
//
class AI_Pest01_Head extends aiNode
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

        // Returning SUCCESS or FAILURE terminates the execution of this behavioral tree
        if( this.nodeAry[0].evaluate() != defs.EAIS_ACTIVE )
            return true;

        return false;
    }
}

//
//  DESC: AI Leaf node script. Docile: fly as a flock around the wandering swarm center, ignoring the
//        player, until the swarm is disturbed (or PEST01_ATTACK_TIME has passed).
//
class AI_Pest01_Docile extends AI_Pest01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Init the per-member state (runs on every spawn)
    //
    init()
    {
        this.sprite.setFrame( 0 );                // Passive art
        this.sprite.faceAngle = -(Math.PI / 2);   // Nose down, it starts descending
        this.sprite.wiggleAngle = Math.random() * gTwoPi;
        this.sprite.wiggleRate = (gWiggleRateMin + (Math.random() * (gWiggleRateMax - gWiggleRateMin))) * ((Math.random() < 0.5) ? -1 : 1);
    }

    // 
    //  DESC: Handle the docile swarm
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
            if( gSwarm.disturbed )
                return this.state = defs.EAIS_SUCCESS;

            this.updateSwarm();

            this.flock();

            this.face();
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node script. Disturbed: burst out from the swarm center, shooting at the player in view
//
class AI_Pest01_Scatter extends AI_Pest01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Handle the scatter
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.sprite.setFrame( 1 );   // Angry art
            this.sprite.regrouped = false;

            // Angry from here on: it shoots at the player in view from the scatter on (sprite.fireTime carries into the Hunt)
            this.sprite.fireTime = genFunc.randomInt( gameDefs.PEST01_FIRST_SHOT_MIN, gameDefs.PEST01_FIRST_SHOT_MAX );

            // The docile time ran out: no scatter, it stays with the flock and attacks
            if( gSwarm.skipScatter )
            {
                this.sprite.regrouped = true;
                return this.state = defs.EAIS_SUCCESS;
            }

            // Out from the swarm center, give or take a bit (any way when it's right at the center)
            this._dx = genFunc.wrapDelta( this.sprite.pos.x - gSwarm.x, gWrapSpan );
            this._dy = this.sprite.pos.y - gSwarm.y;
            this._angle = ((Math.abs( this._dx ) + Math.abs( this._dy )) > 15) ? Math.atan2( this._dy, this._dx ) : Math.random() * gTwoPi;
            this._angle += (Math.random() - 0.5) * 0.6;

            this.sprite.vx = Math.cos( this._angle ) * gameDefs.PEST01_SCATTER_SPEED;
            this.sprite.vy = Math.sin( this._angle ) * gameDefs.PEST01_SCATTER_SPEED;
            this.time = 0;
            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.turnIntoBand();
            this.moveByVelocity();
            this.face();
            this.shoot();

            this.time += highResTimer.elapsedTime;
            if( this.time > gameDefs.PEST01_SCATTER_TIME )
                this.state = defs.EAIS_SUCCESS;
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node script. Hunt (after each scatter): fly on its own to the regroup point somewhere else on the
//        map, join the flock there, then fly with the angry flock as it hunts (avoids the player, then makes an
//        attack run, see huntTarget()), shooting at the player whenever it's in view. Never ends: it hunts until
//        it's killed.
//
class AI_Pest01_Hunt extends AI_Pest01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Fly to the regroup point (the swarm center) on its own, kept apart from the other members and clear
    //        of the ship, and join the flock once it's close
    //
    regroup()
    {
        this._dx = genFunc.wrapDelta( gSwarm.x - this.sprite.pos.x, gWrapSpan );
        this._dy = gSwarm.y - this.sprite.pos.y;
        if( ((this._dx * this._dx) + (this._dy * this._dy)) < (gameDefs.PEST01_REGROUP_JOIN_DIST * gameDefs.PEST01_REGROUP_JOIN_DIST) )
            this.sprite.regrouped = true;

        this.arriveAt( this._dx, this._dy, gameDefs.PEST01_REGROUP_SPEED, gameDefs.PEST01_ARRIVE_RATE );
        this.separate( gameDefs.PEST01_SEPARATION_DIST, gameDefs.PEST01_SEPARATION_SPEED );
        this.avoidShip( gameDefs.PEST01_SHIP_CLEAR_DIST, gameDefs.PEST01_SHIP_CLEAR_SPEED );
        this.steerVelocity( gameDefs.PEST01_REGROUP_ACCEL );
        this.turnIntoBand();
        this.moveByVelocity();
    }

    // 
    //  DESC: Handle the hunt
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            // The first member here after the scatter picks where the swarm regroups
            if( !gSwarm.regroupPicked )
                this.pickRegroupPoint();

            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.updateSwarm();

            if( this.sprite.regrouped )
                this.flock();
            else
                this.regroup();

            this.face();
            this.shoot();
        }

        return this.state;
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'AI_Pest01_Head',
        ( nodeData ) => { return new AI_Pest01_Head( nodeData ); } );

    scriptManager.set( 'AI_Pest01_Docile',
        ( nodeData, headNode, sprite ) => { return new AI_Pest01_Docile( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Pest01_Scatter',
        ( nodeData, headNode, sprite ) => { return new AI_Pest01_Scatter( nodeData, headNode, sprite ); } );

    scriptManager.set( 'AI_Pest01_Hunt',
        ( nodeData, headNode, sprite ) => { return new AI_Pest01_Hunt( nodeData, headNode, sprite ); } );
}
