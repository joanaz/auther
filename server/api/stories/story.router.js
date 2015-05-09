'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../lib/HttpError');
var Story = require('./story.model');

router.param('id', function (req, res, next, id) {
	Story.findById(id).exec()
	.then(function (story) {
		if (!story) throw HttpError(404);
		else {
			req.story = story;
			next();
		}
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	Story.find({}).exec()
	.then(function (storys) {
		res.json(storys);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	Story.create(req.body)
	.then(function (story) {
		res.status(201).json(story);
	})
	.then(null, next);
});

router.get('/:id', function (req, res, next) {
	req.story.populateAsync('author')
	.then(function (story) {
		res.json(story);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	_.extend(req.story, req.body);
	req.story.save()
	.then(function (story) {
		res.json(story);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.story.remove()
	.then(function () {
		res.status(200).end();
	})
	.then(null, next);
});

module.exports = router;