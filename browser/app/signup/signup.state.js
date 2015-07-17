'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/signup/signup.html',
		controller: 'SignupCtrl',
		resolve: {
			user: function(Auth) {
				return Auth.getUser();
			}
		}
	});
});