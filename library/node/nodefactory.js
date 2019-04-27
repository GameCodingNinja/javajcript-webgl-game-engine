
// 
//  FILE NAME: nodefactory.js
//  DESC:      Class factory for node creation
//

"use strict";

import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { signalManager } from '../managers/signalmanager';
import { UIProgressBar } from '../gui/uiprogressbar';
import { UIMeter } from '../gui/uimeter';
import { SpriteNode } from '../node/spritenode';
import { UIControlNode } from '../node/uicontrolnode';
import { ObjectNodeMultiLst } from '../node/objectnodemultilist';
import { SpriteNodeMultiLst } from '../node/spritenodemultilist';
import * as defs from '../common/defs';

// 
//  DESC: Load files
//
export function create( nodeData )
{
    let node = null;
    
    // Single node sprite that doesn't support children. Low overhead for when you only need one sprite
    if( nodeData.nodeType === defs.ENT_SPRITE )
    {
        node = new SpriteNode( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeData.id );
        
        LoadSprite( node, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_OBJECT_MULTI_LIST )
    {
        node = new ObjectNodeMultiLst( nodeData.id, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadObject( node, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_SPRITE_MULTI_LIST )
    {
        node = new SpriteNodeMultiLst( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeData.id, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadSprite( node, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_UI_CONTROL )
    {
        node = CreateUIControlNode( nodeData, nodeData.id );
    }
    else
        throw new Error( `Node type not defined (${nodeData.nodeName}).` );
    
    return node;
}

// 
//  DESC: Load the sprite data
//
function LoadSprite( node, nodeData )
{
    // Load from sprite data
    node.sprite.load( nodeData.xmlNode );

    // Mainly for font sprites
    node.sprite.init();

    // Init the physics
    node.sprite.initPhysics();

    // Broadcast the signal to create the sprite AI
    if( nodeData.aiName !== '' )
        signalManager.broadcast_aiCreate( nodeData.aiName, node );
}

// 
//  DESC: Load the sprite data
//
function LoadObject( object, nodeData )
{
    object.loadTransFromNode( nodeData.xmlNode );
}

// 
//  DESC: Create the UI Control node
//
function CreateUIControlNode( nodeData )
{
    let control = null;
    
    if( nodeData.uiControlType == defs.ECT_PROGRESS_BAR )
        control = new UIProgressBar( nodeData.group );
    
    else if( nodeData.uiControlType == defs.ECT_METER )
        control = new UIMeter( nodeData.group );
    
    else
        throw new Error( `Node control type not defined (${nodeData.nodeName}).` );
    
    control.loadFromNode( nodeData.xmlNode );
    control.init();
    
    return new UIControlNode( control );
}
