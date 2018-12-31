
// 
//  FILE NAME: nodefactory.js
//  DESC:      Class factory for node creation
//

"use strict";

import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { signalManager } from '../managers/signalmanager';
import { Sprite } from '../sprite/sprite';
import { SpriteNode } from '../node/spritenode';
import { ObjectNodeMultiLst } from '../node/objectnodemultilist';
import { SpriteNodeMultiLst } from '../node/spritenodemultilist';
import * as defs from '../common/defs';

// 
//  DESC: Load files
//
export function Create( nodeData, nodeId )
{
    let node = null;
    
    // Single node sprite that doesn't support children. Low overhead for when you only need one sprite
    if( nodeData.nodeType === defs.ENT_SPRITE )
    {
        node = new SpriteNode( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeId );
        
        LoadSprite( node.sprite, nodeData );
    }
    else if( nodeData.getNodeType() === defs.ENT_OBJECT_MULTI_LIST )
    {
        node = new ObjectNodeMultiLst( nodeId, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadObject( node.object, nodeData );
    }
    else if( nodeData.getNodeType() === defs.ENT_SPRITE_MULTI_LIST )
    {
        node = new SpriteNodeMultiLst( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeId, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadSprite( node.sprite, nodeData );
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
