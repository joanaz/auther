'use strict';

app.controller('UserListCtrl', function ($scope, users, User) {
	$scope.users = users;
	$scope.addUser = function () {
		var n = Math.floor(Math.random()*96),
			g = (Math.random() > 0.5 ? 'women' : 'men');
		var randPhoto = 'http://api.randomuser.me/portraits/thumb/' + g + '/' + n + '.jpg';
		new User({
			firstName: 'First',
			lastName: 'Last',
			email: 'example' + $scope.users.length + '@website.com',
			phone: '(555) 555-5555',
			photo: randPhoto
		}).save()
		.then(function (user) {
			$scope.users.unshift(user);
		});
	};
});