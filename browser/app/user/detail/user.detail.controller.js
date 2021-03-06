'use strict';

app.controller('UserDetailCtrl', function ($scope, user, Story, Auth) {
	$scope.user = user;
	$scope.newStory = new Story({author: $scope.user});
	$scope.addStory = function () {
		var n = Math.floor(Math.random()*100000);
		$scope.newStory.save()
		.then(function (story) {
			$scope.newStory = new Story({author: $scope.user});
			$scope.user.stories.unshift(story);
		});
	};
	$scope.removeStory = function (story) {
		story.destroy()
		.then(function () {
			var idx = $scope.user.stories.indexOf(story);
			$scope.user.stories.splice(idx, 1);
		});
	};

	$scope.currentUser = Auth.getUserId();
});