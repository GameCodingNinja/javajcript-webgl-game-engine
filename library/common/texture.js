
//
//  FILE NAME: texture.js
//  DESC:      Class for holding texture data
//

"use strict";

import { Size } from './size';

export class Texture
{
    constructor()
    {
        // OpenGL texture ID
        this.id = 0;
        
        // Texture type (diffuse, normal, specular, displacement, etc)
        this.type = 0;

        // Texture size - mostly needed for 2D
        this.size = new Size;
    }
}
