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
- **Private/temp vars**: Underscore prefix (`this._node`, `this._result`)
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
- **Dispose Lifecycle**: All data classes implement `dispose()` for GPU/physics resource cleanup
- **Definition Validation**: XML definitions validated via `definitionValidator` before loading

### Style
- 4-space indentation
- Spaces around operators
- Comments above methods with `//  DESC:` format
- No trailing commas in object literals

## External Dependencies
- **planck-js**: Box2D physics port
- **Web Audio API**: Sound system
- **WebGL2/WebGL**: Rendering context
