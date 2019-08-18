
// 
//  FILE NAME: nodefactory.js
//  DESC:      Class factory for node creation
//

"use strict";

import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { UIProgressBar } from '../gui/uiprogressbar';
import { UIMeter } from '../gui/uimeter';
import { SpriteNode } from '../node/spritenode';
import { UIControlNode } from '../node/uicontrolnode';
import { ObjectNodeMultiLst } from '../node/objectnodemultilist';
import { SpriteNodeMultiLst } from '../node/spritenodemultilist';
import * as uiControlDefs from '../gui/uicontroldefs';
import * as defs from '../common/defs';

// 
//  DESC: Load files
//
export function create( nodeData )
{
    let node = null;
    
    if( nodeData.nodeType === defs.ENT_SPRITE )
    {
        if( nodeData.hasChildrenNodes )
            node = new SpriteNodeMultiLst( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeData.id, nodeData.nodeId, nodeData.parenNodetId );

        // Single node sprite that doesn't support children. Low overhead for when you only need one sprite
        else
            node = new SpriteNode( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeData.id, nodeData.nodeId, nodeData.parenNodetId );
        
        LoadSprite( node, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_OBJECT )
    {
        // Object node is automatically a multilist node because an object node without children is pretty useless
        node = new ObjectNodeMultiLst( nodeData.id, nodeData.nodeId, nodeData.parenNodetId );
        
        node.object.loadTransFromNode( nodeData.xmlNode );
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
}

// 
//  DESC: Create the UI Control node
//
function CreateUIControlNode( nodeData )
{
    let control = null;
    
    if( nodeData.uiControlType == uiControlDefs.ECT_PROGRESS_BAR )
        control = new UIProgressBar( nodeData.group );
    
    else if( nodeData.uiControlType == uiControlDefs.ECT_METER )
        control = new UIMeter( nodeData.group );
    
    else
        throw new Error( `Node control type not defined (${nodeData.nodeName}).` );
    
    control.loadFromNode( nodeData.xmlNode );
    control.init();
    
    return new UIControlNode( control );
}
