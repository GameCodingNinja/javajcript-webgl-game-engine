# Game Template - AGENTS.md

## Workspace Setup
Always load `gametemplate.code-workspace` to find the project and library paths (`.` and `../library`), and read **`../library/AGENTS.md`** before changing code. It covers the engine architecture, code conventions, GC rules, device/DPR canvas sizing, input, sound, collision and the `platform` SDK wrapper, all of which apply here.

## Overview
Starter project for new games on the WebGL engine in `../library/`. It wires up the full state flow (startup → title screen → load → level 1), the menu system (title, pause, settings, key bindings, confirmation), and a small demo: a spinning 3D cube on the title screen and Planck.js physics shapes dropping onto a stage in level 1. New games are made by copying this folder and replacing the level content.

## Collaboration Preferences
- Never ask to commit or push changes.
- When playtesting, open a **visible** Chrome window (never headless) and play there so the user can watch. Serve this folder (`python3 -m http.server 8124 --bind 127.0.0.1`), launch `google-chrome-stable --new-window --remote-debugging-port=9334 --window-size=1300,800 --user-data-dir=/tmp/amp_chrome_gt http://127.0.0.1:8124/index.html`, and drive it over the DevTools protocol (`ws` is in the root `node_modules`) with key presses slow enough to follow. Leave the window open when done.

## Performance Goal
**Avoid triggering garbage collection (GC) during gameplay.** Follow the library's rules: reuse pre-allocated temp objects, no allocations or closures in update/transform/render paths, pool frequently created entities.

## Build and Run
```bash
# From gameTemplate/ (webpack lives in the root node_modules)
../node_modules/.bin/webpack --mode development
../node_modules/.bin/webpack --mode production
../node_modules/.bin/webpack --mode none        # VS Code default "make" task
```
- Entry `source/game/main.js`, output `bundle.js` in this folder (gitignored; never edit it). `index.html` loads `bundle.js` into the `game-surface` canvas.
- Webpack's size warnings are on only when `NODE_ENV=production` (set by hosting build servers), with the limit raised to 1 MB (`maxAssetSize`/`maxEntrypointSize`). The production bundle is about 510 KiB, over webpack's default 244 KiB, and the warnings fail server builds. Raise the limit if the bundle grows past 1 MB.
- Assets in `data/` are fetched at runtime by relative path, so serve this folder over HTTP (VS Code Live Server port 5503 per the workspace file, or `python3 -m http.server`) and open `index.html`. Opening the file directly won't load assets.
- No test suite. Verify changes by building and running the game in a browser.
- VS Code tasks for the shared `../tools/` scripts (see library AGENTS.md "Tools"): **"Zip Game"** (production build, then `Gametemplate.zip` for a portal upload) and **"Generate Sprite Sheet"** (`level1DataList.lst` → `level1SpriteSheetDataList.lst`, `data/textures/level/level1_spriteSheet.png`, `data/objects/2d/mesh/level/level1.xml`). The generated list isn't loaded until the `(level_1)` group in `dataListTable.json` points at it.

## Directory Structure
| Directory | Purpose |
|-----------|---------|
| source/game/ | `main.js` (entry), `game.js` (WebGL setup, game loop, state switching), `gamesave.js` (empty save stub) |
| source/state/ | Game states and state defines |
| source/scripts/ | Script classes registered with `scriptManager` (menus, settings, key binding, level, utility) |
| data/settings/ | `settings.json` (resolution, device, game name/id/version), `usersettings.json` (default user settings), `controllerMapping.json` (keyboard/mouse/gamepad actions; bump its `version` when changing default bindings so saved key bindings reset) |
| data/objects/2d/ | Object data lists, menus (`menu/`), menu meshes, physics worlds |
| data/objects/3d/ | Cube mesh and object data |
| data/objects/strategy/ | Strategy (`.strategy`) and loader (`.loader`) XML plus `strageyListTable.json` (sic) |
| data/objects/camera.lst | Camera definitions (default orthographic, `cubeCamera` perspective) |
| data/shaders/, data/sound/, data/textures/ | Shaders (`shader.json`), sounds (`soundListTable.json`), textures and fonts (`fonts/fontList.json`) |
| data/objects/2d/slot/ | Leftover slot-machine configs, not loaded by the template |
| development/ | Raw source art (`.xcf`, `.blend`) - **can be ignored** |

## Architecture

### Startup (game.js)
`platform.init()` → `settings.loadFromObj()` → `localStorage.init()` → `settings.loadUserSettingsFromObj()` → `device.create('game-surface', { antialias: false })` → GL state from settings → `new StartUpState()`. Keep this order: user settings and local storage depend on the platform save store being ready.

### Game Loop (game.js)
```
doStateChange() → pollEvents() → highResTimer.calcElapsedTime() → physics() → update() → transform() → clear → render() → unbind managers → requestAnimationFrame()
```
When a state change happens the loop returns without calling `requestAnimationFrame`; the new state restarts the loop itself once its assets are ready (`requestAnimationFrame( this.callback )`).

### State Machine
```
GameState (base) → CommonState (menus) → TitleScreenState, Level1State
                 ↘ StartUpState, LoadState
```
- `StartUpState`: loads all list tables, registers every script module's `loadScripts()`, preloads the `(startup)` group and shows a progress bar (`STARTUP_ASSET_COUNT`) while loading the `(menu)` group, fonts, menus and the title screen assets. Enforces `MIN_LOAD_TIME`.
- `TitleScreenState`: `_title_screen_` and `_cube_` strategies, `title_screen_tree` menu.
- `LoadState`: loading screen between states; calls the target state's exported `load()` and shows a percentage from its `ASSET_COUNT`.
- `Level1State`: `_level-1-stage_` and `_level-1-ball_` strategies, `(game)` physics world, `pause_tree` menu. Physics and strategy updates pause while a menu is active. Reports `platform.gameplayStart/Stop()` on pause menu in/out.
- `GameState.update()` runs `scriptSingleton.update()` (screen fades, which run across states) and `soundManager.update()` (drives `Sound.fadeTo()`/`soundManager.crossfade()`; without it fades never progress). **Every state's `update()` must call `super.update()`**; `CommonState.update()` does, then updates the menus.
- `CommonState` passes events to `menuManager` and turns `EME_MENU_GAME_STATE_CHANGE` + fade-out into a state change. State names used by menus (`'title_screen_state'`, `'level_1_state'`) are mapped in `CommonState.getLoadState()` and `GameState.getGameState()/getStateStr()`.
- State and event IDs live in `source/state/statedefs.js` (`EGS_*` states, `ESE_*` events from 1000). `StateMessage` carries the load/unload states to `LoadState`.

### Adding a New State / Level
1. Add an `EGS_*` id in `statedefs.js` and its string in `CommonState.getLoadState()` and `GameState.getGameState()/getStateStr()`.
2. Create the state class (extend `CommonState` if it shows menus). Fade in with `scriptSingleton.prepare( 'screen_fade', 0, 1, 500, stateDefs.ESE_FADE_GAME_STATE_CHANGE )`, call `super.update()` in `update()`, and write a `cleanUp()` that deletes only its own strategies (`strategyManager.deleteStrategy([...])`, never `clear()`), frees its object data groups and destroys its physics world.
3. Export `ASSET_COUNT` and a `load()` that returns a promise (load object data group → physics → `strategyLoader.loadFromXml(...)` → delete temp `assetHolder`/`spriteSheetManager` groups). Use `return Promise.resolve();` when nothing loads.
4. Add the branch in `Game.doStateChange()` and in `LoadState.assetLoad()`.
5. Register the data: groups in `dataListTable.json`, strategies in `strageyListTable.json`, physics in `physicsListTable.json`, and import loader XML with `raw-loader!`.

### Data-Driven Loading
- List tables (`*ListTable.json`, `dataListTable.json`) map a group name like `(menu)` or a strategy name like `_level-1-ball_` to its XML files. Group names use parentheses, strategy names underscores.
- JSON is imported directly into the bundle; XML (`.lst`, `.loader`) is imported as a string with `raw-loader!` and parsed with `genFunc.stringLoadXML()`. Other XML (`.strategy`, `.cfg`, `.menu`, `.ctrl`) is downloaded at runtime by path.
- Loader files create strategy instances: `<node name="..."/>` instantiates a node defined in the `.strategy` file, and `<script prepare="..."/>` prepares one of the sprite's named scripts.

### Scripts
- Each `source/scripts/*.js` file has classes plus a `loadScripts()` that does `scriptManager.set( 'Name', (args) => new Name(args) )`. All are called from the `StartUpState` constructor; a new script file must be added there.
- Scripts implement `execute()` (return `true` when finished) and usually `recycle(...)` so pooled script objects can be reused without allocating. XML references them by registered name (e.g. `<script ball_ai="Level_BallAi"/>`, menu `.menu`/`.ctrl` script attributes).
- `utilityscripts.js` holds reusable helpers (`Hold`, `PlayAnim`, `FrameExecute`, `FadeTo`, `ColorTo`) and `ScreenFade`, which every state uses to fade in/out and dispatch the `ESE_FADE_*` events that drive state changes. `StartUpState` registers it once on the library `scriptSingleton` (`setScriptInfo( 'screen_fade', 'ScreenFade' )`), and states start fades with `scriptSingleton.prepare( 'screen_fade', current, final, ms, fadeType )`, which recycles the finished `ScreenFade` instead of allocating one per fade. Don't go back to `new ScriptComponent` + `scriptManager.get('ScreenFade')(...)`. A fade-out that should change state must pass `ESE_FADE_GAME_STATE_CHANGE` as `fadeType`.

### Menu System
- `data/objects/2d/menu/main_menu.cfg` lists menus and trees (`title_screen_tree`, `pause_tree`); `menu_action.json` maps menu actions; controls are templates in `menu/control/*.ctrl`; backgrounds sized in `objectDataList/menuBackgrounds.lst`.
- Coordinate system is center 0,0 with positive Y up.
- `confirmation.menu` is `type="blocking"`: escape/toggle/back are ignored while it's idle, so it only closes with Yes/No.
- When adding a control: update the `.menu` XML (control + navigation), the background size in `menuBackgrounds.lst`, and the script classes + registration in the scripts file.
- Settings menu scripts (`settingsmenuscripts.js`) follow the `_InitStatus` / `_execute` pair pattern and save with `localStorage.set( 'userSettings', settings.user )`.
- The settings menu (merged from invaders' desktop menu) has Sound, Effects, Music and Dialog checkboxes plus the gamepad deadzone slider. The master Sound checkbox enables/disables the three sub-checkboxes via `changeState(ECS_INACTIVE/ECS_DISABLE)`. The template has no music, so the checkboxes only save `settings.user`; a game with music should start/stop it in `SoundCheckBox_execute`/`SoundMusicCheckBox_execute` like invaders does.

### Mobile Menu Fork (`_mobile`)
Merged from invaders. `StartUpState.assetLoad()` picks the menu group with `isMobile()`: `(menu)` on desktop, `(menu_mobile)` on mobile, used for `objectDataManager.loadGroup()` and `menuManager.loadGroupXML()`. The sound group stays `(menu)` on both.
- `menuListTable.json`: `(menu_mobile)` → `main_menu_mobile.cfg`, which scales every menu 1.2× for touch and uses `title_screen_mobile.menu`, `pause_mobile.menu` and `settings_mobile.menu`. It has no `key_bindings_menu`, so the Key Bindings buttons are `defaultState="disabled"` in the mobile title and pause menus. An enabled button pointing at a menu the mobile config doesn't load throws in `menutree.onToMenu()`.
- `dataListTable.json`: `(menu_mobile)` reuses the `(menu)` `.lst` files; only the menu XML differs.
- Fewer menu assets load on mobile, so the startup progress bar uses `STARTUP_ASSET_COUNT_MOBILE` (68) vs `STARTUP_ASSET_COUNT` (77). Update both when menu assets change.
- When changing menus, update **both** the desktop and `_mobile` variants.
- **Touch settings are open ended:** the template has no touch gameplay, but `settings_mobile.menu` already has a Left-Handed checkbox (`settings.user.leftHandedTouch` → `eventManager.leftHandedTouch`, applied at startup in `game.js` and on toggle) and the deadzone slider as **Touch Deadzone** in pixels (`settings.user.touchDeadZone`, 0–100). The shared `DeadZoneSlider_*` scripts branch on `isMobile()`: mobile stores pixels in `touchDeadZone`, desktop stores a 0–1 fraction in `stickDeadZone` (max 80% so the gamepad can't be fully disabled). Both values are used by the library `eventManager` touch d-pad / gamepad code once a game adds touch controls.

## Code Conventions
Follow the library's conventions (file header with `FILE NAME`/`DESC`, `"use strict";`, 4-space indent, `//  DESC:` method comments, lowercase file names, PascalCase classes, `SCREAMING_SNAKE_CASE` constants). Library imports from `source/<dir>/` use `'../../../library/...'`.

## Platform Integration
- CrazyGames and YouTube Playables SDK `<script>` tags are commented out in `index.html`; uncomment one to test that platform. Leave them commented for other hosting (the CrazyGames sitelock blocks other domains).
- Always go through the library `platform` singleton (see library AGENTS.md); don't reference `window.CrazyGames` or `window.ytgame` in game code. Portal mute hooks are set up in `StartUpState.preloadComplete()`.
