
// 
//  FILE NAME: nodefactory.js
//  DESC:      Class factory for node creation
//

"use strict";

import { objectDataManager } from '../objectdatamanager/objectdatamanager';
import { UIProgressBar } from '../gui/uiprogressbar';
import { UIMeter } from '../gui/uimeter';
import { SpriteNode } from '../node/spritenode';
import { SpriteLeafNode } from '../node/spriteleafnode';
import { UIControlNode } from '../node/uicontrolnode';
import { UIControlLeafNode } from '../node/uicontrolleafnode';
import { ObjectNode } from '../node/objectnode';
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
            node = new SpriteNode( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeData );

        // Single node sprite that doesn't support children. Low overhead for when you only need one sprite
        else
            node = new SpriteLeafNode( objectDataManager.getData( nodeData.group, nodeData.objectName ), nodeData );
        
        LoadSprite( node, nodeData );
    }
    else if( nodeData.nodeType === defs.ENT_OBJECT )
    {
        // Object node is automatically a multilist node because an object node without children is pretty useless
        node = new ObjectNode( nodeData );
        
        node.object.loadTransFromNode( nodeData.xmlNode );

        // Load the script functions from node
        node.object.scriptComponent.initScriptIds( nodeData.xmlNode );
    }
    else if( nodeData.nodeType === defs.ENT_UI_CONTROL )
    {
        node = CreateUIControlNode( nodeData );
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

    if( nodeData.hasChildrenNodes )
        return new UIControlNode( control, nodeData );
    else
        return new UIControlLeafNode( control, nodeData );
}
