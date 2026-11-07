# Invaders Game - AGENTS.md

## Workspace Setup
Always load the `.code-workspace` file to determine project and library paths. Also read the `AGENTS.md` in each library path for its conventions.

## Overview
Space invaders-style game built on the custom WebGL game engine located at `../library/`.

## Collaboration Preferences
- Never ask to commit or push changes.
- When playtesting, open a **visible** Chrome window and play there so the user can watch (see "Playtesting in Chrome").

## Performance Goal
**Avoid triggering garbage collection (GC) during gameplay.** GC pauses cause frame drops and stuttering. All runtime code should:
- Reuse objects via global temp variables (e.g., `gTempPoint`, `gTempMatrix`)
- Avoid creating temporary arrays/objects in hot paths (update, render, collision loops)
- Use object pooling for frequently created/destroyed entities
- Pre-allocate arrays and reuse them by setting `.length = 0` or index assignment

## Build Commands
```bash
# Development build
webpack --mode development

# Production build
webpack --mode production

# Plain build (no optimizations)
webpack --mode none
```
Webpack's size warnings are on only when `NODE_ENV=production` (set by hosting build servers), with the limit raised to 1 MB in `webpack.config.js` (`maxAssetSize`/`maxEntrypointSize`). The production `bundle.js` is about 600 KiB (engine + planck-js + game), over webpack's default 244 KiB web page budget, and the warnings made the server build fail. A plain local `webpack --mode production` doesn't set `NODE_ENV`, so it never showed them. Raise the limit again if the bundle grows past 1 MB.

## Directory Structure
| Directory | Purpose |
|-----------|---------|
| source/game/ | Entry point (main.js, game.js) |
| source/scripts/ | Entity behaviors (player ship, enemies, menus, AI) |
| source/state/ | Game states (startup, level1, common, definitions) |
| data/ | **Active game assets** loaded at runtime (see below) |
| data/objects/ | Entity definitions (2D meshes, AI, strategies) |
| data/settings/ | Game config (settings.json, controller mapping, camera) |
| data/shaders/ | WebGL shaders |
| data/sound/ | Audio files |
| data/textures/ | Image assets |
| development/ | Raw source artwork - **can be ignored** |

### Data Folder Details
The `data/` folder contains all active game assets loaded and used at runtime:
- Settings and configuration (JSON/XML)
- Camera definitions
- Game AI configurations
- Shader programs
- Strategy definitions
- Sound files
- Textures
- JSON/XML descriptor files that define what data to load

### Sprite Sheet Generation (IMPORTANT)
The level object data list has a **source** file and **generated** outputs. Only edit the source.

- **Source (edit this)**: `data/objects/2d/objectDataList/level1DataList.lst` — uses individual texture files (e.g. `data/textures/.../foo.png`). When **adding or removing objects/textures**, make the change here.
- **Generated (NEVER hand-edit)** — these are produced by the generator from the source and any manual edits will be overwritten:
  - `data/objects/2d/objectDataList/level1SpriteSheetDataList.lst` (texture refs become packed sprite-sheet `<glyph>` references)
  - `data/textures/level/level1_spriteSheet.png` (the packed atlas)
  - `data/objects/2d/mesh/level/level1.xml` (glyph rects)
- `dataListTable.json` loads **only** `level1SpriteSheetDataList.lst` for the `(level_1)` group at runtime, so the sprite sheet must be regenerated for source changes to take effect.
- **Regenerate** by running the VS Code task **"Generate Sprite Sheet"** (`.vscode/tasks.json`), which runs:
  ```bash
  python3 generate_spritesheet_from_lst.py \
      data/objects/2d/objectDataList/level1DataList.lst \
      data/objects/2d/objectDataList/level1SpriteSheetDataList.lst \
      data/textures/level/level1_spriteSheet.png \
      data/objects/2d/mesh/level/level1.xml 900
  ```
  Requires ImageMagick (`convert`/`magick`) on PATH.

## Architecture

### Engine Integration
Imports singleton managers from `../library/`:
- **Managers**: textureManager, shaderManager, eventManager, menuManager, cameraManager, actionManager, soundManager, aiManager
- **Systems**: device, settings, highResTimer, physicsWorldManager
- **Strategies**: strategyManager, strategyLoader

### State Machine
```
GameState (base) → CommonState → Level1State
                ↘ StartUpState
```
- `StartUpState`: Loads assets, transitions to Level1
- `Level1State`: Main gameplay

### Game Loop (game.js)
```
pollEvents() → physics() → update() → transform() → render() → requestAnimationFrame()
```

### Script Registration
Behavior classes registered with `scriptManager.set('ClassName', ClassName)` for:
- Player behaviors: `PlayerShip_FireTailAnim`, `PlayerShip_ShootLazer`, `PlayerShip_Die`
- Enemy AI and death animations
- Menu transitions and settings controls (e.g., `SoundCheckBox_execute`, `SoundEffectCheckBox_execute`)

### Adding a New Enemy or Boss
Enemies (including bosses — a boss is just an enemy) live in the **`_enemy_` strategy** ([data/objects/strategy/level1/enemy.strategy](data/objects/strategy/level1/enemy.strategy)). `Level1State` already updates/transforms/renders `_enemy_` every frame (including the wrap-around camera passes), so anything added there is driven for free. `enemy00/01/02` and `boss00` are the reference examples.

**Wiring checklist** (using `boss00` as the example):
1. **Art** → add objects to the **source** [level1DataList.lst](data/objects/2d/objectDataList/level1DataList.lst) and run the "Generate Sprite Sheet" task (never hand-edit the sprite-sheet `.lst`). See "Sprite Sheet Generation".
2. **userId** → add a unique negative id constant in [gamedefs.js](source/state/gamedefs.js) (e.g. `BOSS00_SHIP_ID = -20`) and set it as the strategy node's `id` attribute. `userId` is how `collisionCallBack()` identifies what was hit.
3. **Strategy node** → add a `<node name="..." id="...">` to `enemy.strategy` with a `<scriptList>` of `ai_*="AI_..." prepareOnInit="true" ai="true"`, `hit="..."`, `die="..."`, `collision="EnemyShip_CheckForCollideWithPlayer" prepareOnInit="true"`.
4. **AI tree** → create `data/objects/ai/<name>.ai` (behavior tree), add it to [aiListTable.json](data/objects/ai/aiListTable.json), `import <name>_ai from 'raw-loader!...'` in [level1state.js](source/state/level1state.js) and add it to the `aiManager.loadFromXml([...])` array in `load()`.
5. **AI scripts** → create `source/scripts/<name>aiscripts.js` with a `Head` node, leaf nodes, a shared `ai_data` object + `clearAIData()`, and a `loadScripts()` that does `scriptManager.set(...)`. AI factory signatures: head `(nodeData)`, leaf `(nodeData, headNode, sprite)`. Reuse the library `AI_Composite`/`AI_Decorator` nodes for tree structure (`condition="all_success"`, `<decorator type="repeater"/>` = endless loop).
6. **Hit/Die scripts** → create `source/scripts/<name>scripts.js` (`*_Hit`, `*_Die`), modeled on the enemy ones; explosions via `enemyStrategy.create('explode').get().prepareScript('explode', projectileSprite, sprite)`. `Explode_animation` also takes optional `offsetX, offsetY` (used for boss00's scattered death bursts). When an enemy **rams the player**, the player-hit explosion is placed in `Explode_animation`: enemy01/enemy02/boss center it on the player ship and shift it `RAM_EXPLODE_SHIFT_X/Y` (16/8px) toward the enemy. Don't place it relative to a big enemy's center, because that lands off the ship. Add a new big enemy's userId to that case. Enemy userIds the script needs must be in `gamedefs.js`, not local to `level1state.js`.
7. **Register + cleanup** → call both `loadScripts()` in [startupstate.js](source/state/startupstate.js), and add `<name>aiscripts.clearAIData()` to the two cleanup spots in [level1state.js](source/state/level1state.js) (`restartGame()` and `cleanUp()`).
8. **Damage/collision** → add `userId` branches in `collisionCallBack()` ([level1state.js](source/state/level1state.js)): one in the "player ship involved" block (entity damages player) and one in the "player shot X" chain (player damages entity → `prepareScript('hit'/'die')` + `updateHudProgress(score)`). **Ram cooldown:** the enemy00/enemy01/enemy02/boss ram branches are gated by the shared `playerShip.collisionTimer` (1 s), so for a second after any ram the ship passes through every enemy. That's intended (the user tried removing it for enemy00 and reverted); don't mistake it for a wrap-around bug.
9. **Spawn** → `this.enemyStrategy.create('<node>')` then position it (enemies spawn above the screen and descend). Mini-bosses (enemy01/02) and the boss share `miniBossSpawnTimer` in `handleEnemySpawn()`: once the player has fought both enemy01 and enemy02 (`foughtEnemy01/02`, set on spawn), the boss takes the next mini-boss's turn (`spawnBoss()`); both flags reset on boss defeat, and the timer stays disabled until `EGE_BOSS_DEFEATED`. While `bossBattleActive` is set, enemy00 spawns only every `BOSS00_ENEMY00_SPAWN_SLOWDOWN`th spawn tick.

**CRITICAL gotcha — `prepareOnInit` scripts on a node WITH children:**
- A strategy `<node>` with **no child `<node>`s** becomes a `SpriteLeafNode`, whose `init()` prepares **its own** sprite's `prepareOnInit` scripts (AI, collision). This is why simple enemies (`enemy00_ship`) "just work".
- A node **with children** (e.g. a null head + body/beam/UI children, like `boss00_ship`) becomes a `SpriteNode`, whose `init()` only prepares the **children's** `prepareOnInit` scripts — **NOT the head sprite's own**. So an AI/collision script on such a head node is silently never prepared and never runs.
- **Fix:** after `strategy.create('node')`, call `node.get().prepareScriptOnInit()` on the head sprite. (See the boss spawn in `Level1State.update()`.)

**Boss / multi-part entity structure** (`boss00_ship`): a **null head sprite** (`null_boss00_ship`, a `genType="null"` object that carries the collision circle + `collisionSignal=true`) with visible parts and UI as **child nodes**. Child render order = declaration order in the strategy. The head sprite's transform drives all children, so moving the head moves the whole entity.

**Progress bars / UI on an entity:** add `<node type="uiControlNode"><uiProgressBar>...` children (frame sprite + solid fill + `<stencilMask spriteIndex="1"/>`). Access them from an AI/collision script via `sprite.parentNode.findChild('NodeName').get()`, then `setProgressBarMax / setCurrentValue / setVisible`. Cache the control refs on the sprite (e.g. `sprite.healthBarCtrl`) so both the AI and the collision handler can reach them.

**Boss music:** call `Level1State.startBossMusic()` when the boss battle starts (crossfades the game music to `LOOP_City-Showdown`), and dispatch `gameDefs.EGE_BOSS_DEFEATED` from the boss's die script (handled by `endBossMusic()`, which crossfades back). Any code that fades/pauses/resumes the **gameplay** music must get the track via `getGameMusic()` (not the `LOOP_Techno_in_Space_*` name directly), so pause/resume/game-over work during a boss battle. The 5-minute track rotation is skipped while `bossBattleActive` is set. `startBossMusic()` also starts the looping `boss_alarm`, faded out `BOSS00_ALARM_TIME` into the battle. Looping battle sounds like this are paused/resumed with the pause menu automatically (see Sound Fades → `pauseLoopingSounds`) and must be faded out on game over. Replay it with `play( true, 0, true )` so it starts at its `defaultVolume` (a fade-out leaves the gain at 0).

**Boss screen lock:** `Level1State.handleBossScreenLock()` (called in `update()` right after `_easingVal` is scaled by `timeScale`) stops all scrolling while the boss is in view: once the boss is over its building attacking (`sprite.vulnerable`, so down and not traveling) and its center is within `deviceRes_half.w - BOSS00_SCREEN_LOCK_INSET` of the screen center, `_easingVal` is set to 0 so no camera moves, and only the ship moves (clamped `BOSS00_SCREEN_LOCK_EDGE` px from the screen sides right after its `incPosXYZ`). It unlocks as soon as the boss stops attacking (not `vulnerable`: hit bar emptied, building destroyed, leaving for the next building), so the player has full control to chase it, or when it's completely off the side of the screen (`deviceRes_half.w + INSET`) or dies (`bossSprite` cleared on `EGE_BOSS_DEFEATED`), clears `cameraEasingX` so the screen doesn't jump, and if the ship is moving starts the facing-direction camera easing like a thrust press (`endBossScreenLock()`). That easing is started by `startCameraEasing( moveDir )` (thrust press + unlock). During the boss battle it's faster when the ship turns **toward** the boss (wrap-aware): `BOSS00_CAMERA_EASING_SPEED` 25 vs `CAMERA_EASING_SPEED` 10, ramp `BOSS00_CAMERA_EASING_RAMP_SEC` 0.5 s vs 1 s, so the ship is back at its normal back-of-screen position, not the middle, by the time the boss comes into view. Reversing away from the boss (e.g. to slow down) uses the normal speed. **Brake on coming into view:** when the boss (over its building attacking, `vulnerable`) comes within `BOSS00_BRAKE_START_DIST` (640, boss center at the screen edge) of the screen center and the ship is flying toward it, `startBossBrake()` drops `boostSpeed` and eases `easingX` to 0 over `BOSS00_LOCK_BRAKE_SEC` (0.4 s). It starts before the lock so a boosting ship (speed 28, slides about 330 px) stops in time. It runs **once per entry into view** (`bossBrakeDone`), re-armed when the boss is completely off the side of the screen (`deviceRes_half.w + INSET`) or gone. Both the lock and the brake are gated on `vulnerable` because a boosting ship (about 1680 px/s) is faster than the traveling boss (1300 px/s): without it, chasing a boss that flies off re-locked the screen (ship pinned at the edge) and re-braked the ship mid-chase, which felt sluggish. When the brake finishes (`bossBrake` flag, checked at the end of `handleBossScreenLock()`), it gives the control back: if a direction key is held it re-accelerates (and restarts the camera easing) like a thrust press at normal speed, otherwise the camera easing settles to 0. **Left/right and boost input is ignored during the slow-down** (guarded by `!this.bossBrake` in `handleShipMovement()` and the boost handlers) so the ship always comes to a complete stop. The ship still turns to face the pressed direction and `lastMoveDirX`/`lastMoveAction` are still tracked, so whatever is held when the brake ends is applied. Up/down still work. A boost release still sets `boostButtonPress = EAP_UP` so the bar recharges; a boost press needs to come after the brake. Screen X = `sprite.pos.x + camera.pos.x` (a camera stores its position negated); the boss uses `buildingsCamera`, the ship `levelCamera`, wrapped to the nearest copy. `spawnBoss()` stores `this.bossSprite`. Rejected by the user, don't reintroduce: a camera framing the ship/boss midpoint, and a fast shift of the ship to the far screen edge before the lock (too harsh).

**Big enemies across the wrap point:** `_enemy_` and `_enemy_shot_` are rendered with `wrapAroundCamera` in a wider band than the buildings (`ENEMY_WRAP_RENDER_DIST`, see "Strategies and Rendering"), sized for the boss. A new enemy bigger than the boss (culling radius about 389) needs `ENEMY_WRAP_RENDER_DIST` lowered to `5600 − (640 + radius)` or it will flicker when chased across the wrap point.

**Per-entity state** lives on the head sprite (e.g. `sprite.targetBuilding`, `sprite.vulnerable`, `sprite.bossHealth`, `sprite.fireInterval`), initialized in the AI's first leaf `init()` so it resets on every spawn, mirroring how `enemy00` stores `hitCount`/`targetBuilding`. The collision handler reads/writes this state on `spriteB`.

### Adding an Enemy Projectile
Enemy projectiles live in the **`_enemy_shot_` strategy** ([enemyshot.strategy](data/objects/strategy/level1/enemyshot.strategy)), already updated/rendered (incl. wrap-around + radar) by `Level1State`. References: `enemy_shot` (enemy00, straight) and `boss_shot` (boss00 homing missile).
1. **Art** in `level1DataList.lst` + regenerate the sprite sheet. Collision points (`pointList`) are transformed by the sprite matrix, so they **rotate and scale with the sprite** automatically.
2. **Own userId** (e.g. `BOSS00_SHOT_ID = -21`) — don't reuse `ENEMY00_SHOT_ID`; its collision branch decides damage by `frameIndex`.
3. **Strategy node** with `shoot="..."` and `hit="..."` scripts. A `<sprite>` with no `objectName` uses the node name as the object name. Put static transforms like `<scale x="2" y="2"/>` here, not in code — `sprite.reset()` reloads the strategy XML when a pooled node is reused, so it persists.
4. **Fire** from the AI with `enemyShotStrategy.create('<node>').get()` then `scriptComponent.prepare('shoot', shotSprite, enemySprite)`. Gate it on the player being alive (`playerShipSprite.collisionComponent.enable`) and the shooter being in view (`inViewWithWrap`). See `shootPlayer()` in `enemy00aiscripts.js` / `boss00aiscripts.js`.
5. **Flight script** (`*_Shoot`/`*_Fire`): per-frame move + wrap + `collisionComponent.checkForCollision(playerShipStrategy.nodeAry, playerShipSprite.shieldOn)` (tests the player shield child while it's up); recycle itself (`enemyShotStrategy.recycle(sprite.parentNode)`, return `true`) on lifetime or `camera.inViewY` failure. Use the wrap-aware shortest X delta when aiming at the player.
6. **Hit script** just recycles the shot. **Collision:** add a `userId` branch in the "player ship involved" block of `collisionCallBack()` (damage unless `GOD_MODE`, `spriteB.prepareScript('hit', spriteA)` for the explosion, `spriteA.prepareScript('hit')`). The block disables the shot's collision first, so it can't hit twice.

**Rotation/animation tips:**
- `setRotXYZ(0, 0, angle, false)` takes **radians** with `false` (degrees otherwise). Z rotation is counter-clockwise with +Y up, so art that points **right (+X)** uses `Math.atan2(dy, dx)` directly as its rotation.
- For a simple 2-frame cycle, toggle `setFrame(1 - visualComponent.frameIndex)` on a timer. `utilScripts.PlayAnim.init()` allocates a generator each call (GC on every shot).
- Homing that never lets go is undodgeable. Boss00's missile commits to a straight final run once it's close **and** lined up (`BOSS00_MISSILE_LOCK_DIST` / `LOCK_ALIGN`), which keeps it hitting a still player but dodgeable.

### Sound Fades
Fades are built into the library sound system (the old `sound_fade` script is gone):
- `snd.fadeTo( volume, ms, endAction )` fades a `Sound` from its current volume; `soundManager.fadeTo( group, id, volume, ms, endAction )` does the same by ID. `endAction` is `defs.ESND_FADE_NONE` (default), `ESND_FADE_PAUSE` or `ESND_FADE_STOP` (library `common/defs.js`).
- `play( loop, offset, resetVolume = false )` keeps the current volume by default. Pass `resetVolume = true` to start at `defaultVolume` when replaying a sound that may have faded out (a fade-out leaves the gain at 0). `soundManager.play( group, id, loop, offset, resetVolume )`, `GroupPlayer.play( id, loop, offset, resetVolume )` and `PlayList.play( loop, offset, resetVolume )` pass the flag through.
- Fade in = start the sound (no volume reset), then fade, so it rises from 0: `snd.play( true ); snd.fadeTo( 0.7, 1000 );` or `snd.playOrResume( true ); snd.fadeTo( snd.defaultVolume, 500 );`. Music has `initVolume="0.0"` so its first fade-in also starts at 0.
- Crossfade = `soundManager.crossfade( fromSnd, toSnd, ms, fromEndAction = ESND_FADE_PAUSE, loop = true )`: fades `fromSnd` out (then pause/stop), starts or resumes `toSnd` and fades it to its `defaultVolume`. A `toSnd` that's still playing (e.g. mid fade-out on a quick pause/unpause) isn't restarted. All music switches use it: pause menu, game over, 5-minute rotation (`ESND_FADE_STOP`), boss start/end. To force a track to start from the beginning, `stop()` it first (see `startBossMusic()`).
- One fade per sound: a new `fadeTo()` replaces the running one (its end action never runs), and `play()`/`stop()` cancel it. So quick pause/unpause or replaying a sound that's fading out is safe.
- **Pause menu:** `soundManager.pauseLoopingSounds( '(level_1)' )` pauses every playing *looping* sound in the group and `resumeLoopingSounds()` resumes only those (one-shots are skipped because they still report playing after they end). `stop()`/`play()` forget the pause, so `restartGame()` calls `stopGroup( '(level_1)' )` and nothing comes back after a restart (it then re-primes `player_thrust` with play + pause). New looping sounds need no pause-menu code.
- `soundManager.update()` drives the fades every frame and is called from `GameState.update()`. No allocations per fade.

### Menu System
- Menu definitions: `data/objects/2d/menu/*.menu` (XML files defining controls, layout, navigation, scripts)
- Menu control templates: `data/objects/2d/menu/control/*.ctrl`
- Menu backgrounds: `data/objects/2d/objectDataList/menuBackgrounds.lst` (defines sizes for scaled-frame backgrounds)
- Settings menu scripts: `source/scripts/settingsmenuscripts.js` (each control has `_InitStatus` and `_execute` script classes)
- Coordinate system is center 0,0; positive Y is up
- When adding controls to a menu, update: the `.menu` XML (control + navigation chain), background size in `menuBackgrounds.lst`, and script classes + registration in the corresponding scripts file
- The master Sound checkbox enables/disables all sub-checkboxes (Effects, Music, Dialog) via `changeState(ECS_INACTIVE/ECS_DISABLE)`
- **Tap area (touch):** a control's hit area is its largest sprite's size, which can be too small to tap on a phone (1280 game px span about 800–930 CSS px). Enlarge it without changing the art with a `<rect x1 y1 x2 y2/>` size modifier inside the control's `<control>` element (left/bottom/right/top grow, in game px). The button list arrows in `button_list.ctrl` use `<rect x1="25" y1="7" x2="25" y2="7"/>` (33×41 art → 83×55 tap area). Keep x1 = x2 on a rotated control (the increment arrow is rotated 180°, which swaps the sides).
- **Player shield** (`level1state.js` `setShield()`): held with `shield` (keyboard E, gamepad Y, mobile two fingers on the right; a "Shield" row in `key_binding_scroll_box.ctrl`). `player_shield` (art + oval collision polygon) is a hidden child of `player_ship`, so it follows and scales with the ship's 2× head. Collision checks against the player ship strategy (enemy00 shots, boss missiles, `EnemyShip_CheckForCollideWithPlayer`) pass `checkForCollision( nodeAry, playerShipSprite.shieldOn )` so the ship's children are tested only while the shield is up (`setShield()` keeps `shieldOn` on the ship's head sprite); a new check against `_player_ship_` must do the same or it will go through the shield. A child node gets its head's `userId` (`PLAYER_SHIP_ID`), so `collisionCallBack()` spots a shield hit by sprite (`spriteB === playerShip.shieldSprite`). While up, the shield collides and the ship's `filterMaskBits` is 0 (restored from the shield's mask, which matches the ship's). **Don't toggle `playerShip.sprite.collisionComponent.enable` for the shield**: it's the ship's alive flag (input gate, enemy shooting, death check). `collisionCallBack()` swaps a shield hit to the ship sprite and sets `_shieldHit`, so everything is the same as hitting the ship (explosions, sounds, enemy00 hit/die + score, ram cooldown) except no damage. The orange bar (`UIShieldBar`, y=25) works like the boost bar: drains `DEFAULT_SHIP_SHIELD_BAR_VALUE` (3000 ms) while up, recharges at `SHIELD_RECHARGE_SPEED` (0.5×) only while the button is up, and after a full drain (`waitForFullShieldCharge`) it can't come back up until full, so holding the button stalls the recharge. Dropped on release (checked even with a menu up), pause and restart.
- **Unlimited Boost** reward: the boost bar still shows while boosting but stays full (never drained), and hides on boost release.
- **Game over rewards:** `feature_btn_lst` in `game_over.menu` and `game_over_ad.menu` (keep both in sync). Its entry index is the reward id in `Level1State.setupRewards()`: 0 none, 1 `REWARD_FEATURE_UNLIMITED_BOOST`, 2 `DOUBLE_HEALTH`, 3 `HEAL_OVER_TIME`, 4 `RAPID_FIRE`. Add new rewards at the end. **Rapid Fire:** holding fire keeps firing every `RAPID_FIRE_INTERVAL` (150 ms) from `update()` through `firePlayerShot()`. `shootHeld` is set on the shoot press, cleared on its release (checked even while a menu is up), on pause and on restart, so a missed release can't leave it firing.

### Mobile Menu Fork (`_mobile`)
There is a separate mobile fork of the menu, selected at runtime via `isMobile()`:
- `StartUpState.assetLoad()` (`source/state/startupstate.js`) picks the group name: `'(menu)'` on desktop, `'(menu_mobile)'` on mobile. That single `menu_obj` group is used for both `objectDataManager.loadGroup()` and `menuManager.loadGroupXML()`.
- `data/objects/2d/menu/menuListTable.json`: `(menu_mobile)` → `main_menu_mobile.cfg` (the mobile-specific menu config).
- `data/objects/2d/objectDataList/dataListTable.json`: `(menu_mobile)` reuses the same `.lst` files as `(menu)` (backgrounds, button frames, misc) — only the menu `.cfg`/XML differs, not the texture/object data.
- When changing menus, update **both** the desktop and `_mobile` variants (and their entries in the list tables) to keep them in sync.

### Deadzone Slider (shared, platform-aware)
A single `dead_zone_slider` control (in both `settings.menu` and `settings_mobile.menu`) drives two different settings depending on platform, via the shared `DeadZoneSlider_InitStatus`/`DeadZoneSlider_execute` scripts (`source/scripts/settingsmenuscripts.js`) which branch on `isMobile()`:
- **Mobile** → `settings.user.touchDeadZone`, stored directly in **pixels** (slider value is 1:1 with pixels). Mobile menu: `maxValue="100"`, label `"Touch Deadzone: %d"`.
- **Gamepad/desktop** → `settings.user.stickDeadZone`, a **0–1 fraction** shown as a percentage (`value × 100` to display, `× 0.01` to store). Desktop menu: `maxValue="80"`, label `"GPad Deadzone: %d%"`.
- The two menus intentionally use **different `maxValue`s**: gamepad is capped at 80 so 100% can't fully disable the controller (counter-intuitive); touch uses the full 0–100px range.
- The native units are consumed unchanged by gameplay code — `stickDeadZone` in `eventmanager.handleGamepad()` (added to `ANALOG_STICK_MSG_MAX`), `touchDeadZone` (px) in `eventmanager` touch d-pad and `level1state` touch-Y. Only the slider scripts do the conversion.

## Playtesting in Chrome
How the boss fight was bot-played so the user could watch (all temporary, clean up afterwards):
1. Add `window.gLvl = this; // AMP-DEBUG` after `this.gameReady = true;` in the `Level1State` constructor and build (`npx webpack --mode development`). **Remove it and rebuild when done.**
2. Serve the game: `python3 -m http.server 8123 --bind 127.0.0.1` in `invaders/`.
3. Open a visible window: `google-chrome-stable --new-window --remote-debugging-port=9333 --autoplay-policy=no-user-gesture-required --window-size=1300,800 --user-data-dir=/tmp/amp_chrome_live http://127.0.0.1:8123/index.html`. The user may close it between tests; check `http://127.0.0.1:9333/json/list` and relaunch if needed.
4. Drive it with a small Node script over the DevTools protocol (`ws` is in the root `node_modules`): `Input.dispatchKeyEvent` (`code: 'Enter'`) to start the game (also unlocks audio), `Runtime.evaluate` to read `gLvl` state and inject a bot, `Page.captureScreenshot`, `Page.reload` with `ignoreCache` after a rebuild.
5. The bot runs **in the page** (`setInterval` ~50ms) so play is real-time: it dispatches `KeyboardEvent`s on `document` with `code` (`KeyA`/`KeyD`/`KeyW`/`KeyS`/`Space`; the game reads `event.code`), flies toward `gLvl.bossSprite` using the wrap-aware screen distance, faces it, lines up vertically and shoots. Refill health every tick (`gLvl.playerShip.progressBar.setCurrentValue(100)`), because `GOD_MODE` is a `const`. Log measurements (e.g. ship/boss screen X at each lock) to `window` variables and read them back.
6. Clicking away from the window can open the pause menu (focus lost), so the user should just watch while the bot plays.

## Code Conventions

### Naming
- **Classes**: PascalCase (`PlayerShip`, `Level1State`)
- **Files**: lowercase (`statedefs.js`, `commonstate.js`)
- **Constants**: SCREAMING_SNAKE_CASE (`ESGS_GAME_START`, `EGS_LEVEL_1`)
- **Private vars**: Underscore prefix (`this._event`) - assumed to be pre-allocated cache variables to avoid GC, does not need to be defined in the constructor

### Module Structure
```javascript
// 
//  FILE NAME: example.js
//  DESC:      Description
//

"use strict";

import { SomeManager } from '../../library/managers/somemanager';
import * as defs from './statedefs';

export class ExampleClass { ... }

// For singletons
export const exampleManager = new ExampleManager();
```

### Patterns
- **State Machine**: Game states extend CommonState/GameState
- **Signal-based Events**: `signalManager.connect_collisionSignal()` for callbacks
- **Action-based Input**: `actionManager` abstracts keyboard/gamepad
- **Data-driven Config**: JSON/XML files loaded at runtime
- **Promise Loading**: Async asset loading with progress tracking

### Style
- `"use strict";` at file start
- File header comments with FILE NAME and DESC
- 4-space indentation
- ESLint: ES2018, browser environment

## Circular Map / Wrap-Around System
The play area is circular — the player can fly in either X direction and loop back around at `±GAMEPLAY_LOOPING_WRAP_DIST` (5600). Key details:

### Wrapping Pattern
Entities that wrap use this pattern after movement:
```javascript
if( sprite.pos.x < -gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
    sprite.incPosXYZ( gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2 );
else if( sprite.pos.x > gameDefs.GAMEPLAY_LOOPING_WRAP_DIST )
    sprite.incPosXYZ( -(gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2) );
```

### Shortest Path Calculation
When an entity needs to chase a target across the wrap boundary, compute the shortest wrapped delta:
```javascript
this._wrapSpan = gameDefs.GAMEPLAY_LOOPING_WRAP_DIST * 2;
this._deltaX = targetX - this.sprite.pos.x;
if( this._deltaX > this._wrapSpan / 2 )
    this._deltaX -= this._wrapSpan;
else if( this._deltaX < -this._wrapSpan / 2 )
    this._deltaX += this._wrapSpan;
this._targetX = this.sprite.pos.x + this._deltaX;
```

### Wrap-Aware Visibility
To check if a sprite is visible across the wrap boundary, test the sprite's position and both wrapped offsets (±wrapSpan) against the camera's `inView()`. See `inViewWithWrap()` in `enemy00aiscripts.js`.

### Strategies and Rendering
- **`_enemy_shot_` strategy**: Enemy00 projectiles and boss00 missiles are in their own strategy (`enemyshot.strategy`) using `buildingsCamera`, separate from `_player_ship_`. This avoids projectiles being shifted when the player wraps and allows independent wrap-around rendering via `wrapAroundCamera`.
- **`wrapAroundCamera`**: Positioned on the copy of the view on the other side of the map (`buildingsCamera.pos.x ± GAMEPLAY_LOOPING_WRAP_DIST * 2`, set after the `buildingsCamera` reset) while `buildingsCamera.pos.x` is past `±ENEMY_WRAP_RENDER_DIST` (4500, `level1state.js`). `_enemy_` and `_enemy_shot_` get the extra `render(wrapAroundCamera)` in that band; buildings (plus foreground/train re-rendered on top) only in their narrower band (`buildingsCamera.pos.x < -4900 || > 5000`). The enemies' band is wider because big enemies can sit right up to the wrap point: the boss (culling radius about 389) is visible across it from 5600 − (640 + 389) = 4571. With the buildings' band, the boss vanished for a few frames when chased across the wrap point. A new enemy with a bigger radius needs `ENEMY_WRAP_RENDER_DIST` lowered to match.
- **Projectile distance tracking**: Enemy00 projectiles use cumulative `distTraveled` instead of `startPos.calcLength2D()` for lifetime checks, since external position shifts (from strategy-wide wraps) would break absolute distance comparisons.

### Which Entities Wrap
| Entity | Wraps Movement | Wraps Shooting | Notes |
|--------|---------------|----------------|-------|
| Player ship | Yes | N/A | Wraps all sprites in `_player_ship_` strategy + `levelCamera` |
| Enemy00 | Yes (Roam phase) | Yes (via `inViewWithWrap`) | Takes shortest path to buildings and player |
| Enemy02 | Yes (Seek_and_Destroy) | No | Free-flying, natural fit for wrapping |
| Enemy01 | No | No | Boss enemy, stays in play area |
| Enemy00 shots | Yes | N/A | Own strategy (`_enemy_shot_`), wrap independently |
| Boss00 | Yes (travel between buildings) | Yes (via `inViewWithWrap`) | Shortest wrapped path to target building |
| Boss00 missiles | Yes | N/A | `_enemy_shot_`; homing uses the wrap-aware X delta to the player |

## Frame-Rate Independence
All runtime movement must be frame-rate independent for consistent behavior across desktop and mobile.

### Easing System (`library/utilities/easingfunc.js`)
The `valueTo` easing class is **already time-based internally** — `execute()` advances by `highResTimer.elapsedTime`. Key rules:
- **Easing durations** are in seconds (e.g., `distance / pixelsPerSec`). **Never** multiply durations by `highResTimer.timeScale` — that corrupts the timing.
- **Absolute position easings** (used with `setPosXYZ`): Use `getValue()` directly — **never** multiply by `timeScale`. The easing interpolates between start and end over the specified time.
- **Velocity easings** (used with `incPosXYZ`): The easing ramps a velocity value (e.g., 0 → 20). Multiply `getValue()` by `highResTimer.timeScale` since the result is applied per-frame as a position increment.

### Common Patterns
```javascript
// CORRECT: Absolute position from easing (no timeScale)
this.easingY.init( startY, endY, distance / pixelsPerSec, easing.getSineOut() );
this.sprite.setPosXYZ( this.sprite.pos.x, this.easingY.getValue() );

// CORRECT: Velocity from easing (timeScale needed)
this.easingX.init( 0, topSpeed, rampUpSeconds, easing.getLinear() );
this.sprite.incPosXYZ( this.easingX.getValue() * highResTimer.timeScale );

// CORRECT: Direct per-frame movement (elapsedTime needed)
this.sprite.incPosXYZ( this.moveX * highResTimer.elapsedTime * this.SPEED );

// CORRECT: Inherited velocity from another easing (timeScale needed)
this.sprite.incPosXYZ( (this.SPEED * highResTimer.elapsedTime) + (shipVelocity * highResTimer.timeScale) );
```

### Touch Event System
Touch event types are split between library (generic) and game (specific):
- **Library** (`library/common/touchevent.js`): `TOUCH_DPAD_UP/DOWN/LEFT/RIGHT`, `TOUCH_BUTTON_DOWN/UP`
- **Game** (`source/state/gamedefs.js`, starting at 100): `TOUCH_FIRE`, `TOUCH_PAUSE`, `TOUCH_BOOST`, `TOUCH_DPAD_Y_MOVE`, `TOUCH_SHIELD`
- Game-specific touch key codes are registered via `actionManager.registerTouchKeyCode()` in `StartUpState` before `loadFromObj()`
- Touch callbacks are registered in `Level1State` constructor inside `isMobile()` check:
  - `eventManager.leftTouchCallback` — per-frame left-side processing (Y position tracking)
  - `eventManager.leftTouchEndCallback` — left-side touch release
  - `eventManager.rightTouchEndCallback` — right-side touch end (release the boost/fire hold, long horizontal swipe to pause, tap to fire)
  - `eventManager.rightTouchCallback` — per-frame right-side processing (quick swipe up = boost, hold = fire)
- **Right-side gestures** (`onRightTouch`/`onRightTouchEnd` in `level1state.js`): a **quick swipe up** (more than `TOUCH_BOOST_SWIPE_DIST` 40 px up, mostly vertical, within `TOUCH_HOLD_TIME` 300 ms) boosts until the finger is lifted (`TOUCH_BOOST` down/up). **Holding still** for 300 ms fires (`TOUCH_FIRE` down, up on lift), so with the Rapid Fire reward it keeps firing. A **tap** fires one shot (`TOUCH_FIRE` down + up). Once a touch starts a boost or fire hold (`slot.boostHold`/`slot.fireHold`) it stays that until lifted, so its release isn't also a tap or pause. Boost used to be a one-finger hold; it moved to the swipe so Rapid Fire could use the hold on mobile. **Two fingers** on the right side raise the shield (`TOUCH_SHIELD` down) until either is lifted (up). `onRightTouch` counts the active right-side slots in `eventManager.touchPool`; the second finger cancels the first's boost/fire hold and marks both `slot.shieldHold`, so they do nothing else and their release isn't a tap, swipe or pause. `touchShieldHeld` makes sure only one down/up pair is sent.
  - `eventManager.touchEndCallback` — whole-screen touch end (bypasses d-pad/side split, for future use)
- Touch coords (`clientX/Y`, and the `dx/dy` deltas passed to callbacks) are in **CSS pixels**. When comparing them against the screen size (e.g. swipe-distance thresholds, touch-Y mapping), use `device.canvas.clientWidth/clientHeight` — NOT `device.canvas.width/height`, which is the DPR-scaled backing store (see the library's "Canvas Sizing & Device Pixel Ratio" note).
- The above callbacks are the **gameplay** touch path. While a menu is active, touch is instead bridged into the menu system as synthetic mouse events by the library (so sliders/buttons work via touch) — see the library's "Touch → Menu Mouse Bridge" note. The gameplay callbacks are not invoked while a menu is up.

## Platform Integration
- **CrazyGames SDK**: Optional, detected at runtime (`window.CrazyGames`)
- **YouTube Playables**: Optional, detected at runtime (`window.ytgame`)

## Webpack Config
- Entry: `./source/game/main.js`
- Output: `bundle.js`
- Loaders: raw-loader for `.lst` and `.loader` XML files
