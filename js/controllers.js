blog.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('http://178.165.53.183:3000/api/blog/posts?showuser=1')
		.success(function(data) {
			$scope.posts = data;

			$scope.posts.forEach(function(post) {
				function isToday(date) {
					return new Date(Date.now()).getDate() == new Date(post.created.date).getDate();
				}

				if (JSON.stringify(post.edited) == JSON.stringify(post.created)) {
					delete post.edited;
				}
				
				if (isToday(post.created)) {
					post.datePreposition = 'at';
					post.created = post.created.time;
				} else {
					post.datePreposition = 'on';
					post.created = post.created.date;
				}

				
				if (typeof post.edited !== 'undefined') {
					post.edited = isToday(post.edited) ? post.edited.time : post.edited.date;
				}
			});
		})
		.error(function() {
			alert('The server is inaccessible.');
		});
}]);

blog.controller('userCtrl', ['$scope', '$http', function($scope, $http) {
	alert('Imagine being taken to the user profile');
}]);

blog.controller('postCtrl', ['$scope', '$http', function($scope, $http) {
	alert('Imagine being taken to the post page');
}]);
	