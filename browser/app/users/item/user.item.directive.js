'use strict';

app.directive('userItem', function () {
	return {
		restrict: 'E',
		templateUrl: '/browser/app/users/item/user.item.html',
		scope: {
			user: '=model'
		},
		controller: 'UserItemCtrl'
	}
});