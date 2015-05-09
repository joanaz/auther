'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('users.detail', {
		url: '/:id',
		templateUrl: '/browser/app/users/detail/user.detail.html',
		controller: 'UserDetailCtrl',
		resolve: {
			user: function (User, $stateParams) {
				var user = new User({_id: $stateParams.id});
				return user.fetch();
			}
		}
	});
});