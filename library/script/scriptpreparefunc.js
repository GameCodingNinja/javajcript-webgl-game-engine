
//
//  FILE NAME: scriptpreparefunc.js
//  DESC:      Class for holding script attributes
//

"use strict";

export class CScriptPrepareFunc
{
    constructor(funcName, prepareOnInit = false, forceUpdate = false, ai = false)
    {
        // Function Id
        this.funcName = funcName;

        // Prepare on Init flag
        this.prepareOnInit = prepareOnInit;

        // Force Update flag
        this.forceUpdate = forceUpdate;

        // Indicates this is for AI
        this.ai = ai;
    }
}