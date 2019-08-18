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
    //
    loadFromNode( node )
    {
        if( node.length )
        {
            this.scrollTypesMap = new Map;
            
            this.startDelay = Number(node[0].getAttribute( 'startDelay' ));
            this.scrollDelay = Number(node[0].getAttribute( 'scrollDelay' ));
            
            if( node[0].getAttribute( 'up' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EGE_MENU_UP_ACTION, menuDefs.EGE_MENU_SCROLL_UP );

            if( node[0].getAttribute( 'down' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EGE_MENU_DOWN_ACTION, menuDefs.EGE_MENU_SCROLL_DOWN );

            if( node[0].getAttribute( 'left' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EGE_MENU_LEFT_ACTION, menuDefs.EGE_MENU_SCROLL_LEFT );

            if( node[0].getAttribute( 'right' ) === 'true' )
                this.scrollTypesMap.set( menuDefs.EGE_MENU_RIGHT_ACTION, menuDefs.EGE_MENU_SCROLL_RIGHT );
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

            let result = this.scrollTypesMap.get( msg );

            if( result )
            {
                this.msg = result;
                return true;
            }
        }

        return false;
    }
}