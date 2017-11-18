
//
//  FILE NAME: slotscripts.js
//  DESC:      script for the menus
//

"use strict";

import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { eventManager } from '../../../library/managers/eventmanager';
import { soundManager } from '../../../library/managers/soundmanager';
import { Color } from '../../../library/common/color';
import * as utilScripts from './utilityscripts';
import * as defs from '../../../library/common/defs';

//
//  DESC: Script for timing out a winning symbol
//
class Symbol_Hold extends utilScripts.Hold
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1000 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for animating a winning symbol
//
class Symbol_Animate extends utilScripts.Play
{
    constructor( sprite )
    {
        super( sprite );
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 18 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for meter init
//
class Meter_Init
{
    constructor( sprite )
    {
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        // No init required
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setAlpha( 0 );
        this.sprite.setVisible( false );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return true; }
}

//
//  DESC: Script for meter start
//
class Meter_Start extends utilScripts.FadeTo
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 0, 1, 250 );
        this.sprite.setVisible( true );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setAlpha( this.final );

        else
            this.sprite.setAlpha( this.current );
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for meter clear
//
class Meter_Clear extends utilScripts.FadeTo
{
    constructor( sprite )
    {
        super();
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1, 0, 250 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( this.sprite.isVisible() )
        {
            super.execute();

            if( this.finished )
            {
                this.sprite.setAlpha( this.final );
                this.sprite.setVisible( false );
            }
            else
            {
                this.sprite.setAlpha( this.current );
            }
        }
        else
        {
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}


// 
//  DESC: Load script into manager
//
export function loadScripts()
{
    scriptManager.set( 'Symbol_Hold',
        ( sprite ) => { return new Symbol_Hold( sprite ); } );
        
    scriptManager.set( 'Symbol_Animate',
        ( sprite ) => { return new Symbol_Animate( sprite ); } );
        
    scriptManager.set( 'Meter_Init',
        ( sprite ) => { return new Meter_Init( sprite ); } );
    
    scriptManager.set( 'Meter_Start',
        ( sprite ) => { return new Meter_Start( sprite ); } );
        
    scriptManager.set( 'Meter_Clear',
        ( sprite ) => { return new Meter_Clear( sprite ); } );
}
