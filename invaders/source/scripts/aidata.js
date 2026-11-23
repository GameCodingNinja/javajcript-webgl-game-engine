//
//  FILE NAME: aidata.js
//  DESC:      AI data shared by all the enemy AI scripts
//             References to the level's game objects, filled the first time an AI head runs.
//             Only references go here: state that changes goes on the sprite (per enemy)
//             or in the enemy's own module (per enemy type, ex: pest01's gSwarm).
//

"use strict";

import { strategyManager } from '../../../library/strategy/strategymanager';
import { soundManager } from '../../../library/sound/soundmanager';

export const gAIData = {
    playerShipStrategy: null,
    playerShipSprite: null,
    camera: null,               // The player ship's camera
    buildings: null,            // The buildings' node array
    minX: 0,                    // X range of the buildings
    maxX: 0,
    enemyStrategy: null,
    enemy: null,                // The enemy strategy's node array
    enemyShotStrategy: null,
    groupPlayer: null
};

// 
//  DESC: Fill the AI data if it hasn't been yet. Called from each AI head's init()
//
export function initAIData()
{
    if( gAIData.playerShipStrategy === null )
    {
        gAIData.playerShipStrategy = strategyManager.get('_player_ship_');
        gAIData.playerShipSprite = gAIData.playerShipStrategy.get('player_ship').get();
        gAIData.camera = gAIData.playerShipStrategy.camera;
        gAIData.buildings = strategyManager.get('_buildings_').nodeAry;
        gAIData.minX = gAIData.buildings[0].get().pos.x;
        gAIData.maxX = gAIData.buildings[gAIData.buildings.length-1].get().pos.x;
        gAIData.enemyStrategy = strategyManager.get('_enemy_');
        gAIData.enemy = gAIData.enemyStrategy.nodeAry;
        gAIData.enemyShotStrategy = strategyManager.get('_enemy_shot_');
        gAIData.groupPlayer = soundManager.createGroupPlayer( '(level_1)' );
    }
}

// 
//  DESC: Clear the AI data so the next level load fills it again (Level1State restartGame() and cleanUp())
//
export function clearAIData()
{
    gAIData.playerShipStrategy = null;
    gAIData.playerShipSprite = null;
    gAIData.camera = null;
    gAIData.buildings = null;
    gAIData.minX = 0;
    gAIData.maxX = 0;
    gAIData.enemyStrategy = null;
    gAIData.enemy = null;
    gAIData.enemyShotStrategy = null;
    gAIData.groupPlayer = null;
}
