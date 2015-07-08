blog.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/blog')
		.success(function(data) {
			$scope.posts = data;
		})
		.error(function() {
			alert('Server is inaccessible.');
		});
}]);
	