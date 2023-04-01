
//
//  FILE NAME: scriptcomponent.js
//  DESC:      Class for handling game scripting
//

"use strict";
import { scriptManager } from '../script/scriptmanager';
import { aiManager } from '../managers/aimanager';
import { CScriptPrepareFunc } from '../script/scriptpreparefunc';

export class ScriptComponent
{
    constructor()
    {
        this.scriptAry = [];
        this.removeAry = [];

        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = null;
    }

    // 
    //  DESC: Init the script Ids and add them to the map
    //        This loads the attribute info reguardless of what it is
    //
    initScriptIds( xmlNode )
    {
        // Check for scripting
        let scriptNode = xmlNode.getElementsByTagName( 'script' );

        if( !this.scriptFactoryMap && scriptNode.length )
            this.scriptFactoryMap = new Map;

        for( let i = 0; i < scriptNode.length; ++i )
        {
            let prepareOnInit = false;
            let forceUpdate = false;
            let ai = false;
            let attr = scriptNode[i].getAttribute( 'prepareOnInit' );
            if( attr !== null )
                prepareOnInit = (attr === 'true')

            attr = scriptNode[i].getAttribute( 'forceUpdate' );
            if( attr !== null )
                forceUpdate = (attr === 'true')

            // See if this is an ai
            attr = scriptNode[i].getAttribute( 'ai' );
            if( attr )
                ai = (attr === 'true');

            attr = scriptNode[i].attributes[0];
            if( attr )
                // This allocates the script to the map
                this.scriptFactoryMap.set( attr.name, new CScriptPrepareFunc(attr.value, prepareOnInit, forceUpdate, ai) );
        }
    }

    // 
    //  DESC: Prepare a script to run
    //  NOTE: Function uses arguments object to handle multiple parameters
    //        The last parameter will be the script Id so that it is ignored by the calling function
    //
    prepare(...args)
    {
        let activeScript = null;

        if( this.scriptFactoryMap && typeof args[0] === 'string' )
        {
            let scriptPrepareFunc = this.scriptFactoryMap.get( args[0] );
            if( scriptPrepareFunc )
            {
                let script = null;
                if(scriptPrepareFunc.ai)
                {
                    activeScript = aiManager.get( scriptPrepareFunc.funcName );
                }
                else
                {
                    script = scriptManager.get( scriptPrepareFunc.funcName );
                    
                    if( script )
                    {
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

                        activeScript.name = scriptPrepareFunc.funcName;
                    }
                }

                if( activeScript )
                {
                    if( scriptPrepareFunc.forceUpdate )
                    {
                        if( !activeScript.execute() )
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
                if( !activeScript.execute() )
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
            for( let scriptPrepareFunc of this.scriptFactoryMap.values() )
            {
                if( scriptPrepareFunc.prepareOnInit )
                {
                    let activeScript = null;
                    let script = null;
                    if(scriptPrepareFunc.ai)
                    {
                        activeScript = aiManager.get( scriptPrepareFunc.funcName, object );
                    }
                    else
                    {
                        script = scriptManager.get( scriptPrepareFunc.funcName );

                        if( script )
                        {
                            activeScript = script(object);
                            activeScript.name = scriptPrepareFunc.funcName;
                        }
                    }

                    if( activeScript )
                    {
                        if( scriptPrepareFunc.forceUpdate )
                        {
                            if( !activeScript.execute() )
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
        for( let i = this.scriptAry.length - 1; i > -1; --i )
        {
            // If the script is finished, remove it
            if( this.scriptAry[i].execute() )
                this.scriptAry.splice( i, 1 );
        }

        if( this.removeAry )
        {
            for( let i = 0; i < this.removeAry.length; i++ )
            {
                for( let j = 0; j < this.scriptAry.length; j++ )
                {
                    // If the script is finished, remove it
                    if( this.scriptAry[i].name === this.removeAry[i] )
                    {
                        this.scriptAry.splice( j, 1 );
                        break;
                    }
                }
            }

            this.removeAry = [];
        }
    }

    //
    //  DESC: Init the script tree
    //
    initScriptTree()
    {
        for( let i = 0; i < this.scriptAry.length; i++ )
        {
            // initTree is only in scripts that inherit from Node
            if( this.scriptAry[i].initTree !== undefined )
            {
                this.scriptAry[i].initTree();
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
        this.scriptAry = [];
    }
}

export var scriptSingleton = new ScriptComponent;