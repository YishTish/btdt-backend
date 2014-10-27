app.controller("userCtrl", function($scope, Restangular){
		
	insertingNewUser = false;
	
	$scope.users = Restangular.all('members').getList().$object;
	for(user in $scope.users){
			user.editing = false;
	 	}
	//setTimeout(function() {console.log($scope.users) }, 1000);

	$scope.saveUser = function(data){

		var user = _.clone(data);
		data.fname = data.lname = data.email = '';
		if(user.id > 0){
			Restangular.one('member').customPUT(user).then(function(data){
				user.editing = false;
			});
		}
		else{
			user.type="0";
			Restangular.one('member').customPOST(user).then(function(data){
				user.editing = false;
				user.id = data.id;
				var listLength = $scope.users.length;
				insertingNewUser = false;
				$scope.users[listLength] = user;
				$scope.user = {
					firstname: null,
					lastname: null,
					email: null
				};
			});
		}
	};

	$scope.deleteUser = function(user){
		Restangular.one('members').customDELETE(user.id).then(function(data){
			console.log(data);
			for(var i=0 ; i < $scope.users.length; i++){
				if($scope.users[i].id == user.id){
					$scope.users.splice(i,1);
				}
			}
		});
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
		return (insertingNewUser ? "Hide" : "Insert New");
	}
});