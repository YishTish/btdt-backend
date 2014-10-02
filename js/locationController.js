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