
// 
//  FILE NAME: uidata.js
//  DESC:      UI data class
//

"use strict";

import { SpriteData } from '../sprite/spritedata';
import * as defs from '../common/defs';

export class UIData
{
    constructor( xmlNode, defGroup, defObjName )
    {
        // UI control type
        this.uiControlType = defs.ECT_NULL;
        
        // Sprite data array
        this.spriteDataAry = [];
        
        let spriteNodeLst = xmlNode.getElementsByTagName( 'sprite2d' );
        for( let i = 0; i < spriteNodeLst.length; ++i )
            this.spriteDataAry.push( new SpriteData( spriteNodeLst[i], defGroup, defObjName ) );
        
        // Get the ui control specific attributes
        if( xmlNode.nodeName == 'uiProgressBar' )
            this.loadProgressBarFromNode( xmlNode );
    }
    
    //
    //  DESC: Load the control info from XML node
    //
    loadProgressBarFromNode( xmlNode )
    {
        this.uiControlType = defs.ECT_PROGRESS_BAR;
        this.spriteApplyIndex = null;
        this.stencilMaskSprite = null;

        let attr = xmlNode.getAttribute( 'spriteApplyIndex' );
        if( attr )
            this.spriteApplyIndex = Number(attr);

        attr = xmlNode.getAttribute( 'stencilMaskSprite' );
        if( attr !== null )
            this.stencilMaskSprite = attr;
            
        // See if a range of values was specified
        let rangeNode = xmlNode.getElementsByTagName( 'range' );
        if( rangeNode.length )
        {
            let attr = rangeNode[0].getAttribute( 'cur' );
            if( attr )
                this.curValue = Number( attr );

            attr = rangeNode[0].getAttribute( 'min' );
            if( attr )
                this.minValue = Number( attr );

            attr = rangeNode[0].getAttribute( 'max' );
            if( attr )
                this.maxValue = Number( attr );
        }

        let orentNode = xmlNode.getElementsByTagName( "orentation" );
        if( orentNode.length )
        {
            let attr = orentNode[0].getAttribute("type");
            if( attr === 'vert' )
                this.orentation = defs.EO_VERTICAL;

            attr = orentNode[0].getAttribute("alignment");
            if( attr )
            {
                if( this.orentation === defs.EO_HORIZONTAL )
                {
                    if( attr === 'right' )
                        this.alignment = defs.EHA_HORZ_RIGHT;

                    else if( attr === 'center' )
                        this.alignment = defs.EHA_HORZ_CENTER;
                }
                else
                {
                    if( attr === 'bottom' )
                        this.alignment = defs.EVA_VERT_BOTTOM;

                    else if( attr === 'center' )
                        this.alignment = defs.EVA_VERT_CENTER;
                }
            }
        }
    }
}
