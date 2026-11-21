# pest01 Attack Plan (the Swarm)

The second **Pest**. A swarm of 5 small drones that ignores the buildings and, at first, the player too. Left alone, it drifts around in formation and flies off after about a minute, so the player can avoid it forever. Shoot one or fly into one, and the swarm breaks apart and every member goes after the player on its own, shooting.

All numbers below are starting values to tune in playtesting (`PEST01_*` in `gamedefs.js`).

## Attack cycle

```
Arrive ──▶ Docile (blue) ──── disturbed ────▶ Scatter ──▶ Attack (red) until killed
               │
               └── ~60 s undisturbed ──▶ Leave (flies off, removed)
```

### Arrive

- Spawns off the screen, `PEST00_SPAWN_DIST_MIN/MAX`-style distance from the player, in the cruise band (the same band pest00 uses, `PEST00_MIN_Y`/`MAX_Y`, below the HUD strip).
- Always **5 members** (`PEST01_MEMBERS`), already in formation around the swarm center.

### Docile (blue, frame 0)

- The **swarm center** wanders between random waypoints in the cruise band at a slow speed (`PEST01_WANDER_SPEED`, about 200 px/s). It doesn't chase or avoid the player.
- The members sit in a **ring** around the center (`PEST01_RING_RADIUS`, about 70 px). The ring turns slowly (`PEST01_RING_SPIN`) and each member eases toward its slot, bobbing a little, so the group looks alive instead of rigid.
- **No shooting, no ramming.**
- After `PEST01_LEAVE_TIME` (60 s) undisturbed, the swarm flies off the screen (sideways, away from the player) and is removed once it's out of view. The pest spawn timer then starts over.

### Disturbed

Any of these disturbs the whole swarm (`swarm.disturbed = true`):

- A player shot hits a member (that member dies; one hit kills).
- The player ship collides with a member (see "Fighting it").

### Scatter

- Every member turns **red** (frame 1) and bursts outward from the swarm center for about half a second (`PEST01_SCATTER_TIME`, `PEST01_SCATTER_SPEED`), so the swarm visibly breaks apart.

### Attack (red, frame 1)

- Each member picks its **own spot around the player**: a random angle and distance (`PEST01_ATTACK_DIST_MIN/MAX`, about 250–450 px), kept in the cruise band and in view when it can be.
- It flies there with pest00-style steering (always flying forward, limited turn rate, acceleration), so its paths are curves.
- It picks a new spot every `PEST01_REPOSITION_MIN/MAX` (2–4 s), or right away when the player moves far from the old one.
- **Separation:** members push away from each other within `PEST01_SEPARATION_DIST` (about 80 px), so they don't bunch up into one target.
- **Ship clearance:** like pest00's `avoidShip()`, they bend away from the ship when close. Shooting is their attack, not ramming.
- **Speed:** a bit slower than the ship (`PEST01_ATTACK_SPEED`), so the player can boost away from them, but they keep coming (wrap-aware, X wrapped after every move).
- They stay aggressive until killed. They never calm down or leave.

## Shooting (primary attack)

- **Only once disturbed.** Each red member fires `pest01_shot` on its own staggered timer (`PEST01_FIRE_INTERVAL_MIN/MAX`, about 1.5–3 s, first shot at a random point in that range so the 5 don't fire together).
- Fires only while the member is in view (`camera.inViewWrapped`) and the player is alive (`playerShipSprite.collisionComponent.enable`).
- **Straight bolt**, aimed at the player with a small random spread (`PEST01_SHOT_SPREAD`), at `PEST01_SHOT_SPEED` (about 700 px/s). Rotated to face its direction (the art points right, `Math.atan2(dy, dx)`).
- Recycled after `PEST01_SHOT_LIFETIME` or when it leaves the view vertically, wraps like the other enemy shots, and checks against the ship with `checkForCollision( nodeAry, playerShipSprite.shieldOn )` so the shield stops it.
- **Damage:** `PEST01_SHOT_DAMAGE` 5.

## Fighting it

- **One hit kills** a member, blue or red. Each member is worth `PEST01_SHIP_HIT_VALUE` (1) point. Killing all 5 adds `PEST01_SWARM_BONUS` (3).
- **Collision with the ship** (blue or red): disturbs the swarm if it's still docile, damages the player `PEST01_RAM_DAMAGE` (15, the same as every ram), and the member dies (explosion via `playerHitEffect()`).
- **Shield:** a bolt on the shield does its hit with the impact sound and no damage. A member flying into the shield dies with the impact sound and no damage, and still disturbs the swarm.

## Spawning (the Pest group)

- pest00 and pest01 are the **Pest group** and share one spawn timer, today's `pest00SpawnTimer` renamed `pestSpawnTimer` (`PEST_LEVEL_THRESHOLD` 2, 20–50 s).
- When it expires it picks **pest00 or the swarm at random**.
- **One pest at a time:** nothing spawns while pest00 or any live swarm member is out (`isPestActive()`). The timer restarts with a new 20–50 s when pest00 dies, when the last swarm member dies, or when the swarm leaves.
- **Boss and mini-boss battles:** the existing rule covers the whole group (none spawn during them until level 15, `PEST_BATTLE_SPAWN_LEVEL`).
- The wreck00 spawn check subtracts the live pests (`countPests()`, replacing `countPest00()`), so swarm members don't use up wreck00 slots.

## Sound

- Shot: `wreck00_gun` for now.
- Hit and death: the enemy explosion, like wreck00 and pest00.
- Later: a sound when the swarm is disturbed, when you have one.

## Art

Provided and already in `level1DataList.lst` and the sprite sheet:

- **Ship:** `pest01_ship` (`pest01-0.png` blue/docile, `pest01-1.png` red/aggressive, 150×150, looks the same from every side; collision circle radius 70 in art pixels, filter `0x2/0x1`). `<scale x="0.35" y="0.35"/>` in its strategy node, about 52×52 on screen like wreck00. It spins slowly while docile and faster while attacking.
- **Shot:** `pest01_shot` (`pest01_projectile.png`, 23×9, points right, 2-point collision line).

## How it's built

It follows the "Adding a New Enemy or Boss" checklist in AGENTS.md:

1. **Art:** done (objects in `level1DataList.lst`, sprite sheet regenerated).
2. **Ids:** `PEST01_SHIP_ID` and `PEST01_SHOT_ID` in `gamedefs.js` (next free negative ids).
3. **Strategy nodes:**
   - `pest01_ship` in `enemy.strategy` with `ai_*`, `hit` (reuses `Wreck00Ship_Hit`), `die` and `collision="EnemyShip_CheckForCollideWithPlayer"` scripts. A single node with no children, created 5 times per swarm.
   - `pest01_shot` in `enemyshot.strategy` with `shoot` and `hit` (reuses `Wreck00Shot_Hit`) scripts.
4. **AI tree:** `data/objects/ai/pest01.ai`: Arrive, Docile (ends on disturbed; on leave time it flies off and recycles itself), Scatter, then a repeater over Attack. Listed in `aiListTable.json` and the `aiManager.loadFromXml([...])` list in `level1state.js`.
5. **AI scripts:** `source/scripts/pest01aiscripts.js` (`AI_Pest01_*`).
   - **Swarm object:** one preallocated object in `ai_data` (one swarm at a time): center x/y, wander target, ring angle, `disturbed`, leave timer, live member count. Each member sprite keeps `sprite.swarm` and `sprite.slot` (0–4), set at spawn.
   - Per-member state on its sprite, reset in Arrive's `init()`: `heading`, `speed`, `fireTime`, `attackX/Y`, `repositionTime`.
   - The swarm center is advanced once per frame by member 0's leaf (or the first live member), not by every member.
   - Steering helpers (`faceAngle`, `approachSpeed`, `moveForward`, band limit, ship avoidance) are shared with pest00: move them from `pest00aiscripts.js` into a small shared module instead of copying them.
6. **Die and shot scripts:** `source/scripts/pest01scripts.js` (`Pest01Ship_Die`, `Pest01Shot_Fire`).
7. **Register and clean up:** `loadScripts()` in `startupstate.js`; `clearAIData()` in `restartGame()` and `cleanUp()`.
8. **Collisions** in `collisionCallBack()`:
   - pest01 shot hits the ship (−5 unless shielded).
   - pest01 collides with the ship (disturb, −15 unless shielded, member dies, own ram cooldown not needed since it dies).
   - Player shot hits pest01 (disturb, die, score, swarm bonus on the last one).
9. **Spawning:** the Pest group timer described above, paused with the other spawn timers for the start menu, pause menu and game over.
10. **AGENTS.md:** pest01 in the "Which Entities Wrap" table and its behavior described.

No allocations during play: the swarm object and member slots are preallocated, temporaries live in `this._` variables, and easing functions are cached.
