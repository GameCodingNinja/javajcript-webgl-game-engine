
// 
//  FILE NAME: genfunc.js
//  DESC:      General mutipurpose functions
//

"use strict";

import { signalManager } from '../managers/signalmanager';

var sessionCacheBustNo = Math.random();

// 
//  DESC: Load files via a promise
//
export function downloadFile( fileType, filePath )
{
    return new Promise((resolve, reject) => {
            
        let request = null;
        
        if( fileType !== 'img' )
            request = new XMLHttpRequest();
        
        if( fileType === 'xml' )
        {
            //console.log(`Load XML: ${filePath}`);
            request.responseType = 'document';
            request.overrideMimeType('text/xml');
        }
        else if( fileType === 'txt' )
        {
            //console.log(`Load Text: ${filePath}`);
            request.responseType = 'text';
            request.overrideMimeType('text/plain');
        }
        else if( fileType === 'binary' )
        {
            //console.log(`Load Binary: ${filePath}`);
            request.responseType = 'arraybuffer';
        }
        else if( fileType === 'img' )
        {
            //console.log(`Load Image: ${filePath}`);
        }
        else
        {
            throw new Error( `Unknown file type (${filePath})!` );
        }

        if( request )
        {
            // Asynchronous reading of an xml file. Synchronous has been deprecated
            request.onreadystatechange =
                function()
                {
                    if( this.readyState === 4 )
                    {
                        if( (this.status >= 200 && this.status < 300) || this.status === 304 ) 
                        {
                            // This need to be called before the "resolve" is
                            signalManager.broadcast_loadComplete();

                            if( fileType === 'xml' && this.responseXML )
                                resolve(this.responseXML.childNodes[0]);

                            else if( fileType === 'txt' && this.responseText )
                                resolve(this.responseText);

                            else if( fileType === 'binary' && this.response )
                                resolve(this.response);
                                
                            else
                                reject( Error(`Error Loading (${filePath}), file type (${fileType}) not defined!`) );
                        }
                        else
                        {
                            reject( Error(`HTTP Request failed: ${filePath}`) );
                        }
                    }
                }

            // Define which file to open and send the request. True = asynchronous
            request.open('GET', filePath + '?cache_buster=' + sessionCacheBustNo, true);
            request.send();
        }
        // Images are handled differently
        else
        {
            let image = new Image();
            
            image.onload = () => { signalManager.broadcast_loadComplete(); resolve(image); }
            image.onerror = () => reject( Error(`Error downloading file: ${filePath}`) );

            image.src = filePath;
        }
    });
}

// 
//  DESC: Count the number of occurrences of sub string
//
export function countStrOccurrence( searchStr, subStr )
{
    let result = 0;
    let found = -1;

    do
    {
        found = searchStr.indexOf( subStr, found+1 );

        if( found != -1 )
            ++result;
    }
    while( found != -1 );

    return result;
}

// 
//  DESC: Perform a modulus operation on the passed in floats
//
export function modulus( v1, v2 )
{
    return (v1 - v2 * Math.floor(v1 / v2));
}

// 
//  DESC: Generate a random number
//
export function randomInt( min, max )
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomArbitrary( min, max )
{
    return Math.floor(Math.random() * (max - min)) + min;
}

// 
//  DESC: Shuffle array
//
export function shuffle( array )
{
    if( array.length > 2 )
    {
        let currentIndex = array.length, temp, randomIndex;

        // Get the last sound that was just played
        let oldLastElement = array[array.length-1];

        // While there remain elements to shuffle...
        while (0 !== currentIndex)
        {
            // Pick a remaining element...
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;

            // And swap it with the current element.
            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        
        // Make sure the new first element is not the old last one.
        if( oldLastElement === array[0] )
        {
            randomIndex = Math.trunc(array.length / 2);
            array[0] = array[randomIndex];
            array[randomIndex] = oldLastElement;
        }
    }
}

// 
//  DESC: Load the XML string into a dom object
//
export function stringLoadXML( stringData )
{
    let parser = new DOMParser();
    return parser.parseFromString( stringData, "application/xml" );
}

// 
//  DESC: Find a key based on map value
//
export function getKey(map, searchValue)
{
    for (let [key, value] of map.entries())
    {
        if( value === searchValue )
            return key;
    }

    return undefined;
}