'use strict';

app.directive('navbar', function (Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function(scope, elem, attrs) {
			scope.logout = function() {
				console.log('trying to logout');
				Auth.logout()
				.then(function(data){
					console.log('res data', data);
				});
			};
			scope.userInfo = Auth;
			// scope.getUser
		}
	};
});