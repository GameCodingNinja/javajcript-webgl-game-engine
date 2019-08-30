
//
//  FILE NAME: levelcripts.js
//  DESC:      script for the level
//

"use strict";

import { strategyManager } from '../../../library/strategy/strategymanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { iScript } from '../../../library/script/iscript';
import * as stateDefs from '../state/statedefs';
import * as utilScripts from './utilityscripts';

class Level_BallAi extends iScript
{
    constructor( sprite )
    {
        super();

        this.sprite = sprite;
        this.strategy = strategyManager.get( '_level-1-ball_' );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.sprite.pos.y < -600 )
        {
            this.strategy.destroy( this.sprite.parentNode );
            this.finished = true;
        }
    }
}

//
//  DESC: Script for playing the warp animation
//
class Level_PlayAnim extends utilScripts.PlayAnim
{
    constructor( sprite )
    {
        super( sprite );
        
        this.init( 20 );
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();

        if( this.finished )
            strategyManager.get('_level-1-multiplier_').destroy( this.sprite.parentNode );
    }
}

//
//  DESC: Script for multiplier graphic to destroy itself
//
class Level_DelayDestroy extends utilScripts.Hold
{
    constructor( sprite )
    {
        super();
        
        this.init( 600 );

        if( sprite.objData.name < 'dog_head_6' )
            soundManager.play( '(level_1)', 'cat' );
        else
            soundManager.play( '(level_1)', 'dog' );
    }

    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();

        if( this.finished )
            eventManager.dispatchEvent( stateDefs.ESE_CREATE_MULTI_HEAD );
    }
}

// 
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'Level_BallAi',
        ( sprite ) => { return new Level_BallAi( sprite ); } );

    scriptManager.set( 'Level_PlayAnim',
        ( sprite ) => { return new Level_PlayAnim( sprite ); } );
    
    scriptManager.set( 'Level_DelayDestroy',
        ( sprite ) => { return new Level_DelayDestroy( sprite ); } );
}
