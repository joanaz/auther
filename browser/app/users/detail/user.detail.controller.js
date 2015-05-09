'use strict';

app.controller('UserDetailCtrl', function ($scope, user, Story) {
	$scope.user = user;
	$scope.addStory = function () {
		var n = Math.floor(Math.random()*100000);
		new Story({
			author: $scope.user,
			title: 'Title ' + n 
		}).save()
		.then(function (story) {
			$scope.user.stories.push(story);
		});
	};
	$scope.removeStory = function (story) {
		story.destroy()
		.then(function () {
			var idx = $scope.user.stories.indexOf(story);
			$scope.user.stories.splice(idx, 1);
		});
	};
});