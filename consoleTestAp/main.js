/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

const foo = require("./stuff");

foo.callMe(20);

//let foo = new CFoo( 10 );

console.log("Test started...");
console.time();

let maxValue = 10000000;
let value = 0;
let test;
let counter = 0;

do
{
    test = ++value;
    ++counter;

    do
    {
        if ((test & 1) === 0)
            test /= 2;
        //if( (test % 2) === 0 )
        //    test /= 2;
        else
            test = (test * 3) + 1;
        
        ++counter;
    }
    while (test > 1);
}
while ((test > 0) && (value < maxValue));

console.timeEnd();
console.log("Count:", counter);