
//
//  FILE NAME: levelcripts.js
//  DESC:      script for the level
//

"use strict";

import { strategyManager } from '../../../library/strategy/strategymanager';
import { scriptManager } from '../../../library/script/scriptmanager';
import { iScript } from '../../../library/script/iscript';

export class Level_BallAi extends iScript
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
//  DESC: Load scripts
//
export function loadScripts()
{
    scriptManager.set( 'Level_BallAi',
        ( sprite ) => { return new Level_BallAi( sprite ); } );
}
