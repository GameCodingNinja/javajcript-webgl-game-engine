// 
//  FILE NAME: scrollparam.js
//  DESC:      Class for handling scroll parameter data
//

"use strict";
import * as menuDefs from '../gui/menudefs';

export class ScrollParam
{
    constructor()
    {
        // Array that holds the scroll messages allows by this menu or control
        this.scrollTypesMap = null;

        // The delay of the first scroll message
        this.startDelay = -1;

        // The delay of the rest of the scroll messages
        this.scrollDelay = -1;

        // The scroll message to send from the timer
        this.msg = -1;
    }
    
    // 
    //  DESC: Load the scroll data from node
    //        ownerName is the name of the menu or control, for the error message
    //
    loadFromNode( node, ownerName )
    {
        if( node.length )
        {
            this.scrollTypesMap = new Map;
            
            this.startDelay = Number(node[0].getAttribute( 'startDelay' ));
            this.scrollDelay = Number(node[0].getAttribute( 'scrollDelay' ));

            // A missing delay would be 0, a timer that floods the event queue while a key is held
            if( !(this.startDelay > 0) || !(this.scrollDelay > 0) )
                throw new Error( `Scroll needs a startDelay and scrollDelay greater than 0! (${ownerName})` );
            
            if( node[0].getAttribute( 'up' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EME_MENU_UP_ACTION, menuDefs.EME_MENU_SCROLL_UP );

            if( node[0].getAttribute( 'down' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EME_MENU_DOWN_ACTION, menuDefs.EME_MENU_SCROLL_DOWN );

            if( node[0].getAttribute( 'left' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EME_MENU_LEFT_ACTION, menuDefs.EME_MENU_SCROLL_LEFT );

            if( node[0].getAttribute( 'right' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EME_MENU_RIGHT_ACTION, menuDefs.EME_MENU_SCROLL_RIGHT );
        }
    }
    
    // 
    //  DESC: Does this menu or control support scrolling this message?
    //
    canScroll( msg )
    {
        if( this.scrollTypesMap )
        {
            this.msg = -1;

            this._result = this.scrollTypesMap.get( msg );

            if( this._result )
            {
                this.msg = this._result;
                return true;
            }
        }

        return false;
    }
}