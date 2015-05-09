'use strict';

app.controller('UserItemCtrl', function ($scope, $state) {
	$scope.name = $scope.user.name;
	$scope.updateName = function () {
		$scope.user.name = $scope.name;
		$scope.save();
	};
	$scope.save = function () {
		$scope.user.save();
	}
	$scope.removeUser = function () {
		$scope.user.destroy().then(function () {
			$scope.user.isDestroyed = true;
			$state.go('users');
		});
	};
});