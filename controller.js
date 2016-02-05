angular.module('myApp', [])
	.controller('myController', function($scope, $http) {
		$scope.showme = false;
		$scope.update = function() {
			$http.get('http://127.0.0.1:10010/persons/' + $scope.search + '/events').
        	success(function(data) {
            	$scope.persons = data;
        	});
        	$scope.showme = true;
		};
	});