blog.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('http://178.165.53.183:3000/api/blog/posts?showuser=1')
		.success(function(data) {
			var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			Date.prototype.toDateFormatted = function() {
				return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear();
			};
			Date.prototype.toTimeFormatted = function(format) {
				if (format == 12) {
					return this.getHours() % 12 + ':' + this.getMinutes() + (this.getHours() / 12 < 1 ? 'am' : 'pm');
				} else {
					return this.getHours() + ':' + this.getMinutes();
				}
			};

			$scope.posts = data;

			$scope.posts.forEach(function(post) {
				function isToday(date) {
					return new Date(date).getDate() == new Date(Date.now()).getDate();
				}

				if (new Date(post.created).toString() == new Date(post.edited).toString()) {
					delete post.edited;
				}

				post.created = isToday(post.created) ?
					'at ' + new Date(post.created).toTimeFormatted(24) :
					'on ' + new Date(post.created).toDateFormatted();
				
				if (typeof post.edited !== 'undefined') {
					post.edited = isToday(post.edited) ?
						'at ' + new Date(post.edited).toTimeFormatted(24) :
						'on ' + new Date(post.edited).toDateFormatted();
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
	