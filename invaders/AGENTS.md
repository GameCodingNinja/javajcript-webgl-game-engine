# Invaders Game - AGENTS.md

## Workspace Setup
Always load the `.code-workspace` file to determine project and library paths. Also read the `AGENTS.md` in each library path for its conventions.

## Overview
Space invaders-style game built on the custom WebGL game engine located at `../library/`.

## Collaboration Preferences
- Never ask to commit or push changes.

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
6. **Hit/Die scripts** → create `source/scripts/<name>scripts.js` (`*_Hit`, `*_Die`), modeled on the enemy ones; explosions via `enemyStrategy.create('explode').get().prepareScript('explode', projectileSprite, sprite)`.
7. **Register + cleanup** → call both `loadScripts()` in [startupstate.js](source/state/startupstate.js), and add `<name>aiscripts.clearAIData()` to the two cleanup spots in [level1state.js](source/state/level1state.js) (`restartGame()` and `cleanUp()`).
8. **Damage/collision** → add `userId` branches in `collisionCallBack()` ([level1state.js](source/state/level1state.js)): one in the "player ship involved" block (entity damages player) and one in the "player shot X" chain (player damages entity → `prepareScript('hit'/'die')` + `updateHudProgress(score)`).
9. **Spawn** → `this.enemyStrategy.create('<node>')` then position it (enemies spawn above the screen and descend).

**CRITICAL gotcha — `prepareOnInit` scripts on a node WITH children:**
- A strategy `<node>` with **no child `<node>`s** becomes a `SpriteLeafNode`, whose `init()` prepares **its own** sprite's `prepareOnInit` scripts (AI, collision). This is why simple enemies (`enemy00_ship`) "just work".
- A node **with children** (e.g. a null head + body/beam/UI children, like `boss00_ship`) becomes a `SpriteNode`, whose `init()` only prepares the **children's** `prepareOnInit` scripts — **NOT the head sprite's own**. So an AI/collision script on such a head node is silently never prepared and never runs.
- **Fix:** after `strategy.create('node')`, call `node.get().prepareScriptOnInit()` on the head sprite. (See the boss spawn in `Level1State.update()`.)

**Boss / multi-part entity structure** (`boss00_ship`): a **null head sprite** (`null_boss00_ship`, a `genType="null"` object that carries the collision circle + `collisionSignal=true`) with visible parts and UI as **child nodes**. Child render order = declaration order in the strategy. The head sprite's transform drives all children, so moving the head moves the whole entity.

**Progress bars / UI on an entity:** add `<node type="uiControlNode"><uiProgressBar>...` children (frame sprite + solid fill + `<stencilMask spriteIndex="1"/>`). Access them from an AI/collision script via `sprite.parentNode.findChild('NodeName').get()`, then `setProgressBarMax / setCurrentValue / setVisible`. Cache the control refs on the sprite (e.g. `sprite.healthBarCtrl`) so both the AI and the collision handler can reach them.

**Per-entity state** lives on the head sprite (e.g. `sprite.targetBuilding`, `sprite.vulnerable`, `sprite.bossHealth`), mirroring how `enemy00` stores `hitCount`/`targetBuilding`. The collision handler reads/writes this state on `spriteB`.

### Menu System
- Menu definitions: `data/objects/2d/menu/*.menu` (XML files defining controls, layout, navigation, scripts)
- Menu control templates: `data/objects/2d/menu/control/*.ctrl`
- Menu backgrounds: `data/objects/2d/objectDataList/menuBackgrounds.lst` (defines sizes for scaled-frame backgrounds)
- Settings menu scripts: `source/scripts/settingsmenuscripts.js` (each control has `_InitStatus` and `_execute` script classes)
- Coordinate system is center 0,0; positive Y is up
- When adding controls to a menu, update: the `.menu` XML (control + navigation chain), background size in `menuBackgrounds.lst`, and script classes + registration in the corresponding scripts file
- The master Sound checkbox enables/disables all sub-checkboxes (Effects, Music, Dialog) via `changeState(ECS_INACTIVE/ECS_DISABLE)`

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
- **`_enemy_shot_` strategy**: Enemy00 projectiles are in their own strategy (`enemyshot.strategy`) using `buildingsCamera`, separate from `_player_ship_`. This avoids projectiles being shifted when the player wraps and allows independent wrap-around rendering via `wrapAroundCamera`.
- **`wrapAroundCamera`**: Positioned based on `buildingsCamera` in the wrap zone. Strategies that need wrap rendering get an additional `render(wrapAroundCamera)` call when `buildingsCamera.pos.x < -4900 || > 5000`.
- **Projectile distance tracking**: Enemy00 projectiles use cumulative `distTraveled` instead of `startPos.calcLength2D()` for lifetime checks, since external position shifts (from strategy-wide wraps) would break absolute distance comparisons.

### Which Entities Wrap
| Entity | Wraps Movement | Wraps Shooting | Notes |
|--------|---------------|----------------|-------|
| Player ship | Yes | N/A | Wraps all sprites in `_player_ship_` strategy + `levelCamera` |
| Enemy00 | Yes (Roam phase) | Yes (via `inViewWithWrap`) | Takes shortest path to buildings and player |
| Enemy02 | Yes (Seek_and_Destroy) | No | Free-flying, natural fit for wrapping |
| Enemy01 | No | No | Boss enemy, stays in play area |
| Enemy00 shots | Yes | N/A | Own strategy (`_enemy_shot_`), wrap independently |

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
- **Game** (`source/state/gamedefs.js`, starting at 100): `TOUCH_FIRE`, `TOUCH_PAUSE`, `TOUCH_BOOST`, `TOUCH_DPAD_Y_MOVE`
- Game-specific touch key codes are registered via `actionManager.registerTouchKeyCode()` in `StartUpState` before `loadFromObj()`
- Touch callbacks are registered in `Level1State` constructor inside `isMobile()` check:
  - `eventManager.leftTouchCallback` — per-frame left-side processing (Y position tracking)
  - `eventManager.leftTouchEndCallback` — left-side touch release
  - `eventManager.rightTouchEndCallback` — right-side touch end (tap to fire, hold to boost, swipe to pause)
  - `eventManager.rightTouchCallback` — per-frame right-side processing (boost hold detection)
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
