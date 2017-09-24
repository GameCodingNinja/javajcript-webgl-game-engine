/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("Test started...");
console.time();

let value = 0;
let test;

do
{
    test = ++value;

    do
    {
        if ((test & 1) === 0)
            test /= 2;
        //if( (test % 2) === 0 )
        //    test /= 2;
        else
            test = (test * 3) + 1;
    }
    while (test > 1);
}
while ((test > 0) && (value < 100000000));

console.timeEnd();
