var blog = angular.module('blog', ['ngRoute', 'ngMaterial']);

blog.config(function($routeProvider, $mdThemingProvider) {
	$routeProvider
		.when('/home', {
			title:       'MyBlog',
			templateUrl: 'views/home.html',
			controller:  'homeCtrl'
		})
		.when('/user/:id', {
			title:       'User profile',
			templateUrl: 'views/user.html',
			controller:  'userCtrl'
		})
		.when('/post/:id', {
			title:       'Post',
			templateUrl: 'views/post.html',
			controller:  'postCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		});

	$mdThemingProvider
		.theme('default')
		.primaryPalette('blue-grey');
});

blog.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeStart', function(event, current, previous) {
		$rootScope.title = current.title;
	});
}]);
