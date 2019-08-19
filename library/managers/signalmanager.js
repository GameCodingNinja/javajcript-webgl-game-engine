
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
    //  DESC: Disconnect all to the load signal
    //
    clear_loadComplete()
    {
        this.loadCompleteSignal = [];
    }

    // 
    //  DESC: Disconnect all to resolution change
    //
    clear_resolutionChange()
    {
        this.resolutionChangeSignal = [];
    }

    // 
    //  DESC: Disconnect all to init shader
    //
    clear_initShader()
    {
        this.initShaderSignal = [];
    }
    
    // 
    //  DESC: Broadcast the load signal
    //
    broadcast_loadComplete()
    {
        for( let i = 0; i < this.loadCompleteSignal.length; ++i )
            this.loadCompleteSignal[i]();
    }
    
    // 
    //  DESC: Broadcast the resolution change
    //
    broadcast_resolutionChange()
    {
        for( let i = 0; i < this.resolutionChangeSignal.length; ++i )
            this.resolutionChangeSignal[i]();
    }

    // 
    //  DESC: Broadcast the init shader
    //
    broadcast_initShader( shaderId )
    {
        for( let i = 0; i < this.initShaderSignal.length; ++i )
            this.initShaderSignal[i](shaderId);
    }
}

export var signalManager = new SignalManager;
