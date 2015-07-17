'use strict';

app.controller('UserItemCtrl', function ($scope, $state, Auth) {
	$scope.save = function () {
		$scope.user.save();
	}
	$scope.removeUser = function () {
		$scope.user.destroy().then(function () {
			$scope.user.isDestroyed = true;
		});
	};

	$scope.currentUser = Auth.getUserId();
});