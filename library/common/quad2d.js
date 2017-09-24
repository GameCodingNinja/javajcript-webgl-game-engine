
// 
//  FILE NAME:  quad2d.js
//  DESC:       quad 2d class
//

"use strict";
import { Vertex2d } from '../common/vertex2d';

export class Quad2d
{
    constructor()
    {
        this.vert = [new Vertex2d, new Vertex2d, new Vertex2d, new Vertex2d];
    }
}
