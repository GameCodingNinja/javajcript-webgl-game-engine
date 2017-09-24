
// 
//  FILE NAME: signalmanager.js
//  DESC:      Class for handling messaging
//

"use strict";

class SignalManager
{
    constructor()
    {
        this.smartGuiControlSignal = [];
        this.smartMenuSignal = [];
        this.aiCreateSignal = [];
        this.loadCompleteSignal = [];
        this.resolutionChangeSignal = [];
    }
    
    // 
    //  DESC: Connect to the smart gui control signal
    //
    connect_smartGui( slot )
    {
        this.smartGuiControlSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the smart gui menu signal
    //
    connect_smartMenu( slot )
    {
        this.smartMenuSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the Ai Sprite create signal
    //
    connect_aiCreate( slot )
    {
        this.aiCreateSignal.push( slot );
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
    //  DESC: disconnect to the load signal
    //
    clear_loadComplete( slot )
    {
        this.loadCompleteSignal = [];
    }
    
    // 
    //  DESC: Broadcast smart gui control signal
    //
    broadcast_smartGui( control )
    {
        for( let i = 0; i < this.smartGuiControlSignal.length; ++i )
            this.smartGuiControlSignal[i](control);
    }
    
    // 
    //  DESC: Broadcast smart gui control signal
    //
    broadcast_smartMenu( menu )
    {
        for( let i = 0; i < this.smartMenuSignal.length; ++i )
            this.smartMenuSignal[i](menu);
    }
    
    // 
    //  DESC: Broadcast AI Actor create signal
    //
    broadcast_aiCreate( aiName, actorSprite )
    {
        for( let i = 0; i < this.aiCreateSignal.length; ++i )
            this.aiCreateSignal[i](aiName, actorSprite);
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
}

export var signalManager = new SignalManager;
