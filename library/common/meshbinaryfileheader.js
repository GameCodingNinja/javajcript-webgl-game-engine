
//
//  FILE NAME: meshbinaryfileheader.js
//  DESC:      mesh binary file headers
//

"use strict";

// Hex for RSS (Rabbid Squirrel Sprite)
export const MESH_FILE_HEADER = 0x415382AE;

// Hex for tag check
export const TAG_CHECK = 0x6A82Fc4d;

// Max character sizes for the texture path and joint name
export const TEXT_PATH_SIZE = 128;
export const JOINT_NAME_SIZE = 20;

export class MeshBinaryFileHeader
{
    constructor()
    {
        this.file_header      = 0; // uint32
        this.vert_count       = 0; // uint16
        this.uv_count         = 0; // uint16
        this.vert_norm_count  = 0; // uint16
        this.face_group_count = 0; // uint16
        this.text_count       = 0; // uint16
        this.joint_count      = 0; // uint16
    }
}

// class for reading in texture info
export class BinaryTexture
{
    constructor()
    {
        this.type = 0;       // int8
        this.path = '';      // file path [TEXT_PATH_SIZE]
    }
};

// Class for reading and writing the total face count within a group and the material
// it belongs to
export class BinaryFaceGroup
{
    constructor()
    {
        this.groupFaceCount = 0; // uint16
        this.vertexBufCount = 0; // uint16
        this.indexBufCount  = 0; // uint16
        this.textureCount   = 0; // uint16
    }
};

// Class for reading and writing face information
export class BinaryFace
{
    constructor()
    {
        this.vert = [];
        this.norm = [];
        this.uv = [];
    }
};

// Class for reading and writing face information
export class BinaryVertex
{
    constructor()
    {
        this.vert = 0;
        this.norm = 0;
        this.uv = 0;
    }
};