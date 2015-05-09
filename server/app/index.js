'use strict'; 

var app = require('express')();
var path = require('path');

app.use(require('./logging.router'));

app.use(require('./statics.router'));

app.use(require('./requestState.router'));

app.use('/api', require('../api'));

app.get('/*', function (req, res) {
	var index = path.join(__dirname, '..', '..', 'public', 'index.html');
	res.sendFile(index);
});

app.use(require('./error.router'));

module.exports = app;