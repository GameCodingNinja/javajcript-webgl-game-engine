
// 
//  FILE NAME: ainode.js
//  DESC:      AI Node class
//

"use strict";

import { Node } from './node';

export class aiNode extends Node
{
    constructor( nodeData )
    {
        super( nodeData );

        this.name = '';
        this.scriptName = nodeData.scriptName;
        this.behavior = nodeData.behavior;
        this.type = nodeData.type;
        this.order = nodeData.order;
        this.condition = nodeData.condition;
        this.repeatCount = nodeData.repeatCount;
    }
}
