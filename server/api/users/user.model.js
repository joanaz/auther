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
	hashedPassword: String,
	salt: {type: String, default: function() {return crypto.randomBytes(16).toString('base64');}},
	isAdmin: {type: Boolean, default: false}
});

// // var salt = 'salt';
// var saltBuffer = crypto.randomBytes(16),
// 	salt = saltBuffer.toString('base64');


// accepts a password and saves it as a hash
User.virtual('password').set(function(password) {
	var hashedBuffer = crypto.pbkdf2Sync(password, this.salt, 0, 16),
    hashed = hashedBuffer.toString('base64');
    this.hashedPassword = hashed;
});

// compares given password to saved hashed password
User.methods.authenticate = function(password) {
	return this.hashedPassword === crypto.pbkdf2Sync(password, this.salt, 0, 16).toString('base64');
};

// generates secure url for resetting password
User.methods.resetPasswordHash = function() {
	var inputString = this.name + this.phone + this.email + this.hashedPassword;
	var secureUrlHash = crypto.pbkdf2Sync(inputString, this.salt, 0, 16).toString('base64');
	return secureUrlHash;
};

// returns secure url for password reset
User.methods.resetPasswordUrl = function() {
	return 'localhost:8080/auth/resetPassword?email=' + this.email + '&token=' + this.resetPasswordHash();
};


User.statics.findByEmails = function (set) {
	return this.find({emails: {$elemMatch: {$in: set}}});
};

User.statics.findByEmail = function (email) {
	return this.findOne({emails: {$elemMatch: {$eq: email}}});
};

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

module.exports = db.model('User', User);