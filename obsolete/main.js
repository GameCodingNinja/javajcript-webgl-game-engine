
// 
//  FILE NAME: main.js
//  DESC:      main function
//

"use strict";

import { Game } from './game.js';

// Create the game
var game = new Game;
game.init();

function addFunc(p1, p2)
{
    let value = p1 + p2;
    return value;
}

const million = 1000000; 
const arr = Array(million);
var value = 1;

for (let i = 0; i < arr.length; i++)
{
    arr[i] = 1 + 1;
}

console.time('⏳');

for (let i = 0; i < arr.length; i++)
{
    // let val = arr[i];
    // value += val;
    // value -= val;
    // value += val;
    // value -= val;
    value += arr[i];
    value -= arr[i];
    value += arr[i];
    value -= arr[i];

    value = addFunc(value, i);
}

for( const each of arr )
{
    value += each;
    value -= each;
    value += each;
    value -= each;

    value = addFunc(value, each);
}

console.timeEnd('⏳');
console.log(value);