# Boss00 Missile Plan

## Goal
While the boss is **beaming a building**, and the boss and player are both in view, the boss fires a missile at the player **about once a second**.
- The missile uses the `boss_shot` object (`missile-0` / `missile-1` frames) and **cycles between the two frames** while flying.
- The art points **right**, so the missile is **rotated to face the direction it's moving**.
- The missile flies a **sharp zig-zag with hard turns**, like an unstable rocket, but still homes in and hits its mark. This is for entertainment.

`boss_shot` is already in `level1DataList.lst` and the sprite sheet has been regenerated. Its collision is a 2-point line (±18, 0) using `radiusFromVisual`. Collision points are transformed by the sprite matrix, so they rotate with the missile automatically.

## Decisions
| # | Question | Answer |
|---|---|---|
| 1 | Flight style | ~~Sharp zig-zag~~, ~~wild swirl~~ (both removed). **Shoot up or down from either side of the boss, then curve to the player.** See "M4 revised" below. |
| 2 | When to fire | **Only while beaming** (DestroyBuilding, `destroying` phase) |
| 3 | Can the player shoot missiles down? | **No** |
| 4 | Damage | **30** |
| 5 | Sound | **None for now.** Wait for new audio. |

---

## How it fits the existing code
Copy the enemy00 shot pattern; it already handles everything this needs:
- **Strategy:** missiles go in the `_enemy_shot_` strategy (`enemyshot.strategy`). `Level1State` already updates, transforms, and renders it, including the wrap-around camera and radar passes. Because it isn't in `_player_ship_`, missiles aren't shifted when the player wraps.
- **Firing:** enemy00's `shootPlayer()` / `inViewWithWrap()` in `enemy00aiscripts.js` create the shot with `enemyShotStrategy.create(...)` and `prepare('shoot', shot, enemySprite)`.
- **Flight script:** `Enemy00Ship_Shoot` in `enemy00scripts.js` moves the shot, wraps it, calls `checkForCollision(playerShipStrategy.nodeAry)`, and recycles itself when it's done.
- **Hit:** the player-ship branch of `collisionCallBack()` in `level1state.js` damages the player and calls the shot's `hit` script, which recycles it.

---

## Changes

### 1. New userId — `source/state/gamedefs.js`
- `BOSS00_SHOT_ID = -21`. The missile needs its own id: the enemy00 shot branch decides damage by `frameIndex`, which would be wrong for an animated missile.

### 2. Strategy node — `data/objects/strategy/level1/enemyshot.strategy`
```xml
<node name="boss_shot" id="-21">
    <sprite objectName="boss_shot">
        <scriptList>
            <script shoot="Boss00Shot_Fire"/>
            <script hit="Boss00Shot_Hit"/>
        </scriptList>
    </sprite>
</node>
```

### 3. Firing (only while beaming) — `source/scripts/boss00aiscripts.js`
Add to `AI_Boss00_base`:
- `inViewWithWrap( transPos, radius )`, the same as enemy00 (uses a module-level `gTempWrapPoint`, so no GC).
- `shootPlayer()`:
  - Only fires when the player is alive (`playerShipSprite.collisionComponent.enable`, same as enemy00).
  - Counts down `sprite.shootTime` by `highResTimer.elapsedTime`.
  - When the countdown reaches zero **and** the boss is in view (`inViewWithWrap` against the player camera): create `boss_shot`, `prepare('shoot', shot, this.sprite)`, and reset `shootTime` to `BOSS00_FIRE_INTERVAL` ± a random `BOSS00_FIRE_JITTER`. That gives "about once a second" without a mechanical rhythm.
  - No sound for now (decision 5).

Call it **only** from `AI_Boss00_DestroyBuilding.evaluate()`:
- In the `!this.started` block (when the beam appears), set `sprite.shootTime = BOSS00_FIRE_INTERVAL`, so the first missile comes about a second after the beam shows.
- In the `destroying` phase, when not interrupted (beam widening **and** destroy countdown), call `this.shootPlayer()`.
- No firing in `retracting` or `interrupted`, or in Descend / PickAndMoveToBuilding.

Head `init()`: cache `this.data.enemyShotStrategy` and `this.data.camera = playerShipStrategy.camera`.

Firing stops automatically when the boss dies, because `Boss00Ship_Die` already removes `AI_Boss00`. Missiles already in the air keep flying.

### 4. Missile scripts — `source/scripts/boss00scripts.js`

#### `Boss00Shot_Fire( sprite, bossSprite )`: flight script with a sharp zig-zag
All state is pre-allocated in the constructor and reset in `recycle()`, so there's no GC.

**Idea:** the missile keeps a hidden **aim heading** that homes in on the player. It actually flies along that heading **kicked off to one side** by a random angle. Each kick lasts a short random time, then it **snaps** to the other side: an instant hard turn, with the sprite rotation snapping too. Because the kicks alternate sides and the aim keeps homing, the zig-zags cancel out on average and the missile still hits. Near the player the kick angle shrinks, so the last stretch lines up for the hit.

`recycle()`:
- Start the missile at the **center of the boss**: `setPos( bossSprite.pos )` (the null head sprite's position is the boss center). `_enemy_shot_` renders after `_enemy_`, so the missile draws on top of the boss body as it launches out of it.
- Set the aim angle toward the player, using the wrap-aware shortest X delta (same as `Enemy00Ship_Shoot`).
- `zigSide` = random ±1. Pick the first kick (angle + duration, see below).
- Reset the frame-toggle timer, `setFrame(0)`, `age = 0`, and set the rotation from the flight angle.

Each frame, with `dt = highResTimer.elapsedTime` (ms), so everything is frame-rate independent:
1. **Home the aim:** turn the aim angle toward the player's current position (wrap-aware delta), at most `BOSS00_MISSILE_TURN_RATE` deg/sec. Use the shortest angular difference, normalized to −π..π.
2. **Zig-zag timer:** `zigTime -= dt`. At 0, a **hard turn**: `zigSide = -zigSide`, then pick a new kick:
   - `zigAngle` = random between `BOSS00_MISSILE_ZIG_ANGLE_MIN`..`MAX` (degrees),
   - `zigTime` = random between `BOSS00_MISSILE_ZIG_TIME_MIN`..`MAX` (ms).
   The random angles and times make it look unstable rather than a regular pattern.
3. **Lock drop (as built):** once within `BOSS00_MISSILE_LOCK_DIST` of the player, the missile stops homing **and** stops zig-zagging, and flies straight along its last aim so the player can dodge. Otherwise flight angle = `aim + zigSide * zigAngle`.
4. **Move:** `incPosXYZ( cos(flight) * BOSS00_MISSILE_SPEED * dt, sin(flight) * BOSS00_MISSILE_SPEED * dt )`.
5. **Rotate to face its motion:** `setRotXYZ( 0, 0, flight, false )`, in radians. The art points right (+X), so no offset is needed. The rotation snaps with each hard turn, which is the look we want.
6. **Animate:** subtract `dt` from a toggle timer. At 0, `setFrame( 1 - frameIndex )` and reset the timer to `BOSS00_MISSILE_ANIM_MS`. This is a plain toggle rather than `utilScripts.PlayAnim`, which allocates a generator on every `init()`.
7. **Wrap:** the standard ±`GAMEPLAY_LOOPING_WRAP_DIST` pattern.
8. **Collide:** `sprite.collisionComponent.checkForCollision( playerShipStrategy.nodeAry )`.
9. **Expire:** `age += dt`. Recycle into `_enemy_shot_` and return `true` when `age > BOSS00_MISSILE_LIFETIME`, or when it leaves the view vertically (`camera.inViewY`, same as enemy00). Otherwise return `false`.

Tuning note: raise `LOCK_DIST` to make dodging easier, raise `TURN_RATE` / `SPEED` to make it harder.

#### `Boss00Shot_Hit( sprite )`
Recycles the missile into `_enemy_shot_` (same as `Enemy00Shot_Hit`).

Register both in `loadScripts()`. `startupstate.js` already calls `boss00scripts.loadScripts()`.

### 5. Collision — `source/state/level1state.js` `collisionCallBack()`
In the "player ship involved" block, add a branch for `BOSS00_SHOT_ID`:
- `spriteB.prepareScript('hit', spriteA)`. The player hit script creates the explosion at the missile.
- If `!GOD_MODE`: `progressBar.incCurrentValue( -BOSS00_MISSILE_DAMAGE )` (30) and `setVisible(true)`.
- `spriteA.prepareScript('hit')` to recycle the missile.
- No new sound. The existing `player_hit` sound for the player getting hit can stay, since it's the player's sound, not the missile's.

(The block already disables the missile's collision at the top, so it can't hit twice. Player shots don't interact with missiles, per decision 3.)

### 6. Tunables — `source/state/gamedefs.js` (starting values, meant to be tuned)
| Constant | Start | Meaning |
|---|---|---|
| `BOSS00_SHOT_ID` | -21 | userId |
| `BOSS00_FIRE_INTERVAL` | 1000 | ms between shots |
| `BOSS00_FIRE_JITTER` | 200 | ± random ms |
| `BOSS00_MISSILE_SPEED` | 0.4 | px/ms forward speed (enemy00 shot is 0.25) |
| `BOSS00_MISSILE_TURN_RATE` | 180 | max homing turn of the aim, deg/sec |
| `BOSS00_MISSILE_ZIG_ANGLE_MIN` | 25 | min hard-turn kick, degrees off aim |
| `BOSS00_MISSILE_ZIG_ANGLE_MAX` | 55 | max hard-turn kick, degrees off aim |
| `BOSS00_MISSILE_ZIG_TIME_MIN` | 90 | min ms per zig segment |
| `BOSS00_MISSILE_ZIG_TIME_MAX` | 220 | max ms per zig segment |
| `BOSS00_MISSILE_LOCK_DIST` | 200 | px from player where homing + zig-zag stop (replaced the planned fade) |
| `BOSS00_MISSILE_ANIM_MS` | 80 | ms per animation frame |
| `BOSS00_MISSILE_LIFETIME` | 6000 | ms before it self-destructs |
| `BOSS00_MISSILE_DAMAGE` | 30 | player health lost per hit |

---

## Execution phases
Each phase builds cleanly, can be reviewed on its own, and is playtested with the existing TEMP 10s boss spawn before the next phase starts.
Every phase ends with: `npx webpack --mode development` + `npx eslint source/scripts/boss00aiscripts.js source/scripts/boss00scripts.js`.

### Phase M1: Fire a straight, animated missile while beaming (no damage yet)
**Code**
- `gamedefs.js`: `BOSS00_SHOT_ID`, `BOSS00_FIRE_INTERVAL`, `BOSS00_FIRE_JITTER`, `BOSS00_MISSILE_SPEED`, `BOSS00_MISSILE_ANIM_MS`, `BOSS00_MISSILE_LIFETIME`.
- `enemyshot.strategy`: `boss_shot` node (section 2).
- `boss00scripts.js`: `Boss00Shot_Fire` **basic version**. Launch from the center of the boss, aimed at the player's position at launch, then fly **straight**. Includes: nose rotated to the flight angle, frame toggle, wrap, collision check, expire by lifetime or by leaving the view vertically. Also `Boss00Shot_Hit` and registration of both.
- `boss00aiscripts.js`: `inViewWithWrap()` + `shootPlayer()` in the AI base; head caches `enemyShotStrategy` / `camera`. DestroyBuilding resets `shootTime` when the beam appears and calls `shootPlayer()` only in the `destroying` phase.

**Test**
- Missiles come out about once a second, **only while the beam is out**: none during descent, travel, beam retract, or the interrupt pause.
- The first missile comes about a second after the beam appears.
- Missiles launch from the center of the boss and draw on top of its body.
- No firing when the boss is off screen. Fly away from the boss and back, including across the wrap seam.
- The missile flips between `missile-0` / `missile-1`, and its nose points at where it's heading (try the player on the left, right, above, and below the boss).
- Missiles fly straight through the player (no damage yet), self-destruct after the lifetime or off screen, and don't pile up.
- Missiles show on the radar and render correctly near the wrap boundary.
- Boss death stops firing.

### Phase M2: Hitting the player
**Code**
- `gamedefs.js`: `BOSS00_MISSILE_DAMAGE` (30).
- `level1state.js` `collisionCallBack()`: `BOSS00_SHOT_ID` branch in the player-ship block (section 5).

**Test**
- A straight missile hitting a player who sits still costs **30 health**, shows the explosion, plays the player's hit sound, and the missile disappears.
- One missile can only hit once.
- Player shots pass through missiles.
- GOD_MODE takes no damage.
- Firing stops while the player is dead and resumes after respawn.
- Game restart clears missiles in the air.

### Phase M3: Homing
**Code**
- `gamedefs.js`: `BOSS00_MISSILE_TURN_RATE`.
- `Boss00Shot_Fire`: the straight heading becomes the **aim angle**, which turns toward the player's current (wrap-aware) position at most `TURN_RATE` deg/sec, using the shortest angular difference. The missile flies along the aim. No zig-zag yet.

**Test**
- The missile curves to follow a moving player and hits one who sits still.
- A fast-moving player can still out-turn it.
- It doesn't orbit the player endlessly (if it does, tune `TURN_RATE` / `SPEED` here, before zig-zag adds noise).
- Homing works across the wrap seam (it doesn't turn around the long way).

### Phase M4: Sharp zig-zag (unstable rocket)
**Code**
- `gamedefs.js`: `BOSS00_MISSILE_ZIG_ANGLE_MIN/MAX`, `BOSS00_MISSILE_ZIG_TIME_MIN/MAX`.
- `Boss00Shot_Fire`: random starting side, zig timer with a hard turn (flip side + new random angle/time), zig-zag stops once lock drops. Flight angle = `aim + side * zigAngle`. Movement and rotation use the flight angle (section 4, steps 2–5).

**Test**
- The missile snaps between sharp legs at random angles and timing, and looks unstable, not like a regular pattern.
- The nose snaps with every hard turn.
- It still lands hits on a player who sits still. The last stretch is straight (the lock drop works).
- Moving can sometimes dodge it.
- Tune the zig constants, `TURN_RATE`, and `SPEED` to taste.

## M4 revised (as built): launch up/down, then curve to the player
Tried and removed: sharp zig-zag, then random swirling wander. Neither looked good. Now:
- **Launch:** from either side of the boss at random (±`SPAWN_OFFSET_X`, regardless of where the player is), flying straight **up or down** at random for `LAUNCH_TIME` (250 ms, about 75 px).
- **Curve:** then it turns toward the player at up to `TURN_RATE` (180°/s), which draws a smooth arc. An up-shot rises about 170 px above the boss before it comes around.
- **Far-side loop:** if it launched from the side of the boss away from the player, it doesn't hard turn back across the boss. It turns **outward** at `LOOP_TURN_RATE` (120°/s, wide enough to clear the boss body), loops around, and once its natural turn toward the player matches the loop direction it switches back to normal homing.
- **Final run:** once within `LOCK_DIST` (200 px) **and** its nose is within `LOCK_ALIGN` (10°) of the player, it stops steering and flies straight. A player who moves dodges it, and it shoots out the other side.
- Simulated (2,000 launches): about 98% hit a player who sits still. The rest are cases where the player is right next to the boss and the missile circles until its lifetime ends. About 79% are dodged by a player who moves during the final run.

## Deferred
- Missile launch sound (waiting for new audio).
