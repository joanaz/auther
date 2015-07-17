'use strict';

var router = require('express').Router(),
	logger = require('morgan');

var session = require('express-session');

// sessions
router.use(session({
	secret: 'jack',
	resave: false,
	saveUninitialized: false,
	cookie: {
		// secure: true,
		maxAge: 600000
	}
}));

router.use(function (req, res, next) {
    console.log('userId', req.session.userId);
    console.log('cookie', req.session.cookie);
    next();
});


module.exports = router;