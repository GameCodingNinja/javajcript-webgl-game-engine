# pest01 Attack Plan (the Swarm)

The second **Pest**. A swarm of 6 small drones that ignores the buildings and, at first, the player too. Left alone, it drifts around as a flock for about a minute, then attacks anyway. Shoot one or fly into one sooner, and the swarm breaks apart and every member goes after the player on its own, shooting.

All numbers below are starting values to tune in playtesting (`PEST01_*` in `gamedefs.js`).

## Attack cycle

```
Descend ──▶ Docile ──── disturbed, or ~60 s ────▶ Scatter ──▶ Attack until killed
```

### Descend

- Spawns **above the screen**, at an X somewhere across the view but at least `PEST01_SPAWN_CLEAR_X` (300 px) to the side of the player ship, so it doesn't come down on the ship, and drops down into the cruise band (the same band pest00 uses, `PEST00_MIN_Y`/`MAX_Y`, below the HUD strip) at `PEST01_DESCEND_SPEED` (250 px/s), easing out. Then it heads off to the side and starts wandering.
- Always **6 members** (`PEST01_MEMBERS`), spread around the swarm center.

### Docile

- The **swarm center** wanders between random waypoints in the cruise band at a slow speed (`PEST01_WANDER_SPEED`, about 200 px/s). It doesn't chase or avoid the player.
- The members fly as a **flock** (boids), like birds or a school of fish: each steers toward the middle of the others, matches their velocity, keeps apart from the ones too close (`PEST01_FLOCK_SEPARATION_DIST`, 65 px), parts around the player ship (`PEST01_FLOCK_SHIP_CLEAR_DIST`, 200 px, so it doesn't wander into a ship that's sitting still), and follows the wandering swarm center, with a slow wiggle of its own so it never flies dead straight. They're always moving (`PEST01_FLOCK_MIN_SPEED`–`MAX_SPEED`, 120–330 px/s), so the group stretches, bunches and flows around the turns. (A rigid turning ring and then a buzzing cloud of random darts were tried first; the user didn't like either.)
- **No shooting, no ramming.**
- Once it has descended, members that stray out of the cruise band are pushed back in (`PEST01_FLOCK_BAND`), and they brake smoothly before the HUD strip at the top and the bottom of the screen (`PEST01_FLOCK_EDGE_BRAKE`, stopping `PEST01_FLOCK_EDGE_GAP` short), so they don't disappear under the HUD and radar or hit against them.
- After `PEST01_ATTACK_TIME` (60 s) undisturbed, the swarm breaks off into attack mode anyway (it used to fly off and be removed; changed by the user).

### Disturbed

Any of these disturbs the whole swarm (`gSwarm.disturbed = true`):

- A player shot hits a member (that member dies; one hit kills).
- The player ship collides with a member (see "Fighting it").
- `PEST01_ATTACK_TIME` (60 s) passes.

### Scatter

- Every member bursts outward from the swarm center for about a second (`PEST01_SCATTER_TIME`, `PEST01_SCATTER_SPEED`), so the swarm visibly breaks apart.

### Attack

- Each member picks its **own spot around the player**, in its own sector (a sixth of the circle by its slot, give or take `PEST01_SPOT_JITTER` 25°, rotated at random per swarm) so they spread out around the player, at a random distance (`PEST01_ATTACK_DIST_MIN/MAX`, about 250–450 px), kept in the cruise band and in view when it can be.
- It flies there by velocity steering (a wanted velocity toward the spot, slowing near it, with the velocity changing at up to `PEST01_ATTACK_ACCEL`), like a hovering drone.
- It picks a new spot every `PEST01_REPOSITION_MIN/MAX` (2–4 s), or right away when the player moves far from the old one.
- **Separation:** members push away from each other within `PEST01_SEPARATION_DIST` (about 80 px), so they don't bunch up into one target.
- **Ship clearance:** like pest00's `avoidShip()`, they bend away from the ship when close. Shooting is their attack, not ramming.
- **Speed:** a bit slower than the ship (`PEST01_ATTACK_SPEED`), so the player can boost away from them, but they keep coming (wrap-aware, X wrapped after every move).
- They stay aggressive until killed. They never calm down or leave.

## Shooting (primary attack)

- **Only once disturbed.** Each attacking member fires `pest01_shot` on its own staggered timer (`PEST01_FIRE_INTERVAL_MIN/MAX`, about 1.5–3 s, the first one only after `PEST01_FIRST_SHOT_MIN/MAX`, 2.5–5 s, so they disperse to their spots before any of them steers at the player).
- Fires only while the member is in view (`camera.inViewWrapped`) and the player is alive (`playerShipSprite.collisionComponent.enable`).
- **Only straight out of its nose**, which always faces the way it's flying (the user's rule): `PEST01_AIM_TIME` (800 ms) before a shot is due it **steers toward the player** instead of its spot (`aiming()`; it still keeps clear of the ship), fires once its nose is lined up within `PEST01_FIRE_ALIGN` (6°), and gives up on the shot if it can't line up within `PEST01_AIM_MAX_WAIT` (1.5 s) after it was due. (Turning in place to aim was tried first; the user wanted it to steer.)
- **Straight bolt** from `PEST01_SHOT_OFFSET` (26 px, the nose tip) out along the nose, at `PEST01_SHOT_SPEED` (550 px/s), rotated to face its flight (the art points right).
- Recycled after it has flown a screen width or when it leaves the view vertically, wraps like the other enemy shots, and checks against the ship with `checkForCollision( nodeAry, playerShipSprite.shieldOn )` so the shield stops it.
- **Damage:** `PEST01_SHOT_DAMAGE` 5.

## Fighting it

- **One hit kills** a member, docile or attacking. Each member is worth `PEST01_SHIP_HIT_VALUE` (1) point. Killing all 6 adds `PEST01_SWARM_BONUS` (3).
- **Collision with the ship** (docile or attacking): disturbs the swarm if it's still docile, damages the player `PEST01_RAM_DAMAGE` (15, the same as every ram), and the member dies (explosion via `playerHitEffect()`).
- **Shield:** a bolt on the shield does its hit with the impact sound and no damage. A member flying into the shield dies with the impact sound and no damage, and still disturbs the swarm.

## Spawning (the Pest group)

- pest00 and pest01 are the **Pest group** and share one spawn timer, `pestSpawnTimer` (`PEST_LEVEL_THRESHOLD` 2, 20–50 s).
- When it expires it picks **pest00 or the swarm at random**, but after 2 of the same one in a row (`MAX_PEST_STREAK`) the other one comes next, like the mini-bosses.
- **One pest at a time:** nothing spawns while pest00 or any live swarm member is out (`countPests()`). The timer restarts with a new 20–50 s when pest00 dies, or once the swarm is gone, all killed (`handleEnemySpawn()` checks `countPest01()` while `swarmActive` is set).
- **Boss and mini-boss battles:** the existing rule covers the whole group (none spawn during them until level 15, `PEST_BATTLE_SPAWN_LEVEL`).
- The wreck00 spawn check subtracts the live pests (`countPests()`, which replaced `countPest00()`), so swarm members don't use up wreck00 slots.

## Sound

- Shot: `wreck00_gun` for now.
- Hit and death: the enemy explosion, like wreck00 and pest00.
- Later: a sound when the swarm is disturbed, when you have one.

## Art

Provided and already in `level1DataList.lst` and the sprite sheet:

- **Ship:** `pest01_ship` (`pest01-0.png` passive, `pest01-1.png` angry, 150×108, nose points right; collision circle radius 70 in art pixels, filter `0x2/0x1`). Frame 0 while docile, frame 1 from the scatter on, and on a member that's shot or rammed as it falls (`Pest01Ship_Die`). `<scale x="0.35" y="0.35"/>` in its strategy node, about 53×38 on screen. Each member turns its nose toward the way it's flying (`PEST01_TURN_RATE`, 540 deg/s), and may fly upside down going left. (The first art was a round drone that spun; the user replaced it.)
- **Shot:** `pest01_shot` (`pest01_projectile.png`, 23×9, points right, 2-point collision line).

## How it's built

It follows the "Adding a New Enemy or Boss" checklist in AGENTS.md:

1. **Art:** done (objects in `level1DataList.lst`, sprite sheet regenerated).
2. **Ids:** `PEST01_SHIP_ID` (-9) and `PEST01_SHOT_ID` (-10) in `gamedefs.js`.
3. **Strategy nodes:**
   - `pest01_ship` in `enemy.strategy` with `ai_*`, `hit` (reuses `Wreck00Ship_Hit`), `die` and `collision="EnemyShip_CheckForCollideWithPlayer"` scripts. A single node with no children, created 6 times per swarm.
   - `pest01_shot` in `enemyshot.strategy` with `shoot` and `hit` (reuses `Wreck00Shot_Hit`) scripts.
4. **AI tree:** `data/objects/ai/pest01.ai`: Docile (ends when disturbed or after `PEST01_ATTACK_TIME`), Scatter, then Attack, which never ends. Listed in `aiListTable.json` and the `aiManager.loadFromXml([...])` list in `level1state.js`.
5. **AI scripts:** `source/scripts/pest01aiscripts.js` (`AI_Pest01_*`).
   - **Swarm object:** one preallocated module object, `gSwarm` (one swarm at a time): center x/y and velocity, wander target, `disturbed`, age, members. Each member sprite keeps `sprite.slot` (0–5) and `sprite.swarmAlive`, set at spawn.
   - Per-member state on its sprite, set in Docile's `init()` and `addMember()`: `slot`, `swarmAlive`, `spinAngle`, `bobPhase`, `vx`/`vy` (px/s).
   - The swarm center is advanced once a frame by whichever member's Docile leaf runs first (frame token `highResTimer.lastTime`), not by every member.
   - Its own steering, not pest00's helpers: the members are velocity-steered (`vx`/`vy` toward a wanted velocity, limited by `PEST01_ATTACK_ACCEL`), which suits a hovering drone (it turns its nose toward the way it's flying, `face()`, at `PEST01_TURN_RATE`), while pest00 flies along a heading. It reuses pest00's cruise band constants (`PEST00_MIN_Y`/`MAX_Y`/`VIEW_TOP`).
6. **Die and shot scripts:** `source/scripts/pest01scripts.js` (`Pest01Ship_Die`, `Pest01Shot_Fire`).
7. **Register and clean up:** `loadScripts()` in `startupstate.js`; `clearAIData()` in `restartGame()` and `cleanUp()`.
8. **Collisions** in `collisionCallBack()`:
   - pest01 shot hits the ship (−5 unless shielded).
   - pest01 collides with the ship (disturb, −15 unless shielded, member dies, own ram cooldown not needed since it dies).
   - Player shot hits pest01 (disturb, die, score, swarm bonus on the last one).
9. **Spawning:** the Pest group timer described above, paused with the other spawn timers for the start menu, pause menu and game over.
10. **AGENTS.md:** pest01 in the "Which Entities Wrap" table and its behavior described.

No allocations during play: the swarm object and member slots are preallocated, temporaries live in `this._` variables, and easing functions are cached.
