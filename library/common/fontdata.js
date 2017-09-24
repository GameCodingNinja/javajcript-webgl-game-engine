
// 
//  FILE NAME:  fontdata.js
//  DESC:       font data class
//

"use strict";
import { FontProperties } from './fontproperties';
import { Size } from './size';

export class FontData
{
    constructor()
    {
        // Displayed font string
        this.fontString = '';

        // Font members
        this.fontProp = new FontProperties;

        // Font string size
        // Not usefull for multiline strings
        this.fontStrSize = new Size;
    }
    
    // 
    //  Copy the data
    //
    copy( obj )
    {
        this.fontString = obj.fontString;
        this.fontProp.copy( obj.fontProp );
        this.fontStrSize.copy( obj.fontStrSize );
    }
    
    //
    //  DESC: Load the font properties from XML node
    //
    loadFromNode( node )
    {
        let fontNode = node.getElementsByTagName( 'font' );
        if( fontNode.length )
        {
            // See if a font string has been defined
            let attr = fontNode[0].getAttribute( 'fontString' );
            if( attr )
                this.fontString = attr;

            this.fontProp.loadFromNode( fontNode[0] );
        }
    }
}
