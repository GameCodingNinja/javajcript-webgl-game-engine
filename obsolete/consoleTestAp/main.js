/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";


class CGen
{
    constructor()
    {
        this.iter = this.job();
    }

    * job()
    {
        console.log("Execute started...");
        yield;

        console.log("1...");
        yield;

        console.log("2...");
        yield;

        console.log("3...");
        yield;

    }

    execute()
    {
        return this.iter.next().done
    }
}

let gen = new CGen;

console.log(gen.execute());
console.log(gen.execute());
console.log(gen.execute());
console.log(gen.execute());
console.log(gen.execute());

/*const foo = require("./stuff");

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
console.log("Count:", counter);*/