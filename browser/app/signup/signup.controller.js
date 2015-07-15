'use strict';

app.controller('SignupCtrl', function ($scope) {
	$scope.userToSignup = {};
	$scope.doSomething = function (userData) {
		console.log('I did something!', userData);
	};
});