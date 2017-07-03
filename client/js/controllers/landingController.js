hri
.controller('landingController', ['$scope', '$location', '$http','$routeParams',
  function landingController($scope, $location, $http, $routeParams) {
 $scope.trainModel = function() {

 }
 $scope.evaluateModel = function() {
   $location.url('/list/' +$routeParams.token);
 }
 $scope.addEmployee = function() {
 	$location.url('/addEmployee');
 }
}]);
