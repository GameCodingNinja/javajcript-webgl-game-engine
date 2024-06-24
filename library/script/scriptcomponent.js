
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
    //  NOTE: The function can call a script that can call this function so local variables nee to be allocated
    //
    recycle(funcName, args)
    {
        let script = this.scriptRecycleMap.get(funcName );

        if( script )
        {
            //console.log(`Script Recycle; Name: ${funcName}`);

            switch(args.length)
            {
                case 2:
                    script.recycle();
                break;
                case 3:
                    script.recycle(args[2]);
                break;
                case 4:
                    script.recycle(args[2],args[3]);
                break;
                case 5:
                    script.recycle(args[2],args[3],args[4]);
                break;
                case 6:
                    script.recycle(args[2],args[3],args[4],args[5]);
                break;
            }
        }

        return script;
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
    //  NOTE: The function can call a script that can call this function so local variables nee to be allocated
    //
    prepare(...args)
    {
        let activeScript = null;

        if( this.scriptFactoryMap && typeof args[0] === 'string' )
        {
            let scriptPrepareFunc = this.scriptFactoryMap.get( args[0] );
            if( scriptPrepareFunc )
            {
                // See if this script was recycled
                activeScript = this.recycle( scriptPrepareFunc.funcName, args );

                // Create one if none is in recycle
                if( !activeScript )
                {
                    if(scriptPrepareFunc.ai)
                    {
                        //console.log(`AI Script Create; Name: ${scriptPrepareFunc.funcName}`);
                        activeScript = aiManager.get( scriptPrepareFunc.funcName );
                    }
                    else
                    {
                        let script = scriptManager.get( scriptPrepareFunc.funcName );
                        
                        if( script )
                        {
                            //console.log(`Script Create; Name: ${scriptPrepareFunc.funcName}`);

                            switch(args.length)
                            {
                                case 1:
                                    activeScript = script();
                                break;
                                case 2:
                                    activeScript = script(args[1]);
                                break;
                                case 3:
                                    activeScript = script(args[1],args[2]);
                                break;
                                case 4:
                                    activeScript = script(args[1],args[2],args[3]);
                                break;
                                case 5:
                                    activeScript = script(args[1],args[2],args[3],args[4]);
                                break;
                                case 6:
                                    activeScript = script(args[1],args[2],args[3],args[4],args[5]);
                                break;
                            }

                            if( activeScript )
                            {
                                activeScript.name = scriptPrepareFunc.funcName;
                            }
                        }
                    }
                }

                if( activeScript )
                {
                    if( scriptPrepareFunc.forceUpdate )
                    {
                        if( activeScript.execute() )
                            this.scriptRecycleMap.set(activeScript.name, activeScript);
                        else
                            this.scriptAry.push( activeScript );
                    }
                    else
                    {
                        this.scriptAry.push( activeScript );
                    }
                }
            }
        }
        else if( typeof args[0] === 'object' )
        {
            activeScript = args[0];

            if( args.length > 1 && args[1] )
            {
                if( activeScript.execute() )
                    this.scriptRecycleMap.set(activeScript.name, activeScript);
                else
                    this.scriptAry.push( activeScript );
            }
            else
            {
                this.scriptAry.push( activeScript );
            }
        }

        return activeScript;
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
                    let activeScript = this.scriptRecycleMap.get(this._scriptPrepareFunc.funcName );
                    if( activeScript )
                    {
                        //console.log(`Script Recycle; Name: ${this._scriptPrepareFunc.funcName}`);
                        activeScript.recycle();
                    }
                    else
                    {
                        if(this._scriptPrepareFunc.ai)
                        {
                            //console.log(`AI Script Create; Name: ${this._scriptPrepareFunc.funcName}`);
                            activeScript = aiManager.get( this._scriptPrepareFunc.funcName, object );
                        }
                        else
                        {
                            //console.log(`Script Create; Name: ${this._scriptPrepareFunc.funcName}`);
                            this._script = scriptManager.get( this._scriptPrepareFunc.funcName );

                            if( this._script )
                            {
                                activeScript = this._script(object);
                            }
                        }

                        if( activeScript )
                        {
                            activeScript.name = this._scriptPrepareFunc.funcName;
                        }
                    }

                    if( activeScript )
                    {
                        if( this._scriptPrepareFunc.forceUpdate )
                        {
                            if( activeScript.execute() )
                                this.scriptRecycleMap.set(activeScript.name, activeScript);
                            else
                                this.scriptAry.push( activeScript );
                        }
                        else
                        {
                            this.scriptAry.push( activeScript );
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