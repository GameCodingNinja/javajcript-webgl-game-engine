# Boss00 Enemy — Implementation Plan

## Goal
Add a new boss enemy, **boss00**, that:
- Descends directly onto a building **far from the player** and immediately begins destroying it.
- Then repeatedly: picks the next building (preferring one **far from the player**), moves quickly over it, destroys it with an animated **beam**, then repeats.
- Beam behavior: starts thin as it fades in, widens to **33px**; the building **shakes progressively faster** over **5 seconds** until destroyed (falls, same as `Building_Die`), and the beam **narrows and disappears** as the building falls.
- Shows **two stacked progress bars above** the boss: a **health bar** and a **hit bar** (see Boss Battle Mechanics).
- Keeps doing this until the player kills the boss (depletes the health bar).

## Boss Battle Mechanics (authoritative — from `boss00_update.txt`)
Two progress bars, both **start full and all green**:
- **Health bar**: range **0–4** (4 = full). This is the boss's life — when it reaches 0 the boss dies.
- **Hit bar**: range **0–30** (30 = full). This is the per-building "interrupt" meter.

Per-building attack cycle:
1. Boss moves quickly to a chosen building (preferring one far from the player) and begins the beam attack (beam widens to **33px**; building shakes progressively faster; **5 seconds** to destroy). The **hit bar is full (30)**.
2. Each time the **player shoots the boss**, the **hit bar drops by 1**.
3. **Two possible outcomes:**
   - **Player depletes the hit bar (30 → 0) before the beam destroys the building** → the player has *interrupted* the boss. Sequence:
     1. The boss **immediately stops taking hits** (collision detection **disabled**) and the **health bar drops by 1**.
     2. **Pause ~1 second** so the player can see the change (hit bar empty, health bar dropped).
     3. The boss **stops attacking** (building is saved), **picks a new far building**, and **moves quickly** to it.
     4. On arrival, the **hit bar refills to 30** and the boss **starts taking hits again** (collision detection **re-enabled**).
   - **Boss destroys the building before the hit bar is depleted** → building is lost (`Building_Die`), boss **moves quickly to the next building**, the **hit bar is replenished** on arrival, and the boss **takes no damage** (health unchanged).
4. **Hittable (vulnerable) only while attacking a building with a non-empty hit bar.** ⚠️ **Refinement vs. the earlier "collision toggle" decision**: the boss must still be able to **collide with and damage the player while fast-moving** to the next building, so we **cannot** fully disable `collisionComponent` during travel. Resolution: keep `collisionComponent.enable` ON during both attack and travel; gate **shot damage** with a separate `vulnerable` flag (true only during an active attack). The player-shot-hits-boss handler checks `vulnerable`; the boss-hits-player handler always applies while collision is enabled. (Collision may still be fully disabled during the initial descent.)
5. Repeat until the **health bar = 0** → boss dies. (Player must successfully interrupt **4** building attacks to win.)

Additional behavior:
- **Target selection**: pick a building that is **(a) not destroyed, (b) not already selected/marked** by another entity, and **(c) far from the player** (randomly among far candidates if possible) to force the player to chase the boss. The boss **marks** the building it selects (e.g., sets `targetBuilding`, like enemy00) so it (and other enemies) won't re-select the same one; the mark is **released** when the boss moves off it (interrupted, destroyed, or re-targeting).
- **Aggression**: the boss does **not** drift/move while attacking a building (it stays put over the target). It can hit the player **only during the fast move to the next building** — when it's time to relocate, it **fast-moves in the player's direction**, so the player can take collision damage as the boss barrels past (the boss is invulnerable during this move).
- **Spawning during the boss battle**: **final** — **enemy00 keeps spawning**, **enemy01 + enemy02 are disabled**. **During development/testing, ALL enemies are disabled** (current `handleEnemySpawn()` early-return).

## What Already Exists (verified in code)
- **Art**: `boss00_ship` object is already defined in [level1DataList.lst](data/objects/2d/objectDataList/level1DataList.lst) (source; regenerate the sprite sheet after editing) (glyph `boss00`, sprite-sheet rect 164,0–668,400 ≈ **504×400 px**, collision circle radius **100**).
- **Building destruction**: `Building_Die` script in [levelscripts.js](source/scripts/levelscripts.js) — set `sprite.prepareScript('die')`, it sets `destroyed = true`, animates the fall, dispatches `EGE_BUILDING_DESTROYED`. We reuse this exactly.
- **Building targeting pattern**: `AI_Enemy00_Roam` / `AI_Enemy00_DestroyBuilding` in [enemy00aiscripts.js](source/scripts/enemy00aiscripts.js) already implements "pick a building not targeted by another enemy, move to it, destroy it." This is the closest reference for the boss AI.
- **Behavior-tree AI structure**: `.ai` XML (head → composite → leaf nodes) loaded per [aiListTable.json](data/objects/ai/aiListTable.json); leaf scripts registered via `scriptManager.set(...)` in `loadScripts()`.
- **Strategy structure**: `.strategy` XML per [strageyListTable.json](data/objects/strategy/strageyListTable.json). `enemy.strategy` uses `defaultCamera="buildingsCamera"` (shares building coordinate space — important so the boss lines up with buildings).
- **Health-bar UI**: `uiControlNode` + `uiProgressBar` pattern in [playerShip.strategy](data/objects/strategy/level1/playerShip.strategy) (`UIProgressBar`/`UIBoostBar`), driven at runtime with `setProgressBarMax / setCurrentValue / incCurrentValue / setVisible` (see [level1state.js](source/state/level1state.js)). We mirror this for the boss health bar.
- **Hit/die wiring**: `collisionCallBack()` in [level1state.js](source/state/level1state.js) branches on `spriteB.parentNode.userId`, increments `hitCount`, calls `prepareScript('hit')` / `prepareScript('die')` at thresholds. We add a `BOSS00_SHIP_ID` branch here.
- **Script registration**: all `loadScripts()` calls are invoked from [startupstate.js](source/state/startupstate.js); `clearAIData()` for AI data is called in [level1state.js](source/state/level1state.js).

## Key Design Decisions (resolved via Open Questions below)
- **Boss lives in the `_enemy_` strategy** (a boss is an enemy) — `boss00_ship` node added to `enemy.strategy` alongside enemy00/01/02. The `_enemy_` strategy is already updated/transformed/rendered explicitly in the `Level1State` game loop (incl. wrap-around camera passes), so the boss gets all that for free.
- **userId** `BOSS00_SHIP_ID = -20` (node `id="-20"` in `enemy.strategy`).
- **Boss sprite scale = 1** (full 504×400 art). **Resting Y = `BOSS00_RESTING_Y = 60`**.
- **Beam** = `boss00_beam` solid quad (done), a child sprite node of `boss00_ship`, scaled in X (thin → **33px** → thin) to grow/shrink; full beam→destroy takes **5s** with the building shaking progressively faster.
- **Two progress bars** (both child `uiProgressBar` nodes above the boss, **start full + green** — done in `enemy.strategy`):
  - **`UIBossHealthBar`** (y=220): boss life, **max 4**. Drops 1 each time the player interrupts an attack. 0 → boss dies.
  - **`UIBossHitBar`** (y=205): per-building interrupt meter, **max 30**. Drops 1 per player shot; refilled when the boss re-engages a new building.
- **Boss AI** (state machine): descend → pick a **far-from-player** building → move **quickly** toward it (fast move **starts in the player's direction** so it can hit the player en route) → beam attack with the hit bar active (**no drift** — stays put over the building) → on **interrupt** (hit bar hits 0: health−1, ~1s pause so the player sees it, building saved) or **building destroyed** (no health loss), pick the next far building and repeat. No projectile shooting (collision damage only). Wrap-aware, frame-rate-independent easing per AGENTS.md.
- **Damage model**: player shots reduce the **hit bar**, not health directly. Health only drops on a successful interrupt. This **replaces** the old "hit count 50→200" model.
- **Vulnerability via a `vulnerable` flag** (not a pure collision toggle): the boss takes **shot damage only while `vulnerable`** (an active attack with hit bar > 0). `collisionComponent` stays **enabled during attack AND travel** so the boss can still **hit the player** while fast-moving to the next building; it may be fully disabled only during the initial descent. The shot-damage handler checks `vulnerable`; the boss-hits-player handler applies whenever collision is enabled.
- **Spawn (temporary)**: one boss, 20s after game start, via a one-shot timer. During the boss battle, **enemy01 + enemy02 spawning is disabled**.

---

## Phase 1 — Data/Art & Strategy Scaffolding — **DONE**
The boss is a member of the existing `_enemy_` strategy (a boss is an enemy), so no separate strategy/loader was needed.

1. **`boss00_ship` node** (id `-20`) added to [enemy.strategy](data/objects/strategy/level1/enemy.strategy), structured like `player_ship`:
   - **Null head** sprite `null_boss00_ship` (carries collision r=100, `collisionSignal=true`) with scripts `hit="Boss00Ship_Hit"`, `die="Boss00Ship_Die"`, `collision="EnemyShip_CheckForCollideWithPlayer"` (AI script commented out until Phase 2).
   - Children render in order: **`boss00_beam`** (behind) → **`boss00_body`** (front) → **`UIBossHealthBar`** (y=220) → **`UIBossHitBar`** (y=205).
2. **Art** added to source [level1DataList.lst](data/objects/2d/objectDataList/level1DataList.lst) (then regenerated via the **"Generate Sprite Sheet"** task — never hand-edit `level1SpriteSheetDataList.lst`):
   - `null_boss00_ship` (null + collision, size 504×400), `boss00_body` (boss00 texture), `boss00_beam` (solid quad), `boss00_health_frame`/`boss00_health_solid` (600×15 / 592×9), `boss00_hit_frame`/`boss00_hit_solid` (600×8 / 592×4, half-height).
   - ⚠️ **Color update needed**: both bars should be **green** when full (currently health=red, hit=yellow). Change in the source list + regenerate.
3. Constants in [gamedefs.js](source/state/gamedefs.js): `BOSS00_SHIP_ID = -20`, `BOSS00_RESTING_Y`. In [level1state.js](source/state/level1state.js): `BOSS00_SHIP_HIT_VALUE`, `BOSS00_SPAWN_TIME` (the old `BOSS00_INITIAL/MAX_SHIP_HIT_COUNT/INC` constants are now obsolete — replace with `BOSS00_HEALTH_MAX = 4`, `BOSS00_HIT_BAR_MAX = 30`).
4. **Temp test harness** (to remove when AI lands): static boss spawned in `Level1State` init; enemy00 spawning disabled.

**Review checkpoint:** strategy/art/bars confirmed rendering. ✔

---

## Phase 2 — Boss AI (movement + building selection)
**Stops for review before Phase 3.**

1. Create `data/objects/ai/boss00.ai` (behavior tree): `AI_Boss00_Head` → composite[ `AI_Boss00_Descend` (lands on + targets the first far building), `AI_Boss00_DestroyBuilding` (destroy that first building), repeater[ composite[ `AI_Boss00_PickAndMoveToBuilding`, `AI_Boss00_DestroyBuilding` ] ] ]. *(The first `DestroyBuilding` runs on the building the descend landed on; the repeater handles every building after that.)*
2. Add `boss00.ai` to [aiListTable.json](data/objects/ai/aiListTable.json).
3. Create `source/scripts/boss00aiscripts.js` (modeled on [enemy00aiscripts.js](source/scripts/enemy00aiscripts.js)):
   - `AI_Boss00_Head` (+ shared `ai_data`, `clearAIData()`). Holds boss state: `health` (start 4), `hitBar` (start 30), and an `interrupted` flag set by the collision handler.
   - `AI_Boss00_Descend` — on first appearance, **select a far building** (same selection logic as below) and **descend directly onto it** (set X to the building, ease Y down to the attack position over the building) so it can immediately start destroying. Collision **disabled** during descent; **enabled** on arrival. (This replaces a generic descend-to-`BOSS00_RESTING_Y`; the boss arrives already positioned on its first target.)
   - `AI_Boss00_PickAndMoveToBuilding` — **select a building** that is **not destroyed**, **not already selected/marked** by another entity (reuse the enemy00 `targetBuilding` not-already-targeted check), and **far from the player** (compute wrap-aware distance from player to each candidate; randomly choose among the farthest). **Mark it** (`sprite.targetBuilding = building`) so it won't be re-selected. Set the boss **invulnerable-to-shots** during travel (see collision note below) but **keep it able to collide with / damage the player**. Move **quickly** (faster than enemy00) and **start the move in the player's direction** so the boss can barrel past and hit the player en route to the (far) building. On arrival: **refill hit bar to 30** and make the boss **vulnerable to shots again**. Release the mark when leaving the building.
   - `AI_Boss00_DestroyBuilding` — runs the beam sequence (Phase 3) while staying put over the building (**no drift**). Resolve one of two ways:
     - **Interrupted** (`interrupted` flag set by the collision handler when the hit bar hits 0): the boss is already **invulnerable** (`vulnerable=false`) and health already decremented by the handler. **Wait ~1 second** (so the player sees the empty hit bar + dropped health), stop/retract the beam early (building **saved**), then return SUCCESS to loop to the next building.
     - **Beam completes**: call `targetBuilding.prepareScript('die')` (building **lost**), set **`vulnerable=false`**, return SUCCESS to loop. No health change.
   - Idle gracefully if no non-destroyed buildings remain (game-over is handled elsewhere).
4. Register the AI leaf scripts in `loadScripts()` and import + call in [startupstate.js](source/state/startupstate.js); add `clearAIData()` calls in [level1state.js](source/state/level1state.js).

**Review checkpoint:** boss descends, moves quickly to a far building, and "destroys" it (building falls) without the beam visual yet; picking always favors buildings away from the player.

---

## Phase 3 — Beam Visual & Timed Destruction
**Stops for review before Phase 4.**

The full beam→destroy process takes **5 seconds** (when not interrupted). When the boss stops over the building it selected:
1. **Show + widen the beam**: the beam becomes visible and widens to **33px** (X-scale from thin → 33px). Position centered over the building; height anchored at the boss extending **down past the screen bottom** (covers the whole building).
2. **Building shake**: the **target building** starts to shake and **progressively shakes faster** over the 5 seconds (reuse/adapt the escalating-shake pattern from `AI_Enemy00_DestroyBuilding`, but applied to the building sprite instead of the enemy).
3. **Destroy**: at the end of the 5 seconds, call `targetBuilding.prepareScript('die')` (reuses existing fall animation).
4. **Shrink/retract**: beam X-scale eases back to thin and fades out, timed to look like it retracts as the building falls.
5. **Interrupt path**: if the player depletes the hit bar before the 5s elapse, abort this sequence — stop the shake, retract the beam (after the ~1s pause), and leave the building intact.
6. All timings frame-rate independent per AGENTS.md (durations in seconds, `valueTo` easing; no `timeScale` on absolute-position easings).
7. Reuse global temp objects; avoid per-frame allocations (GC goal).
8. Optional: play a sound during the beam (reuse a `(level_1)` group sound).

**Review checkpoint:** full visual beam sequence looks correct end-to-end.

---

## Phase 4 — Health/Hit Bars, Damage Model, Die & Spawn Integration
**Stops for review before Phase 5.**

1. Create `source/scripts/boss00scripts.js` (modeled on [enemy00scripts.js](source/scripts/enemy00scripts.js) / [enemy01scripts.js](source/scripts/enemy01scripts.js)):
   - `Boss00Ship_Hit` — explosion graphic at hit point; hide player shot. (Does **not** kill — see damage model.)
   - `Boss00Ship_Die` — remove AI, retract/hide beam, hide both bars, fall/explode animation, recycle.
2. Bars (art **done**, color → green): in `Level1State` init grab both `uiProgressBar` nodes (`UIBossHealthBar`, `UIBossHitBar`), `setProgressBarMax(4)` / `setCurrentValue(4)` for health and `setProgressBarMax(30)` / `setCurrentValue(30)` for the hit bar. They are child nodes so they track the boss automatically. Both visible for the whole battle.
3. **Damage model** in `collisionCallBack()` ([level1state.js](source/state/level1state.js)) — add a `BOSS00_SHIP_ID` (= -20) branch. Collision stays enabled during attack and travel; a `vulnerable` flag (set by the AI, true only during an active attack) gates shot damage.
   - **Player shot hits boss** while **`vulnerable`**: `hitBar -= 1`, update `UIBossHitBar`. Run `Boss00Ship_Hit` (explosion). If `hitBar` reaches **0** → **interrupt**:
     - Set **`vulnerable = false`** so it takes no more hits.
     - `health -= 1`, update `UIBossHealthBar`.
     - Set the AI `interrupted` flag (the `AI_Boss00_DestroyBuilding` node does the ~1s pause, then moves to the next building and sets `vulnerable=true` on arrival).
     - If `health` reaches **0** → `prepareScript('die')` + `updateHudProgress(BOSS00_SHIP_HIT_VALUE = 10)`.
   - **Player shot hits boss** while **not `vulnerable`** (traveling): ignore — no hit-bar change (optionally a "blocked" sparkle).
   - **Player collides with boss**: damage the **player** (like enemy01/02 collision). This is the "fast-move toward the player" path — applies whenever the boss collision is enabled (i.e., including while traveling). No boss damage from collision.
4. Spawn logic (per Q2 — temporary): a one-shot `bossSpawnTimer` started on game start that spawns a **single** boss **20s** in (`enemyStrategy.create('boss00_ship')`, positioned above screen to descend). Replace the current always-on test spawn.
5. Spawning: **final** — while the boss is active, **disable enemy01 + enemy02** (guard the mini-boss branch in `handleEnemySpawn()`); **enemy00 keeps spawning**. On **boss death**, **re-enable enemy01 + enemy02 and restart their spawn timers** (reset so they don't fire immediately). **For now (dev/testing) all enemies stay disabled** via the existing early-return — defer the final wiring.
6. Boss is in the `_enemy_` strategy, which is already activated/rendered/cleaned up — no extra strategy wiring needed.

**Review checkpoint:** full loop — player shots drain the hit bar; depleting it interrupts the boss (health −1, building saved); boss otherwise destroys the building; 4 interrupts kill the boss.

---

## Phase 5 — Build, Tune & Verify
**Stops for review (final).**

1. `webpack --mode development` build; fix errors.
2. Manual playtest: descend → target buildings → beam destroy loop → health bar → death.
3. Tune constants: hit count, speeds, beam timings, spawn trigger.
4. Verify wrap-around behavior at map edges, GC (no per-frame allocations), frame-rate independence.
5. Confirm strategy cleanup on level restart/new game.

---

## Open Questions
1. ~~**Beam art**~~ — **RESOLVED**: `boss00_beam` object added (white solid quad with `<mesh genType="quad"/>`, 10×320, alpha 0.5, `shader_solid_2d`).
2. ~~**Spawn trigger**~~ — **RESOLVED (temporary, for testing)**: spawn boss00 **once, 20 seconds after the game starts**. Real trigger to be decided later. Implementation: a one-shot timer in `Level1State` (started on game start) that spawns a single boss when it expires.
3. ~~**Boss hit count / difficulty**~~ — **SUPERSEDED by `boss00_update.txt`**: damage is now a two-bar model — **health 0–4** and **hit bar 0–30**. Player shots drain the hit bar; depleting it interrupts the boss and costs 1 health; 4 interrupts kill the boss. (Old 50→200 scaling is dropped.)
4. ~~**Does the boss shoot at the player?**~~ — **RESOLVED (for now)**: **No shooting.** Will re-evaluate later.
5. ~~**Boss movement style**~~ — **RESOLVED**: **Free-flying wrap-around** like **enemy01 / enemy02** (free drift that wraps at `±GAMEPLAY_LOOPING_WRAP_DIST`). enemy00 is **not** free-flying — it moves with purpose (absolute-position shortest-path easing to a specific building) and wraps, but its motion is targeted, not drifting. Reference: enemy01 uses velocity-easing drift `incPosXYZ(easingX.getValue() * timeScale)` with boundary wrap.
   - **Note / possible tension to confirm**: the prompt's core boss loop (pick a building → move over it → destroy → repeat) requires *targeted* movement to reach a specific building, which is enemy00-style, not pure free drift. Interpretation: the boss flies/wraps freely between targets but still eases toward the chosen building (wrap-aware shortest path) to position over it. Confirm this is the intended blend.
6. ~~**Beam exact dimensions/anchor**~~ — **UPDATED by `boss00_update.txt`**: Beam **widens to 33px** (a fixed width, **not** the full building width). Beam **height = from the boss down to below the screen**, covering the whole building (anchored at the boss, extending down past the screen bottom). The full beam→destroy process takes **5 seconds**, during which the **building shakes progressively faster** until destroyed. (Supersedes the earlier "building width over 3s" answer.)
7. ~~**What happens when all buildings are destroyed**~~ — **RESOLVED**: When all buildings are gone the **game is over** (already handled — `Building_Die` dispatches `EGE_BUILDING_DESTROYED`; `Level1State` shows the game-over menu when every building is `toBeDeleted`). The boss just needs to **idle/sit** when there are no buildings to target — no extra game-over logic needed. The boss AI's "pick a building" node should handle the empty/no-untargeted-building case gracefully (stay idle rather than error).
8. ~~**Death reward / score**~~ — **RESOLVED**: Killing the boss grants **10** (`updateHudProgress(10)`; `BOSS00_SHIP_HIT_VALUE = 10`).
9. ~~**Health bar visuals**~~ — **RESOLVED + UPDATED**: Two stacked bars above the boss (health 600×15, hit 600×8 half-height), both with a frame + solid fill. Per `boss00_update.txt` both bars **start full and all green** — need to change current fills (health=red, hit=yellow) → **green** in the source list and regenerate.
   - **Still to confirm**: do the bars **stay green** as they deplete, or **change color** (e.g., green→yellow→red) as they drop? Assume **stay green** (depletion shown by the bar shrinking) unless told otherwise.
10. ~~**Sound**~~ — **DEFERRED**: No sound for now — get the boss working first. Revisit later (will reuse `(level_1)` group sounds or add new ones then).

### New questions from `boss00_update.txt`
11. ~~**enemy00 during boss battle**~~ — **RESOLVED**: Final design — **enemy00 keeps spawning** during the boss fight; **enemy01 + enemy02 are disabled**. **For now (development/testing), ALL enemies are disabled** (the current `handleEnemySpawn()` early-return stays). Wire the final enemy00-on / enemy01+02-off behavior later.
12. ~~**Hit-bar refill timing**~~ — **RESOLVED**: **Instant refill** — snap the hit bar to 30 on arrival at the new building.
13. ~~**Invulnerability window**~~ — **RESOLVED (yes)**: the boss takes **no shot damage while traveling** between buildings and only becomes shootable once it **arrives and starts the beam** on the new target. (Implemented via the `vulnerable` flag, not a full collision disable — see Q15 / Mechanics step 4, since the boss must still collide with the player while traveling.)
14. ~~**"Far from player" selection**~~ — **RESOLVED (use proposed)**: rank non-destroyed, unselected buildings by wrap-aware distance from the player and randomly pick among the **farthest half** (far, but not always the single farthest).
15. ~~**Move-toward-player aggression**~~ — **RESOLVED**: **No drift while attacking** (boss stays put over the building). The boss hits the player **only during the fast move to the next building**, by **fast-moving in the player's direction** so it barrels past them. ⚠️ Note: this means the boss must stay **collidable while traveling** (to damage the player) yet take **no shot damage** then — so vulnerability is gated by a **`vulnerable` flag**, not by fully disabling `collisionComponent` (see Mechanics step 4). Geometric tension to settle in playtest: the target building is *far* from the player, so "move in the player's direction" likely means an initial lunge toward the player before continuing to the far building.
16. ~~**Boss death with buildings remaining**~~ — **RESOLVED**: after 4 interrupts the boss dies even if buildings remain; the level then continues as normal — **enemy01 + enemy02 spawning is re-enabled and their spawn timers are restarted** (reset so they don't fire immediately).
