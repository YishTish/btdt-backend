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

app.directive('btdtHeader', function(){
    return{
        templateUrl: "tpl/header.html",
        restrict: "AEC",
        replace: 'true',
        controller: function($scope, $location){
            $scope.isActive = function(viewLocation){
                return viewLocation == $location.path();
            }
        }
    }
});

app.directive('editLocation', function(){
    return{
        restrict: "AEC",
        template: "<span style=\"color:red\">Test</span>",
        replace: 'true'
    }
});

app.directive('locationDetails',function(){
    return{
        restrict: "AEC",
        templateUrl: "tpl/locationDetails.html",
        replace: 'true',
     //   scope: 'locationCtrl'
    }
});

app.directive('locationList', function(){
    return{
        restrict: 'AEC',
        replace: 'true',
        scope: 'true',
        templateUrl: 'tpl/locationList.html',
        //controller: 'locationCtrl',
    }
});