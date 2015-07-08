var blog = angular.module('blog', ['ngRoute', 'ngMaterial']);

blog.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
	$routeProvider
		.when('/home', {
			title:       'MyBlog',
			templateUrl: 'views/home.html',
			controller:  'homeCtrl'
		})
		.when('/apitest', {
			title: 'test',
			templateUrl: 'views/apitest.html',
			controller: 'apitest'
		})
		.otherwise({
			redirectTo: '/home'
		});

	$mdThemingProvider.theme('default').primaryPalette('blue-grey');
}]);

blog.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);
