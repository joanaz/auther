'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');

var auth = require('../auth.js');

router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		else {
			req.requestedUser = user;
			next();
		}
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

// router.post('/', auth.isAuthenticated);

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(user);
	})
	.then(null, next);
});

router.get('/me', function(req, res, next) {

	console.log('ran me');

	// return logged in user
	// if on req.user
	if (req.user) {
		res.json(req.user);
	}
	// if logged in
	else if (req.session.userId) {
		User.findById(req.session.userId).exec()
		.then(function(user) {
			res.json(user);
		})
		.then(null, next);
	}
	// can't find user otherwise 
	else {
		var err = new Error('Unauthorized');
		err.status = 401;
		next(err);
	}
});

router.get('/:id', function (req, res, next) {
	req.requestedUser.getStories().then(function (stories) {
		var obj = req.requestedUser.toObject();
		obj.stories = stories;
		res.json(obj);
	})
	.then(null, next);
});

router.put('/:id', auth.isAuthenticated);

router.put('/:id', function (req, res, next) {
	console.log('req.body', req.body);
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', auth.isAuthenticated);
router.delete('/:id', auth.isAdmin);

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(200).end();
	})
	.then(null, next);
});


module.exports = router;