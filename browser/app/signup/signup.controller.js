'use strict';

app.controller('SignupCtrl', function ($scope, Auth, $state) {
	$scope.signupUser = function (userData) {
		Auth.signup(userData)
		.then(function (user) {
			console.log('new user', user);
			// Auth.setUser(user);
			Auth.setUserId(user._id);
			Auth.setUser(user);
			$state.go('stories');
		});
	};
});