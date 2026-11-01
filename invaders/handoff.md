# Boss00 Handoff

## Status
Boss00 (the building-destroying boss) is implemented and playable — plan phases 1–5 are done.
It currently spawns from **temporary test code**, not a real game trigger. All other enemies are disabled while testing.

- Full design/plan: `boss00_plan.md` (questions Q1–Q16 resolved; Q10 sound deferred)
- Original specs: `boss00_prompt.txt`, `boss00_update.txt`
- Plain-language summary: `summary.txt`
- How to add enemies/bosses in general: `AGENTS.md` → "Adding a New Enemy or Boss"

## How the boss behaves
1. Spawns above the screen and descends onto a building **far from the player** (≥ half the wrap distance away).
2. Over the building: beam widens to 33px over 1s. Then the destroy countdown (7s) starts; after 1s the building begins shaking, faster and harder until it's destroyed (shake only moves down — there's no art above/below the building).
3. Boss is **vulnerable only while parked over a building**. Health and hit bars are shown then, hidden while moving.
4. Each player hit lowers the hit bar. When it's empty: boss stops taking hits, loses 1 health, beam retracts, pauses ~1s so the player sees the change, then flies fast to the next building (and can ram the player on the way). Hit bar refills instantly on arrival.
5. Targets only buildings that are not destroyed and not already targeted. With no buildings left, it just sits (the game is over anyway).
6. Free-flying wrap-around movement (shortest wrapped path).
7. Health 0 → beam/bars hidden, shaken building restored, boss falls fast while spinning, then is recycled. Player scores `BOSS00_SHIP_HIT_VALUE` (10).

## Key files
| File | What |
|------|------|
| `data/objects/strategy/level1/enemy.strategy` | `boss00_ship` node (id -20). Null head `null_boss00_ship` + children in render order: `boss00_beam`, `boss00_body`, `UIBossHealthBar`, `UIBossHitBar` |
| `data/objects/2d/objectDataList/level1DataList.lst` | Boss art (source list — edit this, then regenerate the sprite sheet) |
| `data/objects/ai/boss00.ai` | Behavior tree: Descend → DestroyBuilding → repeat[PickAndMoveToBuilding → DestroyBuilding] |
| `source/scripts/boss00aiscripts.js` | AI nodes, building selection, beam, shake, bar visibility, `clearAIData()` |
| `source/scripts/boss00scripts.js` | `Boss00Ship_Hit`, `Boss00Ship_Die` |
| `source/state/gamedefs.js` | `BOSS00_*` tunables |
| `source/state/level1state.js` | AI load, collision handling, cleanup, temp spawn |
| `source/state/startupstate.js` | Script registration |

## Current tunables (`gamedefs.js`, user-tuned — don't overwrite)
Health 5, hit bar 20, destroy 7000ms, interrupt pause 1000ms, beam width 33, beam grow 1s / retract 0.4s, shake delay 1000ms, shake interval 80→15ms, shake amp 2→7, move 1300 px/s, descend 300 px/s, resting Y 55.

## Temporary test code (remove when adding the real trigger)
All in `source/state/level1state.js`, marked `// TEMP`:
- ~L336 `initMiscObjects()`: `bossTestSpawnTimer = new Timer(10000)` and `bossSpawned`.
- ~L947 menu-resume block: restarts the 10s countdown at gameplay start.
- ~L1341 `handleEnemySpawn()`: early `return;` disables all enemy spawning.
- ~L1547 `update()`: spawns the boss 10s in, then calls `prepareScriptOnInit()`.

The user asked to **keep** this for now.

## Not done yet
- **Real spawn trigger** (TBD).
- **Final spawn rules during the fight**: enemy00 keeps spawning; enemy01/02 are paused, then re-enabled with timers restarted when the boss dies.
- Sound (Q10).
- Optional: bigger multi-burst death explosion (idea: several staggered `explode` sprites scattered over the body).

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
- Per-entity state lives on the head sprite: `bossHealth`, `bossHitBar`, `vulnerable`, `interrupted`, `targetBuilding`, `healthBarCtrl`, `hitBarCtrl`, `buildingBaseX/Y`.

## Build / check
```bash
npx webpack --mode development
npx eslint source/scripts/boss00aiscripts.js source/scripts/boss00scripts.js
```
Lint errors that were already in `level1state.js` (`ytgame`, `slot`, unreachable code after the temp early return) are expected.

## Working state
Uncommitted: `source/state/level1state.js` (modified), `summary.txt` and `handoff.md` (new). Don't ask to commit or push.

## Suggested next steps
1. Add the real boss trigger and remove the TEMP code.
2. Apply the enemy spawn rules for the fight (pause/resume enemy01/02).
3. Sound and a bigger death explosion.
