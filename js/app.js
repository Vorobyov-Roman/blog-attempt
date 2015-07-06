var blog = angular.module('blog', ['ngRoute', 'ngMaterial']);

blog.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
	$routeProvider.when('/home', {
		title:       'Home Page',
		templateUrl: 'views/home.html',
		controller:  'homeCtrl'
	});
	$routeProvider.otherwise({
		redirectTo: '/home'
	});

	$mdThemingProvider.theme('default').primaryPalette('blue');
}]);

blog.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);
