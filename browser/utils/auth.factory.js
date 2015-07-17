'use strict';

app.factory('Auth', function (User, $http) {
	var factoryObj = {
		signup: function (credentials) {
			return new User(credentials).save();
		},
		login: function (credentials) {
			return $http.post('/auth/login', credentials)
			.then(function (res) {
				return res.data;
			});
		},
		resetUrl: function (credentials) {
			return $http.get('/auth/resetPassword/url', {params: credentials})
			.then(function(res) {
				return res.data;
			});
		},
		resetPassword: function(credentials) {
			return $http.get('/auth/resetPassword', {params: credentials})
			.then(function(res) {
				return res.data;
			});
		},
		logout: function(credentials) {
			this.setUserId(null);
			this.setUser(null);
			return $http.post('/auth/logout', credentials)
			.then(function(res) {
				return res.data;
			});
		},
		setUser: function(user) {
			this.user = user;
		},
		setUserId: function(id) {
			this.userId = id;
		},
		getUser: function() {
			return this.user;
		},
		getUserId: function() {
			return this.userId;
		},
		userId: null,
		user: null
	};

	// load logged in user upon page load
	$http.get('/api/users/me')
		.success(function(user) {
			console.log('loaded me');
			console.log('found this user', user);
			factoryObj.userId = user._id;
			factoryObj.user = user;
	});

	return factoryObj;
});