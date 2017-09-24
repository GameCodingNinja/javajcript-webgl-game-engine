
//
//  FILE NAME: mesh3d.js
//  DESC:      3D mesh class
//

"use strict";

export class MeshGroup
{
    constructor()
    {
        // Array texture paths for loading
        this.uniqueTexturePathAry = [];
        
        // Array of loaded textures
        this.meshAry = [];
    }
}

export class Mesh
{
    constructor()
    {
        // Texture indexes into the uniqueTexturePathAry
        this.textureIndexAry = [];
        
        // Loaded texture data
        this.textureAry = [];

        // VBO
        this.vbo = null;

        // IBO
        this.ibo = null;

        // Number of IBOs needed for rendering
        this.iboCount = 0;
    }
}
