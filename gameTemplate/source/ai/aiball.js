
// 
//  FILE NAME: aiball.js
//  DESC:      Class for ball ai
//

"use strict";

import { iaiBase } from '../../../library/common/iaibase';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';

export class aiBall extends iaiBase
{
    constructor( obj )
    {
        super();
        
        this.sprite = obj.sprite;
    }
    
    // 
    //  DESC: Do any initalizing
    //
    init()
    {
        this.initPhysics();
    }
    
    // 
    //  DESC: Do the physics
    //
    update()
    {
        if( this.sprite.object.pos.y < -600 )
            this.initPhysics();
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
