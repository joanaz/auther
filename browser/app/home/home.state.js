'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/browser/app/home/home.html',
		// resolve: {
		// 	user: function(Auth) {
		// 		return Auth.getUser();
		// 	}
		// }
		controller: function($scope, Auth) {
			$scope.user = Auth.getUserId();
		}
	});
});