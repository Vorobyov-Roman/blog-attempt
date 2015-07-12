blog.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/blog/posts?showuser=1')
		.success(function(data) {
			$scope.posts = data;

			$scope.posts.forEach(function(post) {
				function isToday(date) {
					return new Date(Date.now()).getDate() == new Date(post.created.date).getDate();
				}
			
				post.created = isToday(post.created) ? post.created.time : post.created.date;
				post.edited = isToday(post.edited) ? post.edited.time : post.edited.date;

				if (JSON.stringify(post.edited) == JSON.stringify(post.created)) {
					delete post.edited;
				}
			});
		})
		.error(function() {
			alert('The server is inaccessible.');
		});
}]);

blog.controller('apitest', ['$scope', '$http', function($scope, $http) {
	$scope.request = {};
	$scope.response = {};
}]);
	