
// 
//  FILE NAME:  spritesheetglyph.js
//  DESC:       Class to hold sprite sheet glyph data
//

"use strict";
import { Rect } from '../common/rect';
import { Size } from '../common/size';

export class SpriteSheetGlyph
{
    constructor( size, uv, cropOffset = null )
    {
        // Size of the sprite on the sheet
        this.size = size;

        // UV coordinates RECT
        this.uv = uv;

        // Crop Offset
        this.cropOffset = cropOffset;
    }
}
