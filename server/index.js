const http = require('http');
const url = require('url');
const querystring = require('querystring');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

const PORT = 3000;


// Serve up public/ftp folder
const serve = serveStatic('public/ftp', {'index': ['index.html', 'index.htm']});

// Create server
const server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(PORT, function () {
    console.log('Server running on port ' + PORT + '...');
});