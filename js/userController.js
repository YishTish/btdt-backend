app.controller("userCtrl", function($scope, btdtResource){
	$scope.users = btdtResource.query();
	
	for(user in $scope.users){
		user.editing = false;
	}

	insertingNewUser = false;

	$scope.saveUser = function(user){
		if(user.id > 0){
			user.$update();
		}
		else{
			user.type="0";
			btdtResource.save(user);
		}
		$scope.users.$promise.then(function(result){
			$scope.users = btdtResource.query();	
		});
	};

	$scope.editUser = function(user){
		user.$update();
	};

	$scope.insertUser = function(){
		$scope.user.type = 0;
		btdtResource.save($scope.user);
		$scope.users.$promise.then(function(result){
			$scope.users = btdtResource.query();	
		});
		
		//user.$save();
	};


	$scope.deleteUser = function(user){
		user.$delete();
	};

	$scope.showUser= function(userId){
		return userId > 0;
	};

	$scope.enableEditUser = function(user){
		user.editing = !user.editing;
	};
	$scope.showEditUser=function (user){
		if(user.editing == true)
			return true;
		else return false;
	};
	$scope.editUserText = function(user){
		if(user.editing == true)
			return "Hide";
		else
			return "Edit";
	}

	$scope.enableInsertUser = function(user){
		insertingNewUser = !insertingNewUser;
	};

	$scope.showInsertUser=function (user){
		return insertingNewUser;
	};
	$scope.insertUserText = function(user){
		if(insertingNewUser)
			return "Hide";
		else
			return "Insert new";
	}


});