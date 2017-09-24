
// 
//  FILE NAME: game.js
//  DESC:      CGame class
//

"use strict";

import { signalManager } from '../../../library/managers/signalmanager';
import { Basegame } from '../../../library/system/basegame';
import { settings } from '../../../library/utilities/settings';
import { downloadFile } from '../../../library/utilities/genfunc';
import { shaderManager } from '../../../library/managers/shadermanager';
import { StartUpState } from '../state/startupstate';
import { LobbyState } from '../state/lobbystate';
import { LoadState } from '../state/loadstate';
import { BigPayBackState } from '../state/bigpaybackstate';
import { SmartConfirmBtn } from '../smartGUI/smartconfirmbtn';
import { betManager } from '../../../library/slot/betmanager';
import * as state from '../state/gamestate';

class Game extends Basegame
{
    constructor()
    {
        super();
        
        // Set the shader init callback
        shaderManager.initShaderCallback = this.shaderInitCallBack.bind(this);
        
        // Set the smart gui call back
        signalManager.connect_smartGui( this.smartGuiControlCreateCallBack.bind(this) );

        // Load the settings
        downloadFile( 'xml', 'data/settings/settings.cfg',
            ( xmlNode ) =>
            {
                settings.load( xmlNode );
                this.init();
            });
    }
    
    // 
    //  DESC: Init the game
    //
    init()
    {
        super.init();
        
        betManager.setCredits(5000);
        
        // Create the startup state
        this.gameState = new StartUpState( this.gameLoop.bind(this) );
        this.gameState.init();
    }
    
    // 
    //  DESC: Callback for when a smart gui control is created
    //
    smartGuiControlCreateCallBack( control )
    {
        if( control.faction === "decision_btn" )
            control.smartGui = new SmartConfirmBtn( control );
    }
    
    // 
    //  DESC: Callback for shader init
    //
    shaderInitCallBack( shaderId )
    {
        shaderManager.setShaderValue4fv( shaderId, 'additive', [0,0,0,1] );
    }
    
    // 
    //  DESC: Handle the state change
    //
    doStateChange()
    {
        if( this.gameState.doStateChange() )
        {
            this.gameState.cleanUp();
            
            if( this.gameState.nextState === state.GAME_STATE_LOBBY )
                this.gameState = new LobbyState( this.gameLoop.bind(this) );
            
            else if( this.gameState.nextState === state.GAME_STATE_LOAD )
                this.gameState = new LoadState( this.gameState.stateMessage, this.doStateChange.bind(this) );
            
            else if( this.gameState.nextState === state.GAME_STATE_BIG_PAY_BACK )
                this.gameState = new BigPayBackState( this.gameLoop.bind(this) );
            
            // Do any pre-game loop init's
            this.gameState.init();
            
            return true;
        }
        
        return false;
    }
    
    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.gameState.handleEvent( event );
    }
    
    // 
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        this.gameState.miscProcess();
    }
    
    // 
    //  DESC: Handle the physics
    //
    physics()
    {
        this.gameState.physics();
    }
    
    // 
    //  DESC: Update animations
    //
    update()
    {
        this.gameState.update();
    }
    
    // 
    //  DESC: Transform game objects
    //
    transform()
    {
        this.gameState.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    preRender()
    {
        this.gameState.preRender();
    }
    
    // 
    //  DESC: Render of content after post process effects
    //
    postRender()
    {
        this.gameState.postRender();
    }
}

export { Game }
