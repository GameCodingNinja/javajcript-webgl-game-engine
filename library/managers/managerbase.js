
//
//  FILE NAME: managerbase.js
//  DESC:      Base class for common manager behaviors
//

"use strict";

import * as genFunc from '../utilities/genfunc';

export class ManagerBase
{
    constructor()
    {
        this.listTableMap = new Map;
    }
    
    // 
    //  DESC: Load the data list tables from file path
    //
    loadListTable( filePath )
    {
        return genFunc.downloadFile( 'xml', filePath,
            ( xmlNode ) => this.loadListTableFromNode( xmlNode ));
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
                        pathAry.push( fileLst[j].getAttribute('path') );

                    this.listTableMap.set( groupName, pathAry );
                }
            }
        }
    }
    
    //
    //  DESC: Load the group array
    //
    loadGroupAry( groupNameStr, groupMapMap, groupAry )
    {
        let promiseAry = [];

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

                    promiseAry.push( this.load( group ) );
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

        return Promise.all( promiseAry );
    }

    //
    //  DESC: Load the group
    //
    load( group, allowError = true )
    {
        let promiseAry = [];

        // Make sure the group we are looking for has been defined in the list table file
        let filePathAry = this.listTableMap.get( group );
        if( filePathAry !== undefined )
        {
            for( let i = 0; i < filePathAry.length; ++i )
            {
                let filePath = filePathAry[i];
                promiseAry.push( 
                    genFunc.downloadFile( 'xml', filePath )
                        .then(( xmlNode ) => this.loadFromNode( group, xmlNode, filePath ))
                        .catch(( error ) => { console.error(error.stack); throw error; }));
            }
        }
        else if( allowError )
        {
            if( this.listTableMap.size == 0 )
                throw new Error( `Need to load the list table (${group})!` );
            else
                throw new Error( `Group description in list table does not exist (${group})!` );
        }

        return Promise.all( promiseAry );
    }
}
