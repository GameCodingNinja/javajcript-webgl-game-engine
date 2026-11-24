# pest01 Attack Plan (the Swarm)

The second **Pest**. A swarm of 6 small drones that ignores the buildings and, at first, the player too. Left alone, it drifts around as a flock for about a minute, then attacks anyway. Shoot one or fly into one sooner, and the swarm scatters (only once), regroups somewhere else on the map and then, as an angry flock, keeps away from the player for a while and makes an attack run past it, over and over. Members shoot at the player whenever they're in view.

All numbers below are starting values to tune in playtesting (`PEST01_*` in `gamedefs.js`).

## Attack cycle

```
Descend ──▶ Docile ── disturbed, or ~60 s ──▶ Scatter ──▶ Regroup ──▶ Avoid ──▶ Attack run ─┐
                                                                         ▲                  │
                                                                         └──────────────────┘
```

### Descend

- Spawns **above the screen**, `PEST01_SPAWN_DIST_MIN/MAX` (1500–3000 px) to either side of the player, off the screen, like pest00 (it used to spawn somewhere across the view, which put it right by the player), and drops down into the cruise band (the same band pest00 uses, `PEST00_MIN_Y`/`MAX_Y`, below the HUD strip) at `PEST01_DESCEND_SPEED` (250 px/s), easing out. Then it heads off to the side and starts wandering.
- Always **6 members** (`PEST01_MEMBERS`), spread around the swarm center.

### Docile

- The **swarm center** wanders between random waypoints in the cruise band fast, like it's hunting for something (`PEST01_WANDER_SPEED`, 450 px/s, turning at `PEST01_WANDER_TURN_RATE` 100 deg/s; it was 200 px/s, the user wanted it faster). It doesn't chase or avoid the player. It switches between **hovering** around the player's area (waypoints within `PEST01_WANDER_RANGE`, 1500 px of the player in X, for `PEST01_HOVER_TIME_MIN/MAX` 10–20 s) and **roaming** far (waypoints `PEST01_ROAM_STEP_MIN/MAX`, 1500–3500 px, on the way it's flying, for `PEST01_ROAM_TIME_MIN/MAX` 10–25 s, so it may lap the map) (`pickWaypoint()`, `updateRoamMode()`). So it isn't predictable, a new swarm starts hovering or roaming at random (`PEST01_HOVER_CHANCE` 0.5), a hover always times out into a roam, and a roam is followed by a hover or another roam at random. The hunting flock does the same while it avoids the player (the user wanted both to behave alike).
- The members fly as a **flock** (boids), like birds or a school of fish: each steers toward the middle of the others, matches their velocity, keeps apart from the ones too close (`PEST01_FLOCK_SEPARATION_DIST`, 65 px), parts around the player ship (`PEST01_FLOCK_SHIP_CLEAR_DIST`, 200 px, so it doesn't wander into a ship that's sitting still), and follows the wandering swarm center, with a slow wiggle of its own so it never flies dead straight. They're always moving (`PEST01_FLOCK_MIN_SPEED`–`MAX_SPEED`, 250–600 px/s, with a quick darting wiggle, `PEST01_FLOCK_WIGGLE` 500 at 150–300 deg/s, and following the center tightly so they don't string out), so the group stretches, bunches and flows around the turns. (A rigid turning ring and then a buzzing cloud of random darts were tried first; the user didn't like either.)
- **No shooting, no ramming.**
- Once it has descended, members that stray out of the cruise band turn back in (`turnIntoBand()`, in every phase: docile, scatter, regroup, hunting): a pull back in (`PEST01_BAND_PULL` 20 px/s/s per px out) plus a brake on their speed further out (`PEST01_BAND_DAMP` 3 per sec). Their sideways speed is untouched, so they curve back in rather than stop: about 90 px out at 600 px/s, back in within about 0.6 s. (It was a weak push, 8 with no brake and only while flocking, and they coasted about 200 px out for over a second; the user asked for tighter turns, no walls.) They may still swing out a little above or below the screen. (A hard stop at the HUD strip and then a smooth edge brake were tried; both looked like hitting an invisible wall, so the user had them removed, in every phase.)
- After `PEST01_ATTACK_TIME` (60 s) undisturbed, the swarm turns angry and attacks anyway, **without a scatter or regroup**: the members stay with the flock (Scatter skips itself, `gSwarm.skipScatter`) and it starts the hunting cycle with an attack run. (It used to fly off and be removed, then to scatter, which looked like scattering for no reason; both changed by the user.)

### Disturbed

Any of these disturbs the whole swarm (`disturbSwarm()`, sets `gSwarm.disturbed`):

- A player shot hits a member (that member dies; one hit kills).
- The player ship collides with a member (see "Fighting it").
- `PEST01_ATTACK_TIME` (60 s) passes while it's still docile (no scatter then, see Docile).

It scatters **only once** (the user's rule). After that a hit just kills the member and the flock keeps hunting.

### Scatter

- Every member bursts outward from the swarm center for about a second (`PEST01_SCATTER_TIME`, `PEST01_SCATTER_SPEED`), so the swarm visibly breaks apart. Members turn angry (frame 1) here and start shooting at the player while in view (the user's ask).

### Regroup

- The first member to finish its scatter picks a **regroup point somewhere else on the map**: `PEST01_REGROUP_DIST_MIN/MAX` (1800–2800 px) from the player in X, on the side the swarm was on, so it's off the screen, at a random Y in the cruise band (`pickRegroupPoint()`). The swarm center waits there.
- Each member flies there **on its own** (velocity steering at up to `PEST01_REGROUP_SPEED` 750 px/s, a bit faster than the ship (it was 600, the user wanted it faster), `PEST01_REGROUP_ACCEL`, slowing near it at `PEST01_ARRIVE_RATE`), kept apart from the others (`PEST01_SEPARATION_DIST`/`SPEED`) and clear of the ship (`PEST01_SHIP_CLEAR_DIST`/`SPEED`). The player can boost to chase the stragglers and pick them off.
- Within `PEST01_REGROUP_JOIN_DIST` (150 px) of the point it joins the flock (`sprite.regrouped`) and flies with the same flocking as the docile swarm (`flock()`).
- Once every living member has joined (or after `PEST01_REGROUP_MAX_TIME`, 8 s), the flock starts its hunting cycle. A late straggler keeps flying to the moving center until it joins.

### Hunting cycle (the user's design)

The swarm center runs the cycle (`huntTarget()`, called from `updateSwarm()`), so the whole flock switches together; the members just flock and shoot.

- **Avoid:** for `PEST01_AVOID_TIME_MIN/MAX` (8–15 s) the flock hovers and roams just like the docile swarm (see Docile; it may hover near the player, roam far and lap the map), but goes on away from the player when chased (`pickWaypoint()`), at `PEST01_WANDER_SPEED`. Hovering near the player often brings it within `PEST01_CATCH_DIST`, which sets off the attack run sooner.
- **Attack run:** then the center flies at the player at `PEST01_RUN_SPEED` (700 px/s, was 550; the members fly up to `PEST01_FAST_FLOCK_MAX_SPEED` 950 while the center is faster than the wander speed, so they keep up), turning at `PEST01_RUN_TURN_RATE` (180 deg/s), aiming to pass `PEST01_RUN_OFFSET_Y` (150 px) above or below it (random, kept in the cruise band). Once past, it carries on the same way at `PEST01_FLEE_SPEED` (800 px/s, faster than the ship's 720) until `PEST01_RUN_PAST_DIST` (900 px) past the player, then avoids again. It gives up after `PEST01_RUN_MAX_TIME` (12 s; it may start half the map away), for a player flying away from it.
- **Chasing it:** the player can go after it while it's avoiding. Chased, it flees at `PEST01_FLEE_SPEED` (800 px/s) to a waypoint farther from the player, so the player needs boost to catch it (the user's ask: at 450 it was easy to catch without boost).
- **Evading (circling back):** chased for `PEST01_EVADE_TIME_MIN/MAX` (1.5–3 s), it circles back around the player: an attack run, a tight loop (`PEST01_RUN_TURN_RATE` 180 deg/s) up or down past the player, shooting, then fleeing the other way at `PEST01_FLEE_SPEED`, so the player has to turn around. Chase it again and it circles back again. "Chased" means within `PEST01_CHASE_DIST` (1200 px in X) and flying toward it at `PEST01_CHASE_MIN_SPEED` (300 px/s) or more, so a player just sitting nearby doesn't set it off.
- **Zigzag:** whenever it flees at `PEST01_FLEE_SPEED` (past the player on a run, or chased while avoiding) the center also weaves: it jinks up or down `PEST01_JINK_ANGLE_MIN/MAX` (25–50°) off its course every `PEST01_JINK_TIME_MIN/MAX` (0.5–1.1 s), turning at `PEST01_FLEE_TURN_RATE` (220 deg/s), mostly flipping each time (`PEST01_JINK_FLIP_CHANCE` 0.7), always back toward the middle within `PEST01_JINK_EDGE` of the edge of its band, and flipping right away at the edge, so it zigzags instead of sliding along it (`evade()`). The members follow it, so the whole flock weaves.
- The flock still parts around the ship (`PEST01_FLOCK_SHIP_CLEAR_DIST`), so a run is a pass, not a ram.
- It hunts until every member is killed.

(Rejected: the first attack design, each member taking its own spot around the player and shooting; and scattering again on every hit.)

## Shooting (primary attack)

- **Only once disturbed.** Each angry member fires `pest01_shot` on its own staggered timer (`PEST01_FIRE_INTERVAL_MIN/MAX`, about 1.5–3 s, the first one `PEST01_FIRST_SHOT_MIN/MAX`, 0.3–1.2 s, after the scatter starts), in every angry phase (scatter, regroup, avoid, attack run). The first shot used to wait 2.5–5 s, so they had left the view before they could shoot while regrouping; the user wants them to fire at the player while regrouping in view.
- Fires only while the member is in view (`camera.inViewWrapped`) and the player is alive (`playerShipSprite.collisionComponent.enable`).
- **Aimed straight at the player** from wherever the member is, whichever way it faces (`shoot()`); it keeps flying with the flock or to the regroup point. (Shooting only out of its nose was tried first, by turning in place and then by steering at the player to line up; neither looked good, so the user dropped it.)
- **Straight bolt** from `PEST01_SHOT_OFFSET` (19 px, the edge of the hull at scale 0.25) out from the member's center toward the player, at `PEST01_SHOT_SPEED` (550 px/s) plus the member's speed toward the player when it fires (only that part, so the aim stays true: the flock flies about as fast as the bolt, and a member flying at the player used to keep up with its own bolt), rotated to face its flight (the art points right).
- Recycled after it has flown a screen width or when it leaves the view vertically, wraps like the other enemy shots, and checks against the ship with `checkForCollision( nodeAry, playerShipSprite.shieldOn )` so the shield stops it.
- **Damage:** `PEST01_SHOT_DAMAGE` 5.

## Fighting it

- **One hit kills** a member, docile or angry. Each member is worth `PEST01_SHIP_HIT_VALUE` (1) point. Killing all 6 adds `PEST01_SWARM_BONUS` (3).
- **Collision with the ship** (docile or angry): disturbs the swarm if it's still docile, damages the player `PEST01_RAM_DAMAGE` (15, the same as every ram), and the member dies (explosion via `playerHitEffect()`).
- **Shield:** a bolt on the shield does its hit with the impact sound and no damage. A member flying into the shield dies with the impact sound and no damage, and still disturbs the swarm.

## Spawning (the Pest group)

- pest00 and pest01 are the **Pest group** and share one spawn timer, `pestSpawnTimer` (`PEST_LEVEL_THRESHOLD` 2, 20–50 s).
- When it expires it picks **pest00 or the swarm at random**, but after 2 of the same one in a row (`MAX_PEST_STREAK`) the other one comes next, like the mini-bosses.
- **One pest at a time:** nothing spawns while pest00 or any live swarm member is out (`countPests()`). The timer restarts with a new 20–50 s when pest00 dies, or once the swarm is gone, all killed (`handleEnemySpawn()` checks `countPest01()` while `swarmActive` is set).
- **Boss and mini-boss battles:** the existing rule covers the whole group (none spawn during them until level 15, `PEST_BATTLE_SPAWN_LEVEL`).
- The wreck00 spawn check subtracts the live pests (`countPests()`, which replaced `countPest00()`), so swarm members don't use up wreck00 slots.

## Sound

- Shot: the `pest01_shot` playlist (`enemySound.lst`, one of three laser shots at random).
- Hit and death: the enemy explosion, like wreck00 and pest00.
- Later: a sound when the swarm is disturbed, when you have one.

## Art

Provided and already in `level1DataList.lst` and the sprite sheet:

- **Ship:** `pest01_ship` (`pest01-0.png` passive, `pest01-1.png` angry, 150×107, nose points right; collision circle radius 70 in art pixels, filter `0x2/0x1`). Frame 0 while docile, frame 1 from the scatter on, and on a member that's shot or rammed as it falls (`Pest01Ship_Die`). `<scale x="0.25" y="0.25"/>` in its strategy node, about 38×27 on screen. Each member turns its nose toward the way it's flying (`PEST01_TURN_RATE`, 540 deg/s), and may fly upside down going left. (The first art was a round drone that spun; the user replaced it.)
- **Shot:** `pest01_shot` (`pest01_projectile.png`, 18×3, a thin bolt, points right, 2-point collision line at its ends, x ±9).

## How it's built

It follows the "Adding a New Enemy or Boss" checklist in AGENTS.md:

1. **Art:** done (objects in `level1DataList.lst`, sprite sheet regenerated).
2. **Ids:** `PEST01_SHIP_ID` (-9) and `PEST01_SHOT_ID` (-10) in `gamedefs.js`.
3. **Strategy nodes:**
   - `pest01_ship` in `enemy.strategy` with `ai_*`, `hit` (reuses `Wreck00Ship_Hit`), `die` and `collision="EnemyShip_CheckForCollideWithPlayer"` scripts. A single node with no children, created 6 times per swarm.
   - `pest01_shot` in `enemyshot.strategy` with `shoot` and `hit` (reuses `Wreck00Shot_Hit`) scripts.
4. **AI tree:** `data/objects/ai/pest01.ai`: Docile (ends when disturbed or after `PEST01_ATTACK_TIME`), Scatter (skipped after the timeout), then Hunt (regroup, then the hunting cycle), which never ends. Bundled with `raw-loader` and listed in the `aiManager.loadFromXml([...])` array in `level1state.js`.
5. **AI scripts:** `source/scripts/pest01aiscripts.js` (`AI_Pest01_*`).
   - **Swarm object:** one preallocated module object, `gSwarm` (one swarm at a time): center x/y and velocity, wander target, `disturbed`, regroup state (`regroupPicked`/`regrouping`/`regroupTime`), hunting state (`attackRun`, `passed`, `runDir`, `runOffsetY`, `modeTime`, `avoidTime`), age, members. Each member sprite keeps `sprite.slot` (0–5) and `sprite.swarmAlive`, set at spawn.
   - Per-member state on its sprite, set in Docile's `init()`, Scatter's init and `addMember()`: `slot`, `swarmAlive`, `vx`/`vy` (px/s), `faceAngle`, `wiggleAngle`/`wiggleRate`, `regrouped`.
   - The swarm center is advanced once a frame by whichever member's Docile or Hunt leaf runs first (frame token `highResTimer.lastTime`), not by every member.
   - Its own steering, not pest00's helpers: the members are velocity-steered (`vx`/`vy` toward a wanted velocity, limited by `PEST01_FLOCK_ACCEL` or `PEST01_REGROUP_ACCEL`), which suits a hovering drone (it turns its nose toward the way it's flying, `face()`, at `PEST01_TURN_RATE`), while pest00 flies along a heading. It reuses pest00's cruise band constants (`PEST00_MIN_Y`/`MAX_Y`/`VIEW_TOP`).
6. **Die and shot scripts:** `source/scripts/pest01scripts.js` (`Pest01Ship_Die`, `Pest01Shot_Fire`).
7. **Register and clean up:** `loadScripts()` in `startupstate.js`. Uses the shared `gAIData` (`aidata.js`); `pest01aiscripts.clearSwarm()` resets `gSwarm` in `restartGame()` and `cleanUp()`.
8. **Collisions** in `collisionCallBack()`:
   - pest01 shot hits the ship (−5 unless shielded).
   - pest01 collides with the ship (disturb, −15 unless shielded, member dies, own ram cooldown not needed since it dies).
   - Player shot hits pest01 (disturb, die, score, swarm bonus on the last one).
9. **Spawning:** the Pest group timer described above, paused with the other spawn timers for the start menu, pause menu and game over.
10. **AGENTS.md:** pest01 in the "Which Entities Wrap" table and its behavior described.

No allocations during play: the swarm object and member slots are preallocated, temporaries live in `this._` variables, and easing functions are cached.
