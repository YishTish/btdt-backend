var app = angular.module("btdt",["ngResource", "ngRoute"]);

app.config([
	'$routeProvider', function($routeProvider){
		$routeProvider.when('/users',{
			templateUrl: 'tpl/users.html',
			controller: 'userCtrl'
		}).when('/locations',{
			templateUrl: 'tpl/locations.html',
			controller: 'locationCtrl'
		})
	}
	]);


app.factory("btdtResource", function($resource){
	var btdtResource = $resource("http://localhost:9000/members/:id", {id:"@id"},
		{'update' :{method : 'PUT', url : "http://localhost:9000/member"},
		 'save'  :{method : 'POST', url : "http://localhost:9000/member" }
	});
	return btdtResource;
});

/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
app.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}]);

app.controller("locationCtrl", function($scope){
	$scope.locations = [
		{id: 1, name: "Home", description: "Where the heart is"},
		{id: 1, name: "Work", description: "Where the passion is"},
		{id: 1, name: "Gym", description: "Where the dude is"},
		{id: 1, name: "School", description: "Where the system is"}
	];

	$scope.delete = function(location){
		var index = $scope.locations.indexOf(location);
		$scope.locations.splice(index, 1);
	};
});