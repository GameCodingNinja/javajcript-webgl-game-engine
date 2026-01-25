
// 
//  FILE NAME: signalmanager.js
//  DESC:      Class for handling messaging
//

"use strict";

class SignalManager
{
    constructor()
    {
        this.loadCompleteSignal = [];
        this.resolutionChangeSignal = [];
        this.initShaderSignal = [];
        this.collisionSignal = [];
    }
    
    // 
    //  DESC: Connect to the load signal
    //
    connect_loadComplete( slot )
    {
        this.loadCompleteSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the resolution change signal
    //
    connect_resolutionChange( slot )
    {
        this.resolutionChangeSignal.push( slot );
    }

    // 
    //  DESC: Connect to the init shader signal
    //
    connect_initShader( slot )
    {
        this.initShaderSignal.push( slot );
    }

    // 
    //  DESC: Connect to the collision signal
    //
    connect_collisionSignal( slot )
    {
        this.collisionSignal.push( slot );
    }

    // 
    //  DESC: Disconnect all to the load signal
    //
    clear_loadComplete()
    {
        this.loadCompleteSignal.length = 0;
    }

    // 
    //  DESC: Disconnect all to resolution change
    //
    clear_resolutionChange()
    {
        this.resolutionChangeSignal.length = 0;
    }

    // 
    //  DESC: Disconnect all to init shader
    //
    clear_initShader()
    {
        this.initShaderSignal.length = 0;
    }

    // 
    //  DESC: Disconnect all to collision signal
    //
    clear_collisionSignal()
    {
        this.collisionSignal.length = 0;
    }

    // 
    //  DESC: Broadcast the load signal
    //
    broadcast_loadComplete()
    {
        for( this._i1 = 0; this._i1 < this.loadCompleteSignal.length; ++this._i1 )
            this.loadCompleteSignal[this._i1]();
    }
    
    // 
    //  DESC: Broadcast the resolution change
    //
    broadcast_resolutionChange()
    {
        for( this._i2 = 0; this._i2 < this.resolutionChangeSignal.length; ++this._i2 )
            this.resolutionChangeSignal[this._i2]();
    }

    // 
    //  DESC: Broadcast the init shader
    //
    broadcast_initShader( shaderId )
    {
        for( this._i3 = 0; this._i3 < this.initShaderSignal.length; ++this._i3 )
            this.initShaderSignal[this._i3](shaderId);
    }

    // 
    //  DESC: Broadcast the collision signal
    //
    broadcast_collisionSignal( spriteA, spriteB )
    {
        for( this._i4 = 0; this._i4 < this.collisionSignal.length; ++this._i4 )
            this.collisionSignal[this._i4](spriteA, spriteB);
    }
}

export var signalManager = new SignalManager;
