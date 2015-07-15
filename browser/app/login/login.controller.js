'use strict';

app.controller('LoginCtrl', function ($scope) {
	$scope.userToLogin = {};
	$scope.doSomething = function (userData) {
		console.log('I did something!', userData);
	};
});