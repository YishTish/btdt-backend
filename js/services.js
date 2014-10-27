app.factory(
	'locationsService',['Restangular',
		function(Restangular){
			var promise;
			var locationList;
			var queried = false;
			return {
				getLocations : function(){
					if(!queried || !promise){
						console.log("initializing promise");
						promise = Restangular.all("locations").getList().then(function(data){
							queried = true;
							locationList = data;
							return locationList;
						});
					}
					else{
						console.log("initialised")
					}
					return promise;
				},
				};
			}]);
	