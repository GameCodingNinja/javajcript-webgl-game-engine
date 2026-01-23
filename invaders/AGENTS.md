# Invaders Game - AGENTS.md

## Overview
Space invaders-style game built on the custom WebGL game engine located at `../library/`.

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
- Menu transitions

## Code Conventions

### Naming
- **Classes**: PascalCase (`PlayerShip`, `Level1State`)
- **Files**: lowercase (`statedefs.js`, `commonstate.js`)
- **Constants**: SCREAMING_SNAKE_CASE (`ESGS_GAME_START`, `EGS_LEVEL_1`)
- **Private vars**: Underscore prefix (`this._event`)

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

## Platform Integration
- **CrazyGames SDK**: Optional, detected at runtime (`window.CrazyGames`)
- **YouTube Playables**: Optional, detected at runtime (`window.ytgame`)

## Webpack Config
- Entry: `./source/game/main.js`
- Output: `bundle.js`
- Loaders: raw-loader for `.lst` and `.loader` XML files
