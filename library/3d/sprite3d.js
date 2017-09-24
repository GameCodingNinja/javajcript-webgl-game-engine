
// 
//  FILE NAME:  sprite2d.js
//  DESC:       2D sprite class
//

"use strict";

import { VisualComponent3D } from './visualcomponent3d';
import { ScriptComponent } from '../script/scriptcomponent';
import { scriptManager } from '../script/scriptmanager';
import { Object3D } from './object3d';
import { Matrix } from '../utilities/matrix';
import * as defs from '../common/defs';

export class Sprite3D extends Object3D
{
    constructor( objData )
    {
        super();
        
        // The object data
        this.objData = objData;
        
        // The visual part of the 2d sprite
        this.visualComponent = new VisualComponent3D( objData.visualData );
        
        // The script part of the 2d sprite
        this.scriptComponent = new ScriptComponent;
        
        // If there's no visual data, set the hide flag
        this.setVisible( objData.visualData.isActive() );
    }
    
    //
    //  DESC: Update the sprite
    //
    update()
    {
        m_scriptComponent.Update();
    }
    
    // 
    //  DESC: Update the physics
    //
    physicsUpdate()
    {
        //m_physicsComponent.Update( this );
    }

    // 
    //  DESC: do the render
    //
    render( projMatrix, camera )
    {
        if( this.isVisible() )
        {
            this.visualComponent.render( this.matrix, projMatrix, this.rotMatrix, camera );
        }
    }
}
