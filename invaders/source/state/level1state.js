
// 
//  FILE NAME: level1state.js
//  DESC:      Level1State Class State
//

"use strict";

import { eventManager } from '../../../library/managers/eventmanager';
import { actionManager } from '../../../library/managers/actionmanager';
import { menuManager } from '../../../library/gui/menumanager';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { scriptManager } from '../../../library/script/scriptmanager';
//import { physicsWorldManager } from '../../../library/physics/physicsworldmanager';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { strategyManager } from '../../../library/strategy/strategymanager';
import { strategyLoader } from '../../../library/strategy/strategyloader';
import { CommonState } from './commonstate';
import { spriteSheetManager } from '../../../library/managers/spritesheetmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import { GenericEvent } from '../../../library/common/genericevent';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';
import * as menuDefs from '../../../library/gui/menudefs';
import * as stateDefs from './statedefs';

// Load data from bundle as string
import levelStrategyLoader from 'raw-loader!../../data/objects/strategy/level1/strategy.loader';

export const ASSET_COUNT = 11;
const MOVE_LEFT = 0,
      MOVE_RIGHT = 1,
      MOVE_UP = 2,
      MOVE_DOWN = 3;

export class Level1State extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( stateDefs.EGS_LEVEL_1, stateDefs.EGS_GAME_LOAD, gameLoopCallback );
        
        //this.physicsWorld = physicsWorldManager.getWorld( "(game)" );

        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
        
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['pause_tree'] );
        
        // Clear the event queue
        eventManager.clear();
        
        // Prepare the strategies to run
        strategyManager.activateStrategy('_level-1-stage_');

        // Get the nodes and sprites we need to call
        let playerShipNode = strategyManager.activateStrategy('_player_ship_').get('player_ship');
        this.playerShipObj = playerShipNode.object;
        this.playerFireTailSprite = playerShipNode.findChild('fire_tail').sprite;
        this.playerFireTailScript = this.playerFireTailSprite.scriptComponent.prepare( 'fireTailAnim', this.playerFireTailSprite );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();

        this.moveActionAry = ['left','right','up','down'];
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event instanceof GenericEvent )
        {
            // Check for the "game change state" message
            if( event.type === menuDefs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.arg[0] === menuDefs.ETC_BEGIN )
                    this.scriptComponent.prepare( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }

        if( !menuManager.active )
        {
            // Handle the ship movement
            this.handleShipMovement( event );
        }
    }

    // 
    //  DESC: Handle the ship movement
    //
    handleShipMovement( event )
    {
        for( let i = 0; i < this.moveActionAry.length; i++ )
        {
            let actionResult = actionManager.wasAction( event, this.moveActionAry[i] );
            if( actionResult != defs.EAP_IDLE )
            {
                if( i === MOVE_LEFT )
                {
                    if( actionResult == defs.EAP_DOWN )
                    {
                        this.playerFireTailSprite.setVisible( true );
                        this.playerFireTailScript.pause = false;
                    }
                    else
                    {
                        this.playerFireTailSprite.setVisible( false );
                        this.playerFireTailScript.pause = true;
                    }
                }
                else if( i === MOVE_RIGHT )
                {
                    if( actionResult == defs.EAP_DOWN )
                    {
                        this.playerFireTailSprite.setVisible( true );
                        this.playerFireTailScript.pause = false;
                    }
                    else
                    {
                        this.playerFireTailSprite.setVisible( false );
                        this.playerFireTailScript.pause = true;
                    }
                }
                else if( i === MOVE_UP )
                {
                    if( actionResult == defs.EAP_DOWN )
                    {
                        console.log('Up Down');
                    }
                    else
                    {
                        console.log('Up Up');
                    }
                }
                else if( i === MOVE_DOWN )
                {
                    if( actionResult == defs.EAP_DOWN )
                    {
                        console.log('Down Down');
                    }
                    else
                    {
                        console.log('Down Up');
                    }
                }

                break;
            }
        }
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Only delete the strategy(s) used in this state. Don't use clear().
        strategyManager.deleteStrategy( ['_level-1-stage_','_player_ship_'] );
        
        objectDataManager.freeGroup( ['(level_1)'] );
        
        //physicsWorldManager.destroyWorld( "(game)" );
    }
    
    // 
    //  DESC: Handle the physics
    //
    physics()
    {
        //if( !menuManager.active )
        //    this.physicsWorld.variableTimeStep();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        if( !menuManager.active )
            strategyManager.update();
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        strategyManager.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    render()
    {
        super.render();
        
        strategyManager.render();
        
        menuManager.render();
    }
}

// 
//  DESC: Load files
//
//  Use when you have nothing to load
//  return Promise.resolve();
//
export function load()
{
    let groupAry = ['(level_1)'];
    
    return objectDataManager.loadGroup( groupAry )

        // Load the physics list table and group
        //.then(() => physicsWorldManager.loadWorldGroup2D( '(game)' ))

        // Load stage strategy.
        .then(() => strategyLoader.load( genFunc.stringLoadXML( levelStrategyLoader ) ))

        // Load ball strategy.
        //.then(() => strategyLoader.load( genFunc.stringLoadXML( ballStrategyLoader ) ))

        // Clean up the temporary files
        .then(() =>
        {
            assetHolder.deleteGroup( groupAry );
            spriteSheetManager.deleteGroup( groupAry );
        })
}
