
// 
//  FILE NAME: nodefactory.js
//  DESC:      Class factory for node creation
//

"use strict";

import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { signalManager } from '../managers/signalmanager';
import { Sprite } from '../sprite/sprite';
import { UIProgressBar } from '../gui/uiprogressbar';
import { SpriteNode } from '../node/spritenode';
import { UIControlNode } from '../node/uicontrolnode';
import { ObjectNodeMultiLst } from '../node/objectnodemultilist';
import { SpriteNodeMultiLst } from '../node/spritenodemultilist';
import * as defs from '../common/defs';

// 
//  DESC: Load files
//
export function create( nodeData, nodeId )
{
    let node = null;
    
    // Single node sprite that doesn't support children. Low overhead for when you only need one sprite
    if( nodeData.nodeType === defs.ENT_SPRITE )
    {
        node = new SpriteNode( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeId );
        
        LoadSprite( node.sprite, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_OBJECT_MULTI_LIST )
    {
        node = new ObjectNodeMultiLst( nodeId, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadObject( node.object, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_SPRITE_MULTI_LIST )
    {
        node = new SpriteNodeMultiLst( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeId, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadSprite( node.sprite, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_UI_CONTROL )
    {
        node = CreateUIControlNode( nodeData, nodeId );
    }
    else
        throw new Error( `Node type not defined (${nodeData.nodeName}).` );
    
    return node;
}

// 
//  DESC: Load the sprite data
//
function LoadSprite( sprite, nodeData )
{
    // Load from sprite data
    sprite.load( nodeData );

    // Mainly for font sprites
    sprite.init();

    // Init the physics
    sprite.initPhysics();

    // Broadcast the signal to create the sprite AI
    if( nodeData.aiName !== '' )
        signalManager.broadcast_aiCreate( nodeData.aiName, sprite );
}

// 
//  DESC: Load the sprite data
//
function LoadObject( object, nodeData )
{
    object.copyTransform( nodeData );
}

// 
//  DESC: Create the UI Control node
//
function CreateUIControlNode( nodeData, nodeId )
{
    if( nodeData.uiData == null )
        throw new Error( `UI Control data not allocated (${nodeId}).` );
    
    if( nodeData.uiData.uiControlType == defs.ECT_PROGRESS_BAR )
    {
        let progressBar = new UIProgressBar( nodeData.group );
        progressBar.loadFromData( nodeData );
        progressBar.init();
        
        return new UIControlNode( progressBar );
    }
}
