/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');


// 
//  DESC: Handle GET requests
//
function onGet( request, response )
{
    console.log('request GET');
    
    var filePath = '.' + url.parse(request.url).pathname;
    if (filePath == './')
        filePath = './index.html';

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.xml': 'text/xml',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

// 
//  DESC: Handle POST requests
//
function onPost( request, response )
{
    console.log('request POST');
    
    var body = '';
    
    // Get the posted data
    request.on('data', (data) => {
        body += data;
    });
    
    // Return the results
    request.on('end', () => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(body);
    });
}

// 
//  DESC: Listener function
//
function requestListener( request, response )
{
    if( request.method == 'GET' )
        onGet( request, response );
    
    else if( request.method == 'POST' )
        onPost( request, response );
    
    else
        response.end();
}

/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testdb");
  var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  dbo.collection("customers").insertMany(myobj, function(err, res) {
    if (err) throw err;
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testdb");
  var query = { address: "Park Lane 38" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); */

// 
//  DESC: Create the server
//
var server = require('http').createServer( requestListener );

// 
//  DESC: Loading socket.io
//
var io = require('socket.io')(server);

// 
//  DESC: When a client connects, we note it in the console
//
io.on('connection', (socket) => {

    console.log('A client is connected!');
    socket.emit('message', 'You are connected!');
    
    // When the server receives a “message” type signal from the client   
    socket.on('message', function (message) {
        console.log('A client is speaking to me! They’re saying: ' + message);
    });
});
        
// Start listening
server.listen(9000);

console.log('Server running at http://127.0.0.1:9000/');
