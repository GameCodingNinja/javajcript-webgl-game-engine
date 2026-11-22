//
//  FILE NAME: pest01aiscripts.js
//  DESC:      scripts for the pest01 AI (the swarm)
//             A swarm of drones that flies around as a flock, ignoring the buildings and the player, for about a
//             minute. Shoot one or fly into one (or wait the minute) and the swarm breaks apart: every member
//             takes its own spot around the player and shoots at it until killed.
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

// Rates converted from degrees/sec to radians/ms
var gTurnRate = gameDefs.PEST01_TURN_RATE * gDegToRad / 1000;
var gWanderTurnRate = gameDefs.PEST01_WANDER_TURN_RATE * gDegToRad / 1000;
var gWiggleRateMin = gameDefs.PEST01_FLOCK_WIGGLE_RATE_MIN * gDegToRad / 1000;
var gWiggleRateMax = gameDefs.PEST01_FLOCK_WIGGLE_RATE_MAX * gDegToRad / 1000;

var gFireAlign = gameDefs.PEST01_FIRE_ALIGN * gDegToRad;
var gSector = gTwoPi / gameDefs.PEST01_MEMBERS;
var gSpotJitter = gameDefs.PEST01_SPOT_JITTER * gDegToRad;

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
    spotOffset: 0,  // Rotation of the attack sectors around the player (radians), random per swarm
    vx: 0,      // Velocity of the swarm center (px/s), which the flock follows
    vy: 0,
    wayX: 0,
    wayY: 0,
    needWaypoint: true,
    age: 0,
    disturbed: false,
    frameTime: -1 };

// Temporaries for addMember()
var gSpawnR = 0;
var gSpawnA = 0;

// Shared AI data
var ai_data = {};

// 
//  DESC: Clear the AI data
//
export function clearAIData()
{
    ai_data = {};
    gSwarm.disturbed = false;
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
    gSwarm.disturbed = false;
    gSwarm.frameTime = -1;
    gSwarm.spotOffset = Math.random() * gTwoPi;
    gSwarm.members.fill( null );
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
//  DESC: A player shot or the ship hit a member: the swarm breaks apart and attacks
//
export function disturbSwarm()
{
    gSwarm.disturbed = true;
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
        return this.data.playerCamera.inViewWrapped( this.sprite.transPos, this.sprite.parentNode.radius, gWrapSpan );
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
    //  DESC: Move by its velocity (sprite.vx/vy, px/s), wrap at the map boundary, and stay above the ground and
    //        fully below the HUD strip at the top of the screen
    //
    moveByVelocity()
    {
        this.sprite.incPosXYZ( this.sprite.vx * highResTimer.elapsedTime / 1000, this.sprite.vy * highResTimer.elapsedTime / 1000 );
        this.wrapX();

        this._topY = gameDefs.PEST00_VIEW_TOP - this.sprite.parentNode.radius;
        this._bottomY = -(settings.deviceRes_half.h - this.sprite.parentNode.radius);
        if( this.sprite.pos.y > this._topY )
        {
            this.sprite.setPosXYZ( this.sprite.pos.x, this._topY );
            this.sprite.vy = Math.min( this.sprite.vy, 0 );
        }
        else if( this.sprite.pos.y < this._bottomY )
        {
            this.sprite.setPosXYZ( this.sprite.pos.x, this._bottomY );
            this.sprite.vy = Math.max( this.sprite.vy, 0 );
        }
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
    //  DESC: Pick the next wander waypoint for the swarm center, around the player's area
    //
    pickWaypoint()
    {
        gSwarm.wayX = this.data.playerShipSprite.pos.x + genFunc.randomInt( -gameDefs.PEST01_WANDER_RANGE, gameDefs.PEST01_WANDER_RANGE );
        if( gSwarm.wayX < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            gSwarm.wayX += gWrapSpan;
        else if( gSwarm.wayX > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
            gSwarm.wayX -= gWrapSpan;

        gSwarm.wayY = genFunc.randomInt( gCenterMinY, gCenterMaxY );
        gSwarm.needWaypoint = false;
    }

    // 
    //  DESC: Move the docile swarm center (once a frame, whichever member gets here first): it wanders between
    //        waypoints in smooth curves, and after PEST01_ATTACK_TIME the swarm breaks off and attacks anyway
    //
    updateSwarm()
    {
        if( gSwarm.frameTime === highResTimer.lastTime )
            return;

        gSwarm.frameTime = highResTimer.lastTime;

        if( gSwarm.needWaypoint )
            this.pickWaypoint();

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

        // Undisturbed long enough: the swarm breaks off and attacks anyway
        if( gSwarm.age > gameDefs.PEST01_ATTACK_TIME )
            gSwarm.disturbed = true;

        this._dx = genFunc.wrapDelta( gSwarm.wayX - gSwarm.x, gWrapSpan );
        this._dy = gSwarm.wayY - gSwarm.y;

        if( ((this._dx * this._dx) + (this._dy * this._dy)) < (gameDefs.PEST01_WAYPOINT_DIST * gameDefs.PEST01_WAYPOINT_DIST) )
            this.pickWaypoint();

        // Turn toward the waypoint, limited by the turn rate
        this._turn = Math.atan2( this._dy, this._dx ) - gSwarm.heading;
        if( this._turn > Math.PI )
            this._turn -= gTwoPi;
        else if( this._turn < -Math.PI )
            this._turn += gTwoPi;

        this._maxTurn = gWanderTurnRate * highResTimer.elapsedTime;
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
            this.data.enemyStrategy = strategyManager.get('_enemy_');
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
    //  DESC: Fly with the flock (boids): toward the middle of the other members (cohesion), matching their
    //        velocity (alignment), apart from the ones too close (separation), following the wandering swarm
    //        center (the leader), plus a slow wiggle so it never flies dead straight. Always moving, between
    //        PEST01_FLOCK_MIN_SPEED and PEST01_FLOCK_MAX_SPEED (faster when the swarm flies off).
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
        if( this._speed > gameDefs.PEST01_FLOCK_MAX_SPEED )
        {
            this.sprite.vx *= gameDefs.PEST01_FLOCK_MAX_SPEED / this._speed;
            this.sprite.vy *= gameDefs.PEST01_FLOCK_MAX_SPEED / this._speed;
        }
        else if( this._speed < gameDefs.PEST01_FLOCK_MIN_SPEED && this._speed > 0.01 )
        {
            this.sprite.vx *= gameDefs.PEST01_FLOCK_MIN_SPEED / this._speed;
            this.sprite.vy *= gameDefs.PEST01_FLOCK_MIN_SPEED / this._speed;
        }

        // Once the swarm has descended, keep to the cruise band: pushed back in when it strays out (after the
        // acceleration limit, so it always works), and never further than fully below the HUD strip at the top of
        // the screen or past the bottom of the screen
        if( !gSwarm.descending )
        {
            if( this.sprite.pos.y > gameDefs.PEST00_MAX_Y )
                this.sprite.vy -= (this.sprite.pos.y - gameDefs.PEST00_MAX_Y) * gameDefs.PEST01_FLOCK_BAND * highResTimer.elapsedTime / 1000;
            else if( this.sprite.pos.y < gameDefs.PEST00_MIN_Y )
                this.sprite.vy += (gameDefs.PEST00_MIN_Y - this.sprite.pos.y) * gameDefs.PEST01_FLOCK_BAND * highResTimer.elapsedTime / 1000;

            // Brake smoothly before the HUD strip at the top and the bottom of the screen: the speed toward the
            // edge is limited to what stops it (at PEST01_FLOCK_EDGE_BRAKE) PEST01_FLOCK_EDGE_GAP short of it.
            // A hard stop made them hit the bottom of the radar and slide along it.
            this._room = gameDefs.PEST00_VIEW_TOP - this.sprite.parentNode.radius - gameDefs.PEST01_FLOCK_EDGE_GAP - this.sprite.pos.y;
            this.sprite.vy = Math.min( this.sprite.vy, (this._room > 0) ? Math.sqrt( 2 * gameDefs.PEST01_FLOCK_EDGE_BRAKE * this._room ) : 0 );

            this._room = this.sprite.pos.y + settings.deviceRes_half.h - this.sprite.parentNode.radius - gameDefs.PEST01_FLOCK_EDGE_GAP;
            this.sprite.vy = Math.max( this.sprite.vy, (this._room > 0) ? -Math.sqrt( 2 * gameDefs.PEST01_FLOCK_EDGE_BRAKE * this._room ) : 0 );
        }

        this.sprite.incPosXYZ( this.sprite.vx * highResTimer.elapsedTime / 1000, this.sprite.vy * highResTimer.elapsedTime / 1000 );
        this.wrapX();
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
//  DESC: AI Leaf node script. Disturbed: burst out from the swarm center
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
            this.moveByVelocity();
            this.face();

            this.time += highResTimer.elapsedTime;
            if( this.time > gameDefs.PEST01_SCATTER_TIME )
                this.state = defs.EAIS_SUCCESS;
        }

        return this.state;
    }
}

//
//  DESC: AI Leaf node script. Attack: take a spot around the player, move to a new one every so
//        often, keep apart from the other members and clear of the ship, and shoot at the player.
//        Never ends: it attacks until it's killed.
//
class AI_Pest01_Attack extends AI_Pest01_base
{
    constructor( nodeData, headNode, sprite )
    {
        super( nodeData, headNode, sprite );
    }

    // 
    //  DESC: Pick a new spot around the player (an angle and distance from the ship). Each member keeps to its own
    //        sector (a share of the circle by its slot, give or take PEST01_SPOT_JITTER), so they spread out around
    //        the player instead of bunching up.
    //
    pickSpot()
    {
        this.spotAngle = gSwarm.spotOffset + (this.sprite.slot * gSector) + ((Math.random() - 0.5) * 2 * gSpotJitter);
        this.spotDist = genFunc.randomInt( gameDefs.PEST01_ATTACK_DIST_MIN, gameDefs.PEST01_ATTACK_DIST_MAX );
        this.repositionTime = genFunc.randomInt( gameDefs.PEST01_REPOSITION_MIN, gameDefs.PEST01_REPOSITION_MAX );
    }

    // 
    //  DESC: Is a shot due (within PEST01_AIM_TIME) and can it shoot (in view, the player alive)? Then it steers
    //        toward the player (Attack evaluate()) to line its nose up for the shot.
    //
    aiming()
    {
        return this.fireTime <= gameDefs.PEST01_AIM_TIME && this.data.playerShipSprite.collisionComponent.enable && this.inView();
    }

    // 
    //  DESC: Shoot. It can only shoot straight out of its nose, which faces the way it's flying, so while a shot is
    //        due it steers toward the player, and fires once its nose is lined up (within PEST01_FIRE_ALIGN).
    //        It gives up on a shot it can't line up within PEST01_AIM_MAX_WAIT.
    //
    shoot()
    {
        this.fireTime -= highResTimer.elapsedTime;
        if( this.fireTime > 0 )
            return;

        if( !this.aiming() )
        {
            // Not in view: shoot soon after it comes into view (staggered, so they don't all fire together)
            this.fireTime = genFunc.randomInt( 200, 800 );
            return;
        }

        this._turn = Math.atan2( this.data.playerShipSprite.pos.y - this.sprite.pos.y, this.shipDeltaX() ) - this.sprite.faceAngle;
        if( this._turn > Math.PI )
            this._turn -= gTwoPi;
        else if( this._turn < -Math.PI )
            this._turn += gTwoPi;

        if( Math.abs( this._turn ) < gFireAlign )
        {
            this._shotSprite = this.data.enemyShotStrategy.create('pest01_shot').get();
            this._shotSprite.scriptComponent.prepare( 'shoot', this._shotSprite, this.sprite, this.sprite.faceAngle );
            this.data.groupPlayer.play( 'wreck00_gun' );

            this.fireTime = genFunc.randomInt( gameDefs.PEST01_FIRE_INTERVAL_MIN, gameDefs.PEST01_FIRE_INTERVAL_MAX );
        }
        else if( this.fireTime < -gameDefs.PEST01_AIM_MAX_WAIT )
        {
            this.fireTime = genFunc.randomInt( gameDefs.PEST01_FIRE_INTERVAL_MIN, gameDefs.PEST01_FIRE_INTERVAL_MAX );
        }
    }

    // 
    //  DESC: Handle the attack
    //
    evaluate()
    {
        if( this.state === defs.EAIS_INIT )
        {
            this.pickSpot();
            // The first shot waits until it has spread out to its spot (aiming steers it at the player)
            this.fireTime = genFunc.randomInt( gameDefs.PEST01_FIRST_SHOT_MIN, gameDefs.PEST01_FIRST_SHOT_MAX );
            this.state = defs.EAIS_ACTIVE;
        }

        if( this.state === defs.EAIS_ACTIVE )
        {
            this.repositionTime -= highResTimer.elapsedTime;
            if( this.repositionTime < 0 )
                this.pickSpot();

            // The spot in screen X (a camera stores its position negated), kept in from the sides of the screen,
            // and in the cruise band
            this._camX = this.data.playerCamera.pos.x;
            this._shipScreenX = genFunc.wrapDelta( this.data.playerShipSprite.pos.x + this._camX, gWrapSpan );
            this._screenX = genFunc.wrapDelta( this.sprite.pos.x + this._camX, gWrapSpan );
            this._limitX = settings.deviceRes_half.w - gameDefs.PEST01_SCREEN_MARGIN;
            this._spotX = Math.min( Math.max( this._shipScreenX + (Math.cos( this.spotAngle ) * this.spotDist), -this._limitX ), this._limitX );
            this._spotY = Math.min( Math.max( this.data.playerShipSprite.pos.y + (Math.sin( this.spotAngle ) * this.spotDist),
                gameDefs.PEST00_MIN_Y ), gameDefs.PEST00_MAX_Y );

            // Wanted velocity: toward the spot, slowing down near it, or straight at the player when a shot is due
            // (it shoots out of its nose, which faces the way it's flying), kept apart from the other members
            if( this.aiming() )
            {
                this._dx = this.shipDeltaX();
                this._dy = this.data.playerShipSprite.pos.y - this.sprite.pos.y;
                this._dist = Math.max( Math.sqrt( (this._dx * this._dx) + (this._dy * this._dy) ), 1 );
                this._wantX = this._dx / this._dist * gameDefs.PEST01_ATTACK_SPEED;
                this._wantY = this._dy / this._dist * gameDefs.PEST01_ATTACK_SPEED;
            }
            else
            {
                this.arriveAt( genFunc.wrapDelta( this._spotX - this._screenX, gWrapSpan ), this._spotY - this.sprite.pos.y,
                    gameDefs.PEST01_ATTACK_SPEED, gameDefs.PEST01_ARRIVE_RATE );
            }
            this.separate( gameDefs.PEST01_SEPARATION_DIST, gameDefs.PEST01_SEPARATION_SPEED );

            this.avoidShip( gameDefs.PEST01_SHIP_CLEAR_DIST, gameDefs.PEST01_SHIP_CLEAR_SPEED );

            this.steerVelocity( gameDefs.PEST01_ATTACK_ACCEL );
            this.moveByVelocity();
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

    scriptManager.set( 'AI_Pest01_Attack',
        ( nodeData, headNode, sprite ) => { return new AI_Pest01_Attack( nodeData, headNode, sprite ); } );
}
