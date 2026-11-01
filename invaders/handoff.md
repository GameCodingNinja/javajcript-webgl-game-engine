# Boss00 Handoff

## Status
Boss00 (the building-destroying boss) is implemented and playable — plan phases 1–5 are done.
Its **homing missile attack** is also done (missile phases M1–M4; the final flight style was approved by the user).
It currently spawns from **temporary test code**, not a real game trigger. All other enemies are disabled while testing.

- Boss design/plan: `boss00_plan.md` (questions Q1–Q16 resolved; Q10 sound deferred)
- Missile design/plan: `boss00_missle_plan.md` (see "M4 revised (as built)" for the final flight)
- Original specs: `boss00_prompt.txt`, `boss00_update.txt`
- Plain-language summary: `summary.txt` (covers the boss, not the missile)
- How to add enemies/bosses/projectiles in general: `AGENTS.md` → "Adding a New Enemy or Boss" and "Adding an Enemy Projectile"

## How the boss behaves
1. Spawns above the screen and descends onto a building **far from the player** (≥ half the wrap distance away).
2. Over the building: beam widens to 33px over 1s. Then the destroy countdown (7s) starts; after 1s the building begins shaking, faster and harder until it's destroyed (shake only moves down — there's no art above/below the building).
3. Boss is **vulnerable only while parked over a building**. Health and hit bars are shown then, hidden while moving.
4. Each player hit lowers the hit bar. When it's empty: boss stops taking hits, loses 1 health, beam retracts, pauses ~1s so the player sees the change, then flies fast to the next building. **Half the time (`BOSS00_CHARGE_CHANCE` 0.5) it charges**: it travels to the building in the direction of the player (going the long way around the map if needed), at its normal height and speed, so it can ram the player on the way (only if the player is alive and the boss is on screen). Ramming the player costs 20 health. Hit bar refills instantly on arrival.
5. Targets only buildings that are not destroyed and not already targeted. **First descent:** a random building in the half farthest from the player. **Each later move:** a random building at least `BOSS00_MIN_TARGET_DIST` (2000px = 10 buildings, wrap-aware) from the boss. If only closer buildings are left, it picks one of them and **always goes the long way around** the map. With no buildings left, it just sits (the game is over anyway).
6. Free-flying wrap-around movement (shortest wrapped path).
7. Health 0 → beam/bars hidden, shaken building restored, boss falls fast while spinning, then is recycled. Player scores `BOSS00_SHIP_HIT_VALUE` (10).
8. **Music:** on spawn, the game music crossfades (2s, `BOSS00_MUSIC_FADE_MS`) to `LOOP_City-Showdown`. On death (`EGE_BOSS_DEFEATED`), it crossfades back to the track that was playing, and the 5-minute rotation timer restarts. Pause/resume/game over use `getGameMusic()`, so they handle the boss track. **Crash sound:** `boss_crash` plays when the death fall lands.

## How the missile behaves
- **When:** only while the beam is out (DestroyBuilding `destroying` phase, not after an interrupt), and only if the boss is in view and the player is alive. About one per second (1000ms ± 200). First missile about 1s after the beam appears. Stops on retract, interrupt, travel, and boss death.
- **Launch:** from either side of the boss at random (±30px from center, regardless of where the player is), flying straight **up or down** at random for 250ms.
- **Curve:** then it homes in on the player at up to 180°/s (a smooth arc). The nose always faces the direction of flight, and the missile cycles `missile-0`/`missile-1` every 80ms.
- **Far-side loop:** if it launched on the side away from the player, it doesn't hard turn back across the boss. It turns **outward** at 120°/s (wide enough to clear the boss body) and loops back around. Once its natural turn toward the player matches the loop direction, normal homing takes over.
- **Final run (dodge window):** once within 200px **and** its nose is within 10° of the player, it stops steering and flies straight. A player who sits still gets hit, one who moves dodges it, and the missile shoots out the other side.
- **Hit:** 30 player health (unless `GOD_MODE`), player explosion + `player_hit` sound, missile removed. Player shots pass through missiles. Missiles expire after 6s or when they leave the screen vertically.
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
| `source/state/gamedefs.js` | `BOSS00_*` tunables (boss + missile) |
| `source/state/level1state.js` | AI load, collision handling (incl. `BOSS00_SHOT_ID` branch), cleanup, temp spawn |
| `source/state/startupstate.js` | Script registration |

## Current tunables (`gamedefs.js`, user-tuned — don't overwrite)
**Boss:** charge chance 0.5, health 5, hit bar 20, destroy 7000ms, interrupt pause 1000ms, beam width 33, beam grow 1s / retract 0.4s, shake delay 1000ms, shake interval 80→15ms, shake amp 2→7, move 1300 px/s, descend 300 px/s, resting Y 55.

**Missile:** `BOSS00_SHOT_ID` -21, `FIRE_INTERVAL` 1000ms, `FIRE_JITTER` 200ms, `MISSILE_SPEED` 0.3 px/ms, `TURN_RATE` 180°/s, `LAUNCH_TIME` 250ms, `LOOP_TURN_RATE` 120°/s, `LOCK_DIST` 200px, `LOCK_ALIGN` 10°, `SPAWN_OFFSET_X` 30px, `ANIM_MS` 80, `LIFETIME` 6000ms, `DAMAGE` 30. Scale (2×) is in the strategy, not code.

## Temporary test code (remove when adding the real trigger)
All in `source/state/level1state.js`, marked `// TEMP`:
- ~L336 `initMiscObjects()`: `bossTestSpawnTimer = new Timer(10000)` and `bossSpawned`.
- ~L959 menu-resume block: restarts the 10s countdown at gameplay start.
- ~L1353 `handleEnemySpawn()`: early `return;` disables all enemy spawning.
- ~L1559 `update()`: spawns the boss 10s in, then calls `prepareScriptOnInit()`.

The user asked to **keep** this for now. Also note **`GOD_MODE = true`** (~L91), set by the user for testing; set it to `false` to see missile/ram damage.

## Not done yet
- **Real spawn trigger** (TBD).
- **Final spawn rules during the fight**: enemy00 keeps spawning; enemy01/02 are paused, then re-enabled with timers restarted when the boss dies.
- Sound (Q10) is done: missile launch, boss crash, and boss battle music.
- Death explosion is done: 10 staggered bursts (2–4× scale) scattered over the body, each playing `enemy_explosion` (`BOSS00_DEATH_BURST_*`).

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
- Missile rotation uses `setRotXYZ(0, 0, radians, false)`. The art points right, so heading = `atan2(dy, dx)`. Turn-rate constants are converted to radians/ms once at module load in `boss00scripts.js`.

## Build / check
```bash
npx webpack --mode development
npx eslint source/scripts/boss00aiscripts.js source/scripts/boss00scripts.js
```
Lint errors that were already in `level1state.js` (`ytgame` ×2, `slot`, unreachable code after the temp early return) are expected.

## Working state
Uncommitted: the missile work (`enemyshot.strategy`, `boss00aiscripts.js`, `boss00scripts.js`, `gamedefs.js`, `level1state.js`, `level1SpriteSheetDataList.lst`), `boss00_missle_plan.md` (new), and doc updates to `handoff.md` / `AGENTS.md`. Don't ask to commit or push.

## Suggested next steps
1. Add the real boss trigger and remove the TEMP code (and restore `GOD_MODE = false`).
2. Apply the enemy spawn rules for the fight (pause/resume enemy01/02).
3. A bigger death explosion. When the real trigger replaces the TEMP spawn, keep the `startBossMusic()` call with the spawn.
