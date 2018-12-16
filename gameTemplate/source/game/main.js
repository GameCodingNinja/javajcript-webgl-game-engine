
// 
//  FILE NAME: main.js
//  DESC:      main function
//

"use strict";

import { Game } from './game.js';
import { NodeMultiLst } from '../../../library/node/nodemultilist';





let head = new NodeMultiLst( 0, -1 );
let child1 = new NodeMultiLst( 1, 0 );
let child2 = new NodeMultiLst( 2, 1 );
let child3 = new NodeMultiLst( 3, 2 );

head.addNode( child1 );
head.addNode( child2 );
head.addNode( child3 );





// Create the game
var game = new Game;

