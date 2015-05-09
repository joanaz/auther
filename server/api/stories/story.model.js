'use strict'; 

var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Types = mongoose.Schema.Types;

var db = require('../../db');

var Story = new mongoose.Schema({
	__v: {
		type: Number,
		select: false
	},
	author: {
		type: Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	paragraphs: [String]
});

module.exports = db.model('Story', Story);