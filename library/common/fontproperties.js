
// 
//  FILE NAME: fontproperties.js
//  DESC:      font properties class
//

"use strict";

import { fontManager } from '../managers/fontmanager';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as defs from './defs';

export class FontProperties
{
    constructor( fontName = null, hAlign = defs.EHA_HORZ_CENTER, vAlign = defs.EVA_VERT_CENTER, kerning = 0, spaceCharKerning = 0, lineWrapWidth = -1, lineWrapHeight = 0 )
    {
        // font to use
        this.fontName = fontName;

        // horzontal alignment
        this.hAlign = hAlign;

        // vertical alignment
        this.vAlign = vAlign;

        // distance between each character
        this.kerning = kerning;

        // special kerning just for the space character
        this.spaceCharKerning = spaceCharKerning;

        // width of line to force wrap
        this.lineWrapWidth = lineWrapWidth;

        // add spacing to the lines
        this.lineWrapHeight = lineWrapHeight;
        
        // Throws an error if font is not loaded
        if( this.fontName )
            fontManager.isFont( this.fontName );
    }
    
    // 
    //  Copy the data
    //
    copy( obj )
    {
        this.fontName = obj.fontName;
        this.hAlign = obj.hAlign;
        this.vAlign = obj.vAlign;
        this.kerning = obj.kerning;
        this.spaceCharKerning = obj.spaceCharKerning;
        this.lineWrapWidth = obj.lineWrapWidth;
        this.lineWrapHeight = obj.lineWrapHeight;
        
        // Throws an error if font is not loaded
        fontManager.isFont( this.fontName );
    }
    
    //
    //  DESC: Load the font properties from XML node
    //
    loadFromNode( node )
    {
        // Get the must have font name
        let attr = node.getAttribute( 'fontName' );
        if( attr )
            this.fontName = attr;
        
        // Throws an error if font is not loaded
        fontManager.isFont( this.fontName );

        // Get the attributes node
        let attrNode = node.getElementsByTagName( 'attributes' );
        if( attrNode.length )
        {
            attr = attrNode[0].getAttribute( 'kerning' );
            if( attr )
                this.kerning = Number(attr);

            attr = attrNode[0].getAttribute( 'spaceCharKerning' );
            if( attr )
                this.spaceCharKerning = Number(attr);

            attr = attrNode[0].getAttribute( 'lineWrapWidth' );
            if( attr )
                this.lineWrapWidth = Number(attr);

            attr = attrNode[0].getAttribute( 'lineWrapHeight' );
            if( attr )
                this.lineWrapHeight = Number(attr);
        }

        // Get the alignment node
        let alignmentNode = node.getElementsByTagName( 'alignment' );
        if( alignmentNode.length )
        {
            // Set the default alignment
            this.hAlign = parseHelper.loadHorzAlignment( alignmentNode[0], defs.EHA_HORZ_CENTER );
            this.vAlign = parseHelper.loadVertAlignment( alignmentNode[0], defs.EVA_VERT_CENTER );
        }
    }
}

