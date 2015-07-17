var User = require('./users/user.model');

function isAuthenticated(req, res, next) {
	// check for user id
	console.log('session', req.session.userId);
	if (req.session.userId) {
		// if logged in, load the user, and continue on
		User.findById(req.session.userId).exec()
		.then(function(user) {
			req.user = user;
			next();
		});
	} else {

		console.log('failed Authenticated');

		// otherwise, throw error
		var err = new Error('Not Authenticated');
		// err.status(401);
		err.status = 401;
		next(err);
	}
}

function isAdmin(req, res, next) {
	// assumes req has user property
	// check if user is admin

	console.log('user', req.user);

	if (req.user && req.user.isAdmin) {
		// if so, continue on
		next();
	} else {
		// otherwise pass forbidden error
		var err = new Error('Forbidden');
		// err.status(403);
		err.status = 403;
		next(err);
	}
}

module.exports = {
	isAuthenticated: isAuthenticated,
	isAdmin: isAdmin
};