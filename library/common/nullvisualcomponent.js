
// 
//  FILE NAME:  visualcomponentquad.js
//  DESC:       Class for handling the visual part of the sprite
//

"use strict";

import { ivisualComponent } from '../common/ivisualcomponent';

export class NullVisualComponent extends ivisualComponent
{
    constructor()
    {
        super();
    }

    //
    //  DESC: do the render
    //
    render( /*object, camera*/ )
    {
    }
    
    //
    //  DESC: Is rendering allowed?
    //
    allowRender()
    {
        return false;
    }
    
    //
    //  DESC: Get the frame count
    //
    getFrameCount()
    {
        return 0;
    }
}
