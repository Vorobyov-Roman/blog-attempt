function FormatPost(post) {
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
}

blog.controller('homeCtrl', function($scope, $http) {
	$http.get('http://178.165.53.183:3000/api/blog/posts?showuser=1')
		.success(function(data) {
			$scope.posts = data;
			$scope.posts.forEach(function(post) {
				FormatPost(post);
			});
		})
		.error(function() {
			alert('The server is inaccessible.');
		});
});

blog.controller('formCtrl', function($scope, $http, $mdDialog) {
	$scope.login = function(ev) {
		var options = $mdDialog.alert()
			.parent(angular.element(document.body))
			.title('login')
			.content('log in here')
			.ok('login!')
			.targetEvent(ev);

		$mdDialog.show(options);
	}
});

blog.controller('postCtrl', function($scope, $http, $routeParams, $location) {
	$http.get('http://178.165.53.183:3000/api/blog/posts/' + $routeParams.id)
		.success(function(data) {
			if (!data) {
				$location.path('/home');
			}

			$scope.post = data;
			FormatPost($scope.post);
		});
});

blog.controller('userCtrl', function($scope, $http, $routeParams, $location) {
	$http.get('http://178.165.53.183:3000/api/blog/posts?author=' + $routeParams.id)
		.success(function(data) {
			if (!data || data.length == 0) {
				$location.path('/home');
			}

			$scope.posts = data;
			$scope.posts.forEach(function(post) {
				FormatPost(post);
			});

			$scope.author = $scope.posts[0].author.username;
		});
});
	