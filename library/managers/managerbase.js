
//
//  FILE NAME: managerbase.js
//  DESC:      Base class for common manager behaviors
//

"use strict";

import { assetHolder } from '../utilities/assetholder';
import * as genFunc from '../utilities/genfunc';

export class ManagerBase
{
    constructor()
    {
        this.listTableMap = new Map;
        
        // load counter
        this.loadCounter = 0;
    }
    
    // 
    //  DESC: Load the data list tables from file path
    //
    loadListTable( filePath, callback )
    {
        genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) =>
            {
                this.loadListTableFromNode( xmlNode );
                
                callback();
            });
    }
    
    // 
    //  DESC: Load the data list tables from node
    //
    loadListTableFromNode( xmlNode )
    {
        if( xmlNode )
        {
            let groupLst = xmlNode.getElementsByTagName('groupList');
            
            for( let i = 0; i < groupLst.length; ++i )
            {
                let groupName = groupLst[i].getAttribute('groupName');

                let fileLst = groupLst[i].getElementsByTagName('file');
                if( fileLst.length )
                {
                    let pathAry = [];
                    for( let j = 0; j < fileLst.length; ++j )
                    {
                        pathAry.push( fileLst[j].getAttribute('path') );
                    }

                    this.listTableMap.set( groupName, pathAry );
                }
            }
        }
    }
    
    //
    //  DESC: Load the XML file
    //
    downloadFile( fileType, group, filePath, finishCallback, loadCallback )
    {
        // Use a counter to determine when the load is done because there's
        // no garentee they will finish in the order executed
        // Always do this before the load
        ++this.loadCounter;
                    
        genFunc.downloadFile( fileType, filePath,
            ( fileData ) =>
            {
                // Load all object information from an xml node
                loadCallback( group, fileData, filePath, finishCallback );

                // Always do this after the load
                --this.loadCounter;

                if( this.loadCounter === 0 )
                    finishCallback();
            });
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupNameStr, groupMapMap, groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for has been defined in the list table file
            let pathAry = this.listTableMap.get( group );
            if( pathAry !== undefined )
            {
                // Load the group data if it doesn't already exist
                if( groupMapMap.get( group ) === undefined )
                {
                    // Create a new group map inside of our map
                    groupMapMap.set( group, new Map );

                    this.load( group, finishCallback );
                }
                else
                {
                    throw new Error( `${groupNameStr} group has alread been loaded (${group})!` );
                }
            }
            else
            {
                throw new Error( `${groupNameStr} group name can't be found (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    load( group, finishCallback )
    {
        // Make sure the group we are looking for has been defined in the list table file
        let pathAry = this.listTableMap.get( group );
        if( pathAry !== undefined )
        {
            for( let i = 0; i < pathAry.length; ++i )
            {
                // Check if this file has already been loaded
                if( !assetHolder.has( group, pathAry[i] ) )
                {
                    this.downloadFile( 'xml', group, pathAry[i], finishCallback,
                        ( group, xmlNode, filePath, finishCallback ) => 
                        {
                            // Store the preloaded XML file
                            assetHolder.set( group, filePath, xmlNode );

                            // Call the class function to load the data
                            this.loadFromNode( group, xmlNode, filePath, finishCallback );
                        });
                }
                else
                {
                    this.loadFromNode( group, assetHolder.get( group, pathAry[i]), pathAry[i], null );
                }
            }

            // If there's nothing to load, call the complete callback
            if( this.loadCounter === 0 )
                finishCallback();
        }
        else
        {
            if( this.listTableMap.size == 0 )
                throw new Error( `Need to load the list table (${group})!` );
            else
                throw new Error( `Group description in list table does not exist (${group})!` );
        }
    }
}
