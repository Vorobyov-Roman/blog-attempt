angular.module('blog', ['ngRoute', 'ngMaterial'])
	.config(['$routeProvider', function ($routeProvider, $mdThemingProvider) {
		$routeProvider
			.when('/home', { templateUrl: 'views/home.html', controller: 'homeCtrl' })
			.when('/posts', { templateUrl: 'views/posts.html' })
			.when('/users', { templateUrl: 'views/users.html' })
			.otherwise({ redirectTo: '/home' });
	}]);
	