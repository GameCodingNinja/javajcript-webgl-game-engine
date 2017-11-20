
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
import * as easingFunc from '../../../library/utilities/easingfunc.js';
import * as defs from '../../../library/common/defs';

//
//  DESC: Script for animating a winning symbol
//
class Symbol_Reset extends utilScripts.FadeTo
{
    constructor( sprite )
    {
        super();
        
        this.sprite = sprite;
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        this.finished = false;
        
        if( this.sprite.getAlpha() < 1 )
            super.init( 0.2, 1, 200 );

        else
            this.finished = true;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !this.finished )
        {
            super.execute();
            this.sprite.setAlpha( super.getAlpha() );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for animating a winning symbol
//
class Symbol_NoWin extends utilScripts.FadeTo
{
    constructor( sprite )
    {
        super();
        
        this.sprite = sprite;
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        this.finished = false;
        
        if( this.sprite.getAlpha() < 1 )
            this.finished = true;
        
        else
            super.init( 1, 0.2, 70 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( !this.finished )
        {
            super.execute();
            this.sprite.setAlpha( super.getAlpha() );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for timing out a winning symbol
//
class Symbol_LowWin extends utilScripts.Hold
{
    constructor( sprite )
    {
        super();
        
        this.sprite = sprite;
        this.fadeTo = new utilScripts.FadeTo;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 1000 );
        
        if( this.sprite.getAlpha() < 1 )
            this.fadeTo.init( 0.2, 1, 70 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.sprite.getAlpha() < 1 )
        {
            this.fadeTo.execute();
            this.sprite.setAlpha( this.fadeTo.getAlpha() );
        }
    }
}

//
//  DESC: Script for animating a winning symbol
//
class Symbol_MedWin
{
    constructor( sprite )
    {
        this.sprite = sprite;
        
        this.state = 0;
        
        this.easingFunc = new easingFunc.valueTo;
        this.hold = new utilScripts.Hold;
        this.fadeTo = new utilScripts.FadeTo;
        
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        this.state = 0;
        this.hold.init( 200 );
        this.finished = false;
        
        if( this.sprite.getAlpha() < 1 )
            this.fadeTo.init( 0.2, 1, 70 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( (this.state == 0) || (this.state == 2) || (this.state == 4) )
        {
            this.hold.execute();
        }
        else if( this.state == 1 || this.state == 3 )
        {
            this.easingFunc.execute();
            
            let value = this.easingFunc.getValue();
            this.sprite.setScaleXYZ( value, value );
        }
        
        if( (this.state == 0) && this.hold.isFinished() )
        {
            this.state = 1;
            this.easingFunc.init( 1, 1.5, 100, easingFunc.getPowIn(4) );
        }
        else if( (this.state == 1) && this.easingFunc.isFinished() )
        {
            this.state = 2;
            this.hold.init( 50 );
        }
        else if( (this.state == 2) && this.hold.isFinished() )
        {
            this.state = 3;
            this.easingFunc.init( 1.5, 1, 200, easingFunc.getPowOut(2) );
        }
        else if( (this.state == 3) && this.easingFunc.isFinished() )
        {
            this.state = 4;
            this.hold.init( 700 );
        }
        else if( (this.state == 4) && this.hold.isFinished() )
        {
            return this.finished = true;
        }
        
        if( this.sprite.getAlpha() < 1 )
        {
            this.fadeTo.execute();
            this.sprite.setAlpha( this.fadeTo.getAlpha() );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    isFinished() { return this.finished; }
}

//
//  DESC: Script for animating a winning symbol
//
class Symbol_HiWin
{
    constructor( sprite )
    {
        this.sprite = sprite;
        
        this.state = 0;
        this.rotateState = 0;
        
        this.scaleEasingFunc = new easingFunc.valueTo;
        this.rotateEasingFunc = new easingFunc.valueTo;
        this.hold = new utilScripts.Hold;
        this.fadeTo = new utilScripts.FadeTo;
        
        this.finished = false;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        this.state = 0;
        this.rotateState = false;
        this.hold.init( 200 );
        this.finished = false;
        
        if( this.sprite.getAlpha() < 1 )
            this.fadeTo.init( 0.2, 1, 70 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        if( (this.state == 0) || (this.state == 2) || (this.state == 4) )
        {
            this.hold.execute();
        }
        else if( this.state == 1 || this.state == 3 )
        {
            this.scaleEasingFunc.execute();
            
            let value = this.scaleEasingFunc.getValue();
            this.sprite.setScaleXYZ( value, value );
        }
        
        if( this.rotateState )
        {
            this.rotateEasingFunc.execute();
            
            let value = this.rotateEasingFunc.getValue();
            this.sprite.setRotXYZ( 0, 0, value, false );
        }
        
        if( (this.state == 0) && this.hold.isFinished() )
        {
            this.state = 1;
            this.rotateState = true;
            
            this.scaleEasingFunc.init( 1, 1.3, 1500, easingFunc.getElasticOut(3, 0.3) );
            this.rotateEasingFunc.init(-0.5, 0, 1500, easingFunc.getElasticOut(2, 0.3) );
        }
        else if( (this.state == 1) && this.scaleEasingFunc.isFinished() )
        {
            this.state = 2;
            this.rotateState = false;
            this.hold.init( 50 );
        }
        else if( (this.state == 2) && this.hold.isFinished() )
        {
            this.state = 3;
            this.scaleEasingFunc.init( 1.3, 1, 200, easingFunc.getPowOut(3) );
        }
        else if( (this.state == 3) && this.scaleEasingFunc.isFinished() )
        {
            this.state = 4;
            this.hold.init( 200 );
        }
        else if( (this.state == 4) && this.hold.isFinished() )
        {
            return this.finished = true;
        }
        
        if( this.sprite.getAlpha() < 1 )
        {
            this.fadeTo.execute();
            this.sprite.setAlpha( this.fadeTo.getAlpha() );
        }
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
        
        this.fadeTo = new utilScripts.FadeTo;
    }
    
    // 
    //  DESC: Init the script for use
    //
    init()
    {
        super.init( 18 );
        
        if( this.sprite.getAlpha() < 1 )
            this.fadeTo.init( 0.2, 1, 70 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.sprite.getAlpha() < 1 )
        {
            this.fadeTo.execute();
            this.sprite.setAlpha( this.fadeTo.getAlpha() );
        }
    }
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
    scriptManager.set( 'Symbol_NoWin',
        ( sprite ) => { return new Symbol_NoWin( sprite ); } );
        
    scriptManager.set( 'Symbol_Reset',
        ( sprite ) => { return new Symbol_Reset( sprite ); } );
        
    scriptManager.set( 'Symbol_LowWin',
        ( sprite ) => { return new Symbol_LowWin( sprite ); } );
        
    scriptManager.set( 'Symbol_MedWin',
        ( sprite ) => { return new Symbol_MedWin( sprite ); } );
        
    scriptManager.set( 'Symbol_HiWin',
        ( sprite ) => { return new Symbol_HiWin( sprite ); } );
        
    scriptManager.set( 'Symbol_Animate',
        ( sprite ) => { return new Symbol_Animate( sprite ); } );
        
    scriptManager.set( 'Meter_Init',
        ( sprite ) => { return new Meter_Init( sprite ); } );
    
    scriptManager.set( 'Meter_Start',
        ( sprite ) => { return new Meter_Start( sprite ); } );
        
    scriptManager.set( 'Meter_Clear',
        ( sprite ) => { return new Meter_Clear( sprite ); } );
}
