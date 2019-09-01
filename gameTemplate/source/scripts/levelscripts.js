
//
//  FILE NAME: levelcripts.js
//  DESC:      script for the level
//

"use strict";

import { scriptManager } from '../../../library/script/scriptmanager';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

export class Level_BallAi
{
    constructor( sprite )
    {
        this.sprite = sprite;
        this.initPhysics();
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.sprite.pos.y < -600 )
            this.initPhysics();
        
        return false;
    }

    // 
    //  DESC: Init the physics
    //
    initPhysics()
    {
        this.sprite.physicsComponent.setTransform(
            genFunc.randomInt(-700,700),
            genFunc.randomInt(600,1000),
            genFunc.randomInt(0,360) * defs.DEG_TO_RAD,
            defs.RESET_VELOCITY );
        
        // Reposition the sprite based on the new physics position and rotation
        this.sprite.physicsUpdate();
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
