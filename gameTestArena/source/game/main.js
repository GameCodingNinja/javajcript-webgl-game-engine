
// 
//  FILE NAME: main.js
//  DESC:      main function
//

"use strict";

import { Game } from './game.js';

// Create the game
var game = new Game;
game.init();


/*console.time('speed test');

let ary = [0.1, 0.2, 0.3];
//let ary = new Float32Array([0.1, 0.2, 0.3]);
let finalValue = 0;

for(let i = 0; i < 1000000; i++)
{
    finalValue += ary[0];
    finalValue += ary[1];
    finalValue += ary[2];

    finalValue *= ary[0];
    finalValue *= ary[1];
    finalValue *= ary[2];

    finalValue -= ary[0];
    finalValue -= ary[1];
    finalValue -= ary[2];

    finalValue /= ary[0];
    finalValue /= ary[1];
    finalValue /= ary[2];
}

console.timeEnd('speed test');

console.log(finalValue);*/