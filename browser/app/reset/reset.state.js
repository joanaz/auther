'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('reset', {
		url: '/reset',
		templateUrl: '/browser/app/reset/reset.html',
		controller: 'ResetCtrl',
		resolve: {
			user: function(Auth) {
				return Auth.getUser();
			}
		}
	});
});