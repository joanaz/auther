'use strict';

var app = require('./app'),
	db = require('./db'),
	https = require('https'),
	fs = require('fs');


var options = {
	key: fs.readFileSync('keys/key.pem'),
	cert: fs.readFileSync('keys/cert.pem')
};

var port = 8080;
var securePort = 3000;

var secureServer = https.createServer(options, app).listen(securePort, function () {
	console.log('HTTPS server patiently listening on port', securePort);
});

var server = app.listen(port, function() {
	console.log('HTTP server patiently listening on port', port);
});

// module.exports = secureServer; 