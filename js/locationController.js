app.controller("locationCtrl",['$scope', 'Restangular', 'locationsService', function($scope, Restangular,locationsService){
	

	locationsService.getLocations().then(function(locationList){
		$scope.locations = locationList;
		$scope.showLocation = $scope.locations[0];
		for(var i=0; i< $scope.locations.length; i++){
			$scope.locations[i].indexPos = i;
		}
	});
	
	$scope.saveLocation = function(data){
		var location = _.clone(data);
		data.name = data.description = data.longitude = data.latitude = '';
		if(location.id > 0){
			Restangular.one('location').customPUT(location).then(function(data){
				//location.editing = false;
				console.log(data);
			});
		}
		else{
			Restangular.one('location').customPOST(location).then(function(data){
				location.editing = false;
				location.id = data.id;
				location.code = data.code;
				var listLength = $scope.locations.length;
				insertingNewLocation = false;
				$scope.locations[listLength] = location;
			});
		}
		location.editing = false;
	};
	
	$scope.delete = function(location){
		Restangular.one("location").customDELETE(location.id).then(function(){
			var index = $scope.locations.indexOf(location);
			$scope.locations.splice(index, 1);
		});
	};

	insertingNewLocation = false;
	$scope.toggleEditLocation = function(location){
		location.editing = !location.editing;
	};

	$scope.showEditLocation=function (location){
		return location.editing;
	};

	$scope.editLocationText = function(location){
		return (location.editing ? "Hide" : "Edit");
	}

	$scope.enableInsertLocation = function(){
		insertingNewLocation = !insertingNewLocation;
	};

	$scope.showInsertLocation=function (location){
		return insertingNewLocation;
	};
	$scope.insertLocationText = function(location){
		return (insertingNewLocation ? "Hide" : "Insert New");
	}

	$scope.enableEditing = function(){
		return false;
	}

	locationPos = 0;

	$scope.updateCurrent = function(location){
		locationPos = location.indexPos;
	};

	$scope.locToEdit = function(){
		if($scope.locations == null || $scope.locations.length==0){
			return {id:"", name:"", description:"",longitude:"",latitude:""};
		}
		else{
			return $scope.locations[locationPos];
		}
	};

	$scope.getLocationPos = function(){
		return locationPos;
	}

}]);
