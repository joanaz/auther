'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/login/login.html',
		controller: 'LoginCtrl',
		resolve: {
			user: function(Auth) {
				return Auth.getUser();
			}
		}
	});
});