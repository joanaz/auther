'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('users', {
		url: '/users',
		templateUrl: '/browser/app/users/list/user.list.html',
		controller: 'UserListCtrl',
		resolve: {
			users: function (User) {
				return User.fetchAll();
			}
		}
	});
});