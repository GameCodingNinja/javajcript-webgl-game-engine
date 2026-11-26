# Game Template Simple - AGENTS.md

## Workspace Setup
Always load `gametemplatesimple.code-workspace` to find the project and library paths (`.` and `../library`), and read **`../library/AGENTS.md`** before changing code. It covers the engine architecture, code conventions, GC rules, device/DPR canvas sizing, input, sound, collision and the `platform` SDK wrapper, all of which apply here.

## Overview
Starter project for simple games on the WebGL engine in `../library/`: a copy of `gameTemplate` cut down to two states, like Invaders. `StartUpState` shows the logo and a progress bar while it loads the menus and all of `RunState`'s data, then `RunState` runs the game for the rest of the session. `RunState` starts paused behind the pause menu (Resume, Settings, Key Bindings), with the game drawn behind it. The run state content is just a full-screen background (`runstate_background`); there's no physics. The resolution is 1280×720. New games are made by copying this folder and adding their content to the run state. Use `gameTemplate` instead for games that need a title screen or several levels loaded on demand.

## Collaboration Preferences
- Never ask to commit or push changes.
- Never bump the version number (`bundle.js?version=` in `index.html`, `game.version` in `settings.json`) in the template. When testing asset changes, disable the browser cache instead (DevTools `Network.setCacheDisabled`).
- Menu and startup screen sizes, scales and positions come from Invaders (same 1280×720 resolution). Keep them matching when copying changes between the two.
- When playtesting, open a **visible** Chrome window (never headless) and play there so the user can watch. Serve this folder (`python3 -m http.server 8124 --bind 127.0.0.1`), launch `google-chrome-stable --new-window --remote-debugging-port=9334 --window-size=1300,800 --user-data-dir=/tmp/amp_chrome_gt http://127.0.0.1:8124/index.html`, and drive it over the DevTools protocol (`ws` is in the root `node_modules`) with key presses slow enough to follow. Leave the window open when done.

## Performance Goal
**Avoid triggering garbage collection (GC) during gameplay.** Follow the library's rules: reuse pre-allocated temp objects, no allocations or closures in update/transform/render paths, pool frequently created entities.

## Build and Run
```bash
# From gameTemplateSimple/ (webpack lives in the root node_modules)
../node_modules/.bin/webpack --mode development
../node_modules/.bin/webpack --mode production
../node_modules/.bin/webpack --mode none        # VS Code default "make" task
```
- Entry `source/game/main.js`, output `bundle.js` in this folder (gitignored; never edit it). `index.html` loads `bundle.js` into the `game-surface` canvas.
- Webpack's size warnings are on only when `NODE_ENV=production` (set by hosting build servers), with the limit raised to 1 MB (`maxAssetSize`/`maxEntrypointSize`). The production bundle is about 490 KiB, over webpack's default 244 KiB, and the warnings fail server builds. Raise the limit if the bundle grows past 1 MB.
- Assets in `data/` are fetched at runtime by relative path, so serve this folder over HTTP (VS Code Live Server port 5504 per the workspace file, or `python3 -m http.server`) and open `index.html`. Opening the file directly won't load assets.
- No test suite. Verify changes by building and running the game in a browser.
- VS Code tasks for the shared `../tools/` scripts (see library AGENTS.md "Tools"): **"Zip Game"** (production build, then `Gametemplatesimple.zip` for a portal upload) and **"Generate Sprite Sheet"** (`runDataList.lst` → `runSpriteSheetDataList.lst`, `data/textures/run/run_spriteSheet.png`, `data/objects/2d/mesh/run/run.xml`). It fails until `runDataList.lst` has PNG textures (the background is a `.jpg`), and the generated list isn't loaded until the `(run)` group in `dataListTable.json` points at it.

## Directory Structure
| Directory | Purpose |
|-----------|---------|
| source/game/ | `main.js` (entry), `game.js` (WebGL setup, game loop, the startup → run state switch) |
| source/state/ | `gamestate.js` (base), `startupstate.js`, `runstate.js`, `statedefs.js` (state events) |
| source/scripts/ | Script classes registered with `scriptManager` (menus, settings, key binding, utility) |
| data/settings/ | `settings.json` (1280×720 display/device resolution, game name/id/version), `usersettings.json` (default user settings), `controllerMapping.json` (keyboard/mouse/gamepad actions; bump its `version` when changing default bindings so saved key bindings reset) |
| data/objects/2d/ | Object data lists, menus (`menu/`), menu meshes |
| data/objects/strategy/ | Strategy (`.strategy`) and loader (`.loader`) XML plus `strageyListTable.json` (sic). `state/` is the startup screen, `run/` the run state |
| data/objects/camera.lst | Camera definitions (default orthographic) |
| data/shaders/, data/sound/, data/textures/ | Shaders (`shader.json`), sounds (`soundListTable.json`), textures and fonts (`fonts/fontList.json`) |

There are no 3D assets: the 3D will be redone later. The `shader_3d`/`shader_3d_no_txt` shaders in `shader.json` are kept for it.

## Architecture

### Startup (game.js)
`platform.init()` → `settings.loadFromObj()` → `localStorage.init()` → `settings.loadUserSettingsFromObj()` → `device.create('game-surface', { antialias: false })` → GL state from settings → `new StartUpState()`. Keep this order: user settings and local storage depend on the platform save store being ready.

### Game Loop (game.js)
```
doStateChange() → pollEvents() → highResTimer.calcElapsedTime() → physics() → update() → transform() → clear → render() → unbind managers → requestAnimationFrame()
```
When `StartUpState` finishes, `doStateChange()` calls its `cleanUp()`, creates `RunState` and returns without calling `requestAnimationFrame`. `RunState` restarts the loop itself (`requestAnimationFrame( this.callback )`). It is the only state change.

### States
```
GameState (base) → StartUpState, RunState
```
- `StartUpState`: loads all list tables, registers every script module's `loadScripts()`, preloads the `(startup)` group and shows a progress bar while it loads the `(menu)` group, fonts, menus and `RunState`'s data (`runState.load()`). The bar's max is `STARTUP_ASSET_COUNT` (59) on desktop and `STARTUP_ASSET_COUNT_MOBILE` (50) on mobile. Update both when assets change: the real count is in the `StartUp State load complete!` console log. Enforces `MIN_LOAD_TIME`, then fades out and sets `stateChange`.
- `RunState`: activates `_run_` (the `runstate_background` sprite, defined only in `run.loader`) and does one `strategyManager.update()` so it's drawn behind the menu (activated nodes only join a strategy on an update). It opens the pause menu (`pause_tree`) right away, so the game starts paused. Strategy updates pause while a menu is active. It has no physics: the game loop's `physics()` hook is the empty `GameState` one. It handles the menu manager calls itself (events, update, transform, render); there is no CommonState.
- Portal events: `RunState` calls `platform.loadingStop()` on entry. `platform.gameplayStart()` fires when the last menu closes and `platform.gameplayStop()` when a menu opens (`EME_MENU_TRANS_OUT`/`EME_MENU_TRANS_IN`), so the first `gameplayStart()` comes with the first Resume.
- `GameState.update()` runs `scriptSingleton.update()` (screen fades, which run across states) and `soundManager.update()` (drives `Sound.fadeTo()`/`soundManager.crossfade()`; without it fades never progress). **Every state's `update()` must call `super.update()`**.
- `RunState` never exits, so it has no `cleanUp()`. Menus can't change state (there's no Title Screen button). For a game over/restart, reset the game inside `RunState` like Invaders does.
- State event IDs live in `source/state/statedefs.js` (`ESE_*` from 1001).

### Adding Run State Content
1. Add object data to `runDataList.lst` (the `(run)` group in `dataListTable.json`). Add nodes to `data/objects/strategy/run/run.loader`, or new strategies under `data/objects/strategy/run/` registered in `strageyListTable.json` when their nodes need a `.strategy` file.
2. Load them in `runstate.js`'s exported `load()` (load object data group → `strategyLoader.loadFromXml(...)` with loader XML imported via `raw-loader!` → delete the temp `assetHolder`/`spriteSheetManager` groups). `StartUpState` calls it, so the progress bar covers it: update both startup asset counts.
3. Activate the strategies in the `RunState` constructor before its one-time `strategyManager.update()`.
4. Register new script modules in the `StartUpState` constructor.
5. Physics was removed. To add it back: a physics list table (`physicsWorldManager.loadListTableFromObj()` in `StartUpState`), `physicsWorldManager.loadWorldGroup2D()` in `load()`, and a `RunState.physics()` that steps the world while `!menuManager.active` (see `gameTemplate`'s `Level1State`).

### Data-Driven Loading
- List tables (`*ListTable.json`, `dataListTable.json`) map a group name like `(menu)` or a strategy name like `_startup_` to its XML files. Group names use parentheses, strategy names underscores.
- JSON is imported directly into the bundle; XML (`.lst`, `.loader`) is imported as a string with `raw-loader!` and parsed with `genFunc.stringLoadXML()`. Other XML (`.strategy`, `.cfg`, `.menu`, `.ctrl`) is downloaded at runtime by path.
- Loader files create strategy instances: `<node name="..."/>` instantiates a node defined in the `.strategy` file, and `<script prepare="..."/>` prepares one of the sprite's named scripts.

### Scripts
- Each `source/scripts/*.js` file has classes plus a `loadScripts()` that does `scriptManager.set( 'Name', (args) => new Name(args) )`. All are called from the `StartUpState` constructor; a new script file must be added there.
- Scripts implement `execute()` (return `true` when finished) and usually `recycle(...)` so pooled script objects can be reused without allocating. XML references them by registered name (e.g. menu `.menu`/`.ctrl` script attributes like `<script active="Control_OnActive"/>`).
- `utilityscripts.js` holds reusable helpers (`Hold`, `PlayAnim`, `FrameExecute`, `FadeTo`, `ColorTo`) and `ScreenFade`, which both states use to fade in/out and dispatch the `ESE_FADE_*` events. `StartUpState` registers it once on the library `scriptSingleton` (`setScriptInfo( 'screen_fade', 'ScreenFade' )`), and states start fades with `scriptSingleton.prepare( 'screen_fade', current, final, ms, fadeType )`, which recycles the finished `ScreenFade` instead of allocating one per fade. Don't go back to `new ScriptComponent` + `scriptManager.get('ScreenFade')(...)`. `StartUpState` waits for `ESE_FADE_OUT_COMPLETE` with `ESE_FADE_GAME_STATE_CHANGE` before changing state.

### Menu System
- `data/objects/2d/menu/main_menu.cfg` lists the menus (pause, settings, key bindings, confirmation; all scaled 0.8 to fit 720p, like Invaders) and the one tree, `pause_tree` (no root, default `pause_menu`); `menu_action.json` maps menu actions; controls are templates in `menu/control/*.ctrl`; backgrounds sized in `objectDataList/menuBackgrounds.lst`.
- Coordinate system is center 0,0 with positive Y up.
- `confirmation.menu` is `type="blocking"`: escape/toggle/back are ignored while it's idle, so it only closes with Yes/No. It's only used by the key bindings reset (`ConfirmBtn_execute`).
- When adding a control: update the `.menu` XML (control + navigation), the background size in `menuBackgrounds.lst`, and the script classes + registration in the scripts file.
- Settings menu scripts (`settingsmenuscripts.js`) follow the `_InitStatus` / `_execute` pair pattern and save with `localStorage.set( 'userSettings', settings.user )`.
- The settings menu (merged from invaders' desktop menu) has Sound, Effects, Music and Dialog checkboxes plus the gamepad deadzone slider. The master Sound checkbox enables/disables the three sub-checkboxes via `changeState(ECS_INACTIVE/ECS_DISABLE)`. The template has no music, so the checkboxes only save `settings.user`; a game with music should start/stop it in `SoundCheckBox_execute`/`SoundMusicCheckBox_execute` like invaders does.

### Mobile Menu Fork (`_mobile`)
Merged from invaders. `StartUpState.assetLoad()` picks the menu group with `isMobile()`: `(menu)` on desktop, `(menu_mobile)` on mobile, used for `objectDataManager.loadGroup()` and `menuManager.loadGroupXML()`. The sound group stays `(menu)` on both.
- `menuListTable.json`: `(menu_mobile)` → `main_menu_mobile.cfg`, which scales every menu 1.2× for touch and uses `pause_mobile.menu` and `settings_mobile.menu`. It has no `key_bindings_menu`, so the Key Bindings button is `defaultState="disabled"` in the mobile pause menu. An enabled button pointing at a menu the mobile config doesn't load throws in `menutree.onToMenu()`.
- `dataListTable.json`: `(menu_mobile)` reuses the `(menu)` `.lst` files; only the menu XML differs.
- Fewer menu assets load on mobile, hence the separate `STARTUP_ASSET_COUNT_MOBILE`.
- When changing menus, update **both** the desktop and `_mobile` variants.
- **Touch settings are open ended:** the template has no touch gameplay, but `settings_mobile.menu` already has a Left-Handed checkbox (`settings.user.leftHandedTouch` → `eventManager.leftHandedTouch`, applied at startup in `game.js` and on toggle) and the deadzone slider as **Touch Deadzone** in pixels (`settings.user.touchDeadZone`, 0–100). The shared `DeadZoneSlider_*` scripts branch on `isMobile()`: mobile stores pixels in `touchDeadZone`, desktop stores a 0–1 fraction in `stickDeadZone` (max 80% so the gamepad can't be fully disabled). Both values are used by the library `eventManager` touch d-pad / gamepad code once a game adds touch controls.

## Code Conventions
Follow the library's conventions (file header with `FILE NAME`/`DESC`, `"use strict";`, 4-space indent, `//  DESC:` method comments, lowercase file names, PascalCase classes, `SCREAMING_SNAKE_CASE` constants). Library imports from `source/<dir>/` use `'../../../library/...'`.

## Platform Integration
- CrazyGames and YouTube Playables SDK `<script>` tags are commented out in `index.html`; uncomment one to test that platform. Leave them commented for other hosting (the CrazyGames sitelock blocks other domains).
- Always go through the library `platform` singleton (see library AGENTS.md); don't reference `window.CrazyGames` or `window.ytgame` in game code. Portal mute hooks are set up in `StartUpState.preloadComplete()`.
- Saves are keyed by the game name and id in `settings.json` ("Game Template Simple", `NS1IM129`), so they don't collide with `gameTemplate`'s.
