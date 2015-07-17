'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, Auth) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		console.log('changing state');
		// check if authorized

		console.log('to state', toState);
		console.log('current user', Auth.getUser());


		if (!toState.access(Auth.getUser())) {
			console.log('not authorized');
			event.preventDefault();
		}
	});
});