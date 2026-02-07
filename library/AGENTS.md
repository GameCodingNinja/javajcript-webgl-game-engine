# Game Engine (Library) - AGENTS.md

## Overview
Component-based 2D/3D WebGL game engine with scene graph architecture, manager singletons, and XML-driven asset loading.

## Performance Goal
**Avoid triggering garbage collection (GC) during gameplay.** GC pauses cause frame drops and stuttering. All runtime code should:
- Reuse objects via global temp variables (e.g., `gTempMatrix`, `gTempPoint`, `gTempGroupAry`)
- Avoid creating temporary arrays/objects in hot paths (update, render, collision, physics loops)
- Use object pooling for frequently created/destroyed entities (sprites, projectiles, particles)
- Pre-allocate arrays and reuse them by setting `.length = 0` or direct index assignment
- Cache results instead of recalculating in loops

## Architecture
- **Node Layer**: Scene graph hierarchy (iNode → Node → SpriteNode/ObjectNode/UIControlNode)
- **Sprite Layer**: Entities compose visual, physics, collision, and script components
- **Strategy Layer**: Object pooling, culling, batch rendering
- **Manager Singletons**: Resource management (texture, shader, font, camera, event, sound, action)

## Directory Structure
| Directory | Purpose |
|-----------|---------|
| common/ | Core types: Object, Point, Size, Rect, Color, Camera, defs constants |
| 2d/ | 2D visual components (quad, spritesheet, font) |
| 3d/ | 3D visual components |
| node/ | Scene graph nodes and factory |
| sprite/ | Sprite class and spritesheet handling |
| managers/ | Singleton resource managers |
| gui/ | UI system (menus, buttons, sliders, checkboxes) |
| strategy/ | Entity lifecycle, pooling, culling, rendering |
| objectdatamanager/ | Object definition data loading with validation and dispose lifecycle |
| physics/ | Planck.js/Box2D physics integration |
| collision/ | Collision detection components |
| script/ | Generator-based scripting system |
| sound/ | Web Audio API sound system |
| utilities/ | Math helpers, matrix, timer, easing functions, definition validation |
| system/ | WebGL context (device singleton) |

## Code Conventions

### Naming
- **Classes**: PascalCase (`Sprite`, `UIControl`, `PhysicsComponent2D`)
- **Files**: lowercase, no separators (`objectdatamanager.js`, `visualcomponentspritesheet.js`)
- **Constants**: SCREAMING_SNAKE_CASE with prefix (`EGT_QUAD`, `ECT_CIRCLE`, `EAIS_ACTIVE`)
- **Private/temp vars**: Underscore prefix (`this._node`, `this._result`) - assumed to be pre-allocated cache variables to avoid GC, does not need to be defined in the constructor
- **Singletons**: Lowercase exported instance (`export var device = new Device;`)

### Module Structure
```javascript
// 
//  FILE NAME: example.js
//  DESC:      Description of file
//

"use strict";

import { SomeClass } from '../common/someclass';
import * as defs from '../common/defs';

// Global reusable objects (GC optimization)
var gTempMatrix = new Matrix;

export class ExampleClass { ... }

// For managers - export singleton instance
export var exampleManager = new ExampleManager;
```

### Patterns
- **Singleton Managers**: All resource managers exported as pre-instantiated objects
- **Component Composition**: Sprites compose visual, physics, collision, script components
- **Object Recycling**: Strategy and ScriptComponent implement pooling to avoid GC
- **XML Configuration**: Game data from XML parsed via xmlparsehelper.js
- **Promise-based Loading**: Async asset loading with `genFunc.downloadFile()`
- **Bitmask Flags**: Transform dirty flags (`defs.TRANSLATE | defs.TRANSFORM`)
- **Generator Scripts**: JavaScript generators for coroutine-style behavior
- **Global temp variables**: Reuse objects to avoid allocations (e.g., `gTempGroupAry`, `gValidationContext`)
- **Pre-bound callbacks**: Sort comparators and other callbacks used in hot paths should be class methods bound once in constructor (e.g., `this.sortByZDesc = this.sortByZDesc.bind(this)`) to avoid closure allocation
- **Dispose Lifecycle**: All data classes implement `dispose()` for GPU/physics resource cleanup
- **Definition Validation**: XML definitions validated via `definitionValidator` before loading

### Style
- 4-space indentation
- Spaces around operators
- Comments above methods with `//  DESC:` format
- No trailing commas in object literals

## Device Singleton (system/device.js)
The `device` singleton manages WebGL context creation and provides:
- **Context attributes**: Default attrs in `DEFAULT_CONTEXT_ATTRS`; games can override by passing partial object to `device.create()` which merges with defaults
- **Capabilities**: `device.caps` object contains `maxTextureSize`, `maxAnisotropy`, `anisotropyExt`, `vaoExt` (WebGL1 only)
- **Context loss handling**: Listens for `webglcontextlost`/`webglcontextrestored` events; check `device.lost` flag
- **WebGL version**: `device.isWebGL2` indicates which context was obtained

Example game-level override:
```javascript
device.create('game-surface', { antialias: false }); // pixel-art games
```

## Mouse Coordinates (managers/eventmanager.js)
Mouse events are filtered through `filterMousePos()` which adds game-adjusted properties:
- `event.gameAdjustedMouseX/Y`: Position scaled for fullscreen
- `event.gameAdjustedMovementX/Y`: Relative movement scaled for fullscreen (used by sliders)
- `event.gameAdjustedPixelRatio`: DPR value (1.0 in fullscreen)

Fullscreen scaling uses `canvas.width / canvas.clientWidth` ratio, NOT `devicePixelRatio`.

## Sound System (sound/)
Sound playback is managed by `soundManager` with per-type enable/disable via `settings.user`:
- **Sound Types** (defined in `common/defs.js`): `ESND_EFFECT` (1), `ESND_MUSIC` (2), `ESND_DIALOG` (3) — set from the `type` attribute in sound XML data
- **User Settings** (`utilities/settings.js` → `settings.user`): `soundEnabled` (master toggle), `soundEffectEnabled`, `soundMusicEnabled`, `soundDialogEnabled` — persisted via `localStorage.set('userSettings', settings.user)`
- Sounds only play when the master toggle AND the type-specific toggle are both enabled (see `sound/sound.js` play/resume logic)

## GC Optimization Caveats
- **Do NOT reuse arrays in async/Promise contexts**: Instance variables for promise collection (e.g., `this._promiseAry`) cause race conditions when multiple loads occur concurrently. Use local variables for promise arrays.
- **Avoid `findIndex` with closures**: Use `genFunc.indexOf()` instead of `Array.findIndex((obj) => ...)` to avoid closure creation per call.

## External Dependencies
- **planck-js**: Box2D physics port
- **Web Audio API**: Sound system
- **WebGL2/WebGL**: Rendering context
