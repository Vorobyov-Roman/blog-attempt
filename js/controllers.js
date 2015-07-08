blog.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/blog')
		.success(function(data) {
			$scope.posts = data;
		})
		.error(function() {
			alert('Server is inaccessible.');
		});
}]);

blog.controller('apitest', ['$scope', '$http', function($scope, $http) {
	$scope.request = {
		method: 'POST',
		url: '/api/blog',
		data: {
			test: 'test'
		}
	}

	$http($scope.request)
		.success(function(data) {
			$scope.response = data;
		})
		.error(function() {
			$scope.response = 'error';
		});
}]);
	