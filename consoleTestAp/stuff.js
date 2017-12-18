/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Simulate a singleton
class CFoo
{
    constructor( value )
    {
        console.log(`Class CFoo Created... ${value}`);
    }
    
    callMe( value )
    {
        console.log(`Class CFoo function called... ${value}`);
    }
}

var foo = new CFoo(50);
module.exports = foo;

/*
 * 
 Do this to export a class that can be allocated in another javascript file

module.exports = class CFoo
{
    constructor( value )
    {
        console.log(`Class CFoo Created... ${value}`);
    }
    
    callMe( value )
    {
        console.log(`Class CFoo function called... ${value}`);
    }
}
 */