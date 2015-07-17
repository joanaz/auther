'use strict';

app.controller('ResetCtrl', function ($scope, Auth, $state) {
	$scope.resetUrl = function (userData) {
		Auth.resetUrl(userData)
		.then(function (url) {
			console.log(url);
			$scope.url = url;
		})
		.catch(function (e) {
			console.log('error getting url');
		});
	};
	$scope.resetPassword = function(userData) {
		Auth.resetPassword(userData)
		.then(function(res) {
			console.log(res);
		});
	};
});