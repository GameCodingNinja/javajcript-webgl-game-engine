
//
//  FILE NAME: scriptcomponent.js
//  DESC:      Class for handling game scripting
//

"use strict";
import { scriptManager } from '../script/scriptmanager';
import { aiManager } from '../managers/aimanager';
import { CScriptPrepareFunc } from '../script/scriptpreparefunc';
import * as genFunc from '../utilities/genfunc';

export class ScriptComponent
{
    constructor()
    {
        this.scriptAry = [];
        this.removeAry = [];

        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = null;

        // Script pool
        this.scriptRecycleMap = new Map;
    }

    // 
    //  DESC: Init the script Ids and add them to the map
    //        This loads the attribute info reguardless of what it is
    //
    initScriptIds( xmlNode )
    {
        // Check for scripting
        this._scriptNode = xmlNode.getElementsByTagName( 'script' );

        if( !this.scriptFactoryMap && this._scriptNode.length )
            this.scriptFactoryMap = new Map;

        for( this._i = 0; this._i < this._scriptNode.length; ++this._i )
        {
            this._prepareOnInit = false;
            this._forceUpdate = false;
            this._ai = false;
            this._attr = this._scriptNode[this._i].getAttribute( 'prepareOnInit' );
            if( this._attr !== null )
                this._prepareOnInit = (this._attr === 'true')

            this._attr = this._scriptNode[this._i].getAttribute( 'forceUpdate' );
            if( this._attr !== null )
                this._forceUpdate = (this._attr === 'true')

            // See if this is an ai
            this._attr = this._scriptNode[this._i].getAttribute( 'ai' );
            if( this._attr )
                this._ai = (this._attr === 'true');

            this._attr = this._scriptNode[this._i].attributes[0];
            if( this._attr && !this.scriptFactoryMap.has(this._attr.name) )
                // This allocates the script to the map
                this.scriptFactoryMap.set( this._attr.name, new CScriptPrepareFunc(this._attr.value, this._prepareOnInit, this._forceUpdate, this._ai) );
        }
    }

    // 
    //  DESC: Recycle the script
    //
    recycle(args)
    {
        this._scriptPrepareFunc = this.scriptFactoryMap.get( args[0] );

        if( this._scriptPrepareFunc )
        {
            this._script = this.scriptRecycleMap.get(this._scriptPrepareFunc.funcName );

            if( this._script )
            {
                switch(args.length)
                {
                    case 1:
                        this._script.recycle();
                    break;
                    case 2:
                        this._script.recycle(args[1]);
                    break;
                    case 3:
                        this._script.recycle(args[1],args[2]);
                    break;
                    case 4:
                        this._script.recycle(args[1],args[2],args[3]);
                    break;
                    case 5:
                        this._script.recycle(args[1],args[2],args[3],args[4]);
                    break;
                    case 6:
                        this._script.recycle(args[1],args[2],args[3],args[4],args[5]);
                    break;
                }

                if( this._scriptPrepareFunc.forceUpdate )
                {
                    if( !this._script.execute() )
                        this.scriptAry.push( this._script );
                }
                else
                {
                    this.scriptAry.push( this._script );
                }

                return true;
            }
        }

        return false;
    }

    // 
    //  DESC: Recycle all the active scripts
    //
    recycleActiveScripts()
    {
        if( this.scriptAry.length )
        {
            for( this._i = 0; this._i < this.scriptAry.length; this._i++ )
                this.scriptRecycleMap.set(this.scriptAry[this._i].name, this.scriptAry[this._i]);

            this.scriptAry.length = 0;
        }
    }

    // 
    //  DESC: Prepare a script to run
    //  NOTE: Function uses arguments object to handle multiple parameters
    //        The last parameter will be the script Id so that it is ignored by the calling function
    //
    prepare(...args)
    {
        this._activeScript = null;

        if( this.scriptFactoryMap && typeof args[0] === 'string' )
        {
            this._scriptPrepareFunc = this.scriptFactoryMap.get( args[0] );
            if( this._scriptPrepareFunc )
            {
                if(this._scriptPrepareFunc.ai)
                {
                    this._activeScript = aiManager.get( this._scriptPrepareFunc.funcName );
                }
                else
                {
                    this._script = scriptManager.get( this._scriptPrepareFunc.funcName );
                    
                    if( this._script )
                    {
                        switch(args.length)
                        {
                            case 1:
                                this._activeScript = this._script();
                            break;
                            case 2:
                                this._activeScript = this._script(args[1]);
                            break;
                            case 3:
                                this._activeScript = this._script(args[1],args[2]);
                            break;
                            case 4:
                                this._activeScript = this._script(args[1],args[2],args[3]);
                            break;
                            case 5:
                                this._activeScript = this._script(args[1],args[2],args[3],args[4]);
                            break;
                            case 6:
                                this._activeScript = this._script(args[1],args[2],args[3],args[4],args[5]);
                            break;
                        }
                    }
                }

                if( this._activeScript )
                {
                    this._activeScript.name = this._scriptPrepareFunc.funcName;

                    if( this._scriptPrepareFunc.forceUpdate )
                    {
                        if( !this._activeScript.execute() )
                            this.scriptAry.push( this._activeScript );
                    }
                    else
                    {
                        this.scriptAry.push( this._activeScript );
                    }
                }
            }
        }
        else if( typeof args[0] === 'object' )
        {
            this._activeScript = args[0];

            if( args.length > 1 && args[1] )
            {
                if( !this._activeScript.execute() )
                    this.scriptAry.push( this._activeScript );
            }
            else
            {
                this.scriptAry.push( this._activeScript );
            }
        }

        return this._activeScript;
    }

    // 
    //  DESC: Update the script
    //
    prepareOnInit( object )
    {
        if( this.scriptFactoryMap )
        {
            for( this._scriptPrepareFunc of this.scriptFactoryMap.values() )
            {
                if( this._scriptPrepareFunc.prepareOnInit )
                {
                    // See if this script has been recycled
                    this._activeScript = this.scriptRecycleMap.get(this._scriptPrepareFunc.funcName );
                    if( this._activeScript )
                    {
                        this._activeScript.recycle();
                    }
                    else
                    {
                        if(this._scriptPrepareFunc.ai)
                        {
                            this._activeScript = aiManager.get( this._scriptPrepareFunc.funcName, object );
                        }
                        else
                        {
                            this._script = scriptManager.get( this._scriptPrepareFunc.funcName );

                            if( this._script )
                            {
                                this._activeScript = this._script(object);
                                this._activeScript.name = this._scriptPrepareFunc.funcName;
                            }
                        }
                    }

                    if( this._activeScript )
                    {

                        if( this._scriptPrepareFunc.forceUpdate )
                        {
                            if( !this._activeScript.execute() )
                                this.scriptAry.push( this._activeScript );
                        }
                        else
                        {
                            this.scriptAry.push( this._activeScript );
                        }
                    }
                }
            }
        }
    }

    // 
    //  DESC: Update the script
    //
    update()
    {
        // Call the active scripts
        for( this._i = this.scriptAry.length - 1; this._i > -1; --this._i )
        {
            // If the script is finished, recycle it
            if( this.scriptAry[this._i].execute() )
            {
                this.scriptRecycleMap.set(this.scriptAry[this._i].name, this.scriptAry[this._i]);
                genFunc.removeAt( this.scriptAry, this._i );
            }
        }

        if( this.removeAry.length )
        {
            for( this._i = 0; this._i < this.removeAry.length; this._i++ )
            {
                for( this._j = 0; this._j < this.scriptAry.length; this._j++ )
                {
                    // If the script is finished, remove it
                    if( this.scriptAry[this._i].name === this.removeAry[this._i] )
                    {
                        this.scriptRecycleMap.set(this.scriptAry[this._i].name, this.scriptAry[this._i]);
                        genFunc.removeAt( this.scriptAry, this._j );
                        break;
                    }
                }
            }

            this.removeAry.length = 0;
        }
    }

    //
    //  DESC: Init the script tree
    //
    initScriptTree()
    {
        for( this._i = 0; this._i < this.scriptAry.length; this._i++ )
        {
            // initTree is only in scripts that inherit from Node
            if( this.scriptAry[this._i].initTree !== undefined )
            {
                this.scriptAry[this._i].initTree();
            }
        }
    }

    // 
    //  DESC: Remove script
    //
    remove( name )
    {
        this.removeAry.push( name );
    }
    
    // 
    //  DESC: Is this component active?
    //
    isActive()
    {
        return (this.scriptAry.length > 0);
    }
    
    // 
    //  DESC: clear out the scripts
    //
    reset()
    {
        this.scriptAry.length = 0;
    }
}

export var scriptSingleton = new ScriptComponent;