
// 
//  FILE NAME: symbolsetviewstrategy2d.js
//  DESC:      Symbol set view strategy
//

"use strict";

import { SetStrategy } from '../common/setstrategy';
import { SymbolSetView } from './symbolsetview';

export class SymbolSetViewStrategy2D extends SetStrategy
{
    constructor()
    {
        super();

    }
    
    //
    //  DESC: Allocate the set data
    //
    allocateSet()
    {
        return new SymbolSetView;
    }
}
