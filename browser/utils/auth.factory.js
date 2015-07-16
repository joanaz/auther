'use strict';

app.factory('Auth', function (User, $http) {
	return {
		signup: function (credentials) {
			return new User(credentials).save();
		},
		login: function (credentials) {
			return $http.post('/auth/login', credentials)
			.then(function (res) {
				return res.data;
			});
		}
	}
});