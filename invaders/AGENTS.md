# Invaders Game - AGENTS.md

## Workspace Setup
Always load the `.code-workspace` file to determine project and library paths. Also read the `AGENTS.md` in each library path for its conventions.

## Overview
Space invaders-style game built on the custom WebGL game engine located at `../library/`.

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

### Menu System
- Menu definitions: `data/objects/2d/menu/*.menu` (XML files defining controls, layout, navigation, scripts)
- Menu control templates: `data/objects/2d/menu/control/*.ctrl`
- Menu backgrounds: `data/objects/2d/objectDataList/menuBackgrounds.lst` (defines sizes for scaled-frame backgrounds)
- Settings menu scripts: `source/scripts/settingsmenuscripts.js` (each control has `_InitStatus` and `_execute` script classes)
- Coordinate system is center 0,0; positive Y is up
- When adding controls to a menu, update: the `.menu` XML (control + navigation chain), background size in `menuBackgrounds.lst`, and script classes + registration in the corresponding scripts file
- The master Sound checkbox enables/disables all sub-checkboxes (Effects, Music, Dialog) via `changeState(ECS_INACTIVE/ECS_DISABLE)`

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

## Platform Integration
- **CrazyGames SDK**: Optional, detected at runtime (`window.CrazyGames`)
- **YouTube Playables**: Optional, detected at runtime (`window.ytgame`)

## Webpack Config
- Entry: `./source/game/main.js`
- Output: `bundle.js`
- Loaders: raw-loader for `.lst` and `.loader` XML files
