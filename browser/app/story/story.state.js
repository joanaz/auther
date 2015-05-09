'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('story', {
		url: '/story/:id',
		templateUrl: '/browser/app/story/story.html',
		controller: 'StoryCtrl',
		resolve: {
			story: function (Story, $stateParams) {
				var story = new Story({_id: $stateParams.id});
				return story.fetch();
			},
			users: function (User) {
				return User.fetchAll();
			}
		}
	});
});