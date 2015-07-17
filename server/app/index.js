'use strict'; 

var app = require('express')();
var path = require('path');

app.use(require('./logging.middleware'));

// save user to req
app.use(require('./session.middleware'));
var User = require('../api/users/user.model');
app.use(function(req, res, next) {
	if (req.session.userId) {
		User.findById(req.session.userId).exec()
		.then(function(user) {
			if (!user) {
				console.log('no signed in user');
				req.user = null;
			} else {
				console.log('found this user: ', user);
				req.user = user;
			}
			next();
		})
		.then(null, next);
	} else{
		console.log('no current session');
		next();
	}
});

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.post('/auth/login', function (req, res, next) {
	// find user by email and password
	// if they exist send them back to the frontend
	// if they don't error 401

	console.log('body', req.body);

	User.findOne({email: req.body.email}).exec()
	.then(function (user) {
		// authenticate password
		console.log(user);

		if (!user) {
			var err = new Error('User not found');
			err.status = 404;
			next(err);
		} else if (user.authenticate(req.body.password)) {
			// successful login
			// save id to session
			req.session.userId = user._id;
			res.json(user);
		} else {
			var err = new Error('Not Authenticated');
			err.status = 401;
			next(err);
		}
	})
	// error with query/db
	.then(null, next);
});

app.post('/auth/logout', function (req, res, next) {

	console.log('loggin out', req.body);

	// remove id from request
	req.session.userId = null;
	// req.session.destroy(
		// console.log('destroyed session')
	// );

	res.send('logged out');
});

// for debugging, return secure url for that email
app.get('/auth/resetPassword/url', function(req, res, next) {
	// query should be {email: email}
	console.log('reset query ', req.query);

	// find the user and generate secure url
	User.findOne(req.query).exec()
	.then(function(user) {
		res.json(user.resetPasswordUrl());
	});

});

// for debugging, return secure url for that email
app.get('/auth/resetPassword', function(req, res, next) {
	// query should be {email: email}
	console.log('reset2 query ', req.query);

	// find the user and valid token
	User.findOne({email: req.query.email}).exec()
	.then(function(user) {
		// validate token
		if (user.resetPasswordHash() === req.query.token) {
			res.json('successful');
		} else {
			res.json(user.resetPasswordUrl());	
		}
	});

});

app.post('/auth/resetPassword/:secureUrl', function(req, res, next) {

	// req.body should just be {email: their_email, password: new_password}
	console.log('reset body', req.body);
	console.log('secure url', req.params.secureUrl);

	// validate the secure url
	// find the user with this email
	User.findOne({email: req.body.email}).exec()
	.then(function(user) {
		// authorize secure url
		if (user.resetPasswordUrl() === req.params.secureUrl) {
			// successful -- update password
			res.send('successful, new password: ' + req.body.password);
		} else {
			// invalid
			res.send('invalid url');
		}
	})
	.then(null, next);

	// res.json('got a resetPassword request');
});


app.use('/api', require('../api'));

app.get('/*', function (req, res) {
	var index = path.join(__dirname, '..', '..', 'public', 'index.html');
	res.sendFile(index);
});

app.use(require('./error.middleware'));

module.exports = app;