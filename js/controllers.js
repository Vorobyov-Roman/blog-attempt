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

blog.controller('toolbarCtrl', function($scope, pageTitle, loggedStatus) {
	$scope.logged = loggedStatus.getStatus();
	$scope.pageTitle = pageTitle.getTitle();
});

blog.controller('writePost', function($scope, $http, $mdDialog, $cookies, $location) {
	$scope.write = function() {
		var body = {
			token: $cookies.get('token'),
			post: $scope.post
		};

		console.log(body);

		$http.post('http://178.165.53.183:3000/api/blog/posts', body)
			.success(function(data) {
				if (data.status == 'OK') {
					$mdDialog.hide();
					$location.path('/home');
				} else {
					alert(data.status);
				}
			});
	}
});

blog.controller('submitForm', function($scope, $http, $mdDialog, $cookies, $window, loggedStatus) {
	function tryLogIn() {
		$http.post('http://178.165.53.183:3000/api/blog/login', $scope.userinfo)
			.success(function(data) {
				if (data.status == 'OK') {
					$cookies.put('token', data.token);
					loggedStatus.setStatus(true);
					$window.location.reload();
				} else {
					alert(data.status);
				}
			});
	}
	function trySignUp() {
		$http.post('http://178.165.53.183:3000/api/blog/users', $scope.userinfo)
			.success(function(data) {
				if (data.status == 'OK') {
					tryLogIn();
					$mdDialog.hide();
				} else {
					alert(data.status);
				}
			});
	}

	$scope.proceed = function(operation) {
		if (operation == 'Log In') {
			tryLogIn();
		} else {
			trySignUp();
		}
	}
});
blog.controller('formCtrl', function($scope, $http, $mdDialog, $cookies, $window, loggedStatus) {
	function dialog($scope, $mdDialog, operation) {
		$scope.operation = operation;

		$scope.close = function() {
			$mdDialog.cancel();
		};
	}

	$scope.login = function(ev) {
		$mdDialog.show({
			controller: dialog,
			templateUrl: './views/form.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			locals: {
				operation: 'Log In'
			}
		});
	};

	$scope.signup = function(ev) {
		$mdDialog.show({
			controller: dialog,
			templateUrl: './views/form.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			locals: {
				operation: 'Sign Up'
			}
		});
	};

	$scope.logout = function(ev) {
		$http.post('http://178.165.53.183:3000/api/blog/logout', { token: $cookies.get('token') })
			.success(function(data) {
				if (data.status == 'OK') {
					console.log('success');
					$cookies.remove('token');
					loggedStatus.setStatus(false);
					$window.location.reload();
				} else {
					alert(data.status);
				}
			});
	};

	$scope.write = function(ev) {
		$mdDialog.show({
			controller: dialog,
			templateUrl: './views/write.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			locals: {
				operation: 'Write a post'
			}
		});
	}
});

blog.controller('homeCtrl', function($scope, $http, pageTitle) {
	pageTitle.setTitle('');

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

blog.controller('postCtrl', function($scope, $http, $routeParams, $location, pageTitle) {
	$http.get('http://178.165.53.183:3000/api/blog/posts/' + $routeParams.id)
		.success(function(data) {
			if (!data) {
				$location.path('/home');
			}

			$scope.post = data;
			FormatPost($scope.post);
		});

	pageTitle.setTitle('');
});

blog.controller('userCtrl', function($scope, $http, $routeParams, $location, pageTitle) {
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

			pageTitle.setTitle('Posts by ' + $scope.author);
		});
});
	