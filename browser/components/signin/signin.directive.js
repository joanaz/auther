'use strict';

app.directive('signin', function () {
	return {
		scope: {
			user: '=',
			submitText: '@',
			onSubmittingUser: '&'
		},
		restrict: 'E',
		templateUrl: '/browser/components/signin/signin.html'
	}
});