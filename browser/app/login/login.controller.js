'use strict';

app.controller('LoginCtrl', function ($scope, Auth, $state) {
	$scope.loginUser = function (userData) {
		Auth.login(userData)
		.then(function (user) {
			console.log('user', user);
			// Auth.setUser(user);
			Auth.setUserId(user._id);
			Auth.setUser(user);
			$state.go('stories');
		})
		.catch(function (e) {
			console.log('error logging in', e);
			console.log('here');
		});
	};
});