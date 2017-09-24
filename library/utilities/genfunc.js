
// 
//  FILE NAME: genfunc.js
//  DESC:      General mutipurpose functions
//

"use strict";

import { signalManager } from '../managers/signalmanager';

// 
//  DESC: Load files
//
export function downloadFile( fileType, filepath, callback )
{
    let request = null;
    
    if( fileType !== 'img' )
        request = new XMLHttpRequest();
    
    if( fileType === 'xml' )
    {
        //console.log(`Load XML: ${filepath}`);
        request.responseType = 'document';
        request.overrideMimeType('text/xml');
    }
    else if( fileType === 'txt' )
    {
        //console.log(`Load Text: ${filepath}`);
        request.responseType = 'text';
        request.overrideMimeType('text/plain');
    }
    else if( fileType === 'binary' )
    {
        //console.log(`Load Binary: ${filepath}`);
        request.responseType = 'arraybuffer';
    }
    else if( fileType === 'img' )
    {
        //console.log(`Load Image: ${filepath}`);
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
                        if( fileType === 'xml' )
                            callback(this.responseXML.childNodes[0]);

                        else if( fileType === 'txt' )
                            callback(this.responseText);

                        else if( fileType === 'binary' )
                            callback(this.response);
                        
                        signalManager.broadcast_loadComplete();
                    }
                    else
                    {
                        throw new Error( `HTTP Request failed (${filepath}).` );
                    }
                }
            }

        // Define which file to open and send the request. True = asynchronous
        request.open('GET', filepath + '?please-dont-cache=' + Math.random(), true);
        request.send();
    }
    else
    {
        let image = new Image();
        
        image.onload = () => { callback(image); signalManager.broadcast_loadComplete(); }
        image.onerror = ( event ) => { throw new Error( `Error downloading file (${filepath})!` ); }

        image.src = filepath;
    }
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
