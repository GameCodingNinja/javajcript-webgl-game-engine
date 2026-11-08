# Boss00 Handoff

## Status
Boss00 (the building-destroying boss) is implemented and playable — plan phases 1–5 are done.
Its **homing missile attack** is also done (missile phases M1–M4; the final flight style was approved by the user).
It is **wired into normal play**: it takes the place of the next mini-boss once the player has fought both enemy01 and enemy02 (see "When the boss appears"). The TEMP test code has been removed.

- Boss design/plan: `boss00_plan.md` (questions Q1–Q16 resolved; Q10 sound deferred)
- Missile design/plan: `boss00_missle_plan.md` (see "M4 revised (as built)" for the final flight)
- Original specs: `boss00_prompt.txt`, `boss00_update.txt`
- Plain-language summary: `summary.txt` (early boss plan only. It doesn't cover the missile, sound, trigger, or later tuning)
- How to add enemies/bosses/projectiles in general: `AGENTS.md` → "Adding a New Enemy or Boss" and "Adding an Enemy Projectile"

## When the boss appears
- Mini-bosses (enemy01/02) come from `miniBossSpawnTimer` in `Level1State.handleEnemySpawn()`. It is disabled when a mini-boss spawns and reset when that mini-boss dies, so only one is alive at a time. Mini-bosses start once the player reaches the mini-boss level threshold.
- `foughtEnemy01` / `foughtEnemy02` (cleared in `initMiscObjects()`) are set when that mini-boss spawns. The next mini-boss can't trigger until the current one dies, so spawn = fought. When the timer fires with **both** set, `spawnBoss()` runs **instead of** that mini-boss. Below `ENEMY01_LEVEL_THRESHOLD` only enemy01 spawns, so the boss can't come until enemy02 has also appeared. The existing streak cap (`MAX_MINI_BOSS_STREAK` 2) ensures both types come up after that.
- **During the battle:** the mini-boss timer stays disabled, so enemy01/02 are paused, and enemy00 spawns **much slower**: only every `BOSS00_ENEMY00_SPAWN_SLOWDOWN` (4th) spawn tick produces one while `bossBattleActive` is set (set/cleared in `startBossMusic()`/`endBossMusic()`). The normal rate (including level-based speed-ups) resumes when the boss dies.
- **On boss death** (`EGE_BOSS_DEFEATED`): enemy00 returns to its normal spawn rate, music crossfades back, the mini-boss timer is reset (enemy01/02 resume with a fresh timer), and both fought flags are cleared, so the player has to fight both mini-bosses again before the next boss.
- `spawnBoss()` creates the node above the screen, calls `prepareScriptOnInit()` (SpriteNode gotcha), and calls `startBossMusic()`.
- Restart mid-battle: `restartGame()` deletes/reloads the strategies (boss + missiles gone), clears the AI data, and `initMiscObjects()` resets `bossBattleActive` and the fought flags. The paused boss track restarts from the top on the next battle.

## How the boss behaves
1. Spawns above the screen and descends onto a building **far from the player** (≥ half the wrap distance away).
2. Over the building: beam widens to 33px over 1s. Then the destroy countdown (7s) starts; after 1s the building begins shaking, faster and harder until it's destroyed (shake only moves down — there's no art above/below the building).
3. Boss is **vulnerable only while parked over a building**. Health and hit bars are shown then, hidden while moving.
4. Each player hit lowers the hit bar. When it's empty: boss stops taking hits, loses 1 health, beam retracts, pauses ~1s so the player sees the change, then flies fast to the next building. **Half the time (`BOSS00_CHARGE_CHANCE` 0.5) it charges**: it travels to the building in the direction of the player (going the long way around the map if needed), at its normal height and speed, so it can ram the player on the way (only if the player is alive and the boss is on screen). Ramming the player costs 20 health. The ram explosion is centered on the player ship and shifted toward the enemy by `RAM_EXPLODE_SHIFT_X` (16px) horizontally and `RAM_EXPLODE_SHIFT_Y` (8px) vertically, the same as enemy01 and enemy02 (`Explode_animation` in `levelscripts.js`). An earlier version that put it at the ship's edge, up to 40px off center, was unreliable and was removed. Hit bar refills instantly on arrival.
5. Targets only buildings that are not destroyed and not already targeted. **First descent:** a random building in the half farthest from the player. **Each later move:** a random building at least `BOSS00_MIN_TARGET_DIST` (2000px = 10 buildings, wrap-aware) from the boss. If only closer buildings are left, it picks one of them and **always goes the long way around** the map. With no buildings left, it just sits (the game is over anyway).
6. Free-flying wrap-around movement (shortest wrapped path).
7. Health 0 → beam/bars hidden, shaken building restored, boss falls while spinning (450 px/s, sine-in), then is recycled. Player scores `BOSS00_SHIP_HIT_VALUE` (10).
8. **Music:** on spawn, the game music crossfades (2s, `BOSS00_MUSIC_FADE_MS`) to `LOOP_City-Showdown`. On death (`EGE_BOSS_DEFEATED`), it crossfades back to the track that was playing, and the 5-minute rotation timer restarts. Pause/resume/game over use `getGameMusic()`, so they handle the boss track. **Alarm:** `boss_alarm` loops at the start of the battle (started in `startBossMusic()` at full volume), then `BOSS00_ALARM_TIME` (5s) in it fades out over `BOSS00_MUSIC_FADE_MS`. It's also faded in `endBossMusic()` and on game over, and paused/resumed with the pause menu like every looping level sound (`pauseLoopingSounds`). **Crash sound:** `boss_crash` plays when the death fall lands.
9. **Screen lock (camera):** once the boss is over its building attacking (`vulnerable`) and its body is on screen (center within 380px of the screen center), the screen stops scrolling and only the player ship moves, kept 60px from the screen sides. It unlocks as soon as the boss stops attacking (hit bar emptied, building destroyed, leaving for the next building) so the player has full control to chase it, or when it's completely off the side of the screen or dies. During the battle, the camera slide that moves the ship to the back of the screen when it changes direction is **fast when the ship turns toward the boss** (speed 25, 0.5s ramp; normal 10, 1s) so the ship isn't mid-screen when the boss comes into view; reversing away from the boss (e.g. to slow down) uses the normal speed. The slide also restarts when a lock ends if the ship is moving. **Brake on coming into view:** when the boss, over its building attacking, comes into view (its center reaches the screen edge, `BOSS00_BRAKE_START_DIST` 640) and the ship is flying toward it, the ship quickly eases to a stop (`BOSS00_LOCK_BRAKE_SEC` 0.4s, boost dropped). It starts before the lock so a boosting ship stops in time. Once per entry into view (again after each chase), Left/right and boost input is ignored during the slow-down so the ship always stops completely (it still turns to face the pressed direction, and up/down still work). When it ends, the player has full control: if a direction is held then, it speeds up in that direction at normal speed. Code: `startBossBrake()`, `handleBossScreenLock()`, `endBossScreenLock()`, `startCameraEasing( moveDir )` in `level1state.js` (details in AGENTS.md "Boss screen lock").
10. **Rendering across the wrap point:** the boss no longer flickers when the player chases it across the wrap point. Enemies used to be drawn through `wrapAroundCamera` only in the buildings' band (`buildingsCamera.pos.x < -4900 || > 5000`), but the boss is about 670px wide (culling radius about 389) and can sit right up to ±5600, so for about 400px of camera travel it was across the wrap point and drawn by neither camera. Now `_enemy_` and `_enemy_shot_` get the wrap render in a wider band, past `±ENEMY_WRAP_RENDER_DIST` (4500; the boss needs 5600 − (640 + 389) = 4571), and `wrapAroundCamera` is positioned in that band (after the `buildingsCamera` reset). Buildings/foreground/train wrap rendering is unchanged. (An earlier version rendered the enemies with it every frame; the user preferred the wider band.) Code: `ENEMY_WRAP_RENDER_DIST`, `update()` and `render()` in `level1state.js` (details in AGENTS.md "Strategies and Rendering"). Tested by the user with the boss attacking buildings on both sides of the wrap point and on the two end buildings (enemy01 also looks good across it).
   - Tried and rejected by the user: a camera that framed the ship/boss midpoint (no visible effect), and a fast pre-lock shift of the ship to the far edge (too harsh).

## How the missile behaves
- **When:** only while the beam is out (DestroyBuilding `destroying` phase, not after an interrupt), and only if the boss is in view and the player is alive. About one every 2 seconds (2000ms) at the start of each battle, 250ms faster (`BOSS00_FIRE_INTERVAL_STEP`) each time the hit bar is depleted (`sprite.fireInterval`, reset on each spawn). First missile about 1s after the beam appears. Stops on retract, interrupt, travel, and boss death.
- **Launch:** from either side of the boss at random (±30px from center, regardless of where the player is), flying straight **up or down** at random for 250ms.
- **Curve:** then it homes in on the player at up to 180°/s (a smooth arc). The nose always faces the direction of flight, and the missile cycles `missile-0`/`missile-1` every 80ms.
- **Far-side loop:** if it launched on the side away from the player, it doesn't hard turn back across the boss. It turns **outward** at 120°/s (wide enough to clear the boss body) and loops back around. Once its natural turn toward the player matches the loop direction, normal homing takes over.
- **Final run (dodge window):** once within 200px **and** its nose is within 10° of the player, it stops steering and flies straight. A player who sits still gets hit, one who moves dodges it, and the missile shoots out the other side.
- **Hit:** 20 player health (unless `GOD_MODE`), player explosion + `player_hit` sound, missile removed. Player shots pass through missiles. Missiles expire after 6s or when they leave the screen vertically.
- **Launch sound:** each launch plays the random `boss_rocket_launch` playlist (`enemySound.lst`, 3 rocket sounds at volume 0.5).
- Tried and rejected by the user: a straight shot, hard homing (undodgeable), a sharp zig-zag, and random swirling wander.

## Key files
| File | What |
|------|------|
| `data/objects/strategy/level1/enemy.strategy` | `boss00_ship` node (id -20). Null head `null_boss00_ship` + children in render order: `boss00_beam`, `boss00_body`, `UIBossHealthBar`, `UIBossHitBar` |
| `data/objects/strategy/level1/enemyshot.strategy` | `boss_shot` node (id -21), `<scale x="2" y="2"/>`, scripts `Boss00Shot_Fire` / `Boss00Shot_Hit` |
| `data/objects/2d/objectDataList/level1DataList.lst` | Boss art + `boss_shot` (`missile-0/1.png`, 2-point collision line). Source list — edit this, then regenerate the sprite sheet |
| `data/objects/ai/boss00.ai` | Behavior tree: Descend → DestroyBuilding → repeat[PickAndMoveToBuilding → DestroyBuilding] |
| `source/scripts/boss00aiscripts.js` | AI nodes, building selection, beam, shake, bar visibility, `shootPlayer()` + `inViewWithWrap()`, `clearAIData()` |
| `source/scripts/boss00scripts.js` | `Boss00Shot_Fire` (missile flight), `Boss00Shot_Hit`, `Boss00Ship_Hit`, `Boss00Ship_Die` |
| `source/state/gamedefs.js` | `BOSS00_*` tunables (boss + missile), `RAM_EXPLODE_SHIFT_X/Y`, `EGE_BOSS_DEFEATED`, `ENEMY02_SHIP_ID` |
| `source/state/level1state.js` | AI load, collision handling (incl. `BOSS00_SHOT_ID` branch), boss trigger (`handleEnemySpawn` / `spawnBoss`), boss music, screen lock + boss camera easing (`handleBossScreenLock` / `endBossScreenLock` / `startCameraEasing`), `EGE_BOSS_DEFEATED` handling, cleanup |
| `source/scripts/levelscripts.js` | `Explode_animation` (optional offsets used by the death bursts; boss/enemy01/enemy02 ram explosion centered on the player, shifted 16px X / 8px Y toward the enemy) |
| `source/state/startupstate.js` | Script registration |

## Current tunables (`gamedefs.js`, user-tuned — don't overwrite)
**Boss:** boss after both mini-bosses fought, enemy00 spawn slowdown 4× during battle, alarm 5s, music fade 2s, death bursts 10 × 100ms, min target distance 2000px, charge chance 0.5, health 5, hit bar 20, destroy 7000ms, interrupt pause 1000ms, beam width 33, beam grow 1s / retract 0.4s, shake delay 1000ms, shake interval 80→15ms, shake amp 2→7, move 1300 px/s, descend 300 px/s, resting Y 55.

**Camera:** `BOSS00_SCREEN_LOCK_INSET` 260px (lock when the boss center is within 640−260 of the screen center, unlock beyond 640+260), `BOSS00_SCREEN_LOCK_EDGE` 60px (ship margin while locked), `BOSS00_CAMERA_EASING_SPEED` 25, `BOSS00_CAMERA_EASING_RAMP_SEC` 0.5, `BOSS00_LOCK_BRAKE_SEC` 0.4 (slow-down time), `BOSS00_BRAKE_START_DIST` 640 (boss distance from the screen center where the slow-down starts).

**Missile:** `BOSS00_SHOT_ID` -21, `FIRE_INTERVAL` 2000ms, `FIRE_INTERVAL_STEP` 250ms, `MISSILE_SPEED` 0.3 px/ms, `TURN_RATE` 180°/s, `LAUNCH_TIME` 250ms, `LOOP_TURN_RATE` 120°/s, `LOCK_DIST` 200px, `LOCK_ALIGN` 10°, `SPAWN_OFFSET_X` 30px, `ANIM_MS` 80, `LIFETIME` 6000ms, `DAMAGE` 20. Scale (2×) is in the strategy, not code.

## Testing note
`GOD_MODE` (~L90 of `level1state.js`) is now `false` (user), so missiles and rams do damage. With the real trigger, reaching the boss takes the mini-boss level thresholds plus fighting both enemy01 and enemy02 (mini-bosses come 30–150s apart). To test the boss quickly, temporarily set `foughtEnemy01/02 = true` in `initMiscObjects()`.

## Done since the first handoff
- Real spawn trigger (after fighting both mini-bosses) and enemy rules during the fight (see "When the boss appears"). TEMP test code removed.
- Sound (Q10): missile launch, boss crash, boss battle music, `boss_alarm` at battle start.
- Death explosion: 10 staggered bursts (2–4× scale) scattered over the body, each playing `enemy_explosion` (`BOSS00_DEATH_BURST_*`).
- Charge, next-target distance rule + long-way fallback, boss/enemy01/enemy02 ram explosion centered on the player with a 16px X / 8px Y shift toward the enemy.
- Missile interval raised to 2s (`BOSS00_FIRE_INTERVAL` 2000).
- Library sound features (committed): built-in fades, `soundManager.crossfade()`, `play(..., resetVolume)`, pause menu `pauseLoopingSounds`/`resumeLoopingSounds`, `Sound.resume()` precedence fix. See AGENTS.md "Sound Fades".
- Screen lock + boss camera easing (item 9 above).
- Production build: webpack size warning limit raised to 1 MB (the server build failed on the 244 KiB default warning).
- **Rapid Fire** reward (5th game over reward): hold fire to keep firing every 150 ms (`RAPID_FIRE_INTERVAL`, `firePlayerShot()`). See AGENTS.md "Menu System".
- **Mobile right-side gestures:** quick swipe up = boost until lifted, hold = fire (Rapid Fire keeps firing), tap = one shot, long horizontal swipe = pause. Boost used to be the one-finger hold. See AGENTS.md "Touch Event System".
- **Bigger tap area for the game over button list arrows** (`<rect>` size modifier in `button_list.ctrl`), since the 33×41 arrows were hard to tap on a phone. Confirmed by the user.
- **Unlimited Boost** shows the boost bar while boosting, always full. Confirmed by the user.
- **Player shield** (E / gamepad Y / two fingers on the right): white oval art, 1 s bar that takes 20 s to fully recharge (user-tuned), must fully recharge after a full drain. Blocks shots, missiles and rams with no damage; enemy00 hitting it is otherwise the same as hitting the ship. See AGENTS.md "Menu System" → "Player shield".

## Known review findings (user chose not to fix — leave unless asked)
- Collision is disabled during the descent.
- Player shots that hit an invulnerable boss aren't hidden.
- Bars aren't hidden at the exact moment of interrupt/destroy.

## Gotchas
- `boss00_ship` has child nodes, so it's a `SpriteNode` whose `init()` does **not** prepare the head sprite's `prepareOnInit` scripts. After `create('boss00_ship')`, call `node.get().prepareScriptOnInit()` (guarded so recycled nodes aren't prepared twice).
- Never hand-edit `level1SpriteSheetDataList.lst`, `level1_spriteSheet.png`, or `mesh/level/level1.xml`. Edit `level1DataList.lst`, then run the "Generate Sprite Sheet" task:
  ```bash
  python3 generate_spritesheet_from_lst.py \
      data/objects/2d/objectDataList/level1DataList.lst \
      data/objects/2d/objectDataList/level1SpriteSheetDataList.lst \
      data/textures/level/level1_spriteSheet.png \
      data/objects/2d/mesh/level/level1.xml 900
  ```
- Per-entity state lives on the head sprite: `bossHealth`, `bossHitBar`, `vulnerable`, `interrupted`, `targetBuilding`, `healthBarCtrl`, `hitBarCtrl`, `buildingBaseX/Y`, `shootTime`.
- **Ram cooldown:** all ram collisions (enemy00/01/02/boss) share `playerShip.collisionTimer` (1 s). For a second after any ram the ship passes through every enemy, and a red (aggressive) enemy00 takes one ram per second. Intended; it explained the "ship passes through enemy00" report, not the wrap-around.
- Missile rotation uses `setRotXYZ(0, 0, radians, false)`. The art points right, so heading = `atan2(dy, dx)`. Turn-rate constants are converted to radians/ms once at module load in `boss00scripts.js`.

## Build / check
```bash
npx webpack --mode development
npx eslint source/scripts/boss00aiscripts.js source/scripts/boss00scripts.js
```
The only remaining lint errors are `'ytgame' is not defined` (2 in `level1state.js`, 6 in `startupstate.js`; the YouTube Playables global, guarded by `typeof` at runtime). Adding `"ytgame": "readonly"` to `globals` in the root `.eslintrc.json` would clear them. `soundmanager.js` also has a pre-existing optional-chaining parse error under the ES2018 lint config.

## Playtesting
The user wants to **watch**: open a visible Chrome window and play the boss fight there (see AGENTS.md "Playtesting in Chrome" for the method). The bot refills the ship's health, so a bot run says nothing about difficulty.

## Working state
The user has committed everything through desktop Rapid Fire (`aab4d4c`), including the webpack 1 MB size limit and the wider game over button lists.

Uncommitted:
- **Mobile gestures + Rapid Fire on mobile** (`level1state.js`): swipe up to boost, hold to fire; "Rapid Fire" is now in the two game over `.menu` files for every platform (the desktop-only `setStringToList()` code in the `Level1State` constructor was removed). Not tested on a phone by Amp.
- **Arrow tap area** (`button_list.ctrl`). Tested by the user on a phone.
- **Unlimited Boost bar** (`level1state.js`). Confirmed by the user.
- **Shield Overdrive** reward (id 5, both game over menus): 1.5× shield time and recharge rate (`SHIELD_OVERDRIVE_SCALE`; 2× was too good), no lockout after a full drain. Confirmed working by the user.
- **Player shield**: `player_shield.png` (new), `level1DataList.lst` + regenerated sprite sheet, `playerShip.strategy`, `playership.strategy.loader` (renamed from `ship.strategy.loader`), library `collisioncomponent.js` (`checkChildren` parameter), `enemy00scripts.js`/`boss00scripts.js`/`levelscripts.js` (pass `playerShipSprite.shieldOn`), `gamedefs.js`, `startupstate.js` (touch code registration), `controllerMapping.json`, `key_binding_scroll_box.ctrl`, `level1state.js`. Builds and lints; not tested yet. A browser with saved key bindings needs "Reset To Default" once to get the new binding.
- These doc updates.

The `.menu`/`.ctrl` files use CRLF line endings; keep them (edit without converting) so diffs stay small. The user asked for no more playtesting for now. Don't ask to commit or push.

## Suggested next steps
1. Playtest a full cycle with the real trigger (temporarily set `foughtEnemy01/02 = true` in `initMiscObjects()` to get there fast), including game over mid-battle → restart and the pause menu during the fight (sound + screen lock).
2. Optional: add `ytgame` to the ESLint globals.
3. Optional: the three declined review findings above.
