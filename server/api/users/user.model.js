'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	crypto = require('crypto'),
	_ = require('lodash');

var db = require('../../db');
var Story = require('../stories/story.model');

var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	photo: String,
	phone: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		select: false,
		set: function (plaintext) {
			this.salt = generateSalt();
			return this.hash(plaintext);
		}
	},
	salt: {
		type: String,
		select: false,
	}
});

function generateSalt () {
	return crypto.randomBytes(16).toString('base64');
}

User.statics.findByEmails = function (set) {
	return this.find({emails: {$elemMatch: {$in: set}}});
};

User.statics.findByEmail = function (email) {
	return this.findOne({emails: {$elemMatch: {$eq: email}}});
};

User.methods.hash = function (plaintext) {
	return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString('base64');
};

User.methods.authenticate = function (attempt) {
	return this.hash(attempt) === this.password;
};

User.methods.deselect = function () {
	var obj = this.toObject();
	_.forOwn(this.schema.paths, function (v, k) {
		if (v.selected === false) delete obj[k];
	});
	return obj;
};

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

module.exports = db.model('User', User);