# pest00 Attack Plan

The first **Pest** (was enemy01). A small, fast enemy at wreck00's level that ignores the buildings and **harasses the player**. It roams around away from the player for a while, then charges in, does a spin attack that flings a ring of homing missiles, and runs off. Its spawn timer starts at **level 2**, and it appears one at a time.

All numbers below are starting values to tune in playtesting (`PEST00_*` in `gamedefs.js`).

## Attack cycle

```
┌─────────┐   ┌──────┐   ┌────────┐   ┌─────────────┐   ┌─────────┐
│ Descend │──▶│ Roam │──▶│ Charge │──▶│ Spin attack │──▶│ Run off │──┐
└─────────┘   └──┬───┘   └────────┘   └─────────────┘   └─────────┘  │
                 ▲                                                    │
                 └────────────────────────────────────────────────────┘
```

**Altitude:** it cruises **above the buildings and below the top of the screen** (y −110 to 230; the tallest building top is about −156). Its waypoints and charge stop point are in that band. Its climb or dive is limited to what keeps it in the band a quarter second ahead, so it levels off smoothly near an edge and even fast swoops don't overshoot far: it can swoop a little into the building area but never flies along there. It steers away from the player ship when it gets within 220 px (harder the closer), so it doesn't run into it when it charges past or the player catches up with it. It always stays fully below the HUD strip across the top of the screen (the radar bar, 66 px high), so it never disappears under it.

It always flies forward along its heading, turning at a limited rate, with its speed carried smoothly from one step to the next, so its paths are curves rather than straight lines. The nose (the art points right) faces its heading; the art is symmetrical, so flying upside down is fine.

1. **Descend:** spawns above the screen **1500–3000 px from the player** (either side, so always off the screen) and drops in. If the player comes over while it drops in, it spin attacks as soon as it's fully below the HUD strip, rather than being a sitting duck.
2. **Roam:** for a random **6–10 s** it flies around **away from the player** (about **450 px/s**). It never flies straight: it **weaves in waves** (35° either side of its course, one wave every 1.6 s) and flies a **full loop** (about a 260 px circle) every 3–6 s, turning up in the lower half of its band and down in the upper half. That's fun to watch in the distance and makes it harder to shoot. It heads for waypoints **1200–2400 px** from the player on its side, and picks a new one when it reaches it or when the player gets within **1000 px** of it. It's mostly off-screen, visible on the radar.
   - **Avoids the player:** when the player gets within **1100 px** (X) it runs away at **1300 px/s**, weaving in wider waves (45°), angled off the ship's firing line (its Y), or straight sideways near the edge of its band, so it can't easily be shot down while roaming. It goes back to roaming once the player is farther away.
   - **Caught up:** if the player still catches up with it (it's in view, after the first second of the roam), it skips the charge and does the spin attack where it is, then runs off. It doesn't need to be close.
3. **Charge:** turns toward the player and charges in at up to **1300 px/s**, then brakes to a stop about **350 px** from the ship (aiming at the ship's Y kept in the band, so it stops above the buildings when the player flies low). The stop point is always **in view**, at least 120 px in from the side of the screen: the ship often sits near the side of the screen, and coming from that side, 350 px beside it would be off the screen, where the spin attack fires no missiles. When there isn't enough room beside the ship, it stops above or below it instead (whichever has more room in the band). It's done when it gets within 150 px of the stop point, or after **1 s in view**. While the ship flies, the stop point moves with it and pest00 trails it without slowing down, so before this it could follow the ship around in view without attacking. Gives up after 6 s if it can't get there (the player is boosting away).
4. **Spin attack:** see below.
5. **Run off:** accelerates away from the player to **800 px/s** (about 650 px/s sideways with the swoops), a bit slower than the ship (720 px/s, 1680 boosting), mostly sideways, **still spinning**, **swooping** up and down (20–50°, a mix of short 0.35–0.6 s swoops and, half the time, longer 1–1.8 s ones, usually to the other direction but 20% of the time a different angle the same way, turning at 400°/s) and **dodging** player shots: a shot heading at it from within 450 px and lined up within 60 px makes it jink up or down, away from the shot, for 0.25 s (half the time, with a 0.6 s cooldown, so it can still be hit). It keeps going until it's **2500 px** away (about two screens, so the player has time to chase it), then stops spinning off the screen and roams again. There's no time limit, so it never comes back for another spin attack while it's still in view. Shots that hit it while it spins still don't count as hits.

### Spin attack

pest00 is round, so it fires by spinning: the spin is what flings the missiles out. While it coasts to a stop:

- **Spin up:** quickly, to **6 turns/s** over 0.3 s. After a charge it keeps following its stop point beside the ship while it spins (a ship flying away would otherwise leave it off the screen, where it can't fire); caught up while roaming, it coasts to a stop where it is, but backs off to its stop point beside the ship if the ship comes within 350 px (so a player flying up to it doesn't run into it).
- **Only fires in view:** at full spin it waits up to 1.5 s (still spinning and following) to be in view, then fires.
- **Fire:** at full spin, a volley of **5 missiles** flings out **at the same time**, **evenly spaced** around the ship (72° apart for 5, 90° for 4, 120° for 3), each from the rim and flying straight outward. The ring starts at the current spin angle, so it's rotated differently each time.
- **Keeps spinning and firing:** it runs off right away, still spinning, and fires another volley while it's in view: the first **2.5 s** after the spin attack's volley, then **every 2 s** while the player chases it (see Run off). Once the spin is stopped it still fires **one missile** at the player every 2 s while in view.
- **The faster the spin, the more missiles:** each player shot that hits the spin slows it a step and takes one missile off the next volley: 5 → 4 → 3 → 2 → 1. The spin slows from 6 turns/s down to 2.5 turns/s (at 1 missile) in equal steps, so the player can see it working and it's clearly spinning whenever it fires.
- **Spin hits don't count:** while it spins (the spin attack and the run off), a player shot explodes on it as normal, but it isn't counted as a hit until the spin has stopped. (Shots used to bounce off, which gave too little feedback.)
- **Knock it out of the spin:** the **5th spin hit** knocks it out of the spin, and then **one more hit kills it**. If it gets away (the run off ends), its hit count starts over. If it hasn't fired yet, no missiles come out. The spin comes to a stop while it keeps fleeing (ending facing the way it flies), and shots hit it from then on. This rewards a player who keeps firing into the spin.

The missiles reach the player at different times: the one flung toward the ship arrives first, and the ones flung away loop around and come in later from other directions. It stops about 350 px out so the missile flung toward the ship gives the player time to react.

## Missiles

Modeled on boss00's missile (`Boss00Shot_Fire`), but weaker. Each missile has two phases:

1. **Launch:** flies straight out from the rim in its fling direction for about **0.2 s** (about 90 px), slowing down, so the ring is visible.
2. **Home:** turns toward the player ship and homes in.

A missile flung directly away from the player has to turn up to 180°, so the turn rate and lifetime are high enough that flung-away missiles still reach the player.

|  | pest00 missile | Boss00 missile (for comparison) |
| --- | --- | --- |
| Damage | **5** | 20 |
| Speed | about 0.35 px/ms | 0.3 px/ms |
| Launch phase | about **0.2 s** straight out | none |
| Turn rate | about **220°/s** (a tight turn back, so flung missiles stay on the screen) | 180°/s |
| Lifetime | about **8 s** | 6 s |
| Final run | commits to a straight run when close and lined up | same |

- The straight final run (like `BOSS00_MISSILE_LOCK_DIST`/`LOCK_ALIGN`) keeps them dodgeable. AGENTS.md notes that missiles which home forever can't be dodged.
- The shield blocks them (the shot's collision check passes `playerShipSprite.shieldOn`, like the other enemy shots).
- Only fired while the player is alive and pest00 is in view, like the other shooters.

## Fighting it

- **Toughness:** dies in **3 hits**.
- **Score:** 2 (2× wreck00's).
- **Ramming:** only damages the player ship (15, `PEST00_RAM_DAMAGE`, none through the shield); pest00 takes no hit from it. It has its own short ram cooldown (`sprite.ramTime`, 500 ms), so one ram counts once and doesn't block hits on other enemies. It doesn't use the shared `collisionTimer`.
- **Counterplay:** shoot it as it charges in, before the spin (it runs from you while roaming). Or keep firing into the spin: each spin hit means fewer missiles, and 5 of them stop the spin so shots count as hits, then dodge, boost away from or shield the missiles as they come in.

## Spawning

- **Pest group:** pest00 and pest01 (the swarm) share one spawn timer, `pestSpawnTimer` (20–50 s), started when `playerLevel` reaches 2 (`PEST_LEVEL_THRESHOLD = 2`), the same way `MINI_BOSS_01_LEVEL_THRESHOLD` turns on mini-boss spawns in the level-up code. When it runs out it picks pest00 or the swarm at random, but after 2 of the same one in a row (`MAX_PEST_STREAK`) the other one comes next.
- **One Pest at a time** (`countPests()`, one that's dying doesn't count). When pest00 dies the spawn timer starts over (a new 20–50 s).
- **Boss and mini-boss battles:** none spawn while a mini-boss is out or the boss battle is on (one that's already out stays), until the level reaches **15** (`PEST_BATTLE_SPAWN_LEVEL`); from level 15 they spawn during them too. If the spawn timer runs out then, it starts another 20–50 s round.
- The wreck00 spawn check subtracts the Pest count (`countPests()`), so Pests don't use up wreck00 slots.

## Sound

- **Missile launch:** the existing missile sounds (the `boss_rocket_launch` play list), once per volley.
- **Death:** one of the existing `enemy_explosion_*` sounds.
- **Later, from the user:** a spinning sound for the spin attack, and a sound when pest00 comes in to attack.

## Art

Provided and already in `level1DataList.lst` and the sprite sheet (single frames):

- **Ship:** `pest00_ship` (`pest00.png`, 150×175, nose points right; collision circle radius 75). Scaled to wreck00's size (`<scale x="0.35" y="0.35"/>` in its strategy node, about 52×61 on screen like wreck00's 50×62).
- **Missile:** `pest00_shot` (`pest00_projectile.png`, 2-point collision line), `<scale x="1.5" y="1.5"/>` in its strategy node.

## How it's built

It follows the "Adding a New Enemy or Boss" checklist in AGENTS.md:

1. **Art:** done (objects in `level1DataList.lst`, sprite sheet regenerated).
2. **Ids:** `PEST00_SHIP_ID` (-6) and `PEST00_SHOT_ID` (-7) in `gamedefs.js`.
3. **Strategy nodes:**
   - `pest00_ship` in `enemy.strategy` with `ai_*`, `hit` (reuses `Wreck00Ship_Hit`), `die` and `collision="EnemyShip_CheckForCollideWithPlayer"` scripts. It's a single node with no children, so its `prepareOnInit` scripts run without the boss workaround.
   - `pest00_shot` in `enemyshot.strategy` with `shoot` and `hit` (reuses `Wreck00Shot_Hit`) scripts.
4. **AI tree:** `data/objects/ai/pest00.ai`: Descend, then a repeater over Roam → Charge → Spin → Flee. Listed in `aiListTable.json` and the `aiManager.loadFromXml([...])` list in `level1state.js`.
5. **AI scripts:** `source/scripts/pest00aiscripts.js` (`AI_Pest00_*`).
   - Head, Descend, Roam, Charge, Spin and Flee leaves.
   - Per-pest00 state on its sprite, reset in Descend's `init()`: `hitCount`, `ramTime`, `heading`, `speed`.
   - Positions are world positions; the X delta to the player is wrap-aware (`genFunc.wrapDelta`), and X is wrapped after every move.
6. **Die and missile scripts:** `source/scripts/pest00scripts.js` (`Pest00Ship_Die`, `Pest00Shot_Fire`).
7. **Register and clean up:** `loadScripts()` in `startupstate.js`; `clearAIData()` in `restartGame()` and `cleanUp()`.
8. **Collisions** in `collisionCallBack()`:
   - pest00 missile hits the ship (−5 unless shielded).
   - pest00 rams the ship (its own ram cooldown).
   - Player shot hits pest00 (hit, die, score).
9. **Spawning:**
   - The shared Pest spawn timer in `handleEnemySpawn()`, started at level 2.
   - Paused while the start menu is up, and paused and resumed with the others for the pause menu and game over.
10. **AGENTS.md:** pest00 in the "Which Entities Wrap" table and its behavior described.
